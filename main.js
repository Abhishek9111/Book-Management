class Book
{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI
{
    static displayBook(){
        //const storedBook=[
        //    {title:'Book One', author: 'John', isbn:'1234' },
        //    {title:'Book Two', author: 'Jane', isbn:'1412' }
        //]
        const books = store.getBook();
        books.forEach((book) => UI.addBooktoList(book))
    }
    
    static addBooktoList(book){
        const list=document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML=` 
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">X</td>`;
        list.appendChild(row);
    }

    static clearData(){
    document.querySelector("#title").value=" ";
    document.querySelector("#author").value=" ";
    document.querySelector("#isbn").value=" ";
    }

    static showAlert(message,className){
        const div=document.createElement("div")
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        },3000)
    }
    static dataRemove(x){                  
        if(x.target.classList.contains("delete")) 
            {
                if(window.confirm("Are you sure you want to remove this?"))
                {
                    x.target.parentElement.parentElement.remove()
                }
            }
       
        
    }
}


class store
{
    static addBook(book){           //splice
        const books= store.getBook();
        books.push(book);
        localStorage.setItem("book",JSON.stringify(books))
    }

    static getBook()
    {
        let books;
        if(localStorage.getItem("books"===null)){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem("book"))
        }
        return books;
    }
    static removeBook(isbn){
        const books= store.getBook();
        books.forEach((book,index)=>{
            if(book.isbn === isbn)
            books.splice(index,1);
        })
        localStorage.setItem("book",JSON.stringify(books))
    }
}



document.addEventListener("DOMContentLoaded",UI.displayBook)
document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;
    if(title == "" || author == "" || isbn=="" )
    {
        UI.showAlert("Please fill the details Properly","danger")
    }
    else
    {
    const book = new Book(title,author,isbn);
    UI.addBooktoList(book)
    store.addBook(book);    
    UI.showAlert("Details added successfully","success")
     UI.clearData();
    }
})

let list=document.getElementById("book-list")   //calling re
list.addEventListener("click",UI.dataRemove)
list.addEventListener("click",(e)=>{store.removeBook    (e.target.parentElement.previousElementSibling.textContent)})

