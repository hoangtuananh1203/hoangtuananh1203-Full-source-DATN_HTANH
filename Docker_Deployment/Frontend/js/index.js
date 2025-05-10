import API_ENDPOIN from "./apiweb.js";
function showAlert(message, type = "alert-success", duration = 2000) {
  let alertContainer = document.getElementById("alert-container");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert ${type} alert-dismissible `;
  alertDiv.innerHTML = `${message}`;

  alertContainer.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.classList.remove("show");
    setTimeout(() => alertDiv.remove(), 500);
  }, duration);
}
function GetBanner() {
  var api = API_ENDPOIN.Bannerthree;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`Lỗi HTTP:${p.ok}`, "aler-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var showlist = document.querySelector("#danhsachimagebanner");
      showlist.innerHTML = "";
      data.items.forEach((element) => {
        showlist.innerHTML = `  <div class="carousel-item active rounded">
          

        <img
          src="/img/${element.image1}"
          class="img-fluid w-100  bg-secondary rounded imagebanner" 
          alt="First slide"
        />
      
      </div>
      
      <div class="carousel-item  rounded">
        <img
          src="/img/${element.image2}"
          class="img-fluid w-100  bg-secondary rounded imagebanner" 
           alt="Second slide"
        />
      </div>
      <div class="carousel-item  rounded">
        <img
          src="/img/${element.image3}"
          class="img-fluid w-100  bg-secondary rounded imagebanner" 
          alt="Second slide"
        />
      </div>
      `;
      });
    });
}

GetBanner();
function GetThinhhanh() {
  var api = API_ENDPOIN.Diadiem + `/thinhhanh`;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`Lỗi HTTP:${p.ok}`, "aler-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var showlist = document.querySelector(".listThinhHanh2");
      showlist.innerHTML = "";
      data.items1.forEach((element) => {
        showlist.innerHTML += `  <div class="containerimg1  col-sm-12  bg-danger rounded p-0 position-relative">
        
            <a href="/detaildiadiem.html?id=${element.diadiemId}" class="w-100">
          <img src="/img/${element.imagemain}" width="100%"  height="100%" alt=""></a>
          <div class="titlediadiemindex d-flex">
            <h5 class=" m-auto titlediadiemind ">${element.tinhThanh}</h5>
          </div>
        </div>
          `;
      });
      var showlist = document.querySelector(".listThinhHanh3");
      showlist.innerHTML = "";
      data.items2.forEach((element) => {
        showlist.innerHTML += ` <div class="containerimg3  col-sm-6 bg-danger rounded p-0 position-relative">
           <a href="/detaildiadiem.html?id=${element.diadiemId}" class="w-100">
          <img src="/img/${element.imagemain}" width="100%"  height="100%" alt=""></a>
          <div class="titlediadiemindex d-flex">
            <h5 class=" m-auto titlediadiemind ">${element.tinhThanh}</h5>
          </div>

        </div>
          `;
      });
    });
}
GetThinhhanh();
function Getsukiengan() {
  var api = API_ENDPOIN.SukienTintuc + `/Firstsktt`;
  fetch(api)
    .then((p) => {
      if (!p.ok) {
        showAlert(`Lỗi HTTP:${p.ok}`, "aler-danger");
        return;
      }
      return p.json();
    })
    .then(data => {
      var showlist = document.querySelector("#sukientintucgannhat");
      showlist.innerHTML = "";
     
    var dateopen = data.dateOpen.split("T")[0]
        showlist.innerHTML = `  
                  <h3 class="p-0 mt-5  " style="text-indent: 10px;">Sự kiện sắp tới</h3>
  <div class="row d-flex bannerbg p-3">
   <div class="col-lg-6 col-md-6 col-sm-12">
    <img src="/img/${data.imagemain}" alt="" class="py-2" width=100% height=100%>
   </div>
    <div class="noidung col-lg-6  rounder col-md-6 col-sm-12">
      <h4 class="text-center">${data.tieude}</h4>
   <p class="text-capitalize text-justify">${data.motangan}</p>
      <p >Thời gian diễn ra: ${dateopen}</p>
      <p >Địa chỉ: ${data.diachi}</p>
<div class="d-flex w-100">
<a href="tintuc.html" class="btn mybuttonok m-auto  text-center">Xem thêm</a>
</div>
    </div>
</div>
              `;
     
    });
   
}
Getsukiengan();
function diadiemmoi() {
    var api = API_ENDPOIN.Diadiem + `/ddmoi`;
    fetch(api)
      .then((p) => {
        if (!p.ok) {
          showAlert(`Lỗi HTTP:${p.ok}`, "aler-danger");
          return;
        }
        return p.json();
      })
      .then((data) => {
        var showlist = document.querySelector(".dsdddlmoi");
        showlist.innerHTML = "";
        data.items1.forEach((element) => {
          showlist.innerHTML += `    <div class="containerimgdd col-lg-6 col-md-12 col-sm-12 bg-danger rounded p-0  position-relative">
               
        <a href="/detaildiadiem.html?id=${element.diadiemId}" class="w-100">
          <img src="/img/${element.imagemain}" width="100%"  height="100%" alt="">
        </a>
        <div class="titlediadiemindex d-flex">
          <h6 class=" m-auto titlediadiemind ">${element.tinhThanh}</h6>
        </div>
    </div>

            `;
        });
        var showlist = document.querySelector(".dsddatmoi");
        showlist.innerHTML = "";
        data.items2.forEach((element) => {
          showlist.innerHTML += ` 
            <div class="containerimgdd col-lg-6 col-md-12 col-sm-12 bg-danger rounded p-0  position-relative">
      
        <a href="/detaildiadiem.html?id=${element.diadiemId}"class="w-100">
          <img src="/img/${element.imagemain}" width="100%"  height="100%" alt="">
        </a>
        <div class="titlediadiemindex d-flex">
          <h6 class=" m-auto titlediadiemind ">${element.tinhThanh}</h6>
        </div>
    </div>

   
            `;
        });
      });
  };
  diadiemmoi();
  window.Searchdd= function(){
    var keyword= document.querySelector("#timkiemdiadiem").value;
    if(keyword.trim()==""){
      window.location=`/dulich.html`
      
    }
    else{
      window.location=`/dulich.html?keyword=${keyword}`
    }

   }