import $ from 'jquery';

import 'select2';
// import 'slick-slider/slick/slick.min.js';
import Swiper from 'swiper/swiper-bundle.esm.browser.min.js';
// import Inputmask from "inputmask";
import { Fancybox } from "@fancyapps/ui";
// window.Fancybox = $.Fancybox;

import Cookies from 'js-cookie';
import noUiSlider from 'nouislider';

window.Swiper = Swiper;
window.Fancybox = Fancybox;
window.Cookies = Cookies;

export {$, Fancybox, Swiper, Cookies, noUiSlider};