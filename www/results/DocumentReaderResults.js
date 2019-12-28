//import android.graphics.Bitmap;
//import com.regula.documentreader.api.results.authenticity.DocumentReaderAuthenticityCheckList;
//import com.regula.documentreader.api.results.rfid.RFIDSessionData;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.ListIterator;
//import org.json.JSONObject;

import {DocumentReaderGraphicResult} from './DocumentReaderGraphicResult';
import {DocumentReaderTextResult} from './DocumentReaderTextResult';
import {ElementPosition} from './ElementPosition';
import {ImageQualityGroup} from './ImageQualityGroup';
import {DocumentReaderDocumentType} from './DocumentReaderDocumentType';
import {DocumentReaderJsonResult} from './DocumentReaderJsonResult';
import {DocumentReaderNotification} from './DocumentReaderNotification';
import {RFIDSessionData} from './rfid/RFIDSessionData';
import {DocumentReaderAuthenticityResult} from './authenticity/DocumentReaderAuthenticityResult';

export class DocumentReaderResults {
    constructor(){
        this.chipPage = 100;//int
        this.overallResult = 2;//int
        this.processingFinished;//int
        this.morePagesAvailable = -1;//int
        this.rfidResult = 1;//int
        this.highResolution=null;//boolean
        this.graphicResult = null;//DocumentReaderGraphicResult
        this.textResult = null;//DocumentReaderTextResult
        this.documentPosition = null;//ElementPosition
        this.barcodePosition = null;//ElementPosition
        this.mrzPosition = null;//ElementPosition
        this.imageQuality = null;//ImageQualityGroup
        this.documentType = [];//ArrayList<DocumentReaderDocumentType>
        this.jsonResult = null;//DocumentReaderJsonResult
        this.documentReaderNotification = null;//DocumentReaderNotification
        this.rfidSessionData;//RFIDSessionData
        this.authenticityResult;//DocumentReaderAuthenticityResult
    }

    getTextFieldValueByType(fieldType, lcid = 0, source = -1, original = false) {
        if (this.textResult != null) {
            var field = this.findByTypeAndLcid(fieldType, lcid);
            if (field != null) {
                var value = this.findBySource(field, source);
                if (value != null) {
                    if (original) {
                        return value.originalValue;
                    }
                    return value.value;
                }
            }
        return null;
        }
    }

    getTextFieldStatusByType(fieldType, lcid = 0) {
        if (this.textResult != null) {
            var field = this.findByTypeAndLcid(fieldType, lcid);
            if (field != null) {
                return field.status;
            }
        }

        return 0;
    }

    getGraphicFieldImageByType(fieldType, source = -1, light = -1) {
        if (this.graphicResult != null) {
            var foundFields = [];
            for(var field in this.graphicResult.fields){
                field = this.graphicResult.fields[field];
                if (field.fieldType == fieldType) {
                    foundFields.push(field);
                }
            }

            if (source != -1) {
                for(var index in foundFields){
                    if (foundFields[index].sourceType != source) {
                        foundFields.splice(index, 1);
                    }
                }
            }

            if (light != -1) {
                for(var index in foundFields){
                    if (foundFields[index].light != light) {
                        foundFields.splice(index, 1);
                    }
                }
            }

            if (foundFields.length > 0) {
                return foundFields[0].value();//Bitmap converted to base64 string(int java library it's Bitmap)
            }
        }

        return null;
    }

    getQualityResult(imageQualityCheckType, securityFeature = -1) {
        var resultSum = 2;
        if (this.imageQuality != null) {
            for(var index in this.imageQuality.imageQualityList){
                var field = this.imageQuality.imageQualityList[index];
                if (field.type == imageQualityCheckType) {
                    if (securityFeature == -1) {
                        if (field.result == 0) {
                            resultSum = 0;
                            break;
                        }

                        if (field.result == 1) {
                            resultSum = field.result;
                        }
                    } else if (field.featureType == securityFeature) {
                        resultSum = field.result;
                        break;
                    }
                }
            }
        }

        return resultSum;
    }

    findByTypeAndLcid(type, lcid) {
        var foundFields = [];

        for(var field in this.textResult.fields){
            field = this.textResult.fields[field];
            if (field.fieldType == type) {
                foundFields.push(field);
            }
        }

        if (foundFields.length <= 0) {
            return null;
        } else {
            var foundField = null;

            for(var field in foundFields){
                field = foundFields[field];
                if (lcid == 0) {
                    foundField = field;
                    if (field.lcid == lcid) {
                        break;
                    }
                } else if (field.lcid == lcid) {
                    return field;
                }
            }

            return foundField;
        }
    }

    findBySource(field, sourceType) {
        var value;
        if (sourceType == -1) {
            var mrzVal = this.findBySource(field, 3);
            if (mrzVal != null) {
                return mrzVal;
            } else {
                value = this.findBySource(field, 18);
                if (value != null) {
                    return value;
                } else {
                    var visualVal = this.findBySource(field, 17);
                    return visualVal != null ? visualVal : null;
                }
            }
        } else {
            for(var item in field.values){
                item = field.values[item];
                if(item.sourceType == sourceType){
                    return item;
                }
            }

            return null;
        }
    }

    clone() {
        return DocumentReaderResults.fromJson(this);
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
            results = new DocumentReaderResults();
            results.chipPage = jsonObject["chipPage"];
            results.overallResult = jsonObject["overallResult"];
            results.processingFinished = jsonObject["processingFinished"];
            results.morePagesAvailable = jsonObject["morePagesAvailable"];
            results.rfidResult = jsonObject["rfidResult"];
            results.highResolution = jsonObject["highResolution"];
            results.graphicResult = DocumentReaderGraphicResult.fromJson(jsonObject["graphicResult"]);
            results.textResult = DocumentReaderTextResult.fromJson(jsonObject["textResult"]);
            results.documentPosition = ElementPosition.fromJson(jsonObject["documentPosition"]);
            results.barcodePosition = ElementPosition.fromJson(jsonObject["barcodePosition"]);
            results.mrzPosition = ElementPosition.fromJson(jsonObject["mrzPosition"]);
            results.imageQuality = ImageQualityGroup.fromJson(jsonObject["imageQualityGroup"]);
            for(var index in jsonObject["documentType"]){
                results.documentType.push(DocumentReaderDocumentType.fromJson(jsonObject["documentType"][index]));
            }
            results.jsonResult = DocumentReaderJsonResult.fromJson(jsonObject["jsonResult"]);
            results.documentReaderNotification = DocumentReaderNotification.fromJson(jsonObject["documentReaderNotification"]);
            results.rfidSessionData = RFIDSessionData.fromJson(jsonObject["rfidSessionData"]);
            results.authenticityResult = DocumentReaderAuthenticityResult.fromJson(jsonObject["authenticityResult"]);
            
            return results;
        }

        return null;
    }
}
