import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.216.83.82:3000/api/v1/'
});

export const Games = {
    getAllGames() {
        return instance.get('games/');
    },
    getBuildsByGameID() {},
    getNewGameDrafts() {},
    addGame() {},
};
