import React, { useState, useEffect } from "react";
import { WeatherFetch } from "../api";
import { images } from "../../imagesData";
import { IData } from "./type";
import ThermometerWeather from "./Thermometer";
import "./weather.scss";

function Weather() {
  const [weather, setWeather] = useState<IData | null>(null);
  const [location, setLocation] = useState<string>("Kyiv");
  const [changeLocation, setChangeLocation] = useState<string>("");
  const [backgroundAppWeather, setBackgroundAppWeather] = useState<string>(
    images[Math.floor(Math.random() * images.length)]
  );
  const [nextBackgroundAppWeather, setNextBackgroundAppWeather] =
    useState<string>(images[Math.floor(Math.random() * images.length)]);
  const [isNextBackgroundVisible, setIsNextBackgroundVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //   Date
  const date = new Date();
  const day = date.getDay();
  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const time = date.toLocaleTimeString();

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  useEffect(() => {
    const timer = setInterval((): void => {
      const background = images[Math.floor(Math.random() * images.length)];
      setNextBackgroundAppWeather(background);
      setIsNextBackgroundVisible(true);
    }, 10000);
    return (): void => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (isNextBackgroundVisible) {
      const timer = setTimeout(() => {
        setBackgroundAppWeather(nextBackgroundAppWeather);
        setIsNextBackgroundVisible(false);
      }, 1000); // transition duration
      return (): void => {
        clearTimeout(timer);
      };
    }
  }, [isNextBackgroundVisible, nextBackgroundAppWeather]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: IData = await WeatherFetch({ location });
        if (data) {
          setWeather(data);
          setError(null);
        } else {
          setError("Location not found");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, [location]);

  const locationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setChangeLocation(location);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(changeLocation);
    setChangeLocation("");
  };

  return (
    <div className="weather">
      <div
        className={`background-app-weather ${
          isNextBackgroundVisible ? "hidden" : ""
        }`}
        style={{
          backgroundImage: `url(${backgroundAppWeather})`,
        }}
      ></div>
      <div
        className={`background-app-weather ${
          isNextBackgroundVisible ? "" : "hidden"
        }`}
        style={{
          backgroundImage: `url(${nextBackgroundAppWeather})`,
        }}
      ></div>

      <div className="weather-content">
        <p className="date-time">{`${dayName}, ${day}, ${month}, ${time.slice(
          0,
          5
        )}`}</p>
        <form onSubmit={handleSubmit}>
          <input
            className="change-location"
            type="text"
            onChange={locationChange}
            value={changeLocation}
            placeholder="loacation"
          />
          <button type="submit">Location</button>
        </form>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="location">
              <p className="country">{weather?.location.country}</p>
              <p className="city">{weather?.location.name}</p>
              <p className="region">{weather?.location.region}</p>
              <p className="continent">{weather?.location.tz_id}</p>
            </div>
            <div className="temp-options">
              <p className="temp">
                {Number(weather?.current.temp_c) > 0
                  ? `+${weather?.current.temp_c}`
                  : `-${weather?.current.temp_c}`}
              </p>
              <div className="weather-img">
                <img src={weather?.current.condition.icon} alt="icon" />
              </div>
              <ThermometerWeather temp_c={weather?.current.temp_c} />
            </div>
            <p className="cloud">{weather?.current.condition.text}</p>
            <div className="winds">
              <p>{weather?.current.wind_kph} wind/kph</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
