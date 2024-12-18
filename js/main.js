document.addEventListener("DOMContentLoaded", () => {
    history.scrollRestoration = "auto"; 
    
    document.querySelectorAll('.about_hover_text').forEach((element) => {
        element.addEventListener('mouseover', () => {
            // 부모 요소(`.about_item`)를 찾고 그 안의 `.hover_img` 선택
            const hoverImg = element.closest('.about_item').querySelector('.hover_img');
            if (hoverImg) {
                hoverImg.classList.add('active'); // 클래스 추가
            }
        });
    
        element.addEventListener('mouseout', () => {
            const hoverImg = element.closest('.about_item').querySelector('.hover_img');
            if (hoverImg) {
                hoverImg.classList.remove('active'); // 클래스 제거
            }
        });
    });
    


});

