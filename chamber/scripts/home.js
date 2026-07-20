// ─── Weather ──────────────────────────────────────────────────────────────────

const apiKey = '2b6ec0c7ff6dee167dbdea53d8bb91fd';
const lat = '19.25';
const lon = '-99.10';

const currentWeatherUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastCards = document.querySelector('#forecast-cards');

async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error('Weather error:', error);
    if (currentTemp) currentTemp.textContent = 'Unavailable';
  }
}

function displayCurrentWeather(data) {
  if (currentTemp) {
    currentTemp.textContent = `${data.main.temp.toFixed(1)} °C`;
  }

  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;

  if (weatherIcon) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = description;
  }

  if (weatherDesc) {
    weatherDesc.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error('Forecast error:', error);
    if (forecastCards) forecastCards.textContent = 'Forecast unavailable.';
  }
}

function displayForecast(forecastList) {
  if (!forecastCards) return;
  forecastCards.innerHTML = '';

  const dailyForecasts = forecastList
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  dailyForecasts.forEach((day) => {
    const card = document.createElement('div');
    const date = document.createElement('h4');
    const icon = document.createElement('img');
    const desc = document.createElement('p');
    const temp = document.createElement('p');

    const forecastDate = new Date(day.dt_txt);
    const iconCode = day.weather[0].icon;
    const description = day.weather[0].description;

    date.textContent = forecastDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = description;
    icon.width = 60;
    icon.height = 60;

    desc.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);

    temp.textContent = `${day.main.temp.toFixed(1)} °C`;

    card.appendChild(date);
    card.appendChild(icon);
    card.appendChild(desc);
    card.appendChild(temp);

    forecastCards.appendChild(card);
  });
}

// ─── Business Spotlights ──────────────────────────────────────────────────────

const spotlightCards = document.querySelector('#spotlight-cards');
const membersUrl = 'data/members.json';

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    const qualifiedMembers = data.members.filter(
      (member) =>
        member.membershipLevel === 2 || member.membershipLevel === 3,
    );

    const randomMembers = qualifiedMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    displaySpotlights(randomMembers);
  } catch (error) {
    console.error('Spotlight error:', error);
    if (spotlightCards) {
      spotlightCards.textContent = 'Spotlights are currently unavailable.';
    }
  }
}

function displaySpotlights(members) {
  if (!spotlightCards) return;
  spotlightCards.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('article');
    const name = document.createElement('h3');
    const image = document.createElement('img');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const website = document.createElement('a');
    const level = document.createElement('p');

    name.textContent = member.name;

    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo or business image`;
    image.loading = 'lazy';
    image.width = 300;
    image.height = 200;

    phone.textContent = member.phone;
    address.textContent = member.address;

    website.href = member.website;
    website.textContent = 'Visit website';
    website.target = '_blank';
    website.rel = 'noopener';
    website.classList.add('member-link');

    level.textContent =
      member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
    level.classList.add('membership-badge');

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(website);
    card.appendChild(level);

    spotlightCards.appendChild(card);
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

getCurrentWeather();
getForecast();
getSpotlights();
