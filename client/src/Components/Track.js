import React, { useEffect, useState } from 'react';
import {
    ListItem, 
    ListItemText, 
    Box, 
    Typography,
    IconButton,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { RemoveRounded, AddRounded } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { parseDOMToString } from '../Utility/Constants';
import { removeMusicFromPlaylist, addMusicToPlaylist } from '../Features/Playlist/PlaylistSlice';


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

    const { videoId, result } = props
    
    useEffect(() => {
        if(videoId) {
            const fetchData = async () => {
                setLoading(true)
                const response = await fetch(`youtube/playList/${videoId}`)
                const json = await response.json()
    
                if (json.success && json.response) {
                    const result = json.response.data.items[0]
                    setTitle(result.snippet.title)
                    setDescription(result.snippet.description)
                    setThumbnail(result.snippet.thumbnails.default.url)
                    setLoading(false)
                }
            }
            fetchData()
        } 

        if(result) {
            setTitle(result.snippet.title)
            setDescription(result.snippet.description)
            setThumbnail(result.snippet.thumbnails.default.url)
            setAddId(result.id.videoId)
        }
        
    }, [videoId, result])
    
    const dispatch = useDispatch()
    const removeVideoToPlaylist = (vidId) => {
        dispatch(removeMusicFromPlaylist(vidId));
    }

    const addVideoToPlaylist = (videoId) => {
        dispatch(addMusicToPlaylist(videoId));
    }

    return (
        <ListItem divider button key={videoId} marginBottom="10px">
            {loading ? <CustomizedSkeleton /> : 
            <>
            <Box marginRight="10px">
                <img src={thumbnail} height="50px" width="70px"/>
            </Box>
            <ListItemText
                primary={title}
                secondary={
                    <Typography variant="subtitle1" noWrap>{description}</Typography>
                }
            />
                {videoId ? <Box>
                    <IconButton onClick={() => {removeVideoToPlaylist(videoId)}}>
                        <RemoveRounded />
                    </IconButton>
                </Box>
                : <Box>
                    <IconButton onClick={() => {addVideoToPlaylist(addId)}}>
                        <AddRounded />
                    </IconButton>
                </Box> }
                </>
                }
        </ListItem>
    )
    
}

export default Track