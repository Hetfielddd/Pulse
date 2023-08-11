$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                    }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {        //создаем функцию под названием toggleSlide
        $(item).each(function(i) {         
            $(this).on('click', function(e) {           //ссылаемся к (this), .on('click') нужно для того чтобы указать что будет после того как пользователь кликнет.
                e.preventDefault();           //В скобках функции обязательно нужно написать "е" (от слова event) .preventDefault(); - отвечает за то чтобы функция по дефолту установленная браузером не сработала, к примеру не обновлялась страница при клике на ссылку.
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');          //ссылаемся к тегу который отвечает за контент в блоке, .eq(i) выбирает (по номеру в списке) выбранный элемент. (точнее тот который мы кликнули на сайте, к примеру 3 таблицу, и только она откроется)
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');            //toggleClass - добавляет класс к элементу если его нету, или же убирает его если он есть.
            })
        });
    };

      toggleSlide('.catalog-item__link');           
      toggleSlide('.catalog-item__back');           

      //Modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
      });


      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              rangelength: [2, 40]
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Введите ваше имя",
              rangelength: "Мин. символов: 2, Макс. символов 23",
            },
            phone: "Введите ваш номер телефона",
            email: {
              required: "Введите ваш емэйл",
              email: "Введите настоящий емэйл"
            }
          }
        });
      };

      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-9999");

      $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
          return;
        }
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      });

      //Smooth scroll and pageup

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });

          // Add smooth scrolling to all links
    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 100, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    new WOW().init();
  });