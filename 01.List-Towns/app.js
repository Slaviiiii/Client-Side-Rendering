import {html, render} from 'https://unpkg.com/lit-html?module';

  document.getElementById('btnLoadTowns').addEventListener('click', (e) => {
    e.preventDefault();
    let towns = document.getElementById('towns').value;
    if(!towns) {
      return;
    }

    towns = towns.split(', ');
    render(ulFunc(towns), document.getElementById('root'));  
 });

 const ulFunc = (content) =>  html`
  <ul>
   ${content.map(town => createLi(town))}
  </ul>`

 const createLi = (town) =>  html`
  <li>${town}</li>`; 