import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import ReactPlayer from 'react-player'


class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null, isFilePicked: false, additionalInfo: "", discipline: "", teacher: "", errorMessage: "" };
        this.changeHandler = (event) => {
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

            fetch('http://localhost:8081/video',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': authorToken
                    }
                }
            )
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    render() {
        return (
            <Container>
                <Col className="justify-content-center">
                    <Row className="justify-content-center">
                        <ReactPlayer url="http://localhost:8081/video/sample2" controls={true} width="80%" height="80%"
                            config={{
                                youtube: {
                                    showinfo: 1
                                }
                            }} />
                        {/* <video controls>
                            <source src="http://localhost:8081/video/sample2" type="video/mp4"/>
                        </video> */}
                    </Row>
                    <Row className="justify-content-center">
                        <Form className="form" onSubmit={this.submitForm}>
                            <Form.Group controlId="teacher">
                                <Form.Label>ПІБ викдадача</Form.Label>
                                <Form.Control type="text" placeholder="Введіть ПІБ викладача" value={this.state.teacher} onChange={(e) => this.setState({ teacher: e.target.value, errorMessage: "" })} />
                            </Form.Group>
                            <Form.Group controlId="discipline">
                                <Form.Label>Дисципліна</Form.Label>
                                <Form.Control type="text" placeholder="Введіть назву дисципліни" value={this.state.discipline} onChange={(e) => this.setState({ discipline: e.target.value, errorMessage: "" })} />
                            </Form.Group>
                            <Form.Group controlId="additionalInfo">
                                <Form.Label>Детальніше про відео</Form.Label>
                                <Form.Control type="text" placeholder="Введіть інформацію про відео" value={this.state.additionalInfo} onChange={(e) => this.setState({ additionalInfo: e.target.value, errorMessage: "" })} />
                            </Form.Group>
                            <Form.Group controlId="file">
                                <Form.Label>Відеофайл (.mp4)</Form.Label>
                                <Form.Control type="file" accept=".mp4" onChange={this.changeHandler} />
                            </Form.Group>
                            <p className='error-message'>{this.state.errorMessage}</p>
                            <Button variant="primary" type="submit" disabled={!this.state.isFilePicked}>
                                Відправити
                            </Button>
                        </Form>
                        {/* <input type="file" name="file" onChange={this.changeHandler} />
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                        </div> */}
                    </Row>
                </Col>
            </Container>

        );
    }
}

export default VideoPage;