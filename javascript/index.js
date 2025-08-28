const el = {
    length: document.getElementById('length'),
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    numbers: document.getElementById('numbers'),
    special: document.getElementById('special'),
    password: document.getElementById('password'),
    passwordWindow: document.getElementById('passwordWindow'),
    copyButton: document.getElementById('copyButton')
};

const CHARS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

function generatePassword() {
    const length = parseInt(el.length.value, 10);

    if (!length || length <= 0 || length > 200) {
        alert("Введите длину от 1 до 200 символов");
        el.length.focus();
        return;
    }

    let charset = "";
    if (el.lowercase.checked) charset += CHARS.lowercase;
    if (el.uppercase.checked) charset += CHARS.uppercase;
    if (el.numbers.checked) charset += CHARS.numbers;
    if (el.special.checked) charset += CHARS.special;

    if (charset.length === 0) {
        alert("Выберите хотя бы один тип символов.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    el.password.textContent = password;
    el.passwordWindow.style.display = 'flex';
}

function copyPassword() {
    const passwordText = el.password.textContent;

    if (passwordText) {
        navigator.clipboard.writeText(passwordText)
            .then(() => {
                el.copyButton.textContent = 'Скопировано!';
                setTimeout(() => {
                    el.copyButton.textContent = 'Копировать';
                }, 1000);
            })
            .catch(err => {
                console.error('Ошибка копирования: ', err);
            });
    }
}

function validateLength(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    
    const maxLength = 200;
    if (input.value > maxLength) {
        input.value = maxLength;
    }
    
    if (input.value === '0') {
        input.value = '';
    }
}
