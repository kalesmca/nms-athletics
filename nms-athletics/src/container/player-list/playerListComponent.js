import userEvent from "@testing-library/user-event";
import React,{useState, useEffect, useRef} from "react";
import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayerList} from '../../redux/actions/players';
import Dropdown from 'react-bootstrap/Dropdown';


const PlayerListComponent = () => {
    const playersState = useSelector((state)=> state.players)
    const [playerList, setPlayerList] = useState(playersState.playerList)
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('appSate:',playersState);
    })
    useEffect(()=>{
        dispatch(getPlayerList());
    }, [])
    useEffect(()=>{
        setPlayerList(playersState.playerList)
    },[playersState])
    const categoryQuery = (e) =>{
        console.log(e);
        setPlayerCategory(e);

    }
    const [playerCategory, setPlayerCategory] = useState("ALL")
    return (
        <div>
            {
               playersState?.authStatus === "ADMIN_ACCESS" || playersState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                    <div>PlayerListComponent
                    <div>
                    <Dropdown className="d-inline mx-2" value = {playerCategory} >
                <Dropdown.Toggle id="dropdown-autoclose-true">
                {playerCategory}
                </Dropdown.Toggle>
        
                <Dropdown.Menu>
                  <Dropdown.Item value= {"U_12"} onClick={(e)=>{categoryQuery("U_12")}}>"U_12"</Dropdown.Item>
                  <Dropdown.Item value= {"U_14"} onClick={(e)=>{categoryQuery("U_14")}}>"U_14"</Dropdown.Item>
                  <Dropdown.Item value= {"U_17"} onClick={(e)=>{categoryQuery("U_17")}}>"U_17"</Dropdown.Item>
                  <Dropdown.Item value= {"U_19"} onClick={(e)=>{categoryQuery("U_19")}}>"U_19"</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item value= {"ALL"} onClick={(e)=>{categoryQuery("ALL")}}>"ALL"</Dropdown.Item>
        
                </Dropdown.Menu>
              </Dropdown>
                    </div>
                    <div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Chest No</th>
                                    <th>Events</th>
                                    <th>Pay Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    playerList?.length ? playerList.map((player, pIndex) =>{
                                        if(playerCategory === "ALL" || player.playerCategory === playerCategory) {
                                            return(
                                                <tr key={pIndex}>
                                                    <td>{pIndex+1}</td>
                                                    <td>{player.name}</td>
                                                    <td>{player.playerCategory}</td>
                                                    <td>Not-yet</td>
                                                    <td>{player.selectedEvents.map((event, eIndex)=>{
                                                        return(<div key={eIndex}>{event.eventName}</div>)
                                                    })}</td>
                                                    <td>PENDING</td>
                                                </tr>
                                            )
                                        }
                                        
                                    }) : <tr>
                                        <td colSpan={6}> No Data Found</td>
                                    </tr>
                                }
                                
                            </tbody>
                        </Table>
                    </div>
                </div>
                ):""
            }

        </div>
       
    )
}

export default PlayerListComponent;
