import userEvent from "@testing-library/user-event";
import React, { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../redux/actions/players';
import Dropdown from 'react-bootstrap/Dropdown';
import { PopupContext } from "../../config/context";
import { EVENTS, PAYMENT_STATUS } from '../../config/constants';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import { JsonToExcel } from "react-json-to-excel";
import { db } from "../../firebase-config";
import Button from 'react-bootstrap/Button';
import { exportToExcel } from 'react-json-to-excel';


import {DB} from '../../config/constants';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const initEvent = { eventName: "ALL", eventId: "ALL" };
const PlayerListComponent = () => {
    const playersState = useSelector((state) => state.players)
    const [playerList, setPlayerList] = useState(playersState.playerList);
    const [playerCategory, setPlayerCategory] = useState("ALL")
    const [events, setEvents] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("ALL")

    const [selectedEvent, setSelectedEvent] = useState(initEvent)
    const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext)
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('appSate:', playersState);
        console.log("filter players :", filteredPlayerList);

    })
    useEffect(() => {
        dispatch(getPlayerList());
        
    }, [])
    useEffect(() => {
        // setPlayerList(playersState.playerList);
        getChestNumber(playersState.playerList)
    }, [playersState])
    // useEffect(() => {
    //     setEvents(EVENTS[playerCategory])
    // }, [playerCategory])
    const categoryQuery = (e) => {
        console.log(e);
        setPlayerCategory(e);
        setSelectedEvent(initEvent)
        setEvents(EVENTS[e])

    }
    const selectEvent = (event) => {
        console.log(event)
        setSelectedEvent(event);
    }

    const viewPlayer = (player) => {
        setPopupObj({ componentName: "EditPlayerComponent", playerData: player, title: player.name })
        setMsgPopupFlag(true)
    }

    const getQueryValidation = (player) => {
        let searchKeyFlag = true;
        searchKeyFlag = !searchKey ? true : (player.name.toLowerCase().includes(searchKey.toLowerCase()) || player.upi.toLowerCase().includes(searchKey.toLowerCase()) || player.mobile.toLowerCase().includes(searchKey.toLowerCase()) 
                        || player.clubName.toLowerCase().includes(searchKey.toLowerCase())) ? true : false;
        if ((playerCategory === "ALL" || player?.playerCategory === playerCategory) &&
            (selectedEvent?.eventId === "ALL" || selectedEvent?.eventId == player?.selectedEvents[0]?.eventId || selectedEvent?.eventId === player.selectedEvents[1]?.eventId) &&
            (searchKeyFlag) &&
            (paymentStatus === "ALL" || player.paymentStatus === paymentStatus)
        ) {
            return true;
        } else {
            return false
        }


    }
    
    const editPlayer = (player) =>{
        setPopupObj({ componentName: "ViewPlayerComponent", props: player, title: player.name })
        setMsgPopupFlag(true)
    }
    const deletePlayer = (player) =>{
        // const userDoc = doc(db, DB.players, player.id);
        // deleteDoc(userDoc);
        
        // setTimeout(()=>{
        //     dispatch(getPlayerList());
        // },1000)

    }
    let tableIndex = 0;
    let filteredPlayerList = [];
    let excluedList = [87,88,94,95,104,105,106,107,108,109,110,111,112,113,114,115,116,117,126,134,140,141,142,143,144,145,146,151,162,163,164,165,184,188,189,190,191,192,193,194,195,196,214,218,234,253,254,255,256,257,258,274,293,294,
        295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,321,322,323,325,327,333,336,339,343,905,933,934,935,936,937,943,989,998,999]
    let chestNumbers = 0;
    let nmsChestNumber=900;
    // const incrementOne = (number) => {
    //     return number+1
    // }
    const getChestNumber = (dataList) =>{
        let newObj = {};
        let newList = [];
        dataList.map((data)=>{
            
            if(newObj.hasOwnProperty(data.paymentStatus)){
                newObj[data.paymentStatus] = [...newObj[data.paymentStatus],...[data]] 
            } else {
                newObj[data.paymentStatus] = [data];
            }
        })
        Object.keys(newObj).map((key) =>{
            newList = [...newList, ...newObj[key]];

        })
        newList.forEach(data => {
            
            
            
            
            if(data.paymentStatus === "PAYMENT_VERIFIED" || data.paymentStatus === "SHIVA" || data.paymentStatus === "RAVI" || data.paymentStatus === "CASH" ){
                chestNumbers = chestNumbers +1;
                while(excluedList.includes(chestNumbers)){
                    chestNumbers = chestNumbers+1;
                }

                data.chestNumber = chestNumbers; 
            }
            else if(data.paymentStatus === "NMS"){
                nmsChestNumber= nmsChestNumber + 1;
                while(excluedList.includes(nmsChestNumber)){
                    nmsChestNumber = nmsChestNumber+1;
                } 
                data.chestNumber = nmsChestNumber; 
            } else {
                data.chestNumber = "NO";
            }
            
        });
        console.log("newObj",newObj)
        console.log("newList",newList);

        setPlayerList(newList);

    }
    return (
        <div>
            {
                playersState?.authStatus === "ADMIN_ACCESS" || playersState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                    // true ? (
                    <div>
                        {/* <div> 
                        <JsonToExcel
                                title="Download as Excel"
                                data={playerList}
                                fileName="sample-file"
                            />
                        </div> */}
                        <Form >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">

                                    <Form.Control type="text" placeholder="Search By Player Name" value={searchKey}
                                        onChange={(e) => { setSearchKey(e.target.value) }}
                                    />

                                </Form.Group>


                            </Row>
                        </Form>
                        <div>
                            <Dropdown className="d-inline mx-2" value={playerCategory} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {playerCategory}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        Object.keys(EVENTS).map((key, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={key} onClick={(e) => { categoryQuery(key) }}>{key}</Dropdown.Item>)

                                        })
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { categoryQuery("ALL") }}>ALL</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            {
                                events?.length ? (<Dropdown className="d-inline mx-2" value={selectedEvent.eventName} >
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                        {selectedEvent.eventName}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            events.map((event, kIndex) => {
                                                return (<Dropdown.Item index={kIndex} value={event.eventName} onClick={(e) => { selectEvent(event) }}>{event.eventName}</Dropdown.Item>)

                                            })
                                        }

                                        <Dropdown.Divider />
                                        <Dropdown.Item value={"ALL"} onClick={(e) => { selectEvent({ eventName: "ALL", eventId: "ALL" }) }}>ALL</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>) : ""
                            }

                            <Dropdown className="d-inline mx-2" value={paymentStatus} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {paymentStatus}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        PAYMENT_STATUS.map((status, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={status} onClick={(e) => { setPaymentStatus(status) }}>{status}</Dropdown.Item>)

                                        })
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { setPaymentStatus("ALL") }}>ALL</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="primary" onClick={()=>{exportToExcel(filteredPlayerList, 'filteredList')}}>Download</Button>

                        </div>
                        
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Chest No</th>
                                        <th>ClubName</th>
                                        <th>Events</th>
                                        <th>Pay Status</th>
                                        <th>Created_ON</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        playerList?.length ? playerList.map((player, pIndex) => {
                                            
                                            if (getQueryValidation(player)) {
                                                tableIndex = tableIndex +1;
                                                filteredPlayerList = [...filteredPlayerList, ...[player]]
                                                return (
                                                    <tr key={pIndex} 
                                                    // onClick={() => { editPlayer(player) }}
                                                    >
                                                        <td>{tableIndex}</td>
                                                        <td>{player.name}</td>
                                                        <td>{player.playerCategory}</td>
                                                        <td>{player.chestNumber}</td>
                                                        <td>{player.clubName}</td>
                                                        {
                                                            player?.selectedEvents?.length ? 
                                                            (<td>{player?.selectedEvents.map((event, eIndex) => {
                                                                return (<div key={eIndex}>{event.eventName}</div>)
                                                            })}</td>) : ""
                                                        }
                                                        
                                                        <td>{player.paymentStatus}</td>
                                                        <td>{player.createdOn}</td>
                                                        {/* <td><button onClick={()=>{viewPlayer(player)}}>Edit</button></td> */}
                                                        {
                                                            playersState?.authStatus === "SUPER_ADMIN_ACCESS" && (
                                                                    <td>
                                                                        <Button variant="primary" onClick={()=>{editPlayer(player)}}>Payment Update</Button>
                                                                    </td>
                                                            )
                                                        }


                                                        
                                                        {/* <td><button onClick={()=>{deletePlayer(player)}}>Delete</button></td> */}
                                                        
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
                ) : ""
            }

        </div>

    )
}

export default PlayerListComponent;
