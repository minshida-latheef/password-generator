// DOM Elements
const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const strengthText = document.getElementById('strength-text');
const generateBtn = document.getElementById('generate-btn');

// Character Pools
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~}{[]:;?><,./-=';

// Update length display when slider moves
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Generate password event
generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    let allowedChars = '';
    let password = '';
    const length = parseInt(lengthSlider.value);

    // Build character pool based on settings
    if (uppercaseCheck.checked) allowedChars += uppercaseChars;
    if (lowercaseCheck.checked) allowedChars += lowercaseChars;
    if (numbersCheck.checked) allowedChars += numberChars;
    if (symbolsCheck.checked) allowedChars += symbolChars;

    // Validation: check if at least one checkbox is selected
    if (allowedChars === '') {
        passwordDisplay.value = '';
        passwordDisplay.placeholder = 'Select at least 1 option!';
        updateStrength(0, 0);
        return;
    }

    // Generate random string
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    // Display password and update strength
    passwordDisplay.value = password;
    evaluateStrength(password, length);
    
    // Reset copy button text if it was changed
    copyBtn.textContent = 'Copy';
}

// Evaluate visual strength indicator
function evaluateStrength(password, length) {
    let typesCount = 0;
    if (uppercaseCheck.checked) typesCount++;
    if (lowercaseCheck.checked) typesCount++;
    if (numbersCheck.checked) typesCount++;
    if (symbolsCheck.checked) typesCount++;

    updateStrength(length, typesCount);
}

function updateStrength(length, typesCount) {
    // Basic ruleset for password strength mapping
    if (length === 0 || typesCount === 0) {
        strengthText.textContent = '';
        return;
    }

    if (length >= 12 && typesCount >= 3) {
        strengthText.textContent = 'Strong';
        strengthText.className = 'strength-strong';
    } else if (length >= 8 && typesCount >= 2) {
        strengthText.textContent = 'Medium';
        strengthText.className = 'strength-medium';
    } else {
        strengthText.textContent = 'Weak';
        strengthText.className = 'strength-weak';
    }
}

// Clipboard feature
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        copyBtn.textContent = 'Copied!';
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
