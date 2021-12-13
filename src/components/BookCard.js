import React from "react";
import "../sass/BookCard.scss";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import book4 from "../assets/book4.png";
import book5 from "../assets/book5.png";
import book6 from "../assets/book6.png";
import book7 from "../assets/book7.png";
import book8 from "../assets/book8.png";
import book9 from "../assets/book9.png";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

function BookCard(props) {

    const BookImage = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book1, book2, book3, book4, book5, book6, book7, book8, book9];
    
    const handleViewBook = () => {
        const BookId = props.bookId + 1;
        const Book = props.book;
        props.viewBook(BookId, Book);
    }

    return(
        <div className="book-card-container" onClick={() => handleViewBook()}>
            <div className="book-img-container">
                <img src={BookImage[props.bookId]} alt="" />
            </div>
            <div className="book-description-container">
                <div className="book-title">
                    <label>{props.book.bookName}</label>
                </div>
                <div className="book-author">
                    <label>{"by "+props.book.author}</label>
                </div>
                <div className="book-rating">
                    <div className="star-rating">
                        <label>4.5</label>
                        <div className="align-star">
                            <StarOutlineOutlinedIcon />
                        </div>
                    </div>
                    <label className="rating">(20)</label>
                </div>
                <div className="book-price">
                    <label> {"Rs. " + props.book.price}</label>
                </div>
            </div>
        </div>
    );
}

export default BookCard;