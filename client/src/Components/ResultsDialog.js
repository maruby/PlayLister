import React from "react";
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
    DialogContent, 
    Snackbar, 
    Fade,
    CircularProgress
} from '@material-ui/core';
import {
    Alert, 
    AlertTitle
} from '@material-ui/lab'
import { Close, AddRounded } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from '../Theme.js'
import { parseDOMToString } from '../Utility/Constants';
import {
    addMusicToPlaylist,
    closeAlert,
    selectOpenAlert
} from '../Features/Playlist/PlaylistSlice';
  
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.dialogTitle} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <Close />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const ResultsDialog = props => {
    const openAlert = useSelector(selectOpenAlert);
    const {results, isOpen, onClose, loading} = props;
    const dispatch = useDispatch();

    const addVideoToPlaylist = (videoId) => {
        dispatch(addMusicToPlaylist(videoId));
        onClose();
    }

    // const playVideoToPlaylist = () => {

    // }

    return(
        <>
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="customized-dialog-title">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>Search Results:</DialogTitle>
            <DialogContent dividers style={{padding:"0"}}>
            {results.length === 0 ?
                <Fade
                    in={true}
                    unmountOnExit
                >
                    <CircularProgress color="primary"/>
                </Fade> :
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
                                    <AddRounded />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>}
            </DialogContent>
        </Dialog>
        {/* <Snackbar 
            open={"true"} 
            autoHideDuration={3000} 
            onClose={() => dispatch(closeAlert())}
            anchorOrigin={ "top", "center" }
            >
            <Alert severity="warning" color="secondary">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
            </Alert>
        </Snackbar> */}
        </>
    );
}

ResultsDialog.propTypes = {
    results: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ResultsDialog;
