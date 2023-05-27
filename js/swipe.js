var swiper = new Swiper(".mySwiper", {
    speed: 1500,
    effect: "fade",
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: false,
    },
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 25,
        shadowScale: 0.94,
    },

    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});