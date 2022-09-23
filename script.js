// Components
const form = document.querySelector('form');
const requiredInput = document.querySelectorAll('.requiredInput');
const closeForm = document.querySelector('.close');
const addBookButton = document.querySelector('.addBook');
const saveBookButton = document.querySelector('.saveBook');
const main = document.querySelector('main');
// Inputs
let inputTitle = document.querySelector('#title');
let inputAuthor = document.querySelector('#author');
let inputPages = document.querySelector('#pages');
let inputRead = document.querySelector('#formRead');
// let readStatus = document.querySelectorAll('#read');
let counter = 0;
// let deleteBookButtons = document.querySelectorAll('.removeBook');

// OBJECTS
let myLibrary = [];

class Book {
	constructor(title, author, pages, read, index) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.index = index;
	}

	createBook() {
		let isChecked = '';
		if (this.read == true) {
			isChecked = 'checked="true"';
		}
		let createdBook =
			`<article>
				<div class="bookContent title">
					<p>title</p>
					<h1>${this.title}</h1>
				</div>
				<div class="bookContent author">
					<p>author</p>
					<h1>${this.author}</h1>
				</div>
				<div class="bookContent pages">
					<p>pages</p>
					<h1>${this.pages}</h1>
				</div>
				<div class="bookContent read">
					<label for="readStatus">
						read
						<input type="checkbox" name="readStatus" id="readStatus" class="toggle" data-index="${this.index}" ${isChecked}>
					</label>
				</div>
				<button class="removeBook" type="button" data-index="${this.index}">
					<img src="./img/delete.png" alt="Delete">
					deleteBook
				</button>
			</article>`;
		return createdBook;
	}
}

// ADD BOOK INFORMATION

function clearInputs() {
	inputTitle.value = '';
	inputAuthor.value = '';
	inputPages.value = '';
	inputRead.value = '';
	inputRead.checked = false;
}


function getBooks() {
	let bookCollection = [];
	for (const book of myLibrary) {
		bookCollection += book.createBook();
	}
	return bookCollection;
}

function checkInputs() {
	if ((inputTitle.value == '') || (inputAuthor.value == '') || (inputPages.value == '')) {
		saveBookButton.disabled = true;
		saveBookButton.classList.add('disableButton');
	}
	else {
		saveBookButton.disabled = false;
		saveBookButton.classList.remove('disableButton');
	}
}

function getLibrary() {
	main.innerHTML = getBooks();
	getDeleteButtons();
	bookReadStatus();
}

function bookReadStatus() {
	counter = 0;
	document.querySelectorAll('#readStatus').forEach(readStatus => {
		readStatus.dataset.index = counter;
		counter++;
		readStatus.addEventListener('change', () => {
			let index = parseInt(readStatus.dataset.index);
			if (readStatus.checked != true) {
				myLibrary[index].read = false;
			}
			else {
				myLibrary[index].read = true;
			}
			console.log(myLibrary);
		});
	});
}

function getDeleteButtons() {
	counter = 0;
	document.querySelectorAll('.removeBook').forEach(deleteButton => {
		deleteButton.dataset.index = counter;
		counter++;
		deleteButton.addEventListener('click', () => {
			let index = parseInt(deleteButton.dataset.index);
			myLibrary.splice(index, 1);
			console.log(index);
			console.log(myLibrary);
			counter--;
			getLibrary();
		});
	});
}


function addBookToLibrary() {
	let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked, counter);
	counter++;
	myLibrary.push(newBook);
	getLibrary();
	clearInputs();
	form.classList.add('hidden');
	console.log(myLibrary);
}


//Opens form after clicking the 'addBook' button.
addBookButton.addEventListener('click', function () {
	form.classList.remove('hidden');
});

//Closes form after clicking 'Exit' button in the form.
closeForm.addEventListener('click', function () {
	form.classList.add('hidden');
});


//Adds book to library after successfully clicking the 'saveBook' button.
saveBookButton.addEventListener('click', addBookToLibrary);

//Disable 'saveBook' button if all inputs are not filled.
requiredInput.forEach((reqInput) => {
	reqInput.addEventListener('keyup', checkInputs);
	reqInput.addEventListener('click', checkInputs);
});

