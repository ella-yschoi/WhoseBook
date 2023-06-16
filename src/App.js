import './App.css';

import { Link, Route, Routes } from 'react-router-dom';

import Header from './Header';
import MainList from './MainList';

function App () {
  
  return (
    <div>
      <Header />
      <div className='main-banner'></div>
      <MainList />
      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link>
      <Routes>
      <Route path='/' element={<div>메인</div>}/>
        <Route path='/detail' element={<div>상세페이지</div>}/>
        <Route path='/myPage' element={<div>마이페이지</div>}/>
      </Routes>
  </div> 
  );
}

export default App;
