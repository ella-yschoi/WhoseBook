import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div>
    <Navbar className='App-header'>
      <Container>
        <Navbar.Brand href="#WhoseBook">📖 WhoseBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
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
    <div className="main-book">
      <div>
        <img src={process.env.PUBLIC_URL + "/book_main_1.jpeg"} alt="main_book_1"/>
        <h4>브랜드 마케터들의 이야기</h4>
        <p>음식, 음악, 여행 그리고 독서</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/book_main_2.jpeg"} alt="main_book_2"/>
        <h4>내 삶의 이야기를 쓰는 법</h4>
        <p>글쓰기 워크숍을 운영해온 저자의 자전</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/book_main_3.jpeg"} alt="main_book_3"/>
        <h4>더퍼슨스 : 브랜드 디렉터</h4>
        <p>직업 탐구 인터뷰 네 번째 브랜드 디렉터</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + "/book_main_4.jpeg"} alt="main_book_4"/>
        <h4>이게 무슨 일이야!</h4>
        <p>우아한형제들의 일문화이야기</p>
      </div>
    </div>
  </div> 
  );
}

export default App;
