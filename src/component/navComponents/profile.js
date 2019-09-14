import React from 'react';
import Card from 'react-bootstrap/Card'
import image1 from '../frontPage/images/download.jpg'
import image2 from '../frontPage/images/download1.png'
import image3 from '../frontPage/images/download2.jpg'
import Carousel from 'react-bootstrap/Carousel'

class Profile extends React.Component {
    render() {
        console.log(this.props.data)
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

                <Card style={{ background: "none" }}>
                    <Card.Header>Your Profile</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <pre>Address : {this.props.data.Address}</pre>
                            <pre>city    : {this.props.data.city}</pre>
                            <pre>email   : {this.props.data.email}</pre>
                            <pre>number  : {this.props.data.number}</pre>
                        </Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Profile