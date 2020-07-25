import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons';

const SearchBox = () => {
  return (
    <TextField
        label="Search Music on Youtube"
        variant="outlined"
        color="secondary"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchRounded /> 
            </IconButton>
          </InputAdornment>
        }
        />
  );
}

export default SearchBox;

