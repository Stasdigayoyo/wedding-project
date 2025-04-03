const postData = async (url, data) => {
    try {
        console.log("Отправка запроса на:", url);
        console.log("Данные:", data);
        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        
        console.log("Получен ответ со статусом:", res.status);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка ответа:", errorText);
            throw new Error(`Ошибка ${res.status}: ${errorText}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error("Ошибка в postData:", error);
        throw error;
    }
};

export { postData };