# 🌤️ XR Weather

A clean, glassmorphism weather dashboard built with vanilla HTML, CSS & JavaScript — powered by the OpenWeatherMap API.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=flat)

---


## ✨ Features

- 🔍 **City Search** — search any city worldwide, Enter key supported
- 🌡️ **Live Temperature** — Celsius & Fahrenheit toggle
- 🌅 **Sunrise & Sunset** — city's local time using API timezone offset
- 💧 Humidity · 💨 Wind Speed · 🌧️ Rain Volume · ☁️ Cloud Cover
- 👁️ Visibility · 🔵 Pressure
- 🌙 **Dark / Light mode** — saved in localStorage
- ⚠️ Error handling for invalid cities
- ⏳ Loading animation while fetching data
- 🎨 Animated glassmorphism UI with aurora background

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure & layout |
| CSS3 | Glassmorphism design, animations, dark mode |
| JavaScript (ES6+) | API calls, DOM manipulation, unit conversion |
| OpenWeatherMap API | Real-time weather data |
| Tabler Icons | UI icons |
| Google Fonts | Outfit + DM Sans typography |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/XR-9/xr-weather.git
cd xr-weather
```

### 2. Get a free API key

1. Go to [openweathermap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 3. Add your API key

Open `cweather.js` and replace the key on line 4:

```js
const apiKey = "YOUR_API_KEY_HERE";
```

### 4. Open in browser

Just open `cweather.html` directly in your browser — no server or build step needed.

---

## 📁 Project Structure

```
xr-weather/
│
├── cweather.html        # Main HTML file
├── cweather.css         # All styles (glassmorphism, dark mode, animations)
├── cweather.js          # Weather logic, API calls, unit conversion
└── README.md       # You are here
```

---

## 🔌 API Used

**[OpenWeatherMap — Current Weather Data](https://openweathermap.org/current)**

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
```

Data used from response: `temp`, `feels_like`, `humidity`, `pressure`, `visibility`,
`wind.speed`, `clouds.all`, `rain.1h`, `weather.icon`, `sys.sunrise`, `sys.sunset`, `timezone`

---

## 💡 What I Learned

- Fetching and destructuring real API data with `async/await`
- Converting Unix timestamps to local city time using timezone offsets
- CSS glassmorphism — `backdrop-filter: blur()`, `rgba()` layering
- Dark/light mode using CSS custom properties + `localStorage`
- Celsius ↔ Fahrenheit conversion and state management in JS
- Proper error handling (empty input, city not found, API errors)

---

## ⚠️ Note on API Key

This is a frontend-only project, so the API key is visible in the source code.
The OpenWeatherMap free tier key has rate limits (60 calls/min) which makes it low-risk.
For production apps, API keys should be kept on a backend server.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">Made with ☕ and too many late nights by <strong>HAPPY</strong></p>
