import React from 'react'
import PropTypes from 'prop-types'

/*Atualização da Categoria do Livro*/

const BookshelfUpdate = (props) => {
   const { book, onUpdateShelf } = props

   return (
      <div className="book-shelf-changer">
         <select value={book.shelf} onChange={(event) => onUpdateShelf(book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
         </select>
      </div>
   )
}

BookshelfUpdate.propTypes = {
   book: PropTypes.object.isRequired,
   onUpdateShelf: PropTypes.func.isRequired
}

export default BookshelfUpdate