import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import refreshToken from '../../hooks/refreshToken';
import './NewVideoPage.css';

class NewVideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { processed: true, selectedFile: null, isFilePicked: false, additionalInfo: "", discipline: "", teacher: "", errorMessage: "", ok: false };
        this.fileChangeHandler = (event) => {
            this.setState({ selectedFile: event.target.files[0], isFilePicked: true });
        }
        this.submitForm = (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            const authorToken = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";
            formData.append('discipline', this.state.discipline);
            formData.append('additionalInfo', this.state.additionalInfo);
            formData.append('teacher', this.state.teacher);
            this.setState({ processed: false, ok: false })

            fetch('http://localhost:8081/video',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': authorToken
                    }
                }
            )
                .then(async (result) => {
                    let text = await result.text();
                    return [text, result.ok];
                })
                .then(async arr => {
                    const text = arr[0];
                    const ok = arr[1];
                    if (ok) {
                        this.setState({ ok: true, processed: true });
                    }
                    else {
                        if (text.startsWith("The Token has expired on")){
                            try{
                                await refreshToken();
                                this.submitForm(event);
                            }
                            catch(error){
                                this.setState({ errorMessage: "REFRESH: " + error.message, processed: true })
                                return;
                            }
                        }
                        else
                            this.setState({ errorMessage: text, processed: true });
                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message, processed: true })
                });
        }

        this.oneTrySubmitForm = (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            const authorToken = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";
            formData.append('discipline', this.state.discipline);
            formData.append('additionalInfo', this.state.additionalInfo);
            formData.append('teacher', this.state.teacher);
            this.setState({ processed: false, ok: false })

            fetch('http://localhost:8081/video',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': authorToken
                    }
                }
            )
                .then(async (result) => {
                    let text = await result.text();
                    return [text, result.ok];
                })
                .then(async arr => {
                    const text = arr[0];
                    const ok = arr[1];
                    console.log(text);
                    if (ok) {
                        this.setState({ ok: true, processed: true });
                    }
                    else {
                        this.setState({ errorMessage: text, processed: true });
                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message, processed: true })
                });
        }
    }

    render() {
        return (
            <Container>
                <h1>Створити новий ресурс</h1>
                {this.state.processed ?
                    this.state.errorMessage == null || this.state.errorMessage === "" ?
                        !this.state.ok ?
                            <Col className="justify-content-center">
                                <Row className="justify-content-center">
                                    <Form className="form" onSubmit={this.submitForm}>
                                        <Form.Group controlId="teacher">
                                            <Form.Label>ПІБ викдадача</Form.Label>
                                            <Form.Control type="text" placeholder="Введіть ПІБ викладача" value={this.state.teacher} onChange={(e) => this.setState({ teacher: e.target.value, errorMessage: "", ok: false })} />
                                        </Form.Group>
                                        <Form.Group controlId="discipline">
                                            <Form.Label>Дисципліна</Form.Label>
                                            <Form.Control type="text" placeholder="Введіть назву дисципліни" value={this.state.discipline} onChange={(e) => this.setState({ discipline: e.target.value, errorMessage: "", ok: false })} />
                                        </Form.Group>
                                        <Form.Group controlId="additionalInfo">
                                            <Form.Label>Детальніше про відео</Form.Label>
                                            <Form.Control type="text" as="textarea" rows={3} placeholder="Введіть інформацію про відео" value={this.state.additionalInfo} onChange={(e) => this.setState({ additionalInfo: e.target.value, errorMessage: "", ok: false })} />
                                        </Form.Group>
                                        <Form.Group controlId="file">
                                            <Form.Label>Відеофайл (.mp4)</Form.Label>
                                            <Form.Control type="file" accept=".mp4" onChange={this.fileChangeHandler} />
                                        </Form.Group>
                                        <p className='error-message'>{this.state.errorMessage}</p>
                                        <Button variant="primary" type="submit" disabled={!this.state.isFilePicked}>
                                            Відправити
                                        </Button>
                                    </Form>
                                </Row>
                            </Col> :
                            <p className='success-message'>Вдало завантажено</p> :
                        <p className='error-message'>{this.state.errorMessage}</p> :
                    <Spinner animation="border" />}
            </Container>

        );
    }
}

export default NewVideoPage;