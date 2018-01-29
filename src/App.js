import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksSearchList from './BooksSearchList'
import BooksListCategory from './BooksListCategory'

class BooksApp extends React.Component {
   state = {
      books: []
   }

   /*Atualizar Categoria*/
   updateShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(() => {
         book.shelf = shelf
         this.setState((state) => {
            let books = state.books.filter(b => b.id !== book.id)
            return {
            books: books.concat(book)
            }
         })
      })
   }

   /*Listar por Catgorias*/
   getBookCategory = (book) => {
      let catBook = this.state.books.find(b => b.id === book.id)
      if (catBook)
         return catBook.shelf
      else
         return 'none'
   }


   /*Invocado imediatamente depois do componente ser inserido no DOM*/
   componentDidMount() {
      BooksAPI.getAll().then((books) => {
         this.setState({ books })
      })
   }

   render() {
      /*Categorias onde os livros podem estar*/
      const BookCategory = [
         {
            titleBook: "Currently Reading",
            booksCategory: this.state.books.filter((book) => book.shelf === 'currentlyReading')
         },
         {
            titleBook: "Want to Read",
            booksCategory: this.state.books.filter((book) => book.shelf === 'wantToRead')
         },
         {
            titleBook: "Read",
            booksCategory: this.state.books.filter((book) => book.shelf === 'read')
         }
      ]

      return (
         <div className="app">
            <div className="list-books">
               <div className="list-books-title">
                  <h1>MyReads by</h1>
               </div>

               <Route exact path="/" render={() => (
                  <div className="list-books-content">
                     {BookCategory.map((shelf, index) => (
                        <div className="bookshelf" key={index}>
                           <h2 className="bookshelf-title">
                              {shelf.titleBook}
                           </h2>
                           <div className="bookshelf-books">
                              <BooksListCategory books={shelf.booksCategory} onUpdateShelf={this.updateShelf}/>
                           </div>
                        </div>
                     ))}
                  </div>
               )}/>

               <Route exact path="/search" render={() => (
                  <BooksSearchList onGetShelf={this.getBookCategory} onUpdateShelf={this.updateShelf}/>
               )}/>

               <div className="open-search">
                  <Link to="/search">Add a book</Link>
               </div>
            </div>
         </div>
      )
  }
}

export default BooksApp
