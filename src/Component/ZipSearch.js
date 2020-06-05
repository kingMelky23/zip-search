import React, { Component } from "react";
import axios from "axios";

class ZipSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { //Varible set in memory
      zipcode: "", 
      cities: [],
    };
  }

  handleInput = (event) => { // when input box recieves a new value change the zip code state
    this.setState({ zipcode: event.target.value });
  };

  handleSubmit = () => { // axios call 
    axios
      .get(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipcode}`) // searches for data coresponding with users zipcode input
      .then((response) => {
        console.log(response);
        this.setState({ cities: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { cities } = this.state;
    return (
      <>
        <input
          type="text"
          name="zip"
          value={this.state.zipcode}
          onChange={this.handleInput}
        />
        {cities.length // terenary opporater for determening if there was any results
          ? cities.map((city) => (
          <div key={city.RecordNumber}> City :{city.City} <br/> State: {city.State} <br/> Location: {city.Location}  <br/> 
           Estimate Population: {city.EstimatedPopulation}  <br/>Total Wages: {city.TotalWages} <br/> <br/> <br/> </div>
            ))
          : null}
        <button onClick={this.handleSubmit}>submit</button>
      </>
    );
  }
}

export default ZipSearch;
