
const result = {
  SUCCESS: 'success',
  ERROR: 'error',
};

function setAlert(type, message) {
  const alertEl = document.querySelector('#alert');
  alertEl.style.display = !! message ? "block" : "none";
  alertEl.className = type;
  alertEl.innerHTML = message;

  if (type === result.SUCCESS) {
    const formEl = document.querySelector('#login-form');
    if (formEl) {
      formEl.style.display = "none";
    } else {
      console.error("could not find email element");
    }
  }
}

function doSignup() {
  setAlert();
  Userfront.signup({
    method: "passwordless",
    email: document.querySelector('#email')?.value,
  }).then((response) => {
    // Userfront does not send emails in test mode
    const url = response?.result?.url
    const message = Userfront.mode.value === "test" && url?
      `Test Mode: <a href=${url}>click here to login</a>` :  "Signup complete! Check your email.";
    setAlert(result.SUCCESS, message);
  }).catch(function(error) {
    setAlert('error', error.message);
  });
}

function doLogin() {
  Userfront.login({
    method: "passwordless",
    email: document.querySelector('#email')?.value,
  }).then((response) => {
    // Userfront does not send emails in test mode
    const url = response?.result?.url
    const message = Userfront.mode.value === "test" && url?
      `Test Mode: <a href=${url}>click here to login</a>` :  "Signup complete! Check your email.";
    setAlert(result.SUCCESS, message);
  }).catch(function(error) {
    setAlert('error', error.message);
  });
}

function onDocReady() {
  // If the URL contains token & uuid params, log in
  if (
    document.location.search.includes("token=") &&
    document.location.search.includes("uuid=")
  ) {
    Userfront.login({ method: "link" });
  }
}

if (document.readyState!='loading') {
  onDocReady()
} else {
  document.addEventListener('DOMContentLoaded', onDocReady);
}

