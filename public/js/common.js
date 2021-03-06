"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
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
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = '02-970.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} //when resize


	var headerBtns = document.querySelector('.headder-btns-js');
	var topHeader = document.querySelector("header");

	function whenResize() {
		var topH = topHeader.offsetHeight;

		if ($(window).scrollTop() > topH) {
			headerBtns.classList.add('fixed');
		} else {
			headerBtns.classList.remove('fixed');
		}
	}

	if (headerBtns && topHeader) {
		window.addEventListener('scroll', whenResize, {
			passive: true
		});
		window.addEventListener('resize', whenResize, {
			passive: true
		});
		whenResize();
	} //end when resize


	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window
	//luckyone js
	//creates group of toggle els with only 1 atcive by parent element

	function makeDDGroup(qSelecorts) {
		var _iterator = _createForOfIteratorHelper(qSelecorts),
				_step;

		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var parentSelect = _step.value;
				var parent = document.querySelector(parentSelect);

				if (parent) {
					(function () {
						// childHeads, kind of funny))
						var ChildHeads = parent.querySelectorAll('.dd-head-js');
						$(ChildHeads).click(function () {
							var clickedHead = this;
							$(ChildHeads).each(function () {
								if (this === clickedHead) {
									$(this.parentElement).toggleClass('active');
									$(this.parentElement).find('.dd-content-js').slideToggle(function () {
										$(this).toggleClass('active');
									});
								} else {
									$(this.parentElement).removeClass('active');
									$(this.parentElement).find('.dd-content-js').slideUp(function () {
										$(this).removeClass('active');
									});
								}
							});
						});
					})();
				}
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	}

	makeDDGroup(['.dd-menu-js', '.dd-foot-js', '.dd-price-js']); //slider in tab

	var AllSliders = document.querySelectorAll('.galery-slider-js');

	var _iterator2 = _createForOfIteratorHelper(AllSliders),
			_step2;

	try {
		for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
			var parent = _step2.value;

			var _galerySlider = new Swiper(parent, {
				loop: true,
				slidesPerView: 'auto',
				breakpoints: {
					0: {
						spaceBetween: 0
					},
					480: {
						spaceBetween: 18
					},
					970: {
						spaceBetween: 5
					}
				},
				//lazy load
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 5
				},
				//nav
				navigation: {
					nextEl: $(parent).closest('.galerySlider--js').find('.galery-next--js'),
					prevEl: $(parent).closest('.galerySlider--js').find('.galery-prev--js')
				}
			});
		}
	} catch (err) {
		_iterator2.e(err);
	} finally {
		_iterator2.f();
	}

	var activeTabIndex = $('.sContent .tabs__content.active').index();
	$('.sContent .tabs__btn').click(function () {
		if (this.classList.contains('active')) return;
		activeTabIndex = $(this).index();
		var thisSwiper = AllSliders[activeTabIndex];
		window.setTimeout(function () {
			thisSwiper.swiper.update();
		}, 50);
	}); //menu js
	//this

	$('.this-btn-js').click(function () {
		$('.ppMenu-this-js').fadeIn();
	});
	$('.ppMenu-this-js .close-btn-js').click(function () {
		$('.ppMenu-this-js').fadeOut();
	}); //glob

	$('.menu-btn-js').click(function () {
		$('.ppMenu-glob-js').fadeIn();
		$('body').addClass('fixed2');
	});
	$('.ppMenu-glob-js .close-btn-js').click(function () {
		$('.ppMenu-glob-js').fadeOut();
		$('body').removeClass('fixed2');
	}); //where to go

	function setGroupToggleByParameters(parameters) {
		var _iterator3 = _createForOfIteratorHelper(parameters),
				_step3;

		try {
			var _loop = function _loop() {
				var par = _step3.value;
				$(par.btnClass).click(function () {
					var allType = document.querySelectorAll(par.btnClass);
					var allDD = document.querySelectorAll(par.ddClass);
					var thisId = this.getAttribute(par.attr);
					var thisDDs = document.querySelectorAll("".concat(par.ddClass, "[").concat(par.attr, "=").concat(thisId, "]")); //mob js

					var lvl1Parent = document.querySelector('.main-nav-cont-js');
					lvl1Parent.classList.add('hidden-mob');
					$('.back-mob-js').addClass('active'); //

					var foundThisFlag; //flag we need to prevent double toggle ==> this.classList.toggle('active');
					//thisDDs there can be 2 or less items selected as thisDDs
					//if u neen more upgrage if condition inside  //for (let dd of allDD)

					var _iterator4 = _createForOfIteratorHelper(allDD),
							_step4;

					try {
						for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
							var dd = _step4.value;

							if (dd === thisDDs[0] || dd === thisDDs[1]) {
								if (!foundThisFlag) {
									foundThisFlag = true;
									this.classList.toggle('active');
								}

								$(dd).slideToggle(function () {
									$(this).toggleClass('active');
								});
							} else {
								var currDDId = dd.getAttribute(par.attr);
								var currType = document.querySelector("".concat(par.btnClass, "[").concat(par.attr, "=").concat(currDDId, "]"));
								currType.classList.remove('active');
								$(dd).slideUp(function () {
									$(this).removeClass('active');
								});
							}
						}
					} catch (err) {
						_iterator4.e(err);
					} finally {
						_iterator4.f();
					}
				});
			};

			for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
				_loop();
			}
		} catch (err) {
			_iterator3.e(err);
		} finally {
			_iterator3.f();
		}
	}

	function fixMenu() {
		var downXl = window.matchMedia("(max-width: 1200px)").matches;

		if (downXl) {
			$('.main-btn-js').removeClass('active');
			$('.main-dd-js').removeClass('active');
		}
	}

	window.addEventListener('resize', fixMenu, {
		passive: true
	});
	fixMenu(); //go back mob

	$('.back-mob-js').click(function () {
		$(this).removeClass('active');
		$('.main-dd-js').slideUp(function () {
			$(this).removeClass('active');
		});
		var lvl1Parent = document.querySelector('.main-nav-cont-js');
		lvl1Parent.classList.remove('hidden-mob');
	});
	setGroupToggleByParameters([{
		attr: 'data-type',
		btnClass: '.t-type-js',
		ddClass: '.t-dd-item-js'
	}, {
		attr: 'data-country',
		btnClass: '.c-country-js',
		ddClass: '.c-dd-item-js'
	}, {
		attr: 'data-menu-id',
		btnClass: '.main-btn-js',
		ddClass: '.main-dd-js'
	}]); //

	var galerySlider = new Swiper('.baner-slider-js', {
		loop: true,
		slidesPerView: 'auto',
		//lazy load
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3
		},
		//nav
		navigation: {
			nextEl: $(this).find('.slider-next--js'),
			prevEl: $(this).find('.slider-prev--js')
		}
	}); //end luckyone js
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }