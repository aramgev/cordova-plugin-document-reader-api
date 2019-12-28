//import org.json.JSONObject;

export class Coordinate {
    constructor(){
        this.x = 0;//int
        this.y = 0;//int
    }
/*
    toJson() {
        var object = new JSONObject();
        try {
            object.put("x", this.x);
            object.put("y", this.y);
            return object.toString();
        } catch (var3) {
            var3.printStackTrace();
            return null;
        }
    }

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
            var result = new Coordinate();
            result.x = jsonObject["x"];
            result.y = jsonObject["y"];
            return result;
        }

        return null;
    }
}
