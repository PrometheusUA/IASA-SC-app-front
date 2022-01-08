import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import ReactPlayer from 'react-player'
import Spinner from 'react-bootstrap/Spinner';
import withRouter from '../../hooks/withRouter';

class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null, loaded:false, videoUrl: null, teacher: null, discipline: null, additionalInfo: null, createdAt: null, createdBy: null};

        this.fetchById = () => {
            const id = props.params.id;
            if(id == null || id === '' || parseInt(id).toString() !== id || parseInt(id) < 0 ){
                this.setState({ error: "Неправильний шлях: id не є цілим числом або не існує!", loaded:true });
            }
            else if (localStorage.getItem("access_token") == null){
                this.setState({ error: "Ви не залогінені: у доступу до IASAтеки відмовлено!", loaded:true });
            }
            else{
                const authorToken = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";

                fetch('http://localhost:8081/video/' + id, {
                    method: 'GET',
                    headers: {
                        'Authorization': authorToken
                    }
                }).then(response => {
                    if (response.ok)
                        return response.json();
                    else
                        return response.text()
                })
                .then(data => {
                    console.log(typeof data)
                    if (typeof data == 'string')
                        this.setState({ error: data, loaded:true })
                    else
                        this.setState({ loaded:true, 
                            videoUrl: data.link, 
                            teacher: data.teacher, 
                            discipline: data.discipline, 
                            additionalInfo: data.additionalInfo,
                            createdBy: data.createdBy,
                            createdAt: new Date(data.createdAt) });
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    componentDidMount(){
        this.fetchById();
    }

    render() {
        return (
            <Container>
                {this.state.loaded ? 
                    this.state.error == null ?
                        <Col className="justify-content-center">
                            <Row>
                                <h1>Запис від {this.state.teacher}</h1>
                            </Row>
                            <Row>
                                <h3>Дисципліна: {this.state.discipline}</h3>
                                <h3>Викладено {this.state.createdBy}, {this.state.createdAt.getHours()}:{this.state.createdAt.getMinutes()} {this.state.createdAt.getDate()}.{this.state.createdAt.getMonth() + 1}.{this.state.createdAt.getFullYear()}</h3>
                            </Row>
                            <Row>
                                <h4>Про відео: </h4>
                            </Row>
                            <Row>
                                <p>{this.state.additionalInfo}</p>
                            </Row>
                            <Row>
                                <h4>Власне відео: </h4>
                            </Row>
                            <Row className="justify-content-center">
                                <ReactPlayer url={this.state.videoUrl} controls={true} width="80%" height="80%"
                                    config={{
                                        youtube: {
                                            showinfo: 1
                                        }
                                    }} />
                            </Row>
                        </Col> : <p className='error-message'> {this.state.error}</p> : <Spinner animation="border" />}
            </Container>
        );
    }
}

export default withRouter(VideoPage);