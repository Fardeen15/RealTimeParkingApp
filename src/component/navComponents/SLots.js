import React from 'react'
import { auth, db } from '../../firebase';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BookingModal from './bookingMOdal'

class Slots extends React.Component {
    constructor() {
        super()
        this.state = {
            keys: [],
            values: [],
            slectedArea: "",
            Quantity: "",
            number: [],
            index: "",
            modal: false,
            prop: ""
        }
    }
    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('slots').on('value', (snap) => {
                    var keys = Object.keys(snap.val())
                    var values = Object.values(snap.val())
                    var key = this.state.keys
                    var value = this.state.values
                    for (var i = 0; i < keys.length; i++) {
                        key.push(keys[i])
                        value.push(values[i])
                    }
                    this.setState({
                        keys: key,
                        values: value
                    })
                })
            }
        })
    }
    divs = () => {
        var number = this.state.number;
        for (var i = 0; i < Number(this.state.Quantity); i++) {
            number.push(i)
            console.log(i)
        }
        this.setState({
            number,
        }, () => {
            console.log(this.state.number)
        })

    }
    slot = (value, index) => {
        this.setState({
            slectedArea: value.area,
            Quantity: value.slots,
            index,
        }, () => {
            this.divs()
        })
    }
    clear = () => {
        this.setState({
            slectedArea: "",
            Quantity: "",
            number: [],
            index: ""
        })
    }
    modal = (value) => {
        if (Number(value) || value === 0) {
            console.log(value)
            this.setState({
                modal: !this.state.modal,
                prop: value + 1
            })
        }
        else{
            console.log(true)
            this.setState({
                modal: !this.state.modal,
                prop : ""
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.slectedArea ?
                    <div>
                        <Button className="clearBTn" variant="outline-info" onClick={this.clear}><i className="fas fa-sign-in-alt"></i></Button>
                        <h3>{this.state.slectedArea} Avaliable Slots</h3>
                        {this.state.number.map((value) => {
                            return <div id="btnDiv" key={value}><button id="buttons" onClick={()=>this.modal(value)}>{value + 1}</button></div>
                        })}
                        {
                            this.state.modal ?
                                <BookingModal date = {this.state.keys[this.state.index]} Area = {this.state.slectedArea} value = {this.state.prop} modal={this.state.modal} close={this.modal} />
                                : null
                        }
                    </div>
                    :
                    <Card className="text-center">
                        <Card.Header>avaliable areas</Card.Header>
                        {this.state.values.length ?
                            this.state.values.map((value, index) => {
                                return (
                                    <Card.Body key={index}>
                                        <Card.Title>{value.area}</Card.Title>
                                        <Card.Text>
                                            {value.slots} slots are available <Button variant="primary" onClick={() => { this.slot(value, index) }}>Go somewhere</Button>
                                        </Card.Text>
                                    </Card.Body>
                                )
                            })
                            : null}
                        <Card.Footer className="text-muted">Thank you</Card.Footer>
                    </Card>}

            </div>
        )
    }
}
export default Slots