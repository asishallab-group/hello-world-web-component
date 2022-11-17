// TO RUN WITHOUT A SERVER: Remove "export" statement
export class DataVis extends HTMLElement {
    static get attrNames() {
        return {
            dataLoader: 'dataloader'
        };
    };

    static loadingClassName = "loading";
    static stylesheet = `
        .plot-space {
            height: 500px;
            width: 100%;
            /*display: block;*/
            border: 1px black dashed;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .error-msg {
            position: relative;
            color: red;
            text-align: center;
            font-weight: 600;
        }
        
        .error-msg::before {
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            content: "\\274c";
            font-size: 12px; 
            color: red;
        }
        
        .loading::after{
            content: "";
            box-sizing: border-box;
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #fff;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: blue transparent transparent transparent;
        }
        
        .loading {
            position: relative;
        }
        
        .loading::after:nth-child(1) {
            animation-delay: -0.45s;
        }
        .loading::after:nth-child(2) {
            animation-delay: -0.3s;
        }
        .loading::after:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    dataLoaderFn = null;
    data = null;

    #shadow = null;
    plotSpace = null;

    constructor() {
        super();
        this.#checkMethodsImplemented()
        this.#createShadowDom()
    }


    #createShadowDom() {
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createShowStyle()
        this.#createPlotSpace()
    }


    #createShowStyle() {
        let style = document.createElement("style");
        style.textContent = DataVis.stylesheet;
        this.#shadow.appendChild(style)
    }


    #createPlotSpace() {
        this.plotSpace = document.createElement('div');
        this.#shadow.appendChild(this.plotSpace);
        this.plotSpace.classList.add("plot-space");
    }


    #checkMethodsImplemented() {
        if (this.validateData === undefined) {
            this.displayError(
                'Initialization error',
                'function "validateData" must be implemented'
            );
        }

        if (this.analyzeAndVisualizeData === undefined) {
            this.displayError(
                'Initialization error',
                'function "validateData" must be implemented'
            );
        }
    }

    #showLoadingSpinner() {
        this.plotSpace.classList.add(DataVis.loadingClassName)
    }


    displayError(userErrorText, consoleErrorText) {
        let errorElement = document.createElement('p')
        errorElement.textContent = userErrorText;
        errorElement.classList.add("error-msg");
        this.plotSpace.appendChild(errorElement);

        this.#hideLoadingSpinner();

        throw consoleErrorText;
    }


    #hideLoadingSpinner() {
        this.plotSpace.classList.remove(DataVis.loadingClassName)
    }


    async connectedCallback() {
        this.#showLoadingSpinner();

        this.#connectDataLoaderFunction();
        await this.validateData();
        this.analyzeAndVisualizeData();

        this.#hideLoadingSpinner();
    }


    get dataLoaderAttr() {
        return this.getAttribute(DataVis.attrNames.dataLoader);
    }


    #connectDataLoaderFunction() {
        if(this.dataLoaderAttr === "") {
            this.displayError(
                'Attribute error',
                '"data-vis" element requires "dataLoader" attribute to be set'
            );
        }

        let fn = window[this.dataLoaderAttr];

        if(fn === undefined || fn === null || fn.constructor.name !== 'AsyncFunction') {
            this.displayError(
                'dataLoader function error',
                'dataLoader function does not exist or is not async'
            );
        }

        this.dataLoaderFn = fn;
    }
}
