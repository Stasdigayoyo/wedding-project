const timingAnimate= ()=>{
    function timingAnimateLeft(element){
        element.animate(
          [
            {transform: "translateX(-100%)", opacity: 0},
            {transform: "translateX(5px)", opacity: 1, offset: 0.9 },
            {transform: "translateX(0)"}
          ],
          {
            duration: 4800,
            easing: "cubic-bezier(0.25, 1.6, 0.5, 1)",
            fill: "forwards" 
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
              }, { threshold: 1 }); 
            
              elements.forEach(el => observer.observe(el));
            }

observeAndAnimate(".timing__wrapper");

}

export default timingAnimate;