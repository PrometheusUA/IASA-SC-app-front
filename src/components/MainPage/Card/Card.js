import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Card.css';

// function parseISOString(s) {
//     var b = s.split(/\D+/);
//     return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
//   }

function NewsCard(props) {
    const creationTime = new Date(props.createdAt + (new Date(props.createdAt)).getTimezoneOffset()*60*1000); //parseISOString(props.createdAt);
    const creationTimeText = `Створено ${creationTime.getHours()}:${creationTime.getMinutes()} ${creationTime.getDate()}.${creationTime.getMonth() + 1}.${creationTime.getFullYear()}`;
    // const creationTime = `Створено ${props.createdAt}`;
    const author = `Автор: ${props.author}`;
    return (
        <Card style={{ width: '18rem', minHeight: '450px' }}>
            <Card.Img variant="top" src={props.imageLink}
                alt={props.title + " photo"} height='250px' />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
                <Button variant="primary" href={props.link}>Детальніше</Button>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>{creationTimeText}</Col>
                    <Col>{author}</Col>
                </Row>
            </Card.Footer>
        </Card>
    );
}

export default NewsCard;