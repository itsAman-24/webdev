//Book Class
class Book {

    constructor (title , author , isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    
};

//LocalStorage Class

class localStore {
    
    //retriving the books if it is present inside the localStorage 
    static getBook() {
        let books;
        if(localStorage.getItem("books") === null) {
            localStorage.setItem("books" , JSON.stringify(books));
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }

    //adding books inside localStorage
    static addBook(book) {
        const books = localStore.getBook();
        debugger
        books.push(book);
        
        //resetting the value insde localStrage after removing the book
        localStorage.setItem("books" , JSON.stringify(books));
    }


    //removing book from localStorage
    static removeBook(isbn) {
        const books = localStore.getBook();

        books.forEach((book , index) => {
            if(book.isbn === isbn) {
                books.splice(index , 1);
            }
        })

        //resetting the value insde localStrage after removing the book
        localStorage.setItem("books" , JSON.stringify(books));
    }

}



//UI Class
class UI {
    static displayBook() {
        //getting the books from localStorage
        const books = localStore.getBook();

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        const book_list = document.querySelector('#book-list');
        const tableDiv = document.createElement('tr');
        tableDiv.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        
        `;

        book_list.appendChild(tableDiv);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    static removeBook(el) {
        if(el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message , className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div,form);  // this will insert the div before form start

        //Vanish alert msg after 3 seconds
        setTimeout(() => {
            document.querySelector(".alert").remove();
        },3000);
    }
}


//Event Display Book
document.addEventListener("DOMContentLoaded" , UI.displayBook);


//Event add Book
document.querySelector("#book-form").addEventListener("submit" ,(e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validation for fields  : Checks that any of the filde should be empty
    if(title == "" || author == "" || isbn == "" ) {

        UI.showAlert('Complete the fields first' , 'danger');
    } else {
        const book = new Book(title,author,isbn);
        UI.addBookToList(book);
        localStore.addBook(book); //Adding book inside localStorage
        UI.showAlert("Book added successfully" , "success");
        UI.clearFields();
    }

    
})


//Event remove Book
document.querySelector("#book-list").addEventListener("click" , (e) => {
    UI.removeBook(e.target);
    localStore.removeBook(e.target.parentElement.previousElementSibling.textContent); 
    UI.showAlert("Book removed successfully" , "danger");
})


