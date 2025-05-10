namespace My_websiteAPI.Model
{
    public class ChatRequest
    {
        public string Question { get; set; }
    }
    public class ElasticResult
    {

        public int Id { get; set; }
        public string Title { get; set; }            // item.Tieude
        public string Description { get; set; }      // item.Noidung
        public string Address { get; set; }          // item.Diachi
        public string Type { get; set; }             // item.LoaiHinhDL.TenLoai
        public string Location { get; set; }         // item.TinhThanh.TenTinh
        public string Audience { get; set; }         // item.Danhcho.Doituong
        public int Views { get; set; }               // item.Luotxem
        public string Content { get; set; }          // Nội dung tổng hợp


    }
    public class Usersend
    {
        public string query { get; set; }
    }
}
