const checkWordsInputs = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^\p{L}\s]/gu, '');
        });
    });
};

export default checkWordsInputs;