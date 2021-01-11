import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://admin-snax-node.herokuapp.com/api/v1/'
});

export const Games = {
    //General
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

    //Skins
    getAllSkins(skin){
        return instance.get('games/getSkinsByGameId/3')
    },

    //PCK
    getAllPCK(pck){
        return instance.get('games/getBuildsByGameId/42')
    }
};
