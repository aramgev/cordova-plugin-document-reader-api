import {DocumentReaderAuthenticityCheck} from './DocumentReaderAuthenticityCheck';

export class DocumentReaderAuthenticityResult {
    constructor(){
        this.status = null;//int
        this.checks = [];//ArrayList<DocumentReaderAuthenticityCheck>
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderAuthenticityResult();
            result.status = jsonObject["status"];
            for(var i in jsonObject["checks"]){
                result.checks.push(DocumentReaderAuthenticityCheck.fromJson(jsonObject["checks"][i]));
            }
            return result;
        }

        return null;
    }
}
