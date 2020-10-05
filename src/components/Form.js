import React from "react";

const API_KEY = "0Y9GPI4mpOSfZw9cAcdyABM6YEUltSw4";

class Form extends React.Component {
  state = {
    cities: [],
    selectedCity: "",
    validationError: ""
  };

  componentDidMount() {
    fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" +
      API_KEY + "&q=tel"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let citiesFromApi = data.map(city => {
          return { value: city.LocalizedName, display: city.LocalizedName };
        });
        this.setState({
          cities: [
            {
              value: "",
              display:
                "(Select a city)"
            }
          ].concat(citiesFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <select
          name="citis"
          value={this.state.selectedCity}
          onChange={e =>
            this.setState({
              selectedCity: e.target.value,
              validationError:
                e.target.value === ""
                  ? "You must select a city"
                  : ""
            })
          }
        >
          {this.state.cities.map(city => (
            <option
              key={city.value}
              value={city.value}
            >
              {city.display}
            </option>
          ))}
        </select>
        <div
          style={{
            color: "red",
            marginTop: "5px"
          }}
        >
          {this.state.validationError}
        </div>
        <button> Get Weather </button>
      </form >
    );
  }
}

export default Form;