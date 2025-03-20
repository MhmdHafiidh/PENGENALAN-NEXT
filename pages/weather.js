// pages/weather.js
import { useState, useEffect } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Malang");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);

      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Cuaca Saat Ini</h1>

      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Masukkan nama kota"
        />
        <button onClick={fetchWeather}>Cari</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
          <p>Suhu: {weather.main.temp}°C</p>
          <p>Kelembaban: {weather.main.humidity}%</p>
          <p>Kecepatan Angin: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
