// import {$, Inputmask, Fancybox, Swiper, Cookies, noUiSlider} from './common';
import {$, Fancybox, Swiper, Cookies, noUiSlider} from './common';

// Маска для телефона
// Inputmask('+7 (999) 999-9999').mask('.js-phone');

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
		console.log('error form');
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

		// $(this)[0].reset();
		// e.preventDefault();
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
	// grabCursor: true,
	// 	effect: "creative",
	// 	creativeEffect: {
	// 		prev: {
	// 			shadow: true,
	// 			translate: ["-20%", 0, -1],
	// 		},
	// 			next: {
	// 			translate: ["100%", 0, 0],
	// 		},
	// 	},
});

// Слайдер подборка товаров
const catalogSlider = new Swiper('.js-catalog-slider',
{
	loop:true,
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	spaceBetween: 12,
	coverflowEffect: {
		rotate: 0,
		depth: 0,
		modifier: 0,
		slideShadows: false,
		scale: 0,
		// stretch: 0,
	},
	navigation: {
		nextEl: '.js-catalog-slider-next',
		prevEl: '.js-catalog-slider-prev',
	},
	breakpoints: {
		768: {
			spaceBetween: 30,
			coverflowEffect: {
				depth: 200,
				// stretch: -30,
				scale: 0.8,
				modifier: 1,
			},
		}
	}
});


// Слайдер продуктов
const productSlider = new Swiper('.js-products-slider',
{
	// lazy:{loadPrevNext:true},
	loop:true,
	effect: "creative",
	creativeEffect: {
	  prev: {
		shadow: false,
		translate: [0, 0, -800],
		rotate: [180, 0, 0],
	  },
	  next: {
		shadow: false,
		translate: [0, 0, -800],
		rotate: [-180, 0, 0],
	  },
	},
	pagination:{
		el:".js-products-slider-pagination",
		clickable:true
	},
	navigation: {
		nextEl: '.js-products-slider-next',
		prevEl: '.js-products-slider-prev',
	},
});

// Слайдер салона
const salonSlider = new Swiper('.js-salon-slider',
{
	loop:true,
	effect: "creative",
	creativeEffect: {
		prev: {
			shadow: true,
			translate: [0, 0, -800],
			rotate: [180, 0, 0],
		},
		next: {
			shadow: true,
			translate: [0, 0, -800],
			rotate: [-180, 0, 0],
		},
	},
	navigation: {
		nextEl: '.js-salon-slider-next',
		prevEl: '.js-salon-slider-prev',
	},
});

// Слайдер волос
const hairSlider = new Swiper('.js-salon-slider-hair',
{
	loop:true,
	effect: "creative",
	creativeEffect: {
		prev: {
			shadow: true,
			translate: [0, 0, -800],
			rotate: [180, 0, 0],
		},
		next: {
			shadow: true,
			translate: [0, 0, -800],
			rotate: [-180, 0, 0],
		},
	},
	navigation: {
		nextEl: '.js-salon-slider-next-hair',
		prevEl: '.js-salon-slider-prev-hair',
	},
});

// Слайдер продуктов ранее просмотренных
const viewedSlider = new Swiper('.js-catalog-viewed',
{
	loop:true,
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	spaceBetween: 12,
	coverflowEffect: {
		rotate: 0,
		depth: 0,
		modifier: 0,
		slideShadows: false,
		scale: 0,
		// stretch: 0,
	},
	navigation: {
		nextEl: '.js-catalog-slider-next',
		prevEl: '.js-catalog-slider-prev',
	},
	breakpoints: {
		768: {
			spaceBetween: 30,
			coverflowEffect: {
				depth: 200,
				// stretch: -30,
				scale: 0.8,
				modifier: 1,
			},
		}
	}
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

// Перемещение мобильного меню
var levelMenu = 0;

$('.js-main-menu-arr').on("click", function(event){
	event.preventDefault();

	var $curItem = $(this).parent('.js-main-menu-link');
	var $subMenu = $curItem.siblings('.js-main-menu-sub');

	$('.js-main-menu-sub[data-level="'+levelMenu+'"]').addClass('overflow-hidden');
	levelMenu++;

	$subMenu.addClass('active');
	$('.js-main-menu-back').addClass('active');
	$('.js-main-menu-wrap').addClass('overflow-hidden');
});

$('.js-main-menu-back').on("click", function(event){
	if ($(this).hasClass('active')) {
		$('.js-main-menu-sub[data-level="'+levelMenu+'"]').removeClass('active');
		levelMenu--;

		if (levelMenu == 0) {
			$(this).removeClass('active');
			$('.js-main-menu-wrap').removeClass('overflow-hidden');
		}

		$('.js-main-menu-sub[data-level="'+levelMenu+'"]').removeClass('overflow-hidden');
	}
});

//Открыть/закрыть мобильное меню
$('.js-open-menu').on('click', function(){
	$(this).toggleClass('active');
	$('.js-main-menu-wrap').toggleClass('open');
	$('.js-body').toggleClass('no-scroll');
});

// select
if($('.js-select').length){
	$('.js-select').select2({
		minimumResultsForSearch: -1,
	});
}

// Переключение вида списка каталога
// $(".js-view-item").on('click', function(e) {
// 	e.preventDefault();
// 	let catalogView = $(this).data('type');

// 	Cookies.set('catalog-view', catalogView);

// 	$('.js-view-item').removeClass('active');
// 	$(this).addClass('active');

// 	$('.js-catalog-list').removeClass('catalog-list_grid catalog-list_tile');
// 	$('.js-catalog-list').addClass('catalog-list_'+catalogView);
// });

// range-slider
if($('.js-slider-range').length){
	$('.js-slider-range').each(function(indx, element){
		
		var slider = document.getElementById($(element).attr('id'));
		var minRange = parseFloat(slider.getAttribute('data-min'));
		var maxRange = parseFloat(slider.getAttribute('data-max'));
		var start = parseFloat(slider.getAttribute('data-cur-min'));
		var finish = parseFloat(slider.getAttribute('data-cur-max'));
		var idMinElem = $(element).closest('.js-range').find('.js-slider-range-min').attr('id');
		var idMaxElem = $(element).closest('.js-range').find('.js-slider-range-max').attr('id');
		
		noUiSlider.create(slider, {
			start: [start, finish],
			step: 1,
			connect: true,
			range: {
				'min': minRange,
				'max': maxRange
			},
		});

		var snapValues = [
			document.getElementById(idMinElem),
			document.getElementById(idMaxElem)
		];

		var initRange = false;

		slider.noUiSlider.on('update', function (values, handle) {
			snapValues[handle].value = values[handle];

			if(initRange == false){
				if(handle == 1){
				initRange = true;
				}
			}else{
				$('.js-slider-range-min').trigger("change");
				$('.js-slider-range-max').trigger("change");
			}

			$('#'+snapValues[handle].id).text(snapValues[handle].value);
		});

		snapValues.forEach(function (input, handle) {
			input.addEventListener('change', function () {
				var valItem = this.value;
				var minValItem = parseFloat(snapValues[0].value);
				var maxValItem = parseFloat(snapValues[1].value);

				if(handle == 0){
					if((valItem < minRange) || (valItem > maxRange) || (valItem >= maxValItem)){
						valItem = minRange;
					}
				}else{
					if((valItem < minRange) || (valItem > maxRange) || (valItem <= minValItem)){
						valItem = maxRange;
					}
				}
				slider.noUiSlider.setHandle(handle, valItem);
			});
		});
	});

	$(".js-slider-range-input-min").html($(".js-slider-range-min").val());
	$(".js-slider-range-input-max").html($(".js-slider-range-max").val()),

	// Проверка полей на ввод цифор
	$('.js-slider-range-min').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}

		$(".js-slider-range-input-min").html(this.value);
	});

	$('.js-slider-range-max').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}

		$(".js-slider-range-input-max").html(this.value);
	});

	$(".js-slider-range-min-empty").val("");
	$(".js-slider-range-max-empty").val("");
}


// Открыть/Закрыть пункты фильтра
if($('.js-filter-head').length){
	$('.js-filter-head').on('click', function(){
		$(this).closest('.js-filter-item').toggleClass('active');
		$(this).siblings('.js-filter-content').slideToggle(300);
	});
}

// Открыть/Закрыть фильтр
if($('.js-btn-filter').length){
	$('.js-btn-filter').on('click', function(){
		$('.js-filter-wrap').addClass('open');
	});

	$('.js-filter-wrap-close').on('click', function(){
		$('.js-filter-wrap').removeClass('open');
	});
}

//Слайдер детального изображения каталога
var prodDetailSliderThumb = new Swiper('.js-prod-detail-thumb-slider', {
	slidesPerView: 6,
	spaceBetween: 5,
	freeMode: true,
	watchSlidesProgress: true,
	direction: "vertical",
	breakpoints: {
		1280: {
			spaceBetween: 10,
		}
	}
	// loop: true,
});
var prodDetailSlider = new Swiper('.js-prod-detail-slider', {
	spaceBetween: 20,
	// loop: true,
	navigation: {
		nextEl: ".js-prod-detail-slider-next",
		prevEl: ".js-prod-detail-slider-prev",
	},
	thumbs: {
		swiper: prodDetailSliderThumb,
	},
});


// Плавный переход к блоку
if($('.js-link-move').length){
	$('.js-link-move').on('click', function() {
		var posBlock = $('.js-to-move[data-move='+$(this).data('move')+']').offset().top;

		$(window).on('resize', function(){
			posBlock = $('.js-to-move[data-move='+$(this).data('move')+']').offset().top;
		});
		
		$('html, body').animate({ scrollTop: posBlock }, 600);
	});
}

// Раскрывающийся блок
$(".js-unwrap-block").on('click','.js-unwrap-head',function(event){
    event.preventDefault();
    $(this).parent().toggleClass("opened");
    if($(this).parent().hasClass("opened")){
        $(this).parent().children(".js-unwrap-content").slideDown(400);
    }
    else{
        $(this).parent().children(".js-unwrap-content").slideUp(400);
    }
});

//Очищаем поле поиска
$('.js-form-search-cancel').on('click', function(){
	$(this).siblings('.js-search-input').val('');
});
