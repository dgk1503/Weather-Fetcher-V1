const weather_form = document.querySelector(`.weather_form`);
const city_input = document.querySelector(`.city_input`);
const card = document.querySelector(`.card`);

weather_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = city_input.value;
  if (city) {
    try {
      const weather_data = await get_weather_info(city);
      display_weather_info(weather_data);
    } catch (error) {
      display_error(error);
      console.error(error);
    }
  } else {
    display_error(`Please enter a city.`);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function get_weather_info(city) {
  const api_key = "e8d0433e2df969ee92282de039488cc8";
  const weather_info = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const response = await fetch(weather_info);

  if (!response.ok) {
    throw new Error("Could not fetch weather Data");
  }

  return await response.json();
}

function get_weather_emoji(weather_id) {
  // Change card gradient based on weather description
  let gradient;

  if (weather_id >= 200 && weather_id < 300) {
    gradient = "linear-gradient(180deg, #a1c4fd 0%, #c2e9fb 100%)"; // blueish
  } else if (weather_id >= 300 && weather_id < 500) {
    gradient = "linear-gradient(180deg, #d7d2cc 0%, #304352 100%)"; // gray
  } else if (weather_id >= 500 && weather_id < 600) {
    gradient = "linear-gradient(180deg, #fceabb 0%, #f8b500 100%)"; // sunny yellow
  } else if (weather_id >= 600 && weather_id < 700) {
    gradient = "linear-gradient(180deg, #e0eafc 0%, #cfdef3 100%)"; // white/blue
  } else if (weather_id >= 700 && weather_id < 800) {
    gradient = "linear-gradient(180deg, #616161 0%, #9bc5c3 100%)"; // dark
  } else if (weather_id === 800) {
    gradient = "linear-gradient(180deg, #fceabb 0%, #f8b500 100%)"; // sunny yellow
  } else if (weather_id >= 801 && weather_id < 810) {
    gradient = "linear-gradient(180deg, #e0c3fc 0%, #8ec5fc 100%)"; // purple/blue
  } else {
    gradient = "linear-gradient(180deg, #b2fefa 0%, #f6d365 100%)"; // default
  }
  card.style.background = gradient;

  switch (true) {
    case weather_id >= 200 && weather_id < 300:
      return "⛈️";
    case weather_id >= 300 && weather_id < 500:
      return "💧";
    case weather_id >= 500 && weather_id < 600:
      return "🌧️";
    case weather_id >= 600 && weather_id < 700:
      return "❄️";
    case weather_id >= 700 && weather_id < 800:
      return "☁️";
    case weather_id === 800:
      return "🌤️";
    case weather_id >= 801 && weather_id < 810:
      return "🌥️";
    default:
      return "⁉️";
  }
}
function display_weather_info(data) {
  const { name: city, wind, visibility, main, weather } = data;
  const { speed } = wind;
  const { temp, humidity, sea_level } = main;
  const { id, description } = weather[0];
  card.textContent = "";
  card.style.display = "flex";
  card.classList.remove("fade-in");
  void card.offsetWidth;

  card.classList.add("fade-in");

  //create elements
  const city_display = document.createElement("h1");
  const speed_display = document.createElement("p");
  const visibility_display = document.createElement("p");
  const temp_display = document.createElement("p");
  const humidity_display = document.createElement("p");
  const sea_level_display = document.createElement("div");
  const weather_description = document.createElement("p");
  const weather_emoji_display = document.createElement("p");
  //give data to the elements
  city_display.textContent = city;
  speed_display.textContent = `Wind Speed : ${speed} M/s`;
  visibility_display.textContent = `Visibility :${(visibility / 1000).toFixed(
    2
  )} Km`;
  temp_display.textContent = `${(temp - 273.15).toFixed(2)}°C`;
  humidity_display.textContent = `Humidity :${humidity}%`;
  sea_level_display.textContent = `Sea Level :${
    sea_level ? sea_level : "N/A"
  }hPa`;
  weather_description.textContent = capitalize(description);
  weather_emoji_display.textContent = get_weather_emoji(id);
  const seaLevelValue = sea_level ? sea_level : 0;
  sea_level_display.innerHTML = `
      <span>Sea Level: ${sea_level ? sea_level + " m" : "N/A"}</span>
       ${
         sea_level
           ? `<meter min="900" max="1100" value="${seaLevelValue}" style="width:120px;"></meter>`
           : ""
       }
    `;

  //add CSS properties to the elements
  city_display.classList.add(`city_display`);
  speed_display.classList.add(`speed_display`);
  visibility_display.classList.add(`visibility_display`);
  temp_display.classList.add(`temp_display`);
  humidity_display.classList.add(`humidity_display`);
  sea_level_display.classList.add(`sea_level_display`);
  weather_description.classList.add(`desc_display`);
  weather_emoji_display.classList.add(`weather_emoji`);
  //append elements to the card
  card.appendChild(city_display);
  card.appendChild(speed_display);
  card.appendChild(visibility_display);
  card.appendChild(temp_display);
  card.appendChild(humidity_display);
  card.appendChild(sea_level_display);
  card.appendChild(weather_description);
  card.appendChild(weather_emoji_display);
}
