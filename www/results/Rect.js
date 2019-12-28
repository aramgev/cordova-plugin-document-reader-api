export class Rect{
    constructor(){
        this.left = null;//int
        this.right = null;//int
        this.top = null;//int
        this.bottom = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new Rect();
            result.left = jsonObject["left"];
            result.right = jsonObject["right"];
            result.top = jsonObject["top"];
            result.bottom = jsonObject["bottom"];
            return result;
        }

        return null;
    }
}