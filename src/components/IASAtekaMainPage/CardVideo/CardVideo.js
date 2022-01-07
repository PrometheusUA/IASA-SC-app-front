import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardVideo(props) {
    const creationTime = new Date(props.createdAt); //parseISOString(props.createdAt);
    const creationTimeText = `Створено ${creationTime.getHours()}:${creationTime.getMinutes()} ${creationTime.getDate()}.${creationTime.getMonth() + 1}.${creationTime.getFullYear()}`;
    
    const author = `Виклав: ${props.createdBy}`;
    return (
        <Card style={{ width: '18rem', minHeight: '200px' }}>
            <Card.Body>
                <Card.Title>{props.teacher}: {props.discipline}</Card.Title>
                <Card.Text>{props.additionalInfo}</Card.Text>
                <Button variant="primary" href={"http://localhost:3000/video/" + props.id}>Перегляд</Button>
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

export default CardVideo;