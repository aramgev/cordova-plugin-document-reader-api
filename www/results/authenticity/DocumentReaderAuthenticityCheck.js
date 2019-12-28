import {DocumentReaderAuthenticityElement} from './DocumentReaderAuthenticityElement';

export class DocumentReaderAuthenticityCheck {
    constructor(){
        this.type = null;//int
        this.status = null;//int
        this.elements = [];//ArrayList<DocumentReaderAuthenticityElement>
        this.pageIndex = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderAuthenticityResult();
            result.type = jsonObject["type"];
            result.status = jsonObject["status"];
            result.pageIndex = jsonObject["pageIndex"];
            for(var i in jsonObject["elements"]){
                result.elements.push(DocumentReaderAuthenticityElement.fromJson(jsonObject["elements"][i]));
            }
            return result;
        }

        return null;
    }

    getTypeName(){
        if (this.type === 1) {
            return "UV dull paper check";
        } else if (this.type === 4) {
            return "Image patterns";
        } else if (this.type === 128) {
            return "IPI (invisible personal information)";
        } else {
            return this.type === 32768 ? "Portrait comparison" : (this.type + "");
        }
    }
}
