$(document).ready(function () {
    /*start the loading page */
    $(window).on("load", function () {
        $(".loader")
            .fadeOut(2000, function () {
                $("body").css("overflow", "auto");
                $("this").fadeOut(1500, function () {
                    $(this).remove();
                });
            });
    });
     //scroll to top make fade for button
     $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $(".scroll-top-button").fadeIn();
        } else {
            $(".scroll-top-button").fadeOut();
        }
    });
    //scroll to top button
    $(".scroll-top-button").on('click', function () {
        $('html , body').animate({
            scrollTop: 0
        }, 100);
    });
    //fancybox
    $('[data-fancybox="gallery"]').fancybox({
        arrows: false,
        loop: false,
        keyboard: false,
        infobar: false,
        protect: true,
        image: {
            preload: true
        },
        hideScrollbar: true,
        touch: false 
    });
    //add to cart 
    $('.add-cart').on('click', function () {
        var cart = $('.cart-circle');
        var imgtodrag = $(this).closest('.box').find("img").first();
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    
                top: imgtodrag.offset().top ,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.8',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'border-radius': '50%',
                    'z-index': '9999'
            })
            .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
               
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
    });  
    //type.js
    var typed = new Typed('#typed', {
        strings: ['شركه الاعمال الفائقه'],
        typeSpeed: 50,
        backSpeed: 50 ,
        loop: true
    });
  
    //category list
    $('.category').on({
        mouseenter: function(){
            $('.list-hover-shape').addClass('active-hover-list');
        },
        mouseleave: function(){
            $('.list-hover-shape').removeClass('active-hover-list');
        }
    });
    //change navbar color on scroll
    $(function () {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        });
    })
    $('.list-hover-shape').on({
        mouseenter: function(){
            $('.list-hover-shape').addClass('active-hover-list');
        },
        mouseleave: function(){
            $('.list-hover-shape').removeClass('active-hover-list');
        }
    });
    
    //active cart
    $('.cart-bag').click(function(){
        $('.cart-container').addClass('active-cart');
    });
    $('.cart-overlay').click(function(){
        $('.cart-container').removeClass('active-cart');
    });
    //active list in nav 
    $('.currency-button').click(function(){
        $('.currecncy-list').addClass('active-list');
    });
    $('.language-button').click(function(){
        $('.language-list').addClass('active-list');
    });
    $('.all-section-button').click(function(){
        $('.all-section-list').addClass('active-list');
    });
    $('.some-section-button').click(function(){
        $('.some-section-list').addClass('active-list');
    });
    $('.products-list-button').click(function(){
        $('.product-list').addClass('active-list');
    });
    $('.call-button').click(function(){
        $('.call-list').addClass('active-list');
    });
    $('.back-content').click(function(){
        $('.currecncy-list').removeClass('active-list');
        $('.language-list').removeClass('active-list');
        $('.all-section-list').removeClass('active-list');
        $('.some-section-list').removeClass('active-list');
        $('.call-list').removeClass('active-list');
    });
    $('.back-one-step').click(function(){
        $('.product-list').removeClass('active-list');
    });
    $('.button-content').click(function(){
        $('.mobile-nav').addClass('active-list');
    });
    $('.mobile-overlay').click(function(){
        $('.mobile-nav').removeClass('active-list');
        $('.currecncy-list').removeClass('active-list');
        $('.language-list').removeClass('active-list');
        $('.all-section-list').removeClass('active-list');
        $('.some-section-list').removeClass('active-list');
        $('.call-list').removeClass('active-list');
        $('.product-list').removeClass('active-list');
    });
    //end nav
    //owl header
    $('.owl-header').owlCarousel({
        rtl: true,
		loop: false,
		autoplay: false,
		margin: 0,
		nav: false,
		dots: true,
		touchDrag  : false,
		mouseDrag  : false,
		autoWidth: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		dragEndSpeed: 2000,
		slidSpeed: 900,
		paginationSpeed: 900,
		navContainerClass: "container owl-nav",
		navText: [
            '<i class="fas fa-arrow-right"></i>',
            '<i class="fas fa-arrow-left"></i>'
        ],
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
    });
    //owl product section
    $('.owl-product-section').owlCarousel({
        rtl: true,
		loop: false,
		autoplay: false,
		margin: 0,
		dots: true,
		touchDrag  : false,
		mouseDrag  : false,
		autoWidth: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		dragEndSpeed: 2000,
		slidSpeed: 900,
		paginationSpeed: 900,
		navContainerClass: "container owl-nav",
		navText: [
            '<i class="fas fa-arrow-right"></i>',
            '<i class="fas fa-arrow-left"></i>'
        ],
		responsive: {
			0: {
                items: 1 ,
                nav: true,
			},
			600: {
                items: 3 ,
                nav: true,
			},
			1000: {
				items: 5,
                nav: false
			}
		}
    });
    //owl products
    $('.owl-products').owlCarousel({
        rtl: true,
		loop: false,
		autoplay: false,
		margin:  10,
		dots: true,
		touchDrag  : false,
		mouseDrag  : false,
		autoWidth: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		dragEndSpeed: 2000,
		slidSpeed: 900,
		paginationSpeed: 900,
		navContainerClass: "container owl-nav",
		navText: [
            '<i class="fas fa-arrow-right"></i>',
            '<i class="fas fa-arrow-left"></i>'
        ],
		responsive: {
			0: {
                items: 1 ,
                nav: true,
			},
			600: {
                items: 3 ,
                nav: true,
			},
			1000: {
				items: 5,
                nav: false
			}
		}
    });
});