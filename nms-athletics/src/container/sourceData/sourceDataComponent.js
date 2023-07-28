import React from "react";
import {useSelector} from 'react-redux';

const SourceDataComponent = () =>{
    const playersState = useSelector((state)=> state.players)
    return(
        <div>
            SourceDataComponent
            <div>
                {JSON.stringify(playersState.playerList)}
            </div>
        </div>
    )
}

export default SourceDataComponent