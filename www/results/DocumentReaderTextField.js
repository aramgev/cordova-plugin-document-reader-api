//import java.util.ArrayList;
//import java.util.Iterator;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {DocumentReaderValue} from './DocumentReaderValue';

export class DocumentReaderTextField {
    constructor(){
        this.fieldType = 0;//int
        this.lcid = 0;//int
        this.fieldName = null;//String
        this.status = 0;//int
        this.value = null;
        this.values = [];//ArrayList<DocumentReaderValue>
    }

    value() {
        return this.value;
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
            var result = new DocumentReaderTextField();
            result.fieldType = jsonObject["fieldType"];
            result.lcid = jsonObject["lcid"];
            result.fieldName = jsonObject["fieldName"];
            result.status = jsonObject["status"];
            result.value = jsonObject["value"];
            for(var i in jsonObject["values"]){
                result.values.push(DocumentReaderValue.fromJson(jsonObject["values"][i]));
            }
            return result;
        }

        return null;
    }
}
