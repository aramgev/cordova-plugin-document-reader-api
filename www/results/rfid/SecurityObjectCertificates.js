//import org.json.JSONObject;

import { CertificateData } from "./CertificateData";

export class SecurityObjectCertificates {
    constructor(){
        this.securityObject = null;//CertificateData
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
            var result = new SecurityObjectCertificates();
            result.securityObject = CertificateData.fromJson(jsonObject["securityObject"]);
            return result;
        }

        return null;
    }
}
