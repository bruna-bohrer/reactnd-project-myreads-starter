import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import BookshelfUpdate from './BookshelfUpdate'

/*Listar Livros Conforme a Categoria*/

const BooksListCategory = (props) => {
   const { books, onUpdateShelf } = props

   return (
      <ol className="books-grid">
         {books.map((book) => (
            <li key={book.id}>
            <Book book={book}>
               <BookshelfUpdate book={book} onUpdateShelf={onUpdateShelf}/>
            </Book>
         </li>
      ))}
      </ol>
   )
}

BooksListCategory.propTypes = {
   books: PropTypes.array.isRequired,
   onUpdateShelf: PropTypes.func.isRequired
}

export default BooksListCategory
