const showContentTimeout= (selector)=>{
    const content=document.querySelector(selector);
    setTimeout(()=>{
      content.classList.remove("hide");
      content.classList.add("show");
    },1700);
  };
  export default showContentTimeout;