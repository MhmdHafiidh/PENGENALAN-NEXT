// pages/api/weather.js
export default async function handler(req, res) {
  // You'll need to sign up for an API key at OpenWeatherMap
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const city = req.query.city || "Jakarta";

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!weatherRes.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherRes.json();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
