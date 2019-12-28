//import org.json.JSONObject;

export class FileData {
    constructor(){
        this.data = null;//String
        this.length = null;//int
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
            var result = new FileData();
            result.data = jsonObject["data"];
            result.length = jsonObject["length"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}
