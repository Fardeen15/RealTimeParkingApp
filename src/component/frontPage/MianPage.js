import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Users from '../navComponents/user'
import { auth, db } from '../../firebase';
import AddAreaAndSlots from '../navComponents/AddAreaslots'
import { withRouter } from 'react-router-dom'
import Slots from '../navComponents/SLots'
import BookingDetails from '../navComponents/bookingDetails'
import Noti from '../navComponents/notification'
import Profile from '../navComponents/profile'

class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            data: "",
            length: ""
        }
    }
    onAuth = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('users').child(user.uid).child("personalInfo").on('value', (snap) => {
                    this.setState({
                        data: snap.val(),
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
    notification = () => {
        db.ref().child('notification').on('value', (snap) => {
            if (snap.val()) {
                var data = Object.values(snap.val());
                this.setState({
                    length: data.length
                })
            }
        })

    }
    componentWillMount() {
        this.notification()
        this.onAuth()
    }
    render() {
        return (
            <div>


                {this.state.person === "Admin" ?
                    <div className="tab" class="animate-bottom">
                        <Tabs id="Tab" style={{
                            zIndex: 2,
                            position: "fixed",
                            top: "0%",
                            background: "rgba(0,0,0,0.4)",
                            width: "100%",
                            border: "none"
                        }} id="controlled-tab-example">
                            <Tab eventKey="user" title="Users">
                                <Users />
                            </Tab>
                            <Tab eventKey="Area" title="Add Area And Slots">
                                <AddAreaAndSlots />
                            </Tab>
                            <Tab eventKey="contact" title={"Notification" + " " + this.state.length} >
                                <Noti />
                            </Tab>
                            <Tab eventKey="Sign Out" title="Sign Out" >
                                <button onClick={this.signout}>sign out</button>
                            </Tab>
                        </Tabs>
                    </div>
                    :
                    this.state.person === 'user' ?
                        <div className="tab" class="animate-bottom">
                            <Tabs id="Tab" style={{
                                zIndex: 2,
                                position: "fixed",
                                top: "0%",
                                background: "rgba(0,0,0,0.4)",
                                width: "100%",
                                border: "none"
                            }} id="controlled-tab-example">
                                <Tab eventKey="Your Profile" title="Your Profile">
                                    <Profile data={this.state.data} />
                                </Tab>
                                <Tab eventKey="slots" title="Slots">
                                    <Slots />
                                </Tab>
                                <Tab eventKey="Booking Details" title="Booking Details" >
                                    <BookingDetails />
                                </Tab>
                                <Tab eventKey="Sign Out" title="Sign Out" >
                                    <button onClick={this.signout}>sign out</button>
                                </Tab>
                            </Tabs>
                        </div>
                        : 
                        <div id="loader"></div>
                        }
            </div>
        )
    }
}
export default withRouter(MainPage)