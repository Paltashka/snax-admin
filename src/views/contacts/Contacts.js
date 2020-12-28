import React from "react";
import AllGames from "../tables/ReactBootstrapTable";
import GeneralDetails from "../form-validation/FormValidation";
import PCK from "../chat/Chat";



export default () => {



  return (
    <>
      <div>
        <button>General details</button>
        <button>Skins</button>
        <button>PCK</button>
      </div>
    <AllGames/>
    <GeneralDetails/>
    <PCK/>
    </>
  );
};
