import API_ENDPOINSADMIN from "./apiadmin.js";
//#region  bảo vệ 
window.LogoutAccount = function () {
  const token = localStorage.getItem("token");

  if (!token) {
      showAlert("Chưa có token. Bạn cần đăng nhập trước.","alert-danger");
      return;
  }
  else{
    showAlert("Đăng xuất thành công");
      localStorage.removeItem("token");   
      window.location.href = "/index.html";  
  }
 
  

};
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/index.html"; // Nếu không có token, chuyển hướng về trang chính
}

const userInfo = parseJwt(token);

if (!userInfo) {
  window.location.href = "/index.html"; 
}

const role =
  userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

if (role !== "Admin") {
  showAlert("Bạn không có quyền truy cập trang này!");
  window.location.href = "/index.html"; 
}

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token không hợp lệ:", error.message);
    return null;
  }
}
document.addEventListener('DOMContentLoaded', function () {
// Lắng nghe sự kiện khi nút Đóng được nhấn
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Tìm thẻ collapse chứa nút này
        const collapse = this.closest('.collapse');
        // Đóng collapse (gỡ bỏ class 'show')
        collapse.classList.remove('show');
    });
});
});
//#endregion

//#region sự kiện tooltip and dropdown
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: "hover", // Chỉ hiển thị khi hover
    });
  });
});
function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function checkSDT(sdt) {
  let regex = /^(0\d{9}|\+84\d{9})$/;
  if (!regex.test(sdt)) {
      return false;
  }
  return true;
}
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện khi nút Đóng được nhấn
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Tìm thẻ collapse chứa nút này
      const collapse = this.closest(".collapse");
      // Đóng collapse (gỡ bỏ class 'show')
      collapse.classList.remove("show");
    });
  });
});

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

//#endregion
//#region đóng góp
function generatePagination(currentPage, totalPages) {
  let pagination = document.getElementById("pagination");
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
        danhsachdonggop(page);
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

function danhsachdonggop(page = 1) {
  fetch(API_ENDPOINSADMIN.DongGop + `?page=${page}`)
    .then((res) => {
      if (!res.status) throw new Error("Lỗi khi tải danh sách đóng góp.");
      return res.json();
    })
    .then((data) => {
      const showlist = document.querySelector(".danhsachdonggop");
      showlist.innerHTML = ""; // Xóa danh sách cũ
if(data.message){
  showAlert("Hiện chưa có đóng góp nào!");
  return;
}
      data.items.forEach((element) => {
        const day = element.date.split("T")[0];
        var tt = element.trangthai;
        var trangthai = "";
        if (tt == 0) {
          trangthai = ` <p>Đóng góp mới</p>
                              <button class="btn btn-success mybuttontt" onclick="Daghinhandg(id=${element.donggopId})">Ghi nhận</button>
                              <button class="btn btn-danger mybuttontt" onclick="Xoadonggop(id=${element.donggopId})">Xóa</button>`;
        }
        if (tt == 1) {
          trangthai = ` <p>Đã xem xét</p>
               
                   <button class="btn btn-danger mybuttontt" onclick="Xoadonggop(id=${element.donggopId})">Xóa</button>`;
        }
        showlist.innerHTML += `
                  <tr>
                      <td style="text-align: center;">${element.donggopId}</td>
                      <td style="text-align: center;">${element.name}</td>
                      <td>${element.tieude}</td>
                      <td>${element.noidung}</td>
                      <td style="text-align: center;">${element.email}</td>
                      <td style="text-align: center;">${element.sdt}</td>
                      <td style="text-align: center;">${day}</td>
                      <td style="text-align: center;">
                          <div class="d-flex flex-column">
                            ${trangthai}
                          </div>
                      </td>
                  </tr>`;
      });

      generatePagination(page, data.totalPages);
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
  Sodonggop();
}
window.Daghinhandg = function (id) {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  fetch(API_ENDPOINSADMIN.DongGop + `/Edit?id=${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      showAlert("Ghi nhận đóng góp thành công!");
      danhsachdonggop();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      showAlert(
        "Đã có lỗi xảy ra khi cập nhật trạng thái đóng góp.",
        "alert-danger"
      );
    });
};

danhsachdonggop();
window.timkiemdonggop = function (page = 1) {
  var text = document.querySelector("#timdonggop").value;

  var trangthai = document.querySelector("#trangthaidonggop").value;

  fetch(
    API_ENDPOINSADMIN.DongGop +
      `/search?search=${text}&page=${page}&trangthai=${trangthai}`
  )
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const showlist = document.querySelector(".danhsachdonggop");
      showlist.innerHTML = ""; // Xóa danh sách cũ
      if (
        !data.items ||
        !Array.isArray(data.items) ||
        data.items.length === 0
      ) {
        showAlert("Không tìm thấy đóng góp nào!", "alert-warning");
        return;
      } else {
        data.items.forEach((element) => {
          const day = element.date.split("T")[0];
          var tt = element.trangthai;
          var trangthai = "";
          if (tt == 0) {
            trangthai = ` <p>Đóng góp mới</p>
                        <button class="btn btn-success mybuttontt" onclick="Daghinhandg(id=${element.donggopId})">Ghi nhận</button>
                        <button class="btn btn-danger mybuttontt" onclick="Xoadonggop(id=${element.donggopId})">Xóa</button>`;
          }
          if (tt == 1) {
            trangthai = ` <p>Đã xem xét</p>
         
          <button class="btn btn-danger mybuttontt" onclick="Xoadonggop(id=${element.donggopId})">Xóa</button>`;
          }
          showlist.innerHTML += `
            <tr>
                <td style="text-align: center;">${element.donggopId}</td>
                <td style="text-align: center;">${element.name}</td>
                <td>${element.tieude}</td>
                <td>${element.noidung}</td>
                <td style="text-align: center;">${element.email}</td>
                <td style="text-align: center;">${element.sdt}</td>
                <td style="text-align: center;">${day}</td>
                <td style="text-align: center;">
                    <div class="d-flex flex-column">
                      ${trangthai}
                    </div>
                </td>
            </tr>`;
        });
      }
      generatePagination(page, data.totalPages);
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoadonggop = function (id) {
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
      const token = localStorage.getItem("token");

      if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
        return;
      }

      fetch(API_ENDPOINSADMIN.DongGop + `/Delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          showAlert("Xoá đóng góp thành công!");
          danhsachdonggop();
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showAlert(
            "Đã có lỗi xảy ra khi cập nhật trạng thái đóng góp.",
            "alert-danger"
          );
        });
    }
  });
};
//#endregion
//#region  đối tượng

function GetAllDoiTuong() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.DoiTuong;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có đối tượng nào!");
        return;
      }
      const danhsachdoituong = document.querySelector(".danhsachdoituong");
      danhsachdoituong.innerHTML = "";
      const loaihinhsk = document.querySelector("#lsdoituongsk");
      const loaihinhsk1 = document.querySelector("#lsdoituongsk1");
      const loaihinhsk2 = document.querySelector("#lsdoituongsk2");
      const loaihinhdd = document.querySelector("#lsdoituongdd");
      const loaihinhdd1 = document.querySelector("#lsdoituongdd1");
      const loaihinhdd2 = document.querySelector("#lsdoituongdd2");
      loaihinhsk.innerHTML = ``;
      loaihinhsk1.innerHTML = ``;
      loaihinhsk2.innerHTML = ``;
      loaihinhdd.innerHTML = ``;
      loaihinhdd1.innerHTML = ``;
      loaihinhdd2.innerHTML = ``;
      data.forEach((element) => {
        loaihinhsk.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        loaihinhsk1.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        loaihinhsk2.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        loaihinhdd.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        loaihinhdd1.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        loaihinhdd2.innerHTML += `<option value="${element.danhchoId}">${element.doituong}</option>`;
        danhsachdoituong.innerHTML += `
     <tr>
                      <td>
                        <p class="text-center">${element.danhchoId}</p>
                      </td>
                      <td >
                        <p class="m-1">${element.doituong}</p>
                      </td>
                      <td>
                        <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#doituong2"
    aria-expanded="false" aria-controls="doituong2"
    onclick="showdoituong(${element.danhchoId}, '${element.doituong}')">
    Sửa đối tượng
</button>
                        <button class="btn btn-danger mybuttontt" onclick ="Xoadoituong(id=${element.danhchoId})">Xoá đối tượng</button>
                      </td>
                     
                    </tr>
    `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
  Sodoituong();
}
GetAllDoiTuong();

window.Themdoituong = function () {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var tendoituong = document.querySelector("#tendoituong1").value;
  if (tendoituong.trim() == "") {
    showAlert("Vui lòng nhập tên đối tượng", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.DoiTuong + `/Create`;
  fetch(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ doituong: tendoituong }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Đối tượng đã tồn tại trong hệ thống!") {
        showAlert(data.message, "alert-warning");

        GetAllDoiTuong();
      } else {
        showAlert(data.message);

        GetAllDoiTuong();
      }
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

window.timkiemdoituong = function () {
  var search = document.querySelector("#seardoituongadmin").value;

  if (search.trim() == "") {
    GetAllDoiTuong();
    showAlert("Vui lòng nhập từ khoá tìm kiếm", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.DoiTuong + `/search?search=${search}`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message) {
        showAlert(data.message, "alert-warning");
        return;
      }
      const danhsachdoituong = document.querySelector(".danhsachdoituong");
      danhsachdoituong.innerHTML = "";
      data.forEach((element) => {
        danhsachdoituong.innerHTML += `
     <tr>
                      <td>
                        <p class="text-center">${element.danhchoId}</p>
                      </td>
                      <td >
                        <p class="m-1">${element.doituong}</p>
                      </td>
                      <td>
                       <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#doituong2"
    aria-expanded="false" aria-controls="doituong2"
    onclick="showdoituong(${element.danhchoId}, '${element.doituong}')">
    Sửa đối tượng
</button>
                        <button class="btn btn-danger mybuttontt" onclick ="Xoadoituong(id=${element.danhchoId})">Xoá đối tượng</button>
                      </td>
                     
                    </tr>
    `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoadoituong = function (id) {
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
      var api = API_ENDPOINSADMIN.DoiTuong + `/Delete?id=${id}`;
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          if (data.message) {
            showAlert(data.message);
            GetAllDoiTuong();
          }
        })
        .catch((error) => showAlert(error.message, "alert-danger"));
    }
  });
};
window.showdoituong = function (id, doituong) {
  var iddoituong = document.querySelector("#iddoituong");
  var tendoituongedit = document.querySelector("#tendoituongedit");
  iddoituong.value = id;
  tendoituongedit.value = doituong;
};
window.Suadoituong = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var iddoituong = document.querySelector("#iddoituong").value;
  var tendoituongedit = document.querySelector("#tendoituongedit").value;

  if (tendoituongedit.trim() == "") {
    showAlert("Vui lòng điền đầy đủ thông tin", "alert-danger");
    return;
  }
  fetch(API_ENDPOINSADMIN.DoiTuong + `/Edit?id=${iddoituong}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ doituong: tendoituongedit }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Đối tượng đã tồn tại trong hệ thống!") {
        showAlert(data.message, "alert-warning");

        GetAllDoiTuong();
      } else {
        showAlert(data.message);

        GetAllDoiTuong();
      }
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
//#endregion
//#region Tỉnh thành

function GetAllTinhthanh() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.Tinhthanh;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có tỉnh thành nào được thêm!");
        return;
      }
      const danhsachdoituong = document.querySelector(".danhsachtinhthanh");
      danhsachdoituong.innerHTML = "";
      const loaihinhsk = document.querySelector("#sltinhthanhsk");
      const loaihinhsk1 = document.querySelector("#sltinhthanhsk1");
      const loaihinhsk2 = document.querySelector("#sltinhthanhsk2");
      const loaihinhdd = document.querySelector("#sltinhthanhdd");
      const loaihinhdd1 = document.querySelector("#sltinhthanhdd1");
      const loaihinhdd2 = document.querySelector("#sltinhthanhdd2");
      loaihinhsk.innerHTML = `<option value="">Tất cả</option>`;
      loaihinhsk1.innerHTML = ``;
      loaihinhsk2.innerHTML = ``;
      loaihinhdd.innerHTML = `<option value="">Tất cả</option>`;
      loaihinhdd1.innerHTML = ``;
      loaihinhdd2.innerHTML = ``;
      data.forEach((element) => {
        loaihinhsk.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        loaihinhsk1.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        loaihinhsk2.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        loaihinhdd.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        loaihinhdd1.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        loaihinhdd2.innerHTML += `<option value="${element.idTinh}">${element.tenTinh}</option>`;
        danhsachdoituong.innerHTML += `
       <tr>
                        <td>
                          <p class="text-center">${element.idTinh}</p>
                        </td>
                        <td >
                          <p class="m-1">${element.tenTinh}</p>
                        </td>
                        <td>
                          <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#tinhthanh2"
                              aria-expanded="false" aria-controls="tinhthanh2"
                              onclick="showtinhthanh(${element.idTinh}, '${element.tenTinh}')">
                              Sửa tỉnh thành
                          </button>
                          <button class="btn btn-danger mybuttontt" onclick ="Xoatinhthanh(id=${element.idTinh})">Xoá tỉnh thành</button>
                        </td>
                       
                      </tr>
      `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
GetAllTinhthanh();

window.Themtinhthanh = function () {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var tentinh = document.querySelector("#tentinhthanh1").value;
  if (tentinh.trim() == "") {
    showAlert("Vui lòng nhập tên tỉnh thành", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.Tinhthanh + `/Create`;
  fetch(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tenTinh: tentinh }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Tỉnh thành này đã có trong hệ thống rồi!") {
        showAlert(data.message, "alert-warning");

        GetAllTinhthanh();
      } else {
        showAlert(data.message);

        GetAllTinhthanh();
      }
      Sotinhthanh();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

window.timkiemtinhthanh = function () {
  var search = document.querySelector("#seartinhthanhadmin").value;

  if (search.trim() == "") {
    GetAllTinhthanh();
    showAlert("Vui lòng nhập từ khoá tìm kiếm", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.Tinhthanh + `/search?search=${search}`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message) {
        showAlert(data.message, "alert-warning");
        return;
      }
      const danhsachdoituong = document.querySelector(".danhsachtinhthanh");
      danhsachdoituong.innerHTML = "";

      data.forEach((element) => {
        danhsachdoituong.innerHTML += `
         <tr>
                          <td>
                            <p class="text-center">${element.idTinh}</p>
                          </td>
                          <td >
                            <p class="m-1">${element.tenTinh}</p>
                          </td>
                          <td>
                            <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#tinhthanh2"
                                aria-expanded="false" aria-controls="tinhthanh2"
                                onclick="showtinhthanh(${element.idTinh}, '${element.tenTinh}')">
                                Sửa tỉnh thành
                            </button>
                            <button class="btn btn-danger mybuttontt" onclick ="Xoatinhthanh(id=${element.idTinh})">Xoá tỉnh thành</button>
                          </td>
                         
                        </tr>
        `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoatinhthanh = function (id) {
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
      var api = API_ENDPOINSADMIN.Tinhthanh + `/Delete?id=${id}`;
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          if (data.message) {
            showAlert(data.message);
            GetAllTinhthanh();
            Sotinhthanh();
          }
        })
        .catch((error) => showAlert(error.message, "alert-danger"));
    }
  });
};
window.showtinhthanh = function (id, name) {
  var idtinhthanh = document.querySelector("#idtinhthanh");
  var tentinhthanh2 = document.querySelector("#tentinhthanh2");
  idtinhthanh.value = id;
  tentinhthanh2.value = name;
};
window.SuaTinhthanh = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var idtinhthanh = document.querySelector("#idtinhthanh").value;
  var tentinhthanh2 = document.querySelector("#tentinhthanh2").value;

  if (tentinhthanh2.trim() == "") {
    showAlert("Vui lòng điền đầy đủ thông tin", "alert-danger");
    return;
  }
  fetch(API_ENDPOINSADMIN.Tinhthanh + `/Edit?id=${idtinhthanh}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tenTinh: tentinhthanh2 }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Tỉnh thành này đã có trong hệ thống rồi!") {
        showAlert(data.message, "alert-warning");

        GetAllTinhthanh();
      } else {
        showAlert(data.message);

        GetAllTinhthanh();
      }
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

//#endregion
//#region loại hình

function GetAllLoaiHinh() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.LoaiHinh;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có loại hình nào được thêm!");
        return;
      }
      const danhsachloaihinh = document.querySelector(".danhsachloaihinh");
      danhsachloaihinh.innerHTML = "";
      const loaihinhsk = document.querySelector("#slloaihinhsk");
      const loaihinhsk1 = document.querySelector("#slloaihinhsk1");
      const loaihinhsk2 = document.querySelector("#slloaihinhsk2");
      const loaihinhdd = document.querySelector("#slloaihinhdd");
      const loaihinhdd1 = document.querySelector("#slloaihinhdd1");
      const loaihinhdd2 = document.querySelector("#slloaihinhdd2");
      loaihinhsk.innerHTML = `<option value="">Tất cả</option>`;
      loaihinhsk1.innerHTML = ``;
      loaihinhsk2.innerHTML = ``;
      loaihinhdd.innerHTML = `<option value="">Tất cả</option>`;
      loaihinhdd1.innerHTML = ``;
      loaihinhdd2.innerHTML = ``;
      data.forEach((element) => {
        loaihinhsk.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        loaihinhsk1.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        loaihinhsk2.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        loaihinhdd.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        loaihinhdd1.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        loaihinhdd2.innerHTML += `<option value="${element.loaiHinhId}">${element.tenLoai}</option>`;
        danhsachloaihinh.innerHTML += `
       <tr>
                        <td>
                          <p class="text-center">${element.loaiHinhId}</p>
                        </td>
                        <td >
                          <p class="m-1">${element.tenLoai}</p>
                        </td>
                        <td>
                          <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#loaihinh2"
                              aria-expanded="false" aria-controls="loaihinh2"
                              onclick="showloaihinh(${element.loaiHinhId}, '${element.tenLoai}')">
                              Sửa loại hình
                          </button>
                          <button class="btn btn-danger mybuttontt" onclick ="Xoaloaihinh(id=${element.loaiHinhId})">Xoá loại hình</button>
                        </td>
                       
                      </tr>
      `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
  Soloaihinh();
}
GetAllLoaiHinh();
window.Themloaihinh = function () {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var loaihinh = document.querySelector("#tenloaihinh1").value;
  if (loaihinh.trim() == "") {
    showAlert("Vui lòng nhập tên loại hình", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.LoaiHinh + `/Create`;
  fetch(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tenLoai: loaihinh }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Loại hình này đã có trong hệ thống rồi!") {
        showAlert(data.message, "alert-warning");

        GetAllLoaiHinh();
      } else {
        showAlert(data.message);

        GetAllLoaiHinh();
      }
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

window.timkiemloaihinh = function () {
  var search = document.querySelector("#searchloaihinhdmin").value;

  if (search.trim() == "") {
    GetAllLoaiHinh();
    showAlert("Vui lòng nhập từ khoá tìm kiếm", "alert-danger");
    return;
  }
  var api = API_ENDPOINSADMIN.LoaiHinh + `/search?search=${search}`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message) {
        showAlert(data.message, "alert-warning");
        return;
      }
      const danhsachloaihinh = document.querySelector(".danhsachloaihinh");
      danhsachloaihinh.innerHTML = "";

      data.forEach((element) => {
        danhsachloaihinh.innerHTML += `
        <tr>
                        <td>
                          <p class="text-center">${element.loaiHinhId}</p>
                        </td>
                        <td >
                          <p class="m-1">${element.tenLoai}</p>
                        </td>
                        <td>
                          <button class="btn btn-warning mybuttontt" type="button" data-toggle="collapse" href="#loaihinh2"
                              aria-expanded="false" aria-controls="loaihinh2"
                              onclick="showloaihinh(${element.loaiHinhId}, '${element.tenLoai}')">
                              Sửa loại hình
                          </button>
                          <button class="btn btn-danger mybuttontt" onclick ="Xoaloaihinh(id=${element.loaiHinhId})">Xoá loại hình</button>
                        </td>
                       
                      </tr>
        `;
      });
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoaloaihinh = function (id) {
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
      var api = API_ENDPOINSADMIN.LoaiHinh + `/Delete?id=${id}`;
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          if (data.message) {
            showAlert(data.message);
            GetAllLoaiHinh();
            Sotinhthanh();
          }
        })
        .catch((error) => showAlert(error.message, "alert-danger"));
    }
  });
};
window.showloaihinh = function (id, name) {
  var idloaihinh = document.querySelector("#idloaihinh");
  var tenloaihinh2 = document.querySelector("#tenloaihinh2");
  idloaihinh.value = id;
  tenloaihinh2.value = name;
};
window.Sualoaihinh = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var idloaihinh = document.querySelector("#idloaihinh").value;
  var tenloaihinh2 = document.querySelector("#tenloaihinh2").value;

  if (tenloaihinh2.trim() == "") {
    showAlert("Vui lòng điền đầy đủ thông tin", "alert-danger");
    return;
  }
  fetch(API_ENDPOINSADMIN.LoaiHinh + `/Edit?id=${idloaihinh}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tenLoai: tenloaihinh2 }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if (data.message == "Loại hình này đã có trong hệ thống rồi!") {
        showAlert(data.message, "alert-warning");

        GetAllLoaiHinh();
      } else {
        showAlert(data.message);

        GetAllLoaiHinh();
      }
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

//#endregion
//#region  sự kiện tin tức
function checkDate(inputId) {
  let input = document.getElementById(inputId);
  let selectedDate = new Date(input.value);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
}


function GetAllsktt(page = 1) {
  fetch(API_ENDPOINSADMIN.SukienTintuc + `?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Lỗi khi tải danh sách sự kiện tin tức.");
      return res.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có sự kiện - tin tức nào!");
        return;
      }
      const showlist = document.querySelector(".danhsachsukien");
      showlist.innerHTML = "";

      data.items.forEach((element) => {
        const dayO = element.dateOpen.split("T")[0];
        const dayC = element.dateClose.split("T")[0];

        showlist.innerHTML += `<tr>
                  <td>
                    <p class="text-center">${element.sukienId}</p>
                  </td>
                  <td>
                    <p class="p-1">${element.tieude}</p>
                  </td>
                  <td>
                    <p  class="p-1">${element.motangan}</p>
                  </td>
                  <td>
                    <p  class="p-1">Địa chỉ: ${element.diachi}  </p>
                    <p  class="p-1">Liên hệ: ${element.sdt}  </p>
                  </td>
                  <td>
                    <p  class="p-1">${dayO}</p>
                    <p  class="p-1"> ${dayC}</p>
                  </td>
                  <td>
                  <div style="max-height:300px;max-width:500px ; overflow:auto">
                  ${markdownToHtml(element.mota1)}
                  </div>
                    
                  </td>
                  <td>
                   <div class="p-1">
                    <p>Thuộc tỉnh: ${element.tinhThanh}</p>
                     <p>Loại hình: ${element.loaiHinh}</p>
                      <p>Dành cho: ${element.danhcho}</p>
                      <p>Loại sự kiện: ${element.loaisukien} </p>
                   </div>
                  </td>
                  <td>
                    <div class="d-flex p-1" style="max-width:350px;   overflow: auto;">
                        <img class="mx-1" src="/img/${element.imagemain}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image1}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image2}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image3}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image4}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image5}" alt="" width="310px" height="150px">
                    
                   
                   </div>
                  </td>
                     <td>
                     <div class="m-1 p-1">
                         <a  href="/sukientintucdetail.html?id=${element.sukienId}" class="btn btn-info mybuttontt form-control" onclick ="Chitietsktt(id=${element.sukienId})">Xem chi tiết</a>

                         <button class="btn btn-warning mybuttontt form-control"type="button" data-toggle="collapse" href="#sktt3"
                              aria-expanded="false" aria-controls="sktt3"
                              onclick="Suasktt1(${element.sukienId})">
                              Sửa sự kiện
                          </button>
                          <button class="btn btn-danger mybuttontt  form-control"onclick ="Xoasktt(id=${element.sukienId})">Xoá sự kiện</button>
                       
                     </div>
                        </td>
                </tr>`;
      });

      generatePaginations(page, data.totalPages,"paginationsk", GetAllsktt);
      Sosktt();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
GetAllsktt();
window.Suasktt1 = function (id) {
  const token = localStorage.getItem("token");

if(id<=0){
  showAlert("Id sự kiện - tin tức không hợp lệ, Vui lòng thử lại","alert-danger");
  return;
}
var api =
API_ENDPOINSADMIN.SukienTintuc +`/Find?id=${id}`;

fetch(api)
.then((res) => {
  if (!res.status) throw new Error("Lỗi.");
  return res.json();
})
.then((data) => {
  if (data.message == "Không tìm thấy địa điểm!") {
    showAlert(data.message, "alert-warning");
    return;
  }
  document.querySelector("#Idtieude1").value = id;
  document.querySelector("#tieudesk1").value =  data.tieude;
  document.querySelector("#motangansk1").value =  data.motangan;
  document.querySelector("#diachisk1").value =  data.diachi;
  document.querySelector("#mota1sk").value =  data.mota1;
  document.querySelector("#sltinhthanhsk1").value =  data.tinhThanhId;
  document.querySelector("#slloaihinhsk1").value =  data.loaiHinhId;
  document.querySelector("#lsdoituongsk1").value =  data.danhchoId;
  document.querySelector("#slloaisk1").value =  data.loaisukienId;
  document.querySelector("#dateosk1").value =  data.dateOpen.split("T")[0];
  document.querySelector("#datecsk1").value =  data.dateClose.split("T")[0];
  document.querySelector("#giask1").value =  data.gia;
  document.querySelector("#sdtsk1").value =  data.sdt;

  // Hiển thị hình ảnh
  let basePath = "/img/";
  document.querySelector("#imageskmain1show").src = basePath +  data.imagemain;
  document.querySelector("#imageskmain2show").src = basePath +  data.image1;
  document.querySelector("#imageskmain3show").src = basePath +  data.image2;
  document.querySelector("#imageskmain4show").src = basePath +  data.image3;
  document.querySelector("#imageskmain5show").src = basePath +  data.image4;
  document.querySelector("#imageskmain6show").src = basePath +  data.image5;
}) .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Themsktt = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var idsktt = document.querySelector("#Idtieude2").value;
  var tieudesk1 = document.querySelector("#tieudesk2").value;
  var motangansk1 = document.querySelector("#motangansk2").value;
  var diachisk1 = document.querySelector("#diachisk2").value;
  var mota1sk = document.querySelector("#mota2sk").value;
  var sltinhthanhsk1 = document.querySelector("#sltinhthanhsk2").value;
  var slloaihinhsk1 = document.querySelector("#slloaihinhsk2").value;
  var lsdoituongsk1 = document.querySelector("#lsdoituongsk2").value;
  var slloaisk1 = document.querySelector("#slloaisk2").value;
  var dateosk1 = document.querySelector("#dateosk2").value;
  var datecsk1 = document.querySelector("#datecsk2").value;
  var giask1 = document.querySelector("#giask2").value;
  var sdtsk1 = document.querySelector("#sdtsk2").value;

  var finalImage1 = getFileName("imageskmain21");
  var finalImage2 = getFileName("imageskmain22");
  var finalImage3 = getFileName("imageskmain23");
  var finalImage4 = getFileName("imageskmain24");
  var finalImage5 = getFileName("imageskmain25");
  var finalImage6 = getFileName("imageskmain26");
  var checkdinhdang= true
if(sdtsk1 == ""){
  checkdinhdang=true;
  let namesk = document.getElementById("sdtsk2");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
}
else{
  if(!checkSDT(sdtsk1)){
    let namesk = document.getElementById("sdtsk2");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập dủ 10 số!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("sdtsk2");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
if (!checkDate("dateosk2")) {
  let namesk = document.getElementById("dateosk2");
  let errorMessage = namesk.nextElementSibling;
  errorMessage.innerText ="Vui lòng chọn ngày hôm nay hoặc ngày tương lai"
  errorMessage.classList.remove("d-none");
  checkdinhdang=false;

}
else{
  let namesk = document.getElementById("dateosk2");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang = true;
  
}


var dateosk11 = new Date(document.querySelector("#dateosk2").value);
var datecsk11 = new Date(document.querySelector("#datecsk2").value);

if (dateosk11 <= datecsk11) {
  let namesk = document.getElementById("datecsk2");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang = true;
} else {
  let namesk = document.getElementById("datecsk2");
  let errorMessage = namesk.nextElementSibling;
  errorMessage.innerText ="Vui lòng chọn ngày sau hoặc bằng ngày bắt đầu"
  errorMessage.classList.remove("d-none");
  checkdinhdang=false;

}
  //#region validate
  var checkfile = true;
  const images = [
    { id: "imageskmain21", value: finalImage1 },
    { id: "imageskmain22", value: finalImage2 },
    { id: "imageskmain23", value: finalImage3 },
    { id: "imageskmain24", value: finalImage4 },
    { id: "imageskmain25", value: finalImage5 },
    { id: "imageskmain26", value: finalImage6 }
  ];
  
  images.forEach(image => {
    if (image.value === "Chưa chọn ảnh") {
      showdanger(image.id);
      checkfile = false; 
    } else {
      Dislbledanger(image.id);
    }
  });
  

  const inputFields = ["tieudesk2", "motangansk2", "diachisk2", "mota2sk"];

  function validateForm() {
    var checkEdit = true;

    inputFields.forEach((id) => {
      let input = document.getElementById(id);
      if (input && input.value.trim() === "") {
        showdanger(id);
        checkEdit = false;
      } else {
        Dislbledanger(id);
      }
    });

    return checkEdit;
  }
  inputFields.forEach((id) => {
    let input = document.getElementById(id);
    if (input) {
      input.addEventListener("blur", () => validateForm());
    }
  });
  if (validateForm() == false || checkfile == false||checkdinhdang==false) {
    showAlert("Vui lòng điền đẩy đủ thông tin", "alert-danger");
    return;
  }
  //#endregion
  fetch(API_ENDPOINSADMIN.SukienTintuc + `/Create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tieude: tieudesk1,
      motangan: motangansk1,
      diachi: diachisk1,
      dateOpen: dateosk1,
      dateClose: datecsk1,
      gia: parseFloat(giask1) || 0,
      sdt: sdtsk1,
      mota1: mota1sk,
      tinhThanhId: parseInt(sltinhthanhsk1),
      loaiHinhId: parseInt(slloaihinhsk1),
      danhchoId: parseInt(lsdoituongsk1),
      loaisukien: parseInt(slloaisk1),
      imagemain: finalImage1,
      image1: finalImage2,
      image2: finalImage3,
      image3: finalImage4,
      image4: finalImage5,
      image5: finalImage6,
    }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      showAlert(data.message);

      GetAllsktt();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

window.Timkiemsktst = function (page = 1) {
  var searchtext = document.querySelector("#timsukien").value;
  var loaihinh = document.querySelector("#slloaihinhsk").value;
  var tinhthanh = document.querySelector("#sltinhthanhsk").value;
  var danhcho = document.querySelector("#lsdoituongsk").value;
  var loaisk = document.querySelector("#slloaisk").value;
  var xxtheo = document.querySelector("#xxtheosk").value;

  var api =
    API_ENDPOINSADMIN.SukienTintuc +
    `/search?search=${searchtext}&loaihinh=${loaihinh}&tinhthanh=${tinhthanh}&danhcho=${danhcho}&loaisukien=${loaisk}&sortBy=${xxtheo}&page=${page}`;

  fetch(api)
    .then((res) => {
      if (!res.ok) throw new Error("Lỗi khi tải danh sách sự kiện tin tức.");
      return res.json();
    })
    .then((data) => {
      if (data.message == "Không tìm thấy sự kiện -  tin tức nào!") {
        showAlert(data.message, "alert-warning");
        return;
      }
      const showlist = document.querySelector(".danhsachsukien");
      showlist.innerHTML = "";

      data.items.forEach((element) => {
        const dayO = element.dateOpen.split("T")[0];
        const dayC = element.dateClose.split("T")[0];

        showlist.innerHTML += `<tr>
                <td>
                  <p class="text-center">${element.sukienId}</p>
                </td>
                <td>
                  <p class="p-1">${element.tieude}</p>
                </td>
                <td>
                  <p  class="p-1">${element.motangan}</p>
                </td>
                <td>
                  <p  class="p-1">Địa chỉ: ${element.diachi}  </p>
                  <p  class="p-1">Liên hệ: ${element.sdt}  </p>
                </td>
                <td>
                  <p  class="p-1">${dayO}</p>
                  <p  class="p-1"> ${dayC}</p>
                </td>
                <td>
                 
                  <div style="max-height:300px;max-width:500px ; overflow:auto">
                  ${markdownToHtml(element.mota1)}
                  </div>
                    
                </td>
                <td>
                 <div class="p-1">
                  <p>Thuộc tỉnh: ${element.tinhThanh}</p>
                   <p>Loại hình: ${element.loaiHinh}</p>
                    <p>Dành cho: ${element.danhcho}</p>
                    <p>Loại sự kiện: ${element.loaisukien} </p>
                 </div>
                </td>
                <td>
                  <div class="d-flex p-1" style="max-width:350px;   overflow: auto;">
                      <img class="mx-1" src="/img/${element.imagemain}" alt="" width="310px" height="150px">
                      <img class="mx-1" src="/img/${element.image1}" alt="" width="310px" height="150px">
                      <img class="mx-1" src="/img/${element.image2}" alt="" width="310px" height="150px">
                      <img class="mx-1" src="/img/${element.image3}" alt="" width="310px" height="150px">
                      <img class="mx-1" src="/img/${element.image4}" alt="" width="310px" height="150px">
                      <img class="mx-1" src="/img/${element.image5}" alt="" width="310px" height="150px">
                  
                 
                 </div>
                </td>
                   <td>
                   <div class="m-1 p-1">
                      <a  href="/sukientintucdetail.html?id=${element.sukienId}" class="btn btn-info mybuttontt form-control" onclick ="Chitietsktt(id=${element.sukienId})">Xem chi tiết</a>

                        <button class="btn btn-warning mybuttontt form-control"type="button" data-toggle="collapse" href="#sktt3"
                              aria-expanded="false" aria-controls="sktt3"
                              onclick="Suasktt1(${element.sukienId})">
                              Sửa sự kiện
                          </button>
                        <button class="btn btn-danger mybuttontt  form-control"onclick ="Xoasktt(id=${element.sukienId})">Xoá sự kiện</button>
                     
                   </div>
                      </td>
              </tr>`;
      });

      generatePaginations(page, data.totalPages,"paginationsk", GetAllsktt);

    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoasktt = function (id) {
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
      var api = API_ENDPOINSADMIN.SukienTintuc + `/Delete?id=${id}`;
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          if (data.message) {
            showAlert(data.message);
            GetAllsktt();
          }
        })
        .catch((error) => showAlert(error.message, "alert-danger"));
    }
  });
};

window.Suasktt = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var idsktt = document.querySelector("#Idtieude1").value;
  var tieudesk1 = document.querySelector("#tieudesk1").value;
  var motangansk1 = document.querySelector("#motangansk1").value;
  var diachisk1 = document.querySelector("#diachisk1").value;
  var mota1sk = document.querySelector("#mota1sk").value;
  var sltinhthanhsk1 = document.querySelector("#sltinhthanhsk1").value;
  var slloaihinhsk1 = document.querySelector("#slloaihinhsk1").value;
  var lsdoituongsk1 = document.querySelector("#lsdoituongsk1").value;
  var slloaisk1 = document.querySelector("#slloaisk1").value;
  var dateosk1 = document.querySelector("#dateosk1").value;
  var datecsk1 = document.querySelector("#datecsk1").value;
  var giask1 = document.querySelector("#giask1").value;
  var sdtsk1 = document.querySelector("#sdtsk1").value;

  var imageskmain1 = getFileName("imageskmain1");
  var imageskmain2 = getFileName("imageskmain2");
  var imageskmain3 = getFileName("imageskmain3");
  var imageskmain4 = getFileName("imageskmain4");
  var imageskmain5 = getFileName("imageskmain5");
  var imageskmain6 = getFileName("imageskmain6");

  var imageskmain1show = getImageName("imageskmain1show");
  var imageskmain2show = getImageName("imageskmain2show");
  var imageskmain3show = getImageName("imageskmain3show");
  var imageskmain4show = getImageName("imageskmain4show");
  var imageskmain5show = getImageName("imageskmain5show");
  var imageskmain6show = getImageName("imageskmain6show");


var checkdinhdang= true;
  if(sdtsk1 == ""){
    checkdinhdang=true;
    let namesk = document.getElementById("sdtsk1");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
  }
  else{
    if(!checkSDT(sdtsk1)){
      let namesk = document.getElementById("sdtsk1");
      let errorMessage = namesk.nextElementSibling;
      errorMessage.innerText ="Vui lòng nhập dủ 10 số!"
      errorMessage.classList.remove("d-none");
      checkdinhdang=false;
      
    }
    else{
      let namesk = document.getElementById("sdtsk1");
      let errorMessage = namesk.nextElementSibling;
    
      errorMessage.classList.add("d-none");
      checkdinhdang=true;
    
    }
  }
  if (!checkDate("dateosk1")) {
    let namesk = document.getElementById("dateosk1");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng chọn ngày hôm nay hoặc ngày tương lai"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
  
  }
  else{
    let namesk = document.getElementById("dateosk1");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang = true;
    
  }
  
  
  var dateosk11 = new Date(document.querySelector("#dateosk1").value);
  var datecsk11 = new Date(document.querySelector("#datecsk1").value);
  
  if (dateosk11 <= datecsk11) {
    let namesk = document.getElementById("datecsk1");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang = true;
  } else {
    let namesk = document.getElementById("datecsk1");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng chọn ngày sau hoặc bằng ngày bắt đầu"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
  
  }



  var finalImage1 =
    imageskmain1 !== "Chưa chọn ảnh" ? imageskmain1 : imageskmain1show;
  var finalImage2 =
    imageskmain2 !== "Chưa chọn ảnh" ? imageskmain2 : imageskmain2show;
  var finalImage3 =
    imageskmain3 !== "Chưa chọn ảnh" ? imageskmain3 : imageskmain3show;
  var finalImage4 =
    imageskmain4 !== "Chưa chọn ảnh" ? imageskmain4 : imageskmain4show;
  var finalImage5 =
    imageskmain5 !== "Chưa chọn ảnh" ? imageskmain5 : imageskmain5show;
  var finalImage6 =
    imageskmain6 !== "Chưa chọn ảnh" ? imageskmain6 : imageskmain6show;

  const inputFields = ["tieudesk1", "motangansk1", "diachisk1", "mota1sk"];

  function validateForm() {
    var checkEdit = true;

    inputFields.forEach((id) => {
      let input = document.getElementById(id);
      if (input && input.value.trim() === "") {
        showdanger(id);
        checkEdit = false;
      } else {
        Dislbledanger(id);
      }
    });

    return checkEdit;
  }
  inputFields.forEach((id) => {
    let input = document.getElementById(id);
    if (input) {
      input.addEventListener("blur", () => validateForm());
    }
  });
  if (validateForm() == false || checkdinhdang==false) {
    showAlert("Vui lòng điền đẩy đủ thông tin", "alert-danger");
    return;
  }

  fetch(API_ENDPOINSADMIN.SukienTintuc + `/Edit?id=${idsktt}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sukienId: idsktt,
      tieude: tieudesk1,
      motangan: motangansk1,
      diachi: diachisk1,
      dateOpen: dateosk1,
      dateClose: datecsk1,
      gia: parseFloat(giask1) || 0,
      sdt: sdtsk1,
      mota1: mota1sk,
      tinhThanhId: parseInt(sltinhthanhsk1),
      loaiHinhId: parseInt(slloaihinhsk1),
      danhchoId: parseInt(lsdoituongsk1),
      loaisukien: parseInt(slloaisk1),
      imagemain: finalImage1,
      image1: finalImage2,
      image2: finalImage3,
      image3: finalImage4,
      image4: finalImage5,
      image5: finalImage6,
    }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message== "Sửa tin tức thành công!")
        {
          showAlert(data.message );

        }
       
      GetAllsktt();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

//#endregion

//#region  func
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
function getFileName(inputId) {
  let inputElement = document.querySelector(`#${inputId}`);
  return inputElement.files.length > 0
    ? inputElement.files[0].name
    : "Chưa chọn ảnh";
}

window.showfileimage = function (idelement, idimg) {
  let input = document.getElementById(idelement);
  let img = document.getElementById(idimg);
  img.classList.remove("d-none");
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};
function getImageName(imgId) {
  let imgElement = document.querySelector(`#${imgId}`);
  let src = imgElement.getAttribute("src");

  if (!src || src.startsWith("data:")) {
    return "Chưa chọn ảnh";
  }

  return src.split("/").pop();
}
function showdanger(tieudesk1) {
  let namesk = document.getElementById(tieudesk1);
  let errorMessage = namesk.nextElementSibling;
  errorMessage.classList.remove("d-none");
}
function Dislbledanger(tieudesk1) {
  let namesk = document.getElementById(tieudesk1);
  let errorMessage = namesk.nextElementSibling;
  errorMessage.classList.add("d-none");
}
//#endregion

//#region người dùng
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
function Danhsachtaikhoan(page = 1) {
  fetch(API_ENDPOINSADMIN.EditAccount + `?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Lỗi khi tải danh sách tài khoản.");
      return res.json();
    })
    .then((data) => {
      if(data.mesage){
        showAlert("Hiện chưa có người dùng nào!");
        return;
      }
      const showlist = document.querySelector(".danhsachtaikhoan");
      const sotaikhoan = document.querySelector("#sotaikhoan");
      showlist.innerHTML = "";
      sotaikhoan.innerHTML = "";
      sotaikhoan.innerHTML = `Tổng số tài khoản người dùng: ${data.sotaikhoannguoidung}`;
      const sotaikhoan2 = document.querySelector("#songuoidung");

      sotaikhoan2.innerHTML = "";
      sotaikhoan2.innerHTML = ` ${data.sotaikhoannguoidung}`;

      data.items.forEach((element) => {
        showlist.innerHTML += `<tr>
                  <td>
                    <p>${element.iduser}</p>
                  </td>
                  <td>
                    <p>${element.userName}</p>
                  </td>
                  <td>
                    <p>${element.email}</p>
                  </td>
                  <td>
                    <div class="d-flex">
                      <button class="btn btn-warning mybuttontt" "
                      onclick="Datlaiomatkhau('${element.iduser}')">
                      Đặt lại mật khẩu
                  </button>
                  <button class="btn btn-danger mybuttontt"
                      onclick="Xoataikhoan('${element.iduser}')">
                      Xoá tài khoản
                  </button>
                    </div>
                  </td>
              `;
      });

      generatePaginations(
        page,
        data.totalPages,
        "paginationnguoidung",
        Danhsachtaikhoan
      );
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
window.Datlaiomatkhau = function (id) {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }

  Swal.fire({
    title: ` Bạn có xác nhận đặt lại mật khẩu không? `,
    text: "Nếu xác nhận mật khẩu mới là:Ictu123@",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_ENDPOINSADMIN.EditAccount + `/datlaimk?iduser=${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.ok) {
            showAlert(`HTTP error! Status: ${response.ok}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          showAlert("Đặt lại mật khẩu thành công");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showAlert(
            "Đã có lỗi xảy ra khi cập nhật trạng thái đóng góp.",
            "alert-danger"
          );
        });
    }
  });

  //
};

Danhsachtaikhoan();
window.timkiemnguoidung = function () {
  var text = document.querySelector("#timkiemnguoidunbg").value;
  if (text.trim() == "") {
    showAlert("Vui lòng nhập email tìm kiếm", "alert-danger");
    Danhsachtaikhoan();
    return;
  }
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!", "alert-danger");
    return;
  }
  fetch(API_ENDPOINSADMIN.EditAccount + `/searchAccount?email=${text}`, {
    method: "GET",
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
    .then((element) => {
      const showlist = document.querySelector(".danhsachtaikhoan");
      showlist.innerHTML = "";
      if (element.message == "Không tìm thấy tài khoản!") {
        showAlert("Không tìm thấy tài khoản nào phù hợp!", "alert-danger");
        return;
      }
      showlist.innerHTML += `<tr>
            <td>
              <p>${element.id}</p>
            </td>
            <td>
              <p>${element.userName}</p>
            </td>
            <td>
              <p>${element.email}</p>
            </td>
            <td>
              <div class="d-flex">
                <button class="btn btn-warning mybuttontt" "
                onclick="Datlaiomatkhau('${element.email}')">
                Đặt lại mật khẩu
            </button>
            <button class="btn btn-danger mybuttontt"
                onclick="Xoataikhoan('id=${element.iduser}')">
                Xoá tài khoản
            </button>
              </div>
            </td>
        `;
      generatePaginations(1, 1, "paginationnguoidung", Danhsachtaikhoan);
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoataikhoan = function (id) {
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
      const token = localStorage.getItem("token");

      if (!token) {
        showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
        return;
      }

      fetch(API_ENDPOINSADMIN.EditAccount + `?iduser=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          showAlert("Xoá tài khoản thành công!");
          Danhsachtaikhoan();
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showAlert("Đã có lỗi xảy ra khi xoá tài khoản.", "alert-danger");
        });
    }
  });
};

//#endregion
//#region cài đặt tài khoản
window.Changpassword = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }
  var oldPasss = document.querySelector("#oldpassadmin").value;
  var newPasss = document.querySelector("#newpassadmin").value;
  var newPasss2 = document.querySelector("#newpassadmin2").value;
  var checkpass = true;

  if (oldPasss.trim() == "") {

    showdanger("oldpassadmin");
    checkpass = false;
  }
  else{
    Dislbledanger("oldpassadmin");
    checkpass = true;
  }
  if (newPasss.trim() == "") {

    showdanger("newpassadmin");
    checkpass = false;
  }
  else{
    Dislbledanger("newpassadmin");
    checkpass = true;
  }
  if (newPasss!= newPasss2) {

    showdanger("newpassadmin2");
    checkpass = false;
  }
  else{
    Dislbledanger("newpassadmin2");
    checkpass= true;
  }
  if(checkpass==false){
    showAle("Đổi mật khẩu thất bại, Vui lòng thử lại!","alert-danger")
    return;
  }
  
  fetch(API_ENDPOINSADMIN.EditAccount + `/admin`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPasss: oldPasss,
      newPasss: newPasss,
    }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
    if(data.message=="Mật khẩu không chính xác!, vui lòng thử lại!"){
      showAlert(data.message,"alert-danger");
      return;

    }
        showAlert(data.message);
        oldPasss="";     
        newPasss="";     
        newPasss2="";     
      
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
  
  }
//#endregion
//#region  địa điểm

function Getdiadiem(page = 1) {
  fetch(API_ENDPOINSADMIN.Diadiem + `?page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Lỗi khi tải danh sách sự kiện tin tức.");
      return res.json();
    })
    .then((data) => {
      if(data.message){
        showAlert("Hiện chưa có địa điểm được thêm nào!");
        return;
      }
      const showlist = document.querySelector(".danhsachdiadiem");
      showlist.innerHTML = "";

      data.items.forEach((element) => {
      var tt = element.tinhtrang;
      var tinhtrang=""
      if(tt==true){
tinhtrang="Đang mở cửa"
      }
      else{
tinhtrang="Đã đóng mở cửa"
        
      }
      showlist.innerHTML += `<tr>
      <td>
        <p class="text-center">${element.diadiemId}</p>
      </td>
      <td>
        <p class="p-1">${element.tieude}</p>
      </td>
      <td>
        <p  class="p-1">${element.motangan}</p>
      </td>
      
      <td>
        <p  class="pb-1 pt-1 border-bottom m-0">Địa chỉ: ${element.diachi}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">Ngày mở: ${element.mocuadongcua}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">Giờ mở cửa: ${element.dateOC}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">Email: ${element.email}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">SĐT: ${element.sdt}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">Giá: ${element.gia}  </p>
        <p  class="pb-1 pt-1 border-bottom m-0">Tình trạng: ${tinhtrang}  </p>
        <p  class="pb-1  m-0">Lượt truy cập: ${element.luotxem}  </p>
      </td>
        <td>
         <div style="height:200px;width:300px ">
       ${element.urlmap}
          </div>
      </td>
     
      <td>
        <div style="max-height:300px;max-width:500px ; overflow:auto">
      ${markdownToHtml(element.noidung)}
      </div>
      </td>
      <td>
       <div class="p-1">
        <p>Thuộc tỉnh: ${element.tinhThanh}</p>
         <p>Loại hình: ${element.loaiHinh}</p>
          <p>Dành cho: ${element.danhcho}</p>
          <p>Loại sự kiện: ${element.loaisukien} </p>
       </div>
      </td>
      <td>
        <div class="d-flex p-1" style="max-width:350px;   overflow: auto;">
            <img class="mx-1" src="/img/${element.imagemain}" alt="" width="310px" height="150px">
            <img class="mx-1" src="/img/${element.image1}" alt="" width="310px" height="150px">
            <img class="mx-1" src="/img/${element.image2}" alt="" width="310px" height="150px">
            <img class="mx-1" src="/img/${element.image3}" alt="" width="310px" height="150px">
            <img class="mx-1" src="/img/${element.image4}" alt="" width="310px" height="150px">
            <img class="mx-1" src="/img/${element.image5}" alt="" width="310px" height="150px">
        
       
       </div>
      </td>
         <td>
         <div class="m-1 p-1">
              <a  href="/detaildiadiem.html?id=${element.diadiemId}" class="btn btn-info mybuttontt form-control" onclick ="Chitietsktt(id=${element.sukienId})">Xem chi tiết</a>


              <button class="btn btn-warning mybuttontt form-control"type="button" data-toggle="collapse" href="#diadiem3"
                  aria-expanded="false" aria-controls="diadiem3"
                  onclick="Suadiadiem1(${element.diadiemId})">
                  Sửa địa điểm
              </button>
              <button class="btn btn-danger mybuttontt  form-control"onclick ="Xoadiadiem(id=${element.diadiemId})">Xoá địa điểm</button>
           
         </div>
            </td>
    </tr>`;
      });

      generatePaginations(page, data.totalPages,"paginationdiadiem", Getdiadiem);

      Sodiadiem();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
Getdiadiem();
window.Themdiadiem = function () {
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
    return;
  }

  var tieudedd = document.querySelector("#tieudedd").value;
  var motangandd = document.querySelector("#motangandd").value;
  var mocuadongcuadd = document.querySelector("#mocuadongcuadd").value;
  var diachidd = document.querySelector("#diachidd").value;
  var dateOCdd = document.querySelector("#dateOCdd").value;
  var emaildd = document.querySelector("#emaildd").value;
  var sdtdd = document.querySelector("#sdtdd").value;
  var giadd = document.querySelector("#giadd").value;
  var noidungdd = document.querySelector("#noidungdd").value;
  var tinhthanh = document.querySelector("#sltinhthanhdd1").value;
  var loaihinh = document.querySelector("#slloaihinhdd1").value;
  var doituong = document.querySelector("#lsdoituongdd1").value;
  var loaisukien = document.querySelector("#slloaidd1").value;
  var urlmap = document.querySelector("#urlmapddd1").value;
  var tinhtrang = document.querySelector("#tinhtrangdd").value;
  var finalImage1 = getFileName("imageddmain21");
  var finalImage2 = getFileName("imageddmain22");
  var finalImage3 = getFileName("imageddmain23");
  var finalImage4 = getFileName("imageddmain24");
  var finalImage5 = getFileName("imageddmain25");
  var finalImage6 = getFileName("imageddmain26");

  //#region validate
  var checkfile = true;
 

  const images = [
    { id: "imageddmain21", value: finalImage1 },
    { id: "imageddmain22", value: finalImage2 },
    { id: "imageddmain23", value: finalImage3 },
    { id: "imageddmain24", value: finalImage4 },
    { id: "imageddmain25", value: finalImage5 },
    { id: "imageddmain26", value: finalImage6 }
  ];

  images.forEach(image => {
    if (image.value === "Chưa chọn ảnh") {
      showdanger(image.id);
      checkfile = false; // Chỉ cần một ảnh chưa chọn là false
    } else {
      Dislbledanger(image.id);
    }
  });
  
 
  const inputFields = ["tieudedd", "motangandd", "diachidd", "dateOCdd", "noidungdd","urlmapddd1"];
  function validateForm() {
    var checkEdit = true;

    inputFields.forEach((id) => {
      let input = document.getElementById(id);
      if (input && input.value.trim() === "") {
        showdanger(id);
        checkEdit = false;
      } else {
        Dislbledanger(id);
      }
    });

    return checkEdit;
  }
  inputFields.forEach((id) => {
    let input = document.getElementById(id);
    if (input) {
      input.addEventListener("blur", () => validateForm());
    }
  });
var checkdinhdang = true;
if(emaildd!=""){
  if(!checkEmail(emaildd)){
    let namesk = document.getElementById("emaildd");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập đúng định dạng!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("emaildd");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("emaildd");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;
}
if(sdtdd!=""){
  if(!checkSDT(sdtdd)){
    let namesk = document.getElementById("sdtdd");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập dủ 10 số!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("sdtdd");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("sdtdd");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;

}
  if (validateForm() == false || checkfile == false ||checkdinhdang==false) {
    showAlert("Vui lòng điền đẩy đủ thông tin", "alert-danger");
    return;
  }
  //#endregion

 
  fetch(API_ENDPOINSADMIN.Diadiem + `/Create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tieude: tieudedd,
      motangan: motangandd,
      mocuadongcua:mocuadongcuadd || "Đang cập nhật",
      diachi: diachidd,
      dateOC:dateOCdd,
      email: emaildd || "Đang cập nhật",
      sdt: sdtdd || "Đang cập nhật",
      gia: parseFloat(giadd) || 0,
      tinhtrang : tinhtrang == "true" ? true : false,
      noidung: noidungdd,
      tinhThanhId: parseInt(tinhthanh),
      loaiHinhId: parseInt(loaihinh),
      danhchoId: parseInt(doituong),
      loaisukien: parseInt(loaisukien),
      imagemain: finalImage1,
      image1: finalImage2,
      image2: finalImage3,
      image3: finalImage4,
      image4: finalImage5,
      image5: finalImage6,
      urlmap:urlmap
    }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      showAlert(data.message);

      Getdiadiem();
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};

window.Timkiemdiadiem = function (page = 1) {
  var searchtext = document.querySelector("#timkiemdiadiem").value;
  var loaihinh = document.querySelector("#slloaihinhdd").value;
  var tinhthanh = document.querySelector("#sltinhthanhdd").value;
  var danhcho = document.querySelector("#lsdoituongdd").value;
  var loaisk = document.querySelector("#slloaidd").value;
  var xxtheo = document.querySelector("#xxtheodd").value;
  var api =
    API_ENDPOINSADMIN.Diadiem +
    `/search?search=${searchtext}&tinhthanh=${tinhthanh}&loaidiadiem=${loaisk}&loaihinh=${loaihinh}&doituong=${danhcho}&sortBy=${xxtheo}&page=${page}`;

  fetch(api)
    .then((res) => {
      if (!res.status) throw new Error("Lỗi khi tải danh sách dịa điểm.");
      return res.json();
    })
    .then((data) => {
      if (data.message == "Không tìm thấy địa điểm nào!") {
        showAlert(data.message, "alert-warning");
        return;
      }
      const showlist = document.querySelector(".danhsachdiadiem");
      showlist.innerHTML = "";

      data.items.forEach((element) => {
      var tt = element.tinhtrang;
      var tinhtrang=""
      if(tt==true){
tinhtrang="Đang mở cửa"
      }
      else{
tinhtrang="Đã đóng mở cửa"
        
      }

      showlist.innerHTML += `<tr>
                  <td>
                    <p class="text-center">${element.diadiemId}</p>
                  </td>
                  <td>
                    <p class="p-1">${element.tieude}</p>
                  </td>
                  <td>
                    <p  class="p-1">${element.motangan}</p>
                  </td>
                  
                  <td>
                    <p  class="pb-1 pt-1 border-bottom m-0">Địa chỉ: ${element.diachi}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">Ngày mở: ${element.mocuadongcua}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">Giờ mở cửa: ${element.dateOC}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">Email: ${element.email}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">SĐT: ${element.sdt}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">Giá: ${element.gia}  </p>
                    <p  class="pb-1 pt-1 border-bottom m-0">Tình trạng: ${tinhtrang}  </p>
                    <p  class="pb-1  m-0">Lượt truy cập: ${element.luotxem}  </p>
                  </td>
                    <td>
                     <div style="height:200px;width:300px ">
                   ${element.urlmap}
                      </div>
                  </td>
                 
                  <td>
                    <div style="max-height:300px;max-width:500px ; overflow:auto">
                  ${markdownToHtml(element.noidung)}
                  </div>
                  </td>
                  <td>
                   <div class="p-1">
                    <p>Thuộc tỉnh: ${element.tinhThanh}</p>
                     <p>Loại hình: ${element.loaiHinh}</p>
                      <p>Dành cho: ${element.danhcho}</p>
                      <p>Loại sự kiện: ${element.loaisukien} </p>
                   </div>
                  </td>
                  <td>
                    <div class="d-flex p-1" style="max-width:350px;   overflow: auto;">
                        <img class="mx-1" src="/img/${element.imagemain}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image1}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image2}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image3}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image4}" alt="" width="310px" height="150px">
                        <img class="mx-1" src="/img/${element.image5}" alt="" width="310px" height="150px">
                    
                   
                   </div>
                  </td>
                     <td>
                     <div class="m-1 p-1">
                          <a  href="/detaildiadiem.html?id=${element.diadiemId}" class="btn btn-info mybuttontt form-control" onclick ="Chitietsktt(id=${element.sukienId})">Xem chi tiết</a>


                          <button class="btn btn-warning mybuttontt form-control"type="button" data-toggle="collapse" href="#diadiem3"
                              aria-expanded="false" aria-controls="diadiem3"
                              onclick="Suadiadiem1(${element.diadiemId})">
                              Sửa địa điểm
                          </button>
                          <button class="btn btn-danger mybuttontt  form-control"onclick ="Xoadiadiem(id=${element.diadiemId})">Xoá địa điểm</button>
                       
                     </div>
                        </td>
                </tr>`;
      });

      generatePaginations(page, data.totalPages,"paginationdiadiem", Timkiemdiadiem);
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoadiadiem = function (id) {
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
      var api = API_ENDPOINSADMIN.Diadiem + `/Delete?id=${id}`;
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((p) => {
          if (!p.status) {
            showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
            return;
          }
          return p.json();
        })
        .then((data) => {
          if (data.message) {
            showAlert(data.message);
           Getdiadiem()
          }
        })
        .catch((error) => showAlert(error.message, "alert-danger"));
    }
  });
};

window.Suadiadiem1 = function (id) {
  const token = localStorage.getItem("token");

 
if(id<=0){
  showAlert("Id địa điểm không hợp lệ, Vui lòng thử lại","alert-danger");
  return;
}
var api =
API_ENDPOINSADMIN.Diadiem +`/Find?id=${id}`;

fetch(api)
.then((res) => {
  if (!res.status) throw new Error("Lỗi khi tải danh sách dịa điểm.");
  return res.json();
})
.then((data) => {
  if (data.message == "Không tìm thấy địa điểm!") {
    showAlert(data.message, "alert-warning");
    return;
  }
  document.querySelector("#idddd").value = id;
  document.querySelector("#tieudeddd").value = data.tieude;
  document.querySelector("#motanganddd").value = data.motangan;
  document.querySelector("#mocuadongcuaddd").value = data.mocuadongcua;
  document.querySelector("#diachiddd").value = data.diachi;
  document.querySelector("#dateOCddd").value = data.dateOC;
  document.querySelector("#emailddd").value = data.email;
  document.querySelector("#sdtddd").value = data.sdt;
  document.querySelector("#giaddd").value = data.gia;
  document.querySelector("#noidungddd").value = data.noidung;
  document.querySelector("#sltinhthanhdd2").value = data.tinhThanhId;
  document.querySelector("#slloaihinhdd2").value = data.loaiHinhId;
  document.querySelector("#lsdoituongdd2").value = data.danhchoId;
  document.querySelector("#slloaidd2").value = data.loaiHinhId;
   document.querySelector("#urlmapdddd1").value = data.urlmap;
  document.querySelector("#tinhtrangddd").value = data.tinhtrang;

  document.querySelector("#sltinhthanhdd2").value = data.tinhThanhId;
  document.querySelector("#slloaihinhdd2").value = data.loaiHinhId;
  document.querySelector("#lsdoituongdd2").value = data.danhchoId;
  document.querySelector("#slloaidd2").value = data.loaisukienId;
  let basePath = "/img/";
  document.querySelector("#imagedddmain21show").src = basePath + data.imagemain;
  document.querySelector("#imagedddmain22show").src = basePath + data.image1;
  document.querySelector("#imagedddmain23show").src = basePath + data.image2;
  document.querySelector("#imagedddmain24show").src = basePath + data.image3;
  document.querySelector("#imagedddmain25show").src = basePath + data.image4;
  document.querySelector("#imagedddmain26show").src = basePath + data.image5; 
}) .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Suadiadiem = function(){
  //#region sua ddd
 if (!token) {
  showAlert("Chưa có token. Bạn cần đăng nhập trước.", "alert-danger");
  return;
}
var idddd = document.querySelector("#idddd").value;
var tieudeddd = document.querySelector("#tieudeddd").value;
var motanganddd = document.querySelector("#motanganddd").value;
var mocuadongcuaddd = document.querySelector("#mocuadongcuaddd").value;
var diachiddd = document.querySelector("#diachiddd").value;
var dateOCddd = document.querySelector("#dateOCddd").value;
var emailddd = document.querySelector("#emailddd").value;
var sdtddd = document.querySelector("#sdtddd").value;
var giaddd = document.querySelector("#giaddd").value;
var noidungddd = document.querySelector("#noidungddd").value;
var tinhthanh = document.querySelector("#sltinhthanhdd2").value;
var loaihinh = document.querySelector("#slloaihinhdd2").value;
var doituong = document.querySelector("#lsdoituongdd2").value;
var loaisukien = document.querySelector("#slloaidd2").value;
var urlmapdddd1 = document.querySelector("#urlmapdddd1").value;
var tinhtrangddd = document.querySelector("#tinhtrangddd").value;
var imageskmain1 = getFileName("imagedddmain21");
var imageskmain2 = getFileName("imagedddmain22");
var imageskmain3 = getFileName("imagedddmain23");
var imageskmain4 = getFileName("imagedddmain24");
var imageskmain5 = getFileName("imagedddmain25");
var imageskmain6 = getFileName("imagedddmain26");

var imageskmain1show = getImageName("imagedddmain21show");
var imageskmain2show = getImageName("imagedddmain22show");
var imageskmain3show = getImageName("imagedddmain23show");
var imageskmain4show = getImageName("imagedddmain24show");
var imageskmain5show = getImageName("imagedddmain25show");
var imageskmain6show = getImageName("imagedddmain26show");
var checkdinhdang = true;
if(emailddd!=""){
  if(!checkEmail(emailddd)){
    let namesk = document.getElementById("emailddd");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập đúng định dạng!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("emailddd");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("emailddd");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;
}
if(sdtddd!=""){
  if(!checkSDT(sdtddd)){
    let namesk = document.getElementById("sdtddd");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập dủ 10 số!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("sdtddd");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("sdtddd");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;

}
var finalImage1 =
  imageskmain1 !== "Chưa chọn ảnh" ? imageskmain1 : imageskmain1show;
var finalImage2 =
  imageskmain2 !== "Chưa chọn ảnh" ? imageskmain2 : imageskmain2show;
var finalImage3 =
  imageskmain3 !== "Chưa chọn ảnh" ? imageskmain3 : imageskmain3show;
var finalImage4 =
  imageskmain4 !== "Chưa chọn ảnh" ? imageskmain4 : imageskmain4show;
var finalImage5 =
  imageskmain5 !== "Chưa chọn ảnh" ? imageskmain5 : imageskmain5show;
var finalImage6 =
  imageskmain6 !== "Chưa chọn ảnh" ? imageskmain6 : imageskmain6show;

  const inputFields = ["tieudeddd", "motanganddd", "diachiddd", "dateOCddd", "noidungddd","urlmapdddd1"];


function validateForm() {
  var checkEdit = true;

  inputFields.forEach((id) => {
    let input = document.getElementById(id);
    if (input && input.value.trim() === "") {
      showdanger(id);
      checkEdit = false;
    } else {
      Dislbledanger(id);
    }
  });

  return checkEdit;
}
inputFields.forEach((id) => {
  let input = document.getElementById(id);
  if (input) {
    input.addEventListener("blur", () => validateForm());
  }
});
if (validateForm() == false || checkdinhdang==false) {
  showAlert("Vui lòng điền đẩy đủ thông tin", "alert-danger");
  return;
}

fetch(API_ENDPOINSADMIN.Diadiem + `/Edit?id=${idddd}`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
   
    tieude: tieudeddd,
    motangan: motanganddd,
    mocuadongcua:mocuadongcuaddd || "Đang cập nhật",
    diachi: diachiddd,
    dateOC:dateOCddd,
    email: emailddd || "Đang cập nhật",
    sdt: sdtddd || "Đang cập nhật",
    gia: parseFloat(giaddd) || 0,
    tinhtrang : tinhtrangddd == "true" ? true : false,
    noidung: noidungddd,
    tinhThanhId: parseInt(tinhthanh),
    loaiHinhId: parseInt(loaihinh),
    danhchoId: parseInt(doituong),
    loaisukien: parseInt(loaisukien),
    imagemain: finalImage1,
    image1: finalImage2,
    image2: finalImage3,
    image3: finalImage4,
    image4: finalImage5,
    image5: finalImage6,
    urlmap:urlmapdddd1
  }),
})
  .then((p) => {
    if (!p.status) {
      showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
      return;
    }
    return p.json();
  })
  .then((data) => {
    showAlert(data.message);

    Getdiadiem();
  })
  .catch((error) => showAlert(error.message, "alert-danger"));
  //#endregion

};
//#endregion

//#region soluong các danh sách
function Sotinhthanh() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.Tinhthanh + `/countProvince`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const danhsachdoituong = document.querySelector("#sotinhthanhadmin");
      danhsachdoituong.innerHTML = "";
      danhsachdoituong.innerHTML = `Số tỉnh thành: ${data.sotinh}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
function Sodiadiem() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.Diadiem + `/Count`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const sodiadiem = document.querySelector("#sodiadiem");
      sodiadiem.innerHTML = "";
      sodiadiem.innerHTML = `Số  địa điểm du lịch - ẩm thực: ${data.diadiem}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}

function Sodonggop() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.DongGop + `/Count`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const sodonggopmoi = document.querySelector("#sodonggopmoi");
      sodonggopmoi.innerHTML = "";
      sodonggopmoi.innerHTML = `Số đóng góp: ${data.sodonggop}`;
      const sodonggopmoi2 = document.querySelector("#sodonggop");
      sodonggopmoi2.innerHTML = "";
      sodonggopmoi2.innerHTML = ` ${data.sodonggop}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
function Sodoituong() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.DoiTuong + `/Count`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const sodoituongadmin = document.querySelector("#sodoituongadmin");
      sodoituongadmin.innerHTML = "";
      sodoituongadmin.innerHTML = `Số đối tượng: ${data.sodoituong}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
function Soloaihinh() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.LoaiHinh + `/countLoaiHinh`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const soloaihinhadmin = document.querySelector("#soloaihinhadmin");
      soloaihinhadmin.innerHTML = "";
      soloaihinhadmin.innerHTML = `Số loại hình: ${data.soloaihinh}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
function Sosktt() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.SukienTintuc + `/Count`;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const soloaihinhadmin = document.querySelector("#sosktt");
      soloaihinhadmin.innerHTML = "";
      soloaihinhadmin.innerHTML = `Số sự kiện - tin tức: ${data.sukientintuc}`;
      const soloaihinhadmin2 = document.querySelector("#sosukien");
      soloaihinhadmin2.innerHTML = "";
      soloaihinhadmin2.innerHTML = `${data.sukientintuc}`;
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
}
Sosktt();
Soloaihinh();
Sodonggop();
Sodoituong();
Sotinhthanh();

//#endregion
//#region Bannerthree

function GetAllBanner() {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
  var api = API_ENDPOINSADMIN.Bannerthree;
  fetch(api)
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      const listbanner = document.querySelector(".dsbannerthree");
      listbanner.innerHTML = "";
      
      data.items.forEach(element => {
      
        listbanner.innerHTML = `
        <tr>
           <td>
           <img class="mb-3" src="/img/${element.image1}" alt="" width="100%" height="310px">
          
        
             <img class="mb-3" src="/img/${element.image2}" alt="" width="100%" height="310px">
           
         
             <img class="mb-3" src="/img/${element.image3}" alt="" width="100%" height="310px">
           </td>
        </tr>
       `;
        
      });
      
      })
   
    .catch((error) => showAlert(error.message, "alert-danger"));
}
GetAllBanner()

window.Thembannerthree = function () {
  var token = localStorage.getItem("token");
  if (!token) {
    showAlert("Vui lòng đăng nhập trước!");
    return;
  }
 var checkfile=true;
  var finalImage1 = getFileName("banner1");
  var finalImage2 = getFileName("banner2");
  var finalImage3 = getFileName("banner3");
  var checkfile = true;
  const images = [
    { id: "banner1", value: finalImage1 },
    { id: "banner2", value: finalImage2 },
    { id: "banner3", value: finalImage3 }
  ];
  
  images.forEach(image => {
    if (image.value === "Chưa chọn ảnh") {
      showdanger(image.id);
      checkfile = false; 
    } else {
      Dislbledanger(image.id);
    }
  });
if(checkfile== false){
  showAlert("Cập nhật thất bại vui lòng thử lại!", "alert-danger")
}
  var api = API_ENDPOINSADMIN.Bannerthree ;
  fetch(api, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
       image1: finalImage1, 
       image2: finalImage2, 
       image3: finalImage3 
      }),
  })
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${p.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      if(data.message=="Thêm thành công!"){
        showAlert("Cập nhật BannerThree thành công!");
        document.querySelector("#banner1").value=null;
        document.querySelector("#banner2").value=null;
        document.querySelector("#banner3").value=null;
       var show1 =document.querySelector("#banner11");
       var show2 =  document.querySelector("#banner22");
        var show3 =document.querySelector("#banner33");
        show1.classList.add("d-none");
        show2.classList.add("d-none");
        show3.classList.add("d-none");
        GetAllBanner();

      }
      else{
        showAlert(data.mesage,"alert-danger");
      }
    

      
    
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};






//#endregion
//#region  Đánh giá 


function GetAllDanhgia(page =1){
  var token = localStorage.getItem("token");
   if(!token){
    showAlert("Vui lòng đăng nhập trước!");
     return;
   }
var api = API_ENDPOINSADMIN.Danhgia+`?page=${page}`

fetch(api,{
  method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
  }
}).
 then(p=>{
  if(!p.ok){
    showAlert(`Http erorr! +${p.ok}`, "alert-danger");
     return;
  }
  return  p.json();
 }).then(data=>{
  var danhsachdanhgia = document.querySelector(".danhsachdanhgia");
  var sodanhgiaadmin = document.querySelector("#sodanhgiaadmin");
  danhsachdanhgia.innerHTML="";
  sodanhgiaadmin.innerHTML="";
  sodanhgiaadmin.innerHTML=`Số đánh giá: ${data.totalItems}`


  data.items.forEach(element => {
    var dateadd= element.ngay_add.split("T")[0]
danhsachdanhgia.innerHTML+=` <tr>
                          <td><p class="text-center" > ${element.danhgiaId}</p></td>
                          <td><p class="text-center" > ${element.noidung}</p></td>
                          <td><p class="text-center" > ${dateadd}</p></td>
                          <td><p class="text-center">${element.diem}</p></td> 
                         
                         <td>
                          <p class="m-1">Id địa điểm:${element.iddiadiem}</p>
                          <p class="m-1">Tiêu dề:${element.diadiem}</p>
                          </td>
                          <td>
                          <p class="m-1">Id User:${element.userId}</p>
                          <p class="m-1">Id User:${element.nameuser}</p>
                          </td>
                          <td>
                          <button class="btn btn-danger ml-1" onclick="Xoadanhgia(${element.danhgiaId})">Xoá đánh giá</button>
                          </td>
                    </tr>`;

    
  });
  generatePaginations(page,data.totalPages,"paginationdanhgiaadmin",GetAllDanhgia)
 })
 .catch((error) => showAlert(error.message, "alert-danger"));
 
}

GetAllDanhgia();
window.Timkiemdanhgia = function (page = 1) {
  var text = document.querySelector("#searchdanhgia").value;
  
  var diem = document.querySelector("#diemdanhgia").value;
  if(text=="" && diem=="" ){
    showAlert("Vui lòng nhập tiêu chí tìm kiếm","alert-warning"); 
    return;
  }

  fetch(
    API_ENDPOINSADMIN.Danhgia +
      `/Timdanhgia?noidung=${text}&diem=${diem}&page=${page}`
  )
    .then((p) => {
      if (!p.status) {
        showAlert(`HTTP error! Status: ${response.status}`, "alert-danger");
        return;
      }
      return p.json();
    })
    .then((data) => {
      var danhsachdanhgia = document.querySelector(".danhsachdanhgia");
      var sodanhgiaadmin = document.querySelector("#sodanhgiaadmin");
      danhsachdanhgia.innerHTML="";
      sodanhgiaadmin.innerHTML="";
      sodanhgiaadmin.innerHTML=`Số đánh giá: ${data.totalItems}`
    if(data.message){
      showAlert(data.message,"alert-warning"); 
      return;
    }
    
      data.items.forEach(element => {
        var dateadd= element.ngay_add.split("T")[0]
    danhsachdanhgia.innerHTML+=` <tr>
                              <td><p class="text-center" > ${element.danhgiaId}</p></td>
                              <td><p class="text-center" > ${element.noidung}</p></td>
                              <td><p class="text-center" > ${dateadd}</p></td>
                              <td><p class="text-center">${element.diem}</p></td> 
                             
                             <td>
                              <p class="m-1">Id địa điểm:${element.iddiadiem}</p>
                              <p class="m-1">Tiêu dề:${element.diadiem}</p>
                              </td>
                              <td>
                              <p class="m-1">Id User:${element.userId}</p>
                              <p class="m-1">Id User:${element.nameuser}</p>
                              </td>
                              <td>
                              <button class="btn btn-danger ml-1" onclick="Xoadanhgia(${element.danhgiaId})">Xoá đánh giá</button>
                              </td>
                        </tr>`;
    
        
      });
      generatePaginations(page,data.totalPages,"paginationdanhgiaadmin",Timkiemdanhgia)
    })
    .catch((error) => showAlert(error.message, "alert-danger"));
};
window.Xoadanhgia = function (id) {
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
      const token = localStorage.getItem("token");

      if (!token) {
        showAlert(" Bạn cần đăng nhập trước.", "alert-danger");
        return;
      }

      fetch(API_ENDPOINSADMIN.Danhgia + `?id=${id}`, {
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
          showAlert("Xoá đánh giá thành công!");
          GetAllDanhgia();
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showAlert(
            "Đã có lỗi xảy ra khi xoá đánh giá.",
            "alert-danger"
          );
        });
    }
  });
};

//#endregion

//#region Bieudo
function LuotxemAll(){
  var api = API_ENDPOINSADMIN.Diadiem+`/Soluoxem`;
  fetch(api)
  .then(p=>
   {
    if(!p.ok){
      showAlert(`Lỗi:${p.status}:${p.statusText}`, "alert-danger");
      return;
    }
    return p.json();
   }
  ).then(data=>{
    const luotxem = document.querySelector("#soluotxem");
    luotxem.innerHTML="";
    luotxem.innerHTML =`${data.luotxem}`;

  }).catch(p=>{
    showAlert("Không thể hiển thị lượt xem, Vui lòng thử lại","alert-danger");
  })
}
LuotxemAll()
  function bieudodanhgia (){

    var api = API_ENDPOINSADMIN.Danhgia+`/Thongkedanhgia`;
    fetch(api)
    .then(p=>
     {
      if(!p.ok){
        showAlert(`Lỗi:${p.status}:${p.statusText}`, "alert-danger");
        return;
      }
      return p.json();
     }
    ).then(data=>{
      let myChart = document.getElementById('myChart').getContext('2d');
      // Global Options
      Chart.defaults.global.defaultFontFamily = 'Lato';
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = '#777';
  
      let massPopChart = new Chart(myChart, {
        type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
          labels:['Tổng', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao '],
          datasets:[{
            label:'Số đánh giá',
            data:[
              data.tongdg,
          data.nam,
          data.bon,
          data.ba,
          data.hai,
          data.mot,
            ],
            //backgroundColor:'green',
            backgroundColor:[
              'rgba(16, 192, 211, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth:1,
            borderColor:'red',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }]
        },
        options:{
          title:{
            display:true,
            text:'Thống kê chi tiết đánh giá',
            fontSize:25,
            position: 'bottom',
  
          },
          legend:{
            display:true,
            position:'right',
            labels:{
              fontColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }
      });



    }).catch(p=>{
      showAlert("Không thể lấy thông tin thống kê danh giá, Vui lòng thử lại","alert-danger");
    })
   

  }
  function Bieudosktt (){
    var api = API_ENDPOINSADMIN.Diadiem+`/thongkesodd`;
    fetch(api)
    .then(p=>
     {
      if(!p.ok){
        showAlert(`Lỗi:${p.status}:${p.statusText}`, "alert-danger");
        return;
      }
      return p.json();
     }
    ).then(data=>{
      let myChart = document.getElementById('myChart2').getContext('2d');
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
      type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['Tổng', 'Du lịch', 'Ẩm thực', ],
        datasets:[{
          label:'Số đánh giá',
          data:[
            data.all,
            data.dulich,
            data.amthuc
          
          ],
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(36, 209, 36, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
         
          ],
          borderWidth:1,
          borderColor:'red',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Thống kê địa điểm',
           position: 'bottom',
        
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
    }).catch(p=>{
      showAlert("Không thể lấy thông tin thống kê địa điểm, Vui lòng thử lại","alert-danger");
    })
   

  }

Bieudosktt();
 bieudodanhgia();

//#endregion








