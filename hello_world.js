let getDataMethodName;

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
    getDataFunction().then(r => {
        visualizeData(r);
    });
}

function visualizeData(data) {
    addDataParagraph(data);
    console.log(data);
}

function addDataParagraph(data) {
    /*const p = "<p>data: " + JSON.stringify(data) + "</p>";
    const pElement = document.createElement();
    pElement.innerHTML = p;
    document.getElementById("myComponent").shadowRoot.appendChild(pElement);
    this.shadowRoot.appendChild(p.cloneNode(true));*/
}
