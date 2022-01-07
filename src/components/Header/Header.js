import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './Header.css';


function Header(props){
    return (
        <Navbar collapseOnSelect expand="md" variant="light"> {/*bsPrefix="main-header">*/}
            <Container>
                <Navbar.Brand href="http://localhost:3000"><img src='https://i.imgur.com/eyS5sY8.png'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link href="#edu">Навчання</Nav.Link>
                        <Nav.Link href="#about">Про нас</Nav.Link>
                        <Nav.Link href="#isic">ISIC</Nav.Link>
                        <Nav.Link href="/complaint">Поскаржитись</Nav.Link>
                        <Nav.Link href="/video">IASAteka</Nav.Link>
                        <Nav.Link href="/">Новини</Nav.Link>
                        {localStorage.getItem("access_token") !== null? 
                        <>
                            <Nav.Link href="">Профіль</Nav.Link>
                            <Nav.Link onClick={() => {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.reload();
                                }}>Вихід</Nav.Link>
                        </>: 
                        <>
                            <Nav.Link href="/login">Логін</Nav.Link>
                            <Nav.Link href="/register">Реєстрація</Nav.Link>
                        </>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;