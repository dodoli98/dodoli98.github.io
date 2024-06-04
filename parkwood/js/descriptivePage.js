$(function () {


    // toneswoodSection
    var $toneswoodImg = $('.toneswood_img');
    console.log($toneswoodImg);


    const toneswoodObserverOptions = {
        threshold: 0.3
    };

    var toneswoodObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    'opacity': 1,
                    'transform': 'rotate(0deg)'
                });
            } else {
                $(entry.target).css({
                    'opacity': 0,
                    'transform': 'rotate(-90deg)'
                });
            }
        });
    }, toneswoodObserverOptions);


    $toneswoodImg.each(function () {
        toneswoodObserver.observe(this);
    });




    // finish Section
    var $imgContainer = $('#finishImg_wrapper > div');

    $imgContainer.on('mouseenter', function () {
        $(this).css({
            'background-color': 'transparent',
            'transition': 'background-color 0.2s ease' 
        });

        $imgContainer.on('mouseleave', function () {
            $(this).css({
                'background-color': 'rgba(0, 0, 0, 0.8)',
                'transition': 'background-color 5s ease'
            });
        });
    });

    



});
