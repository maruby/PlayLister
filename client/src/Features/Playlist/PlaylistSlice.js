import {createSlice} from '@reduxjs/toolkit';

const storedPlaylist = localStorage.getItem('playlist');
const parsedPlaylist = (storedPlaylist) ? JSON.parse(storedPlaylist) : [];
// Global STATES
const initialState = {
    playlist: parsedPlaylist
}


// REDUCERS
// Put reducers here and add them afterwards in the slice
// Never forget to add docs to your reducers

/**
 * Add music to playlist. This will add music to redux global
 * variable playlist. Strictly add only music IDs of youtube
 * videos.
 * 
 * Reducer expects 1 argument from payload: videoId
 * @param {*} state 
 * @param {*} action 
 */
const addMusicToPlaylistReducer = function (state, action) {
    const videoId = action.payload;
    state.playlist.push(videoId);
    localStorage.setItem('playlist', JSON.stringify(videoId));
}

/**
 * Remove music from playlist. Will remove music based on its
 * value. Method will loop around state.playlist and remove
 * if videoId is equal.
 * 
 * Reducer expects 1 argument from payload: videoId
 * @param {*} state 
 * @param {*} action 
 */
const removeMusicFromPlaylistReducer = function(state, action) {
    const videoId = action.payload;
    state.playlist.forEach( (value, index) => {
        if(value === videoId) state.playlist.splice(index, 1);
    });
    localStorage.setItem('playlist', JSON.stringify(state.playlist));
}


// Exports
export const PlaylistSlice = createSlice({
    name: 'Playlist',
    initialState: initialState,
    reducers: {
        addMusicToPlaylist: addMusicToPlaylistReducer,
        removeMusicFromPlaylist: removeMusicFromPlaylistReducer
    }
});

export const selectPlaylist = state => state.playlist.playlist;

export const {addMusicToPlaylist, removeMusicFromPlaylist} = PlaylistSlice.actions;

export default PlaylistSlice.reducer;