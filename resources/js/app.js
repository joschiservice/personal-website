require('./bootstrap');

$(document).ready( function(){
    $("body").show();
  });

  //NAVBAR
$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('transparent', $(this).scrollTop() < $nav.height());
      $nav.toggleClass('nav-dark', $(this).scrollTop() > $nav.height());
      $nav.toggleClass('pt-4', $(this).scrollTop() < $nav.height())
    });
  });

