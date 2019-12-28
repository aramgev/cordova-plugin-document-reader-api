//import org.json.JSONObject;

import {Coordinate} from './Coordinate';

export class ElementPosition {
    constructor(){
        this.docFormat = null;//int
        this.width = null;//int
        this.height = null;//int
        this.angle = null;//double
        this.inverse = null;//int
        this.perspectiveTr = null;//int
        this.objArea = null;//int
        this.objIntAngleDev = null;//int
        this.resultStatus = null;//int
        this.center = null;//Coordinate
        this.leftTop = new Coordinate();//Coordinate
        this.leftBottom = new Coordinate();//Coordinate
        this.rightTop = new Coordinate();//Coordinate
        this.rightBottom = new Coordinate();//Coordinate
    }
/*
    toJson() {
        try {
            var object = new JSONObject();
            object.put("docFormat", this.docFormat);
            object.put("Width", this.width);
            object.put("Height", this.height);
            object.put("Angle", this.angle);
            object.put("Inverse", this.inverse);
            object.put("PerspectiveTr", this.perspectiveTr);
            object.put("ObjArea", this.objArea);
            object.put("ObjIntAngleDev", this.objIntAngleDev);
            object.put("ResultStatus", this.resultStatus);
            if (this.center != null) {
                object.put("Center", this.center.toJson());
            }

            if (this.leftTop != null) {
                object.put("LeftTop", this.leftTop.toJson());
            }

            if (this.leftBottom != null) {
                object.put("LeftBottom", this.leftBottom.toJson());
            }

            if (this.rightTop != null) {
                object.put("RightTop", this.rightTop.toJson());
            }

            if (this.rightBottom != null) {
                object.put("RightBottom", this.rightBottom.toJson());
            }

            return object.toString();
        } catch (var2) {
            var2.printStackTrace();
            return "";
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
            var result = new ElementPosition();
            result.docFormat = jsonObject["docFormat"];
            result.width = jsonObject["Width"];
            result.height = jsonObject["Height"];
            result.angle = jsonObject["Angle"];
            result.inverse = jsonObject["Inverse"];
            result.perspectiveTr = jsonObject["PerspectiveTr"];
            result.objArea = jsonObject["ObjArea"];
            result.objIntAngleDev = jsonObject["ObjIntAngleDev"];
            result.resultStatus = jsonObject["ResultStatus"];
            result.center = Coordinate.fromJson(jsonObject["Center"]);
            result.leftTop = Coordinate.fromJson(jsonObject["LeftTop"]);
            result.leftBottom = Coordinate.fromJson(jsonObject["LeftBottom"]);
            result.rightTop = Coordinate.fromJson(jsonObject["RightTop"]);
            result.rightBottom = Coordinate.fromJson(jsonObject["RightBottom"]);
            return result;
        }

        return null;
    }
}
