let getDataMethodName;
let shadow;
const dataDiv = document.createElement("div");
// const plotlyImport = document.createElement('script');

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = "<div id='shadowDiv'></div>";
        loadExternalJS("https://cdn.plot.ly/plotly-2.16.1.min.js");
        addElementsToShadowDom();
        getDataMethodName = this.getAttribute('get-data-method');
    }
}

function addElementsToShadowDom() {
    const shadowDiv = shadow.getElementById("shadowDiv");
    dataDiv.id = "dataDiv";
    // plotlyImport.src = "https://cdn.plot.ly/plotly-2.16.1.min.js";
    // shadowDiv.appendChild(plotlyImport);
    // document.getElementsByTagName('head')[0].appendChild(plotlyImport)
    shadowDiv.appendChild(dataDiv);
}

window.addEventListener('load',
    () => {
        window.customElements.define("hello-world", HelloWorld);
        tryToGetData();
    }, false);

function tryToGetData() {
    let getDataFunction = window[getDataMethodName];
    getDataFunction().then(r => {
        console.log(r);
        plotData(r);
    });
}

function plotData(data) {
    Plotly.newPlot(dataDiv, data);
}

/**
 * used to load plotly.js code
 * should be replaced by a better method to load external js code
 * @param TARGET_URL
 */
function loadExternalJS(TARGET_URL){
    let xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    xhr.open('GET', TARGET_URL, false);
    xhr.send(null);
    let code = xhr.responseText;
    let dScript = document.createElement('script');
    try {
        dScript.appendChild( document.createTextNode(code) );
        document.getElementsByTagName('head')[0].appendChild(dScript);
    } catch(e) {
        dScript.text = code;
        document.getElementsByTagName('head')[0].appendChild(dScript);
    }
    xhr = null;
}
