//import org.json.JSONObject;

export class Extension {
    constructor(){
        this.data = null;//String
        this.type = null;//String
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
            var result = new Extension();
            result.data = jsonObject["data"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}
