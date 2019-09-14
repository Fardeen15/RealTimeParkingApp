import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { auth, db } from '../../firebase';

class AddAreaAndSlots extends React.Component {
    constructor() {
        super()
        this.state = {
            Area: "",
            SlotsQuantity: "",
            Timing: "",
        }
    }
    change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
        })
    }
    addSlots = (event) => {
        event.preventDefault()
        var obj = {
            area: this.state.Area,
            slots: this.state.SlotsQuantity,
            timing: this.state.Timing
        }
        var date = new Date()
        var submitDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('slots').child(submitDate).set(obj).then(() => {
                    this.setState({
                        Area: "",
                        SlotsQuantity: "",
                        Timing: ""
                    })
                })
            }
        })
    }

    render() {
        return (
            <div>

                < Card text="white" className="SignInJumbotron" style={{ height: "55vh " ,position:'relative' ,transform:' translate(-50%, 25%)', }} fluid >
                    <Card.Header style={{ textAlign: "center" }}><h3>Add Slots Form</h3></Card.Header>
                    <Card.Body className="addslot">
                        <Form onSubmit={this.addSlots}>
                            <Form.Group as={Row} >
                                <Form.Label column sm={4}>
                                    Area name
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required value={this.state.Area} onChange={(ev) => this.change(ev, "Area")} type="text" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={6}>
                                    Slots Quantity
                        </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required value={this.state.SlotsQuantity} onChange={(ev) => this.change(ev, "SlotsQuantity")} type="text" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Add Slots</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card >

            </div>
        )
    }
}
export default AddAreaAndSlots
