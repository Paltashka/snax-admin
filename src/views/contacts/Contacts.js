import React, {useEffect, useState} from "react";
import AllGames from "../tables/ReactBootstrapTable";
import GeneralDetails from "../form-validation/FormValidation";
import PCK from "../chat/Chat";
import {getAllGamesThunk} from "../../reducers/games";
import {useDispatch} from "react-redux";
import Skins from "../Skins";


export default () => {
    const [isSelected, setSelected] = useState(false);
    const [isGames, setGames] = useState(true)
    const [isGeneral, setGeneral] = useState(false);
    const [isSkins, setIsSkins] = useState(false);
    const [isPCK, setPCK] = useState(false);
    const [isRow, setRow] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGamesThunk());
    }, [])

    return (
        <>
            {
                isSelected && <div>
                    <button onClick={() => {
                        setGeneral(true)
                        setGames(false)
                        setPCK(false)
                        setIsSkins(false);
                    }}>General details
                    </button>

                    <button onClick={() => {
                        setGeneral(false)
                        setGames(false)
                        setPCK(false)
                        setIsSkins(true);
                    }}>Skins</button>


                    <button onClick={() => {
                        setPCK(true)
                        setGames(false);
                        setIsSkins(false);
                        setGeneral(false)
                    }}>PCK
                    </button>
                    <button onClick={() => {
                        setGeneral(false)
                        setGames(true)
                        setPCK(false)
                        setIsSkins(false);
                    }}>Games
                    </button>
                </div>
            }
            {
                isGames && <AllGames setRow={setRow} setSelected={setSelected}/>
            }
            {
                isGeneral && <GeneralDetails isRow={isRow}/>
            }
            {
                isSkins && <Skins />
            }
            {
                isPCK && <PCK/>
            }
        </>
  );

};
