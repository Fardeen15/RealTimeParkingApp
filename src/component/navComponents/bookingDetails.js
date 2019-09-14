import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { auth, db } from '../../firebase'
class BookingDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      areaName: "",
    }
  }
  data = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref().child('users').child(user.uid).child('BookingDetails').on('value', (snap) => {
          if (snap.val()) {
            this.setState({
              data: Object.values(snap.val())
            })
          }
        })
      }
    })
  }
  componentWillMount() {
    this.data()
  }
  render() {
    return (

      this.state.data.length ?
        this.state.data.map((value, index) => {
          return (
            <Accordion key = {index} defaultActiveKey={index}>
              <Card style = {{background:"none"}}>
                {/* <Card.Header> */}

                  <Accordion.Toggle style = {{cursor : "pointer"}}as={Card.Header} eventKey={value.Area,value.slotNo}>
                   Area : {value.Area} slot No : {value.slotNo}
                  </Accordion.Toggle>
                {/* </Card.Header> */}
                <Accordion.Collapse eventKey={value.Area,value.slotNo}>
                  <Card.Body> 
                        <div>
                          <p>
                            <b>Area</b> : {value.Area}<br/>
                            <b>Slot NO</b> : {value.slotNo}<br/>
                            <b>Date</b> : {value.date}<br/>
                            <b>Timing</b> : {value.StartTime} To {value.endTime}<br/>
                          </p>
                        </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

            </Accordion>
          )
        })
        : null

    )
  }
}
export default BookingDetails