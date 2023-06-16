import './App.css';

import ProductData from './ProductData';
import { useState } from 'react';

function MainList () {

    let [books] = useState(ProductData)
    
    return (
        <div className="main-book">
            {books.map((book, index) => (
                <div key = {index}>
                    <img src={`${process.env.PUBLIC_URL}/book_main_${index}.jpeg`} alt={`main_book_${index}`}/>
                    <h4 className='title'>{book.title}</h4>
                    <p className='content'>{book.content}</p>
                    <p className='price'>{book.price}</p>
                </div>
            ))}
        </div>
    )
}

export default MainList;