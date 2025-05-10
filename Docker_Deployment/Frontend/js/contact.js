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

window.Donggopdanhgia=function(){
    var api = API_ENDPOIN.DongGop+`/Create`;
    var nameuser = document.querySelector("#nameuser").value;
    var emailuser = document.querySelector("#emailuser").value;
    var sdt = document.querySelector("#phonenumberuser").value;
    var tieudedg = document.querySelector("#tieudedg").value;
    var noidungdg = document.querySelector("#noidungdg").value;
    var checkdinhdang = true;
if(nameuser.trim()==""){
    let namesk = document.getElementById("nameuser");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập trường này!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
}
else{
    let namesk = document.getElementById("nameuser");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.classList.add("d-none");
    checkdinhdang=true;

}
if(tieudedg.trim()==""){
    let namesk = document.getElementById("tieudedg");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập trường này!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
}
else{
    let namesk = document.getElementById("tieudedg");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
}
if(noidungdg.trim()==""){
    let namesk = document.getElementById("noidungdg");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập trường này!"

    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
}
else{
    let namesk = document.getElementById("noidungdg");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.classList.add("d-none");
    checkdinhdang=true;

}
if(emailuser!=""){
  if(!checkEmail(emailuser)){
    let namesk = document.getElementById("emailuser");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập đúng định dạng!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("emailuser");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("emailuser");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;
}
if(sdt!=""){
  if(!checkSDT(sdt)){
    let namesk = document.getElementById("phonenumberuser");
    let errorMessage = namesk.nextElementSibling;
    errorMessage.innerText ="Vui lòng nhập đủ 10 số!"
    errorMessage.classList.remove("d-none");
    checkdinhdang=false;
    
  }
  else{
    let namesk = document.getElementById("phonenumberuser");
    let errorMessage = namesk.nextElementSibling;
  
    errorMessage.classList.add("d-none");
    checkdinhdang=true;
  
  }
}
else{
  let namesk = document.getElementById("phonenumberuser");
  let errorMessage = namesk.nextElementSibling;

  errorMessage.classList.add("d-none");
  checkdinhdang=true;

}
    if(checkdinhdang==false){
        showAlert("Thêm thất bại vui lòng điền lại thông tin và thử lại!","alert-danger");
        return;
    }

    
    fetch(api,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            tieude: tieudedg,
            name: nameuser,
            noidung: noidungdg,
            email: emailuser,
            sdt: sdt,
        })
    })
    .then(p=>{
        if(!p.status){
            showAlert("Lỗi:"+p.status,"alert-danger");
            return;
        }
        return p.json();
    })
    .then(data=>{
        if(data.message== "Thêm đóng góp thành công!"){
            showAlert(data.message);
        }
        else{
            showAlert(data.message,"alert-danger");

        }
    }).catch(p=>{
        showAlert("Không thể kết nối đến server. Vui lòng thử lại!")})
        
    ;
}




