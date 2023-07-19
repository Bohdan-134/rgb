import { animateDigits } from './modules/animation.js';
import { iti } from './modules/iti.js';

document.addEventListener('DOMContentLoaded', function() {
    animateDigits('.datatime-text__date', 28, 2500);
    animateDigits('.datatime-text__time', 3.5, 1500);
});

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const phoneNumber = iti.getNumber();

    console.log("Имя и фамилия:", name);
    console.log("Email:", email);
    console.log("Номер телефона:", phoneNumber);
});

const wrapper = document.getElementById('wrapper');
const btnSendMessage = document.getElementById('btnSendMessage');

btnSendMessage.addEventListener('mouseenter', () => wrapper.classList.add('hover-btn'));
btnSendMessage.addEventListener('mouseleave', () => wrapper.classList.remove('hover-btn'));


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