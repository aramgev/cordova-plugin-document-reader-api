//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {SignerInfo} from './SignerInfo';

export class SecurityObject {
    constructor(){
        this.fileReference = null;//int
        this.objectType = null;//String
        this.version = null;//int
        this.signerInfos = [];//ArrayList<SignerInfo>
        this.notifications = [];//ArrayList<Long>
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
            var result = new SecurityObject();
            result.fileReference = jsonObject["fileReference"];
            result.objectType = jsonObject["objectType"];
            result.version = jsonObject["version"];
            for(var i in jsonObject["signerInfos"]){
                result.signerInfos.push(SignerInfo.fromJson(jsonObject["signerInfos"][i]));
            }
            for(var i in jsonObject["notifications"]){
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}
