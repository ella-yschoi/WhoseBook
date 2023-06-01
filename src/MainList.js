import './App.css';

import ProductData from './ProductData';
import { useState } from 'react';

function MainList () {

    let [books] = useState(ProductData)
    
    return (
        <div className="main-book">
        <div>
            <img src={process.env.PUBLIC_URL + "/book_main_1.jpeg"} alt="main_book_1"/>
            <h4 className='title'>{books[0].title}</h4>
            <p className='content'>{books[0].content}</p>
            <p className='price'>{books[0].price}</p>
        </div>
        <div>
            <img src={process.env.PUBLIC_URL + "/book_main_2.jpeg"} alt="main_book_2"/>
            <h4 className='title'>{books[1].title}</h4>
            <p className='content'>{books[1].content}</p>
            <p className='price'>{books[1].price}</p>
        </div>
        <div>
            <img src={process.env.PUBLIC_URL + "/book_main_3.jpeg"} alt="main_book_3"/>
            <h4 className='title'>{books[2].title}</h4>
            <p className='content'>{books[2].content}</p>
            <p className='price'>{books[2].price}</p>
        </div>
        <div>
            <img src={process.env.PUBLIC_URL + "/book_main_4.jpeg"} alt="main_book_4"/>
            <h4 className='title'>{books[3].title}</h4>
            <p className='content'>{books[3].content}</p>
            <p className='price'>{books[3].price}</p>
        </div>
        </div>
    )
};

export default MainList;