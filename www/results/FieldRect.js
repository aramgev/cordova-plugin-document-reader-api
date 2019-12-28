//import org.json.JSONObject;

export class FieldRect {
    constructor(){
        this.bottom = null;//int
        this.left = null;//int
        this.right = null;//int
        this.top = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var rect = new FieldRect();
            rect.bottom = jsonObject["bottom"];
            rect.top = jsonObject["top"];
            rect.left = jsonObject["left"];
            rect.right = jsonObject["right"];
            return rect;
        }

        return null;
    }
}
