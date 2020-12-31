const $ = window.$;

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const usernameInput = $('input#username-input');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', event => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.email, userData.password);
    usernameInput.val('');
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser (username, email, password) {
    $.post('/api/signup', {
      username: username,
      email: email,
      password: password
    })
      .then((response) => {
        if (response.toLogin) {
          window.location.replace('/loginAfterSignup'); // should be a $.get
        } else {
          window.location.replace('/members');
        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr () {
    $('#alert .msg').text('Email or Username Already Exists! Please Enter a Different Email Address or Username!');
    $('#alert').fadeIn(500);
  }
});
