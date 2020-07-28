import { configureStore } from '@reduxjs/toolkit';
import PlaylistSpliceReducer from '../Features/Playlist/PlaylistSlice'

export default configureStore({
    reducer: {
        playlist: PlaylistSpliceReducer
    }
});