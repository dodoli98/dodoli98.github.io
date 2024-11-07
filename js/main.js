document.addEventListener("DOMContentLoaded", () => {
    // menu 버튼
    const menuButton = document.getElementById('menu_button');

    // main nav
    const nav = document.getElementById("sidebar");
    const main = document.querySelector("main");


    // 메뉴 버튼에 active 토글
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        main.classList.toggle('main-shifted');
        nav.classList.toggle('nav-open');
    });

    // 사이드바의 모든 a 태그에 클릭 이벤트 추가
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            // 사이드바를 닫고 원래 위치로 복귀
            menuButton.classList.remove('active');
            main.classList.remove('main-shifted');
            nav.classList.remove('nav-open');
        });
    });



    // IntersectionObserver options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    // IntersectionObserver 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, options);

    // skillItems에 observer 적용
    const skillItems = document.querySelectorAll('#skill_list > li');
    skillItems.forEach(item => observer.observe(item));

    // works 영역 toggle
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('rotate');
            this.closest('li').querySelector('.works_content').classList.toggle('expanded');
        });
    });

    // works_item에 대한 IntersectionObserver
    const workItems = document.querySelectorAll('#works_list .work_item');
    const workOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.style.transform = entry.isIntersecting ? 'scale(1)' : 'scale(0.7)';
        });
    }, workOptions);

    workItems.forEach(item => workObserver.observe(item));

    // 마우스 호버 이미지
    const hoverImage = document.createElement('img');
    hoverImage.className = 'hover-image';
    document.body.appendChild(hoverImage);

    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const imageUrl = trigger.getAttribute('data-image');
            hoverImage.src = imageUrl;
            hoverImage.style.opacity = '1';
            updateImagePosition(e);
        });

        trigger.addEventListener('mousemove', updateImagePosition);
        trigger.addEventListener('mouseleave', () => {
            hoverImage.style.opacity = '0';
        });
    });

    function updateImagePosition(e) {
        const x = e.clientX + 170;
        const y = e.clientY + 170;
        hoverImage.style.left = `${x}px`;
        hoverImage.style.top = `${y}px`;
    }




    // 스크롤 위치 기억하기
    main.addEventListener('scroll', () => {
        const scrollPosition = main.scrollTop;  // Change to scrollTop for the main element
        history.replaceState({ scrollPosition }, document.title);
    });

    // 페이지 로드 시 스크롤 위치 복원하기
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            main.scrollTo(0, event.state.scrollPosition); // Use scrollTo for the main element
        }
    });

    // 페이지가 처음 로드될 때 스크롤 위치 복원
    const initialState = history.state;
    if (initialState) {
        main.scrollTo(0, initialState.scrollPosition); // Use scrollTo for the main element
    }
});
