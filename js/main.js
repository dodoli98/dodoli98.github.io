window.onload = function () {

    // -------------- loading
    var welcome = document.querySelector('#loading > h1 > span'); // 첫 번째 span 요소 선택
    const welcomeInnerText = 'Welcome!';
    var loadingPage = document.querySelector('#loading');
    var homePage = document.querySelector('#home');
    var banner = document.querySelector('#portfolio_image > img');

    let i = 0;


    function loading() {
        // for 문으로바꿔보기
        if (i < welcomeInnerText.length) {
            let txt = welcomeInnerText.charAt(i);
            welcome.innerHTML += txt;
            i++;
        } else {
            setTimeout(function () {
                loadingPage.style.borderRadius = '50%'
                loadingPage.style.scale = '0'
                loadingPage.style.dispaly = 'none';
                setTimeout(function () {
                    banner.style.transform = "translate(0%)";
                    banner.style.opacity = 1;
                }, 300);
            }, 3000);

        }
    }
    setInterval(loading, 200)




    // -------------- menu Overlay
    var menuButton = document.getElementById('menu_button');
    var menuPage = document.querySelector('.overlay_layout');


    // 메뉴 버튼에 active 토글
    menuButton.addEventListener('click', showMenuPage);
    function showMenuPage() {

        menuButton.classList.toggle('active');

        menuPage.classList.toggle('active');
    }


    // 메뉴 ul 요소를 선택
    var menuList = document.getElementById('menu_list');

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
    var skillList = document.querySelectorAll("#skill_list > li")
    var skillIcon = document.querySelectorAll("#skill_list > li > img")
    var progress = document.getElementById("progress");
    var percentOfPrgress = [85, 85, 80, 70, 70, 60];
    var tab_content = document.querySelectorAll(".tab_content")
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
        profileTextMotion();

        //새로고침후 스크롤 맨위로
        history.scrollRestoration = "manual";
    });


    // about 페이지모션

    // h3 텍스트가 화면에 보이기시작하면
    // h3 요소에 translate 스타일 부여
    var profileInfoDiv_1 = document.querySelector("#profile_info>div:nth-child(1)")
    console.log(profileInfoDiv_1);
    var profileInfoDiv_2 = document.querySelector("#profile_info>div:nth-child(2)")
    console.log(profileInfoDiv_2);

    function profileTextMotion() {
        var div_1Rect = profileInfoDiv_1.getBoundingClientRect();
        var div_2Rect = profileInfoDiv_2.getBoundingClientRect();

        var profileTextArr = [profileInfoDiv_1, profileInfoDiv_2];

        // rect 배열에 값 추가
        var rect = [div_1Rect, div_2Rect];

        rect.forEach((item, index) => {

            if (item.bottom >=  item.height &&
                item.top <= (document.documentElement.clientHeight - item.height/3)) 
            {
                profileTextArr[index].style.transform = "translate(0%)";
            } else {
                // 요소가 화면에 보이지 않을 때
                if (index === 0) {
                    // 첫 번째 요소)
                    profileTextArr[index].style.transform = "translateX(160%)"; // 오른쪽으로 이동된 상태
                } else if (index === 1) {
                    // 두 번째 요소
                    profileTextArr[index].style.transform = "translateX(-160%)"; // 왼쪽으로 이동된 상태
                }
            }

        })

    }


    // 웹 스크롤 모션
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



