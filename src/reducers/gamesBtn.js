import {GET_ALL_ID, GET_GAMES, IS_GAMES_FETCHING, GAMES_BTN, SET_GAMES_BTN, SET_GAMES_BTN_SELECTED} from "./constants";
import {Games} from "../api/games/games-api";

const initialState = {
    isSelected: false,
    isGames: true,
    isGeneral: false,
    isSkins: false,
    isPCK: false,
};

export default function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case SET_GAMES_BTN:
            return payload;
        case SET_GAMES_BTN_SELECTED:
            return {
                ...state,
                isSelected: payload,
            }
        default:
            return state;
    }
}

export const setGamesBtnAction = (gamesBtn) => ({type: SET_GAMES_BTN, payload: gamesBtn});
export const setGamesBtnSelectedAction = (value) => ({type: SET_GAMES_BTN_SELECTED, payload: value});

export const getAllGamesBtn = (state) => state.gamesBtn;

