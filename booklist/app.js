// book constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBook = function(book) {
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

UI.prototype.showAlert = function(msg, className) {
    // create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert
    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function (target) {
        target.parentElement.parentElement.remove();
}

// Event listener for add event
document.getElementById('book-form').addEventListener('submit', 
function(e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book (title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBook(book);

        // Clear fields
        ui.clearFields();

        // Success alert
        ui.showAlert('Your book was added!', 'success');
    }

    e.preventDefault();
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();

    if (e.target.className === 'delete') {
        ui.deleteBook(e.target);
        ui.showAlert('Book removed!', 'success');
    }

    e.preventDefault();
})