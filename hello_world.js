const template = document.createElement('template');
template.innerHTML = `
<style>
  .employee-card {
    font-family: sans-serif;
    background: #f4f6f7;
    width: 250px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }
</style>
<div class="employee-card">
  <img/>
  <div>
    <h3></h3>
  </div>
</div>`;

let getDataMethodName;
let data;

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        getDataMethodName = this.getAttribute('get-data-method');
    }
}

window.addEventListener('load',
    () => {
        window.customElements.define("hello-world", HelloWorld);
        tryToGetData();
    }, false);

function tryToGetData() {
    let getDataFunction = window[getDataMethodName];
    data = getDataFunction();
    visualizeData(data);
}

function visualizeData(data) {
    console.log(data);
}
