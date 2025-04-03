const timer = (id, deadline)=>{


    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());
    
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 24);
      seconds = Math.floor((t / 1000) % 24);
      return {
        total: t,
        days,
        hours,
        minutes,
        seconds,
      };
    }
    function zeroNum(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
    
    function getClock(selector, endtime) {
      const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = zeroNum(t.days);
        hours.innerHTML = zeroNum(t.hours);
        minutes.innerHTML = zeroNum(t.minutes);
        seconds.innerHTML = zeroNum(t.seconds);
    
        if (t.total <= 0) {
          clearInterval(timeInterval);
          document.querySelectorAll(".timer__block").forEach((item) => {
            item.style.display = "none";
          });
          const elem = document.createElement("div");
          elem.classList.add("subtitle");
          elem.innerHTML = "СВАДЬБА НАЧАЛАСЬ!";
          timer.append(elem);
        }
      }
    }
    getClock(id, deadline);
    }
    export default timer;