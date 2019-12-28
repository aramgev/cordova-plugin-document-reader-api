//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {Value} from './Value';
import {Attribute} from './Attribute';

export class Authority {
    constructor(){
        this.data = null;//String
        this.friendlyName = null;//Value
        this.attributes = [];//ArrayList<Attribute>
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
            var result = new Authority();
            result.data = jsonObject["data"];
            result.friendlyName = Value.fromJson(jsonObject["friendlyName"]);
            for(var i in jsonObject["attributes"]){
                result.attributes.push(Attribute.fromJson(jsonObject["attributes"][i]));
            }
            return result;
        }

        return null;
    }
}
