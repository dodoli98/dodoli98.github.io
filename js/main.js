window.onload = function () {

    // -------------- loading
    let welcome = document.querySelector('#loading > h1 > span'); // 첫 번째 span 요소 선택
    const welcomeInnerText = 'Welcome!';
    let loadingPage = document.querySelector('#loading');
    let homePage = document.querySelector('#home');
    let banner = document.querySelector('#portfolio_image > img');

    let i = 0;


    // 페이지가 이미 방문되었는지 확인
    if (sessionStorage.getItem('visited')) {
        // 방문한 적이 있다면 로딩 페이지를 숨기기
        loadingPage.style.display = 'none';
        banner.style.transform = "translate(0%)";
        banner.style.opacity = 1;
    } else {
        // 방문한 적이 없다면 로딩 페이지 보여주기
        sessionStorage.setItem('visited', 'true');

        function loading() {
            for (i = 0; i < welcomeInnerText.length; i++) {
                setTimeout(function (i) {
                    return function () {
                        let txt = welcomeInnerText.charAt(i);
                        welcome.innerHTML += txt;
                    };
                }(i), 200 * i);
            }

            setTimeout(function () {
                loadingPage.style.borderRadius = '50%';
                loadingPage.style.scale = '0';
                setTimeout(function () {
                    loadingPage.style.display = 'none';
                    banner.style.transform = "translate(0%)";
                    banner.style.opacity = 1;
                }, 300);
            }, 200 * welcomeInnerText.length + 3000);
        }

        loading();
    }


    // -------------- menu Overlay
    let menuButton = document.getElementById('menu_button');
    let menuPage = document.querySelector('.overlay_layout');


    // 메뉴 버튼에 active 토글
    menuButton.addEventListener('click', showMenuPage);
    function showMenuPage() {

        menuButton.classList.toggle('active');

        menuPage.classList.toggle('active');
    }


    // 메뉴 ul 요소를 선택
    let menuList = document.getElementById('menu_list');

    // 메뉴 ul 요소에 클릭 이벤트 리스너를 추가
    menuList.addEventListener('click', toggleMenu);


    // 메뉴 ul 요소를 클릭했을 때 실행되는 함수
    function toggleMenu(event) {
        showMenuPage();
    }




    // -------------- home
    // li요소 배열을 선언
    // li요소가 클릭되면 해당 li요소의 위치(n)를 받아온후
    // n번 째위치한 tab_content를 보이게 하기
    // percentOfPrgress[n]을 percentOfPrgress의 widht값으로 부여

    // progress Bar
    let skillList = document.querySelectorAll("#skill_list > li")
    let skillIcon = document.querySelectorAll("#skill_list > li > img")
    let progress = document.getElementById("progress");
    let percentOfPrgress = [85, 85, 80, 70, 70, 60];
    let tab_content = document.querySelectorAll(".tab_content")
    //   document.querySelector("#example").animate(keyframes, options);

    skillList.forEach(function (item, index) {
        item.addEventListener("click", function () {

            // 아이콘의 모든 애니메이션 제거
            skillIcon.forEach(function (skillIcon) {
                skillIcon.style.filter = "grayscale(100%)";
                skillIcon.style.transform = "scale(0.8)";
            });

            skillIcon[index].style.filter = "grayscale(0%)";
            skillIcon[index].style.transform = "scale(1.2)";



            // 모든 tab_content 요소에서 active 클래스 제거
            tab_content.forEach(function (tab_content) {
                tab_content.classList.remove("active");
            });


            tab_content[index].classList.add("active");
            progress.style.width = "20%";


            // progress.style.width = percentOfPrgress[index] + "%";
            // 클릭한 스킬에 해당하는 너비를 적용
            setTimeout(function () {
                progress.style.width = percentOfPrgress[index] + "%";
            }, 500);

        });
    });


    window.addEventListener('scroll', function () {
        webMotion();
        endingMotion();
        // profileTextMotion();

        //새로고침후 스크롤 맨위로
        // history.scrollRestoration = "manual";
    });


    // --------------------------------------- about 페이지모션


    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('profileShow');
            } else {
                entry.target.classList.remove('profileShow');
            }
        });
    };

    let options = {
        threshold: 0.6
    };

    let observer = new IntersectionObserver(callback, options);

    let targets = document.querySelectorAll('#profile_info > div');
    console.log(targets);
    targets.forEach((target) => {
        observer.observe(target);
    });




    // -------------------------------------------------- 웹 스크롤 모션
    var webWrapper = document.querySelectorAll('.web_wrapper')


    function webMotion() {
        webWrapper.forEach((item, index) => {
            var rect = item.getBoundingClientRect();
            var webWrapperTop = rect.top;
            var webWrapperBottm = rect.bottom;

            // 웹래퍼의 자식 요소인 .mockup 선택
            var mockup = item.querySelector('.mockup');
            // 뷰포트(top)을 넘어가면서 스크롤할 때마다 크기를 서서히 조정
            if (webWrapperTop < 0) {
                // webWrapperTop값이 음수이므로, 절대값으로 바꿔준다.
                // 그래야 scale 양수값이 들어감
                // 브라우저 창높이와 절대값 TOP값의 퍼센트를 구하기
                var scrollPercentage = Math.abs(webWrapperTop) / window.innerHeight; // 스크롤 비율
                var sclaeValue = 1 + scrollPercentage * 0.5; // 최대치는 1.5배

                // 투명도는 1에서빼기 시작하면 사라지게 잘안보이기때문에
                // 0.8 부터 뺀값을 대입
                var opacityValue = 0.8 - scrollPercentage; // 서서히 Opacity를 0으로 줄이기 위해 1에서 스크롤 비율을 뺀다.

                mockup.style.transform = "scale(" + sclaeValue + ")";

                item.style.opacity = opacityValue;

            } else {
                mockup.style.transform = "scale(1)"; // 뷰포트(top)을 넘어가지 않으면 기본 크기로 설정
                item.style.opacity = 1;

            }

        });
    }


    // -----------------------------------------------------javascript work
    let containers = document.querySelectorAll('.js_work_wrapper > a');
    
    containers.forEach(container => {
        container.addEventListener('mousemove', function (e) {
            var x = e.offsetX;
            var y = e.offsetY;
            var rotateY = -1 / 30 * x + 10; // rotateY 범위를 -10도에서 10도로 설정
            var rotateX = 1 / 60 * y - 5; 
    
            e.currentTarget.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    
        container.addEventListener('mouseout', function (e) {
            e.currentTarget.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg)';
        });
    });

    let first_link = document.getElementById("first-link")
    let second_link = document.getElementById("second-link")

   
    function jellyTextAnimate() {
        first_link.style.animationPlayState = 'running';
        setTimeout(() => {
            first_link.style.animationPlayState = 'paused';
            second_link.style.animationPlayState = 'running';

            setTimeout(() =>{
                second_link.style.animationPlayState = 'paused';
            },1000)
        },1000)
    }

    jellyTextAnimate();
    setInterval(jellyTextAnimate, 5000);

















    // 엔딩 모션
    var parentElement = document.querySelector('#ending');
    var paragraphs = parentElement.querySelectorAll('p');
    // 뷰포트
    var viewportHeight = window.innerHeight;

    function endingMotion() {
        var viewportCenter = window.scrollY + viewportHeight / 2;

        paragraphs.forEach((item, index) => {
            const paragraphOffset = item.getBoundingClientRect().top + window.scrollY;
            const offsetFromCenter = Math.abs(paragraphOffset - viewportCenter);
            // console.log("웹래퍼", index + 1, "의 뷰포트 top 위치:", offsetFromCenter);

            // 뷰포트 중앙에서의 거리가 200px 이내인 경우 스타일 적용
            // 뷰포트 중앙에서의 거리가 200px 이내인 경우 스타일 적용
            if (offsetFromCenter <= 200) {
                item.style.transform = "translateY(0px)";
                item.style.opacity = "1";
            } else {
                item.style.transform = "translateY(-100px)";
                item.style.opacity = "0";
            }

        });
    };






}



