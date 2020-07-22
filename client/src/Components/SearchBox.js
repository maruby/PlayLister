import React from 'react';
import JSONP from 'jsonp';
import {TextField} from '@material-ui/core';
import {Common} from '../Utility/Constants';
import {Autocomplete} from '@material-ui/lab';


export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    }
  }

  onChangeHandler = (event) => {
    const self = this;
    const query = event.target.value;
    const url = Common.GOOGLE_SUGGEST + query;

    JSONP(url, function(error, data){
      if (error) {
        console.log(error);
      } else {
        self.setState({
          options: data[1]
        });
      }
    });
  }

  render() {
    return (
      <Autocomplete
      freeSolo
      disableClearable
      options={this.state.options.map((option) => option[0])}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search youtube video here or paste URL..."
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: 'search' }}
          onChange={this.onChangeHandler}
        />
      )}
      />
    )
  }
}
