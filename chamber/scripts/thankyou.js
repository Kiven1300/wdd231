// Read URL parameters sent by the form (method="get") and display a summary
const params = new URLSearchParams(window.location.search);
const summaryList = document.querySelector('#summary-list');

const labelMap = {
  firstName: 'First Name',
  lastName: 'Last Name',
  orgTitle: 'Organizational Title',
  email: 'Email Address',
  phone: 'Phone Number',
  businessName: 'Business / Organization',
  membershipLevel: 'Membership Level',
  timestamp: 'Application Date',
};

const levelNames = {
  np: 'NP Membership (Non-Profit)',
  bronze: 'Bronze Membership',
  silver: 'Silver Membership',
  gold: 'Gold Membership',
};

if (summaryList && params.toString()) {
  Object.entries(labelMap).forEach(([key, label]) => {
    const value = params.get(key);
    if (!value) return;

    const dt = document.createElement('dt');
    const dd = document.createElement('dd');

    dt.textContent = label;

    if (key === 'membershipLevel') {
      dd.textContent = levelNames[value] ?? value;
    } else if (key === 'timestamp') {
      dd.textContent = new Date(value).toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
      });
    } else {
      dd.textContent = value;
    }

    summaryList.appendChild(dt);
    summaryList.appendChild(dd);
  });
} else if (summaryList) {
  // No params — user navigated here directly
  document.querySelector('#application-summary').style.display = 'none';
}
