import React from 'react';

import NewsCard from './Card/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import CustomPagination from './Pagination/Pagination';

import './MainPage.css'


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.pageLen = 4;
        this.state = { news: [], newsCount: -1, loading: true, pageNum: 1 };
        //const [news, setNews] = useState([]);
        this.fetchNewsCountHandler = () => {
            fetch('http://localhost:8080/news/count').then(response => {
                return response.json();
            }).then(data => {
                this.setState({ newsCount: data });
            });
        }
        this.fetchNewsHandler = (num) => {
            this.setState({ loading: true });
            fetch(`http://localhost:8080/news?pagelen=${this.pageLen}&pagenum=${num - 1}`).then(response => {
                return response.json();
            }).then(data => {
                this.setState({ news: data, loading: false });
            });
        }
        this.setPageFunc = (num) => {
            this.setState({ pageNum: num });
            this.fetchNewsHandler(num);
        }
    }

    componentDidMount() {
        this.fetchNewsCountHandler();
        this.fetchNewsHandler(1);
    }

    render() {
        return (
            <Container>
                <h1>Новини ІПСА</h1>
                <Row xs={1} md={2} lg={4} className="justify-content-center">
                    {!this.state.loading ?
                        this.state.newsCount <= 0 ? <h1>Відсутні будь-які новини(</h1> :
                            this.state.news.map(newsPiece => {
                                return <NewsCard
                                    key={"newsCard" + newsPiece.id}
                                    title={newsPiece.title}
                                    text={newsPiece.text}
                                    imageLink={newsPiece.imageLink}
                                    link={newsPiece.link}
                                    createdAt={newsPiece.createdAt}
                                    author={newsPiece.author} />
                            }) :
                        <Spinner animation="border" />}
                </Row>
                <Row className="justify-content-center">
                    {!this.state.loading && this.state.newsCount > this.pageLen ?
                    
                    <CustomPagination totPages={Math.ceil(this.state.newsCount/this.pageLen)} currentPage={this.state.pageNum} pageClicked={this.setPageFunc} />
                    :""}

                </Row>
            </Container>

        );
    }
}

export default MainPage;