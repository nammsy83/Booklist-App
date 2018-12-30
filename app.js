// Book Class: Represents a book
function Book(title, author, isbn){
	this.title = title,
	this.author = author,
	this.isbn = isbn
}

// UI Class: Handle UI tasks
function displayBooks(){
	var books = getBooks();
	books.forEach(function(book){
		addBookToList(book);
	});
}

// Add book to table list
function addBookToList(book){
	var list = document.querySelector('#book-list');
	var row = document.createElement('tr');
	row.innerHTML = '<td>' + book.title + '</td><td>' + book.author + '</td><td>' + book.isbn + '</td></td>' +  '<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>'; 
	list.appendChild(row); 
}

// Delete book from list
function deleteBook(el){
	if(el.classList.contains('delete')){
		el.parentElement.parentElement.remove();
	}
}

// Show alert message
function showAlert(message, className){
	var div = document.createElement('div');
	div.className = 'alert alert-' + className;
	div.appendChild(document.createTextNode(message));
	var container = document.querySelector('.container');
	var form = document.querySelector('#book-form');
	container.insertBefore(div, form);
	setTimeout(function(){document.querySelector('.alert').remove()}, 3000);
}

// Clear fields on submission
function clearFields() {
	document.querySelector('#title').value = '';
	document.querySelector('#author').value = '';
	document.querySelector('#isbn').value = '';
}

// Store Class: Handles local storage
function getBooks(){
	if(localStorage.getItem('books') ===  null){
		var books = [];
	}else{
		books = JSON.parse(localStorage.getItem('books'));
	}
	return books;
	console.log('getBooks');
}

// Events: Display Books
document.querySelector('DOMContentLoaded', displayBooks());
// Event: Add a Book to local storage
function addBook(book){
	var books = getBooks();
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
}
// Remove book from localstorage
function removeBook(isbn){
	var books =	getBooks();
	books.forEach(function(book, index){
		if(book.isbn === isbn){
			books.splice(index, 1);
		}
	});
	localStorage.setItem('books', JSON.stringify(books));
}
// Form validation
document.querySelector('#book-form').addEventListener('submit', function(e){
	e.preventDefault();
	var title = document.querySelector('#title').value;
	var author = document.querySelector('#author').value;
	var isbn = document.querySelector('#isbn').value;
	if(title === '' || author === '' || isbn === ''){
		showAlert('Please enter values in the fields', 'danger');
	}else{
		// Instantiate Book
		var book = new Book(title, author, isbn);
		showAlert('Book Added', 'success');
		addBookToList(book);
		addBook(book);
		showAlert();
		clearFields();
	}
});
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', function(e){
	deleteBook(e.target);
	removeBook(e.target.parentElement.previousElementSibling.textContent);
	showAlert('Book removed', 'success');
})
