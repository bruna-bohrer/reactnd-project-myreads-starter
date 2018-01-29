import React from 'react'
import PropTypes from 'prop-types'

/*Dados do Livro*/

const Book = (props) => {
   let smallThumbnail = null;

   const { book } = props
   const imgShow = [book.imageLinks ? book.imageLinks.smallThumbnail : '']
   const imgStyle = {
     width: 128,
     height: 193
   };

   return (
      <div className="book">
         <div className="book-top">
            <div className="book-cover">
               <img src={ imgShow } alt=""  style={imgStyle} />
            </div>
            {props.children}
         </div>
         <div className="book-title">
            {book.title}
         </div>
         <div className="book-authors">
            {book.authors}
         </div>
      </div>
   )
}

Book.propTypes = {
   book: PropTypes.object.isRequired
}

export default Book