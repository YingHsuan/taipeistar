// JavaScript Document

$(function() {
    
    //header nav for mobile
    
    $('header.hp .nav-icon').click(function(e) {
        $('header.hp .nav-bar-mo').animate({left:"0"});
        e.preventDefault();
    });
    $('header.hp .nav-bar-mo .nav-close').click(function(e) {
        $('header.hp .nav-bar-mo').animate({left:"-300px"});
        e.preventDefault();
    });
    
});