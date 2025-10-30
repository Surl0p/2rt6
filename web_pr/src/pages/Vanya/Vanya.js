const apiKey = 'your-api-key-here'; // Replace with your OpenWeatherMap API key
const card = document.querySelector('.card');
const searchBox = document.querySelector('.card_input');
const searchBtn = document.getElementById('searchBtn');
const temp = document.querySelector('.card_title--temp');
const city = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const icon = document.querySelector('.card_weather-icon');
const date = document.getElementById('date');

const showDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('en', { month: 'long' });
    date.innerHTML = `${day} ${monthName}`;
};

async function getWeather(cityName) {
    cityName = cityName.trim();
    if (!cityName) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');

        const result = await response.json();
        console.log(result);

        card.classList.add('active');
        card.style.height = '530px';

        icon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`; // @2x for optimized preview size

        city.innerHTML = result.name;
        humidity.innerHTML = `${result.main.humidity} %`;
        wind.innerHTML = `${result.wind.speed} m/s`;
        temp.innerHTML = `${Math.round(result.main.temp)}°C`;

    } catch (err) {
        alert(err.message);
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(searchBox.value);
    }
});

document.addEventListener('click', (e) => {
    if (card.classList.contains('active') && !card.contains(e.target)) {
        card.classList.remove('active');
        card.style.height = '230px';
        searchBox.value = '';
    }
});

showDate();