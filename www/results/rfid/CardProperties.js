//import org.json.JSONObject;

export class CardProperties {
    constructor(){
        this.aTQA = null;//int
        this.aTQB = null;//String
        this.aTR = null;//String
        this.baudrate1 = null;//String
        this.baudrate2 = null;//String
        this.bitRateR = null;//int
        this.bitRateS = null;//int
        this.chipTypeA = null;//int
        this.mifareMemory = null;//int
        this.rfidType = null;//int
        this.sAK = null;//int
        this.support4 = null;//boolean
        this.supportMifare = null;//boolean
        this.uID = null;//String
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
            var result = new CardProperties();
            result.aTQA = jsonObject["aTQA"];
            result.aTQB = jsonObject["aTQB"];
            result.aTR = jsonObject["aTR"];
            result.baudrate1 = jsonObject["baudrate1"];
            result.baudrate2 = jsonObject["baudrate2"];
            result.bitRateR = jsonObject["bitRateR"];
            result.bitRateS = jsonObject["bitRateS"];
            result.chipTypeA = jsonObject["chipTypeA"];
            result.mifareMemory = jsonObject["mifareMemory"];
            result.rfidType = jsonObject["rfidType"];
            result.sAK = jsonObject["sAK"];
            result.support4 = jsonObject["support4"];
            result.supportMifare = jsonObject["supportMifare"];
            result.uID = jsonObject["uID"];
            return result;
        }

        return null;
    }
}
