//import android.graphics.Rect;
//import java.util.HashMap;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {Rect} from './Rect';

export class DocumentReaderValue {
    constructor(){
        this.sourceType = -1;//int
        this.value = null;//String
        this.originalValue = null;//String
        this.pageIndex = null;//int
        this.boundRect = null;//Rect
        this.validity = 0;//int
        this.comparison = {};//HashMap<Integer, Integer>
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
            var result = new DocumentReaderValue();
            result.sourceType = jsonObject["sourceType"];
            result.value = jsonObject["value"];
            result.originalValue = jsonObject["originalValue"];
            result.pageIndex = jsonObject["pageIndex"];
            result.boundRect = Rect.fromJson(jsonObject["boundRect"]);
            result.validity = jsonObject["validity"];
            for(var i in jsonObject["comparison"]){
                result.comparison[jsonObject["comparison"][i]["key"]] = jsonObject["comparison"][i]["value"];
            }
            return result;
        }

        return null;
    }
}
