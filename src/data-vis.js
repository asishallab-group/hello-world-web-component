export class DataVis extends HTMLElement {
    static get attrNames() {
        return {
            dataLoader: 'dataloader'
        };
    };

    static loadingClassName = "loading";
    static plotSpaceClassName = "plot-space";
    static errorMsgClassName = "error-msg";

    /**
     * instance of a validated function, specified in dataLoader attribute
     */
    dataLoaderFn = null;

    /**
     * validated data from dataLoader function
     */
    data = null;

    /**
     * shadowDOM element
     */
    #shadow = null;

    /**
     * Element, where the plot should be drawn
     */
    plotSpace = null;

    /**
     * constructor, should be called by super() inside classes that extend this class
     * @param shadowStylesStr - string of styles, that will be applied to all shadow elements
     */
    constructor(shadowStylesStr) {
        super();
        this.#checkMethodsImplemented()
        this.#createShadowDom(shadowStylesStr)
    }


    #createShadowDom(shadowStylesStr) {
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createShadowStyle(shadowStylesStr)
        this.#createPlotSpace()
    }


    #createShadowStyle(shadowStylesStr) {
        let style = document.createElement("style");
        style.innerHTML = shadowStylesStr;

        this.#shadow.appendChild(style)
    }


    /**
     * PlotSpace - element, where the plot should be drawn
     */
    #createPlotSpace() {
        this.plotSpace = document.createElement('div');
        this.#shadow.appendChild(this.plotSpace);
        this.plotSpace.classList.add(DataVis.plotSpaceClassName);
        this.plotSpace.part.add(DataVis.plotSpaceClassName);
    }


    /**
     * Checks if all required methods are implemented
     */
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

    /**
     * Shows loading spinner
     */
    #showLoadingSpinner() {
        this.plotSpace.classList.add(DataVis.loadingClassName)
    }

    /**
     * Hides loading spinner
     */
    #hideLoadingSpinner() {
        this.plotSpace.classList.remove(DataVis.loadingClassName)
    }

    /**
     * Shows 2 messages: one for user (on the page) and throws an exception win message for developer
     * @param userErrorText - short message for user
     * @param consoleErrorText - full message for developer
     */
    displayError(userErrorText, consoleErrorText) {
        let errorElement = document.createElement('p')
        errorElement.textContent = userErrorText;
        errorElement.classList.add(DataVis.errorMsgClassName);
        errorElement.part.add(DataVis.errorMsgClassName);
        this.plotSpace.appendChild(errorElement);

        this.#hideLoadingSpinner();

        throw consoleErrorText;
    }

    /**
     * Method is called when web component is initialized
     */
    async connectedCallback() {
        this.#showLoadingSpinner();

        this.#connectDataLoaderFunction();
        await this.validateData();
        this.analyzeAndVisualizeData();

        this.#hideLoadingSpinner();
    }

    /**
     * Getter for dataLoader attribute
     * @returns {string}
     */
    get dataLoaderAttr() {
        return this.getAttribute(DataVis.attrNames.dataLoader);
    }


    /**
     * Validated if dataLoader function is valid and saves it to variable for future use
     */
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
