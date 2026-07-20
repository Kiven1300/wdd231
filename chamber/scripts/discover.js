// Show a visit-count message using localStorage
const visitMessage = document.querySelector('#visit-message');

if (visitMessage) {
  const visits = Number(localStorage.getItem('discoverVisits') ?? 0) + 1;
  localStorage.setItem('discoverVisits', visits);

  if (visits === 1) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
  } else if (visits === 2) {
    visitMessage.textContent = 'Welcome back! It has been a while — glad you returned.';
  } else {
    visitMessage.textContent = `You have visited this page ${visits} times. Thank you for your continued interest!`;
  }
}
