import { html, render } from '../node_modules/lit-html/lit-html.js';
window.addEventListener('load', onLoad);

  const buttonTemplate = (id, text) => {return html`
    <button @click=${null, loadAllBooks} id=${id}>${text}</button>`
  }

  const theadTemplate = () => {
      return html`<thead>
      <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
      </tr>
    </thead>`;
  }

  const tbodyTemplate = (data, id) => {
      if(id) {
      return html`<tr id=${id}>
        <td>${data.author}</td>
        <td>${data.title}</td>
        <td>
          <button @click=${null, onEdit}>Edit</button>
          <button @click=${null, onDelete}>Delete</button>
        </td>
      </tr>`
      } else {
      return html`<tr>
        <td>${data.author}</td>
        <td>${data.title}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>`
      }
  }

  const addBookTemplate = () => {
    return html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input @click=${null, onSubmit} type="submit" value="Submit">
    </form>`
  }

  const editBookTemplate = () => {
      return html`
      <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input @click=${null, onSave} type="submit" value="Save">
    </form>`
  }

  async function getAllInfo() {
      const url = 'http://localhost:3030/jsonstore/collections/books';

      const response = await fetch(url);
      const data = await response.json();
      return data;
  }

  function onLoad() {
        let array = [{
          author: 'J. K. Rowling',
          title: 'Harry Potter' }, {
            author: 'George R. R. Martin',
            title: 'Game of Thrones'
          }];

        render(html`
       ${buttonTemplate('loadBooks', 'LOAD ALL BOOKS')}
      <table>
        ${theadTemplate()}
        <tbody>
         <!-- ${array.map(book => tbodyTemplate(book))}  -->
        </tbody>  
      </table>
      ${addBookTemplate()}`, document.body);
  }

  async function loadAllBooks() {
    let data = await getAllInfo();

      render(html`
       ${buttonTemplate('loadBooks', 'LOAD ALL BOOKS')}
      <table>
        ${theadTemplate()}
        <tbody>
         ${Object.entries(data).map(book => tbodyTemplate(book[1], book[0]))}   
        </tbody>  
      </table>
      ${addBookTemplate()}`, document.body);
  }

  let id;
  async function onSave(e) {
    e.preventDefault();
    let author = document.querySelector('input[name="author"]');
    let title = document.querySelector('input[name="title"]');

    const body = {
      title: title.value,
      author: author.value
    }

    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    const header = getHeader('PUT', body);
    const response = await fetch(url, header);
    const data = await response.json();
    author.value = '';
    title.value = ''; 
    return data;
  }

  async function onSubmit(e) {
    e.preventDefault();
    let author = document.querySelector('input[name="author"]');
    let title = document.querySelector('input[name="title"]');

    if(author.value == '' || title.value == '') {
      return;
    }

    const body = {
      "author": author.value,
      "title": title.value
    }

    const url = 'http://localhost:3030/jsonstore/collections/books';
    const header = getHeader('POST', body);
    const response = await fetch(url, header);
    if(response.status !== 200) {
       throw new Error('Invalid response!');
    }
    const data = await response.json();
    author.value = '';
    title.value = '';
    return data;
  }

  async function onEdit(e) {
    e.preventDefault();
      const tr = e.target.parentElement.parentElement;
         let children = tr.children;
         let data = await getAllInfo();

      render(html`
       ${buttonTemplate('loadBooks', 'LOAD ALL BOOKS')}
      <table>
        ${theadTemplate()}
        <tbody>
         ${Object.entries(data).map(book => tbodyTemplate(book[1], book[0]))}   
        </tbody>  
      </table>
      ${editBookTemplate()}`, document.body);
        id = tr.id;
        document.querySelector('input[name="author"]').value = children[1].textContent;
        document.querySelector('input[name="title"]').value = children[0].textContent;    
  }

  async function onDelete(e) {
    e.preventDefault();
    const parent = e.target.parentElement.parentElement;
    const url = `http://localhost:3030/jsonstore/collections/books/${parent.id}`;

    const header = getHeader('DELETE', null);
    const response = await fetch(url, header);
    const data = await response.json();
    parent.remove();
    return data;
  }

  function getHeader(method, body) {
      return {
        method,
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(body)
      }
  }