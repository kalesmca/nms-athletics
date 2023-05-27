import userEvent from "@testing-library/user-event";
import React, { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerList } from '../../redux/actions/players';
import Dropdown from 'react-bootstrap/Dropdown';
import { PopupContext } from "../../config/context";
import { EVENTS } from '../../config/constants';


const PlayerListComponent = () => {
    const playersState = useSelector((state) => state.players)
    const [playerList, setPlayerList] = useState(playersState.playerList);
    const [playerCategory, setPlayerCategory] = useState("ALL")
    const [events, setEvents] = useState([])

    const [selectedEvent, setSelectedEvent] = useState({eventName:"ALL", eventId: "ALL" })
    const { msgPopupFlag, setMsgPopupFlag, navigationPath, setNavigationPath, popupObj, setPopupObj } = useContext(PopupContext)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('appSate:', playersState);
    })
    useEffect(() => {
        dispatch(getPlayerList());
    }, [])
    useEffect(() => {
        setPlayerList(playersState.playerList)
    }, [playersState])
    // useEffect(() => {
    //     setEvents(EVENTS[playerCategory])
    // }, [playerCategory])
    const categoryQuery = (e) => {
        console.log(e);
        setPlayerCategory(e);
        setEvents(EVENTS[e])

    }
    const selectEvent = (event) => {
        console.log(event)
        setSelectedEvent(event);
    }

    const viewPlayer = (player) => {
        setPopupObj({ componentName: "ViewPlayerComponent", props: player, title: player.name })
        setMsgPopupFlag(true)
    }
    return (
        <div>
            {
                   playersState?.authStatus === "ADMIN_ACCESS" || playersState?.authStatus === "SUPER_ADMIN_ACCESS" ? (
                // true ? (
                    <div>PlayerListComponent
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
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { categoryQuery("ALL") }}>"ALL"</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="d-inline mx-2" value={selectedEvent.eventName} >
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    {selectedEvent.eventName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        events.length ? events.map((event, kIndex) => {
                                            return (<Dropdown.Item index={kIndex} value={event.eventName} onClick={(e) => { selectEvent(event) }}>{event.eventName}</Dropdown.Item>)

                                        }) : ""
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item value={"ALL"} onClick={(e) => { selectEvent({eventName:"ALL", eventId: "ALL" }) }}>"ALL"</Dropdown.Item>

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
                                        playerList?.length ? playerList.map((player, pIndex) => {
                                            if ((playerCategory === "ALL" || player.playerCategory === playerCategory) && (selectedEvent.eventId === "ALL" || selectedEvent.eventId == player.selectedEvents[0].eventId || selectedEvent.eventId === player.selectedEvents[1]?.eventId)) {
                                                return (
                                                    <tr key={pIndex} onClick={() => { viewPlayer(player) }}>
                                                        <td>{pIndex + 1}</td>
                                                        <td>{player.name}</td>
                                                        <td>{player.playerCategory}</td>
                                                        <td>Not-yet</td>
                                                        <td>{player.selectedEvents.map((event, eIndex) => {
                                                            return (<div key={eIndex}>{event.eventName}</div>)
                                                        })}</td>
                                                        <td>{player.paymentStatus}</td>
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
