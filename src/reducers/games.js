import {GET_ALL_ID, GET_GAMES, IS_GAME_ADDING, IS_GAME_UPDATING, IS_GAMES_FETCHING} from "./constants";
import {Games} from "../api/games/games-api";

const initialState = {
    allGames: [],
    isGamesFetching: false,
    isGameUpdating: false,
    isGameAdding: false,
};

export default function reducer(state = initialState, {type, payload}) {
    switch(type) {
        case GET_GAMES:
            return {
                ...state,
                allGames: payload.games
            }
        case IS_GAMES_FETCHING:
            return {
                ...state,
                isGamesFetching: payload.isFetching
            }
        case IS_GAME_UPDATING:
            return {
                ...state,
                isGameUpdating: payload.isUpdating
            }
        case IS_GAME_ADDING:
            return {
                ...state,
                isGameAdding: payload.isAdding
            }
        default:
            return state;
    }
}

const getAllGamesAction = (games) => ({type: GET_GAMES, payload: {games}});
const setIsGamesFetching = (isFetching) => ({type: IS_GAMES_FETCHING, payload: {isFetching}});
const isGameUpdating = (isUpdating) => ({type: IS_GAME_UPDATING, payload: {isUpdating}});
const isGameAdding = (isAdding) => ({type: IS_GAME_ADDING, payload: {isAdding}});


export const getAllGamesThunk = () => async (dispatch) => {
    try{
        dispatch(setIsGamesFetching(true));
        const response = await Games.getAllGames();
        dispatch(getAllGamesAction(response.data.payload));
        dispatch(setIsGamesFetching(false));
    }catch(e) {console.log(e)}
}
export const updateGameThunk = (body) => async (dispatch) => {
    try{
        dispatch(isGameUpdating(true));
        const response = await Games.updateGame(body);
        if(response.status === 200) {
            dispatch(getAllGamesThunk());
        }
    }catch(e) {console.log(e);}finally{
        dispatch(isGameUpdating(false));
    }
}
export const addGameThunk = (body) => async (dispatch) => {
    try{
        dispatch(isGameAdding(true));
        //request api

    }
    catch(e){console.log(e);} finally{
        dispatch(isGameUpdating(false));
    }
}

export const getAllGames = (state) => state.games.allGames;
export const getIsGamesFetching = (state) => state.games.isGamesFetching;
export const getIsGameUpdating = (state) => state.games.isGameUpdating;
export const getIsGameAdding = (state) => state.games.isGameAdding;