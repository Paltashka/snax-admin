// import { ADD_LOGIN_FORM_DATA, SUCCESS } from "../actionTypes"

export const addDataFromGames = (data) => {
    localStorage.setItem('loginFormData', JSON.stringify(data))
    return {
        type: 'ADD_DATA_GAMES',
        payload: data,
    }
}
