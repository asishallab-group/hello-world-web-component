export class DataVis extends HTMLElement {
    static get attrNames() {
        return {
            dataLoader: 'dataloader'
        };
    };

    static loadingClassName = "loading";
    static plotSpaceClassName = "plot-space";
    static errorMsgClassName = "error-msg";

    dataLoaderFn = null;
    data = null;

    #shadow = null;
    plotSpace = null;

    constructor(ShadowStyleStr) {
        super();
        this.#checkMethodsImplemented()
        this.#createShadowDom(ShadowStyleStr)
    }


    #createShadowDom(ShadowStyleStr) {
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createShadowStyle(ShadowStyleStr)
        this.#createPlotSpace()
    }


    #createShadowStyle(ShadowStyleStr) {
        let style = document.createElement("style");
        style.innerHTML = ShadowStyleStr;

        this.#shadow.appendChild(style)
    }


    #createPlotSpace() {
        this.plotSpace = document.createElement('div');
        this.#shadow.appendChild(this.plotSpace);
        this.plotSpace.classList.add(DataVis.plotSpaceClassName);
        this.plotSpace.part.add(DataVis.plotSpaceClassName);
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
        errorElement.classList.add(DataVis.errorMsgClassName);
        errorElement.part.add(DataVis.errorMsgClassName);
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
