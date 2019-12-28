export class DocumentReaderNotification {
    constructor(){
        this.code = null;//int
        this.value = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderNotification();
            result.code = jsonObject["code"];
            result.value = jsonObject["value"];
            return result;
        }

        return null;
    }
}
