//import java.util.ArrayList;
//import java.util.List;
//import org.json.JSONArray;
//import org.json.JSONObject;

export class AccessControlProcedureType {
    constructor(){
        this.activeOptionIdx = null;//int
        this.notifications = [];//List<Long>
        this.status = null;//long
        this.type = null;//int
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
            var result = new AccessControlProcedureType();
            result.activeOptionIdx = jsonObject["activeOptionIdx"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            for(var i in jsonObject["notifications"]){
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}
