import React, { useEffect, useState } from "react";
import "../sass/Home.scss";
import Navbar from "./Navbar";
import BookCard from "./BookCard";
import ViewBook from "./ViewBook";
import { connect } from 'react-redux';
import { fetchBooks } from '../redux/book/bookActions';

function Home({ fetchBooks, booksState, booksList }) {

    const[openHome, setOpenHome] = useState(true);
    const[openBook, setOpenBook] = useState(false);
    const[bookNo, setBookNo] = useState();
    const[bookDetails, setBookDetails] = useState();

    useEffect(() => {
        // handleGetListRequest().then((res) => {
        //     console.log(res);
        //     setBooksData(res.data.result);
        // })
        fetchBooks()
        handleGetBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleGetBooks = () => {
        if(booksState.loading) console.log("Loading Data...!!!")
        if(booksState.error) console.log("Error : ", booksState.error)
    }

    const handleViewBook = (id, book) => {
        setOpenHome(false);
        setOpenBook(true);
        setBookNo(id);
        setBookDetails(book);
    }

    const backToHome = () => {
        setOpenHome(true);
        setOpenBook(false);
    }

    return(
        
        <div>
            <Navbar />
            {openHome && (
                <div>
                    <div className="book-count-sort-container">
                        <div className="book-count-container"> 
                            <label className="title">Books</label>
                            <label className="sub-title">{"("+booksList.length + " items )"}</label>
                        </div>
                    </div>
                    <div className="book-card-display-container">
                        {booksList.map((book, index) =>(
                            <BookCard key={index} bookId={index} book={book} viewBook={handleViewBook}/>
                        ))}
                    </div>
                </div>
            )}
            {openBook && (
                <ViewBook BookNo={bookNo} BookDetails={bookDetails} BackToHome={backToHome}/>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        booksState: state,
        booksList: state.booksList
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchBooks: () => dispatch(fetchBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);