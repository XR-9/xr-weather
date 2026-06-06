const searchbtn = document.querySelector(".searchbox button");
const cityname = document.getElementById("search");
const errorbox = document.querySelector(".errorbox");
const loader = document.querySelector(".loaderbox");
const apiKey = "YOUR_API_KEY";
let isloader = false;
let CurrenttempC = null;
let CurrentFeelsLikeC = null;


// ── Search on click ──────────────────────────────────────
searchbtn.addEventListener("click", async function () {

    document.querySelector(".left-cont").style.display = "none"
    const city = cityname.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    hideError();
    toggleLoader();

    const data = await fetchData(city);
    console.log(data);

    toggleLoader();

    if (data.cod === "404") {
        showError("City not found. Please check the spelling.");
        return;                       
    }

    displayData(data);
});


// ── Enter key support ───────────────────────────────
cityname.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchbtn.click();
});


// ── Helpers ───────────────────────────────────────────────
function showError(msg) {
    errorbox.innerHTML = `<h2>${msg}</h2>`;
    errorbox.style.display = "flex";
    document.querySelector(".city span").textContent = "--"

}

function hideError() {
    errorbox.innerHTML = "";
    errorbox.style.display = "none";
}

function toggleLoader() {
    if (!isloader) {
        loader.style.display = "flex";
        isloader = true;
    } else {
        loader.style.display = "none";
        isloader = false;
    }
}

async function fetchData(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    return res.json();
}


// ── Display ───────────────────────────────────────────────
function displayData(data) {
    document.querySelector(".left-cont").style.display = "flex"
    const {
        clouds: { all },
        dt,
        timezone,
        main: { feels_like, humidity, pressure, temp },
        name,
        sys: { country  , sunrise , sunset},
        visibility,
        weather: [{ main: det, description, icon }],
        wind: { speed },
        rain: { "1h": rainLastHour = 0 } = {}
    } = data;


    // Time — city's local time using API timezone offset
    const cityMs = (dt + timezone) * 1000;
    const cityDate = new Date(cityMs);
    const h24 = cityDate.getUTCHours();
    const mins = cityDate.getUTCMinutes().toString().padStart(2, "0");
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 || 12;
    document.querySelector(".time").textContent = `${h12}:${mins} ${ampm}`;


    // City name in nav
    document.querySelector(".city span").textContent = `${name}, ${country}`;


    // Weather icon (glow resets on new load)
    const img = document.getElementById("tempimg");
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.style.filter = `drop-shadow(0 0 22px rgba(96,165,250,0.5))`;


    // Temperature
    CurrenttempC = Math.round(temp);


    // Weather detail + feels like pill
    document.querySelector(".wdetail").textContent = det;
    CurrentFeelsLikeC = `Feels like ${Math.round(feels_like)}°`;

    // Temp change function 
    let selectedUnit = document.querySelector(".cw-top select").value
    updatetemp(selectedUnit === "fahrenheit" ? "F" : "C");



    // Description bar 
    const cap = description.charAt(0).toUpperCase() + description.slice(1);
    document.querySelector(".cw-desc").textContent =
        `${cap}. The temperature is ${Math.round(temp)}°C with a feels-like of ${Math.round(feels_like)}°C.`;


    // Metrics
    document.querySelector(".wind-num").textContent = `${speed} m/s`;
    document.querySelector(".humidity-num").textContent = `${humidity}%`;
    document.querySelector(".rain-num").textContent = `${rainLastHour} mm`;    
    document.querySelector(".cloud-num").textContent = `${all}%`;
    document.querySelector(".vis-num").textContent = `${(visibility / 1000).toFixed(1)} km`; 
    document.querySelector(".pt-num").textContent = `${pressure} hPa`;

    // Sunrise
    const srDate = new Date(0);
    srDate.setUTCSeconds(sunrise + timezone);
    const srH = srDate.getUTCHours() % 12 || 12;
    const srM = srDate.getUTCMinutes().toString().padStart(2, "0");
    const srAmpm = srDate.getUTCHours() >= 12 ? "PM" : "AM";
    document.querySelector(".sunrise-time").textContent = `${srH}:${srM} ${srAmpm}`;

    // Sunset
    const ssDate = new Date(0);
    ssDate.setUTCSeconds(sunset + timezone);
    const ssH = ssDate.getUTCHours() % 12 || 12;
    const ssM = ssDate.getUTCMinutes().toString().padStart(2, "0");
    const ssAmpm = ssDate.getUTCHours() >= 12 ? "PM" : "AM";
    document.querySelector(".sunset-time").textContent = `${ssH}:${ssM} ${ssAmpm}`;
}


// ── Dark / Light toggle ───────────────────────────────────
const sunBtn  = document.querySelector(".nav-icons span:first-child");
const moonBtn = document.querySelector(".nav-icons span:last-child");

function setTheme(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark");
        moonBtn.classList.add("active");
        sunBtn.classList.remove("active");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        sunBtn.classList.add("active");
        moonBtn.classList.remove("active");
        localStorage.setItem("theme", "light");
    }
}

sunBtn.addEventListener("click",  () => setTheme("light"));
moonBtn.addEventListener("click", () => setTheme("dark"));

setTheme(localStorage.getItem("theme") || "light");





// temp degree change

function toF(c){
    return Math.round(c * 9 / 5 +32);

}
function updatetemp(unit){
    if(CurrenttempC === null){
        return;
    }

    const t = unit === "F" ? toF(CurrenttempC) : CurrenttempC
    const feelslike = unit === "F" ? toF(CurrentFeelsLikeC) : CurrentFeelsLikeC
    const sys = unit === "F" ? "°F" : "°C"

    document.querySelector(".temp-t").textContent = t;
    document.querySelector(".temp-s").textContent = sys;
    document.querySelector(".feellike").textContent = `feels like ${feelslike}`;



}


document.querySelector(".cw-top select").addEventListener("change" , function(){
    const unit = this.unit === "fahrenheit" ? "F" : "C"
    updatetemp(unit);
    searchbtn.click();
})