import { reducerCases } from "./Constants";

export const initialState ={
    user:null,
    token:null,
    playlists : [],
    userInfo : null,
    selectedPlaylistId: '0Ryai7BcyDRRJooKqqMIjz',
    selectedPlaylist : null,
    currentlyPlaying: null,
    playerstate : false,

};

//state is what it looks like currently
//and action is set the item into --- with what it currently does.
// Action => type , [payload], payload is what changes
const reducer = (state,action) => {
    switch (action.type){
        case reducerCases.SET_USER:{
            return{
                ...state,
                user:action.user,
            };
        }
        case reducerCases.SET_TOKEN:{
            return{
                ...state,
                token : action.token,
            };
        }
        case reducerCases.SET_PLAYLISTS:{
            return{
                ...state,
                playlists : action.playlists,
            };
        }
        case reducerCases.SET_USER_INFO:{
            return{
                ...state,
                userInfo : action.userInfo,
            };
        }
        case reducerCases.SET_PLAYLIST:{
            return{
                ...state,
                selectedPlaylist : action.selectedPlaylist,
            };
        }
        case reducerCases.SET_PLAYLIST_ID:{
            return {
                ...state,
                selectedPlaylistId : action.selectedPlaylistId,
            };
        } 
        case reducerCases.SET_CURRENTPLAYING:{
            return{
                ...state,
                currentlyPlaying : action.currentlyPlaying,
            };
        }
        case reducerCases.SET_PLAYER_STATE:{
            return{
                ...state,
                playerstate : action.playerstate,
            }
        }
        
            
        default:
            return state;
    }
};

export default reducer;