import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Footer.css';
import Container from 'react-bootstrap/esm/Container';

function Footer(){
    return (
        <Nav variant="light">
            <Container>
                <Col>
                    <Row>Всі права захищено</Row>
                    <Row>© СтудРада НН ІПСА, 2021 рік</Row>
                </Col>
            </Container>
            {/* <Nav.Link href="#edu">Навчання</Nav.Link>
            <Nav.Link href="#about">Про нас</Nav.Link>
            <Nav.Link href="#isic">ISIC</Nav.Link>
            <Nav.Link href="#news">Новини</Nav.Link> */}
        </Nav>
    );
}

export default Footer;