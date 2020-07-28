import React from 'react';
import JSONP from 'jsonp';
import {TextField, InputAdornment, IconButton} from '@material-ui/core';
import {Common} from '../Utility/Constants';
import {Autocomplete} from '@material-ui/lab';
import { SearchRounded } from '@material-ui/icons';


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
          label="Search Music on Youtube"
          variant="outlined"
          color="secondary"
          InputProps={{ ...params.InputProps, type: 'search' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchRounded /> 
              </IconButton>
            </InputAdornment>
          }
          onChange={this.onChangeHandler}
        />
      )}
      />
    )
  }
}
