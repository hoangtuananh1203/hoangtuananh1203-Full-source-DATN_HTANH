import API_ENDPOIN from "./apiweb.js";




var token = localStorage.getItem("token");
if(!token){
  showAlert(" Vui lòng đăng nhập trước!","alert-danger")
  window.location.href = "/index.html";  
}
const thongtin = parseJwt(token);
     
const email = thongtin["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]; 

window.doimatkhau=function (){
  const oldPasswor = document.getElementById("oldPasswor").value;
  const newPasswor = document.getElementById("newPasswor").value;
  const confirmPasswor = document.getElementById("confirmPasswor").value;
  const token = localStorage.getItem("token")
  if(!token){
  window.location.href="/index.html"
  return;
  }
  if(newPasswor.trim() !=confirmPasswor.trim()){
    showAlert("Nhập lại mật khẩu không trùng khớp, Vui lòng thử lại", "alert-danger");
    return;

  }
  const doimk= API_ENDPOIN.EditAccount+`/customer`
  fetch(doimk,{
    method:"PUT",
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      email:email,
      oldPasss:oldPasswor,
      newPasss:newPasswor
    })

  }).then(p=>{
    if(!p.status){
    showAlert("Lỗi không thể đổi mật khẩu", "alert-danger");
     
      return
    }
    return p.json();
  }).then(data=>{
    if(data.message){
      showAlert(data.message)
      return
    }
  }).catch(p=>{
    console.error(p);
    
  })
}
function gettt(){
    const token = localStorage.token;  
      if(!token){
        showAlert("Vui lòng đăng nhập trước!","alert-danger")
        return;
      }
      const thongtin = parseJwt(token);
      const username = thongtin.Username;  
      const sdt = thongtin["SĐT"];        
      const email = thongtin["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]; 
  
      const userinfomations= document.querySelector(".userinfomations")
      userinfomations.innerHTML="";
      userinfomations.innerHTML=`
         <strong>Tên đăng nhập:</strong> ${username} <br>
                  <strong>Email:</strong> ${email} <br>
                      
      `
  
   }
   gettt()
function showAlert(message, type = 'alert-primary', duration = 5000) {

  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', type, 'alert-dismissible', 'fade', 'show', 'position-fixed', 'bottom-0', 'end-0', 'm-3', 'mb-5');
  alertDiv.style.marginBottom = "990px"; 
  
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.classList.remove('show');
    alertDiv.classList.add('fade');
    setTimeout(() => {
      alertDiv.remove();
    }, 500); 
  }, duration);
}
function parseJwt(token) {
    try {
      // Chuyển phần payload của JWT từ Base64 sang JSON
      const base64Url = token.split(".")[1]; // Phần thứ hai của JWT
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
  
      return JSON.parse(jsonPayload); // Trả về đối tượng JSON chứa thông tin người dùng
    } catch (error) {
      console.error("Token không hợp lệ:", error.message);
      return null; // Trả về null nếu token không hợp lệ
    }
  }

  function itemdiadiem() {
    var token = localStorage.getItem("token");
    if (!token) {
      showAlert("Vui lòng đăng nhập trước!");
      return;
    }
    var api = API_ENDPOIN.ItemlichsuTraiNghiem;
    fetch(api,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    })
      .then((p) => {
        if (!p.ok) {
          showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
          return;
        }
        return p.json();
      })
      .then((data) => {
        if(data.message=="Không tìm thấy dịa điểm nào!"){
          showAlert("Không có địa điểm nào được thêm!","alert-warning");
          return;
        }
        const danhsachdoituong = document.querySelector(".danhsachdatrainghiem");
        danhsachdoituong.innerHTML = "";
        var count=0;
        if (!Array.isArray(data.itemdiadiem) || data.itemdiadiem.length === 0) {

            danhsachdoituong.innerHTML = `<h5 class="text-center text-black-50 pt-4">Hiện chưa có địa điểm nào được thêm</h5>`;
            return;
        }
        
        data.itemdiadiem.forEach((element) => {
            var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
            var timeoc= element.dateOC;
            var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
     var ngaythem = element.dateAdd.split("T")[0];
     var parts = ngaythem.split("-"); 
var ngayFormat = parts[2] + "/" + parts[1] + "/" + parts[0];
count++;

          danhsachdoituong.innerHTML += `  <div class=" p-0 diadiemdl    rounded d-flex justify-content-between" >
        <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">
        <span class="d-flex my-auto mx-2 fs-5 sothutu">${count}</span>
         <div class="col-md-4 p-0 m-0 " style="height:240px; min-width:130px">
           <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
         </div>
         <div class=" col-md-7 px-3  reponsimobilecontent">
           <h4 class="inlinenowrap2">${element.tieude}</h4>
           <p class="p-0 m-1 text-dark inlinenowrap1">${element.motangan}
           </p>                 
           <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình: ${element.loaiHinh}</p>                     
           <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa: ${dateoc} thời gian từ ${timeoc}</p>
           <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
           
          <div class="d-flex justify-content-between m-0 p-0">
           <p class="ps-1 text-start text-danger fs-6 giave" >Giá vé: ${giave} </p>

           <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
          </div>

         </div>
          </a>
           <div class="d-flex  btndelete">
                    <button class="btn mybuttonnot m-auto ms-5" onclick="deletelistitem(id=${element.itemTrainghiem})">Xoá</button>
            </div>
       
       </div>
      
<hr>
                 
        `;
     
        });
      })
      .catch((error) => showAlert(error.message, "alert-danger"));
  }
  itemdiadiem();
  window.deletelistitem  = function (id) {
    Swal.fire({
      title: ` Bạn có chắc chắn xoá? `,
      text: "Hành động này không thể hoàn tác!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        var token = localStorage.getItem("token");
        if (!token) {
          showAlert("Vui lòng đăng nhập trước!");
          return;
        }
        var api = API_ENDPOIN.ItemlichsuTraiNghiem + `?id=${id}`;
        fetch(api, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((p) => {
            if (!p.status) {
              showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
              return;
            }
            return p.json();
          })
          .then((data) => {
            if (data.message) {
              showAlert(data.message);
              itemdiadiem();
            }
          })
          .catch((error) => showAlert(error.message, "alert-danger"));
      }
    });
  };
  window.timkiemdiadiem=function() {
    var token = localStorage.getItem("token");
    if (!token) {
      showAlert("Vui lòng đăng nhập trước!");
  
      return;
    }
    var keyword = document.querySelector("#timkiemdiadiem").value;
    if(keyword.trim()==""){
      showAlert("Vui lòng nhập từ khoá tìm kiếm!", "alert-danger");
      itemdiadiem();
      return;
    }
    var api = API_ENDPOIN.ItemlichsuTraiNghiem+`/timdiadiem?keyword=${keyword}`;
    fetch(api,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
    })
      .then((p) => {
        if (!p.ok) {
          showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
          return;
        }
        return p.json();
      })
      .then((data) => {
        if(data.message=="Không tìm thấy dịa điểm nào!"){
          showAlert("Không có địa điểm nào được thêm!","alert-warning");
          return;
        }
        const danhsachdoituong = document.querySelector(".danhsachdatrainghiem");
        danhsachdoituong.innerHTML = "";
        var count=0;
        if (!Array.isArray(data.itemdiadiem) || data.itemdiadiem.length === 0) {

            danhsachdoituong.innerHTML = `<h5 class="text-center text-black-50 pt-4">Hiện chưa có địa điểm nào được thêm</h5>`;
            return;
        }
        
        data.itemdiadiem.forEach((element) => {
            var dateoc= element.mocuadongcua==null?"Đang cập nhật":element.mocuadongcua;
            var timeoc= element.dateOC;
            var giave= element.gia==0 ? "Miễn phí":element.gia+" vnđ"
     var ngaythem = element.dateAdd.split("T")[0];
     var parts = ngaythem.split("-"); 
var ngayFormat = parts[2] + "/" + parts[1] + "/" + parts[0];
count++;

          danhsachdoituong.innerHTML += `  <div class=" p-0     rounded w-100" >
                   <div class="d-flex reponsimobile">
                  
                    <div class="col-md-4 p-0 m-0 d-flex " style="height:240px; min-width:130px">
                     <div class="m-auto col-lg-1 p-0 ">${count}</div>
                   <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile">

                      <img src="/img/${element.imagemain}" class="p-0 m-0 rounded" alt="" width="100%" height="100%" />
                     </a>
                      </div>
                    <div class=" col-md-6 px-3  reponsimobilecontent">
                      <h4 class="inlinenowrap2">${element.tieude}</h4>
                      <p class="p-0 m-1 text-dark inlinenowrap">${element.motangan}
                      </p>                 
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Loại hình:${element.loaiHinh}</p>                     
                      <p class=" inlinenowrap1 p-0 m-1 text-dark">Ngày mở cửa:${dateoc} thời gian từ ${timeoc}</p>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Địa chỉ: ${element.diachi}</p>
                      
                     <div class="d-flex justify-content-between m-0 p-0">
                      <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

                      <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
                     </div>
                      <p class="inlinenowrap1 p-0 m-1 text-dark">Ngày thêm: ${ngayFormat}</p>

                    </div>
                    <div class="d-flex col-lg-1">
                    <button class="btn mybuttonnot m-auto ms-5" onclick="deletelistitem(id=${element.itemTrainghiem})">Xoá</button>
                    </div>

                    </div>

                 
                  </div>
          <hr>
        `;
     
        });
      })
      .catch((error) => showAlert(error.message, "alert-danger"));
  }