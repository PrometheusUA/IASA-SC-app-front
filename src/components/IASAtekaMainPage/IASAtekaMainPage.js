import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import CardVideo from './CardVideo/CardVideo';

class IASAtekaMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { videos: null };

        this.fetchVideos = () => {
            const authorToken = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";

            fetch('http://localhost:8081/video', {
                method: 'Get',
                headers: {
                    'Authorization': authorToken
                }
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ videos: data });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        this.fetchVideos();
    }

    render() {
        return (
            <Container>
                <Row xs={1} md={2} lg={4} className="justify-content-center">
                    {this.state.videos !== null ?
                        this.state.videos.length <= 0 ? <h1>Відсутні будь-які відео(</h1> :
                            this.state.videos.map(video => {
                                return <CardVideo
                                    key={"videoCard" + video.id}
                                    teacher={video.teacher}
                                    id={video.id}
                                    discipline={video.discipline}
                                    additionalInfo={video.additionalInfo}
                                    createdAt={video.createdAt}
                                    createdBy={video.createdBy} />
                            }) : <Spinner animation="border" />
                        }
                </Row>
            </Container>
        );
    }
}

export default IASAtekaMainPage;