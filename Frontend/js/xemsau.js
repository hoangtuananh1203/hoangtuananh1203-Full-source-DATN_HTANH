import API_ENDPOIN from "./apiweb.js";

function itemdiadiem() {
    var token = localStorage.getItem("token");
    if (!token) {
      showAlert("Vui lòng đăng nhập trước!");
      return;
    }
    var api = API_ENDPOIN.ItemDanhsachCho;
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
        const danhsachdoituong = document.querySelector(".danhsachxemsau");
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

        danhsachdoituong.innerHTML += `   <div class=" p-0 diadiemdl    rounded d-flex justify-content-between" >
        <a href="/detaildiadiem.html?id=${element.diadiemId}"class="d-flex reponsimobile  ">
          <span class="d-flex my-auto mx-2 fs-5 sothutu">${count}</span>
          <div class="col-md-4 p-0 m-0 imagelistsktt" >
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
            <p class="ps-1 text-start text-danger fs-6">Giá vé: ${giave} </p>

            <p class="p-0 text-end text-black-50">Lượt xem: ${element.luotxem}</p>
            </div>

          </div>
          </a>
            <div class="d-flex col-lg-1 btndelete ">
                          <button class="btn mybuttonnot m-auto ms-5" onclick="xoadiadiemkhoids(id=${element.itemListAwaitId})">Xoá</button>
            </div>
       
       </div>
      
<hr>
`;
     
        });
      })
      .catch((error) => showAlert(error.message, "alert-danger"));
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
  itemdiadiem();
  
 
  window.xoadiadiemkhoids = function (id) {
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
        var api = API_ENDPOIN.ItemDanhsachCho + `?id=${id}`;
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