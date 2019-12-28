//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {DocumentReaderTextField} from './DocumentReaderTextField';

export class DocumentReaderTextResult {
    constructor(){
        this.status = 0;//int
        this.fields = [];//ArrayList<DocumentReaderTextField>
    }
/*
    static fromJson(json) {
        if (json != null && !json.isEmpty()) {
            try {
                var object = new JSONObject(json);
                return fromJson(object);
            } catch (var2) {
                var2.printStackTrace();
            }
        }

        return null;
    }
*/
    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderTextResult();
            result.status = jsonObject["status"];
            for(var i in jsonObject["fields"]){
                result.fields.push(DocumentReaderTextField.fromJson(jsonObject["fields"][i]));
            }
            return result;
        }
console.log("----------------------NULL----------");
        return null;
    }
}
