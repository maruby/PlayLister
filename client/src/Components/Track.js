import React, { useEffect, useState } from 'react';
import {
    ListItem, 
    ListItemText, 
    Box, 
    Typography,
    IconButton,
    Snackbar
} from '@material-ui/core';
import { Skeleton, Alert, AlertTitle } from '@material-ui/lab'
import { RemoveRounded, AddRounded } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { parseDOMToString } from '../Utility/Constants';
import { removeMusicFromPlaylist, addMusicToPlaylist, addMusicToTopPlaylist } from '../Features/Playlist/PlaylistSlice';


const CustomizedSkeleton = (props) => {
    return(
        <>
        <Box display="flex" alignItems="flex-start" direction="row">
            <Box marginRight="10px">
                <Skeleton variant="rect" height="50px" width="70px"/>
            </Box>
            <Box width="700px">
                <Typography component="div">
                    <Skeleton />
                </Typography>
                <Typography component="div" variant="subtitle1">
                    <Skeleton />
                </Typography>
            </Box>
        </Box>
        </>
    )
} 


const Track = (props) => {
    const [title, setTitle] = useState(parseDOMToString("")) 
    const [description, setDescription] = useState(parseDOMToString(""))
    const [thumbnail, setThumbnail] = useState("")
    const [addId, setAddId] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({error: '', status: '', message: '', alert: false})

    const { videoId, result, closeResultDialog } = props
    
    useEffect(() => {
        if(videoId) {
            const fetchData = async () => {
                const cachedTrack = localStorage.getItem(videoId)
                if(cachedTrack) {
                    const parsedCache = JSON.parse(cachedTrack)
                    setTitle(parsedCache.title)
                    setDescription(parsedCache.description)
                    setThumbnail(parsedCache.thumbnails.default.url)
                }else {
                    setLoading(true)
                    const response = await fetch(`youtube/playList/${videoId}`)
                    const json = await response.json()
        
                    if (json.success && json.response) {
                        const result = json.response.data.items[0]
                        setTitle(result.snippet.title)
                        setDescription(result.snippet.description)
                        setThumbnail(result.snippet.thumbnails.default.url)
                        localStorage.setItem(videoId, JSON.stringify(result.snippet))
                        setLoading(false)
                    } else if (json.error) {
                        setError({error: result.error, status: result.code, message: result.errors[0].message, alert: true})
                    }
                }
            }

            fetchData()
        }else if(result) {
            setTitle(result.snippet.title)
            setDescription(result.snippet.description)
            setThumbnail(result.snippet.thumbnails.default.url)
            setAddId(result.id.videoId)
            setError({error: result.error, status: result.code, message: result.errors[0].message, alert: true})
        }
        
    }, [videoId, result])
    
    const dispatch = useDispatch()
    const removeVideoToPlaylist = (vidId) => {
        dispatch(removeMusicFromPlaylist(vidId));
    }

    const addVideoToPlaylist = (videoId) => {
        dispatch(addMusicToPlaylist(videoId));
    }

    const playThisTrack = () => {
        dispatch(addMusicToTopPlaylist(videoId ? videoId : addId))

        if(!videoId) {
            closeResultDialog()
        }
    }

    return (
        <>
            <ListItem divider button key={videoId} marginbottom="10px">
                {loading ? <CustomizedSkeleton /> : 
                <>
                    <Box marginRight="10px" onClick={playThisTrack}>
                        <img src={thumbnail} height="50px" width="70px" alt={"thumbnail"}/>
                    </Box>

                    <ListItemText
                        primary={title}
                        secondary={
                            <Typography variant="subtitle1" noWrap>{description}</Typography>
                        }
                        onClick={playThisTrack}
                    />

                    <Box>
                    {videoId ? 
                        <IconButton onClick={() => {removeVideoToPlaylist(videoId)}}>
                            <RemoveRounded />
                        </IconButton>
                    :
                        <IconButton onClick={() => {addVideoToPlaylist(addId)}}>
                            <AddRounded />
                        </IconButton>
                    }
                    </Box>
                </>
                }
            </ListItem>
            <Snackbar 
                open={error.alert} 
                autoHideDuration={2000} 
                onClose={() => setError({alert: false})}
                anchorOrigin={{vertical: "top", horizontal:"center"}}>
                <Alert severity="warning">
                    <AlertTitle>{error.error}<strong>{error.code}</strong></AlertTitle>
                    {error.message}
                </Alert>
            </Snackbar>
        </>
    )
    
}

export default Track