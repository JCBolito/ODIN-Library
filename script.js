
// -----------------

const form = document.querySelector('form');
const closeForm = document.querySelector('.close');
const addBookButton = document.querySelector('.addBook');
const saveBookButton = document.querySelector('saveBook');
const main = document.querySelector('main');
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
function loopThroughLibrary() {
	for (const book of myLibrary) {
		main.textContent += `${book.title}, ${book.author}, ${book.pages}, ${book.read}`;
	}
}

function createBook(newBook) {
	let checked;
	if (newBook.read == '') {
		checked = '';
	}
	else if (newBook.read == 'on') {
		checked = 'checked';
	}
	let createdBook =
		`<article>
			<div class="bookContent title">
				<p>title</p>
				<h1>${newBook.title}</h1>
			</div>
			<div class="bookContent author">
				<p>author</p>
				<h1>${newBook.author}</h1>
			</div>
			<div class="bookContent pages">
				<p>pages</p>
				<h1>${newBook.pages}</h1>
			</div>
			<div class="bookContent read">
				<p>read</p>
				<label for="bookRead"></label>
				<input type="checkbox" name="bookRead" id="bookRead" class="toggle" ${checked}>
			</div>
		</article>`;
	return createdBook;
}
function addBookToLibrary() {
	let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value);
	myLibrary.push(newBook);
	main.innerHTML += createBook(newBook);
	// loopThroughLibrary();
	clearInputs();
	form.classList.add('hidden');
	// console.log(myLibrary);
}

// form.addEventListener('submit', addBookToLibrary);


