import React from "react";
import Autosuggest from "react-autosuggest";
import _ from 'lodash';
//import {geolocated} from 'react-geolocated';
//https://scrimba.com/c/cKQgNcd

import Typography from '@material-ui/core/Typography'

import LocationOnIcon from '@material-ui/icons/LocationOn';



async function getSuggestions(value) {
  const escapedValue = value.trim();
  if (escapedValue === "") {
    return [];
  }

  const url = "https://autocomplete.geocoder.api.here.com/6.2/suggest.json";

  const params =
    "?" +
    "query=" +
    encodeURIComponent(value) + // The search text which is the basis of the query
    //'&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token.
    //'&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token.
    "&maxresults=5" + // The upper limit the for number of suggestions to be included
    // in the response.  Default is set to 5.
    "&country=USA"+
    "&app_id=" +
    "QsrMlDJpePXekVyk0b9K" +
    "&app_code=" +
    "irWUOsu0W7IC43pEhdavNg";

    function randomDelay() {
      return 300 + Math.random() * 1000;
    }

  let response = await fetch(url + params);
  response = await response.json(); // or text etc..
  var suggestionList = response.suggestions.map(suggestion => {
    //${address.country}
    const {address} = suggestion;
    if (suggestion.matchLevel === "houseNumber") {
      return `${address.houseNumber} ${address.street},${address.city},${address.postalCode},USA`;
    } else if (suggestion.matchLevel === "street") {
      return `${address.street},${address.city},${address.postalCode},${address.state},USA`;
    } else if (suggestion.matchLevel === "city") {
      return `${address.city},${address.postalCode},${address.state},USA`;
    } else if (suggestion.matchLevel === "postalCode") {
      return `${address.city},${address.postalCode},${address.state},USA`;
    } else if (suggestion.matchLevel === "county") {
      return `${address.county},${address.state},USA`;
    } else if (suggestion.matchLevel === "district") {
      return `${address.county},${address.state},USA`;
    } else if (suggestion.matchLevel === "state") {
      return `${address.state},USA`;
    } else if (suggestion.matchLevel === "country") {
      return `USA`;
    }else if(suggestion.matchLevel === "intersection"){
      return `${address.street},${address.city},${address.postalCode},${address.state},USA`;
    }else{
      return `${address.state},USA`;
    }
  });
  return suggestionList;
}


function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

export default class AutoComplete extends React.Component {
 

  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
      placeHolder:"",
      isLoading: false,
      selectedValue:"",
      placeHolderLocation:""
    };
    this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions, 200); // 1000ms is chosen for demo purposes only.

  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });
    
     /*
    this.setState({
      suggestions: await getSuggestions(value)
    });
    */

    // Fake an AJAX call
    setTimeout(async () => {
      const suggestions = await getSuggestions(value);

      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions
        });
      } else { // Ignore suggestions if input value changed
        this.setState({
      suggestions: suggestions
    });
      }
    }, 300);
  }

  componentDidMount() {
    this.setState({placeHolder:`Enter your location to get started ...`,})
    
    // fetch("https://api.ipdata.co/?api-key=b316cbbb90d24af143158f141fd0d16624f6a2bcc7632c322c1258cc")
    //   .then(response => response.json())
    //   .then(data => data === null? this.setState({placeHolderLocation:`""`,}) : this.updateDefaultLocation(data.city,data.region));
      
  }
  
  updateDefaultLocation = (city,region) =>{
    this.setState({placeHolderLocation:`${city}, ${region}`});
    this.props.setLocation(`${city}, ${region}`)
  }
  onChange = (event, { newValue, method }) => {


    //Make api call
    //console.log("---->"+this.state.selectedValue)
    if(this.state.suggestions.includes(newValue)){
      this.props.setLocation(newValue);
      this.setState({
        value: newValue,
        selectedValue:newValue,
        placeHolderLocation:""
      },() =>{});
    }else{
      this.setState({
        value: newValue,
      },() =>{});
    }

 
  };

  onSuggestionsFetchRequested = async ({ value }) => {

    this.debouncedLoadSuggestions(value);
    /*
    this.setState({
      suggestions: await getSuggestions(value)
    });
    */
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };



render() {
    const { value, suggestions, placeHolder } = this.state;
    const inputProps = {
      placeholder: placeHolder,
      value,
      onChange: this.onChange
    };
    //const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        {this.state.placeHolderLocation !== ""? <Typography style={{"color":"lightgray"}}>{`Approx location ${this.state.placeHolderLocation}`}</Typography>:"" }
        

      </div>
    );
  }
}
