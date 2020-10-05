import React from "react";
import "./App.css";
import Titles from "./components/Titles.js";
import Form from "./components/Form.js";
import Weather from "./components/Weather.js";

const API_KEY = "0Y9GPI4mpOSfZw9cAcdyABM6YEUltSw4";

class app extends React.Component {
  state = {
    city: undefined,
    temperature_value: undefined,
    temperature_unit: undefined,
    locationApi: undefined,
    locationIcon: undefined,
    weather5Days: [],
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.citis.value;
    var post;
    var postForecast
    var key;
    // Call the API
    fetch("http://dataservice.accuweather.com/locations/v1/search?q=" +
      city +
      "&apikey=" +
      API_KEY +
      "").then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).then(function (data) {

        // Store the post data to a variable
        post = data;
        // Fetch another API
        return fetch("http://dataservice.accuweather.com/currentconditions/v1/" + data[0].Key + "?apikey=0Y9GPI4mpOSfZw9cAcdyABM6YEUltSw4");

      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).then(function (userData) {
        // post2 = userData;
        post = userData;
        return fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?apikey=" + API_KEY + "");
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      }).then(function (forecastData) {
        postForecast = forecastData;
      }).catch(function (error) {
        console.warn(error);
      }).finally(() => {
        if (city) {
          this.setState({
            city: city,
            temperature_value: post[0].Temperature.Metric.Value,
            temperature_unit: post[0].Temperature.Metric.Unit,
            locationIcon: post[0].WeatherIcon,
            weather5Days: postForecast.DailyForecasts,
          });
        }
      });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="header">
              <div className="col-xs-5 title-container">
                <Titles />
                <Form getWeather={this.getWeather} />
              </div>
              <div className="col-xs-7 form-container">

                <Weather
                  city={this.state.city}
                  temperature_value={this.state.temperature_value}
                  temperature_unit={this.state.temperature_unit}
                  locationIcon={this.state.locationIcon}
                  fiveDays={this.state.weather5Days}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default app;
