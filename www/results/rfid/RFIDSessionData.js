//import java.util.ArrayList;
//import org.json.JSONArray;
//import org.json.JSONObject;

import {AccessControlProcedureType} from './AccessControlProcedureType';
import {Application} from './Application';
import {SecurityObject} from './SecurityObject';
import {CardProperties} from './CardProperties';

export class RFIDSessionData {
    constructor(){
        this.accessControls = [];//ArrayList<AccessControlProcedureType>
        this.applications = [];//ArrayList<Application>
        this.securityObjects = [];//ArrayList<SecurityObject>
        this.cardProperties = null;//CardProperties
        this.totalBytesReceived = null;//int
        this.totalBytesSent = null;//int
        this.status = null;//long
        this.extLeSupport = null;//long
        this.processTime = null;//long
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
            var result = new RFIDSessionData();
            result.cardProperties = CardProperties.fromJson(jsonObject["result"]);
            result.totalBytesReceived = jsonObject["totalBytesReceived"];
            result.totalBytesSent = jsonObject["totalBytesSent"];
            result.status = jsonObject["status"];
            result.extLeSupport = jsonObject["extLeSupport"];
            result.processTime = jsonObject["processTime"];
            for(var i in jsonObject["accessControls"]){
                result.accessControls.push(AccessControlProcedureType.fromJson(jsonObject["accessControls"][i]));
            }
            for(var i in jsonObject["applications"]){
                result.applications.push(Application.fromJson(jsonObject["applications"][i]));
            }
            for(var i in jsonObject["securityObjects"]){
                result.securityObjects.push(SecurityObject.fromJson(jsonObject["securityObjects"][i]));
            }
            return result;
        }

        return null;
    }
}
