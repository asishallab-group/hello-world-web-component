// add Plotly as script
const plotlyImport = document.createElement('script');
plotlyImport.src = "https://cdn.plot.ly/plotly-2.16.1.min.js";
document.getElementsByTagName('head')[0].appendChild(plotlyImport)

// add Abstract WebComponent as script
const dataVisImport = document.createElement('script');
dataVisImport.src = "data-vis.js";
document.getElementsByTagName('head')[0].appendChild(dataVisImport)

// example validation - should be changed!
function validateData(data) {
    return new Promise(function (resolve, reject) {
        if (data.length % 2 === 0) {
            resolve();
        } else {
            reject('some error message.');
        }
    });
}

function analyzeAndVisualizeData(data, element) {
    return new Promise(function (resolve) {
        Plotly.newPlot(element, data);
        resolve();
    });
}