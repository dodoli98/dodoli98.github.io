window.onload = function () {

    document.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        const blueShoe = document.getElementById('blueClimbingShoe');
        const greenShoe = document.getElementById('greenClimbingShoe');
    
        const blueSpeedY = 0.3; // blueClimbingShoe 수직 스크롤 속도 조정
        const greenSpeedY = 0.1; // greenClimbingShoe 수직 스크롤 속도 조정
        const blueSpeedX = 0.4; // blueClimbingShoe 수평 스크롤 속도 조정
        const greenSpeedX = 0.2; // greenClimbingShoe 수평 스크롤 속도 조정
    
        blueShoe.style.transform = `translate(${scrolled * blueSpeedX}px, ${scrolled * blueSpeedY}px)`;
        greenShoe.style.transform = `translate(${-scrolled * greenSpeedX}px, ${scrolled * greenSpeedY}px)`;
    });
    
  
    
    const prductPage = document.getElementById('prduct');
    const observerOptions = {
        root: null,
        threshold: 0.3
    };
    
    let productObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('intersecting');
                entry.target.childNodes
            } else {
                entry.target.classList.remove('intersecting');
            }
        });
    }, observerOptions);
    
    productObserver.observe(prductPage);
    

    
    


    // history observer
    
    
    const historyCards = document.querySelectorAll('.historyCard > p');
    const historyPage = document.getElementById('history');
    console.log(historyPage);


    let historyPageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundColor = "#E2E2E2";
            } else {
                entry.target.style.backgroundColor = "white";
            }
        });
    });
    
    historyPageObserver.observe(historyPage);

   
    let historyobserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);
    
    
    historyCards.forEach(card => {
        historyobserver.observe(card);
    });
    
    
}