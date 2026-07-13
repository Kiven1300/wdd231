const membersContainer = document.querySelector('#members');
const membersUrl = 'data/members.json';
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

function getMembershipName(level) {
  if (level === 3) return 'Gold Member';
  if (level === 2) return 'Silver Member';
  return 'Member';
}

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('article');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('a');
    const membership = document.createElement('p');
    const description = document.createElement('p');

    name.textContent = member.name;

    image.src = `images/${member.image}`;
    image.alt = `${member.name} business`;
    image.loading = 'lazy';
    image.width = 300;
    image.height = 200;

    address.textContent = member.address;
    phone.textContent = member.phone;

    website.href = member.website;
    website.textContent = 'Visit website';
    website.target = '_blank';
    website.rel = 'noopener';
    website.classList.add('member-link');

    membership.textContent = getMembershipName(member.membershipLevel);
    description.textContent = member.description;

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);
    card.appendChild(description);

    membersContainer.appendChild(card);
  });
}

async function getMembers() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Unable to load chamber members:', error);
    membersContainer.textContent = 'The business directory is currently unavailable.';
  }
}

if (gridButton && listButton && membersContainer) {
  gridButton.addEventListener('click', () => {
    membersContainer.classList.add('member-grid');
    membersContainer.classList.remove('member-list');
    gridButton.setAttribute('aria-pressed', 'true');
    listButton.setAttribute('aria-pressed', 'false');
  });

  listButton.addEventListener('click', () => {
    membersContainer.classList.add('member-list');
    membersContainer.classList.remove('member-grid');
    listButton.setAttribute('aria-pressed', 'true');
    gridButton.setAttribute('aria-pressed', 'false');
  });

  getMembers();
}
