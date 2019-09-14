import React from 'react';
import Card from 'react-bootstrap/Card'
// import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { Link, withRouter } from 'react-router-dom'
import { auth, db } from '../../firebase';
class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            Address: "",
            number: "",
            City: ""
        }
    }
    change = (event, val) => {
        this.setState({
            [val]: event.target.value
        })
    }
    submit = (event) => {
        event.preventDefault()
        var obj = {
            email: this.state.email,
            Address: this.state.Address,
            number: this.state.number,
            city: this.state.City,
            person: 'user'
        }
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {

                    db.ref().child('users').child(user.uid).child('personalInfo').set(obj)
                    auth.signOut().then(() => {
                        this.setState({
                            email: "",
                            password: "",
                            Address: "",
                            number: "",
                            City: ""
                        })
                        this.props.history.push('/')
                    })
                }
            })
        })
    }
    render() {

        return (
            <div>
                <Link to="/"><Button className="FloatBtn" variant="outline-info"><i className="fas fa-sign-in-alt"></i></Button></Link>
                <Card className="SignInJumbotron" text="white" >
                    <Card.Header style = {{ textAlign: "center" }}><h1>SignUp</h1></Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.submit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required onChange={(ev) => this.change(ev, 'email')} value={this.state.email} type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required value={this.state.password} onChange={(ev) => this.change(ev, 'password')} type="password" placeholder="Password" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required value={this.state.Address} onChange={(ev) => this.change(ev, 'Address')} placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Number</Form.Label>
                                <Form.Control required value={this.state.number} type="number" onChange={(ev) => this.change(ev, 'number')} placeholder="Number" />
                            </Form.Group>
                            <Form.Group controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control required value={this.state.City} onChange={(ev) => this.change(ev, 'City')} />
                            </Form.Group>
                            <Button variant="info" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>
            </div>

        );
    }

}

export default withRouter(SignUp);
