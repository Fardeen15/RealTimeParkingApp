import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { db, auth } from '../../firebase'

class BookingModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            StartTime: "",
            endTime: "",
            slotNo: this.props.value,
            Area: this.props.Area,
            para: false,
        }
    }
    change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
        }, () => {

            let Statetime = this.state.StartTime.slice(0, 2)
            let bookedtime = this.props.booked.StartTime.slice(0, 2)
            let Statetime1 = this.state.endTime.slice(0, 2)
            let bookedtime1 = this.props.booked.endTime.slice(0, 2)

            let statemint = this.state.StartTime.slice(3, 5)
            let bookedmint = this.props.booked.StartTime.slice(3, 5)
            let statemint1 = this.state.endTime.slice(3, 5)
            let bookedmint1 = this.props.booked.endTime.slice(3, 5)
            // if (val === "StartTime") {
            //     if (`${this.state.date}${this.state.StartTime}` === `${this.props.booked.date}${this.props.booked.StartTime}`
            //         || `${this.state.date}${Statetime}` === `${this.props.booked.date}${bookedtime}`
            //         || `${this.state.date}${Statetime}${statemint}` > `${this.props.booked.date}${bookedtime}${bookedmint}`
            //         && `${this.state.date}${Statetime}${statemint}` < `${this.props.booked.date}${bookedtime1}${bookedmint1}`) {
            //         this.setState({
            //             para: true
            //         })
            //     } else {
            //         this.setState({
            //             para: false
            //         })
            //     }
            // }
            if (val === "endTime") {
                if (`${this.state.date}${this.state.endTime}` === `${this.props.booked.date}${this.props.booked.endTime}`
                    || `${this.state.date}${this.state.endTime}` === `${this.props.booked.date}${this.props.booked.StartTime}`
                    || `${this.state.date}${Statetime1}` === `${this.props.booked.date}${bookedtime1}`
                    || `${this.state.date}${Statetime}${statemint}` > `${this.props.booked.date}${bookedtime}${bookedmint}`
                    && `${this.state.date}${Statetime}${statemint}` < `${this.props.booked.date}${bookedtime1}${bookedmint1}`
                    || `${this.state.date}${Statetime1}${statemint1}` > `${this.props.booked.date}${bookedtime}${bookedmint}`
                    && `${this.state.date}${Statetime1}${statemint1}` < `${this.props.booked.date}${bookedtime1}${bookedmint1}`) {
                    console.log(this.state.date, this.props.booked.date)
                    this.setState({
                        para: true
                    })
                } else {
                    this.setState({
                        para: false
                    })
                }
            }
        })
    }
    booked = () => {
        let obj = {
            date: this.state.date,
            StartTime: this.state.StartTime,
            endTime: this.state.endTime,
            slotNo: this.props.value,
            Area: this.props.Area
        }

        db.ref().child('bookedSlots').child(this.props.Area).child(`${obj.date}${obj.endTime}`).set(obj).then(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    db.ref().child('users').child(user.uid).child('BookingDetails').child(`${obj.date}${obj.endTime}`).set(obj)
                }
            })
            this.props.close()
        })
    }
    render() {
        return (
            // <h1>hello</h1>
            <Modal
                show={this.props.modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>SLot no</Form.Label>
                            <Form.Control value={this.state.slotNo} disabled />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Area</Form.Label>
                            <Form.Control value={this.state.Area} disabled />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>date</Form.Label>
                            <Form.Control value={this.state.date} onChange={(ev) => this.change(ev, "date")} type="date" />
                        </Form.Group>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>starting time</Form.Label>
                                <Form.Control disabled={this.state.para ? true : false} value={this.state.StartTime} onChange={(ev) => this.change(ev, "StartTime")} type="time" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Ending time</Form.Label>
                                <Form.Control disabled={this.state.para ? true : false} value={this.state.endTime} onChange={(ev) => this.change(ev, "endTime")} type="time" />
                            </Form.Group>
                        </Form.Row>
                        {this.state.para ?
                            <div>
                                <p style={{ color: "red" }}>this slot bokked for today {this.props.booked.date} {this.props.booked.StartTime} at {this.props.booked.endTime} <button onClick={() => {
                                    this.setState({
                                        para: false,
                                        StartTime: "",
                                        endTime: "",

                                    })
                                }}>OK</button></p>
                            </div>
                            : null}



                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.booked} varient="info">Booked</Button>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default BookingModal