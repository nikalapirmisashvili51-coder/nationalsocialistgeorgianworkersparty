(function () {
  // Current year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Form validation
  var form = document.getElementById('contact-form');
  if (!form) return;

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');

  var nameError = document.getElementById('name-error');
  var emailError = document.getElementById('email-error');
  var messageError = document.getElementById('message-error');
  var successEl = document.getElementById('form-success');

  function setError(el, errorEl, message) {
    if (message) {
      errorEl.textContent = message;
      el.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      el.removeAttribute('aria-invalid');
    }
  }

  function validateName() {
    var value = (nameInput.value || '').trim();
    if (value.length < 2) {
      setError(nameInput, nameError, 'Please enter at least 2 characters.');
      return false;
    }
    setError(nameInput, nameError, '');
    return true;
  }

  function validateEmail() {
    var value = (emailInput.value || '').trim();
    // Basic RFC5322-inspired pattern for demo purposes
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(value)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }
    setError(emailInput, emailError, '');
    return true;
  }

  function validateMessage() {
    var value = (messageInput.value || '').trim();
    if (value.length < 10) {
      setError(messageInput, messageError, 'Message should be at least 10 characters.');
      return false;
    }
    setError(messageInput, messageError, '');
    return true;
  }

  function validateAll() {
    var a = validateName();
    var b = validateEmail();
    var c = validateMessage();
    return a && b && c;
  }

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateAll()) {
      if (successEl) {
        successEl.hidden = false;
      }
      // Reset fields to demonstrate no backend submission
      form.reset();
      // Move focus to status for screen readers
      if (successEl) {
        successEl.focus({ preventScroll: false });
      }
    }
  });
})();



