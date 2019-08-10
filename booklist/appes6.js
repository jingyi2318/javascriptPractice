// book constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn; // ISBN is unique
    }
}

// UI class
class UI {
    static addBook(book) {
        const list = document.getElementById('book-list');

        // Create tr (table row) element
        const row = document.createElement('tr');
        // Insert new column
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `
        list.appendChild(row);
    }

    static showAlert(msg, className) {
        // create div
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));

        // get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // insert
        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    static deleteBook(target) {
        target.parentElement.parentElement.remove();
        LS.removeFromStorage(target);
    }
}

// LS (local storage) class - to manage local storage
class LS {
    // always called when page loads
    static loadFromStorage() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        console.log('hello');
        return books;
    }

    static store(book) {
        const books = LS.loadFromStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    static displayBooks() {
        const books = LS.loadFromStorage();

        books.forEach(function(book) {
            console.log('hi');
            UI.addBook(book);
        });
    }

    static removeFromStorage(target) {
        const books = LS.loadFromStorage();
        const isbnToBeRemoved = target.parentElement.previousElementSibling.textContent;

        books.forEach(function(book, i) {
            if (book.isbn === isbnToBeRemoved) {
                books.splice(i, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', LS.displayBooks());

// Event listener for add event
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

        // Instantiate book
        const book = new Book(title, author, isbn);

        // Validate
        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('Please fill in all fields', 'error');
        } else {
            // Add book to list
            UI.addBook(book);

            // Store book to local storage
            LS.store(book);

            // Clear fields
            UI.clearFields();

            // Success alert
            UI.showAlert('Your book was added!', 'success');
        }

        e.preventDefault();
    })

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        UI.deleteBook(e.target);
        UI.showAlert('Book removed!', 'success');
    }

    e.preventDefault();
})