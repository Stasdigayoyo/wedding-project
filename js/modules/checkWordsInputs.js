const checkWordsInputs = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^а-яё\s]/gi, '');
        });
    });
};

export default checkWordsInputs;