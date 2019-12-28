/*
import org.json.JSONArray;
import org.json.JSONObject;
*/
class BarcodeData {
    constructor(){
        this.data;//String
        this.corners = [];//Coordinate[4]
        this.type;//String
    }
/*
    toJson() {
        var object = new JSONObject();

        try {
            object.put("data", this.data);
            object.put("type", this.type);
            if (this.corners != null) {
                var array = new JSONArray();
                var var3 = this.corners;
                var var4 = var3.length;

                for(var var5 = 0; var5 < var4; ++var5) {
                    var corner = var3[var5];
                    array.put(new JSONObject(corner.toJson()));
                }

                object.put("corners", array);
                return object.toString();
            }
        } catch (var7) {
            var7.printStackTrace();
        }

        return null;
    }
*/
    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new BarcodeData();
            result.data = jsonObject["data"];
            result.type = jsonObject["type"];
            array = jsonObject["corners"];
                if (array != null && array.length() > 0) {
                    result.corners = [];
                    for(var item in array) {
                        result.corners.push(Coordinate.fromJson(item));
                    }
                }
            return result;
        }

        return null;
    }
}
