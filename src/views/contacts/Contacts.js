import React, {useEffect, useState} from "react";
import AllGames from "../tables/ReactBootstrapTable";
import GeneralDetails from "../form-validation/FormValidation";
import PCK from "../chat/Chat";
import {getAllGamesThunk} from "../../reducers/games";
import {useDispatch} from "react-redux";



export default () => {

const [isSelected, setSelected] = useState(false);
const [isGames, setGames] = useState(true)
const [isGeneral, setGeneral] = useState(false);
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
          <button className="btn-nav" onClick={() => {
            setGeneral(true)
            setGames(false)
            setPCK(false)
          }}>General details</button>

          <button className="btn-nav">Skins</button>

          <button className="btn-nav" onClick={() => {
            setPCK(true)
            setGames(false)
            setGeneral(false)
          }}>PCK</button>
         <button className="btn-nav" onClick={() => {
           setGeneral(false)
           setGames(true)
           setPCK(false)
         }}>Games</button>
        </div>
      }
      {
        isGames &&  <AllGames setRow={setRow} setSelected={setSelected} />
      }
      {
        isGeneral && <GeneralDetails isRow={isRow} />
      }
      {
        isPCK && <PCK/>
      }
    </>
  );
};
