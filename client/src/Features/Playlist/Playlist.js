import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPlaylist } from './PlaylistSlice';
import { List } from '@material-ui/core';

import Track from '../../Components/Track'
import EmptyPlaylist from '../../Components/EmptyPlaylist'

const Playlist = (props) =>{
    const playlist = useSelector(selectPlaylist);
    const [videoList, setVideoList] = useState(false)
    
    useEffect(() => {
        playlist.length > 0 ? setVideoList(false) : setVideoList(true)
    }, [playlist]);

    return (
        videoList ? <EmptyPlaylist /> : 
            <List style={{maxHeight:"72vh", overflow: 'auto'}}> 
                {playlist.map( videoId => <Track key={videoId} videoId={videoId}/>)} 
            </List>
    )
}

export default Playlist;