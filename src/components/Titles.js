import React from "react";
import SingleWeather from "./SingleWeather.js"

class Titles extends React.Component {
  render() {
    const icon = this.props.locationIcon;
    return (
      <div>
        <h1 className="title_container__title"> Weather Finder </h1>
        <h3 className=" title_container__subtitle"> Find out temperature and more... </h3>
        <SingleWeather
          selectedCity={"Tel Aviv"}
        />
      </div >
    );
  }
}

export default Titles;
