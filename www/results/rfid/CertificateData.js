//import org.json.JSONObject;

export class CertificateData {
    constructor(){
        this.data = null;//String
        this.length = null;//int
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
        var result = new CertificateData();
        result.data = jsonObject["data"];
        result.length = jsonObject["length"];
        return result;
    }

    return null;
}
}
