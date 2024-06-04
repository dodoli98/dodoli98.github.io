window.onload = function () {
    // 메뉴 오버레이
    let menuButton = document.getElementById('menu_button');
    let menuPage = document.getElementById('overlay');

    menuButton.addEventListener('click', showMenuPage);
    function showMenuPage() {

        menuButton.classList.toggle('active');
        menuPage.classList.toggle('active');

    }


    // 제목 애니메이션 효과
    // 초기 요소에 animation-play-state: paused;
    // 1초동안 속성에 running 값 부여, 
    // 애니메이션 진행후 2초동안 다시 paused 부여

    let homeText1 = document.querySelector(".homeText_wrapper:nth-child(1)>div")
    let homeText2 = document.querySelector(".homeText_wrapper:nth-child(2)>div")

   
    function jellyTextAnimate() {

        homeText1.style.animationPlayState = 'running';

        setTimeout(() => {
            homeText2.style.animationPlayState = 'running';
            homeText1.style.animationPlayState = 'paused';
            setTimeout(() => {
                homeText2.style.animationPlayState = 'paused';
            }, 1000);
        },1000)
    }

    jellyTextAnimate();
    setInterval(jellyTextAnimate, 5000);

    // 텍스트 라벨
    const pTag1 = document.querySelector('#first_text_label > p')
    const pTag2 = document.querySelector('#second_text_label > p')
    const pTag3 = document.querySelector('#third_text_label > p')

    const textArr1 = "ChupaChups, Color your world with deliciousness The Chupa Chups way!".split(' ')
    const textArr3 = "More than 100 flavours More than 100 flavours More than 100 flavours".split(' ')

    let count1 = 0
    let count2 = 0;

    let count3 = 0

    initTexts(pTag1, textArr1)
    initTexts(pTag3, textArr3)
    initImages(pTag2);


    function initTexts(element, textArray) {
        textArray.push(...textArray)
        for (let i = 0; i < textArray.length; i++) {
            element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`
        }
    }

    function initImages(element) {
        const img = element.querySelector('img');
        for (let i = 0; i < 35; i++) { // 원하는 이미지 복사 횟수
            const clone = img.cloneNode(true);
            element.appendChild(clone);
        }
    }


    function marqueeText(count, element, direction) {
        if (count > element.scrollWidth / 2) {
            element.style.transform = `translate3d(0, 0, 0)`
            count = 0
        }
        element.style.transform = `translate3d(${direction * count}px, 0, 0)`

        return count
    }

    function animate() {
        count1++;
        count2++;
        count3++;

        count1 = marqueeText(count1, pTag1, -1);
        count2 = marqueeText(count2, pTag2, 1);
        count3 = marqueeText(count3, pTag3, -1);

        window.requestAnimationFrame(animate);
    }

    function scrollHandler() {
        count1 += 15;
        count2 += 15;
        count3 += 15;
    }

    window.addEventListener('scroll', scrollHandler)
    animate()



    // sticky card
    window.addEventListener('scroll', function () {
        const history = document.getElementById("history");
        const cardWrapper = document.getElementById("card_wrpper");

        // 시작지점
        const start = history.offsetTop;
        //끝나는 지점
        const end = start + history.offsetHeight - window.innerHeight;

        // 현재 스크롤 위치
        const scrollPosition = window.scrollY;

        // 현재 스크롤 위치(scrollPosition)가 start 와 end 사이에 있는지 확인
        if (scrollPosition >= start && scrollPosition <= end) {
            // 스크롤 진행 비율 (0 ~ 1)
            const progress = (scrollPosition - start) / (end - start);

            const translateX = - progress * 100;

            cardWrapper.style.transform = `translateX(${translateX}%)`;

        }

    });




    // card observer
    const cards = document.querySelectorAll(".card");

    const cardObserverOptions = {
        threshold: 0.5
    };

    let cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0)';
            }
        });
    }, cardObserverOptions);

    // 각 카드 요소를 관찰하도록 설정
    cards.forEach((card) => {
        cardObserver.observe(card);
    });




    let contentBody = document.getElementById("dropCandy");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    console.log(contentBody.offsetWidth);

    canvas.width = contentBody.offsetWidth;
    canvas.height = contentBody.offsetHeight;
    contentBody.appendChild(canvas);

    // 이미지 배열
    let imageSources = [
        "image/Strawberry.png",
        "image/vitageLogo.png",
        "image/vintageLogo2.png",
        "image/blackLogo.png"
    ];

    let imgList = [];

    // 이미지 객체 변수
    let image1, image2, image3, image4;

    // 이미지 로드 및 설정
    function loadImages() {
        image1 = new Image();
        image2 = new Image();
        image3 = new Image();
        image4 = new Image();

        image1.src = imageSources[0];
        image2.src = imageSources[1];
        image3.src = imageSources[2];
        image4.src = imageSources[3];
    }

    // 이미지의 y 값은 0 고정, x값은 랜덤
    function randomX(min, max) {
        return Math.floor(Math.random() * max);
    }

    // 이미지 생성자 함수
    function makeImage() {
        this.x = 0;
        this.y = 0;
        this.image = null;

        this.init = function () {
            this.y = -100;
            this.x = randomX(0, canvas.width);

            // 무작위로 네 개의 이미지 중 하나를 선택
            let randomIndex = Math.floor(Math.random() * 4);
            switch (randomIndex) {
                case 0:
                    this.image = image1;
                    break;
                case 1:
                    this.image = image2;
                    break;
                case 2:
                    this.image = image3;
                    break;
                case 3:
                    this.image = image4;
                    break;
            }

            imgList.push(this);
        }

        // y 값을 계속 더해 아래로 떨어지는 것처럼 보이게 한다.
        this.update = function () {
            this.y += 2;
        }

        // 이미지 그리기
        this.draw = function () {
            if (this.image) {
                ctx.drawImage(this.image, this.x, this.y, 100, 100);
            }
        }
    }

    // 애니메이션 업데이트
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

        for (let i = 0; i < imgList.length; i++) {
            imgList[i].update();
            imgList[i].draw();

            // 이미지가 캔버스 밖으로 나가면 삭제
            if (imgList[i].y > canvas.height) {
                imgList.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(render);
    }

    // 인터벌 함수로 1초마다 이미지 생성
    function createImage() {
        setInterval(function () {
            let e = new makeImage();
            e.init();
        }, 2000);
    }

    loadImages();
    createImage();
    render();




}
