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

  const { classes } = props

  useEffect(() => {
    if(results.length > 0) {
      setOpenResults(true);
    }
  }, [results]);

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
      });
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
    <Box minWidth={365}>
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs>
            <Autocomplete
            freeSolo
            disableClearable
            options={options.map((option) => option[0])}
            onChange={autoCompleteOnChangehandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Music on Youtube"
                // variant="outlined"
                // color="secondary"
                className={classes.searchBox}
                InputProps={{ ...params.InputProps, type: 'search' }}
                endadornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchRounded /> 
                    </IconButton>
                  </InputAdornment>
                }
                onChange={onChangeHandler}
              />
              )}
            />
          </Grid>

          <Grid item xs={1} style={{paddingLeft:"10px"}}>
            <IconButton type="submit">
              <SearchRounded fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </form>

      <ResultsDialog results={results} isOpen={openResults} onClose={onDialogClose} />
    </Box>
  )
}

export default withStyles(styles)(SearchBox);
