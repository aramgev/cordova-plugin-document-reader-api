//import java.util.ArrayList;
//import java.util.List;

import {DocumentReaderJsonResultGroup} from './DocumentReaderJsonResultGroup';

export class DocumentReaderJsonResult {
    constructor(){
        this.results = [];//List<DocumentReaderJsonResultGroup>
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderJsonResult();
            for(var i in jsonObject["results"]){
                result.results.push(DocumentReaderJsonResultGroup.fromJson(jsonObject["results"][i]));
            }
            return result;
        }

        return null;
    }
}
