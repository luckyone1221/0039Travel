
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');
		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = '02-970.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	//when resize
	let headerBtns = document.querySelector('.headder-btns-js');
	let topHeader = document.querySelector("header");

	function whenResize() {
		let topH = topHeader.offsetHeight;

		if ($(window).scrollTop() > topH) {
			headerBtns.classList.add('fixed');
		} else {
			headerBtns.classList.remove('fixed');
		}

	}

	if (headerBtns && topHeader){
		window.addEventListener('scroll', whenResize, { passive: true });
		window.addEventListener('resize', whenResize, { passive: true });

		whenResize();
	}

	//end when resize


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyone js

	//creates group of toggle els with only 1 atcive by parent element
	function makeDDGroup(qSelecorts){
		for (let parentSelect of qSelecorts){
			let parent = document.querySelector(parentSelect);

			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js');

				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});
				});

			}

		}
	}
	makeDDGroup(['.dd-menu-js', '.dd-foot-js', '.dd-price-js']);

	//slider in tab
	let AllSliders = document.querySelectorAll('.galery-slider-js');
	for (let parent of AllSliders){
		let galerySlider = new Swiper(parent, {
			loop: true,
			slidesPerView: 'auto',

			breakpoints: {
				0 : {
					spaceBetween: 0,
				},
				480 : {
					spaceBetween: 18,
				},
				970 : {
					spaceBetween: 5,
				},
			},

			//lazy load
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 5,
			},

			//nav
			navigation: {
				nextEl: $(parent).closest('.galerySlider--js').find('.galery-next--js'),
				prevEl: $(parent).closest('.galerySlider--js').find('.galery-prev--js'),
			},
		});
	}

	let activeTabIndex = $('.sContent .tabs__content.active').index();
	$('.sContent .tabs__btn').click(function () {
		if (this.classList.contains('active')) return

		activeTabIndex = $(this).index();
		let thisSwiper = AllSliders[activeTabIndex];

		window.setTimeout(function () {
			thisSwiper.swiper.update();
		}, 50);
	});

	//menu js

	//this
	$('.this-btn-js').click(function (){
		$('.ppMenu-this-js').fadeIn();
	});
	$('.ppMenu-this-js .close-btn-js').click(function (){
		$('.ppMenu-this-js').fadeOut();
	});

	//glob
	$('.menu-btn-js').click(function (){
		$('.ppMenu-glob-js').fadeIn();
		$('body').addClass('fixed2');
	});
	$('.ppMenu-glob-js .close-btn-js').click(function (){
		$('.ppMenu-glob-js').fadeOut();
		$('body').removeClass('fixed2');
	});

	//where to go

	function setGroupToggleByParameters(parameters){
		for (let par of parameters){

			$(par.btnClass).click(function (){
				let allType = document.querySelectorAll(par.btnClass);
				let allDD = document.querySelectorAll(par.ddClass);

				let thisId = this.getAttribute(par.attr);
				let thisDDs = document.querySelectorAll(`${par.ddClass}[${par.attr}=${thisId}]`);

				//mob js
				//let downXl = window.matchMedia("(max-width: 1200px)").matches;
				let lvl1Parent = document.querySelector('.main-nav-cont-js');
				lvl1Parent.classList.add('hidden-mob');

				$('.back-mob-js').addClass('active');
				//

				let foundThisFlag;
				//flag we need to prevent double toggle ==> this.classList.toggle('active');
				//thisDDs there can be 2 or less items selected as thisDDs
				//if u neen more upgrage if condition inside  //for (let dd of allDD)
				for (let dd of allDD){
					if (dd === thisDDs[0] || dd === thisDDs[1]){

						if (!foundThisFlag){
							foundThisFlag = true;
							this.classList.toggle('active');
						}

						$(dd).slideToggle(function (){
							$(this).toggleClass('active');
						});
					}
					else{
						let currDDId = dd.getAttribute(par.attr);
						let currType = document.querySelector(`${par.btnClass}[${par.attr}=${currDDId}]`);

						currType.classList.remove('active');
						$(dd).slideUp(function (){
							$(this).removeClass('active');
						});
					}
				}

			});
		}
	}

	//go back mob
	$('.back-mob-js').click(function (){
		$(this).removeClass('active');

		$('.main-dd-js').slideUp(function (){
			$(this).removeClass('active');
		});

		let lvl1Parent = document.querySelector('.main-nav-cont-js');
		lvl1Parent.classList.remove('hidden-mob');

	});

	setGroupToggleByParameters([
		{
			attr: 'data-type',
			btnClass: '.t-type-js',
			ddClass: '.t-dd-item-js',
		},
		{
			attr: 'data-country',
			btnClass: '.c-country-js',
			ddClass: '.c-dd-item-js',
		},
		{
			attr: 'data-menu-id',
			btnClass: '.main-btn-js',
			ddClass: '.main-dd-js',
		},
	]);

	//end luckyone js

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }