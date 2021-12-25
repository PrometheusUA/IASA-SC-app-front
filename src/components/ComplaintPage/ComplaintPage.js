import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import './ComplaintPage.css'


class ComplaintPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstname: "", surname: "", patronymic: "", text: "", errorMessage: "", successMessage: ""};
        this.submitComplaintForm = (event) => {
            event.preventDefault();
            fetch('http://localhost:8080/complaints', {
                headers: {
                    'Content-Type': 'application/json'
                  },
                    method: "POST",
                    body: JSON.stringify({
                        firstname: this.state.firstname, 
                        surname: this.state.surname, 
                        patronymic: this.state.patronymic,
                        text: this.state.text
                    })
            }).then(response => {
                if(response.status >=400){
                    throw new Error(response.statusText);
                }
                this.setState({successMessage: "Успішно відправлено!"});
            }).catch(e => {
                this.setState({errorMessage: "Щось пішло не так! Повідомлення про помилку: " + e.message});
            });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="justify-content-center">
                        <Form className="login-form" onSubmit={this.submitComplaintForm}>
                            <Form.Group controlId="surname">
                                <Form.Label>Прізвище</Form.Label>
                                <Form.Control type="text" placeholder="Введіть прізвище" value={this.state.surname} onChange={(e) => this.setState({surname: e.target.value, errorMessage: ""})} />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Ім'я</Form.Label>
                                <Form.Control type="text" placeholder="Введіть ім'я" value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value, errorMessage: ""})} />
                            </Form.Group>
                            <Form.Group controlId="patronymic">
                                <Form.Label>По батькові</Form.Label>
                                <Form.Control type="text" placeholder="Введіть по батькові" value={this.state.patronymic} onChange={(e) => this.setState({patronymic: e.target.value, errorMessage: ""})} />
                            </Form.Group>
                            <Form.Group controlId="text">
                                <Form.Label>Текст скарги</Form.Label>
                                <Form.Control type="text" as="textarea" rows={3} placeholder="Введіть текст скарги" value={this.state.text} onChange={(e) => this.setState({text: e.target.value, errorMessage: ""})} />
                            </Form.Group>
                            <p className='error-message'>{this.state.errorMessage}</p>
                            <p className='success-message'>{this.state.successMessage}</p>
                            <Button variant="primary" type="submit">
                                Відправити скаргу
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default ComplaintPage;