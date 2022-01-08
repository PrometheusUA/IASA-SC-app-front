import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';

import './RegisterPage.css';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", repeatedPassword: "", firstname: "", surname: "", patronymic: "", errorMessage: "" };
        this.submitRegForm = (event) => {
            event.preventDefault();
            fetch('http://localhost:8080/auth/signup', {
                headers: {
                    'Content-Type': 'application/json'
                  },
                    method: "POST",
                    body: JSON.stringify({
                        email: this.state.email, 
                        password: this.state.password,
                        firstname: this.state.firstname,
                        surname: this.state.surname,
                        patronymic: this.state.patronymic
                    })
            }).then(response => {
                return response.json();
            }).then(data => {
                if(data.error_message !== undefined){
                    throw new Error(data.error_message);
                }
                if(data.status !== undefined && data.status >=400){
                    throw new Error(data.statusMessage);
                }
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                window.location.reload();
            }).catch(() => {
                this.setState({errorMessage: "Користувач вже існує, або Ви неправильно ввели дані!"});
            });
        }
    }

    render() {
        if(localStorage.getItem("access_token") == null)
        return (
            <Container>
                <Row>
                    <Col className="justify-content-center">
                        <Form className="login-form" onSubmit={this.submitRegForm}>
                            <Form.Group controlId="email">
                                <Form.Label>Адреса електронної пошти</Form.Label>
                                <Form.Control type="email" placeholder="Введіть email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value, errorMessage: ""})} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введіть пароль" value={this.state.password} onChange={(e) => this.setState({password: e.target.value, errorMessage: ""})}/>
                            </Form.Group>
                            <Form.Group controlId="repeatpassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Повторіть пароль" value={this.state.repeatedPassword} onChange={(e) => this.setState({repeatedPassword: e.target.value, errorMessage: ""})}/>
                            </Form.Group>
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
                            <p className='error-message'>{this.state.errorMessage}</p>
                            <Button variant="primary" type="submit">
                                Відправити
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        );
        else return(
            <Navigate to="/" />
        );

    }
}

export default RegisterPage;