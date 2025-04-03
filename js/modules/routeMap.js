const routeMap=(selector)=>{
    const button = document.querySelector(selector);
    button.addEventListener("click", (e) => {
      const destination = "45.059945, 38.987466"; // Координаты Офицерская 47, Краснодар
        console.log(e.target);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const url = `https://yandex.ru/maps/?rtext=${userLat},${userLon}~${destination}&rtt=auto`;
            window.open(url, "_blank");
          },
          () => {
            alert(
              "Не удалось определить местоположение. Разрешите доступ к геолокации!"
            );
          }
        );
      } else {
        alert("Ваш браузер не поддерживает геолокацию.");
      }
    });
    };
    export default routeMap;