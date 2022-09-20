
// -----------------

const form = document.querySelector('form');
const closeForm = document.querySelector('.close');
const addBookButton = document.querySelector('.addBook');
const saveBookButton = document.querySelector('saveBook');
let inputTitle = document.querySelector('#title');
let inputAuthor = document.querySelector('#author');
let inputPages = document.querySelector('#pages');
let inputRead = document.querySelector('#read');


//OPENS FORM
addBookButton.addEventListener('click', function () {
	form.classList.remove('hidden');
});


//CLOSES FORM
closeForm.addEventListener('click', function () {
	form.classList.add('hidden');
});

// OBJECTS
let myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

// ADD BOOK INFORMATION
function clearInputs() {
	inputTitle.value = '';
	inputAuthor.value = '';
	inputPages.value = '';
	inputRead.value = '';
}

function addBookToLibrary() {
	form.classList.add('hidden');
	let newBook = new Book();
	newBook.title = inputTitle.value;
	newBook.author = inputAuthor.value;
	newBook.pages = inputPages.value;
	newBook.read = inputRead.value;
	myLibrary.push(newBook);
	clearInputs();
}

