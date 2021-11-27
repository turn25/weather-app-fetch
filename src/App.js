import React, { useState } from "react";
import styled from "styled-components";

const api = {
  key: "b9f6e89da5c15b85564792747a627347",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  function handleClick() {
    if (query !== "") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  }

  const dateBuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let month = d.toLocaleString("en-US", { month: "long" });
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <Container className="cold">
      <Main>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
          <Button onClick={handleClick}>Get Weather</Button>
        </SearchBox>
        {typeof weather.main != "undefined" && (
          <Wrapper>
            <LocationBox>
              <LocationInfo>
                {weather.name}, {weather.sys.country}
              </LocationInfo>
              <DateInfo>{dateBuilder(new Date())}</DateInfo>
            </LocationBox>

            <WeatherBox>
              <Temperature>
                {/* Convert from Kelvin to Celsius */}
                {parseFloat(weather.main.temp - 273.15).toFixed(1)} &deg;C
              </Temperature>
              <Weather>
                {weather.weather[0].main}
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="img_icon"
                />
              </Weather>
            </WeatherBox>
          </Wrapper>
        )}
      </Main>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-image: url("/images/mountain2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.main`
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  padding: 30px;
`;

const SearchBox = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

const SearchInput = styled.input`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
  background-color: rgba(249, 249, 249, 0.5);
  border-radius: 10px;

  outline: none;
  border: 2px solid rgba(249, 249, 249, 0.4);
  box-shadow: 0 26px 30px -10px rgba(0, 0, 0, 0.7);
  transition: all 250ms;

  &:focus {
    border: 2px solid #fff;
    transform: scale(1.02);
    box-shadow: 0 35px 40px -12px rgba(0, 0, 0, 0.7);
    background-color: rgba(249, 249, 249, 0.7);
  }
`;

const Button = styled.button`
  margin-top: 20px;
  cursor: pointer;
  font-size: 18px;
  background-color: rgba(130, 180, 100, 0.9);
  outline: none;
  border: 2px solid transparent;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  color: #fff;
  box-shadow: 0 26px 30px -10px rgba(0, 0, 0, 0.7);
  transition: all 250ms;

  &:focus {
    border: 2px solid #fff;
    transform: scale(1.02);
    box-shadow: 0 35px 40px -12px rgba(0, 0, 0, 0.7);
  }

  @media (min-width: 1080px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const LocationBox = styled.div`
  color: #fff;
  text-align: center;
`;

const LocationInfo = styled.div`
  font-size: 32px;
  font-weight: 500;
  text-shadow: 3px 3px rgba(50, 50, 60, 0.5);
`;

const DateInfo = styled.div`
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
  text-shadow: 2px 2px rgba(50, 50, 60, 0.5);
`;

const WeatherBox = styled.div`
  color: #fff;
`;

const Temperature = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  font-size: 90px;
  font-weight: 900;
  border-radius: 10px;
  padding: 20px;
  text-shadow: 3px 5px rgba(50, 50, 60, 0.5);
  box-shadow: 0 26px 30px -10px rgba(0, 0, 0, 0.5);
`;

const Weather = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 700;
  text-shadow: 3px 5px rgba(50, 50, 60, 0.5);

  img {
    object-fit: contain;
    width: 60px;
    height: 60px;
  }
`;
