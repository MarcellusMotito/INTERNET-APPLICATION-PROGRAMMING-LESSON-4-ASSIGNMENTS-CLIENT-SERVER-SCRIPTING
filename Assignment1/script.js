document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const lengthReq = document.getElementById('lengthReq');
    const uppercaseReq = document.getElementById('uppercaseReq');
    const numberReq = document.getElementById('numberReq');

    // Initially disable all except name input
    emailInput.disabled = true;
    passwordInput.disabled = true;
    confirmPasswordInput.disabled = true;
    submitBtn.disabled = true;

    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            nameError.textContent = 'Name is required.';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Email is required.';
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Invalid email format.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        let valid = true;

        // Check length
        if (password.length >= 8) {
            lengthReq.classList.add('valid');
        } else {
            lengthReq.classList.remove('valid');
            valid = false;
        }

        // Check uppercase
        if (/[A-Z]/.test(password)) {
            uppercaseReq.classList.add('valid');
        } else {
            uppercaseReq.classList.remove('valid');
            valid = false;
        }

        // Check number
        if (/[0-9]/.test(password)) {
            numberReq.classList.add('valid');
        } else {
            numberReq.classList.remove('valid');
            valid = false;
        }

        if (password === '') {
            passwordError.textContent = 'Password is required.';
            valid = false;
        } else if (!valid) {
            passwordError.textContent = 'Password does not meet all requirements.';
        } else {
            passwordError.textContent = '';
        }

        return valid;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword === '') {
            confirmPasswordError.textContent = 'Confirm Password is required.';
            return false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Password and Confirm Password do not match.';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            return true;
        }
    }

    nameInput.addEventListener('input', function () {
        if (validateName()) {
            emailInput.disabled = false;
        } else {
            emailInput.disabled = true;
            passwordInput.disabled = true;
            confirmPasswordInput.disabled = true;
            submitBtn.disabled = true;
        }
    });

    emailInput.addEventListener('input', function () {
        if (validateEmail()) {
            passwordInput.disabled = false;
        } else {
            passwordInput.disabled = true;
            confirmPasswordInput.disabled = true;
            submitBtn.disabled = true;
        }
    });

    passwordInput.addEventListener('input', function () {
        if (validatePassword()) {
            confirmPasswordInput.disabled = false;
        } else {
            confirmPasswordInput.disabled = true;
            submitBtn.disabled = true;
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        if (validateConfirmPassword()) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            alert('Registration successful!');
            form.reset();
            emailInput.disabled = true;
            passwordInput.disabled = true;
            confirmPasswordInput.disabled = true;
            submitBtn.disabled = true;

            // Reset password requirements UI
            lengthReq.classList.remove('valid');
            uppercaseReq.classList.remove('valid');
            numberReq.classList.remove('valid');
        }
    });
});
