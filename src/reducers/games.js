import {GET_GAMES, IS_GAMES_FETCHING} from "./constants";
import {Games} from "../api/games/games-api";

const initialState = {
    allGames: [],
    isGamesFetching: false,
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
        default:
            return state;
    }
}

const getAllGamesAction = (games) => ({type: GET_GAMES, payload: {games}});
const setIsGamesFetching = (isFetching) => ({type: IS_GAMES_FETCHING, payload: {isFetching}});

export const getAllGamesThunk = () => async (dispatch) => {
    try{
        dispatch(setIsGamesFetching(true));
        const response = await Games.getAllGames();
        console.log('response', response);
        dispatch(getAllGamesAction(response.data.payload));
        dispatch(setIsGamesFetching(false));
    }catch(e) {console.log(e)}
}

export const getAllGames = (state) => state.games.allGames;
export const getIsGamesFetching = (state) => state.games.isGamesFetching;
