import {html, render} from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

 
const root = document.getElementById("allCats");
root.addEventListener('click', onToggle);

const catCard = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
            
        </div>
    </li>`
 
update();
 
function update () {
    render(html`<ul>
      ${cats.map(c => catCard(c))}
    </ul>`, root);
};



function onToggle(e) {
  if(e.target.className = 'showBtn') {
  const btn = e.target;
  const parent = btn.parentElement.parentElement;

    if(btn.textContent === "Show status code") {
      btn.textContent = "Hide status code";
      const div = parent.querySelector('div.status');
      div.style.display = 'block';
    } else {
      btn.textContent = "Show status code";
      const div = parent.querySelector('div.status');
      div.style.display = 'none';
    }
  }
}