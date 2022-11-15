const getDataMethodNameAttribute = 'dataLoader';
let getDataMethodName;
let shadow;
const dataDiv = createDataDiv();
window.addEventListener('load',
    () => {
        window.customElements.define("data-vis", DataVis);
        tryToGetData();
    }, false);

function createDataDiv() {
    let div = document.createElement("div");
    div.id = "dataDiv";
    return div;
}

class DataVis extends HTMLElement {
    constructor() {
        super();
        shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = "<div id='shadowDiv'></div>";
        shadow.getElementById("shadowDiv").appendChild(dataDiv)
        getDataMethodName = this.getAttribute(getDataMethodNameAttribute);
    }
}

function tryToGetData() {
    let getDataFunction = window[getDataMethodName];
    getDataFunction().then(r => {
        validateData(r).then(() => {
            analyzeAndVisualizeData(r, dataDiv);
        }).catch((errorMessage) => {
            dataDiv.innerText = errorMessage.shortMessage;
            dataDiv.style.color = 'red';
            console.log(errorMessage.longMessage);
        });
    });
}
