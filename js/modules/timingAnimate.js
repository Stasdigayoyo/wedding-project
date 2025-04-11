const timingAnimate= ()=>{
    function timingAnimateLeft(element){
        element.animate(
          [
            {transform: "translateY(175%)", opacity: 0},
            {transform: "translateY(0)", opacity: 1, offset: 0.9 },
          ],
          {
            duration: 1800,
           easing: "cubic-bezier(0.33, 1, 0.68, 1)",
            fill: "forwards",

           }
            );
        }
            function observeAndAnimate(selector) {
              const elements = document.querySelectorAll(selector);
              const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    timingAnimateLeft(entry.target);
                    entry.target.classList.remove('hide');
                    obs.unobserve(entry.target); // Отключаем наблюдение после анимации
                  }
                });
              }, { threshold: 1}); 
            
              elements.forEach(el => observer.observe(el));
            }

observeAndAnimate(".timing__wrapper");

}

export default timingAnimate;