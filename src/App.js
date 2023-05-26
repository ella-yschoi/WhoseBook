import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#WhoseBook">📖 WhoseBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">홈</Nav.Link>
            <Nav.Link href="#best">베스트</Nav.Link>
            <NavDropdown title="카테고리" id="category_drop">
              <NavDropdown.Item href="#trend">📕 요즘 유행하는 책</NavDropdown.Item>
              <NavDropdown.Item href="#life">📙 나만의 인생 책</NavDropdown.Item>
              <NavDropdown.Item href="#must">📗 꼭 읽어야 할 책</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#shelf">📚 내 책장</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#mypage">마이페이지</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    {/* 메인 배너 */}
    <div className='main-banner'></div>
    </div>
  );
}

export default App;
