const observe = (selector)=>{

    const elements = document.querySelectorAll(selector);
    if(!elements) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          entry.target.classList.remove('hide');
        }
      });
    }, { threshold: 1 });
  
    if(elements.length===1){
      observer.observe(elements[0]);
    } else{
      elements.forEach(el => observer.observe(el));
    }
  };
  export default observe;