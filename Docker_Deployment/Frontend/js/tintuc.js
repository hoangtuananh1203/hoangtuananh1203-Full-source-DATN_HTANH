import API_ENDPOIN from "./apiweb.js";
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
function Danhsachsukien(page =1 ){
var api = API_ENDPOIN.SukienTintuc+`?page=${page}`;
fetch(api)
.then(p=>{
    if (!p.status){
        showAlert(`Lỗi khi tải danh sách sự kiện - tin tức.${p.status}`,"alert-danger");
    }
    return p.json();
}).then(data=>{
    var showlist = document.querySelector(".danhsachsktt")
    showlist.innerHTML="";
    data.items.forEach(element=>{
       var date1 = element.dateOpen.split("T")[0];
     var date2=  element.dateClose.split("T")[0];
        showlist.innerHTML +=`   <div class="containertt rounded d-flex mb-3 p-0 w-100">
           <a href="/sukientintucdetail.html?id=${element.sukienId}"class="d-flex reponsimobile w-100">
                    <div class="col-md-4 p-0 m-0 imagelistsktt">
                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded main-image"  alt="" />
                    </div>
                    <div class=" col-md-8 px-3  reponsimobilecontent">
                      <h5 class="inlinenowrap2">${element.tieude}</h5>
                      <p class="p-0 m-1 text-dark inlinenowrap2">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại sự kiện: ${element.loaisukien}</p>                     
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Tổ chức tại tỉnh: ${element.tinhThanh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${date1} đến  ${date2}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                    

                     </div>

                    </div>
                   </a>
        </div>`
    });
    generatePaginations(page,data.totalPages,"paginationsktt",Danhsachsukien)
}).catch(p=> showAlert(`Lỗi khi tải danh sách sự kiện.+${p.message}`,"alert-danger"))


}
Danhsachsukien();
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnradioall").addEventListener("change", function () {
      if (this.checked) Locloaisukien(0);
    });

    document.getElementById("btnradio1").addEventListener("change", function () {
      if (this.checked) Locloaisukien(1);
    });

    document.getElementById("btnradio2").addEventListener("change", function () {
      if (this.checked) Locloaisukien(3);
    });

    document.getElementById("btnradio3").addEventListener("change", function () {
      if (this.checked) Locloaisukien(2);
    });
  });
window.Locloaisukien=function(id,page =1 ){
    var api = API_ENDPOIN.SukienTintuc+`/loaihinh?idloaisukien=${id}&page=${page}`;
    fetch(api)
    .then(p=>{
        if (!p.status){
            showAlert(`Lỗi khi tải danh sách sự kiện - tin tức.${p.status}`,"alert-danger");
        }
        return p.json();
    }).then(data=>{
        var showlist = document.querySelector(".danhsachsktt")
        showlist.innerHTML="";
        data.items.forEach(element=>{
           var date1 = element.dateOpen.split("T")[0];
         var date2=  element.dateClose.split("T")[0];
            showlist.innerHTML +=`   <div class="containertt rounded d-flex mb-3 p-0 w-100">
               <a href="/sukientintucdetail.html?id=${element.sukienId}"class="d-flex reponsimobile w-100">
                        <div class="col-md-4 p-0 m-0 " style="height:240px; max-width:390px">
                          <img src="/img/${element.imagemain}" class="p-0 m-0 rounded main-image"  alt="" />
                        </div>
                        <div class=" col-md-8 px-3  reponsimobilecontent">
                          <h5 class="inlinenowrap2">${element.tieude}</h5>
                          <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                          </p>                 
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Loại sự kiện: ${element.loaisukien}</p>                     
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Tổ chức tại tỉnh: ${element.tinhThanh}</p>                     
                          <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${date1} đến  ${date2}</p>
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                          
                         <div class="d-flex justify-content-between m-0 p-0">
                        
    
                         </div>
    
                        </div>
                       </a>
            </div>`
        });
        generatePaginations(page, data.totalPages, "paginationsktt", (newPage) => Locloaisukien(id, newPage));
    }).catch(p=> showAlert(`Lỗi khi tải danh sách sự kiện.+${p.message}`,"alert-danger"))
    
    
    }

    
window.Timsukientintuc=function (page =1 ){
    var keyword = document.querySelector("#keywordsktt").value;
    if(keyword.trim()==""){
        showAlert("Vui lòng nhập từ khoá tìm kiếm!","alert-danger");
        return;
    }
    var api = API_ENDPOIN.SukienTintuc+`/search?search=${keyword}&page=${page}`;
    fetch(api)
    .then(p=>{
        if (!p.status){
            showAlert(`Lỗi khi tải danh sách sự kiện.${p.status}`,"alert-danger");

        }
        return p.json();
    }).then(data=>{
        var showlist = document.querySelector(".danhsachsktt")
        showlist.innerHTML="";
        data.items.forEach(element=>{
           var date1 = element.dateOpen.split("T")[0];
         var date2=  element.dateClose.split("T")[0];
            showlist.innerHTML +=`   <div class="containertt rounded d-flex mb-3 p-0 w-100">
               <a href="/sukientintucdetail.html?id=${element.sukienId}"class="d-flex reponsimobile w-100">
                        <div class="col-md-4 p-0 m-0 " style="height:240px; max-width:390px">
                          <img src="/img/${element.imagemain}" class="p-0 m-0 rounded main-image"  alt="" />
                        </div>
                        <div class=" col-md-8 px-3  reponsimobilecontent">
                          <h5 class="inlinenowrap2">${element.tieude}</h5>
                          <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                          </p>                 
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Loại sự kiện: ${element.loaisukien}</p>                     
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Tổ chức tại tỉnh: ${element.tinhThanh}</p>                     
                          <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${date1} đến  ${date2}</p>
                          <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                          
                         <div class="d-flex justify-content-between m-0 p-0">
                        
    
                         </div>
    
                        </div>
                       </a>
            </div>`
        });
        generatePaginations(page,data.totalPages,"paginationsktt",Timsukientintuc)
    }).catch(p=> showAlert(`Lỗi khi tải danh sách sự kiện.+${p.message}`,"alert-danger"))
    
    
    }


















