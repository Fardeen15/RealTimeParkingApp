import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { auth, db } from '../../firebase'
class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      areaName: "",
    }
  }
  data = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
          db.ref().child('users').on('value', (snap) => {
              if (snap.val()) {
                var value = this.state.data;
                var data = Object.values(snap.val())
            for(var i = 0 ; i <  data.length; i ++){
                if(data[i].personalInfo.person === 'user'){

                    value.push(data[i].personalInfo)
                }
            }
            this.setState({
              data: value
            },()=>{
                console.log(this.state.data)
            })
          }
        })
      }
    })
  }
  componentWillMount() {
    this.data()
  }
  render() {
    return (

      this.state.data.length ?
        this.state.data.map((value, index) => {
          return (
            <Accordion key = {index} defaultActiveKey={index}>
              <Card>
                {/* <Card.Header> */}

                  <Accordion.Toggle style = {{cursor : "pointer"}}as={Card.Header} eventKey={value.email}>
                   {value.email}
                  </Accordion.Toggle>
                {/* </Card.Header> */}
                <Accordion.Collapse eventKey={value.email}>
                  <Card.Body> 
                        <div>
                          <p>
                            <b>Address</b> : {value.Address}<br/>
                            <b>city</b> : {value.city}<br/>
                            <b>email</b> : {value.email}<br/>
                            <b>number</b> : {value.number}<br/>
                          </p>
                        </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

            </Accordion>
          )
        })
        : null

    )
  }
}
export default Users