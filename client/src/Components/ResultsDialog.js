import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Dialog, 
    List, 
    ListItem, 
    ListItemText, 
    Box, 
    Typography,
    IconButton,
    DialogContent
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch} from 'react-redux';

import {parseDOMToString} from '../Utility/Constants';
import {
    addMusicToPlaylist
} from '../Features/Playlist/PlaylistSlice';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const ResultsDialog = props => {
    const {results, isOpen, onClose} = props;
    const dispatch = useDispatch();

    const addVideoToPlaylist = (videoId) => {
        dispatch(addMusicToPlaylist(videoId));
        onClose();
    }

    const playVideoToPlaylist = () => {

    }

    return(
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="customized-dialog-title">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>Search Results:</DialogTitle>
            <DialogContent dividers style={{padding:"0"}}>
            <List>
                {results.map(result => (
                    <ListItem divider button key={result.id.videoId} marginBottom="10px">
                        <Box marginRight="10px">
                            <img src={result.snippet.thumbnails.default.url}/>
                        </Box>
                        <ListItemText
                            primary={parseDOMToString(result.snippet.title)}
                            secondary={
                                <Typography variant="caption" nowrap>{parseDOMToString(result.snippet.description)}</Typography>
                            }
                        />
                        <Box>
                            <IconButton onClick={() => {addVideoToPlaylist(result.id.videoId)}}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
            </DialogContent>
        </Dialog>
    );
}

ResultsDialog.propTypes = {
    results: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ResultsDialog;
