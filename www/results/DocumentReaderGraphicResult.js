/*
import java.util.ArrayList;
import org.json.JSONObject;
*/

import {DocumentReaderGraphicField} from './DocumentReaderGraphicField';


export class DocumentReaderGraphicResult {
    constructor(){
        this.fields = [];//ArrayList<DocumentReaderGraphicField>
    }

    static fromJson(jsonObject) {
        var result=new DocumentReaderGraphicResult();
        for(var i in jsonObject["fields"]){
            result.fields.push(DocumentReaderGraphicField.fromJson(jsonObject["fields"][i]));
        }
        return result;
    }
}
