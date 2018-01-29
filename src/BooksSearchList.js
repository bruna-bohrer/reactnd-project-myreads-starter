import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import Book from './Book'
import BookshelfUpdate from './BookshelfUpdate'
import * as BooksAPI from './BooksAPI'

/*Busca dos Livros*/

class BooksSearchList extends Component {
   static propTypes = {
      onGetShelf: PropTypes.func.isRequired,
      onUpdateShelf: PropTypes.func.isRequired
   }
   state = { books: [] }

   BooksSearch = (query) => {
      if (query.trim() != '') {
         /*Buscar no máximo 15 livros*/
         BooksAPI.search(query, 15).then((books) => {
            if (books.error) books = []

            let booksShelf = books.map((book) => {
               book.shelf = this.props.onGetShelf(book)
               return book
            })

            this.setState({books: booksShelf})
         })
      }
   }

   render() {
      const { books } = this.state
      const { onUpdateShelf } = this.props

      return (
         <div className="search-books">
            <div className="search-books-bar">
               <Link to="/" className="close-search">Close</Link>
               <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.BooksSearch(event.target.value)}/>
               </div>
            </div>
            <div className="search-books-results">
               <ol className="books-grid">
                  {(books.map((book) => (
                  <li key={book.id}>
                     <Book book={book}>
                        <BookshelfUpdate book={book} onUpdateShelf={onUpdateShelf}/>
                     </Book>
                  </li>
                  )))}
               </ol>
            </div>
         </div>
      )
   }
}

export default BooksSearchList


