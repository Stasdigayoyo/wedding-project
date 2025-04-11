import {postData} from "../services/services";
import checkWordsInputs from "./checkWordsInputs";

const forms = (formSelector) => {
    const form = document.querySelector(formSelector);
    
    checkWordsInputs("input[name='surname']");
    checkWordsInputs("input[name='name']");
    checkWordsInputs("input[name='guest']");
    
    const message = {
        loading: "icons/spinner.svg",
        success: "Анкета успешно отправлена",
        failure: "Что-то пошло не так...Попробуйте перезагрузить страницу"
    };
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const attendance = form.querySelector("input[name='attendance']:checked");
        if (!attendance) {
            alert("Выберите присутствие (Да или Нет)");
            return;
        }
        
        const statusMessage = document.createElement("img");
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement("afterend", statusMessage);
        
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        // Проверяем, есть ли поле "drink" (если чекбоксы выбраны)
        if (formData.has("drink")) {
            formObject.drink = formData.getAll("drink"); // Записываем массив всех выбранных значений
        }
        
        const json = JSON.stringify(formObject);
        
        postData("https://wedding-backend-vert.vercel.app/api/send.js", json)
            .then((data) => {
                console.log(data);
                showModal(message.success);
                statusMessage.remove();
            })
            .catch((e) => {
                console.log(e.message);
                showModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
    });
    
    function showModal(message) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal__content">
                <div><img class="dex" src="img/Dex.png" alt="Dex" /></div>
                <div class="modal__title">${message}</div>
            </div>`;
        document.body.append(modal);
        setTimeout(() => {
            modal.remove();
        }, 4000);
    }
};

export default forms;