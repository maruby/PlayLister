import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {
    selectPlaylist
} from './PlaylistSlice';
import {
    List, 
    ListItem, 
    ListItemText, 
    Box, 
    Typography
} from '@material-ui/core'

import {parseDOMToString} from '../../Utility/Constants';

const Playlist = (props) =>{
    const playlist = useSelector(selectPlaylist);
    const [noVideoList, setNoVideoList] = useState(false)
    const [videoList, setVideoList] = useState([])

     useEffect(() => {
        async function getVideos() {

            if (playlist.length > 0){
                await playlist.forEach(videoId => {
                    fetch(`youtube/playList/${videoId}`)
                   .then(res => res.json())
                   .then(json =>{
                        if(json.success && json.response) {
                            setVideoList.push(json.response.data.items[0])
                         } 
                    })
                }
               )
            }else{
                setNoVideoList(true)
            }
        }
        getVideos()
      }, [playlist]);

      console.log(noVideoList)
      console.log(videoList)
    return (
        <div style={{backgroundColor:"#EEEEEE"}}>
            { noVideoList ? 
            <div>
                <h1>There is no Video in the Playlist</h1>
            </div> :
           <List>
           {videoList.map(video => (
               <ListItem divider button key={video.id.videoId} marginBottom="10px">
                   <Box marginRight="10px">
                       <img src={video.snippet.thumbnails.default.url}/>
                   </Box>
                   <ListItemText
                       primary={parseDOMToString(video.snippet.title)}
                       secondary={
                           <Typography variant="caption" nowrap>{parseDOMToString(video.snippet.description)}</Typography>
                       }
                   />
               </ListItem>
           ))}
       </List>
            }
        </div>
    );
}

export default Playlist;