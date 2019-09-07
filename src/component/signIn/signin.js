import React from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../firebase';

class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
        }
    }
    change = (event, val) => {
        this.setState({
            [val]: event.target.value
        })
    }
    signin = (event) => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({
                email: "",
                password: "",
                Address: "",
                number: "",
                City: ""
            })
            this.props.history.push('/MainPage')

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        })
    }
    render() {

        return (
            <Card text="white" className="SignInJumbotron" fluid>
                <Card.Header style={{ height: "17vh ", paddingTop: "85px" }}><h1>Sign IN</h1></Card.Header>
                <Card.Body className="SignInContainer">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control value={this.state.email} onChange={(ev) => this.change(ev, 'email')} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control value={this.state.password} onChange={(ev) => this.change(ev, 'password')} type="password" placeholder="Password" />
                        </Form.Group>

                    </Form>
                </Card.Body>
                <Card.Footer style={{ height: "17vh", }}>
                    <Button onClick={this.signin} variant="outline-secondary" name="button" >
                        Sign In
                            </Button> <Link to="/SignUp"><Button variant="outline-info" name="button">
                        SignUp
                            </Button>
                    </Link>

                </Card.Footer>
            </Card>
        );
    }

}

export default withRouter(SignIn);
