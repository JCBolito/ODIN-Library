// Components
const form = document.querySelector("form");
const requiredInput = document.querySelectorAll(".requiredInput");
const closeForm = document.querySelector(".close");
const addBookButton = document.querySelector(".addBook");
const saveBookButton = document.querySelector(".saveBook");
const main = document.querySelector("main");
// Inputs
let inputTitle = document.querySelector("#title");
let inputAuthor = document.querySelector("#author");
let inputPages = document.querySelector("#pages");
let inputRead = document.querySelector("#formRead");
let counter = 0;

// myLibrary Array stores saved books.
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
		let isChecked = "";
		if (this.read == true) {
			isChecked = "checked=\"true\"";
		}
		let createdBook =
			`<article data-index="${this.index}">
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
					<label for="readStatus${this.index}">
						read
						<input type="checkbox" name="readStatus${this.index}" id="readStatus${this.index}" class="toggle" data-index="${this.index}" ${isChecked}>
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

// Hides "main" element if "myLibrary" array
// has no elements.
function isLibraryEmpty() {
	if (myLibrary.length == 0) {
		main.classList.add("hidden");
	}
	else {
		main.classList.remove("hidden");
	}
}

// Disables "saveBook" button if form inputs are empty.
function checkInputs() {
	if ((inputTitle.value == "") || (inputAuthor.value == "") || (inputPages.value == "")) {
		saveBookButton.disabled = true;
		saveBookButton.classList.add("disableButton");
	}
	else {
		saveBookButton.disabled = false;
		saveBookButton.classList.remove("disableButton");
	}
}

// Clears form inputs after clicking "saveBook" and "close" form buttons.
function clearInputs() {
	inputTitle.value = "";
	inputAuthor.value = "";
	inputPages.value = "";
	inputRead.value = "";
	inputRead.checked = false;
}

// Calls "isLibraryEmpty()" function to hide the "main" HTML element 
// if there are no elements in the "myLibrary" array, calls the
// "createBook()" method from the instances of "Book" class 
// stored in the "myLibrary" array which creates an HTML Structure of 
// the "Book" instances with their corresponding information.
// The returned HTML structure from the "createBook()" method is then
// stored in a temporary array called "bookCollection." 
function getBooks() {
	let bookCollection = [];
	isLibraryEmpty();
	for (const book of myLibrary) {
		bookCollection += book.createBook();
	}
	return bookCollection;
}

// Loops through the existing "deleteBook" button in the HTML,
// deletes the corresponding element from the array, and calls
// the "getLibrary()" function to update the HTML contents
// and its functionality accordingly.
function getDeleteButtons() {
	counter = 0;
	document.querySelectorAll(".removeBook").forEach(deleteButton => {
		deleteButton.dataset.index = counter;
		counter++;
		deleteButton.addEventListener("click", () => {
			let index = parseInt(deleteButton.dataset.index);
			myLibrary.splice(index, 1);
			counter--;
			getLibrary();
		});
	});
}

// Loops through the existing "read" checkboxes to update its 
// attributes accordingly, listens if the "read" checkbox has been 
// clicked, checks if there are any status changes on the "read" 
// checkbox, reflects any changes on the "read" checkbox on 
// the "read" attribute of the objects in the "myLibrary" array,
// and calls the "changeBookColor()" function to change book color
// according to the "read" checkbox status.
function bookReadStatus() {
	counter = 0;
	document.querySelectorAll(".toggle").forEach(readStatus => {
		readStatus.dataset.index = counter;
		readStatus.name = `readStatus${counter}`;
		readStatus.id = `readStatus${counter}`;
		readStatus.parentElement.setAttribute("for", `readStatus${counter}`);
		counter++;
		readStatus.addEventListener("click", () => {
			let index = parseInt(readStatus.dataset.index);
			if (readStatus.checked != true) {
				myLibrary[index].read = false;
			}
			else {
				myLibrary[index].read = true;
			}
			changeBookColor();
		});
	});
}

// Loops through the existing "article" elements in the HTML 
// and changes the color the "article" element according to
// the "read" attribute of the objects in the "myLibrary" 
// array.
function changeBookColor() {
	counter = 0;
	document.querySelectorAll("article").forEach(book => {
		book.dataset.index = counter;
		counter++;
		let index = parseInt(book.dataset.index);
		if (myLibrary[index].read == false) {
			book.classList.remove("bookRead");
		}
		else {
			book.classList.add("bookRead");
		}
	});
}

// Sets the content of the "main" HTML Element to the returned 
// HTML Structure of the "getBooks()" function; activates every
// "deleteBook()" functionality; activates the "read" checkbox
// functionality; and activates color change depending on the
// status of the "read" checkbox.
function getLibrary() {
	main.innerHTML = getBooks();
	getDeleteButtons();
	bookReadStatus();
	changeBookColor();
}

// Creates a new instance of the "Book" class based on the
// form inputs, pushes the new instance of the "Book" to the
// "myLibrary" array, calls the "clearInputs()" function 
// to clear the inputs in preparation for the next instance,
// calls the "getLibrary()" function to update the HTML contents
// and its functionality accordingly, and hides the "form" element.
function addBookToLibrary() {
	let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked, counter);
	counter++;
	myLibrary.push(newBook);
	clearInputs();
	getLibrary();
	form.classList.add("hidden");
}

// ---------------- MAIN -----------------------
//Opens form after clicking the 'addBook' button.
addBookButton.addEventListener("click", function () {
	form.classList.remove("hidden");
});

//Closes form after clicking 'Exit' button in the form.
closeForm.addEventListener("click", function () {
	form.classList.add("hidden");
});


//Adds book to library after successfully clicking the 'saveBook' button.
saveBookButton.addEventListener("click", addBookToLibrary);

//Disable 'saveBook' button if all inputs are not filled.
requiredInput.forEach((reqInput) => {
	reqInput.addEventListener("keyup", checkInputs);
	reqInput.addEventListener("click", checkInputs);
});

