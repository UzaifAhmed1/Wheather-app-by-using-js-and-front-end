// Weather icons mapping
const weatherIcons = {
    'clear': '☀️',
    'sunny': '☀️',
    'partly cloudy': '⛅',
    'cloudy': '☁️',
    'overcast': '☁️',
    'rain': '🌧️',
    'drizzle': '🌦️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'fog': '🌫️',
    'mist': '🌫️',
    'haze': '🌫️'
};

// Sample weather data
const sampleWeatherData = {
    'new york': {
        city: 'New York, NY',
        temperature: 22,
        description: 'sunny',
        feelsLike: 25,
        rainChance: 10,
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        uvIndex: 5
    },
    'london': {
        city: 'London, UK',
        temperature: 18,
        description: 'cloudy',
        feelsLike: 16,
        rainChance: 75,
        humidity: 78,
        windSpeed: 8,
        pressure: 1008,
        visibility: 8,
        uvIndex: 3
    },
    'tokyo': {
        city: 'Tokyo, Japan',
        temperature: 28,
        description: 'partly cloudy',
        feelsLike: 31,
        rainChance: 35,
        humidity: 72,
        windSpeed: 15,
        pressure: 1011,
        visibility: 12,
        uvIndex: 7
    },
    'paris': {
        city: 'Paris, France',
        temperature: 20,
        description: 'rain',
        feelsLike: 18,
        rainChance: 90,
        humidity: 85,
        windSpeed: 10,
        pressure: 1005,
        visibility: 6,
        uvIndex: 2
    }
};

function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    for (const key in weatherIcons) {
        if (desc.includes(key)) {
            return weatherIcons[key];
        }
    }
    return '🌤️';
}

function updateCurrentWeather(data) {
    document.getElementById('locationName').textContent = data.city;
    document.getElementById('currentTemp').textContent = `${data.temperature}°`;
    document.getElementById('weatherDesc').textContent = data.description;
    document.getElementById('currentIcon').textContent = getWeatherIcon(data.description);
    document.getElementById('rainChance').textContent = data.rainChance;
    document.getElementById('feelsLike').textContent = `${data.feelsLike}°`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('uvIndex').textContent = data.uvIndex;
    document.getElementById('pressure').textContent = `${data.pressure} mb`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;

    updateHourlyForecast(data.temperature, data.rainChance);
    updateDailyForecast(data.temperature, data.rainChance);
}

function updateHourlyForecast(baseTemp, baseRain) {
    const hours = ['12 PM', '3 PM', '6 PM', '9 PM', '12 AM', '3 AM', '6 AM', '9 AM'];
    const icons = ['☀️', '⛅', '🌤️', '🌙', '🌙', '🌙', '🌅', '☀️'];
    const container = document.getElementById('hourlyForecast');
    
    container.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const temp = Math.round(baseTemp + (Math.random() * 8 - 4));
        const rain = Math.max(0, Math.min(100, baseRain + (Math.random() * 30 - 15)));
        
        const item = document.createElement('div');
        item.className = 'hourly-item';
        item.innerHTML = `
            <div class="hourly-time">${hours[i]}</div>
            <div class="hourly-icon">${icons[i]}</div>
            <div class="hourly-temp">${temp}°</div>
            <div class="hourly-rain">${Math.round(rain)}%</div>
        `;
        container.appendChild(item);
    }
}

function updateDailyForecast(baseTemp, baseRain) {
    const days = ['Today', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const descriptions = ['sunny', 'partly cloudy', 'rain', 'cloudy', 'sunny', 'thunderstorm', 'cloudy', 'partly cloudy', 'sunny', 'rain'];
    const container = document.getElementById('dailyForecast');
    
    container.innerHTML = '';
    
    for (let i = 0; i < 10; i++) {
        const high = Math.round(baseTemp + (Math.random() * 6 - 3));
        const low = Math.round(high - (Math.random() * 8 + 4));
        const rain = Math.max(0, Math.min(100, baseRain + (Math.random() * 40 - 20)));
        const desc = descriptions[i];
        
        const item = document.createElement('div');
        item.className = 'daily-item';
        item.innerHTML = `
            <div class="daily-day">${days[i]}</div>
            <div class="daily-icon">${getWeatherIcon(desc)}</div>
            <div class="daily-desc">${desc}</div>
            <div class="daily-rain">${Math.round(rain)}%</div>
            <div class="daily-temps">
                <span class="temp-high">${high}°</span>
                <span class="temp-low">${low}°</span>
            </div>
        `;
        container.appendChild(item);
    }
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('weatherCard').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showError(message) {
    document.getElementById('error').textContent = message;
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('weatherCard').classList.add('hidden');
    hideLoading();
}

function showWeatherCard() {
    document.getElementById('weatherCard').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    hideLoading();
}

function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim().toLowerCase();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    setTimeout(() => {
        const weatherData = sampleWeatherData[city];
        
        if (weatherData) {
            updateCurrentWeather(weatherData);
            showWeatherCard();
        } else {
            // Generate random data for unknown cities
            const randomData = {
                city: city.charAt(0).toUpperCase() + city.slice(1) + ', Unknown',
                temperature: Math.round(Math.random() * 30 + 5),
                description: ['sunny', 'cloudy', 'partly cloudy', 'rain'][Math.floor(Math.random() * 4)],
                feelsLike: Math.round(Math.random() * 30 + 5),
                rainChance: Math.round(Math.random() * 100),
                humidity: Math.round(Math.random() * 60 + 20),
                windSpeed: Math.round(Math.random() * 20),
                pressure: Math.round(Math.random() * 20 + 1000),
                visibility: Math.round(Math.random() * 10 + 2),
                uvIndex: Math.round(Math.random() * 10)
            };
            updateCurrentWeather(randomData);
            showWeatherCard();
        }
    }, 1000);
}

// Current location handler
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            position => {
                // For demo: just map lat/lon to a city
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                let city = 'new york';
                if (lat > 35 && lat < 60 && lon > -10 && lon < 40) city = 'london';
                if (lat > 30 && lat < 45 && lon > 130) city = 'tokyo';
                if (lat > 40 && lat < 50 && lon > 0 && lon < 10) city = 'paris';
                
                const weatherData = sampleWeatherData[city];
                if (weatherData) {
                    updateCurrentWeather(weatherData);
                    showWeatherCard();
                } else {
                    showError('Location not found in sample data');
                }
            },
            () => showError('Unable to get location')
        );
    } else {
        showError('Geolocation not supported by your browser');
    }
}

// Add event listener for Enter key in input
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});
