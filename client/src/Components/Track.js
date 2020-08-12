import React, { useEffect, useState } from 'react';
import {
    ListItem, 
    ListItemText, 
    Box, 
    Typography,
    IconButton
} from '@material-ui/core';
import { RemoveRounded, AddRounded } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { parseDOMToString } from '../Utility/Constants';
import { removeMusicFromPlaylist, addMusicToPlaylist } from '../Features/Playlist/PlaylistSlice';

const Track = (props) => {
    const [title, setTitle] = useState(parseDOMToString("")) 
    const [description, setDescription] = useState(parseDOMToString(""))
    const [thumbnail, setThumbnail] = useState("")
    const [addId, setAddId] = useState()

    const { videoId, result } = props
    
    useEffect(() => {
        if(videoId) {
            const fetchData = async () => {
                const response = await fetch(`youtube/playList/${videoId}`)
                const json = await response.json()
    
                if (json.success && json.response) {
                    const result = json.response.data.items[0]
                    setTitle(result.snippet.title)
                    setDescription(result.snippet.description)
                    setThumbnail(result.snippet.thumbnails.default.url)
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
            <Box marginRight="10px">
                <img src={thumbnail} height="50px" width="70px"/>
            </Box>
            <ListItemText
                primary={title}
                secondary={
                    <Typography variant="subtitle1" noWrap>{description}</Typography>
                }
            />
            {videoId ? 
            <Box>
                <IconButton onClick={() => {removeVideoToPlaylist(videoId)}}>
                    <RemoveRounded />
                </IconButton>
            </Box>
            :
            <Box>
                <IconButton onClick={() => {addVideoToPlaylist(addId)}}>
                    <AddRounded />
                </IconButton>
            </Box>}
        </ListItem>
    )
}

export default Track