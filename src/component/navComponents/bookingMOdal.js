import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { db } from '../../firebase'

class BookingModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            StartTime: "",
            endTime: "",
            slotNo: this.props.value,
            Area: this.props.Area
        }
    }
    change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
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
        // console.log(this.props.date)
        db.ref().child('slots').child(this.props.date).on('value', (snap) => {
            var data = snap.val()
            if (!data.bookedSlots) {
                data.bookedSlots = [obj.slotNo]
                db.ref().child('slots').child(this.props.date).set(data)

                console.log(data, "if")
            } else if(data.bookedSlots.length){
                var booked = data.bookedSlots
                booked.push(this.props.value)
                // db.ref().child('slots').child(this.props.date).set(data)
                console.log(booked, "else")
                // db.ref().child('bookedSlots').child(this.props.date).set(data)

            }
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
                                <Form.Control value={this.state.StartTime} onChange={(ev) => this.change(ev, "StartTime")} type="time" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Ending time</Form.Label>
                                <Form.Control value={this.state.endTime} onChange={(ev) => this.change(ev, "endTime")} type="time" />
                            </Form.Group>
                        </Form.Row>




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