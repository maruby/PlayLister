import React, { useEffect, useState } from 'react';
import {
    ListItem, 
    ListItemText, 
    Box, 
    Typography,
    IconButton
} from '@material-ui/core';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { useDispatch } from 'react-redux';

import { parseDOMToString } from '../../Utility/Constants';
import { removeMusicFromPlaylist } from './PlaylistSlice';

const Track = (props) => {
    const [title, setTitle] = useState(parseDOMToString("")) 
    const [description, setDescription] = useState(parseDOMToString(""))
    const [thumbnail, setThumbnail] = useState("")

    const { videoId } = props
    
    useEffect(() => {
        
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
    }, [])
    
    const dispatch = useDispatch()
    const removeVideoToPlaylist = (vidId) => {
        dispatch(removeMusicFromPlaylist(vidId));
    }

    return (
        <ListItem divider button key={videoId} marginBottom="10px">
            <Box marginRight="10px">
                <img src={thumbnail}/>
            </Box>
            <ListItemText
                primary={title}
                secondary={
                    <Typography variant="caption" nowrap>{description}</Typography>
                }
            />
              <Box>
                <IconButton onClick={() => {removeVideoToPlaylist(videoId)}}>
                    <RemoveRoundedIcon />
                </IconButton>
            </Box>
        </ListItem>
    )
}

export default Track