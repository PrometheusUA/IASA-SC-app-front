import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';


import './LoginPage.css';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", errorMessage: "" };
        this.submitLoginForm = (event) => {
            event.preventDefault();
            fetch('http://localhost:8080/auth/signin', {
                headers: {
                    'Content-Type': 'application/json'
                  },
                    method: "POST",
                    body: JSON.stringify({email: this.state.email, password: this.state.password})
            }).then(response => {
                return response.json();
            }).then(data => {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                if(data.status != null && data.status >=400){
                    throw new Error();
                }
                window.location.reload();
            }).catch(e => {
                this.setState({errorMessage: "Користувач не існує, або Ви ввели неправильні дані!"});
            });
        }
    }

    render() {
        if(localStorage.getItem("access_token") == null)
            return (
                <Container>
                    <Row>
                        <Col className="justify-content-center">
                            <Form className="login-form" onSubmit={this.submitLoginForm}>
                                <Form.Group controlId="email">
                                    <Form.Label>Адреса електронної пошти</Form.Label>
                                    <Form.Control type="email" placeholder="Введіть email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value, errorMessage: ""})} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Введіть пароль" value={this.state.password} onChange={(e) => this.setState({password: e.target.value, errorMessage: ""})}/>
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

export default LoginPage;