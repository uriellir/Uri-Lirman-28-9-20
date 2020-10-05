import React from "react";

const API_KEY = "0Y9GPI4mpOSfZw9cAcdyABM6YEUltSw4";

class SingleWeather extends React.Component {
    state = {
        selectedCity: undefined,
        temperature: undefined,
        temperatureUnit: undefined,
        locationIcon: undefined,
        indexDay: undefined,
    }

    componentDidMount() {
        const city = this.props.selectedCity;
        var post;

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
                return fetch("http://dataservice.accuweather.com/currentconditions/v1/" + data[0].Key + "?apikey=0Y9GPI4mpOSfZw9cAcdyABM6YEUltSw4");

            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }).then(function (data) {
                post = data;
            }).catch(function (error) {
                console.warn(error);

            }).finally(() => {
                this.setState({
                    selectedCity: city,
                    temperature: post[0].Temperature.Metric.Value,
                    temperatureUnit: post[0].Temperature.Metric.Unit,
                    locationIcon: post[0].WeatherIcon,
                    indexDay: this.props.indexDay,
                })
            });
    }

    render() {
        return (
            <div>
                <div className="weather__info">
                    {this.state.selectedCity && <p>Location: {this.state.selectedCity}</p>}
                    {this.state.temperature && this.state.temperatureUnit && (
                        <p>
                            Temperature: {this.state.temperature} ,
                            {this.state.temperatureUnit}
                        </p>
                    )}
                    {this.state.locationIcon && <img
                        className="small-image"
                        src={'https://developer.accuweather.com/sites/default/files/' + String(this.state.locationIcon).padStart(2, '0') + '-s.png'}
                        alt="weather-icon"
                    >
                    </img>}
                </div>
            </div >
        );
    }
}

export default SingleWeather;