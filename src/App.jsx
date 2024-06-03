import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (position) => {
    console.log(position);
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    setCoords(obj);
  };
  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "cec9fca2c4749357140cb8ab0925c917";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;

      axios
        .get(url)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
          setTemp({ celsius, fahrenheit });
          setWeather(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
    console.log(weather);
  }, [coords]);

  return (
    <div className="app" style={{backgroundImage:'url("./background.jpeg")'}}>
      {isLoading ? (
        <img src="./loading.gif" className="app_loader"></img>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  );
}

export default App;
