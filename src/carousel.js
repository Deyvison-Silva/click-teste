$(document).ready(function(){
    const banner = $("#banner");

    banner.owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        loop: true,
        items:1,
    });
});