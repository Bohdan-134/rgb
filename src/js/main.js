import { animateDigits } from './modules/animation.js';
import { iti } from './modules/iti.js';

// animation counter
document.addEventListener('DOMContentLoaded', function() {
    animateDigits('.datatime-text__date', 28, 2500);
    animateDigits('.datatime-text__time', 3.5, 1500);
});



// send form
const form = document.getElementById('registrationForm');
const name = document.getElementById("nameInput");
const email = document.getElementById("emailInput");
const submitBtn = document.getElementById('btnSendMessage');

const publicKey = 'NV-xCivxFoWd-Yd9Y';
const serviceID = 'service_1ofas5d';
const templateID = 'template_oz8qpmq';

emailjs.init(publicKey);

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!isValidName(name.value)) {
        showError("Пожалуйста, введите правильное имя и фамилию.");
        return;
    }

    if (!isValidEmail(email.value)) {
        showError("Пожалуйста, введите правильный адрес электронной почты.");
        return;
    }

    if (!isValidPhoneNumber(iti.getNumber())) {
        showError("Пожалуйста, введите правильный номер телефона. (макс. 9 цифр)");
        return;
    }

    submitBtn.innerText = 'Подождите минутку...';
    const inputFields = {
        name: name.value,
        phone: iti.getNumber(),
        email: email.value,
    }

    emailjs.send(serviceID, templateID, inputFields)
        .then(() => {
            submitBtn.innerText = 'Отправлено)';
            submitBtn.disabled = true;
            submitBtn.classList.add('disabled');
            form.reset();
        }, (error) => {
            console.log(error);
        });
});

function isValidName(name) {
    return name.trim() !== '';
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {

    if (isNaN(phoneNumber)) {
        return false;
    }

    return phoneNumber.length === 13;
}

function showError(errorMessage) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = errorMessage;

    const errorContainer = document.querySelector(".err");
    errorContainer.innerHTML = '';
    errorContainer.appendChild(errorElement);

    setTimeout(function() {
        errorContainer.innerHTML = '';
    }, 3000);
}

// animation send btn
const wrapper = document.getElementById('wrapper');
const btnSendMessage = document.getElementById('btnSendMessage');

btnSendMessage.addEventListener('mouseenter', () => wrapper.classList.add('hover-btn'));
btnSendMessage.addEventListener('mouseleave', () => wrapper.classList.remove('hover-btn'));

// animation input print
function createLetterDiv(character) {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    letterDiv.textContent = character;
    letterDiv.style.top = getRandomValue(5, 95) + '%';
    letterDiv.style.left = getRandomValue(5, 95) + '%';
    document.querySelector('.main').appendChild(letterDiv);
    setTimeout(() => {
        letterDiv.remove();
    }, 1000);
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleInputChange(event) {
    const input = event.target;
    const character = input.value.charAt(input.value.length - 1);
    createLetterDiv(character);
}

const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

nameInput.addEventListener('input', handleInputChange);
phoneInput.addEventListener('input', handleInputChange);
emailInput.addEventListener('input', handleInputChange);

//modal
const modalWrapper = document.getElementById('#modal-wrapper');
const btnOpenModal = document.getElementById('open-rules');
const containerModal = document.querySelector('#modal-wrapper .container');

btnOpenModal.addEventListener('mouseenter', () => wrapper.classList.add('hover-btn-rules'));
btnOpenModal.addEventListener('mouseleave', () => wrapper.classList.remove('hover-btn-rules'));

btnOpenModal.addEventListener('click', () => {
    wrapper.classList.add('hover-btn-open');

    const removeClassOnOutsideClick = (event) => {
        if (!containerModal.contains(event.target)) {
            wrapper.classList.remove('hover-btn-open');
            document.removeEventListener('click', removeClassOnOutsideClick);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', removeClassOnOutsideClick);
    }, 500);
});