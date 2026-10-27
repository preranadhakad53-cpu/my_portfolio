console.log("JavaScript connected");
const themeButton = document.getElementById("themeToggle");

// Restore saved theme preference on page load
if (localStorage.getItem("portfolio_theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeButton) themeButton.textContent = "Switch to Light Mode";
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Switch to Light Mode";
            localStorage.setItem("portfolio_theme", "dark");
        } else {
            themeButton.textContent = "Switch to Dark Mode";
            localStorage.setItem("portfolio_theme", "light");
        }
    });
}
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
weatherButton.addEventListener("click", getWeather);
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    const apiKey = "2ea535f7e57c825cd5db090bb1cd8ea6";

    const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

        console.error(error);
    }
}