export class DocumentReaderAuthenticityElement {
    constructor(){
        this.elementType = null;//int
        this.status = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderAuthenticityResult();
            result.elementType = jsonObject["elementType"];
            result.status = jsonObject["status"];

            return result;
        }

        return null;
    }
}
