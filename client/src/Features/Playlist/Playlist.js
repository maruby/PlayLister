import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPlaylist } from './PlaylistSlice';
import { List } from '@material-ui/core';

import Track from './Track'
import EmptyPlaylist from './EmptyPlaylist'

const Playlist = (props) =>{
    const playlist = useSelector(selectPlaylist);
    const [videoList, setVideoList] = useState(false)

    useEffect(() => {
        playlist.length > 0 ? setVideoList(false) : setVideoList(true)
    }, [playlist]);

    return (
        videoList ? <EmptyPlaylist /> : <List> {playlist.map( videoId => <Track videoId={videoId}/>)} </List>
    )
}

export default Playlist;