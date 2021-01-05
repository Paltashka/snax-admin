import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://admin-snax-node.herokuapp.com/api/v1/'
});

export const Games = {
    getAllGames() {
        return instance.get('games/');
    },
    getBuildsByGameID() {},
    getNewGameDrafts() {},
    updateGame(game) {
        return instance.post('games/updateGame', game);
    },
    addGame(game) {
        return instance.post('games/', game);
    },

};
