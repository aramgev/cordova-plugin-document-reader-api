//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {Authority} from './Authority';
import {Value} from './Value';
import {Extension} from './Extension';
import {CertificateChain} from './CertificateChain';

export class SignerInfo {
    constructor(){
        this.dataToHash = null;//String
        this.digestAlgorithm = null;//String
        this.paStatus = null;//long
        this.signatureAlgorithm = null;//String
        this.version = null;//int
        this.issuer = null;//Authority
        this.serialNumber = null;//Value
        this.signature = null;//Value
        this.subjectKeyIdentifier = null;//Value
        this.signedAttributes = [];//ArrayList<Extension>
        this.certificateChain = [];//ArrayList<CertificateChain>
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
            var result = new SignerInfo();
            result.dataToHash = jsonObject["dataToHash"];
            result.digestAlgorithm = jsonObject["digestAlgorithm"];
            result.paStatus = jsonObject["paStatus"];
            result.signatureAlgorithm = jsonObject["signatureAlgorithm"];
            result.version = jsonObject["version"];
            result.issuer = Authority.fromJson(jsonObject["issuer"]);
            result.serialNumber = Value.fromJson(jsonObject["serialNumber"]);
            result.signature = Value.fromJson(jsonObject["signature"]);
            result.subjectKeyIdentifier = Value.fromJson(jsonObject["subjectKeyIdentifier"]);
            for(var i in jsonObject["signedAttributes"]){
                result.signedAttributes.push(Extension.fromJson(jsonObject["signedAttributes"][i]));
            }
            for(var i in jsonObject["certificateChain"]){
                result.certificateChain.push(CertificateChain.fromJson(jsonObject["certificateChain"][i]));
            }
            for(var i in jsonObject["notifications"]){
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}
