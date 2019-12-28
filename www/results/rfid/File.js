//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {FileData} from './FileData';
import {SecurityObjectCertificates} from './SecurityObjectCertificates';

export class File {
    constructor(){
        this.fileData = null;//FileData
        this.fileID = null;//String
        this.notifications = [];//ArrayList<Long>
        this.pAStatus = null;//long
        this.readingStatus = null;//long
        this.readingTime = null;//int
        this.type = null;//int
        this.docFieldsText = [];//ArrayList<Integer>
        this.docFieldsGraphics = [];//ArrayList<Integer>
        this.docFieldsOriginals = [];//ArrayList<Integer>
        this.certificates = [];//SecurityObjectCertificates
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
            var result = new File();
            result.fileData = FileData.fromJson(jsonObject["fileData"]);
            result.fileID = jsonObject["fileID"];
            result.pAStatus = jsonObject["pAStatus"];
            result.readingStatus = jsonObject["readingStatus"];
            result.readingTime = jsonObject["readingTime"];
            result.retypesult = jsonObject["type"];
            result.certificates = SecurityObjectCertificates.fromJson(jsonObject["certificates"]);
            for(var i in jsonObject["notifications"]){
                result.notifications.push(jsonObject["notifications"][i]);
            }
            for(var i in jsonObject["docFieldsText"]){
                result.docFieldsText.push(jsonObject["docFieldsText"][i]);
            }
            for(var i in jsonObject["docFieldsGraphics"]){
                result.docFieldsGraphics.push(jsonObject["docFieldsGraphics"][i]);
            }
            for(var i in jsonObject["docFieldsOriginals"]){
                result.docFieldsOriginals.push(jsonObject["docFieldsOriginals"][i]);
            }
            return result;
        }

        return null;
    }
}
