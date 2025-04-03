export default async function handler(req, res) {
    // CORS заголовки
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  
    // Обработка preflight запросов
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    // Для тестирования - просто возвращаем успех при GET запросе
    if (req.method === "GET") {
      return res.status(200).json({ 
        success: true, 
        message: "API работает!" 
      });
    }
  
    if (req.method !== "POST") {
      return res.status(405).json({ 
        success: false, 
        message: "Метод не разрешен" 
      });
    }
  
    try {
      const { surname, name, attendance, guest, drink, song } = req.body;
      
      console.log("Получены данные:", req.body);
      
      let text = `<b>Новая анкета:</b>\n`;
      text += `<b>Фамилия:</b> ${surname}\n`;
      text += `<b>Имя:</b> ${name}\n`;
      text += `<b>Присутствие:</b> ${attendance}\n`;
      text += `<b>Гость:</b> ${guest || "Не указано"}\n`;
      text += `<b>Алкоголь:</b> ${drink ? drink.join(", ") : "Не указано"}\n`;
      text += `<b>Песня:</b> ${song || "Не указано"}\n`;
  
      const TOKEN = process.env.TG_BOT_TOKEN;
      const CHAT_ID = process.env.TG_CHAT_ID;
      
      if (!TOKEN || !CHAT_ID) {
        console.error("Отсутствуют переменные окружения TG_BOT_TOKEN или TG_CHAT_ID");
        return res.status(500).json({ 
          success: false, 
          message: "Ошибка конфигурации сервера" 
        });
      }
      
      const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
      
      console.log("Отправка в Telegram...");
      
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "HTML" })
      });
      
      const data = await response.json();
      console.log("Ответ от Telegram:", data);
      
      if (!data.ok) {
        throw new Error(`Telegram API error: ${data.description}`);
      }
      
      return res.status(200).json({ 
        success: true, 
        message: "Форма отправлена!" 
      });
    } catch (error) {
      console.error("Ошибка:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Ошибка отправки", 
        error: error.message 
      });
    }
  }