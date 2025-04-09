import '../css/style.css';
import '@babel/polyfill';
import timer from "./modules/timer";
import routeMap from "./modules/routeMap";
import showContentTimeout from "./modules/showContentTimeout";
import observe from "./modules/observer";
import timingAnimate from "./modules/timingAnimate";
import forms from "./modules/form";

window.addEventListener("DOMContentLoaded", ()=>{

  const deadline = "2025-09-13";
  showContentTimeout(".date");
  showContentTimeout(".guest");
  showContentTimeout(".end__timer");
  timer(".timer",deadline);
  routeMap(".buttonMap");
  observe('.names__title');
  observe(".calendar");
  observe(".location")
  observe(".title__wrapper");
  observe(".form__subtitle");
  observe("p");
  timingAnimate();
  forms("form");
})


