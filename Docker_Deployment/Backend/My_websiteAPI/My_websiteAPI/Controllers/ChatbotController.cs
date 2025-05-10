using Microsoft.AspNetCore.Mvc;
using My_websiteAPI.Model;
using Elastic.Clients.Elasticsearch;
using Microsoft.EntityFrameworkCore;
using My_websiteAPI.Data;
using Elastic.Clients.Elasticsearch.QueryDsl;
using System.Text.Json;
using System.Text;

namespace My_websiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {
        private readonly ElasticsearchClient _client;
        private readonly MyDBcontext _context;

        // Khởi tạo client ElasticSearch và context của cơ sở dữ liệu thông qua Dependency Injection
        public ChatBotController(MyDBcontext context, ElasticsearchClient client)
        {
            _context = context;
            _client = client;
        }

        
        [HttpPost]
        public async Task<IActionResult> Chat(Usersend question)
        {      
            var elasticResults = await SearchElasticAsync(question.query);
            if (elasticResults.Any())
            {
                string elasticInfo = string.Join("\n", elasticResults.Select(r => r.Content));
                string userPrompt = question.query;
                using var httpClient = new HttpClient();
                var payload = new
                {
                    model = "llama-3.2-1b-instruct",
                    messages = new[]
                          {
                            new
                            {
                                role = "system",
                                content = $"Bạn là trợ lý AI chuyên tư vấn du lịch và ẩm thực tại Việt Nam. Dưới đây là thông tin tìm được:\n\n{elasticInfo}\n\nHãy sử dụng thông tin này để trả lời câu hỏi của người dùng một cách rõ ràng, tự nhiên, bằng tiếng Việt."
                            },
                            new
                            {
                                role = "user",
                                content = userPrompt
                            }
                        },
                    max_tokens = 1000
                };

                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync("http://host.docker.internal:1234/v1/chat/completions", content);

                if (response.IsSuccessStatusCode)
                {
                    var resultJson = await response.Content.ReadAsStringAsync();
                    using var doc = JsonDocument.Parse(resultJson);
                    string aiAnswer = doc.RootElement
                                         .GetProperty("choices")[0]
                                         .GetProperty("message")
                                         .GetProperty("content")
                                         .GetString();

                    return Ok(new { answer = aiAnswer });
                }
                else
                {
                    return StatusCode(500, new { error = "Không thể kết nối đến LM Studio." });
                }
            }
            else
            {
                string userPrompt = $"Người dùng hỏi: {question.query}\n\n Bạn hãy trả lời thật tự nhiên, rõ ràng bằng tiếng việt. Bạn tên là ViVi trả lời đúng trọng tâm câu hỏi của người dùng.";

                using var httpClient = new HttpClient();
                var payload = new
                {
                    model = "llama-3.2-1b-instruct",
                    messages = new[]
                    {
                        new { role = "system", content = "Bạn là trợ lý tư vấn du lịch và ẩm thực tại Việt Nam." },
                        new { role = "user", content = userPrompt }
                    },
                   
                    max_tokens = 1000, 
                 
                };
                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync("http://host.docker.internal:1234/v1/chat/completions", content);
                if (response.IsSuccessStatusCode)
                {
                    var resultJson = await response.Content.ReadAsStringAsync();
                    using var doc = JsonDocument.Parse(resultJson);
                    string aiAnswer = doc.RootElement
                                         .GetProperty("choices")[0]
                                         .GetProperty("message")
                                         .GetProperty("content")
                                         .GetString();

                    return Ok(new { answer = aiAnswer });
                }
                else
                {
                    return StatusCode(500, new { error = "Không thể kết nối đến LM Studio." });
                }

            }
        
        }
        // Tìm kiếm trong Elasticsearch
        private async Task<List<ElasticResult>> SearchElasticAsync(string query)
        {
            try
            {
                var searchResponse = await _client.SearchAsync<ElasticResult>(s => s
                    .Index("index_dd")
                    .Size(1)
                    .Query(q => q
                        .Bool(b => b
                            .Should( 
                                sh => sh.Match(m => m.Field(f => f.Title).Query(query))
                              
                            )
                            .MinimumShouldMatch(1)
                        )
                    )
                );

                if (searchResponse.IsValidResponse && searchResponse.Hits.Count > 0)
                {
                    return searchResponse.Hits.Select(hit => hit.Source).ToList();
                }

                return new List<ElasticResult>();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error occurred while searching: {ex.Message}");
                return new List<ElasticResult>();
            }
        }

        // Tìm kiếm trong cơ sở dữ liệu
      
        // post data Elasticsearch
        [HttpPost("daydl")]
        public async Task<IActionResult> Daydl()
        {
            var diadiemList = await _context.Diadiem.Include(p=>p.LoaiHinhDL).Include(p => p.TinhThanh).Include(p => p.Danhcho).ToListAsync();
            int insertedCount = 0;
            foreach (var item in diadiemList)
            {
                var docId = item.DiadiemId.ToString();
                // check document ton tai
                var existsResponse = await _client.ExistsAsync<ElasticResult>(docId, e => e.Index("index_dd"));
                if (!existsResponse.Exists)
                {
                    var doc = new ElasticResult
                    {
                        Id = item.DiadiemId,
                        Title = item.Tieude,
                        Description = item.Noidung,
                        Address = item.Diachi,
                        Type = item.LoaiHinhDL?.TenLoai,
                        Location = item.TinhThanh?.TenTinh,
                        Audience = item.Danhcho?.Doituong,
                        Views = item.Luotxem,
                        Content =
                          $"Tiêu đề: {item.Tieude}\n" +
                          $"Giới thiệu: {item.Noidung}\n" +
                          $"Địa chỉ: {item.Diachi}\n" +
                          $"Loại: {item.LoaiHinhDL?.TenLoai}\n" +
                          $"Lượt xem trên web là: {item.Luotxem}\n" +
                          $"Đối tượng tham gia: {item.Danhcho?.Doituong}\n" +
                          $"Địa chỉ nằm trong tỉnh: {item.TinhThanh?.TenTinh}"
                    };
                    await _client.IndexAsync(doc, idx => idx.Index("index_dd").Id(docId));
                    insertedCount++;
                }
            }
            return Ok(new { message = $"Đã đẩy {insertedCount} địa điểm mới lên Elasticsearch." });
        }

        [HttpDelete("xoatatca")]
        public async Task<IActionResult> DeleteAllDocuments()
        {
            var request = new DeleteByQueryRequest("index_dd")
            {
                Query = new MatchAllQuery()
            };

            var response = await _client.DeleteByQueryAsync(request);

            if (response.IsValidResponse)
            {
                return Ok(new { message = $"Đã xoá {response.Deleted} tài liệu trong Elasticsearch." });
            }
            else
            {
                return StatusCode(500, new
                {
                    error = "Xoá dữ liệu thất bại."
                
                });
            }
        }



    }
}
