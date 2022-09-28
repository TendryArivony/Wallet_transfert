$(document).ready(function() {
    setTimeout(function(){
$('.carousel-nav').owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    nav:true
});


$('.carousel-dot').owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    nav:false
});

},350);
});