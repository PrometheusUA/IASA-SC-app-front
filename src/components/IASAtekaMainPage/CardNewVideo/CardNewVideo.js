import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CardNewVideo(props) {
    return (
        <Card style={{ width: '18rem', minHeight: '200px' }}>
            <Card.Body>
                <Card.Title>Завантажити нове відео</Card.Title>
                <Button variant="primary" href="http://localhost:3000/video/new">Завантажити</Button>
            </Card.Body>
        </Card>
    );
}

export default CardNewVideo;