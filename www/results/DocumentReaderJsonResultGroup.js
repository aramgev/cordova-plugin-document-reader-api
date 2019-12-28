export class DocumentReaderJsonResultGroup {
    constructor(){
        this.resultType = null;//int
        this.lightType = null;//int
        this.pageIdx = null;//int
        this.jsonResult = null;//String
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderJsonResultGroup();
            result.resultType = jsonObject["resultType"];
            result.lightType = jsonObject["lightType"];
            result.pageIdx = jsonObject["pageIdx"];
            result.jsonResult = jsonObject["jsonResult"];
            return result;
        }

        return null;
    }
}
