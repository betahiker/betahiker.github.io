
$(window).scroll(function(){
    var h = -$(window).scrollTop();
    if ( h < -160 ) {
        h = -160;
    }
    $("#menu-large").css({"margin-top": h + "px"});
});

