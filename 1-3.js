const weatherData = [];

// Add City Weather
const addCityWeather = (cityName, temperature, condition) => {
  weatherData.push({ cityName, temperature, condition });
};

const findHottestCity = () => {
  const hottestCity = weatherData.reduce((max, city) => (city.temperature > max.temperature ? city : max), weatherData[0]);
  return hottestCity;
};

const filterByCondition = (condition) => {
  return weatherData.filter((city) => city.condition.toLowerCase() === condition.toLowerCase());
};

const weatherSummary = () => {
  return weatherData.map((city) => `City: ${city.cityName}, Temp: ${city.temperature}°C, Condition: ${city.condition}`);
};

document.getElementById("weatherForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = document.getElementById("cityName").value;
  const temperature = parseFloat(document.getElementById("temperature").value);
  const condition = document.getElementById("condition").value;
  addCityWeather(cityName, temperature, condition);
  displayWeather();
});

document.getElementById("hottestCityBtn").addEventListener("click", () => {
  const hottestCity = findHottestCity();
  if (hottestCity) {
    alert(`Hottest City: ${hottestCity.cityName}, Temp: ${hottestCity.temperature}°C`);
  } else {
    alert("No data available.");
  }
});

document.getElementById("filterConditionBtn").addEventListener("click", () => {
  const condition = document.getElementById("conditionFilter").value;
  const filteredCities = filterByCondition(condition);
  displayWeather(filteredCities);
});

const displayWeather = (filteredData = weatherData) => {
  const weatherList = document.getElementById("weatherList");
  weatherList.innerHTML = "";
  filteredData.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${city.cityName}</span> Temp: ${city.temperature}°C, Condition: ${city.condition}`;
    weatherList.appendChild(listItem);
  });
};
