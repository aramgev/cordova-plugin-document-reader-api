//import org.json.JSONArray;
//import org.json.JSONObject;

export class DocumentReaderDocumentType {
    constructor(){
        this.name = null;//String
        this.documentID = null;//int
        this.ICAOCode = null;//String
        this.dType = null;//int
        this.FDSID = null;//int[]
        this.dFormat = null;//int
        this.dMRZ = null;//boolean
        this.dDescription = null;//String
        this.dYear = null;//String
        this.dCountryName = null;//String
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderDocumentType();
            result.name = jsonObject["name"];
            result.documentID = jsonObject["documentID"];
            result.ICAOCode = jsonObject["ICAOCode"];
            result.dType = jsonObject["dType"];
            result.FDSID = [];
            result.dFormat = jsonObject["dFormat"];
            result.dMRZ = jsonObject["dMRZ"];
            result.dDescription = jsonObject["dDescription"];
            result.dYear = jsonObject["dYear"];
            result.dCountryName = jsonObject["dCountryName"];
            for(var i in jsonObject["FDSID"]){
                result.FDSID.push(jsonObject["FDSID"][i]);
            }
            return result;
        }

        return null;
    }
}
