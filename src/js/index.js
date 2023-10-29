import {$, Inputmask, Fancybox, Swiper} from './common';

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();

	form.find('input[type=email]').each(function(){
		mailValid($(this));
	});

	form.find('.js-input-mail').each(function(){
		mailValid($(this));
	});

	function mailValid(elem) {
		var email = $(elem).val().trim();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(elem).closest('.js-form-site-item').addClass('error');
			$(elem).closest('.js-form-site-item').append('<div class="form-site-msg-error">Укажите корректный E-mail</div>');
		}
	}

	form.find('input,textarea,select').filter('[required]').each(function(){
		var $item = $(this).closest('.js-form-site-item');

		if($(this).val().length < 1){
			$item.addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите ваш номер телефона');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});

	$('.js-valid-form').on('submit', 'form', function(e){
		var successTitle = $(this).closest('.js-valid-form').data('success');
		var successText = $(this).closest('.js-valid-form').data('text');
		var tempSuccessTitle = $('.js-success-alert-title').text();

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(tempSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else {
			$('.js-success-alert-text').css('display', 'block');
		}

		Fancybox.close();
		Fancybox.show([{ src: "#msg-success", type: "inline" }]);

		$(this)[0].reset();
		e.preventDefault();
	});
}

// Верхний слайдер
const topSlider = new Swiper('.js-top-slider',
{
	// lazy:{loadPrevNext:true},
	loop:true,
	pagination:{
		el:".js-top-slider-pagination",
		clickable:true
	},
	grabCursor: true,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
			},
				next: {
				translate: ["100%", 0, 0],
			},
		},
});

// Слайдер продуктов
const catalogSlider = new Swiper('.js-catalog-slider',
{
	// lazy:{loadPrevNext:true},
	loop:true,
	slidesPerView: 5,
	spaceBetween: 40,

	// pagination:{
	// 	el:".js-top-slider-pagination",
	// 	// type:"bullets",
	// 	clickable:true
	// },
	// navigation: {
	// 	nextEl: '.js-top-slider-next',
	// 	prevEl: '.js-top-slider-prev',
	// },
});

// Слайдер продуктов
const productSlider = new Swiper('.js-products-slider',
{
	// lazy:{loadPrevNext:true},
	loop:true,
	effect: "fade",
	pagination:{
		el:".js-products-slider-pagination",
		clickable:true
	},
	navigation: {
		nextEl: '.js-products-slider-next',
		prevEl: '.js-products-slider-prev',
	},
});


// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-item').on('click',function(e) {
		e.preventDefault();
		var $parent = $(this).parents('.js-tabs-page');

		$parent.find('.js-tabs-page-content-item').hide();
		$parent.find('.js-tabs-page-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();
	});
}