// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const cityButtons = document.querySelectorAll('.city-btn');

// API Configuration
const API_KEY = 'demo'; // Demo mode - shows mock data
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Mock weather data for demo
const mockWeatherData = {
    'London': {
        name: 'London',
        main: { temp: 15, humidity: 72 },
        weather: [{ main: 'Clouds', description: 'overcast clouds' }],
        wind: { speed: 3.5 },
        main: { pressure: 1013 }
    },
    'New York': {
        name: 'New York',
        main: { temp: 22, humidity: 65 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 2.8 },
        main: { pressure: 1015 }
    },
    'Tokyo': {
        name: 'Tokyo',
        main: { temp: 28, humidity: 68 },
        weather: [{ main: 'Rainy', description: 'light rain' }],
        wind: { speed: 4.2 },
        main: { pressure: 1010 }
    },
    'Dubai': {
        name: 'Dubai',
        main: { temp: 38, humidity: 45 },
        weather: [{ main: 'Clear', description: 'sunny' }],
        wind: { speed: 2.5 },
        main: { pressure: 1008 }
    },
    'Paris': {
        name: 'Paris',
        main: { temp: 18, humidity: 70 },
        weather: [{ main: 'Clouds', description: 'partly cloudy' }],
        wind: { speed: 3.2 },
        main: { pressure: 1012 }
    }
};

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const city = button.getAttribute('data-city');
        fetchWeather(city);
    });
});

// Search weather function
function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    } else {
        alert('Please enter a city name');
    }
}

// Fetch weather data (using mock data for demo)
async function fetchWeather(city) {
    const weatherCard = document.querySelector('.weather-card');
    
    try {
        // Show loading state
        weatherCard.classList.add('loading');
        weatherCard.classList.remove('error');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Try to get mock data, otherwise generate random data
        const weatherData = mockWeatherData[city] || generateRandomWeather(city);

        if (!weatherData) {
            throw new Error('City not found');
        }

        displayWeather(weatherData);
        weatherCard.classList.remove('loading');
    } catch (error) {
        displayError(error.message);
    }
}

// Generate random weather data for demo cities
function generateRandomWeather(city) {
    return {
        name: city,
        main: {
            temp: Math.floor(Math.random() * 35) + 5,
            humidity: Math.floor(Math.random() * 40) + 40
        },
        weather: [{
            main: ['Clear', 'Clouds', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
            description: ['clear sky', 'few clouds', 'rainy', 'sunny'][Math.floor(Math.random() * 4)]
        }],
        wind: {
            speed: (Math.random() * 5 + 1).toFixed(1)
        },
        main: {
            pressure: Math.floor(Math.random() * 50) + 1000
        }
    };
}

// Display weather data
function displayWeather(data) {
    const weatherCard = document.querySelector('.weather-card');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;

    weatherCard.innerHTML = `
        <div class="city-name">${data.name}</div>
        <div class="temperature">${temp}°C</div>
        <div class="weather-description">${description}</div>
        <div class="weather-details">
            <div class="detail">
                <span class="label">Humidity</span>
                <span class="value">${humidity}%</span>
            </div>
            <div class="detail">
                <span class="label">Wind Speed</span>
                <span class="value">${windSpeed} m/s</span>
            </div>
            <div class="detail">
                <span class="label">Pressure</span>
                <span class="value">${pressure} hPa</span>
            </div>
        </div>
    `;
}

// Display error message
function displayError(message) {
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.remove('loading');
    weatherCard.classList.add('error');
    weatherCard.innerHTML = `
        <div class="city-name">Error</div>
        <div class="weather-description">${message}</div>
    `;
}

// Initialize with first city on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});
