// These import lines will work only when you start a webserver
// you can either use IntelliJ IDE which do it automatically
// or you can use node.js server, for example (or XAMPP, WAMP, OpenServer if you are on Windows)

// TO RUN WITHOUT A SERVER: Comment out the 2 lower lines
import {DataVis} from "./data-vis.js";
import "https://cdn.plot.ly/plotly-2.16.2.min.js"

class ScatterPlot extends DataVis {
    constructor() {
        super();
    }

    async validateData() {
        let data = await this.dataLoaderFn();

        let areAxisDefined = (data.x !== undefined && data.y !== undefined);
        let isCoordinatesNumberEqual = (data.x?.length === data.y?.length);

        let dataIsValid = areAxisDefined && isCoordinatesNumberEqual;

        if(dataIsValid) {
            this.data = data;
        } else {
            this.displayError(
                'Data format error',
                'data loader function returns data in invalid format'
            );
        }
    }


    analyzeAndVisualizeData() {
        let data = [{
            x: this.data.x,
            y: this.data.y,
            type: 'scatter',
            mode: 'markers',
            marker: { size: 12 }
        }];

        let layout = {
            title: 'Scatter plot example',
            // showLegend: false
        }

        let config = {
            scrollZoom: true,
            displayModeBar: false,
        }


        Plotly.newPlot(this.plotSpace, data, layout, config);
        // this.plotSpace.innerHTML = this.data;
    }
}


window.addEventListener('load', () => {
    window.customElements.define('scatter-plot', ScatterPlot);
})
