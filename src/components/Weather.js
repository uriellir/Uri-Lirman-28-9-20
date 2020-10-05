import React from "react";
import SingleWeather from "./SingleWeather";

class Weather extends React.Component {
  render() {
    return (
      <div className="container col-6 mx-auto mt-2 gray  rounded text-white ">
        {this.props.fiveDays[0] ? (
          <div className="d-flex p-2 bd-highlight justify-content-center bottom-weather">

            {this.props.fiveDays.map((day, index) => (
              <SingleWeather
                indexDay={index}
                selectedCity={this.props.city}
                temperature={day.Temperature.Maximum.Value}
                temperatureUnit={day.Temperature.Maximum.Unit}
                locationIcon={day.Day.Icon}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  };
}

export default Weather;
