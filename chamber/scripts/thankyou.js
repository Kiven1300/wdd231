const params = new URLSearchParams(window.location.search);

document.querySelector('#display-first-name').textContent =
  params.get('first-name') || 'Not provided';

document.querySelector('#display-last-name').textContent =
  params.get('last-name') || 'Not provided';

document.querySelector('#display-email').textContent =
  params.get('email') || 'Not provided';

document.querySelector('#display-phone').textContent =
  params.get('phone') || 'Not provided';

document.querySelector('#display-organization').textContent =
  params.get('organization') || 'Not provided';

const timestamp = params.get('timestamp');

document.querySelector('#display-timestamp').textContent =
  timestamp ? new Date(timestamp).toLocaleString() : 'Not provided';
