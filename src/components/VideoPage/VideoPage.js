import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import ReactPlayer from 'react-player'


class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null, isFilePicked: false };
        this.changeHandler = (event) => {
            this.setState({ selectedFile: event.target.files[0], isFilePicked: true });
        }
        this.submitForm = (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            const author = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";

            fetch('http://localhost:8081/video',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': author
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
                <Row>
                    <Col className="justify-content-center">
                        <ReactPlayer url="http://localhost:8081/video/sample2" controls={true} width="80%" height="80%"
                            config={{
                                youtube: {
                                    showinfo: 1
                                }
                            }} />
                        {/* <video controls>
                            <source src="http://localhost:8081/video/sample2" type="video/mp4"/>
                        </video> */}
                    </Col>
                </Row>
                <Row>
                    <Col className="justify-content-center">
                        <input type="file" name="file" onChange={this.changeHandler} />
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default VideoPage;