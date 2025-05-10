
// Import thư viện THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Cho phép di chuyển camera xung quanh cảnh 3D
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Cho phép tải file .gltf
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Tạo một Scene trong Three.js
const scene = new THREE.Scene();

// Tạo một camera mới với vị trí và góc nhìn
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Theo dõi vị trí chuột để điều khiển chuyển động mắt
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Biến toàn cục để lưu mô hình 3D
let object;

// OrbitControls cho phép camera di chuyển xung quanh cảnh
let controls;

// Chọn mô hình cần hiển thị
let objToRender = 'robot3';

// Khởi tạo loader để tải file .gltf
const loader = new GLTFLoader();

let animationIntervals = []; // Mảng lưu ID các interval
function startEyeAnimation(object) {
  const eyes = object.getObjectByName('Eyes_Blue_Light_0');
  let eyeRotationSpeed = 0.05;
  let eyeMaxRotation = Math.PI / 8;
  let eyeRotationX = 0;

  if (eyes) {
    const eyeInterval = setInterval(() => {
      eyeRotationX += eyeRotationSpeed;
      if (eyeRotationX > eyeMaxRotation || eyeRotationX < -eyeMaxRotation) {
        eyeRotationSpeed = -eyeRotationSpeed;
      }
      eyes.rotation.x = eyeRotationX;
    }, 50);

    animationIntervals.push(eyeInterval);
  }
}

function createAnimations() {
  // Hiệu ứng miệng
  const mouth = object.getObjectByName('Mouth_Blue_Light_0');
  let mouthOpen = false;
  if (mouth) {
    const mouthInterval = setInterval(() => {
      mouthOpen = !mouthOpen;
      mouth.scale.y = mouthOpen ? 50 : 2;
    }, 500);
    animationIntervals.push(mouthInterval);
  }

 

  // Hiệu ứng chân
  const legs = [
    object.getObjectByName('Wave_Blue_Light_0'),
    object.getObjectByName('Wave002_Blue_Light_0'),
    object.getObjectByName('Wave003_Blue_Light_0'),
  ];
  let legRotation = 0;
  let legMovement = 5;
  const legScales = [1, 1.2, 1.5];

  legs.forEach((leg, index) => {
    if (leg) {
      const legInterval = setInterval(() => {
        leg.rotation.z = Math.sin(legRotation) * 1;
        leg.position.y = Math.sin(legMovement) * 0.5;
        leg.scale.y = legScales[index] + Math.sin(legRotation) * 0.1;
        let colorValue = (Math.sin(legRotation) + 1) / 2;
        leg.material.color.setRGB(colorValue, 0, 1 - colorValue);
        legRotation += 0.05;
        legMovement += 0.02;
      }, 50);
      animationIntervals.push(legInterval);
    }
  });

  // Hiệu ứng tay
  const hands = [
    object.getObjectByName('hANDS_White_Glossy_0'),
    object.getObjectByName('hANDS002_White_Glossy_0'),
  ];
  let handRotation = 0;

  hands.forEach((hand) => {
    if (hand) {
      const handInterval = setInterval(() => {
        hand.rotation.x = Math.cos(handRotation) * 0.05;
        handRotation += 0.1;
      }, 50);
      animationIntervals.push(handInterval);
    }
  });
}
function stopAnimations() {
  animationIntervals.forEach((intervalId) => clearInterval(intervalId));
  animationIntervals = []; // Làm trống sau khi dừng
}

// Tải file mô hình
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    object.scale.set(1.5, 1.5, 1.5); // Tăng tỉ lệ mô hình lên 5 lần (hoặc điều chỉnh theo ý bạn)
    startEyeAnimation(object);
    // Tạo các hiệu ứng chuyển động sau khi thêm mô hình vào scene
    object.position.set(0, 10, -1); // bắt đầu ở trên cao

    let velocity = -0.01;  // vận tốc rơi ban đầu
    let gravity = -0.03;  // lực hấp dẫn
    let bounceFactor = 0.7; // độ bật lại
    let groundY = -0.8; // mặt đất

    function dropAndBounce() {
      velocity += gravity;
      object.position.y += velocity;

      if (object.position.y <= groundY) {
        object.position.y = groundY;
        velocity = -velocity * bounceFactor;

        // Nếu vận tốc quá nhỏ, dừng lại
        if (Math.abs(velocity) < 0.01) {
          object.position.y = groundY;
          return;
        }
      }

      requestAnimationFrame(dropAndBounce);
    }

    dropAndBounce(); // Bắt đầu hiệu ứng rơi nảy

  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% đã tải');
  },
  function (error) {
    console.error(error);
  }
);


// Khởi tạo renderer và đặt kích thước hiển thị
const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true cho phép nền trong suốt
renderer.setSize(window.innerWidth, window.innerHeight);

// Gắn renderer vào DOM
const container = document.getElementById("container3D");
if (container) {
    container.appendChild(renderer.domElement);
} else {
    console.error("Không tìm thấy phần tử #container3D để hiển thị mô hình.");
}

// Đặt khoảng cách camera tùy theo mô hình
camera.position.z = objToRender === "dino" ? 200 : 1;

// Thêm ánh sáng để hiển thị mô hình
const topLight = new THREE.DirectionalLight(0xffffff, 0.5); // Giảm độ sáng
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1); // Ánh sáng môi trường nhẹ
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 5000);
pointLight1.position.set(100, 100, 100);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 5000);
pointLight2.position.set(-100, -100, -100);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 5000);
pointLight3.position.set(-100, 100, 100);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffffff, 0.5, 5000);
pointLight4.position.set(100, -100, -100);
scene.add(pointLight4);

// Đảm bảo mô hình được chiếu sáng từ mọi hướng
if (object) {
  object.traverse((child) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide;
    }
  });
}

// Thiết lập điều khiển camera bằng chuột
controls = new OrbitControls(camera, renderer.domElement);

// Hàm render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Lắng nghe sự kiện thay đổi kích thước cửa sổ
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Bắt đầu render
animate();
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'vi-VN';
recognition.interimResults = false;

let isRecognitionInProgress = false;
let currentUtterance = null;

const stopButton = document.getElementById("stopButton");
const resultBox = document.getElementById("resultText");

// Nút bắt đầu nói
document.getElementById("startButton").addEventListener("click", () => {
  if (!isRecognitionInProgress) {
    recognition.start();
    isRecognitionInProgress = true;
    resultBox.textContent = "🎤 Đang nghe... Hãy đặt câu hỏi của bạn!";
  }
});

// Nút dừng nói
stopButton.addEventListener("click", () => {
  if (currentUtterance) {
    speechSynthesis.cancel();
    stopAnimations();
    stopButton.classList.add("d-none"); // Ẩn nút khi dừng
    resultBox.textContent += "\n⏹ Đã dừng nói.";
  }
});

// Khi có kết quả giọng nói
recognition.onresult = async function (event) {
  const transcript = event.results[0][0].transcript;
  resultBox.textContent = `🗣️ Bạn đã nói: ${transcript}`;
  isRecognitionInProgress = false;
  
  try {
    const response = await fetch('https://localhost:7287/api/ChatBot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: transcript // Gửi transcript trực tiếp thay vì tạo prompt
      })
    });
  
    const data = await response.json();
  
    // Nếu API trả về kết quả dưới dạng { answer: "..." }, bạn cần lấy đúng key
    const reply = data.answer || data.choices?.[0]?.message?.content || "Không có phản hồi từ server.";
    console.log(reply);
  
    // Gán kết quả trả về vào phần hiển thị (nếu có)
    resultBox.textContent += `\n🤖 ViVi: ${reply}`;
    createAnimations();

    const utterance = new SpeechSynthesisUtterance(reply);
    currentUtterance = utterance;
    utterance.lang = 'vi-VN';

    const voices = speechSynthesis.getVoices();
    const vietnameseVoice = voices.find(v => v.lang === 'vi-VN');
    if (vietnameseVoice) utterance.voice = vietnameseVoice;

    // Hiện nút dừng nói
    stopButton.classList.remove("d-none");

    utterance.onend = function () {
      stopAnimations();
      currentUtterance = null;
      stopButton.classList.add("d-none"); // Ẩn lại sau khi nói xong
    };

    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error("Lỗi gửi đến LM Studio:", error);
    resultBox.textContent = "❌ Lỗi khi kết nối đến LM Studio.";
    stopButton.classList.add("d-none");
  }
};

recognition.onerror = function () {
  isRecognitionInProgress = false;
  resultBox.textContent = "⚠️ Lỗi nhận diện giọng nói.";
};




  setTimeout(() => {
    listVoices(); 
  }, 1000);

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

// Xử lý lỗi nhận diện giọng nói
recognition.onerror = function (event) {
    console.error("Lỗi trong quá trình nhận diện:", event.error);
    if (event.error === 'no-speech') {
        document.getElementById("resultText").textContent = "Không nghe thấy gì cả. Vui lòng thử lại.";
    } else {
        document.getElementById("resultText").textContent = "Có lỗi xảy ra: " + event.error;
    }
};

// Khi kết thúc nhận diện
recognition.onend = function () {
    isRecognitionInProgress = false;
    console.log("Kết thúc nhận diện giọng nói.");
};

// Bắt đầu khi nhấn nút
document.getElementById("startButton").addEventListener("click", function () {
    if (!isRecognitionInProgress) {
        isRecognitionInProgress = true;
        recognition.start();
        document.getElementById("resultText").textContent = "🎙️ Đang lắng nghe...";
    } else {
        document.getElementById("resultText").textContent = "⏳ Vui lòng chờ quá trình hiện tại kết thúc.";
    }
});



window.sendQuestion1=async function() {
    const questionBox = document.getElementById("question");
    const responseDiv = document.getElementById("response");
    const message = questionBox.value.trim();
    if (!message) {
        return;
    }
    if (message) {
        $("#response").append(`
            <div class="mt-3 w-100">
                <span class="px-4 py-2 rounded-pill" id="textmy" style="background:rgb(150, 198, 249); width:auto !important">
                    <span class="font-weight-bold">Tôi:</span> ${message}
                </span>
            </div>
        `);
    }
    loadingAI($("#response"));

    try {
        let response;
      
           
            // Nếu không có file, gửi JSON thông thường
            response = await fetch("https://localhost:7287/api/ChatBot", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: message }) 
            });
            
            $("#question").val("");
        
        const data = await response.json();
     
        // Kiểm tra phản hồi hợp lệ
        if (data.answer!=null) {
            $("#response").append(`
                <div class="mt-3 w-100">
                    <h4>Trợ lý ViVi:</h4>
                    <pre>${markdownToHtml(data.answer)}</pre>
                </div>
            `);
        } else {
            $("#response").append("Không nhận được phản hồi hợp lệ từ AI.");
        }
   
        $("#loading").remove();
        responseDiv.style.display = 'block';
        var list = $("#response");
        list.scrollTop(list.prop("scrollHeight"));

    } catch (error) {
        console.error('Lỗi khi gửi câu hỏi:', error);
        responseDiv.innerText = 'Lỗi khi gửi câu hỏi hoặc nhận phản hồi.';
        responseDiv.style.display = 'block';
    }
}


function loadingAI(response){
response.append(`  <div class="w-100 d-flex" id="loading">
                    <div class="spinner-border text-success m-auto" role="status"  >
                        <span class="sr-only text-center">Loading...</span>
                      </div>
                </div>`)
}
$(document).ready(function() {
    // Kiểm tra trạng thái Dark Mode khi tải trang

    function newChat() {
        window.open("index.html", "_blank"); // Mở trang mới
    }
    $("#option2").click(function() {
        newChat();
    });
    $("#option22").click(function() {
        newChat();
    });
});

window.NoichuyenvoiViVi= function(){
var chat=  document.querySelector(".chatbotai");
var speak=  document.querySelector(".speakAI");
chat.classList.remove("d-none");
speak.classList.add("d-none");

}
window.NoivoiViVi= function(){
  var chat=  document.querySelector(".chatbotai");
var speak=  document.querySelector(".speakAI");

chat.classList.add("d-none");
speak.classList.remove("d-none");

}




