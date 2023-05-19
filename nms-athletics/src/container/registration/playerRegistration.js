import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./registration.scss";
import { U_12_TIME, U_14_TIME, U_17_TIME, U_19_TIME, initPlayerData, EVENTS } from '../../config/constants';
import { formatAppDate } from '../../config/utils';
import Alert from 'react-bootstrap/Alert';

function PlayerRegistration() {

  const [playerObj, setPlayerObj] = useState(initPlayerData);
  const [eventList, setEventList] = useState(initPlayerData.events)

  useEffect(() => {
    console.log('playerObj', playerObj)

  })

  const dateChage = (e) => {
    var d1 = new Date(e.target.value);
    const time = d1.getTime();
    let tempObj = playerObj;
    
      if (time > U_12_TIME) {
        EVENTS.U_12.map((tempEvent) => {
          tempEvent.selection = false;
          tempEvent.disable = false;
        })
        setPlayerObj({ ...playerObj, dob: e.target.value, playerCategory: "U_12", events: EVENTS.U_12, selectedEvents:[] });
      }else if (time > U_14_TIME && time < U_12_TIME) {
        EVENTS.U_14.map((tempEvent) => {
          tempEvent.selection = false;
          tempEvent.disable = false;
        })
        setPlayerObj({ ...playerObj, dob: e.target.value, playerCategory: "U_14", events: EVENTS.U_14, selectedEvents:[] });
      }else if (time > U_17_TIME && time < U_14_TIME) {
        EVENTS.U_17.map((tempEvent) => {
          tempEvent.selection = false;
          tempEvent.disable = false;
        })
        setPlayerObj({ ...playerObj, dob: e.target.value, playerCategory: "U_17", events: EVENTS.U_17, selectedEvents:[] });
      }else if (time > U_19_TIME && time < U_17_TIME) {
        EVENTS.U_19.map((tempEvent) => {
          tempEvent.selection = false;
          tempEvent.disable = false;
        })
        setPlayerObj({ ...playerObj, dob: e.target.value, playerCategory: "U_19", events: EVENTS.U_19, selectedEvents:[] });
      }
   
   
  }
  const submit = () => {
    console.log('playerObj', playerObj)
  }
  const eventChange = (e, eIndex, event) =>{
    let tempObj = playerObj;
    if(!e.target.checked){
      tempObj.events[eIndex].selection = e.target.checked;
      const index = tempObj.selectedEvents.findIndex((exEvent)=> event.id === exEvent.id)
      tempObj.selectedEvents.splice(index,1);
      tempObj.events.map((eve)=>{
        eve.disable = false
      })

    } else {
      if(playerObj.selectedEvents.length < 2){
        tempObj.selectedEvents.push(event);
        tempObj.events[eIndex].selection = e.target.checked;
          if(tempObj.selectedEvents.length >= 2){
            tempObj.events.map((eve)=>{
              if(!eve.selection){
                eve.disable = true;
              }
              
            })
          }

      }

    }    
    setPlayerObj({...playerObj, ...tempObj})
  }

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Player Name</Form.Label>
          <Form.Control type="text" placeholder="Enter palyer Name" value={playerObj.name}
            onChange={(e) => { setPlayerObj({ ...playerObj, name: e.target.value }) }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar Number</Form.Label>
          <Form.Control type="number" placeholder="Player Aadhar Number" value={playerObj.adharNumber}
            onChange={(e) => { setPlayerObj({ ...playerObj, adharNumber: e.target.value }) }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Club/Scholl Name</Form.Label>
          <Form.Control type="text" placeholder="Enter palyer Club/Scholl Name" value={playerObj.clubName}
            onChange={(e) => { setPlayerObj({ ...playerObj, clubName: e.target.value }) }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="DOB as per Aadhar card" value={playerObj.dob}
            onChange={(e) => { dateChage(e) }}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="gender">
          <Form.Label>Gender : </Form.Label>
          <Form.Check
            inline
            label="MALE"
            name="group1"
            type={"radio"}
            id={`inline-${"Male"}-2`}
            onClick={() => { setPlayerObj({ ...playerObj, gender: "MALE" }) }}
          />
          <Form.Check
            inline
            label="FEMALE"
            name="group1"
            type={"radio"}
            onClick={() => { setPlayerObj({ ...playerObj, gender: "FEMALE" }) }}
            id={`inline-${'FeMale'}-2`}
          />
        </Form.Group>

      </Row>

      <Alert variant={"primary"}>
          <div>01/01/2011 After Born U_12</div>
          <div>01/01/2009 After Born U_14</div>
          <div>01/01/2006 After Born U_17</div>
          <div>01/01/2004 After Born U_19</div>
        </Alert>


      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label className='player-category'> Player Category:: </Form.Label>
        <Form.Label className='player-category-selection'> {playerObj.playerCategory} </Form.Label>
      </Form.Group>

      <Row className="mb-3">
        <Col sm={{ span: 10, offset: 1 }}>
          {
            playerObj.events.map((event, eIndex) => {
              return (
                <Form.Check index={eIndex} label={event.eventName} checked={event.selection}
                  disabled={event.disable} type="checkbox" onChange={(e) => { eventChange(e, eIndex, event) }} />

              )

            })
          }
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>UPI Number</Form.Label>
          <Form.Control type="number" placeholder="Google-Pay/PhonePee/Paytm" value={playerObj.upi}
            onChange={(e) => { setPlayerObj({ ...playerObj, upi: e.target.value }) }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contact Mobile</Form.Label>
          <Form.Control type="number" placeholder="Mobile Number" value={playerObj.mobile}
            onChange={(e) => { setPlayerObj({ ...playerObj, mobile: e.target.value }) }}
          />
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit" onClick={() => { submit() }}>
        Submit
      </Button>
    </Form>
  );
}

export default PlayerRegistration;