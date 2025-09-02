import React, { useState } from "react";
import "./Weather.css"; // import styles

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "b1b986d65cb6bf4084d82570981cf472";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found ❌");

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const getDate = () => {
    const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div className="weather-card">
      <h1 className="title">🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>🔍</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="date">{getDate()}</p>

          <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
          <p className="desc">{weather.weather[0].description}</p>

          <div className="details">
            <div>🌡 Feels Like: {Math.round(weather.main.feels_like)}°C</div>
            <div>💧 Humidity: {weather.main.humidity}%</div>
            <div>💨 Wind: {weather.wind.speed} m/s</div>
            <div>🌍 Pressure: {weather.main.pressure} hPa</div>
          </div>
        </div>
      )}
    </div>
  );
}
