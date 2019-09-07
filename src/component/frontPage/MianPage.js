import React from 'react'
import image1 from './images/download.jpg'
import image2 from './images/download1.png'
import image3 from './images/download2.jpg'
import Carousel from 'react-bootstrap/Carousel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Users from '../navComponents/user'
import { auth, db } from '../../firebase';
import AddAreaAndSlots from '../navComponents/AddAreaslots'
import { withRouter } from 'react-router-dom'
import Slots from '../navComponents/SLots'

class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            person: ""
        }
    }
    onAuth = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('users').child(user.uid).child("personalInfo").on('value', (snap) => {
                    this.setState({
                        person: snap.val().person
                    })
                    console.log(true)
                })
            }
        })
    }
    signout = () => {
        console.log(true)
        auth.signOut().then(() => {
            this.props.history.push('/')
        })
    }

    componentWillMount() {
        this.onAuth()
    }
    render() {
        return (
            <div>

                <Carousel>
                    <Carousel.Item className="slideItem">
                        <img
                            className="d-block w-100 slideItem"
                            src={image1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="slideItem">
                        <img
                            className="d-block w-100 slideItem"
                            src={image2}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="slideItem">
                        <img
                            className="d-block w-100 slideItem"
                            src={image3}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="tab">

                    {this.state.person === "Admin" ?
                        <Tabs id="controlled-tab-example">
                            <Tab eventKey="user" title="Users">
                                <Users />
                            </Tab>
                            <Tab eventKey="Area" title="Add Area And Slots">
                                <AddAreaAndSlots />
                            </Tab>
                            <Tab eventKey="contact" title="Contact" >
                                <h1>contact</h1>
                            </Tab>
                            <Tab eventKey="Sign Out" title="Sign Out" >
                                <button onClick={this.signout}>sign out</button>
                            </Tab>
                        </Tabs>
                        :
                        <Tabs id="controlled-tab-example">
                            <Tab eventKey="Your Profile" title="Your Profile">
                                <h1>hello</h1>
                            </Tab>
                            <Tab eventKey="slots" title="Slots">
                                <Slots />
                            </Tab>
                            <Tab eventKey="Your Booking" title="Your Booking" >
                                <h1>contact</h1>
                            </Tab>
                            <Tab eventKey="Sign Out" title="Sign Out" >
                                <button onClick={this.signout}>sign out</button>
                            </Tab>
                        </Tabs>}
                </div>
            </div>
        )
    }
}
export default withRouter(MainPage)