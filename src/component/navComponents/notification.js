import React from 'react'
import { db } from '../../firebase'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Noti extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            keys: []
        }
    }
    data = () => {
        this.setState({
            data: [],
            keys: []
        })
        db.ref().child('notification').on('value', (snap) => {
            if (snap.val()) {

                this.setState({
                    data: Object.values(snap.val()),
                    keys: Object.keys(snap.val())
                })
            }
        })
    }
    Accept = (obj, i) => {
        var val = obj;

        db.ref().child('users').child(this.state.keys[i]).child('BookingDetails').child(Object.keys(obj)[i]).set(Object.values(obj)[i]).then(() => {
            db.ref().child('notification').child(this.state.keys[i]).child(Object.keys(obj)[i]).remove().then(() => {
            })
        })
        // console.log(Object.keys(obj)[i],i)
    }
    componentWillMount() {
        this.data()
    }
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center", fontFamily: 'cursive' }}>Users</h1>

                {this.state.data.length ?
                    this.state.data.map((values, index) => {
                        return (
                            Object.values(values).map((val, i) => {
                                // console.log(this.state.keys[i],values)
                                console.log(val)
                                return (
                                    <Card bg="dark" text="white" key={i} style={{ width: '30%' }}>
                                        <Card.Header>User {i + 1} Booking Detail</Card.Header>
                                        <Card.Body>
                                            {/* <Card.Title>{val.Area}</Card.Title> */}
                                            <Card.Text>
                                                {val.date} Area {val.Area} Slot No {val.slotNo} Booking Timing {val.StartTime} To {val.endTime}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer><Button onClick={() => { this.Accept(values, i) }}>Approved</Button></Card.Footer>
                                    </Card>
                                )
                            })
                        )
                    })
                    : null}
            </div >
        )
    }
}
export default Noti