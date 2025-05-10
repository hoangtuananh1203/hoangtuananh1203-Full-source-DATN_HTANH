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

      function Tangluotxem(id){
        var api = API_ENDPOIN.Diadiem+`/Luotxem?id=${id}`
        fetch(api,{
          method :"PUT",  
        })
        .then(p=>{
          if(!p.status){
            showAlert("Lỗi hệ thống!","alert-danger");
            return;
          }
          return p.json();
        }).then(data=>{
            if(data.message=="Add count success")
            {
              return;
            }
        }).catch(p=>showAlert(p.message,"alert-danger"))
      }
window.Themdanhsachcho= function(){
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];
  var api = API_ENDPOIN.ItemDanhsachCho;
  var token = localStorage.getItem("token");
    if (!token) {
      showAlert("Vui lòng đăng nhập trước!");
      return;
    }
  fetch(api,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      
    },
body: JSON.stringify({diadiemId:id})
    
  })
  .then(p=>{
    if(!p.status){
      showAlert("Lỗi khi thêm địa điểm vào danh sách chờ!","alert-danger");
      return;
    }
    return p.json();
  }).then(data=>{
    if(data.message=="Thêm thành công địa điểm vào danh sách chờ!"){
      showAlert(data.message);
      return;
      
    }
    if(data.message=="Địa điểm đã tồn tại trong danh sách!"){
      showAlert(data.message,"alert-warning");
      return;
      
    }
    
    showAlert(data.message, "alert-danger");


  }) .catch((error) => showAlert(error.message, "alert-danger"));

}
window.Themdatrainghiem= function(){
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];
  var api = API_ENDPOIN.ItemlichsuTraiNghiem;
  var token = localStorage.getItem("token");
    if (!token) {
      showAlert("Vui lòng đăng nhập trước!");
      return;
    }
  fetch(api,{
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
body: JSON.stringify({diadiemId:id})
  })
  .then(p=>{
    if(!p.status){
      showAlert("Lỗi khi thêm địa điểm vào danh sách chờ!","alert-danger");
      return;
    }
    return p.json();
  }).then(data=>{
    if(data.message=="Đánh dấu địa điểm đã trải nghiệm thành công!"){
      showAlert(data.message);
      return;
    }
    if(data.message=="Địa điểm đã tồn tại trong danh sách đã trải nghiệm!"){
      showAlert(data.message,"alert-warning");
      return;
    } 
    showAlert(data.message, "alert-danger");

  }) .catch((error) => showAlert(error.message, "alert-danger"));
}

function GetDetaildiadiem(){
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];
  Tangluotxem(id);
  var api = API_ENDPOIN.Diadiem+`/Find?id=${id}`
  fetch(api)
  .then(p=>{
    if(!p.status){
      showAlert("Lỗi khi lấy thôn tin cuat địa điểm!","alert-danger");
      return;
    }
    return p.json();
  }).then(data=>{
    Diadiemlienquan(data.loaiHinhId);
var tieudedd= document.querySelector(".tieudediadiem");

var noidungdd= document.querySelector(".noidungdiadiem");

tieudedd.innerHTML=` 
          <div class="d-flex justify-content-between">
            <h3 class="m-0 text-start">${data.tieude}</h3>
            <p class="text-end">Lượt xem: ${data.luotxem}</p>
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
           var tinhtrang= data.tinhtrang==true?"Đang mở cửa":"Đã đóng cửa";
           var dateoc= data.mocuadongcua==null?"Đang cập nhật":data.mocuadongcua;
        var timeoc= data.dateOC==""?"Đang cập nhật":data.dateOC;
        var sdt= data.sdt==""?"Đang cập nhật":data.sdt;
          noidungdd.innerHTML=`
           <div class="col-md-12 rounded border-1 border h-auto px-2 ">
            <h4>Vị trí:</h4>
            <div class="w-100 " style="height:300px !important">
            ${data.urlmap}
            </div>
           
            <p>Loại hình: ${data.loaiHinh}</p>
            <p>Giá vé: ${giave} </p>
            <p>Dành cho: ${data.danhcho}</p>
            <p>Thuộc tỉnh: ${data.tinhThanh}</p>
            <p>Tình Trạng: ${tinhtrang}</p>
            <p>Ngày mở cửa: ${dateoc}</p>
            <p>Giờ mở cửa: ${timeoc}</p>
            <p>Liên hệ: ${sdt}</p>

            <button class="btn mybutton text-white w-100 my-2 m-auto" onclick="Themdanhsachcho()">
              Thêm vào xem sau
            </button>
            <button class="btn mybuttonok w-100 my-2 m-auto" onclick="Themdatrainghiem()">
              Thêm vào đã trải nghiệm
            </button>
            
            </div>`;
            document.querySelector("#contentdiadiem").innerHTML=markdownToHtml(data.noidung);
  }).catch(p=>showAlert("Erorr"+p.message,"alert-danger"))
}
GetDetaildiadiem();
function Diadiemlienquan(id) {
  var api = API_ENDPOIN.Diadiem + `/diadiemlienquan?id=${id}`;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`Lỗi HTTP:${p.status}`, "aler-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var showlist = document.querySelector(".diadiemlienquan");
      showlist.innerHTML = "";
      data.items.forEach((element) => {
        var mocuadongcua = element.mocuadongcua==null ?"Đang cập nhật": element.mocuadongcua;
        var gia= element.gia==0?"Đang cập nhật":element.gia;
        showlist.innerHTML += `     <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
          <div class=" p-0  d-flex w-100 rounded border border-1 " >
              <div class="col-md-4 p-0 m-0"> <a href="/detaildiadiem.html?id=${element.diadiemId}" class=" w-100">
                 <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />  </a>
               </div>
            
               <div class=" col-md-8 px-3  ">
                 <h4 class="inlinenowrap1"> ${element.tieude}</h4>
                 <p class="p-0 m-1 text-dark inlinenowrap1">
                  ${element.motangan}
                 </p>                 
                 <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                 <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${mocuadongcua}</p>
                 <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                 
                <div class="d-flex justify-content-between mt-2 p-0">
                 <p class="ps-1 text-start text-danger fs-6">Giá vé: ${gia}</p>

                 <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                </div>

               </div>
         
          </div>
      </div>
          `;
      });
    
    });
}
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
    
window.danhgiadd= function(id){
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];
  var token = localStorage.getItem("token");
  
  var message = document.querySelector(".messageerror");
   if(!token){
    showAlert("Vui lòng đăng nhập để đánh giá!","alert-danger");
    return;
   }
   var noidung = document.querySelector("#noidungdanhgiasp").value;
   const diem = parseInt(document.querySelector(".giatridiem").textContent); 
var check= true;
  if(noidung.trim()==""){
    message.classList.remove("d-none");
    check=false;
  }
  else{
    message.classList.add("d-none");
    check=true;

  }
  if(diem<=0 || diem>5){
  showAlert("Vui lòng chọn điểm!","alert-danger");
    check=false;
  }
  else{

    check=true;

  }
  if(check==false)
  {
  showAlert("Vui lòng điền đầy đủ thông tin!","alert-danger");
  return;

  }
   var api = API_ENDPOIN.Danhgia;
   fetch(api,{
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      
    },
      body: JSON.stringify({
        diem: parseInt(diem),
        noidung: noidung,
        diadiemId: parseInt(id),
         userId: "string"
      })
    }).then(p=>{
      if(!p.ok){
        showAlert(`${p.status} :${p.statusText}  `,"alert-danger");
        return

      }
      return p.json();
    })
    .then(data=>{
      if(data.message=="Bạn đã đánh giá địa điểm này rồi!"){
        showAlert(data.message,"alert-danger");
        return;
      }
      if(data.message=="Đánh giá thành công!"){
        showAlert(data.message);
        Getalldanhgia();
        return;
      }

})
.catch(err => showAlert("Lỗi khi gửi đánh giá: " + err, "alert-danger"));


}
function generatePaginations(currentPage, totalPages, idelement, aaaa) {
  let pagination = document.getElementById(idelement);
  pagination.innerHTML = "";
  if (totalPages < 2) return;
  let addPage = (page, text = page, isDisabled = false, isActive = false) => {
    let li = document.createElement("li");
    li.className = `page-item ${isActive ? "active" : ""} ${
      isDisabled ? "disabled" : ""
    }`;

    let a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.innerHTML = text;
    if (!isDisabled) {
      // là false thì
      a.addEventListener("click", function (event) {
        event.preventDefault();
        aaaa(page);
      });
    }

    li.appendChild(a);
    pagination.appendChild(li);
  };

  if (currentPage > 1) addPage(currentPage - 1, "&laquo;");
  addPage(1, "1", false, currentPage === 1); // Trang đầu

  if (currentPage > 3) addPage(null, "...", true); // Dấu "..."

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    addPage(i, i, false, currentPage === i);
  }

  if (currentPage < totalPages - 2) addPage(null, "...", true); // Dấu "..."

  if (totalPages > 1)
    addPage(totalPages, totalPages, false, currentPage === totalPages); // Trang cuối
  if (currentPage < totalPages) addPage(currentPage + 1, "&raquo;"); // Nút "Tiếp"
}
Getalldanhgia();
function Getalldanhgia(page=1) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) {
    showAlert("Không tìm thấy ID địa điểm!", "alert-danger");
    return;
  }
  var api = API_ENDPOIN.Danhgia + `/DanhgiaDiaDiem?id=${parseInt(id)}&page=${page}`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`Lỗi HTTP:${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var showlist = document.querySelector(".showlistdanhgia");
      showlist.innerHTML="";
   
  if (data.message === "Địa điểm hiện không có đánh giá!" || !data.items || data.items.length === 0) {
    showlist.innerHTML = `<h5 class="text-center mt-3">Địa điểm hiện chưa có đánh giá nào!</h5>`;
    return;
  }
      data.items.forEach((element) => {
  
       
        showlist.innerHTML += `  
         <div class=" m-2 p-1">
            <h6>${element.nameuser}</h6>
            <p class="ps-3 m-0">Điểm đánh giá: <span class="fw-bold">${element.diem} <i class="fa fa-star px-1 text-warning" data-value="1"></i></span></p>
            <p class=" ps-3">Nội dung: ${element.noidung}</p>
          </div>
          <hr> 
          `;
      });
     generatePaginations(page,data.totalPages,"paginationdanhgia",Getalldanhgia)
    
    });
}
function Tinhdanhgia() {
  var url = window.location.toString()
  var catuurl_id = url.split('?id=');
  var id =catuurl_id[1];

  var api = API_ENDPOIN.Danhgia + `/TinhtoanDanhgia?id=${id}`;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`Lỗi HTTP:${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var sodg = document.querySelector(".tongdanhgia");
      sodg.innerHTML = "";
      var diemtb = document.querySelector(".diemtrungbinh");
      diemtb.innerHTML = "";
      sodg.innerHTML = `Số lượt đánh giá:${data.tongdanhgia}`;
      diemtb.innerHTML = `Điểm đánh giá: ${data.trungbinhdiem}`;
    
    
    })  .catch((error) => {
     
      showAlert("Không thể kết nối đến máy chủ!", "alert-danger");
    });
}
Tinhdanhgia();
