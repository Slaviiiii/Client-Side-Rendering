
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'

const textToSearch = document.getElementById('searchText');
const root = document.getElementById('towns');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', search);
let result = document.getElementById('result');
let matches = 0;

const townTemplate = (town) => html`
   <li>${town}</li>`;

render(html`<ul>${towns.map(t => townTemplate(t))}</ul>` , root);

function search() {
   let ul = document.querySelector('ul');
   const children = ul.children;
   for (const li of children) {
      let text = li.textContent;
      if (text.includes(textToSearch.value)) {
         matches++;
         li.classList.add('active');
         // li.style.fontWeight = 'bold';
         // li.style.textDecoration = 'underline';
      } 
      //    li.style.fontWeight = 'normal';
      //    li.style.textDecoration = 'none';
      // }
   }

   result.textContent = `${matches} matches found`;
}