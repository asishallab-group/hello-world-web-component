import ShadowStylesStr from "./css/shadow-style.css?inline";
import {DataVis} from "./data-vis.js";
import Plotly from "plotly.js-dist";

class ScatterPlot extends DataVis {
    constructor() {
        super(ShadowStylesStr); // pass css string as an argument
    }

    /**
     * Gets data from dataLoader function, validates it and
     * saves validated data to the "data" class field
     */
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


    /**
     * Analyses and visualises data from the "data" class field
     */
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

/**
 * Binds the ScatterPlot class to the <scatter-plot> tag, when the page is loaded
 */
window.addEventListener('load', () => {
    window.customElements.define('scatter-plot', ScatterPlot);
})
