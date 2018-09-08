// show the login modal
document.querySelectorAll('.login-button').forEach(btn => {
  btn.addEventListener('click', () => {
    $('.ui.modal').modal('show');
  });
});

// navigate to the dashboard when logged in
document.querySelector('#login-form').addEventListener('submit', e => {
  window.location.href = '/dashboard';
  e.preventDefault();
});
