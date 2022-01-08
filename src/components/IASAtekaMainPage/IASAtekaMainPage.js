import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import CardVideo from './CardVideo/CardVideo';
import CardNewVideo from './CardNewVideo/CardNewVideo';

class IASAtekaMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { videos: null, error: null };

        this.fetchVideos = () => {
            const authorToken = localStorage.getItem("access_token") != null ? "Bearer " + localStorage.getItem("access_token") : "";

            fetch('http://localhost:8081/video', {
                method: 'Get',
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
                    this.setState({ error: data })
                else
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
                <h1>Відеозаписи дисциплін ІПСА</h1>
                <Row xs={1} md={2} lg={4} className="justify-content-center">
                    {this.state.videos !== null ?
                        this.state.videos.length <= 0 ? <h1>Відсутні будь-які відео(</h1> :
                            <>
                            <CardNewVideo />
                            {this.state.videos.map(video => {
                                return <CardVideo
                                    key={"videoCard" + video.id}
                                    teacher={video.teacher}
                                    id={video.id}
                                    discipline={video.discipline}
                                    additionalInfo={video.additionalInfo}
                                    createdAt={video.createdAt}
                                    createdBy={video.createdBy} />
                            })}</> : this.state.error == null?
                             <Spinner animation="border" /> :
                             <p className='error-message'>{this.state.error}</p>
                        }
                </Row>
            </Container>
        );
    }
}

export default IASAtekaMainPage;