const routeMap = (selector) => {
  const button = document.querySelector(selector);
  
  button.addEventListener("click", (e) => {
      const destination = "45.059945,38.987466"; // Координаты Офицерская 47, Краснодар
      
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const userLat = position.coords.latitude;
                  const userLon = position.coords.longitude;
                  
                  // Определяем, мобильное устройство или нет
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                  
                  if (isMobile && isIOS) {
                      // Для iOS сначала пробуем открыть Яндекс.Карты
                      try {
                          // Создаем скрытый iframe для попытки открытия приложения
                          const iframe = document.createElement('iframe');
                          iframe.style.display = 'none';
                          iframe.src = `yandexmaps://maps.yandex.ru/?rtext=${userLat},${userLon}~${destination}&rtt=auto`;
                          document.body.appendChild(iframe);
                          
                          // Удаляем iframe после попытки
                          setTimeout(() => {
                              document.body.removeChild(iframe);
                              // Открываем веб-версию в новой вкладке
                              window.open(`https://yandex.ru/maps/?rtext=${userLat},${userLon}~${destination}&rtt=auto`, "_blank");
                          }, 1500);
                      } catch (e) {
                          // В случае ошибки открываем веб-версию
                          window.open(`https://yandex.ru/maps/?rtext=${userLat},${userLon}~${destination}&rtt=auto`, "_blank");
                      }
                  } else {
                      // Для всех остальных устройств открываем веб-версию в новой вкладке
                      window.open(`https://yandex.ru/maps/?rtext=${userLat},${userLon}~${destination}&rtt=auto`, "_blank");
                  }
              },
              () => {
                  alert("Не удалось определить местоположение. Разрешите доступ к геолокации!");
              }
          );
      } else {
          alert("Ваш браузер не поддерживает геолокацию.");
      }
  });
};

export default routeMap;