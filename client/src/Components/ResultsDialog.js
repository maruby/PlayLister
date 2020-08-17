import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Dialog, 
    List, 
    Box, 
    Typography,
    IconButton,
    DialogContent, 
    Snackbar, 
    Fade,
    CircularProgress,
    Grid
} from '@material-ui/core';
import {
    Alert, 
    AlertTitle
} from '@material-ui/lab'
import { Close } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from '../Theme.js'
import {
    closeAlert,
    selectAlert
} from '../Features/Playlist/PlaylistSlice';
import Track from './Track'
  
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
    const isAlertOpen = useSelector(selectAlert);
    const {results, isOpen, onClose, loading} = props;
    const dispatch = useDispatch();
    
    // const playVideoToPlaylist = () => {

    // }
    return(
        <Box zIndex="modal">
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="customized-dialog-title">
            <DialogTitle id="customized-dialog-title" onClose={onClose}>Search Results:</DialogTitle>        
            <DialogContent dividers style={{padding:"0"}}>
            {results.length === 0 ?
                <Box height={200} width={300} 
                display="flex" 
                alignItems="center"
                justifyContent="center">
                    <Fade in={true} unmountOnExit>
                        <CircularProgress color="primary"/>
                    </Fade>
                </Box>
                 :
                <List>
                    {results.map(result => (
                        <Track result={result}></Track>
                    ))}
                </List>}
            </DialogContent>
        </Dialog>
        <Snackbar 
            open={isAlertOpen} 
            autoHideDuration={2000} 
            onClose={() => dispatch(closeAlert())}
            anchorOrigin={{vertical: "top", horizontal:"center"}}
            >
            <Alert severity="warning">
                <AlertTitle>This video is already on your Playlist</AlertTitle>
            </Alert>
        </Snackbar>
        </Box>
    );
}

ResultsDialog.propTypes = {
    results: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ResultsDialog;
