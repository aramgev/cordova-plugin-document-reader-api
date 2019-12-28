//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {Value} from './Value';
import {Authority} from './Authority';
import {Validity} from './Validity';
import {Extension} from './Extension';

export class CertificateChain {
    constructor(){
        this.fileName = null;//Value
        this.issuer = null;//Authority
        this.origin = null;//int
        this.paStatus = null;//long
        this.serialNumber = null;//String
        this.signatureAlgorithm = null;//String
        this.subject = null;//Authority
        this.subjectPKAlgorithm = null;//String
        this.type = null;//int
        this.validity = null;//Validity
        this.version = null;//int
        this.extensions = [];//ArrayList<Extension>
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
            var result = new CertificateChain();
            result.fileName = Value.fromJson(jsonObject["fileName"]);
            result.issuer = Authority.fromJson(jsonObject["issuer"]);
            result.origin = jsonObject["origin"];
            result.paStatus = jsonObject["paStatus"];
            result.serialNumber = jsonObject["serialNumber"];
            result.signatureAlgorithm = jsonObject["signatureAlgorithm"];
            result.subject = Authority.fromJson(jsonObject["subject"]);
            result.subjectPKAlgorithm = jsonObject["subjectPKAlgorithm"];
            result.type = jsonObject["type"];
            result.validity = Validity.fromJson(jsonObject["validity"]);
            result.version = jsonObject["version"];
            for(var i in jsonObject["extensions"]){
                result.extensions.push(Extension.fromJson(jsonObject["extensions"][i]));
            }
            for(var i in jsonObject["notifications"]){
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}
