// =============================== lenis 부드러운 스크롤

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// =============================== 배경색 에니메이션

// gsap.utils.toArray(".parallax__item").forEach((item) => {
//     let color = item.getAttribute("data-bg");

//     ScrollTrigger.create({
//         trigger: item,
//         start: "top 50%",
//         end: "bottom 5%",
//         markers: true,

//         onEnter: () => gsap.to("body", {
//             backgroundColor: color,
//             duration: 1.4
//         }),
//         onEnterBack: () => gsap.to("body", {
//             backgroundColor: color,
//             duration: 1.4
//         }),
//     });
// });

// =============================== home
const homeAni = gsap.timeline();
homeAni.to("#home .home_video", {
    autoAlpha: 0, 
    scale: 2,
})

ScrollTrigger.create({
    animation: homeAni,
    trigger: "#home",
    start: "top top",
    end: "+=2000",
    scrub: true,
    pin: true,
    markers: false,
    anticipatePin: 1,
});


// =============================== about 텍스트 에니메이션
const aboutAni = gsap.timeline();
aboutAni.from("#about .t1", {autoAlpha: 0, duration: 1, y: 50}, "+=1")
    .from("#about .t2", {autoAlpha: 0, duration: 1, y: 50}, "+=1")
    .from("#about .t3", {autoAlpha: 0, duration: 1, y: 50}, "+=1")

ScrollTrigger.create({
    animation: aboutAni,
    trigger: "#about",
    start: "top top",
    end: "+=4000",
    scrub: true,
    pin: true,
    anticipatePin: 1
});




// =============================== 텍스트 에니메이션 

// 텍스트 에니메이션 시작
const targets = gsap.utils.toArray(".split");

targets.forEach((target) => {
    let SplitClient = new SplitType(target, { type: "words" });
    let words = SplitClient.words;

    gsap.from(words, {
        yPercent: -40,
        opacity: 0,
        duration: 1,
        ease: "circ.out",
        stagger: {
            amount: 1,
            from: "random"
        },
        scrollTrigger: {
            trigger: target,
            start: "top: 70%",
            end: "+=400",
        }
    });
});
// 텍스트 에니메이션 끝


// skill 숫자 에니메이션 시작
/**
 * 1. 각 data-percent 값 추출 (foreach 문)
 * 2. parseInt(값, 10) 는 값을 정술 바꿈 ,10은 10진수의미
 * 3. gsap로 트리거 설정
 *      onUpdate : 애니메이션이 진행 중일 때 매 프레임마다 실행됩니다.
                애니메이션 진행 상황에 따라 화면에 실시간으로 업데이트가 필요할 때 사용
    4.Math.round(startCount.var) : 반올림하여 정수
    5. 반올림한 정수를 item.innerHTML에 추가하기
 */
document.querySelectorAll(".skillPercent").forEach((item) => {
    const percent = parseInt(item.getAttribute("data-percent"), 10)
    const startValue = {var: 0};

    gsap.to(startValue, {
        var: percent,
        duration: 2,
        onUpdate: () => {
            item.innerHTML = `${Math.round(startValue.var)}%`; // 실시간 업데이트
        },

        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 70%",
            scrub: true
        }
    })
});
// skill 숫자 에니메이션 끝

// =============================== works

// 가로애니메이션 scrollTween을 사용해야 다른 애니메이션과 연동 가능
// gsap.utils.toArray  GSAP 라이브러리에서 제공하는 유틸리티로, 선택자를 배열로 변환
const worksWrapper = document.getElementById("works_wrapper");
const worksItem = gsap.utils.toArray(".works_item")

let scrollTween = gsap.to(worksItem, {
    xPercent: -100 * (worksItem.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: worksWrapper,
        start: () => worksWrapper.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        end: () =>  "+=" + (worksWrapper.offsetWidth - innerWidth),
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        snap: {
            snapTo: 1 / (worksItem.length - 1),
            inertia: false,
            duration: {min: 0.1, max: 0.1}
        }
    }
});


const spilt2 = gsap.utils.toArray(".split2");

spilt2.forEach((spilt2) => {
    let SplitClient = new SplitType(spilt2, { type: "words" });
    let words = SplitClient.words;

    gsap.from(words, {
        yPercent: -40,
        opacity: 0,
        duration: 1,
        ease: "circ.out",
        stagger: {
            amount: 1,
            from: "random"
        },
        scrollTrigger: {
            trigger: spilt2,
            containerAnimation: scrollTween,
            start: "top: 70%",
            end: "+=400",
            markers: false
        }
    });
});

gsap.from(".toy_project_item", {
    y: 50,
    autoAlpha: 0,
    duration: 0.5,
    stagger: 0.3, // 0.3초간격으로 이미지가 보임
    scrollTrigger: {
        trigger: "#toy_project_list",
        containerAnimation: scrollTween,
        start: "top 20%",
        toggleActions: "restart none restart none" // 다시 80% 지점에 도달할 때 애니메이션 재시작
    }
});

// =============================== contact
// 초기 상태 설정
gsap.set("#contact .contact_video", { scale: 2, autoAlpha: 0 });

const contactAni = gsap.timeline();
contactAni
  .to("#contact .contact_video", { scale: 1, autoAlpha: 1, duration: 2 })

ScrollTrigger.create({
  animation: contactAni,
  trigger: "#contact",
  start: "top top",
  end: "+=2000",
  scrub: true,
  pin: true,
  markers: false,
  anticipatePin: 1,
});
