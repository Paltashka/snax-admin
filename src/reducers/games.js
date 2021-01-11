import {GET_ALL_ID, GET_GAMES, GET_SKINS, IS_GAME_ADDING, IS_GAME_UPDATING, IS_GAMES_FETCHING, GET_PCK} from "./constants";
import {Games} from "../api/games/games-api";

const initialState = {
    allGames: [],
    isGamesFetching: false,
    isGameUpdating: false,
    isGameAdding: false,
    allSkins: [],
    allPCK: []
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
        case GET_SKINS:
            return {
                ...state,
                allSkins: payload.skins
            }
        case GET_PCK:
            return {
                ...state,
                allPCK: payload.pck
            }
        default:
            return state;
    }
}

const getAllGamesAction = (games) => ({type: GET_GAMES, payload: {games}});
const setIsGamesFetching = (isFetching) => ({type: IS_GAMES_FETCHING, payload: {isFetching}});
const isGameUpdating = (isUpdating) => ({type: IS_GAME_UPDATING, payload: {isUpdating}});
const isGameAdding = (isAdding) => ({type: IS_GAME_ADDING, payload: {isAdding}});

const getAllSkinsAction = skins => ({type: GET_SKINS, payload: {skins}});

const getAllPCKAction = pck => ({type: GET_PCK, payload: {pck}});

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
export const addGameThunk = (game) => async (dispatch) => {
    try{
        dispatch(isGameAdding(true));
        const response = await Games.addGame(game)
        if(response.status === 200) {
            dispatch(getAllGamesThunk());
        }
    }
    catch(e){console.log(e);} finally{
        dispatch(isGameUpdating(false));
    }
}

export const getAllSkinsThunk = skins => async (dispatch) => {
    try{
        const response = await Games.getAllSkins();
        dispatch(getAllSkinsAction(response.data.payload));
    }catch (e) {
        console.log(e)
    }
}

export const getAllPCKThunk = pck => async (dispatch) => {
    try{
        const response = await Games.getAllPCK();
        dispatch(getAllPCKAction(response.data.payload));
    }catch (e) {
        console.log(e)
    }
}

export const getAllGames = (state) => state.games.allGames;
export const getIsGamesFetching = (state) => state.games.isGamesFetching;
export const getIsGameUpdating = (state) => state.games.isGameUpdating;
export const getIsGameAdding = (state) => state.games.isGameAdding;
export const getAllSkins = state => state.games.allSkins;
export const getAllPCK = state => state.games.allPCK;
