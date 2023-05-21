import {UPDATE_PLAYERS} from '../../config/actions';


const initState = {
        playerList: []
}

const players = (state=initState, action) =>{
    switch(action.type) {
        
        case UPDATE_PLAYERS :{
            return {...state, playerList:action.data}
        }
        
        default :{
            return { ...state}
        }
    }

}

export default players;