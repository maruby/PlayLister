import React from 'react';
import {useSelector} from 'react-redux';
import {
    selectPlaylist
} from './PlaylistSlice';

const Playlist = (props) =>{
    const playlist = useSelector(selectPlaylist);

    return (
        <div style={{backgroundColor:"#EEEEEE"}}>
            <ul>
                {playlist.map(track => 
                    <li>trackId:{track}</li>
                )}
            </ul>
        </div>
    );
}

export default Playlist;