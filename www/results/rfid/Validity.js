//import org.json.JSONObject;

import {Value} from './Value';

export class Validity {
    constructor(){
        this.notAfter = null;//Value
        this.notBefore = null;//Value
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
            var result = new Validity();
            result.notAfter = Value.fromJson(jsonObject["notAfter"]);
            result.notBefore = Value.fromJson(jsonObject["notBefore"]);
            return result;
        }

        return null;
    }
}
