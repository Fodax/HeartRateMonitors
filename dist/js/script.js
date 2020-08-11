const slider = tns({
	container: '.carousel__inner',
	controls: false,
	nav: true,
	touch: true,
	mouseDrag: true,
	navPosition: 'bottom',
	responsive: {
		992: {
		  nav: false
		}
	}
});

document.querySelector('.prev-btn').addEventListener('click', function() {
	slider.goTo('prev');
});

document.querySelector('.next-btn').addEventListener('click', function() {
	slider.goTo('next');
});

$(document).ready(function() {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__info').eq(i).toggleClass('catalog-item__info_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	}

	validateForms('#consultation-form');
	validateForms('#consultation .feed-form');
	validateForms('#order .feed-form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$(this).find("input").val("");
		$('#consultation, #order').fadeOut('slow');
		$('.overlay, #thanks').fadeIn('slow');

		$('form').trigger('reset');

		return false;
	});

	//smooth scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[data-smooth-scroll]").click(function() {
		const _href = $(this).attr("href");

		if (_href == '#catalog')
			$("html, body").animate({scrollTop: $(_href).offset().top - 50 +"px"});
		else
			$("html, body").animate({scrollTop: $(_href).offset().top+"px"});

		return false;
	});

	new WOW().init();
});