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
//#region loaiHinh
function LoaiHinhNav(){
    var api = API_ENDPOIN.LoaiHinh+`/GetallLH`;
     fetch(api)
     .then(p=>{
        if(!p.status){
           showAlert("Lỗi Https:"+p.status) ;
            return;
        }
        return p.json();
     }).then(data=>{
        var sholist = document.querySelector(".menuloaihinh");
        sholist.innerHTML="";
        data.forEach(element => {
            sholist.innerHTML +=`
             <li class="text-white">
                <div class="d-flex justify-content-between navlinka">
                 <span  onclick="timtheoloaihinh(${element.loaiHinhId})" class="text-white  w-100 py-1" style="cursor: pointer;"
>${element.tenLoai}</span><span>(${element.sodiadiem})</span>
                </div>
            </li>`;
        });
     }).catch(p=>showAlert(p.message))

}
LoaiHinhNav();
//#endregion 
//#region danhcho doi tuong
function Danhchonav(){
    var api = API_ENDPOIN.DoiTuong+`/GetallDT`;
     fetch(api)
     .then(p=>{
        if(!p.status){
           showAlert("Lỗi Https:"+p.status) ;
            return;
        }
        return p.json();
     }).then(data=>{
        var sholist = document.querySelector(".menudoituong");
        sholist.innerHTML="";
        data.forEach(element => {
           
            sholist.innerHTML +=`<li class="text-white ">
  <div class="d-flex justify-content-between navlinka ">
    <span  onclick="timddtheodoituong(${element.danhchoId})" class="text-white w-100 py-1" style="cursor: pointer;">${element.doituong}</span>
    <span>(${element.sodiadiem})</span>
  </div>
</li>
`;
        });
     }).catch(p=>showAlert(p.message))

}
Danhchonav();
//#endregion
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
function Danhsachdiadiemcs(page =1 ){
var api = API_ENDPOIN.Diadiem+`?page=${page}`;
fetch(api)
.then(p=>{
    if (!p.status){
        showAlert(`Lỗi khi tải danh sách địa điểm.${p.status}`,"alert-danger");
    }
    return p.json();
}).then(data=>{
    var showlist = document.querySelector(".danhsachdiadiemct")
    showlist.innerHTML="";
    data.items.forEach(element=>{
        var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
        var timeoc= element.dateOC;
        var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
        showlist.innerHTML +=`  <div class=" p-0 diadiemdl    rounded" >
                   <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
                    <div class="col-md-5 p-0 m-0 " style="height:240px; min-width:130px">
                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                    </div>
                    <div class=" col-md-7 px-3  reponsimobilecontent">
                      <h4 class="inlinenowrap2">${element.tieude}</h4>
                      <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                      <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

                      <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                     </div>

                    </div>
                   </a>
                  </div>`
    });
    generatePaginations(page,data.totalPages,"paginationdd",Danhsachdiadiemcs)
}).catch(p=> showAlert(`Lỗi khi tải danh sách địa điểm.+${p.message}`,"alert-danger"))


}
Danhsachdiadiemcs();

window.timtheoloaihinh=function (id,page =1 ){
    var api = API_ENDPOIN.Diadiem+`/loaihinh?id=${id}&page=${page}`;
    fetch(api)
    .then(p=>{
        if (!p.status){
            showAlert(`Lỗi khi tải danh sách địa điểm.${p.status}`,"alert-danger");

        }
        return p.json();
    }).then(data=>{
        var showlist = document.querySelector(".danhsachdiadiemct")
        showlist.innerHTML="";
        data.items.forEach(element=>{
            var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
            var timeoc= element.dateOC;
            var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
            showlist.innerHTML +=`  <div class=" p-0 diadiemdl    rounded" >
                  <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
                    <div class="col-md-5 p-0 m-0 " style="height:240px; min-width:130px">
                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                    </div>
                    <div class=" col-md-7 px-3  reponsimobilecontent">
                      <h4 class="inlinenowrap2">${element.tieude}</h4>
                      <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                      <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

                      <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                     </div>

                    </div>
                   </a>
                  </div>`
        });
        generatePaginations(page, data.totalPages, "paginationdd", (newPage) => timtheoloaihinh(id, newPage));
      }).catch(p=> showAlert(`Lỗi khi tải danh sách địa điểm.+${p.message}`,"alert-danger"))
    
    
    }

window.timddtheodoituong=function (id ,page =1 ){

var api = API_ENDPOIN.Diadiem+`/danhcho?id=${id}&page=${page}`;
fetch(api)
.then(p=>{
    if (!p.status){
        showAlert(`Lỗi khi tải danh sách địa điểm.${p.status}`,"alert-danger");

    }
    return p.json();
}).then(data=>{
    var showlist = document.querySelector(".danhsachdiadiemct")
    showlist.innerHTML="";
    data.items.forEach(element=>{
        var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
        var timeoc= element.dateOC;
        var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
        showlist.innerHTML +=`   <div class=" p-0 diadiemdl    rounded" >
                  <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
                    <div class="col-md-5 p-0 m-0 " style="height:240px; min-width:130px">
                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                    </div>
                    <div class=" col-md-7 px-3  reponsimobilecontent">
                      <h4 class="inlinenowrap2">${element.tieude}</h4>
                      <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                      <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

                      <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                     </div>

                    </div>
                   </a>
                  </div>`
    });
    generatePaginations(page, data.totalPages, "paginationdd", (newPage) => timddtheodoituong(id, newPage));

}).catch(p=> showAlert(`Lỗi khi tải danh sách địa điểm.+${p.message}`,"alert-danger"))
}
//#region show select tinhthanh and loaihinh
function GetallTinhthanh(){
    var api = API_ENDPOIN.Tinhthanh;
    fetch(api)
      .then((p) => {
        if (!p.ok) {
          showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
          return;
        }
        return p.json();
      })
      .then((data) => {
        if(data.message){
          showAlert("Hiện chưa có tỉnh thành nào được thêm!");
          return;
        }
        const danhsachdoituong = document.querySelector("#provinceSelect");
        danhsachdoituong.innerHTML = `<option value="">Tất cả</option>`;
     
        data.forEach((element) => {

            danhsachdoituong.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
    
       
        });
      })
      .catch((error) => showAlert(error.message, "alert-danger"));
  
}
GetallTinhthanh();
function Getalldoituong(){
  var api = API_ENDPOIN.DoiTuong;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có đối tượng nào được thêm!");
        return;
      }
      const danhsachdoituong = document.querySelector("#typedoituong");
      danhsachdoituong.innerHTML = ``;
   
      data.forEach((element) => {

          danhsachdoituong.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
  
     
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));

}
Getalldoituong();
window.timkiemdiadiem=function(page=1){
  const cleanUrl = window.location.pathname;
  window.history.replaceState({}, "", cleanUrl);
var keyword = document.querySelector("#keywordsearch").value;
var tinhthanh = document.querySelector("#provinceSelect").value;
var loaidiadiem = document.querySelector("#loaidiadiem").value;
var xapxeptheo = document.querySelector("#xapxeptheo").value;
var doituong = document.querySelector("#typedoituong").value;



var api = API_ENDPOIN.Diadiem+`/search?search=${keyword}&tinhthanh=${tinhthanh}
&loaidiadiem=${loaidiadiem}&doituong=${doituong}&sortBy=${xapxeptheo}&page=${page}`
fetch(api)
.then(p=>{
    if (!p.status){
        showAlert(`Lỗi khi tìm kiếm.${p.status}`,"alert-danger");
    }
    return p.json();
})
.then(data=>{
    if (data.message == "Không tìm thấy địa điểm nào!") {
        showAlert(data.message, "alert-warning");
        return;
      }
    var showlist = document.querySelector(".danhsachdiadiemct")
    showlist.innerHTML="";
    data.items.forEach(element=>{
        var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
        var timeoc= element.dateOC;
        var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
        showlist.innerHTML +=`  <div class=" p-0 diadiemdl    rounded" >
                  <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
                    <div class="col-md-5 p-0 m-0 " style="height:240px; min-width:130px">
                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                    </div>
                    <div class=" col-md-7 px-3  reponsimobilecontent">
                      <h4 class="inlinenowrap2">${element.tieude}</h4>
                      <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                      <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

                      <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                     </div>

                    </div>
                   </a>
                  </div>`
    });
    generatePaginations(page,data.totalPages,"paginationdd",timkiemdiadiem)
}).catch(p=> showAlert(`Lỗi khi tải danh sách .+${p.message}`,"alert-danger"))

}

//#endregion

window.timkiemdiadiemindex=function(keyword,page=1){

  var api = API_ENDPOIN.Diadiem+`/search?search=${keyword}&page=${page}`
  fetch(api)
  .then(p=>{
      if (!p.status){
          showAlert(`Lỗi khi tìm kiếm.${p.status}`,"alert-danger");
      }
      return p.json();
  })
  .then(data=>{
      if (data.message == "Không tìm thấy địa điểm nào!") {
          showAlert(data.message, "alert-warning");
          return;
        }
      var showlist = document.querySelector(".danhsachdiadiemct")
      showlist.innerHTML="";
      data.items.forEach(element=>{
          var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
          var timeoc= element.dateOC;
          var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
          showlist.innerHTML +=`  <div class=" p-0 diadiemdl    rounded" >
                    <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
                      <div class="col-md-5 p-0 m-0 " style="height:240px; min-width:130px">
                        <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                      </div>
                      <div class=" col-md-7 px-3  reponsimobilecontent">
                        <h4 class="inlinenowrap2">${element.tieude}</h4>
                        <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                        </p>                 
                        <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
                        <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
                        <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                        
                       <div class="d-flex justify-content-between m-0 p-0">
                        <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>
  
                        <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                       </div>
  
                      </div>
                     </a>
                    </div>`
      });
      generatePaginations(page,data.totalPages,"paginationdd",timkiemdiadiemindex)
  }).catch(p=> showAlert(`Lỗi khi tải danh sách .+${p.message}`,"alert-danger"))
  
  }

  var params = new URLSearchParams(window.location.search);
  var keyword = params.get("keyword");
  
  if (keyword) {
    timkiemdiadiemindex(keyword);
  }
  













