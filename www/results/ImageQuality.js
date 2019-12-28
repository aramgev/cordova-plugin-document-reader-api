//import org.json.JSONObject;

export class ImageQuality {
    constructor(){
        this.featureType = null;//int
        this.result = null;//int
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
            var result = new ImageQuality();
            result.featureType = jsonObject["featureType"];
            result.result = jsonObject["result"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}
