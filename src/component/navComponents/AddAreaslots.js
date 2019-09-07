import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
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
            <div className="SlotAdd">
                <Form onSubmit={this.addSlots}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Area name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control required value={this.state.Area} onChange={(ev) => this.change(ev, "Area")} type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Slots Quantity
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control required value={this.state.SlotsQuantity} onChange={(ev) => this.change(ev, "SlotsQuantity")} type="text" />
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                                Timing
                        s</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    onChange={(ev) => this.change(ev, "Timing")}
                                    label="11am to 11pm"
                                    value="11am to 11pm"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    label="7am to 9pm"
                                    value="7am to 9pm"
                                    onChange={(ev) => this.change(ev, "Timing")}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                                <Form.Check
                                    type="radio"
                                    label="24 hours"
                                    value="24 hours"
                                    onChange={(ev) => this.change(ev, "Timing")}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios3"
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Add Slots</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
export default AddAreaAndSlots