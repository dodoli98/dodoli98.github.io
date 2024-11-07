// // 변수선언
// let contentBody = document.getElementById("dropCandy");
// let canvas = document.createElement("canvas");
// let ctx = canvas.getContext("2d");

// canvas.width = 500;
// canvas.height = 350;
// contentBody.appendChild(canvas);

// // 이미지 배열
// let imageSources = [
//     "image/colorLogo.png",
//     "image/vitageLogo.png",
//     "image/vintageLogo2.png",
//     "image/blackLogo.png"
// ];

// let imgList = [];

// // 이미지 객체 변수
// let image1, image2, image3, image4;

// // 이미지 로드 및 설정
// function loadImages() {
//     image1 = new Image();
//     image2 = new Image();
//     image3 = new Image();
//     image4 = new Image();

//     image1.src = imageSources[0];
//     image2.src = imageSources[1];
//     image3.src = imageSources[2];
//     image4.src = imageSources[3];
// }

// // 이미지의 y 값은 0 고정, x값은 랜덤
// function randomX(min, max) {
//     return Math.floor(Math.random() * max);
// }

// // 이미지 생성자 함수
// function makeImage() {
//     this.x = 0;
//     this.y = 0;
//     this.image = null;
    
//     this.init = function () {
//         this.y = 0;
//         this.x = randomX(0, canvas.width);

//         // 무작위로 네 개의 이미지 중 하나를 선택
//         let randomIndex = Math.floor(Math.random() * 4);
//         switch (randomIndex) {
//             case 0:
//                 this.image = image1;
//                 break;
//             case 1:
//                 this.image = image2;
//                 break;
//             case 2:
//                 this.image = image3;
//                 break;
//             case 3:
//                 this.image = image4;
//                 break;
//         }

//         imgList.push(this);
//     }

//     // y 값을 계속 더해 아래로 떨어지는 것처럼 보이게 한다.
//     this.update = function () {
//         this.y += 2;
//     }

//     // 이미지 그리기
//     this.draw = function () {
//         if (this.image) {
//             ctx.drawImage(this.image, this.x, this.y, 70, 50);
//         }
//     }
// }

// // 애니메이션 업데이트
// function updateCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

//     for (let i = 0; i < imgList.length; i++) {
//         imgList[i].update();
//         imgList[i].draw();

//         // 이미지가 캔버스 밖으로 나가면 삭제
//         if (imgList[i].y > canvas.height) {
//             imgList.splice(i, 1);
//             i--;
//         }
//     }

//     requestAnimationFrame(updateCanvas);
// }

// // 인터벌 함수로 1초마다 이미지 생성
// function createImage() {
//     setInterval(function () {
//         let e = new makeImage();
//         e.init();
//     }, 1000);
// }

// // 모든 이미지 로드 완료 후 시작
// window.onload = function() {
//     loadImages();
//     createImage();
//     updateCanvas();
// }
