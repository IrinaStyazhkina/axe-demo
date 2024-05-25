import * as Handlebars from "handlebars";
import {AxeScanResult} from "./types";
import {tableTemplate} from "./tableTemplate";

class AttachmentTemplateMaker {

    private globalCounter = 0;
    private readonly context = [];

    constructor(data: AxeScanResult) {
        this.context = data.violations;

        Handlebars.registerHelper('incrementIndex', this.incrementIndex.bind(this));
        Handlebars.registerHelper('equals', function (arg1, arg2) {
            return arg1 === arg2;
        });
    }

    incrementIndex() {
        return ++this.globalCounter;
    }

    public generateTableAttachment = () => {
        const template = Handlebars.compile(tableTemplate);
        return template({data: this.context});
    }
}

export default AttachmentTemplateMaker;