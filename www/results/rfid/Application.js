//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {File} from './File';

export class Application {
    constructor(){
        this.applicationID = null;//String
        this.dataHashAlgorithm = null;//String
        this.files = [];//ArrayList<File>
        this.status = null;//int
        this.type = null;//int
        this.unicodeVersion = null;//String
        this.version = null;//String
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
            var result = new Application();
            result.applicationID = jsonObject["applicationID"];
            result.dataHashAlgorithm = jsonObject["dataHashAlgorithm"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            result.unicodeVersion = jsonObject["unicodeVersion"];
            result.version = jsonObject["version"];
            for(var i in jsonObject["files"]){
                result.files.push(File.fromJson(jsonObject["files"][i]));
            }
            return result;
        }

        return null;
    }
}
