$(function () {
    var currentIndex = 0;
    var $slides = $('#banner > ul > li');
    var slideCount = $slides.length;

    function toggleSlide() {
        $slides.eq(currentIndex).fadeOut(500);
        currentIndex = (currentIndex + 1) % slideCount;
        $slides.eq(currentIndex).fadeIn(500);
    }

    // 5초마다 토글
    setInterval(toggleSlide, 6000);


    // IntersectionObserver
    // Intersection observer는 브라우저 뷰포트(Viewport)와 원하는 요소(Element)의 교차점을 관찰하며,
    // 요소가 뷰포트에 포함되는지 아닌지 구별하는 기능을 제공
    // new IntersectionObserver(callback, options) 방식으로 관찰자를 초기화
    const textObserverOptions = {
        threshold: 0.3
    };

    var textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // e.forEach((img) => {
            //     img.target.style.opacity = img.intersectionRatio;
            // });
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translate(0px)";

            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = "translate(50px)";

            }
        });
    }, textObserverOptions);

    var acousticsImg = document.querySelectorAll(".acoustics_wrapper > div > a > img");


    // 스크롤 이벤트 발생 시 이미지 관찰 시작
    textObserver.observe(acousticsImg[0]);
    textObserver.observe(acousticsImg[1]);
    textObserver.observe(acousticsImg[2]);


    var scrollContainer = document.getElementById("scroll_event")
    var scrollWrapper = document.querySelectorAll(".scroll_img_wrapper");
    console.log(scrollWrapper);
    console.log(scrollContainer);

    const scrollEventOptions = {
        threshold: 0.5
    };


    var newsImg = document.querySelectorAll('.video_thumbnail');
    console.log(newsImg);
    var videoName = document.querySelectorAll('.video_container > div:nth-child(1)> h3');
    console.log(videoName);


    var newsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(newsImg).indexOf(entry.target);
            console.log(index);
            if (entry.isIntersecting) {
                videoName[index].style.transform = "translateY(0px)";
            } else {
                videoName[index].style.transform = "translateY(100%)";
            }
        });
    }, scrollEventOptions);

    newsObserver.observe(newsImg[0]);
    newsObserver.observe(newsImg[1]);

   

});



