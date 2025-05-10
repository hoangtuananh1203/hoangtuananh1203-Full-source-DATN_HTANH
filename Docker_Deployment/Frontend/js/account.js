import API_ENDPOIN from "./apiweb.js";
//#region LOGIN
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  }
 
  
  window.Userlogin = function () {

    // const Apilogin = API_ENDPOINTS.Login; // API endpoint đăng nhập
    const emailInput = document.querySelector("#emaillogin");
    const passInput = document.querySelector("#passlogin");
    const email = emailInput.value.trim(); // Lấy giá trị email và xóa khoảng trắng thừa
    const pass = passInput.value.trim(); // Lấy giá trị password và xóa khoảng trắng thừa
  
    const emailErrorSpan = document.querySelector(".erorrlogus");
    const passErrorSpan = document.querySelector(".erorrlogps");

    // Xóa thông báo lỗi trước đó
    emailErrorSpan.textContent = "";
    passErrorSpan.textContent = "";
    var check = true;
    if (email == "") {
      emailErrorSpan.textContent = "Vui lòng không bỏ trống trường này";
      check = false;
    } else {
      if (!isValidEmail(email)) {
        emailErrorSpan.textContent = "Vui lòng nhạp đúng định dạng email";
        check = false;
      }
    }
  
    if (pass.length <= 6) {
      passErrorSpan.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
      check = false;
    }
    if (!isValidPassword(pass)) {
      passErrorSpan.textContent =
        "Mật khẩu phải có chữ hoa, chữ thường,số và đặc biệt";
      check = false;
    }
  
    if (check == true) {
      let APILOGIN = API_ENDPOIN.LogAccount+`Dangnhap`;

      fetch(APILOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      })
        .then((response) => {
          // Log trạng thái response
          console.log("Trạng thái response:", response.status);
    
          if (!response.ok) {
            showAlert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.","alert-danger");
          }
          return response.json();
        })
        .then((data) => {
          // Log response để kiểm tra token
          
    
          if (data && data.token) {
            // Lưu token vào localStorage
            localStorage.setItem("token", data.token);
            window.location.reload();

            showAlert("Đăng nhập thành công!");
       
            const token = localStorage.getItem("token");
             
            if (token) {          
              const userInfo = parseJwt(token);
              if (userInfo) {
              
                const role =
                  userInfo[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                  ];
              
                if(role=="Admin"){
                    window.location.href = "/Admin/index.html"
                }
              
              } else {
                console.error("Không thể giải mã token.");
              }
            } else {
              console.error("Không tìm thấy token trong localStorage.");
            }
    
            // Đóng modal
            const modal = bootstrap.Modal.getInstance(
              document.querySelector("#idmodaldn")
            );
            modal.hide();
          }
        })
        .catch((error) => {
          // Log lỗi chi tiết
          console.error("Lỗi xảy ra:", error);
          showAlert(error.message,"alert-danger");
        });
    }
    
  };
  
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
  //#endregion
//#region LogUp
window.LogUpuser = function () {

  const firts = document.querySelector("#firtnameuserup").value.trim();
  const last = document.querySelector("#lastnameuserup").value;
  const username = document.querySelector("#usernameup").value;
  const email1 = document.querySelector("#emailuserup");
  const passs1 = document.querySelector("#passuserup1");
  const passs2 = document.querySelector("#passuserup2");

  const email = email1.value.trim(); 
  const pass1 = passs1.value.trim(); 
  const pass2 = passs2.value.trim(); 

  var erorr1= document.querySelector(".erorr1");
  var erorr2= document.querySelector(".erorr2");
  var erorr3= document.querySelector(".erorr3");
  var erorr4= document.querySelector(".erorr4");
  var erorr5= document.querySelector(".erorr5");
  var erorr6= document.querySelector(".erorr6");



  erorr1.textContent="";
  erorr2.textContent="";
  erorr3.textContent="";
  erorr4.textContent="";
  erorr5.textContent="";
  erorr6.textContent="";

 
    var check = true;
    if(firts==""){
    erorr1.textContent="Vui lòng không bỏ trống trường này!"
    check=false
    }

    if(last==""){
    erorr2.textContent="Vui lòng không bỏ trống trường này!"
    check=false
    }
    if(username==""){
    erorr3.textContent="Vui lòng không bỏ trống trường này!"
    check=false
    }
    if (email == "") {
        erorr4.textContent = "Vui lòng không bỏ trống trường này";
        check = false;
    } else {
        if (!isValidEmail(email)) {
        erorr4.textContent = "Vui lòng nhập đúng định dạng email";
        check = false;
        }
    }

    if (pass1.length <= 6) {
        erorr5.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        check = false;
    }
    if (!isValidPassword(pass1)) {
        erorr5.textContent =
        "Mật khẩu phải có chữ hoa, chữ thường,số và đặc biệt";
        check = false;
    }
    if (pass2!=pass1) {
        erorr6.textContent = "Nhập lại không khớp";
        check = false;
    }
   


  if (check == true) {
    const Apiloguup = API_ENDPOIN.LogAccount+`Dangky`; 

    const userData = {
   
        "firstName": firts,
        "lastName": last,
        "email": email,
        "username": username,
        "password": pass1,
        "confirmPassword": pass2
        
    };

    fetch(Apiloguup, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                // Xử lý lỗi từ backend
                throw new Error(data.message || "Đăng ký thất bại!");
            }
            return data;
        });
    })
    .then(data => {
        console.log("Dữ liệu response:", data);
        showAlert("Đăng ký tài khoản thành công!");
        window.location.href = "./index.html"; 
    })
    .catch(error => {
        console.error("Lỗi xảy ra:", error);
        showAlert(`Lỗi đăng ký: ${error.message}`,"alert-danger");
    });
    }
    };
//#endregion
//#endregion

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

if (token) {
  // có token
    document.querySelector(".loginlogout").classList.add("d-none") 
    document.querySelector(".iconxemsau").classList.remove("d-none")
    document.querySelector(".accoutinfo").classList.remove("d-none")
    
}
else{
  document.querySelector(".loginlogout").classList.remove("d-none")
  document.querySelector(".iconxemsau").classList.add("d-none")
  document.querySelector(".accoutinfo").classList.add("d-none")


}



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


