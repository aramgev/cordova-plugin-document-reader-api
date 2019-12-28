//import org.json.JSONObject;

import {Value} from './Value';

export class Attribute {
    constructor(){
        this.type = null;//String
        this.value = null;//Value
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
            var result = new Attribute();
            result.type = jsonObject["type"];
            result.value = Value.fromJson(jsonObject["value"]);
            return result;
        }

        return null;
    }
}
