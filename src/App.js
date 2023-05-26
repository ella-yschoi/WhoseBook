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

    {/* 메인 상품 목록 레이아웃 */}
    <div className="container">
    <div className="row">
      <div className="main_book">
        <img src={process.env.PUBLIC_URL + "/book_1.jpeg"} width="20%" alt="main_book_1"/>
        <h4>도둑맞은 집중력</h4>
        <p>집중력 위기의 시대, 삶의 주도권을 되찾는 법</p>
      </div>
      <div className="main_book">
        <img src={process.env.PUBLIC_URL + "/book_2.jpeg"} width="20%" alt="main_book_2"/>
        <h4>비전공자를 위한 이해할 수 있는 IT 지식</h4>
        <p>IT시대의 필수 교양서</p>
      </div>
      <div className="main_book">
        <img src={process.env.PUBLIC_URL + "/book_3.jpeg"} width="20%" alt="main_book_3"/>
        <h4>총균쇠</h4>
        <p>인간 사회의 운명을 바꾼 힘</p>
      </div>
    </div>
  </div> 
    
  </div>
  );
}

export default App;
