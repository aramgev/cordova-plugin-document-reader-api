//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {ImageQuality} from './ImageQuality';

export class ImageQualityGroup {
    constructor(){
        this.count = null;//int
        this.result = null;//int
        this.imageQualityList = []//ArrayList<ImageQuality>
    }
/*
    static fromJson(json) {
        if (json != null && !json.isEmpty()) {
            try {
                JSONObject object = new JSONObject(json);
                return fromJson(object);
            } catch (Exception var2) {
                var2.printStackTrace();
            }
        }

        return null;
    }
*/
    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new ImageQualityGroup();
            result.count = jsonObject["count"];
            result.result = jsonObject["result"];
            for(var i in jsonObject["imageQualityList"]){
                result.imageQualityList.push(ImageQuality.fromJson(jsonObject["imageQualityList"][i]));
            }
            return result;
        }

        return null;
    }
}
