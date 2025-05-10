import API_ENDPOIN from "./apiweb.js";



function markdownToHtml(markdown) {
  // H1, H2, H3
  markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italic
  markdown = markdown.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  markdown = markdown.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Image ![](url)
  markdown = markdown.replace(/!\[\]\((.*?)\)/gim, '<img src="$1" style="max-width:100%; height:auto; margin:10px 0;" />');

  // Line breaks (chuyển \n thành <br> chỉ khi không ở trong thẻ block)
  markdown = markdown.replace(/\n{2,}/g, '</p><p>');
  markdown = '<p>' + markdown + '</p>'; // wrap toàn bộ
  return markdown;
}
//  Đánh giá sản phẩm  

    // Tạo body của request gửi lên server
    document.addEventListener("DOMContentLoaded", () => {
        const stars = document.querySelectorAll(".star-rating .fa-star");
        const ratingValue = document.querySelector(".giatridiem");
        let selectedRating = 0;
      
        stars.forEach((star) => {
      
          star.addEventListener("click", () => {
            selectedRating = parseInt(star.getAttribute("data-value"));
            updateStars(selectedRating);
            ratingValue.textContent = ` ${selectedRating} `;
          });
      
        
          star.addEventListener("mouseover", () => {
            const hoverValue = parseInt(star.getAttribute("data-value"));
            updateStars(hoverValue);
          });
      
          
          star.addEventListener("mouseout", () => {
            updateStars(selectedRating);
          });
        });
      
      
        function updateStars(rating) {
          stars.forEach((star, index) => {
            if (index < rating) {
              star.classList.remove("text-muted");
              star.classList.add("text-warning");
            } else {
              star.classList.remove("text-warning");
              star.classList.add("text-muted");
            }
          });
        }
      });
      function Diadiemlienquan(id) {
        var api = API_ENDPOIN.SukienTintuc + `/diadiemlienquan?id=${id}`;
        fetch(api)
          .then((p) => {
            if (!p.ok) {
              showAlert(`Lỗi HTTP:${p.status}`, "aler-danger");
              return;
            }
            return p.json();
          })
          .then((data) => {
            var showlist = document.querySelector(".sukienlienquan");
            showlist.innerHTML = "";
            data.items.forEach((element) => {
              var dateOpen = element.dateOpen.split("T")[0]
              var dateClose = element.dateClose.split("T")[0]
              var gia= element.gia==0?"Đang cập nhật":element.gia;
              showlist.innerHTML += `     <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
                <div class=" p-0  d-flex w-100 rounded border border-1 " >
                    <div class="col-md-4 p-0 m-0"> <a href="/sukientintucdetail.html?id=${element.sukienId}" class=" w-100">
                       <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />  </a>
                     </div>
                  
                     <div class=" col-md-8 px-3  ">
                       <h4 class="inlinenowrap1"> ${element.tieude}</h4>
                       <p class="p-0 m-1 text-dark inlinenowrap1">
                        ${element.motangan}
                       </p>                 
                       <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                       <p class=" inlinenowrap1 p-0 m-1 text-dark">Thời gian diễn ra: ${dateOpen} - ${dateClose}</p>
                       <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                       
                      <div class="d-flex justify-content-between mt-2 p-0">
                       <p class="ps-1 text-start text-danger fs-6">Giá vé: ${gia}</p>
      
                     
                      </div>
      
                     </div>
               
                </div>
            </div>
                `;
            });
          
          });
      }



function GetDetaildiadiem(){
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];

  var api = API_ENDPOIN.SukienTintuc+`/Find?id=${id}`
  fetch(api)
  .then(p=>{
    if(!p.status){
      showAlert("Lỗi khi lấy thông tin sự kiện -  tin tức!","alert-danger");
      return;
    }
    return p.json();
  }).then(data=>{
    Diadiemlienquan(data.loaiHinhId);
var tieudedd= document.querySelector(".tieudediadiem");

var noidungdd= document.querySelector(".noidungdiadiem");
var date1 = data.dateOpen.split("T")[0];
var date2=  data.dateClose.split("T")[0];
tieudedd.innerHTML=` <hr />
          <div class="d-flex justify-content-between">
            <h3 class="m-0 text-start">${data.tieude}</h3>
     
          </div>
          <p>
            <i class="fa-solid fa-location-dot textcolor"></i> Địa chỉ: ${data.diachi}
          </p>`;
          document.querySelector(".chillimg1 img").src=`/img/${data.imagemain}`;

     document.querySelector(".w-100.my-2 img").src=`/img/${data.imagemain}`;
     document.querySelector(".chillimg2 img").src=`/img/${data.image1}`;
     document.querySelector(".chillimg3 img").src=`/img/${data.image2}`;
     document.querySelector(".chillimg4 img").src=`/img/${data.image3}`;
     document.querySelector(".chillimg5 img").src=`/img/${data.image4}`;
     document.querySelector(".chillimg6 img").src=`/img/${data.image5}`;
       
          var giave = data.gia==0?"Miễn phí": data.gia+"vnđ";
        
        var sdt= data.sdt==""?"Đang cập nhật":data.sdt;
        var date1 = data.dateOpen.split("T")[0];
        var date2=  data.dateClose.split("T")[0];

          noidungdd.innerHTML=`
           <div class="col-md-12 rounded border-1 border h-auto px-2 py-3 ">
           
            <p>Loại hình: ${data.loaisukien}</p>
       
            <p>Dành cho: ${data.danhcho}</p>
            <p>Thuộc tỉnh: ${data.tinhThanh}</p>
            <p>Giá vé: ${giave}</p>
            <p>Bắt đầu từ: ${date1}</p>
            <p>Đến ngày: ${date2}</p>
            <p>Liên hệ: ${sdt}</p>

          
            </div>`;
    

            document.querySelector("#contentdiadiem").innerHTML=markdownToHtml(data.mota1);
  }).catch(p=>showAlert("Erorr"+p.message,"alert-danger"))
}
GetDetaildiadiem();
      function showAlert(message, type = "alert-success", duration = 2000) {
        let alertContainer = document.getElementById("alert-container");
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert ${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `${message}`;
      
        alertContainer.appendChild(alertDiv);
        setTimeout(() => {
          alertDiv.classList.remove("show");
          setTimeout(() => alertDiv.remove(), 500);
        }, duration);
      }
      document.addEventListener("DOMContentLoaded", function () {
        const mainImage = document.querySelector(".w-100.my-2 img"); 
        const thumbnails = document.querySelectorAll(".chillimg1 img,.chillimg2 img,.chillimg3 img,.chillimg4 img,.chillimg5 img,.chillimg6 img");
     if (thumbnails.length > 0) {
            mainImage.src = thumbnails[0].src; 
        }
        thumbnails.forEach(img => {
            img.addEventListener("click", function () {
                mainImage.src = this.src; 
            });
        });
    });