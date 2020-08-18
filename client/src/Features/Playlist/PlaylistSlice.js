import {createSlice} from '@reduxjs/toolkit';
import {PlaylistConstants, getRandomInt} from '../../Utility/Constants';

const storedPlaylist = localStorage.getItem('playlist');
const parsedPlaylist = (storedPlaylist) ? JSON.parse(storedPlaylist) : [];
// Global STATES
const initialState = {
    playlist: parsedPlaylist,
    alert: false
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
    state.playlist.includes(videoId) ? state.alert = true : state.playlist.push(videoId)
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
}

/**
 * Skip the currently playing music. VideoId in 0 position in
 * playlist array will always be the currently playing music.
 * Skipping it will 
 * 
 * Reducer expects 1 argument from payload: 0 (Next) or 1 (Previous)
 * @param {*} state 
 * @param {*} action 
 */
const skipMusicInPlaylistReducer = function(state, action) {
    if(action.payload === PlaylistConstants.NEXT) {
        state.playlist.push(state.playlist.shift()) // Move first item at the last position
    }else if(action.payload === PlaylistConstants.PREVIOUS) {
        state.playlist.unshift(state.playlist.pop()) // Move last item at the first position
    }
}

const shuffledNextInPlaylistReducer = function(state, action) {
    var randomIndex = getRandomInt(1, state.playlist.length - 2)
    state.playlist.push(state.playlist.shift()) // Move first item at the last position
    state.playlist.unshift(state.playlist.splice(randomIndex, 1)[0]) // Moves a random item at the first position
}

/**
 * Add videoId to first position of the playlist array
 * 
 * Reducer expects 1 argument from payload: videoId
 * @param {*} state 
 * @param {*} action 
 */
const addMusicToTopPlaylistReducer = function(state, action) {
    const videoId = action.payload
    console.log(videoId)
    if(state.playlist.includes(videoId)) {
        state.playlist.unshift(state.playlist.splice(state.playlist.indexOf(videoId), 1)[0])
    }else {
        state.playlist.unshift(videoId)
    }
}


/**
 * Closing the Alert component
 * 
 * @param {*} state 
 * @param {*} action 
 */
const closeAlertReducer = function(state) {
    state.alert = false
}

// Exports
export const PlaylistSlice = createSlice({
    name: 'Playlist',
    initialState: initialState,
    reducers: {
        addMusicToPlaylist: addMusicToPlaylistReducer,
        removeMusicFromPlaylist: removeMusicFromPlaylistReducer,
        skipMusicInPlaylist: skipMusicInPlaylistReducer,
        addMusicToTopPlaylist: addMusicToTopPlaylistReducer,
        shuffledNextInPlaylist: shuffledNextInPlaylistReducer,
        closeAlert: closeAlertReducer
    }
});

export const selectPlaylist = state => state.playlist.playlist;
export const selectAlert = state => state.playlist.alert

export const {addMusicToPlaylist, removeMusicFromPlaylist, skipMusicInPlaylist, addMusicToTopPlaylist, shuffledNextInPlaylist, closeAlert} = PlaylistSlice.actions;

export default PlaylistSlice.reducer;