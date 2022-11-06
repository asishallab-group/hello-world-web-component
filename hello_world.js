let getDataMethodName;
let shadow;

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        shadow = this.attachShadow({mode: 'open'});
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
    shadow.innerHTML = "<p>data: " + JSON.stringify(data) + "</p>";
}
