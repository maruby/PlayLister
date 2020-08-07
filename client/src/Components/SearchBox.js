import React, {useEffect, useState, useCallback} from 'react';
import JSONP from 'jsonp';
import {TextField, InputAdornment, IconButton, Grid, Box} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {SearchRounded} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import {Common} from '../Utility/Constants.js';
import ResultsDialog from './ResultsDialog.js';
import { styles } from '../Theme.js'

const SearchBox = props => {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openResults, setOpenResults] = useState(false);

  const { classes } = props;

  const onChangeHandler = (event) => {
    const query = event.target.value;
    const url = Common.GOOGLE_SUGGEST + query;
    
    setQuery(query);
    JSONP(url, function(error, data){
      if (error) {
        console.log(error);
      } else {
        setOptions(data[1]);
      }
    });
  }

  const onSubmitHandler = (event, value) => {
    if(event) event.preventDefault(); // Will prevent to redirect to the submit screen
    submit();
    setOpenResults(true)
  }

  const autoCompleteOnChangehandler = (event, value) => {
    setQuery(value);
    setIsSubmit(true);
  }

  const submit = useCallback(() => {
    fetch("youtube/searchVideo?query=" + query)
      .then(response => response.json())
      .then(json => {
        if(json.success && json.response) {
          setResults(json.response.data.items);
        }
      })
  }, [query]);

  useEffect(() => {
    if(isSubmit === true) {
      submit();
      setIsSubmit(false);
    }
  }, [isSubmit, submit]);

  const onDialogClose = () => {
    setOpenResults(false);
    setResults([]);
  }

  return (
    <Box {...props}>
      <form onSubmit={onSubmitHandler}>
        <Autocomplete
        freeSolo
        disableClearable
        options={options.map((option) => option[0])}
        onChange={autoCompleteOnChangehandler}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Music on Youtube"
            className={classes.searchBox}
            onChange={onChangeHandler}
            InputProps={{
              ...params.InputProps, type: 'search',
              endAdornment: 
                <InputAdornment onClick={onSubmitHandler}>
                  <IconButton>
                    <SearchRounded color="secondary"/> 
                  </IconButton>
                </InputAdornment>
            }}
          />
          )}
        />
      </form>

      <ResultsDialog results={results} isOpen={openResults} onClose={onDialogClose}/>
    </Box>
  );
}

export default withStyles(styles)(SearchBox)
