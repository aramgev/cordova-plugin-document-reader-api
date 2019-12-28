class Scenario {
    constructor() {
        const RGLDocReaderFrame = {
            RGLDocReaderFrameScenarioDefault: 0,
            RGLDocReaderFrameMax: 1,
            RGLDocReaderFrameNone: 2
        }
        const RGLDocReaderOrientation = {
            GLDocReaderOrientationRotate: 0,
            RGLDocReaderOrientationPortrait: 1,
            RGLDocReaderOrientationLandscape: 2
        }
        this.RGLDocReaderOrientation = RGLDocReaderOrientation;
        this.RGLDocReaderFrame = RGLDocReaderFrame;

        this.name = "";//String
        this.caption = "";//String
        this.description = "";//String
        this.uvTorch = false;//boolean
        this.frame = RGLDocReaderFrame.RGLDocReaderFrameScenarioDefault;//ios
        this.frameKWHLandscape = null;//ios
        this.frameKWHPortrait = null;//ios
        this.barcodeExt = false;//ios
        this.faceExt = false;//ios
        this.multiPageOff = false;//ios
        this.frameOrientation = RGLDocReaderOrientation.GLDocReaderOrientationRotate;
    }

    static fromJson(jsonObject) {
        var result = new Scenario();
        result.name = jsonObject["name"];
        result.caption = jsonObject["caption"];
        result.description = jsonObject["description"];
        result.uvTorch = jsonObject["uvTorch"];
        result.frame = jsonObject["frame"];
        result.frameKWHLandscape = jsonObject["frameKWHLandscape"];
        result.frameKWHPortrait = jsonObject["frameKWHPortrait"];
        result.barcodeExt = jsonObject["barcodeExt"];
        result.faceExt = jsonObject["faceExt"];
        result.multiPageOff = jsonObject["multiPageOff"];
        result.frameOrientation = jsonObject["frameOrientation"];

        return result;
    }
}

class FieldRect {
    constructor() {
        this.bottom = null;//int
        this.left = null;//int
        this.right = null;//int
        this.top = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var rect = new FieldRect();
            rect.bottom = jsonObject["bottom"];
            rect.top = jsonObject["top"];
            rect.left = jsonObject["left"];
            rect.right = jsonObject["right"];
            return rect;
        }

        return null;
    }
}

class DocumentReaderGraphicField {
    constructor() {
        this.sourceType = null;//int
        this.fieldType = null;//int
        this.fieldName = null;//String
        this.lightType = -1;//int
        this.lightName = null;//String
        this.fieldRect = new FieldRect();//FieldRect
        this.imgBytes = [];//byte[]
        this.base64Value = null;//String
        this.pageIndex = null;//int
        this.width = null;
        this.height = null;
    }

    value() {
        return this.base64Value;//Bitmap converted to base64 string(int java library it's Bitmap)
    }

    setImageData(val, width, height) {
        this.imgBytes = val;
        this.width = width;
        this.height = height;
    }
    /*
        static fromJson(json) {
            if (json != null && !json.isEmpty()) {
                try {
                    object = new JSONObject(json);
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
            var field = new DocumentReaderGraphicField();
            field.sourceType = jsonObject["sourceType"];
            field.fieldType = jsonObject["fieldType"];
            field.fieldName = jsonObject["fieldName"];
            field.lightType = jsonObject["lightType"];
            field.lightName = jsonObject["lightName"];
            field.fieldRect = FieldRect.fromJson(jsonObject["fieldRect"]);
            //field.imgBytes=atob(jsonObject["value"], 3);  DECODE 64
            field.base64Value = jsonObject["value"];
            field.width = jsonObject["width"];
            field.height = jsonObject["height"];
            field.pageIndex = jsonObject["pageIndex"];
            return field;
        }

        return null;
    }
               
    log(tab){
        console.log(tab + "{");
        console.log(tab + "    sourceType: " + this.sourceType);
        console.log(tab + "    fieldType: " + this.fieldType);
        console.log(tab + "    fieldName: " + this.fieldName);
        console.log(tab + "    lightType: " + this.lightType);
        console.log(tab + "    lightName: " + this.lightName);
        console.log(tab + "    fieldRect: {");
        console.log(tab + "        left: " + this.fieldRect.left);
        console.log(tab + "        right: " + this.fieldRect.right);
        console.log(tab + "        top: " + this.fieldRect.top);
        console.log(tab + "        bottom: " + this.fieldRect.bottom);
        console.log(tab + "    }");
        console.log(tab + "    imgBytes: " + this.imgBytes);
        console.log(tab + "    base64Value: image");
        console.log(tab + "    pageIndex: " + this.pageIndex);
        console.log(tab + "    width: " + this.width);
        console.log(tab + "    height: " + this.height);
        console.log(tab + "}");
    }
}

class DocumentReaderGraphicResult {
    constructor() {
        this.fields = [];//ArrayList<DocumentReaderGraphicField>
    }

    static fromJson(jsonObject) {
        var result = new DocumentReaderGraphicResult();
        for (var i in jsonObject["fields"]) {
            result.fields.push(DocumentReaderGraphicField.fromJson(jsonObject["fields"][i]));
        }
        return result;
    }
               
    log(){
        console.log("{\"fields\":[");
        for (var i in this.fields) {
            this.fields[i].log("    ");
        }
        console.log("]}");
    }
}

class Rect {
    constructor() {
        this.left = null;//int
        this.right = null;//int
        this.top = null;//int
        this.bottom = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new Rect();
            result.left = jsonObject["left"];
            result.right = jsonObject["right"];
            result.top = jsonObject["top"];
            result.bottom = jsonObject["bottom"];
            return result;
        }

        return null;
    }
}

class DocumentReaderValue {
    constructor() {
        this.pageIndex = 0;
        this.sourceType = -1;//int
        this.value = null;//String
        this.originalValue = null;//String
        this.page = null;//int
        this.boundRect = null;//Rect
        this.validity = 0;//int
        this.comparison = {};//HashMap<Integer, Integer>
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
            var result = new DocumentReaderValue();
            result.pageIndex = jsonObject["pageIndex"];
            result.sourceType = jsonObject["sourceType"];
            result.value = jsonObject["value"];
            result.originalValue = jsonObject["originalValue"];
            result.page = jsonObject["page"];
            result.boundRect = Rect.fromJson(jsonObject["boundRect"]);
            result.validity = jsonObject["validity"];
            for (var i in jsonObject["comparison"]) {
                result.comparison[i] = jsonObject["comparison"][i];
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderTextField {
    constructor() {
        this.fieldType = 0;//int
        this.lcid = 0;//int
        this.lcidName = null;//String
        this.fieldName = null;//String
        this.status = 0;//int
        this.value = null;
        this.values = [];//ArrayList<DocumentReaderValue>
    }

    value() {
        return this.value;
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
            var result = new DocumentReaderTextField();
            result.fieldType = jsonObject["fieldType"];
            result.lcid = jsonObject["lcid"];
            result.lcidName = jsonObject["lcidName"];
            result.fieldName = jsonObject["fieldName"];
            result.status = jsonObject["status"];
            result.value = DocumentReaderValue.fromJson(jsonObject["value"]);
            for (var i in jsonObject["values"]) {
                result.values.push(DocumentReaderValue.fromJson(jsonObject["values"][i]));
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderTextResult {
    constructor() {
        this.status = 0;//int
        this.fields = [];//ArrayList<DocumentReaderTextField>
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
            var result = new DocumentReaderTextResult();
            result.status = jsonObject["status"];
            for (var i in jsonObject["fields"]) {
                result.fields.push(DocumentReaderTextField.fromJson(jsonObject["fields"][i]));
            }
            return result;
        }
        console.log("----------------------NULL----------");
        return null;
    }
}

class Coordinate {
    constructor() {
        this.x = 0;//int
        this.y = 0;//int
    }
    /*
        toJson() {
            var object = new JSONObject();
            try {
                object.put("x", this.x);
                object.put("y", this.y);
                return object.toString();
            } catch (var3) {
                var3.printStackTrace();
                return null;
            }
        }
    
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
            var result = new Coordinate();
            result.x = jsonObject["x"];
            result.y = jsonObject["y"];
            return result;
        }

        return null;
    }
}

class ElementPosition {
    constructor() {
        this.docFormat = null;//int
        this.width = null;//int
        this.height = null;//int
        this.angle = null;//double
        this.inverse = null;//int
        this.perspectiveTr = null;//int
        this.objArea = null;//int
        this.objIntAngleDev = null;//int
        this.resultStatus = null;//int
        this.center = null;//Coordinate
        this.leftTop = new Coordinate();//Coordinate
        this.leftBottom = new Coordinate();//Coordinate
        this.rightTop = new Coordinate();//Coordinate
        this.rightBottom = new Coordinate();//Coordinate
    }
    /*
        toJson() {
            try {
                var object = new JSONObject();
                object.put("docFormat", this.docFormat);
                object.put("Width", this.width);
                object.put("Height", this.height);
                object.put("Angle", this.angle);
                object.put("Inverse", this.inverse);
                object.put("PerspectiveTr", this.perspectiveTr);
                object.put("ObjArea", this.objArea);
                object.put("ObjIntAngleDev", this.objIntAngleDev);
                object.put("ResultStatus", this.resultStatus);
                if (this.center != null) {
                    object.put("Center", this.center.toJson());
                }
    
                if (this.leftTop != null) {
                    object.put("LeftTop", this.leftTop.toJson());
                }
    
                if (this.leftBottom != null) {
                    object.put("LeftBottom", this.leftBottom.toJson());
                }
    
                if (this.rightTop != null) {
                    object.put("RightTop", this.rightTop.toJson());
                }
    
                if (this.rightBottom != null) {
                    object.put("RightBottom", this.rightBottom.toJson());
                }
    
                return object.toString();
            } catch (var2) {
                var2.printStackTrace();
                return "";
            }
        }
    
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
            var result = new ElementPosition();
            result.docFormat = jsonObject["docFormat"];
            result.width = jsonObject["Width"];
            result.height = jsonObject["Height"];
            result.angle = jsonObject["Angle"];
            result.inverse = jsonObject["Inverse"];
            result.perspectiveTr = jsonObject["PerspectiveTr"];
            result.objArea = jsonObject["ObjArea"];
            result.objIntAngleDev = jsonObject["ObjIntAngleDev"];
            result.resultStatus = jsonObject["ResultStatus"];
            result.center = Coordinate.fromJson(jsonObject["Center"]);
            result.leftTop = Coordinate.fromJson(jsonObject["LeftTop"]);
            result.leftBottom = Coordinate.fromJson(jsonObject["LeftBottom"]);
            result.rightTop = Coordinate.fromJson(jsonObject["RightTop"]);
            result.rightBottom = Coordinate.fromJson(jsonObject["RightBottom"]);
            return result;
        }

        return null;
    }
}

class ImageQuality {
    constructor() {
        this.featureType = null;//int
        this.result = null;//int
        this.type = null;//int
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
            var result = new ImageQuality();
            result.featureType = jsonObject["featureType"];
            result.result = jsonObject["result"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}

class ImageQualityGroup {
    constructor() {
        this.count = null;//int
        this.result = null;//int
        this.imageQualityList = []//ArrayList<ImageQuality>
    }
    /*
        static fromJson(json) {
            if (json != null && !json.isEmpty()) {
                try {
                    JSONObject object = new JSONObject(json);
                    return fromJson(object);
                } catch (Exception var2) {
                    var2.printStackTrace();
                }
            }
    
            return null;
        }
    */
    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new ImageQualityGroup();
            result.count = jsonObject["count"];
            result.result = jsonObject["result"];
            for (var i in jsonObject["imageQualityList"]) {
                result.imageQualityList.push(ImageQuality.fromJson(jsonObject["imageQualityList"][i]));
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderDocumentType {
    constructor() {
        this.pageIndex = 0;
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
            result.pageIndex = jsonObject["pageIndex"];
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
            for (var i in jsonObject["FDSID"]) {
                result.FDSID.push(jsonObject["FDSID"][i]);
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderJsonResultGroup {
    constructor() {
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

class DocumentReaderJsonResult {
    constructor() {
        this.results = [];//List<DocumentReaderJsonResultGroup>
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderJsonResult();
            for (var i in jsonObject["results"]) {
                result.results.push(DocumentReaderJsonResultGroup.fromJson(jsonObject["results"][i]));
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderNotification {
    constructor() {
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

class AccessControlProcedureType {
    constructor() {
        this.activeOptionIdx = null;//int
        this.notifications = [];//List<Long>
        this.status = null;//long
        this.type = null;//int
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
            var result = new AccessControlProcedureType();
            result.activeOptionIdx = jsonObject["activeOptionIdx"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            for (var i in jsonObject["notifications"]) {
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}

class FileData {
    constructor() {
        this.data = null;//String
        this.length = null;//int
        this.status = null;//long
        this.type = null;//int
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
            var result = new FileData();
            result.data = jsonObject["data"];
            result.length = jsonObject["length"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}

class CertificateData {
    constructor() {
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

class SecurityObjectCertificates {
    constructor() {
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

class File {
    constructor() {
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
            for (var i in jsonObject["notifications"]) {
                result.notifications.push(jsonObject["notifications"][i]);
            }
            for (var i in jsonObject["docFieldsText"]) {
                result.docFieldsText.push(jsonObject["docFieldsText"][i]);
            }
            for (var i in jsonObject["docFieldsGraphics"]) {
                result.docFieldsGraphics.push(jsonObject["docFieldsGraphics"][i]);
            }
            for (var i in jsonObject["docFieldsOriginals"]) {
                result.docFieldsOriginals.push(jsonObject["docFieldsOriginals"][i]);
            }
            return result;
        }

        return null;
    }
}

class Application {
    constructor() {
        this.applicationID = null;//String
        this.dataHashAlgorithm = null;//String
        this.files = [];//ArrayList<File>
        this.status = null;//int
        this.type = null;//int
        this.unicodeVersion = null;//String
        this.version = null;//String
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
            var result = new Application();
            result.applicationID = jsonObject["applicationID"];
            result.dataHashAlgorithm = jsonObject["dataHashAlgorithm"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            result.unicodeVersion = jsonObject["unicodeVersion"];
            result.version = jsonObject["version"];
            for (var i in jsonObject["files"]) {
                result.files.push(File.fromJson(jsonObject["files"][i]));
            }
            return result;
        }

        return null;
    }
}

class Value {
    constructor() {
        this.data = null;//String
        this.length = null;//int
        this.status = null;//long
        this.type = null;//int
        this.format = null;//String
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
            var result = new Value();
            result.data = jsonObject["data"];
            result.length = jsonObject["length"];
            result.status = jsonObject["status"];
            result.type = jsonObject["type"];
            result.format = jsonObject["format"];
            return result;
        }

        return null;
    }
}

class Attribute {
    constructor() {
        this.type = null;//String
        this.value = null;//Value
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
            var result = new Attribute();
            result.type = jsonObject["type"];
            result.value = Value.fromJson(jsonObject["value"]);
            return result;
        }

        return null;
    }
}

class Authority {
    constructor() {
        this.data = null;//String
        this.friendlyName = null;//Value
        this.attributes = [];//ArrayList<Attribute>
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
            var result = new Authority();
            result.data = jsonObject["data"];
            result.friendlyName = Value.fromJson(jsonObject["friendlyName"]);
            for (var i in jsonObject["attributes"]) {
                result.attributes.push(Attribute.fromJson(jsonObject["attributes"][i]));
            }
            return result;
        }

        return null;
    }
}

class Extension {
    constructor() {
        this.data = null;//String
        this.type = null;//String
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
            var result = new Extension();
            result.data = jsonObject["data"];
            result.type = jsonObject["type"];
            return result;
        }

        return null;
    }
}

class Validity {
    constructor() {
        this.notAfter = null;//Value
        this.notBefore = null;//Value
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
            var result = new Validity();
            result.notAfter = Value.fromJson(jsonObject["notAfter"]);
            result.notBefore = Value.fromJson(jsonObject["notBefore"]);
            return result;
        }

        return null;
    }
}

class CertificateChain {
    constructor() {
        this.fileName = null;//Value
        this.issuer = null;//Authority
        this.origin = null;//int
        this.paStatus = null;//long
        this.serialNumber = null;//String
        this.signatureAlgorithm = null;//String
        this.subject = null;//Authority
        this.subjectPKAlgorithm = null;//String
        this.type = null;//int
        this.validity = null;//Validity
        this.version = null;//int
        this.extensions = [];//ArrayList<Extension>
        this.notifications = [];//ArrayList<Long>
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
            var result = new CertificateChain();
            result.fileName = Value.fromJson(jsonObject["fileName"]);
            result.issuer = Authority.fromJson(jsonObject["issuer"]);
            result.origin = jsonObject["origin"];
            result.paStatus = jsonObject["paStatus"];
            result.serialNumber = jsonObject["serialNumber"];
            result.signatureAlgorithm = jsonObject["signatureAlgorithm"];
            result.subject = Authority.fromJson(jsonObject["subject"]);
            result.subjectPKAlgorithm = jsonObject["subjectPKAlgorithm"];
            result.type = jsonObject["type"];
            result.validity = Validity.fromJson(jsonObject["validity"]);
            result.version = jsonObject["version"];
            for (var i in jsonObject["extensions"]) {
                result.extensions.push(Extension.fromJson(jsonObject["extensions"][i]));
            }
            for (var i in jsonObject["notifications"]) {
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}

class SignerInfo {
    constructor() {
        this.dataToHash = null;//String
        this.digestAlgorithm = null;//String
        this.paStatus = null;//long
        this.signatureAlgorithm = null;//String
        this.version = null;//int
        this.issuer = null;//Authority
        this.serialNumber = null;//Value
        this.signature = null;//Value
        this.subjectKeyIdentifier = null;//Value
        this.signedAttributes = [];//ArrayList<Extension>
        this.certificateChain = [];//ArrayList<CertificateChain>
        this.notifications = [];//ArrayList<Long>
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
            var result = new SignerInfo();
            result.dataToHash = jsonObject["dataToHash"];
            result.digestAlgorithm = jsonObject["digestAlgorithm"];
            result.paStatus = jsonObject["paStatus"];
            result.signatureAlgorithm = jsonObject["signatureAlgorithm"];
            result.version = jsonObject["version"];
            result.issuer = Authority.fromJson(jsonObject["issuer"]);
            result.serialNumber = Value.fromJson(jsonObject["serialNumber"]);
            result.signature = Value.fromJson(jsonObject["signature"]);
            result.subjectKeyIdentifier = Value.fromJson(jsonObject["subjectKeyIdentifier"]);
            for (var i in jsonObject["signedAttributes"]) {
                result.signedAttributes.push(Extension.fromJson(jsonObject["signedAttributes"][i]));
            }
            for (var i in jsonObject["certificateChain"]) {
                result.certificateChain.push(CertificateChain.fromJson(jsonObject["certificateChain"][i]));
            }
            for (var i in jsonObject["notifications"]) {
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}

class SecurityObject {
    constructor() {
        this.fileReference = null;//int
        this.objectType = null;//String
        this.version = null;//int
        this.signerInfos = [];//ArrayList<SignerInfo>
        this.notifications = [];//ArrayList<Long>
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
            var result = new SecurityObject();
            result.fileReference = jsonObject["fileReference"];
            result.objectType = jsonObject["objectType"];
            result.version = jsonObject["version"];
            for (var i in jsonObject["signerInfos"]) {
                result.signerInfos.push(SignerInfo.fromJson(jsonObject["signerInfos"][i]));
            }
            for (var i in jsonObject["notifications"]) {
                result.notifications.push(jsonObject["notifications"][i]);
            }
            return result;
        }

        return null;
    }
}

class CardProperties {
    constructor() {
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

class RFIDSessionData {
    constructor() {
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
            for (var i in jsonObject["accessControls"]) {
                result.accessControls.push(AccessControlProcedureType.fromJson(jsonObject["accessControls"][i]));
            }
            for (var i in jsonObject["applications"]) {
                result.applications.push(Application.fromJson(jsonObject["applications"][i]));
            }
            for (var i in jsonObject["securityObjects"]) {
                result.securityObjects.push(SecurityObject.fromJson(jsonObject["securityObjects"][i]));
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderResults {
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
        this.barcodeResult;
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
            var results = new DocumentReaderResults();
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
            results.imageQuality = ImageQualityGroup.fromJson(jsonObject["imageQuality"]);
            for(var index in jsonObject["documentType"]){
                results.documentType.push(DocumentReaderDocumentType.fromJson(jsonObject["documentType"][index]));
            }
            results.jsonResult = DocumentReaderJsonResult.fromJson(jsonObject["jsonResult"]);
            results.documentReaderNotification = DocumentReaderNotification.fromJson(jsonObject["documentReaderNotification"]);
            results.rfidSessionData = RFIDSessionData.fromJson(jsonObject["rfidSessionData"]);
            results.authenticityResult = DocumentReaderAuthenticityResult.fromJson(jsonObject["authenticityResult"]);
            results.barcodeResult = DocumentReaderBarcodeResult.fromJson(jsonObject["barcodeResult"]);
            
            return results;
        }

        return null;
    }
}

class DocumentReaderBarcodeResult{
    constructor(){
        this.fields = [];
    }

    static fromJson(jsonObject){
        if (jsonObject != null) {
            var result = new DocumentReaderBarcodeResult();
            for(var i in jsonObject["fields"]){
                result.fields.push(DocumentReaderBarcodeField.fromJson(jsonObject["fields"][i]));
            }
            return result;
        }
        return null;
    }
}

class DocumentReaderBarcodeField{
    constructor(){
        this.barcodeType;
        this.status;
        this.pdf417Info;
        this.data;
        this.pageIndex;
    }

    static fromJson(jsonObject){
        if (jsonObject != null) {
            var result = new DocumentReaderBarcodeField();
            result.barcodeType = jsonObject["barcodeType"];
            result.status = jsonObject["status"];
            result.pdf417Info = jsonObject["pdf417Info"];
            result.data = jsonObject["data"];
            result.pageIndex = jsonObject["pageIndex"];
            return result;
        }
        return null;
    }
}

class DocumentReaderAuthenticityResult {
    constructor(){
        this.status = null;//int
        this.checks = [];//ArrayList<DocumentReaderAuthenticityCheck>
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderAuthenticityResult();
            result.status = jsonObject["status"];
            for(var i in jsonObject["checks"]){
                result.checks.push(DocumentReaderAuthenticityCheck.fromJson(jsonObject["checks"][i]));
            }
            return result;
        }

        return null;
    }
}

class DocumentReaderAuthenticityCheck {
    constructor(){
        this.type = null;//int
        this.status = null;//int
        this.elements = [];//ArrayList<DocumentReaderAuthenticityElement>
        this.pageIndex = null;//int
    }

    static fromJson(jsonObject) {
        if (jsonObject != null) {
            var result = new DocumentReaderAuthenticityResult();
            result.type = jsonObject["type"];
            result.status = jsonObject["status"];
            result.pageIndex = jsonObject["pageIndex"];
            for(var i in jsonObject["elements"]){
                result.elements.push(DocumentReaderAuthenticityElement.fromJson(jsonObject["elements"][i]));
            }
            return result;
        }

        return null;
    }

    getTypeName(){
        if (this.type === 1) {
            return "UV dull paper check";
        } else if (this.type === 4) {
            return "Image patterns";
        } else if (this.type === 128) {
            return "IPI (invisible personal information)";
        } else {
            return this.type === 32768 ? "Portrait comparison" : (this.type + "");
        }
    }
}

class DocumentReaderAuthenticityElement {
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



//-------------------------------ENUM-----------------------------



const AVCaptureSession = {
    PresetLow: "AVCaptureSessionPresetLow",
    PresetMedium: "AVCaptureSessionPresetMedium",
    PresetHigh: "AVCaptureSessionPresetHigh",
    PresetPhoto: "AVCaptureSessionPresetPhoto",
    PresetInputPriority: "AVCaptureSessionPresetInputPriority",
    PresetQHD960x540: "AVCaptureSessionPreset960x540",
    PresetHD1280x720: "AVCaptureSessionPreset1280x720",
    PresetHD1920x1080: "AVCaptureSessionPreset1920x1080",
    PresetHD4K3840x2160: "AVCaptureSessionPreset3840x2160",
    PresetIFrame960x540: "AVCaptureSessionPresetiFrame960x540",
    PresetIFrame1280x720: "AVCaptureSessionPresetiFrame1280x720",
    PresetQVGA320x240: "AVCaptureSessionPreset320x240",
    PresetVGA640x480: "AVCaptureSessionPreset640x480",
    PresetCIF352x288: "AVCaptureSessionPreset352x288"
}

const AVCaptureDevicePosition = {
    Unspecified: 0,
    Back: 1,
    Front: 2
}

const FontStyle = {
    NORMAL: 0,
    BOLD: 1,
    ITALIC: 2,
    BOLD_ITALIC: 3
}

const BarcodeResult = {
    NO_ERR: 0,
    NULL_PTR_ERR: -6001,
    BAD_ARG_ERR: -6002,
    SIZE_ERR: -6003,
    RANGE_ERR: -6004,
    INTERNAL_ERR: -6005,
    TRY_EXCEPT_ERR: -6006,
    BAR_CODE_NOT_FOUND: -6008,
    BAR_CODE_DECODE_ERR: -6010,
    NO_USER_DLL_FOUND: -6019,
    NO_IPP_DLL_FOUND: -6020,
    IPP_EXEC_ERR: -6024,
    IPP_TRY_EXCEPT_ERR: -6025,
    BARCODE_ERROR_INPUT_PARAM: -11001,
    BARCODE_ERROR_FINIT: -11006,
    BARCODE_ERROR_NOT_LOAD_IP_DECODED_LL: -11012,
    BARCODE_ERROR_INNER_PROBLEM: -11100,
    BARCODE_ERROR_DECODE_1D_BAD_DECODE: -11200,
    BARCODE_ERROR_FIND_ROW_OR_COLUMN: -11201,
    BARCODE_ERROR_FIND_3X8_2D_X: -11202,
    BARCODE_ERROR_FIND_3X8_2D_Y: -11203,
    BARCODE_ERROR_2D_UGOL_MAX: -11204,
    BARCODE_ERROR_INDEFINITELY_DECODED: -11210,
    BARCODE_ERROR_DLL_NOT_INIT: -11300,
    BARCODE_ERROR_IP_DECODE_DLL_Try_Except: -11400,
    IPDECODE_ERROR_LARGEERRORS: -4503,
    IPDECODE_ERROR_FAULTCOLUMNS: -4504,
    IPDECODE_ERROR_FAULTROWS: -4505,
    IPDECODE_ERROR_INCORRECT_ERROR_LEVEL: -4511,
    IPDECODE_ERROR_LOADING_DEV_TABLE: -4512,
};

const BarcodeType = {
    UNKNOWN: 0,
    BCT_CODE128: 1,
    CODE39: 2,
    EAN8: 3,
    ITF: 4,
    PDF417: 5,
    STF: 6,
    MTF: 7,
    IATA: 8,
    CODABAR: 9,
    UPCA: 10,
    CODE93: 11,
    UPCE: 12,
    EAN13: 13,
    QRCODE: 14,
    AZTEC: 15,
    DATAMATRIX: 16,
    ALL_1D: 17,
};

const CameraTypes = {
    FRONT: "front",
    BACK: "back",
}

const diDocType = {
    dtNotDefined: 0,
    dtPassport: 11,
    dtIdentityCard: 12,
    dtDiplomaticPassport: 13,
    dtServicePassport: 14,
    dtSeamansIdentityDocument: 15,
    dtIdentityCardforResidence: 16,
    dtTraveldocument: 17,
    dtOther: 99,
    dtVisaID2: 29,
    dtVisaID3: 30,
    dtRegistrationCertificate: 31,
    dtNationalIdentityCard: 20,
    dtSocialIdentityCard: 21,
    dtAliensIdentityCard: 22,
    dtPrivilegedIdentityCard: 23,
    dtResidencePermitIdentityCard: 24,
    dtOriginCard: 25,
    dtEmergencyPassport: 26,
    dtAliensPassport: 27,
    dtAlternativeIdentityCard: 28,
    dtAuthorizationCard: 32,
    dtBeginnerPermit: 33,
    dtBorderCrossingCard: 34,
    dtChauffeurLicense: 35,
    dtChauffeurLicenseUnder18: 36,
    dtChauffeurLicenseUnder21: 37,
    dtCommercialDrivingLicense: 38,
    dtCommercialDrivingLicenseIndtuctionalPermit: 39,
    dtCommercialDrivingLicenseUnder18: 40,
    dtCommercialDrivingLicenseUnder21: 41,
    dtCommercialIndtuctionPermit: 42,
    dtCommercialNewPermit: 43,
    dtConcealedCarryLicense: 44,
    dtConcealedFirearmPermit: 45,
    dtConditionalDrivingLicense: 46,
    dtDepartmentOfVeteransAffairsIdentityCard: 47,
    dtDiplomaticDrivingLicense: 48,
    dtDrivingLicense: 49,
    dtDrivingLicenseIndtuctionalPermit: 50,
    dtDrivingLicenseIndtuctionalPermitUnder18: 51,
    dtDrivingLicenseIndtuctionalPermitUnder21: 52,
    dtDrivingLicenseLearnersPermit: 53,
    dtDrivingLicenseLearnersPermitUnder18: 54,
    dtDrivingLicenseLearnersPermitUnder21: 55,
    dtDrivingLicenseNovice: 56,
    dtDrivingLicenseNoviceUnder18: 57,
    dtDrivingLicenseNoviceUnder21: 58,
    dtDrivingLicenseRegisteredOffender: 59,
    dtDrivingLicenseRedtictedUnder18: 60,
    dtDrivingLicenseRedtictedUnder21: 61,
    dtDrivingLicenseTemporaryVisitor: 62,
    dtDrivingLicenseTemporaryVisitorUnder18: 63,
    dtDrivingLicenseTemporaryVisitorUnder21: 64,
    dtDrivingLicenseUnder18: 65,
    dtDrivingLicenseUnder21: 66,
    dtEmploymentDrivingPermit: 67,
    dtEnhancedChauffeurLicense: 68,
    dtEnhancedChauffeurLicenseUnder18: 69,
    dtEnhancedChauffeurLicenseUnder21: 70,
    dtEnhancedCommercialDrivingLicense: 71,
    dtEnhancedDrivingLicense: 72,
    dtEnhancedDrivingLicenseUnder18: 73,
    dtEnhancedDrivingLicenseUnder21: 74,
    dtEnhancedIdentityCard: 75,
    dtEnhancedIdentityCardUnder18: 76,
    dtEnhancedIdentityCardUnder21: 77,
    dtEnhancedOperatorsLicense: 78,
    dtFirearmsPermit: 79,
    dtFullProvisionalLicense: 80,
    dtFullProvisionalLicenseUnder18: 81,
    dtFullProvisionalLicenseUnder21: 82,
    dtGenevaConventionsIdentityCard: 83,
    dtGraduatedDrivingLicenseUnder18: 84,
    dtGraduatedDrivingLicenseUnder21: 85,
    dtGraduatedIndtuctionPermitUnder18: 86,
    dtGraduatedIndtuctionPermitUnder21: 87,
    dtGraduatedLicenseUnder18: 88,
    dtGraduatedLicenseUnder21: 89,
    dtHandgunCarryPermit: 90,
    dtIdentityAndPrivilegeCard: 91,
    dtIdentityCardMobilityImpaired: 92,
    dtIdentityCardRegisteredOffender: 93,
    dtIdentityCardTemporaryVisitor: 94,
    dtIdentityCardTemporaryVisitorUnder18: 95,
    dtIdentityCardTemporaryVisitorUnder21: 96,
    dtIdentityCardUnder18: 97,
    dtIdentityCardUnder21: 98,
    dtIgnitionInterlockPermit: 100,
    dtImmigrantVisa: 101,
    dtIndtuctionPermit: 102,
    dtIndtuctionPermitUnder18: 103,
    dtIndtuctionPermitUnder21: 104,
    dtInterimDrivingLicense: 105,
    dtInterimIdentityCard: 106,
    dtIntermediateDrivingLicense: 107,
    dtIntermediateDrivingLicenseUnder18: 108,
    dtIntermediateDrivingLicenseUnder21: 109,
    dtJuniorDrivingLicense: 110,
    dtLearnerIndtuctionalPermit: 111,
    dtLearnerLicense: 112,
    dtLearnerLicenseUnder18: 113,
    dtLearnerLicenseUnder21: 114,
    dtLearnerPermit: 115,
    dtLearnerPermitUnder18: 116,
    dtLearnerPermitUnder21: 117,
    dtLimitedLicense: 118,
    dtLimitedPermit: 119,
    dtLimitedTermDrivingLicense: 120,
    dtLimitedTermIdentityCard: 121,
    dtLiquorIdentityCard: 122,
    dtNewPermit: 123,
    dtNewPermitUnder18: 124,
    dtNewPermitUnder21: 125,
    dtNonUsCitizenDrivingLicense: 126,
    dtOccupationalDrivingLicense: 127,
    dtOneidaTribeOfIndiansIdentityCard: 128,
    dtOperatorLicense: 129,
    dtOperatorLicenseUnder18: 130,
    dtOperatorLicenseUnder21: 131,
    dtPermanentDrivingLicense: 132,
    dtPermitToReEnter: 133,
    dtProbationaryAutoLicense: 134,
    dtProbationaryDrivingLicenseUnder18: 135,
    dtProbationaryDrivingLicenseUnder21: 136,
    dtProbationaryVehicleSalespersonLicense: 137,
    dtProvisionalDrivingLicense: 138,
    dtProvisionalDrivingLicenseUnder18: 139,
    dtProvisionalDrivingLicenseUnder21: 140,
    dtProvisionalLicense: 141,
    dtProvisionalLicenseUnder18: 142,
    dtProvisionalLicenseUnder21: 143,
    dtPublicPassengerChauffeurLicense: 144,
    dtRacingAndGamingComissionCard: 145,
    dtRefugeeTravelDocument: 146,
    dtRenewalPermit: 147,
    dtRedtictedCommercialDrivingLicense: 148,
    dtRedtictedDrivingLicense: 149,
    dtRedtictedPermit: 150,
    dtSeasonalPermit: 151,
    dtSeasonalResidentIdentityCard: 152,
    dtSeniorCitizenIdentityCard: 153,
    dtSexOffender: 154,
    dtSocialSecurityCard: 155,
    dtTemporaryDrivingLicense: 156,
    dtTemporaryDrivingLicenseUnder18: 157,
    dtTemporaryDrivingLicenseUnder21: 158,
    dtTemporaryIdentityCard: 159,
    dtTemporaryIndtuctionPermitIdentityCard: 160,
    dtTemporaryIndtuctionPermitIdentityCardUnder18: 161,
    dtTemporaryIndtuctionPermitIdentityCardUnder21: 162,
    dtTemporaryVisitorDrivingLicense: 163,
    dtTemporaryVisitorDrivingLicenseUnder18: 164,
    dtTemporaryVisitorDrivingLicenseUnder21: 165,
    dtUniformedServicesIdentityCard: 166,
    dtVehicleSalespersonLicense: 167,
    dtWorkerIdentificationCredential: 168,
    dtCommercialDrivingLicenseNovice: 169,
    dtCommercialDrivingLicenseNoviceUnder18: 170,
    dtCommercialDrivingLicenseNoviceUnder21: 171,
    dtPassportCard: 172,
    dtPermanentResidentCard: 173,
    dtPersonalIdentificationVerification: 174,
    dtTemporaryOperatorLicense: 175,
    dtDrivingLicenseUnder19: 176,
    dtIdentityCardUnder19: 177,
    dtVisa: 178,
    dtTemporaryPassport: 179,
    dtVotingCard: 180,
    dtHealthCard: 181,
    dtCertificateOfCitizenship: 182,
    dtAddressCard: 183,
    dtAirportImmigrationCard: 184,
    dtAlienRegidtationCard: 185,
    dtAPEHCard: 186,
    dtCoupontoDrivingLicense: 187,
    dtCrewMemberCertificate: 188,
    dtDocumentForReturn: 189,
    dtECard: 190,
    dtEmploymentCard: 191,
    dtHKSARImmigrationForm: 192,
    dtImmigrantcard: 193,
    dtLabourCard: 194,
    dtLaissezPasser: 195,
    dtLawyerIdentityCertificate: 196,
    dtLicenseCard: 197,
    dtPassportStateless: 198,
    dtPassportChild: 199,
    dtPassportConsular: 200,
    dtPassportDiplomaticService: 201,
    dtPassportOfficial: 202,
    dtPassportProvisional: 203,
    dtPassportSpecial: 204,
    dtPermissiontotheLocalBorderTraffic: 205,
    dtSEDESOLCard: 207,
    dtSocialCard: 208,
    dtTBCard: 209,
    dtVehiclePassport: 210,
    dtWDocument: 211,
    dtDiplomaticIdentityCard: 212,
    dtConsularIdentityCard: 213,
    dtIncomeTaxCard: 214,
    dtResidencePermit: 215,
    dtDocumentOfIdentity: 216,
    dtBorderCrossingPermit: 217,
    dtPassportLimitedValidity: 218,
    dtSIMCard: 219,
    dtTaxCard: 220,
    dtCompanyCard: 221,
    dtDomesticPassport: 222,
    dtIdentityCertificate: 223,
    dtResidentIdCard: 224,
    dtArmedForcesIdentityCard: 225,
};

const DocReaderAction = {
    COMPLETE: 1,
    PROCESS: 0,
    CANCEL: 2,
    ERROR: 3,
    NOTIFICATION: 5,
    PROCESS_WHITE_UV_IMAGES: 6,
    MORE_PAGES_AVAILABLE: 8,
};

const DocReaderFrame = {
    MAX: "max",
    SCENARIO_DEFAULT: "id1",
    NONE: "none",
};

const DocReaderOrientationIOS = {
    PORTRAIT: 0,
    LANDSCAPE_LEFT: 1,
    LANDSCAPE_RIGHT: 2,
    PORTRAIT_UP_SIDE_DOWN: 3,
    LANDSCAPE: 4,
    ALL: 5,
    ALL_BUT_UP_SIDE_DOWN: 6
};

const DocReaderOrientationAndroid = {
    ROTATE: 0,
    PORTRAIT: 1,
    LANDSCAPE: 2,
};

const eCheckResult = {
    CH_CHECK_ERROR: 0,
    CH_CHECK_OK: 1,
    CH_CHECK_WAS_NOT_DONE: 2,
};

const eGraphicFieldType = {
    GF_PORTRAIT: 201,
    GF_FINGERPR: 202,
    GF_EYE: 203,
    GF_SIGNATURE: 204,
    GF_BAR_CODE: 205,
    GF_PROOF_OF_CITIZENSHIP: 206,
    GF_DOCUMENT_IMAGE: 207,
    GF_COLOR_DYNAMIC: 209,
    GF_GHOST_PORTRAIT: 210,
    GF_STAMP: 211,
    GF_PORTRAIT_OF_CHILD: 212,
    GF_OTHER: 250,
    GF_FINGER_LEFT_THUMB: 300,
    GF_FINGER_LEFT_INDEX: 301,
    GF_FINGER_LEFT_MIDDLE: 302,
    GF_FINGER_LEFT_RING: 303,
    GF_FINGER_LEFT_LITTLE: 304,
    GF_FINGER_RIGHT_THUMB: 305,
    GF_FINGER_RIGHT_INDEX: 306,
    GF_FINGER_RIGHT_MIDDLE: 307,
    GF_FINGER_RIGHT_RING: 308,
    GF_FINGER_RIGHT_LITTLE: 309,
    getTranslation: function (value) {
        switch (value) {
            case 201:
                return "Portrait";
            case 202:
                return "Fingerprint";
            case 203:
                return "Iris";
            case 204:
                return "Signature";
            case 205:
                return "Barcode";
            case 206:
                return "Proof of citizenship";
            case 207:
                return "Document image";
            case 209:
                return "Color dynamic";
            case 210:
                return "Ghost portrait";
            case 211:
                return "Stamp";
            case 212:
                return "Portrait of child";
            case 250:
                return "Other";
            case 300:
                return "Left thumb";
            case 301:
                return "Left index finger";
            case 302:
                return "Left middle finger";
            case 303:
                return "Left ring finger";
            case 304:
                return "Left little finger";
            case 305:
                return "Right thumb";
            case 306:
                return "Right index finger";
            case 307:
                return "Right middle finger";
            case 308:
                return "Right ring finger";
            case 309:
                return "Right little finger";
            default:
                return "";
        }
    }
};

const eImageQualityCheckType = {
    IQC_IMAGE_GLARES: 0,
    IQC_IMAGE_FOCUS: 1,
    IQC_IMAGE_RESOLUTION: 2,
};

const eProcessGLCommands = {
    ePC_ProcMgr_SetLicense: 12100,
    ePC_ProcMgr_Process: 12101,
    ePC_ProcMgr_ProcessAsync: 12102,
    ePC_ProcMgr_Init: 12103,
    ePC_ProcMgr_ProcessImage: 12104,
    ePC_ProcMgr_StartNewDocument: 12105,
    ePC_ProcMgr_StartNewPage: 12106,
    ePC_ProcMgr_Unload: 12107,
    ePC_ProcMgr_CheckDatabase: 12109,
    ePC_ProcMgr_ComparePortraits: 12111,
};

const eRequestCommand = {
    eReqCmd_RFid_SendData: 100,
    eReqCmd_RFid_Notify: 101,
    eReqCmd_RFid_GetDataForScenario: 102,
    eReqCmd_Torch_GetUVFoto: 200,
    eReqCmd_InternetSend: 300,
};

const eRFID_AccessControl_ProcedureType = {
    ACPT_UNDEFINED: 0,
    ACPT_BAC: 1,
    ACPT_PACE: 2,
    ACPT_CA: 3,
    ACPT_TA: 4,
    ACPT_AA: 5,
    ACPT_RI: 6,
    ACPT_CARD_INFO: 10,
};

const eRFID_AuthenticationProcedureType = {
    aptUndefined: 0,
    aptStandard: 1,
    aptAdvanced: 2,
    aptGeneral: 3,
};

const eRFID_BaudRate = {
    rfbr_106: 1,
    rfbr_212: 2,
    rfbr_424: 4,
    rfbr_848: 8,
};

const eRFID_CertificateType = {
    CT_UNDEFINED: 0,
    CT_CSCA: 1,
    CT_CSCA_LINK: 2,
    CT_DS: 3,
    CT_MLS: 4,
    CT_DLS: 5,
};

const eRFID_DataFile_Type = {
    DFT_UNSPECIFIED: 0,
    DFT_PASSPORT_DG1: 1,
    DFT_PASSPORT_DG2: 2,
    DFT_PASSPORT_DG3: 3,
    DFT_PASSPORT_DG4: 4,
    DFT_PASSPORT_DG5: 5,
    DFT_PASSPORT_DG6: 6,
    DFT_PASSPORT_DG7: 7,
    DFT_PASSPORT_DG8: 8,
    DFT_PASSPORT_DG9: 9,
    DFT_PASSPORT_DG10: 10,
    DFT_PASSPORT_DG11: 11,
    DFT_PASSPORT_DG12: 12,
    DFT_PASSPORT_DG13: 13,
    DFT_PASSPORT_DG14: 14,
    DFT_PASSPORT_DG15: 15,
    DFT_PASSPORT_DG16: 16,
    DFT_PASSPORT_DG17: 17,
    DFT_PASSPORT_DG18: 18,
    DFT_PASSPORT_DG19: 19,
    DFT_PASSPORT_DG20: 20,
    DFT_PASSPORT_SOD: 21,
    DFT_PASSPORT_CVCA: 22,
    DFT_PASSPORT_COM: 23,
    DFT_ID_DG1: 101,
    DFT_ID_DG2: 102,
    DFT_ID_DG3: 103,
    DFT_ID_DG4: 104,
    DFT_ID_DG5: 105,
    DFT_ID_DG6: 106,
    DFT_ID_DG7: 107,
    DFT_ID_DG8: 108,
    DFT_ID_DG9: 109,
    DFT_ID_DG10: 110,
    DFT_ID_DG11: 111,
    DFT_ID_DG12: 112,
    DFT_ID_DG13: 113,
    DFT_ID_DG14: 114,
    DFT_ID_DG15: 115,
    DFT_ID_DG16: 116,
    DFT_ID_DG17: 117,
    DFT_ID_DG18: 118,
    DFT_ID_DG19: 119,
    DFT_ID_DG20: 120,
    DFT_ID_DG21: 121,
    DFT_DL_COM: 150,
    DFT_DL_DG1: 151,
    DFT_DL_DG2: 152,
    DFT_DL_DG3: 153,
    DFT_DL_DG4: 154,
    DFT_DL_DG5: 155,
    DFT_DL_DG6: 156,
    DFT_DL_DG7: 157,
    DFT_DL_DG8: 158,
    DFT_DL_DG9: 159,
    DFT_DL_DG10: 160,
    DFT_DL_DG11: 161,
    DFT_DL_DG12: 162,
    DFT_DL_DG13: 163,
    DFT_DL_DG14: 164,
    DFT_DL_SOD: 165,
    DFT_DL_CE: 166,
    DFT_PACE_CARDACCESS: 200,
    DFT_PACE_CARDSECURITY: 201,
    DFT_PACE_CHIPSECURITY: 202,
    DFT_MIFARE_DATA: 300,
    DFT_MIFARE_VALIDITY: 301,
    DFT_AUTHENTICITYV2: 302,
    DFT_ATR: 400,
    DFT_ESIGN_PK: 500,
    DFT_ESIGN_SIGNEDDATA: 501,
    DFT_CERTIFICATE: 600,
    DFT_MASTERLIST: 601,
    DFT_DEFECTLIST: 602,
    DFT_DEVIATIONLIST: 603,
    DFT_APP_DIRECTORY: 700,
    DFT_SESSION: 701,
    DFT_LOGDATA: 702,
    DFT_USERDEFINED: 1000,
    getTranslation: function (value) {
        switch (value) {
            case 151:
                return "Machine Readable Zone (DG1)";
            case 152:
                return "Biometry - Facial data (DG2)";
            case 153:
                return "Biometry - Fingerprint(s) (DG3)";
            case 154:
                return "Biometry - Iris Data (DG4)";
            case 155:
                return "Portrait(s) (DG5)";
            case 156:
                return "not defined (DG6)";
            case 157:
                return "Signature / usual mark image (DG7)";
            case 158:
                return "not defined (DG8)";
            case 159:
                return "not defined (DG9)";
            case 160:
                return ">not defined (DG10)";
            case 161:
                return "Additional personal detail(s) (DG11)";
            case 162:
                return "Additional document detail(s) (DG12)";
            case 163:
                return "Optional detail(s) (DG13)";
            case 164:
                return "EAC info (DG14)";
            case 115:
                return "Active Authentication info (DG15)";
            case 116:
                return "Person(s) to notify (DG16)";
            case 117:
                return "DG17";
            case 118:
                return "DG18";
            case 119:
                return "DG19";
            case 120:
                return "DG20";
            case 165:
                return "EF.SOD";
            case 22:
                return "EF.CVCA";
            case 150:
                return "EF.COM";
            case 121:
                return "DG21";
            case 200:
                return "EF.CardAccess";
            case 201:
                return "EF.CardSecurity";
            case 202:
                return "EF.ChipSecurity";
            case 300:
                return "MIFARE data";
            case 301:
                return "MIFARE validity";
            case 600:
                return "Certificate";
            case 700:
                return "App direсtory";
            default:
                return "";
        }
    }
};

const eRFID_NotificationAndErrorCodes = {
    RFID_NOTIFICATION_ERROR: 65536,
    RFID_NOTIFICATION_DOCUMENT_READY: 65537,
    RFID_NOTIFICATION_READ_PROTOCOL4: 65539,
    RFID_NOTIFICATION_READ_PROTOCOL3: 65546,
    RFID_NOTIFICATION_PROGRESS: 65547,
    RFID_NOTIFICATION_TA_STEP: 65550,
    RFID_NOTIFICATION_SM_REQUIRED: 65551,
    RFID_NOTIFICATION_ISO_ERROR: 69632,
    RFID_NOTIFICATION_PA_REQUEST: 77824,
    RFID_NOTIFICATION_SM_ESTABLISHED: 81935,
    RFID_NOTIFICATION_PCSC_READER_DISCONNECTED: 131072,
    RFID_NOTIFICATION_PCSC_READER_LIST_CHANGED: 131073,
    RFID_NOTIFICATION_PCSC_BYTES_RECEIVED: 131074,
    RFID_NOTIFICATION_PCSC_TOTAL_READING_TIME: 131075,
    RFID_NOTIFICATION_PCSC_DATA_RECEIVED: 131076,
    RFID_NOTIFICATION_PCSC_BYTES_SENT: 131077,
    RFID_NOTIFICATION_PCSC_TOTAL_READING_SPEED: 131078,
    RFID_NOTIFICATION_PCSC_TOTAL_PROCESS_TIME: 131079,
    RFID_NOTIFICATION_PCSC_READER_LIST_CHANGING: 131080,
    RFID_NOTIFICATION_PCSC_EXT_LENGTH_SUPPORT: 131088,
    RFID_NOTIFICATION_PA_CERTIFICATE_CHAIN: 131089,
    RFID_NOTIFICATION_PA_CERTIFICATE_CHAIN_ITEM: 131090,
    RFID_NOTIFICATION_SCENARIO: 131104,
    RFID_NOTIFICATION_PCSC_READING_DATAGROUP: 196608,
    RFID_NOTIFICATION_PCSC_FILE_NOT_FOUND: 262144,
    RFID_NOTIFICATION_PCSC_END_OF_FILE: 327680,
    RFID_NOTIFICATION_PCSC_FILE_ACCESS_DENIED: 393216,
    RFID_NOTIFICATION_PCSC_APPLICATION_SELECTED: 458752,
    RFID_NOTIFICATION_AC_PROCEDURE_START: 524288,
    RFID_NOTIFICATION_AC_PROCEDURE_FINISH: 589824,
    RFID_NOTIFICATION_PA_SECURITY_OBJECT_CHECK: 655360,
    RFID_NOTIFICATION_PA_FILE_CHECK: 720896,
    RFID_NOTIFICATION_PCSC_UPDATING_DATAGROUP: 786432,
    RFID_NOTIFICATION_AUXILIARY_DATA_VALIDATION: 851968,
    RFID_NOTIFICATION_RI_SECTOR_ID: 917504,
    RFID_NOTIFICATION_BIOMETRICS_EMPTY_PLACEHOLDER: 983040,
    RFID_ERROR_NO_ERROR: 1,
    RFID_ERROR_ALREADY_DONE: 2,
    RFID_LAYER6_FILE_EOF1: -2147458430,
    RFID_LAYER6_PWD_DEACTIVATED: -2147458429,
    RFID_LAYER6_PWD_BLOCKED: -2147458112,
    RFID_LAYER6_PWD_SUSPENDED: -2147458111,
    RFID_LAYER6_PWD_BLOCKED_2: -2147456637,
    RFID_LAYER6_PWD_DEACTIVATED_2: -2147456636,
    RFID_LAYER6_PWD_SUSPENDED_2: -2147456635,
    RFID_LAYER6_MSE_SET_AT_FAILURE: -2046819578,
    RFID_LAYER6_INCORRECT_PARAMS: -2147456384,
    RFID_LAYER6_FILE_NOT_FOUND: -2147456382,
    RFID_LAYER6_NO_REFERENCE_DATA: -2147456376,
    RFID_LAYER6_FILE_EOF2: -2147456256,
    RFID_Error_GraphManager: -2147418112,
    RFID_ERROR_NO_CHIP_DETECTED: -2147418111,
    RFID_ERROR_NOT_AVAILABLE: -2147418110,
    RFID_ERROR_INVALID_PARAMETER: -2147418108,
    RFID_ERROR_NOT_INITIALIZED: -2147418107,
    RFID_Error_NotEnoughMemory: -2147418106,
    RFID_ERROR_INVALID_DIRECTORY: -2147418104,
    RFID_ERROR_UNKNOWN_COMMAND: -2147418103,
    RFID_ERROR_FILE_IO_ERROR: -2147418102,
    RFID_ERROR_BUSY: -2147418101,
    RFID_ERROR_OLD_FIRMWARE: -2147418100,
    RFID_ERROR_PCSC_FAILED: -2147352576,
    RFID_ERROR_PCSC_READER_NOT_AVAILABLE: -2147352575,
    RFID_ERROR_PCSC_CANT_CONNECT_CARD: -2147352574,
    RFID_ERROR_PCSC_CARD_IS_NOT_CONNECTED: -2147352573,
    RFID_ERROR_PCSC_OPERATION_CANCELLED: -2147352572,
    RFID_ERROR_PCSC_CARD_IS_BUSY: -2147352571,
    RFID_ERROR_PCSC_FAILED_S_CARD: -2147352570,
    RFID_ERROR_PCSC_EXT_LE_FAILED: -2147352560,
    RFID_LAYER6_PWD_FAILED: -2146409536,
    RFID_ERROR_NOT_PERFORMED: -2097152000,
    RFID_ERROR_SESSION_IS_CLOSED: -2097151999,
    RFID_ERROR_SESSION_TERMINAL_UNSUPPORTED_OPERATION: -2097151998,
    RFID_ERROR_SESSION_TERMINAL_TYPE_UNKNOWN: -2097151984,
    RFID_ERROR_SESSION_TERMINAL_TYPE_BAD_CERTIFICATE: -2097151983,
    RFID_ERROR_SESSION_TERMINAL_TYPE_NOT_SET: -2097151982,
    RFID_ERROR_SESSION_PROCEDURE_TYPE_UNKNOWN: -2097151981,
    RFID_ERROR_SESSION_PROCEDURE_TYPE_UNSUPPORTED: -2097151980,
    RFID_ERROR_SESSION_PROCEDURE_TYPE_NOT_SET: -2097151979,
    RFID_ERROR_SESSION_ACCESS_KEY_UNKNOWN_TYPE: -2097151978,
    RFID_ERROR_SESSION_ACCESS_KEY_UNSUPPORTED_SM_TYPE: -2097151977,
    RFID_ERROR_SESSION_ACCESS_KEY_INCORRECT_SM_TYPE: -2097151976,
    RFID_ERROR_SESSION_ACCESS_KEY_RESTRICTED: -2097151975,
    RFID_ERROR_SESSION_ACCESS_KEY_INCORRECT_DATA: -2097151974,
    RFID_ERROR_SESSION_ACCESS_KEY_NOT_SET: -2097151973,
    RFID_ERROR_SESSION_PWD_MANAGEMENT_NOT_AUTHORIZED: -2097151972,
    RFID_ERROR_SESSION_ACCESS_CONTROL_UNKNOWN_TYPE: -2097151968,
    RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_SM: -2097151967,
    RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_PACE: -2097151966,
    RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_CA_KEYS: -2097151965,
    RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_TA: -2097151964,
    RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_CA: -2097151963,
    RFID_ERROR_SESSION_ACCESS_CONTROL_INCORRECT_OPTION_CA: -2097151962,
    RFID_ERROR_SESSION_ACCESS_CONTROL_CA_FAILED: -2097151961,
    RFID_ERROR_SESSION_ACCESS_CONTROL_TA_FAILED: -2097151960,
    RFID_ERROR_SESSION_ACCESS_CONTROL_AA_FAILED: -2097151959,
    RFID_ERROR_SESSION_ACCESS_CONTROL_RI_FAILED: -2097151958,
    RFID_ERROR_SESSION_PA_SIGNATURE_CHECK_FAILED: -2097151952,
    RFID_ERROR_SESSION_PA_HASH_CHECK_FAILED: -2097151951,
    RFID_ERROR_SESSION_INVALID_AUX_DATA_DATE_OF_EXPIRY: -2097151936,
    RFID_ERROR_SESSION_INVALID_AUX_DATA_DATE_OF_BIRTH: -2097151935,
    RFID_ERROR_SESSION_INVALID_AUX_DATA_COMMUNITY_ID: -2097151934,
    RFID_ERROR_SESSION_E_SIGN_REQUIRES_APP_SELECTION: -2097151920,
    RFID_ERROR_SESSION_E_SIGN_PIN_NOT_SET: -2097151919,
    RFID_ERROR_SESSION_E_SIGN_PIN_NOT_VERIFIED: -2097151918,
    RFID_ERROR_SESSION_INCORRECT_DATA: -2097151904,
    RFID_ERROR_SESSION_FILE_NOT_ENOUGH_DATA: -2097086464,
    RFID_ERROR_SESSION_FILE_INCORRECT_DATA: -2097020928,
    RFID_ERROR_SESSION_FILE_UNEXPECTED_DATA: -2096955392,
    RFID_ERROR_SESSION_FILE_CONTENTS_UNEXPECTED_DATA: -2096889856,
    RFID_ERROR_SESSION_FILE_WRONG_TAG: -2096824320,
    RFID_ERROR_SESSION_FILE_CANT_USE_DATA: -2096758784,
    RFID_ERROR_SESSION_FILE_CANT_READ_DATA: -2096693248,
    RFID_ERROR_SESSION_FILE_ACCESS_DENIED: -2096627712,
    RFID_LAYER6_SECURITY_MANAGER: -2046820352,
    RFID_LAYER6_APP_SELECTION_FAILURE: -2046820351,
    RFID_LAYER6_MUTUAL_AUTH_MAC_FAIL: -2046820096,
    RFID_LAYER6_MUTUAL_AUTH_ENC_FAIL: -2046820095,
    RFID_LAYER6_MUTUAL_AUTH_FAILURE: -2046820094,
    RFID_LAYER6_SM_DO8E_MISSING: -2046819840,
    RFID_LAYER6_SM_DO87_MISSING: -2046819839,
    RFID_LAYER6_SM_DO99_MISSING: -2046819838,
    RFID_LAYER6_SM_MAC_INCORRECT: -2046819837,
    RFID_LAYER6_SM_DO87_INCORRECT: -2046819836,
    RFID_LAYER6_NON_TLV_RESPONSE_DATA: -2046819584,
    RFID_LAYER6_WRONG_RND_ICC_LENGTH: -2046819583,
    RFID_LAYER6_INT_AUTH_FAILURE: -2046819582,
    RFID_LAYER6_MSE_SET_KAT_FAILURE: -2046819581,
    RFID_LAYER6_MSE_SET_DST_FAILURE: -2046819580,
    RFID_LAYER6_PSO_CERTIFICATE_FAILURE: -2046819579,
    RFID_LAYER6_GET_CHALLENGE_FAILURE: -2046819577,
    RFID_LAYER6_EXT_AUTH_FAILURE: -2046819576,
    RFID_LAYER6_GENERAL_AUTH_FAILURE: -2046819575,
    RFID_ERROR_FAILED: -1,
    getTranslation: function (value) {
        switch (value) {
            case -2147483647:
                return "Error - ASN: Incorrect data";
            case -2147483646:
                return "Error - ASN: Not enough data";
            case -2147483645:
                return "Error - ASN: Contents unexpected data";
            case -2147483640:
                return "Error - ASN Signed data: Incorrect data";
            case -2147483639:
                return "Error - ASN Signed data: Encap contents incorrect data";
            case -2147483638:
                return "Error - ASN Signed data: Version incorrect data";
            case -2147483631:
                return "Error - ASN Signed data: Digest algorithms incorrect data";
            case -2147483630:
                return "Error - ASN LDS object: Version info incorrect data";
            case -2147483629:
                return "Error - ASN LDS object: Incorrect data";
            case -2147483628:
                return "Error - ASN LDS object: Version incorrect data";
            case -2147483627:
                return "Error - ASN LDS object: Digest algorithm incorrect data";
            case -2147483626:
                return "Error - ASN LDS object: DG hashes incorrect data";
            case -2147483625:
                return "Error - ASN Certificate: Incorrect data";
            case -2147483624:
                return "Error - ASN Certificate: Version incorrect data";
            case -2147483623:
                return "Error - ASN Certificate: SN incorrect data";
            case -2147483622:
                return "Error - ASN Certificate: Signature incorrect data";
            case -2147483621:
                return "Error - ASN Certificate: Issuer incorrect data";
            case -2147483620:
                return "Error - ASN Certificate: Validity incorrect data";
            case -2147483619:
                return "Error - ASN Certificate: Subject incorrect data";
            case -2147483618:
                return "Error - ASN Certificate: Subject PK incorrect data";
            case -2147483617:
                return "Error - ASN Certificate: Extensions incorrect data";
            case -2147483616:
                return "Error - ASN Signer info: Incorrect data";
            case -2147483615:
                return "Error - ASN Signer info: Version incorrect data";
            case -2147483614:
                return "Error - ASN Signer info: SID incorrect data";
            case -2147483613:
                return "Error - ASN Signer info: Digest algorithms incorrect data";
            case -2147483612:
                return "Error - ASN Signer info: Signed attributes incorrect data";
            case -2147483611:
                return "Error - ASN Signer info: Sign algorithms incorrect data";
            case -2147483610:
                return "Error - ASN Signer info: Signature incorrect data";
            case -2147483609:
                return "Error - ASN Signer info: Unsigned attributes incorrect data";
            case -2147483600:
                return "Error - ICAO LDS object: Unsupported digest algorithm";
            case -2147483599:
                return "Error - ICAO Signed data: Signer infos empty";
            case -2147483598:
                return "Error - ICAO Signer info: Unsupported digest algorithm";
            case -2147483597:
                return "Error - ICAO Signer info: Unsupported signature algorithm";
            case -2147483596:
                return "Error - ICAO Signer info: Message digest error";
            case -2147483595:
                return "Error - Auth: Signer info cant find certificate";
            case -2147483594:
                return "Error - ICAO Signer info: Signed attributes missed";
            case -2147483568:
                return "Error - Auth: Error";
            case -2147483567:
                return "Error - Auth: Unsupported signature algorithm";
            case -2147483566:
                return "Error - Auth: Unsupported public key algorithm";
            case -2147483565:
                return "Error - Auth: Messed algorithms";
            case -2147483564:
                return "Error - Auth: Public key data invalid";
            case -2147483563:
                return "Error - Auth: Algorithm parameters data invalid";
            case -2147483562:
                return "Error - Auth: Signature data invalid";
            case -2147483561:
                return "Error - Auth: Unsupported digest algorithm";
            case -2147483560:
                return "Error - Auth: Signature data incorrect";
            case -2147483559:
                return "Error - Auth: Algorithm parameters not defined";
            case -2147483558:
                return "Error - Auth: Signature check failed";
            case -2147483536:
                return "Error - DG: Wrong Tag";
            case -2147458430:
                return "LAYER6: Reading beyond EOF / Unexpected EOF ";
            case -2147458429:
                return "LAYER6: PWD Deactivatted";
            case -2147458112:
                return "LAYER6: PWD Blocked";
            case -2147458111:
                return "LAYER6: PWD Suspended";
            case -2147456637:
                return "LAYER6: PWD Blocked 2";
            case -2147456636:
                return "LAYER6: PWD Deactivated 2";
            case -2147456635:
                return "LAYER6: PWD Suspended 2";
            case -2147456384:
                return "LAYER6: Incorrect Params";
            case -2147456382:
                return "LAYER6: File selection failure / file not found";
            case -2147456376:
                return "LAYER6: No Reference Data";
            case -2147456256:
                return "LAYER6: Reading beyond EOF / Unexpected EOF ";
            case -2147418112:
                return "RFID: Creation or connection to Graph Manager COM server failed";
            case -2147418111:
                return "RFID: No chip is detected";
            case -2147418110:
                return "RFID: Unavailable";
            case -2147418108:
                return "RFID: Invalid parameter in ExecuteCommand() call found";
            case -2147418107:
                return "RFID: Device is uninitialized";
            case -2147418106:
                return "RFID: Out of memory";
            case -2147418104:
                return "RFID: Invalid directory";
            case -2147418103:
                return "RFID: Unknown command";
            case -2147418102:
                return "RFID File: IO Error";
            case -2147418101:
                return "RFID: RFID is Busy";
            case -2147418100:
                return "RFID: Firmware need to be updated with newer version";
            case -2147352576:
                return "PCSC: Failed";
            case -2147352575:
                return "PCSC: Reader is unavailable";
            case -2147352574:
                return "PCSC: Card cannot be connected";
            case -2147352573:
                return "PCSC: Card is not connected";
            case -2147352572:
                return "PCSC: Operation is cancelled";
            case -2147352571:
                return "PCSC: Card Is Busy";
            case -2147352570:
                return "PCSC: Failed Smart Card";
            case -2147352560:
                return "PCSC: ExtLe Failed";
            case -2146409536:
                return "LAYER6: PWD Failed";
            case -2130706400:
                return "Error - PACE: Info Not Available";
            case -2130706399:
                return "Error - PACE: Symmetric Cypher Cannot Initialize";
            case -2130706398:
                return "Error - PACE: Key Agreement Cannot Initialize";
            case -2130706397:
                return "Error - PACE: Ephemeral Keys Cannot Create";
            case -2130706396:
                return "Error - PACE: Mapping Cannot Decode Nonce";
            case -2130706395:
                return "Error - PACE: Shared Secret Cannot Create";
            case -2130706394:
                return "Error - PACE: Domain Params Unsupported Format";
            case -2130706393:
                return "Error - PACE: Ephemeral Keys Incorrect";
            case -2130706392:
                return "Error - PACE: Mapping Ephemeral Keys Incorrect";
            case -2130706391:
                return "Error - PACE: Mapping Cannot Perform";
            case -2130706390:
                return "Error - PACE: Non Matching Auth Tokens";
            case -2130706384:
                return "Error - CA: Cannot Find Public Key";
            case -2130706383:
                return "Error - CA: Cannot Find Info";
            case -2130706382:
                return "Error - CA: Incorrect Version";
            case -2130706381:
                return "Error - CA: Cannot Find Domain Parameters";
            case -2130706380:
                return "Error - CA: Key Agreement Cannot Initialize";
            case -2130706379:
                return "Error - CA: Public Key Unsupported Algorithm";
            case -2130706378:
                return "Error - CA: Ephemeral Keys Cannot Create";
            case -2130706377:
                return "Error - CA: Shared Secret Cannot Create";
            case -2130706376:
                return "Error - CA: Non Matching Auth Tokens";
            case -2130706368:
                return "Error - TA: Incorrect Version";
            case -2130706367:
                return "Error - TA: Cannot Build Certificate Chain";
            case -2130706366:
                return "Error - TA: Cannot Find IS Private Key";
            case -2130706365:
                return "Error - TA: Public Key Unsupported Algorithm";
            case -2130706364:
                return "Error - TA: Signature Building Error";
            case -2130706363:
                return "Error - TA: Invalid Key Algorithm Parameters";
            case -2130706352:
                return "Error - AA: Public Key Unsupported Algorithm";
            case -2130706351:
                return "Error - AA: Public Key Incorrect Data";
            case -2130706350:
                return "Error - AA: Public Key Incorrect Parameters";
            case -2130706349:
                return "Error - AA: Public Key Undefined Parameters";
            case -2130706348:
                return "Error - AA: Signature Incorrect Data";
            case -2130706347:
                return "Error - AA: Unsupported recovery scheme";
            case -2130706346:
                return "Error - AA: Incorrect Trailer";
            case -2130706345:
                return "Error - AA: Unsupported Digest Algorithm";
            case -2130706336:
                return "Error - CV Certificate: Missing mandatory data PK";
            case -2130706334:
                return "Error - CV Certificate: Public key unsupported";
            case -2130706333:
                return "Error - CV Certificate: CHAT unsupported terminal type";
            case -2130706332:
                return "Error - CV Certificate: Private key unsupported";
            case -2130706331:
                return "Error - CV Certificate: Private key invalid params";
            case -2130706320:
                return "Error - RI: Sector Key Cannot Find";
            case -2130706319:
                return "Error - RI: Sector Key Incorrect Data";
            case -2130706318:
                return "Error - RI: Sector Key Incomplete Data";
            case -2130706080:
                return "Error - CV Certificate: Incorrect data";
            case -2130706079:
                return "Error - CV Certificate: CPI incorrect data";
            case -2130706078:
                return "Error - CV Certificate: CAR incorrect data";
            case -2130706077:
                return "Error - CV Certificate: Public key incorrect data";
            case -2130706076:
                return "Error - CV Certificate: CHR incorrect data";
            case -2130706075:
                return "Error - CV Certificate: CHAT incorrect data";
            case -2130706074:
                return "Error - CV Certificate: Valid from incorrect data";
            case -2130706073:
                return "Error - CV Certificate: Valid to incorrect data";
            case -2130706072:
                return "Error - CV Certificate: Extensions incorrect data";
            case -2130706071:
                return "Error - CV Certificate: Private key incorrect  data";
            case -2130706070:
                return "Error - CV Certificate: Private key missing";
            case -2097152000:
                return "RFID: Not Performed";
            case -2097151999:
                return "RFID: Session Is Closed";
            case -2097151998:
                return "RFID: Terminal Unsupported Operation";
            case -2097151984:
                return "RFID: Terminal Type Unknown";
            case -2097151983:
                return "RFID: Terminal Type Bad Certificate";
            case -2097151982:
                return "RFID: Terminal Type Not Set";
            case -2097151981:
                return "RFID: Procedure Type Unknown";
            case -2097151980:
                return "RFID: Procedure Type Unsupported";
            case -2097151979:
                return "RFID: Procedure Type Not Set";
            case -2097151978:
                return "RFID: Access Key Unknown Type";
            case -2097151977:
                return "RFID: Access Key Unsupported SM Type";
            case -2097151976:
                return "RFID: Access Key Incorrect SM Type";
            case -2097151975:
                return "RFID: Access Key Restricted";
            case -2097151974:
                return "RFID: Access Key Incorrect Data";
            case -2097151973:
                return "RFID: Access Key Not Set";
            case -2097151972:
                return "RFID: Pwd Management Not Authorized";
            case -2097151968:
                return "RFID: Access Control UnknownType";
            case -2097151967:
                return "RFID: Requires SM";
            case -2097151966:
                return "RFID: Requires PACE";
            case -2097151965:
                return "RFID: Requires CA Keys";
            case -2097151964:
                return "RFID: Requires TA";
            case -2097151963:
                return "RFID: Requires CA";
            case -2097151962:
                return "RFID: Incorrect Option CA";
            case -2097151961:
                return "RFID: CA Failed";
            case -2097151960:
                return "RFID: TA Failed";
            case -2097151959:
                return "RFID: AA Failed";
            case -2097151958:
                return "RFID: RI Failed";
            case -2097151952:
                return "RFID: SO Signature Check Failed";
            case -2097151951:
                return "RFID: Hash Check Failed";
            case -2097151936:
                return "RFID: Invalid Aux Data Date Of Expiry";
            case -2097151935:
                return "RFID: Invalid Aux Data Date Of Birth";
            case -2097151934:
                return "RFID: Invalid Aux Data Community ID";
            case -2097151920:
                return "RFID: eSign Requires App Selection";
            case -2097151919:
                return "RFID: eSign PIN Not Set";
            case -2097151918:
                return "RFID: eSign PIN Not Verified";
            case -2097151904:
                return "RFID: Incorrect data";
            case -2097086464:
                return "RFID File: Not Enough Data";
            case -2097020928:
                return "RFID File: Incorrect Data";
            case -2096955392:
                return "RFID File: Unexpected Data";
            case -2096889856:
                return "RFID File: Contents Unexpected Data";
            case -2096824320:
                return "RFID File: Wrong Tag";
            case -2096758784:
                return "RFID File: Cannot Use Data";
            case -2096693248:
                return "RFID File: Cannot Read Data";
            case -2096627712:
                return "RFID File: Access Denied";
            case -2046820352:
                return "LAYER6: Secure Messaging was not activated";
            case -2046820351:
                return 'LAYER6: ISO7816_A_03 "Application selection failure"';
            case -2046820096:
                return 'LAYER6: ISO7816_B_01 "Mutual authentication MAC failure"';
            case -2046820095:
                return 'LAYER6: ISO7816_B_02 "Mutual authentication encryption failure"';
            case -2046820094:
                return 'LAYER6: ISO7816_B_03 "Mutual authentication failure"';
            case -2046819840:
                return "LAYER6: SM failure – MAC missing";
            case -2046819839:
                return "LAYER6: SM failure – cryptogram missing";
            case -2046819838:
                return "LAYER6: SM failure – secured status bytes missing";
            case -2046819837:
                return "LAYER6: SM failure – incorrect MAC";
            case -2046819836:
                return "LAYER6: SM failure – incorrect cryptogram";
            case -2046819584:
                return "LAYER6: Not TLV response data";
            case -2046819583:
                return "LAYER6: Wrong data length (APDU_INS_GET_CHALLENGE)";
            case -2046819582:
                return "LAYER6: APDU_INS_INTERNAL_AUTHENTICATE failure";
            case -2046819581:
                return "LAYER6: MSE:Set KAT failure";
            case -2046819580:
                return "LAYER6: MSE:Set DST failure";
            case -2046819579:
                return "LAYER6: PSO CERTIFICATE failure";
            case -2046819578:
                return "LAYER6: MSE:Set AT failure";
            case -2046819577:
                return "LAYER6: GET CHALLENGE failure";
            case -2046819576:
                return "LAYER6: APDU_INS_EXTERNAL_AUTHENTICATE (External Authentication) failure";
            case -2046819575:
                return "LAYER6: General Authenticity Failure";
            case -1879048191:
                return "Notification - ASN certificate: Incorrect version";
            case -1879048190:
                return "Notification - ASN certificate: Non matching signature algorithm";
            case -1879048189:
                return "Notification - ASN certificate: Incorrect time coding";
            case -1879048188:
                return "Notification - ASN certificate: Incorrect use of generalized time";
            case -1879048187:
                return "Notification - ASN certificate: Empty issuer";
            case -1879048186:
                return "Notification - ASN certificate: Empty subject";
            case -1879048184:
                return "Notification - ASN certificate: Unsupported critical extension";
            case -1879048178:
                return "Notification - ASN certificate: Forced default CSCA role";
            case -1879048177:
                return "Notification - ASN certificate: Forced Default DS role";
            case -1879048176:
                return "Notification - ASN certificate: Incorrect issuer subject DS";
            case -1879048169:
                return "Notification - ASN certificate: Duplicating extensions";
            case -1879048160:
                return "Notification - ICAO COM: LDS version incorrect";
            case -1879048159:
                return "Notification - ICAO COM: LDS version missing";
            case -1879048158:
                return "Notification - ICAO COM: Unicode version incorrect";
            case -1879048157:
                return "Notification - ICAO COM: Unicode version missing";
            case -1879048156:
                return "Notification - ICAO COM: DGPM incorrect";
            case -1879048155:
                return "Notification - ICAO COM: DGPM missing";
            case -1879048154:
                return "Notification - ICAO COM: DGPM unexpected";
            case -1879048144:
                return "Notification - ICAO application: LDS version unsupported";
            case -1879048143:
                return "Notification - ICAO application: Unicode version unsupported";
            case -1879048142:
                return "Notification - ICAO application: LDS version inconsistent";
            case -1879048141:
                return "Notification - ICAO application: Unicode version inconsistent";
            case -1879047936:
                return "Notification - ASN signed data: OID incorrect";
            case -1879047935:
                return "Notification - ICAO signed data: Version incorrect";
            case -1879047934:
                return "Notification - ICAO signed data: Digest algorithms empty";
            case -1879047933:
                return "Notification - ICAO signed data: Digest algorithms unsupported";
            case -1879047932:
                return "Notification - ICAO LDS object: Incorrect content OID";
            case -1879047931:
                return "Notification - ICAO LDS object: DG number incorrect";
            case -1879047930:
                return "Notification - ICAO LDS object: DG hash missing";
            case -1879047929:
                return "Notification - ICAO LDS object: DG hash extra";
            case -1879047928:
                return "Notification - ICAO LDS object: Version incorrect";
            case -1879047927:
                return "Notification - ICAO signed data: Signer infos multiple entries";
            case -1879047926:
                return "Notification - ASN signer info: Version incorrect";
            case -1879047925:
                return "Notification - ASN signer info: SID incorrect choice";
            case -1879047924:
                return "Notification - ASN signer info: SID digest algorithm not listed";
            case -1879047923:
                return "Notification - ASN signer info: Message digest attr missing";
            case -1879047922:
                return "Notification - ASN signer info: Message digest attr data";
            case -1879047921:
                return "Notification - ASN signer info: Message digest attr value";
            case -1879047920:
                return "Notification - ASN signer info: Content type attr missing";
            case -1879047919:
                return "Notification - ASN signer info: Content type attr data";
            case -1879047918:
                return "Notification - ASN signer info: Content type attr value";
            case -1879047915:
                return "Notification - Auth signer info: Certificate validity";
            case -1879047914:
                return "Notification - Auth signer info: Certificate root is not trusted";
            case -1879047913:
                return "Notification - Auth signer info: Certificate cant find CSCA";
            case -1879047912:
                return "Notification - Auth signer info: Certificate revoked";
            case -1879047911:
                return "Notification - Auth signer info: Certificate signature invalid";
            case -1879047910:
                return "Notification: Unsupported image format";
            case -1879047909:
                return "Notification - ASN signer info: Signing time attr missing";
            case -1879047908:
                return "Notification - ASN signer info: Signing time attr data";
            case -1879047907:
                return "Notification - ASN signer info: Signing time attr value";
            case -1879047776:
                return "Notification - ASN signed data: Version incorrect";
            case -1879047760:
                return "Notification - ICAO signed data: Certificates missed";
            case -1879047759:
                return "Notification - ICAO signed data: Certificates empty";
            case -1879047758:
                return "Notification - ICAO signed data: CRLs incorrect usage";
            case -1879047744:
                return "Notification - ICAO master list: Version incorrect";
            case -1879047680:
                return "Notification - ICAO certificate: Version missed";
            case -1879047679:
                return "Notification - ICAO certificate: Version incorrect";
            case -1879047678:
                return "Notification - ICAO certificate: Issuer country missed";
            case -1879047677:
                return "Notification - ICAO certificate: Issuer common name missed";
            case -1879047676:
                return "Notification - ICAO certificate: Issuer country non compliant";
            case -1879047675:
                return "Notification - ICAO certificate: Subject country missed";
            case -1879047674:
                return "Notification - ICAO certificate: Subject common name missed";
            case -1879047673:
                return "Notification - ICAO certificate: Subject country non compliant";
            case -1879047672:
                return "Notification - ICAO certificate: Using non compliant data";
            case -1879047671:
                return "Notification - ICAO certificate: Unsupported signature algorithm";
            case -1879047670:
                return "Notification - ICAO certificate: Unsupported public key algorithm";
            case -1879047669:
                return "Notification - ICAO certificate: Missed extensions";
            case -1879047668:
                return "Notification - ICAO certificate: Validity";
            case -1879047667:
                return "Notification - ICAO certificate extension: Using non compliant data";
            case -1879047666:
                return "Notification - ICAO certificate extension: Key usage missed";
            case -1879047665:
                return "Notification - ICAO certificate extension: Key usage not critical";
            case -1879047664:
                return "Notification - ICAO certificate extension: Ext key usage incorrect data";
            case -1879047663:
                return "Notification - ICAO certificate extension: Basic constraints missed";
            case -1879047662:
                return "Notification - ICAO certificate extension: Basic constraints incorrect usage 1";
            case -1879047661:
                return "Notification - ICAO certificate extension: Basic constraints incorrect usage 2";
            case -1879047660:
                return "Notification - ICAO certificate extension: Basic constraints not critical";
            case -1879047659:
                return "Notification - ICAO certificate extension: Basic constraints incorrect data";
            case -1879047658:
                return "Notification - ICAO certificate extension: Basic constraints path LenC missed";
            case -1879047657:
                return "Notification - ICAO certificate extension: Basic constraints path LenC incorrect";
            case -1879047656:
                return "Notification - ICAO certificate extension: Ext key usage not critical";
            case -1879047655:
                return "Notification - ICAO certificate extension: Ext key usage incorrect usage";
            case -1879047654:
                return "Notification - ICAO certificate extension: Ext key usage incorrect data";
            case -1879047653:
                return "Notification - ICAO certificate extension Auth key: ID missed";
            case -1879047652:
                return "Notification - ICAO certificate extension Auth key: Incorrect data";
            case -1879047651:
                return "Notification - ICAO certificate extension Auth key: Key ID missed";
            case -1879047650:
                return "Notification - ICAO certificate extension: Subject key ID missed";
            case -1879047649:
                return "Notification - ICAO certificate extension: Subject key ID incorrect data";
            case -1879047648:
                return "Notification - ICAO certificate extension: Private key UP missed";
            case -1879047647:
                return "Notification - ICAO certificate extension: Private key UP incorrect data";
            case -1879047646:
                return "Notification - ICAO certificate extension: Private key UP empty";
            case -1879047645:
                return "Notification - ICAO certificate extension: Subject alt name missed";
            case -1879047644:
                return "Notification - ICAO certificate extension: Subject alt name incorrect data";
            case -1879047643:
                return "Notification - ICAO certificate extension: Subject alt name empty";
            case -1879047642:
                return "Notification - ICAO certificate extension: Subject alt name non compliant";
            case -1879047639:
                return "Notification - ICAO certificate extension: Subject alt name DN empty";
            case -1879047638:
                return "Notification - ICAO certificate extension: Subject alt name DN incorrect";
            case -1879047637:
                return "Notification - ICAO certificate extension: Subject alt name DN non compliant";
            case -1879047636:
                return "Notification - ICAO certificate extension: Issuer alt name missed";
            case -1879047635:
                return "Notification - ICAO certificate extension: Issuer alt name incorrect data";
            case -1879047634:
                return "Notification - ICAO certificate extension: Issuer alt name empty";
            case -1879047633:
                return "Notification - ICAO certificate extension: Issuer alt name non compliant";
            case -1879047630:
                return "Notification - ICAO certificate extension: Issuer alt name DN empty";
            case -1879047629:
                return "Notification - ICAO certificate extension: Issuer alt name DN incorrect";
            case -1879047628:
                return "Notification - ICAO certificate extension: Issuer alt name DN non compliant";
            case -1879047627:
                return "Notification - ICAO certificate extension Doc type list: Missed";
            case -1879047626:
                return "Notification - ICAO certificate extension Doc type list: Incorrect data";
            case -1879047625:
                return "Notification - ICAO certificate extension Doc type list: Version";
            case -1879047624:
                return "Notification - ICAO certificate extension Doc type list: Doc types";
            case -1879047623:
                return "Notification - ICAO certificate extension Doc type list: Doc types empty";
            case -1879047622:
                return "Notification - ICAO certificate extension: Dert policies incorrect data";
            case -1879047621:
                return "Notification - ICAO certificate extension: Cert policies empty";
            case -1879047620:
                return "Notification - ICAO certificate extension: Cert policies policy ID missed";
            case -1879047619:
                return "Notification - ICAO certificate extension: CRL dist point missed";
            case -1879047618:
                return "Notification - ICAO certificate extension: CRL dist point incorrect data";
            case -1879047617:
                return "Notification - ICAO certificate extension: CRL dist point empty";
            case -1879047616:
                return "Notification - ICAO certificate extension: CRL dist point point missed";
            case -1878982656:
                return "Notification - Biometrics: Format owner missing";
            case -1878917120:
                return "Notification - Biometrics: Format owner incorrect";
            case -1878851584:
                return "Notification - Biometrics: Format type missing";
            case -1878786048:
                return "Notification - Biometrics: Format type incorrect";
            case -1878720512:
                return "Notification - Biometrics: Type incorrect";
            case -1878654976:
                return "Notification - Biometrics: Subtype missing";
            case -1878589440:
                return "Notification - Biometrics: Subtype incorrect";
            case -1878523904:
                return "Notification - Biometrics: BDB image missing";
            case -1878458368:
                return "Notification - Biometrics: BDB format ID incorrect";
            case -1878392832:
                return "Notification - Biometrics: BDB version incorrect ";
            case -1878327296:
                return "Notification - Biometrics: BDB data length incorrect";
            case -1877999616:
                return "Notification - Biometrics: BDB Data Gender";
            case -1877934080:
                return "Notification - Biometrics: BDB Data Eye Color";
            case -1877868544:
                return "Notification - Biometrics: BDB Data Hair Color";
            case -1877803008:
                return "Notification - Biometrics: BDB Data Pose Angle Yaw";
            case -1877737472:
                return "Notification - Biometrics: BDB Data Pose Angle Pitch";
            case -1877671936:
                return "Notification - Biometrics: BDB Data Pose Angle Roll";
            case -1877606400:
                return "Notification - Biometrics: BDB Data Pose Angle U Yaw";
            case -1877540864:
                return "Notification - Biometrics: BDB Data Pose Angle U Pitch";
            case -1877475328:
                return "Notification - Biometrics: BDB Data Pose Angle U Roll";
            case -1877409792:
                return "Notification - Biometrics: BDB Data Face Image Type";
            case -1877344256:
                return "Notification - Biometrics: BDB Data Image Data Type";
            case -1862270976:
                return "Notification - SI: PACE Info Unsupported Std Parameters";
            case -1862270975:
                return "Notification - SI: PACE Info Deprecated Version";
            case -1862270974:
                return "Notification - SI: PACE Domain Params Using Std Ref";
            case -1862270973:
                return "Notification - SI: PACE Domain Params Unsupported Algorithm";
            case -1862270972:
                return "Notification - SI: CA Info Incorrect Version";
            case -1862270971:
                return "Notification - SI: CA PublicKey Unsupported Algorithm";
            case -1862270970:
                return "Notification - SI: CA Domain Params Unsupported Algorithm";
            case -1862270969:
                return "Notification - SI: TA Info Incorrect Version";
            case -1862270968:
                return "Notification - SI: TA Info File ID For Version 2";
            case -1862270967:
                return "Notification - SI: eID Security Unsupported Digest Algorithm";
            case -1862270966:
                return "Notification - SI: RI info incorrect version";
            case -1862270965:
                return "Notification - SI: RI domain params unsupported algorithm";
            case -1862270964:
                return "Notification - SI: AA info incorrect version";
            case -1862270963:
                return "Notification - SI: AA info unsupported algorithm";
            case -1862270962:
                return "Notification - SI: AA info inconsistent algorithm reference";
            case -1862270720:
                return "Notification - SI: PACE Info Not Available";
            case -1862270719:
                return "Notification - SI: PACE Info No Std Parameters";
            case -1862270718:
                return "Notification - SI: PACE Info No Matching Domain Params";
            case -1862270717:
                return "Notification - SI: CA Info Not Available";
            case -1862270716:
                return "Notification - SI: CA Domain Params No Required Option";
            case -1862270715:
                return "Notification - SI: CA Domain Params Not Available";
            case -1862270714:
                return "Notification - SI: CA Anonymous Infos";
            case -1862270713:
                return "Notification - SI: CA Info No Matching Domain Params";
            case -1862270712:
                return "Notification - SI: CA Info No Matching Public Key";
            case -1862270711:
                return "Notification - SI: CA Incorrect Infos Quantity";
            case -1862270710:
                return "Notification - SI: TA Info Not Available";
            case -1862270709:
                return "Notification - SI: Card Info Locator Multiple Entries";
            case -1862270708:
                return "Notification - SI: eID Security Info Multiple Entries";
            case -1862270707:
                return "Notification - SI: Privileged TI Multiple Entries";
            case -1862270706:
                return "Notification - SI: Privileged TI Incorrect Usage";
            case -1862270705:
                return "Notification - SI: RI domain params multiple entries";
            case -1862270704:
                return "Notification - SI: Storage PACE Info Non Consistan";
            case -1862270463:
                return "Notification - CV Certificate: Profile incorrect version";
            case -1862270462:
                return "Notification - CV Certificate: Validity";
            case -1862270461:
                return "Notification - CV Certificate: Non CVCA domain parameters";
            case -1862270460:
                return "Notification - CV Certificate: Private key incorrect version";
            case -1862270208:
                return "Notification - TA: PACE static binding used";
            case -1845493483:
                return "Notification - Auth ML signer info: Certificate validity";
            case -1845493482:
                return "Notification - Auth ML signer info: Certificate root is not trusted";
            case -1845493481:
                return "Notification - Auth ML signer info: Certificate cant find CSCA";
            case -1845493480:
                return "Notification - Auth ML signer info: Certificate revoked";
            case -1845493479:
                return "Notification - Auth ML signer info: Certificate signature invalid";
            case -1:
                return "RFID: Failed";
            case 1:
                return "OK";
            case 2:
                return "RFID: Requested operation is already done";
            case 139272:
                return "Notification - MRZ: Document type unknown";
            case 139273:
                return "Notification - MRZ: Issuing state syntax error";
            case 139274:
                return "Notification - MRZ: Name is void";
            case 139277:
                return "Notification - MRZ: Number incorrect checksum";
            case 139278:
                return "Notification - MRZ: Nationality syntax error";
            case 139279:
                return "Notification - MRZ: DOB syntax error";
            case 139280:
                return "Notification - MRZ: DOB error";
            case 139281:
                return "Notification - MRZ: DOB incorrect checksum";
            case 139282:
                return "Notification - MRZ: Sex incorrect";
            case 139283:
                return "Notification - MRZ: DOE syntax error";
            case 139284:
                return "Notification - MRZ: DOE error";
            case 139285:
                return "Notification - MRZ: DOE incorrect checksum";
            case 139286:
                return "Notification - MRZ: Optional data incorrect checksum";
            case 139287:
                return "Notification - MRZ: Incorrect checksum";
            case 139288:
                return "Notification - MRZ: Incorrect";
            default:
                return value + "";
        }
    }
};

const eRFID_Password_Type = {
    PPT_UNKNOWN: 0,
    PPT_MRZ: 1,
    PPT_CAN: 2,
    PPT_PIN: 3,
    PPT_PUK: 4,
    PPT_PIN_ESIGN: 5,
    PPT_SAI: 6,
};

const eRFID_ResultType = {
    RFID_RESULT_TYPE_RFID_RAW_DATA: 101,
    RFID_RESULT_TYPE_RFID_TEXT_DATA: 102,
    RFID_RESULT_TYPE_RFID_IMAGE_DATA: 103,
    RFID_RESULT_TYPE_RFID_BINARY_DATA: 104,
    RFID_RESULT_TYPE_RFID_ORIGINAL_GRAPHICS: 105,
};

const eRFID_SDK_ProfilerType = {
    SPT_DOC_9303_EDITION_2006: 1,
    SPT_DOC_9303_LDS_PKI_MAINTENANCE: 2,
};

const eRFID_TerminalType = {
    TET_UNDEFINED: 0,
    TET_INSPECTION_SYSTEM: 1,
    TET_AUTHENTICATION_TERMINAL: 2,
    TET_SIGNATURE_TERMINAL: 3,
    TET_UNAUTHENTICATED_TERMINAL: 4,
};

const eRPRM_Authenticity = {
    NONE: 0,
    UV_LUMINESCENCE: 1,
    IR_B900: 2,
    IMAGE_PATTERN: 4,
    AXIAL_PROTECTION: 8,
    UV_FIBERS: 16,
    IR_VISIBILITY: 32,
    OCR_SECURITY_TEXT: 64,
    IPI: 128,
    IR_PHOTO: 256,
    PHOTO_EMBED_TYPE: 512,
    OVI: 1024,
    IR_LUMINESCENCE: 2048,
    HOLOGRAMS: 4096,
    PHOTO_AREA: 8192,
    UV_BACKGROUND: 16384,
    PORTRAIT_COMPARISON: 32768,
    BARCODE_FORMAT_CHECK: 65536,
    KINEGRAM: 131072,
    CANCELLING_DOCUMENT_DETECTOR: 262144,
};

const eRPRM_FieldVerificationResult = {
    RCF_DISABLED: 0,
    RCF_VERIFIED: 1,
    RCF_NOT_VERIFIED: 2,
    RCF_COMPARE_TRUE: 3,
    RCF_COMPARE_FALSE: 4,
};

const eRPRM_Lights = {
    NONE: 0,
    RPRM_LIGHT_UV: 128,
    RPRM_LIGHT_WHITE_FULL: 6,
    getTranslation: function (value) {
        switch (value) {
            case 6:
                return "Visible light";
            case 128:
                return "UV";
            default:
                return value;
        }
    }
};

const eRPRM_ResultType = {
    NONE: -1,
    RPRM_RESULT_TYPE_EMPTY: 0,
    RPRM_RESULT_TYPE_RAW_IMAGE: 1,
    RPRM_RESULT_TYPE_FILE_IMAGE: 2,
    RPRM_RESULT_TYPE_MRZ_OCR_EXTENDED: 3,
    RPRM_RESULT_TYPE_BARCODES: 5,
    RPRM_RESULT_TYPE_GRAPHICS: 6,
    RPRM_RESULT_TYPE_MRZ_TEST_QUALITY: 7,
    RPRM_RESULT_TYPE_DOCUMENT_TYPES_CANDIDATES: 8,
    RPRM_RESULT_TYPE_CHOSEN_DOCUMENT_TYPE_CANDIDATE: 9,
    RPRM_RESULT_TYPE_DOCUMENTS_INFO_LIST: 10,
    RPRM_RESULT_TYPE_OCR_LEXICAL_ANALYZE: 15,
    RPRM_RESULT_TYPE_RAW_UNCROPPED_IMAGE: 16,
    RPRM_RESULT_TYPE_VISUAL_OCR_EXTENDED: 17,
    RPRM_RESULT_TYPE_BAR_CODES_TEXT_DATA: 18,
    RPRM_RESULT_TYPE_BAR_CODES_IMAGE_DATA: 19,
    RPRM_RESULT_TYPE_AUTHENTICITY: 20,
    RPRM_RESULT_TYPE_EOS_IMAGE: 23,
    RPRM_RESULT_TYPE_BAYER_IMAGE: 24,
    RPRM_RESULT_TYPE_MAGNETIC_STRIPE: 25,
    RPRM_RESULT_TYPE_MAGNETIC_STRIPE_TEXT_DATA: 26,
    RPRM_RESULT_TYPE_FIELD_FILE_IMAGE: 27,
    RPRM_RESULT_TYPE_DATABASE_CHECK: 28,
    RPRM_RESULT_TYPE_FINGERPRINT_TEMPLATE_ISO: 29,
    RPRM_RESULT_TYPE_INPUT_IMAGE_QUALITY: 30,
    RPRM_RESULT_TYPE_DOCUMENT_POSITION: 85,
    RPRM_RESULT_TYPE_CUSTOM: 100,
};

const eRPRM_ResultType_Internal = {
    RPRM_RESULT_TYPE_INTERNAL_PHOTO_POSITION: 99,
    RPRM_RESULT_TYPE_INTERNAL_MAIN_DOCUMENT_INFO: 98,
    RPRM_RESULT_TYPE_INTERNAL_FACE_DETECTION: 97,
    RPRM_RESULT_TYPE_INTERNAL_L1_STYLE_RESULTS: 96,
    RPRM_RESULT_TYPE_INTERNAL_DOC_FORMAT: 95,
    RPRM_RESULT_TYPE_INTERNAL_DOC_FORMAT_ROTATED: 94,
    RPRM_RESULT_TYPE_INTERNAL_DOC_PRE_ORIENTATION_FACE: 93,
    RPRM_RESULT_TYPE_INTERNAL_BSI_XML: 92,
    RPRM_RESULT_TYPE_INTERNAL_COLOR_CALIBRATION_INFO: 91,
    RPRM_RESULT_TYPE_INTERNAL_DIST_CALIBRATION_INFO: 90,
    RPRM_RESULT_TYPE_INTERNAL_DOCS_LIST: 89,
    RPRM_RESULT_TYPE_INTERNAL_VISA_BOUNDS: 88,
    RPRM_RESULT_TYPE_INTERNAL_MRZ_DETECTOR: 87,
    RPRM_RESULT_TYPE_INTERNAL_DOCUMENT_POSITION: 86,
    RPRM_RESULT_TYPE_INTERNAL_BOUNDS_RESULT: 85,
    RPRM_RESULT_TYPE_INTERNAL_ORIENTATION: 84,
    RPRM_RESULT_TYPE_INTERNAL_PRE_ORIENTATION: 83,
    RPRM_RESULT_TYPE_INTERNAL_DEVICE_TYPE: 82,
    RPRM_RESULT_TYPE_INTERNAL_TEXT_DOC_INFO: 81,
    RPRM_RESULT_TYPE_INTERNAL_GRAPHICS_DOC_INFO: 80,
    RPRM_RESULT_TYPE_INTERNAL_BARCODE_DOC_INFO: 79,
    RPRM_RESULT_TYPE_INTERNAL_SOURCE_IMAGES_INFO: 78,
    RPRM_RESULT_TYPE_INTERNAL_REQUIRED_OCR_FIELDS: 77,
    RPRM_RESULT_TYPE_INTERNAL_LEX_ANALYSIS_DEPTH: 76,
    RPRM_RESULT_TYPE_INTERNAL_ORIGINAL_RESOLUTION_PPM: 75,
    RPRM_RESULT_TYPE_INTERNAL_BOUNDS_LOCATION_PARAMS: 74,
    RPRM_RESULT_TYPE_INTERNAL_BSI_XML_V2: 73,
    RPRM_RESULT_TYPE_INTERNAL_CANDIDATE_INFO: 72,
    RPRM_RESULT_TYPE_INTERNAL_SAMPLE_PATH: 71,
    RPRM_RESULT_TYPE_INTERNAL_BIND_RESULT: 70,
    RPRM_RESULT_TYPE_INTERNAL_SAVE_DEBUG_INFO: 69,
    RPRM_RESULT_TYPE_INTERNAL_DOCUMENT_JSON_DESC: 68,
    RPRM_RESULT_TYPE_INTERNAL_BIND_LAYERS_LIST_DESC: 67,
    RPRM_RESULT_TYPE_INTERNAL_MRZ_IMAGE: 66,
    RPRM_RESULT_TYPE_INTERNAL_RAW_CALIBRATE_IMAGES: 65,
    RPRM_RESULT_TYPE_INTERNAL_BYTE_ARRAY: 64,
    RPRM_RESULT_TYPE_INTERNAL_DOCUMENT_JSON: 63,
    RPRM_RESULT_TYPE_INTERNAL_BARCODE_POSITION: 62,
    RPRM_RESULT_TYPE_INTERNAL_MRZ_POSITION: 61,
};

const eRPRM_SecurityFeatureType = {
    NONE: -1,
    SECURITY_FEATURE_TYPE_BLANK: 0,
    SECURITY_FEATURE_TYPE_FILL: 1,
    SECURITY_FEATURE_TYPE_PHOTO: 2,
    SECURITY_FEATURE_TYPE_MRZ: 3,
    SECURITY_FEATURE_TYPE_FALSE_LUMINESCENCE: 4,
    SECURITY_FEATURE_TYPE_HOLO_SIMPLE: 5,
    SECURITY_FEATURE_TYPE_HOLO_VERIFY_STATIC: 6,
    SECURITY_FEATURE_TYPE_HOLO_VERIFY_MULTI_STATIC: 7,
    SECURITY_FEATURE_TYPE_HOLO_VERIFY_DINAMIC: 8,
    SECURITY_FEATURE_TYPE_PATTERN_NOT_INTERRUPTED: 9,
    SECURITY_FEATURE_TYPE_PATTERN_NOT_SHIFTED: 10,
    SECURITY_FEATURE_TYPE_PATTERN_SAME_COLORS: 11,
    SECURITY_FEATURE_TYPE_PATTERN_IR_INVISIBLE: 12,
    SECURITY_FEATURE_TYPE_PHOTO_SIZE_CHECK: 13,
    SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_GHOST: 14,
    SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_RFID: 15,
    SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_VISUAL: 16,
    SECURITY_FEATURE_TYPE_BARCODE: 17,
    SECURITY_FEATURE_TYPE_PATTERN_DIFFERENT_LINES_THICKNESS: 18,
    SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_CAMERA: 19,
    SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_RFID_VS_CAMERA: 20,
    SECURITY_FEATURE_TYPE_GHOST_PHOTO: 21,
    SECURITY_FEATURE_TYPE_CLEAR_GHOST_PHOTO: 22,
    SECURITY_FEATURE_TYPE_INVISIBLE_OBJECT: 23,
    SECURITY_FEATURE_TYPE_LOW_CONTRAST_OBJECT: 24,
    SECURITY_FEATURE_TYPE_PHOTO_COLOR: 25,
    SECURITY_FEATURE_TYPE_PHOTO_SHAPE: 26,
    SECURITY_FEATURE_TYPE_PHOTO_CORNERS: 27,
};

const eSignManagementAction = {
    smaCreatePIN: 1,
    smaChangePIN: 2,
    smaUnblockPIN: 3,
    smaTerminatePIN: 4,
    smaGenerateKeys: 5,
    smaTerminateKeys: 6,
    smaSignData: 7,
};

const eVisualFieldType = {
    FT_DOCUMENT_CLASS_CODE: 0,
    FT_ISSUING_STATE_CODE: 1,
    FT_DOCUMENT_NUMBER: 2,
    FT_DATE_OF_EXPIRY: 3,
    FT_DATE_OF_ISSUE: 4,
    FT_DATE_OF_BIRTH: 5,
    FT_PLACE_OF_BIRTH: 6,
    FT_PERSONAL_NUMBER: 7,
    FT_SURNAME: 8,
    FT_GIVEN_NAMES: 9,
    FT_MOTHERS_NAME: 10,
    FT_NATIONALITY: 11,
    FT_SEX: 12,
    FT_HEIGHT: 13,
    FT_WEIGHT: 14,
    FT_EYES_COLOR: 15,
    FT_HAIR_COLOR: 16,
    FT_ADDRESS: 17,
    FT_DONOR: 18,
    FT_SOCIAL_SECURITY_NUMBER: 19,
    FT_DL_CLASS: 20,
    FT_DL_ENDORSED: 21,
    FT_DL_RESTRICTION_CODE: 22,
    FT_DL_UNDER_21_DATE: 23,
    FT_AUTHORITY: 24,
    FT_SURNAME_AND_GIVEN_NAMES: 25,
    FT_NATIONALITY_CODE: 26,
    FT_PASSPORT_NUMBER: 27,
    FT_INVITATION_NUMBER: 28,
    FT_VISA_ID: 29,
    FT_VISA_CLASS: 30,
    FT_VISA_SUB_CLASS: 31,
    FT_MRZ_STRING_1: 32,
    FT_MRZ_STRING_2: 33,
    FT_MRZ_STRING_3: 34,
    FT_MRZ_TYPE: 35,
    FT_OPTIONAL_DATA: 36,
    FT_DOCUMENT_CLASS_NAME: 37,
    FT_ISSUING_STATE_NAME: 38,
    FT_PLACE_OF_ISSUE: 39,
    FT_DOCUMENT_NUMBER_CHECKSUM: 40,
    FT_DATE_OF_BIRTH_CHECKSUM: 41,
    FT_DATE_OF_EXPIRY_CHECKSUM: 42,
    FT_PERSONAL_NUMBER_CHECKSUM: 43,
    FT_FINAL_CHECKSUM: 44,
    FT_PASSPORT_NUMBER_CHECKSUM: 45,
    FT_INVITATION_NUMBER_CHECKSUM: 46,
    FT_VISA_ID_CHECKSUM: 47,
    FT_SURNAME_AND_GIVEN_NAMES_CHECKSUM: 48,
    FT_VISA_VALID_UNTIL_CHECKSUM: 49,
    FT_OTHER: 50,
    FT_MRZ_STRINGS: 51,
    FT_NAME_SUFFIX: 52,
    FT_NAME_PREFIX: 53,
    FT_DATE_OF_ISSUE_CHECKSUM: 54,
    FT_DATE_OF_ISSUE_CHECK_DIGIT: 55,
    FT_DOCUMENT_SERIES: 56,
    FT_REG_CERT_REG_NUMBER: 57,
    FT_REG_CERT_CAR_MODEL: 58,
    FT_REG_CERT_CAR_COLOR: 59,
    FT_REG_CERT_BODY_NUMBER: 60,
    FT_REG_CERT_CAR_TYPE: 61,
    FT_REG_CERT_MAX_WEIGHT: 62,
    FT_REG_CERT_WEIGHT: 63,
    FT_ADDRESS_AREA: 64,
    FT_ADDRESS_STATE: 65,
    FT_ADDRESS_BUILDING: 66,
    FT_ADDRESS_HOUSE: 67,
    FT_ADDRESS_FLAT: 68,
    FT_PLACE_OF_REGISTRATION: 69,
    FT_DATE_OF_REGISTRATION: 70,
    FT_RESIDENT_FROM: 71,
    FT_RESIDENT_UNTIL: 72,
    FT_AUTHORITY_CODE: 73,
    FT_PLACE_OF_BIRTH_AREA: 74,
    FT_PLACE_OF_BIRTH_STATE_CODE: 75,
    FT_ADDRESS_STREET: 76,
    FT_ADDRESS_CITY: 77,
    FT_ADDRESS_JURISDICTION_CODE: 78,
    FT_ADDRESS_POSTAL_CODE: 79,
    FT_DOCUMENT_NUMBER_CHECK_DIGIT: 80,
    FT_DATE_OF_BIRTH_CHECK_DIGIT: 81,
    FT_DATE_OF_EXPIRY_CHECK_DIGIT: 82,
    FT_PERSONAL_NUMBER_CHECK_DIGIT: 83,
    FT_FINAL_CHECK_DIGIT: 84,
    FT_PASSPORT_NUMBER_CHECK_DIGIT: 85,
    FT_INVITATION_NUMBER_CHECK_DIGIT: 86,
    FT_VISA_ID_CHECK_DIGIT: 87,
    FT_SURNAME_AND_GIVEN_NAMES_CHECK_DIGIT: 88,
    FT_VISA_VALID_UNTIL_CHECK_DIGIT: 89,
    FT_PERMIT_DL_CLASS: 90,
    FT_PERMIT_DATE_OF_EXPIRY: 91,
    FT_PERMIT_IDENTIFIER: 92,
    FT_PERMIT_DATE_OF_ISSUE: 93,
    FT_PERMIT_RESTRICTION_CODE: 94,
    FT_PERMIT_ENDORSED: 95,
    FT_ISSUE_TIMESTAMP: 96,
    FT_NUMBER_OF_DUPLICATES: 97,
    FT_MEDICAL_INDICATOR_CODES: 98,
    FT_NON_RESIDENT_INDICATOR: 99,
    FT_VISA_TYPE: 100,
    FT_VISA_VALID_FROM: 101,
    FT_VISA_VALID_UNTIL: 102,
    FT_DURATION_OF_STAY: 103,
    FT_NUMBER_OF_ENTRIES: 104,
    FT_DAY: 105,
    FT_MONTH: 106,
    FT_YEAR: 107,
    FT_UNIQUE_CUSTOMER_IDENTIFIER: 108,
    FT_COMMERCIAL_VEHICLE_CODES: 109,
    FT_AKA_DATE_OF_BIRTH: 110,
    FT_AKA_SOCIAL_SECURITY_NUMBER: 111,
    FT_AKA_SURNAME: 112,
    FT_AKA_GIVEN_NAMES: 113,
    FT_AKA_NAME_SUFFIX: 114,
    FT_AKA_NAME_PREFIX: 115,
    FT_MAILING_ADDRESS_STREET: 116,
    FT_MAILING_ADDRESS_CITY: 117,
    FT_MAILING_ADDRESS_JURISDICTION_CODE: 118,
    FT_MAILING_ADDRESS_POSTAL_CODE: 119,
    FT_AUDIT_INFORMATION: 120,
    FT_INVENTORY_NUMBER: 121,
    FT_RACE_ETHNICITY: 122,
    FT_JURISDICTION_VEHICLE_CLASS: 123,
    FT_JURISDICTION_ENDORSEMENT_CODE: 124,
    FT_JURISDICTION_RESTRICTION_CODE: 125,
    FT_FAMILY_NAME: 126,
    FT_GIVEN_NAMES_RUS: 127,
    FT_VISA_ID_RUS: 128,
    FT_FATHERS_NAME: 129,
    FT_FATHERS_NAME_RUS: 130,
    FT_SURNAME_AND_GIVEN_NAMES_RUS: 131,
    FT_PLACE_OF_BIRTH_RUS: 132,
    FT_AUTHORITY_RUS: 133,
    FT_ISSUING_STATE_CODE_NUMERIC: 134,
    FT_NATIONALITY_CODE_NUMERIC: 135,
    FT_ENGINE_POWER: 136,
    FT_ENGINE_VOLUME: 137,
    FT_CHASSIS_NUMBER: 138,
    FT_ENGINE_NUMBER: 139,
    FT_ENGINE_MODEL: 140,
    FT_VEHICLE_CATEGORY: 141,
    FT_IDENTITY_CARD_NUMBER: 142,
    FT_CONTROL_NO: 143,
    FT_PARRENTS_GIVEN_NAMES: 144,
    FT_SECOND_SURNAME: 145,
    FT_MIDDLE_NAME: 146,
    FT_REG_CERT_VIN: 147,
    FT_REG_CERT_VIN_CHECK_DIGIT: 148,
    FT_REG_CERT_VIN_CHECKSUM: 149,
    FT_LINE_1_CHECK_DIGIT: 150,
    FT_LINE_2_CHECK_DIGIT: 151,
    FT_LINE_3_CHECK_DIGIT: 152,
    FT_LINE_1_CHECKSUM: 153,
    FT_LINE_2_CHECKSUM: 154,
    FT_LINE_3_CHECKSUM: 155,
    FT_REG_CERT_REG_NUMBER_CHECK_DIGIT: 156,
    FT_REG_CERT_REG_NUMBER_CHECKSUM: 157,
    FT_REG_CERT_VEHICLE_ITS_CODE: 158,
    FT_CARD_ACCESS_NUMBER: 159,
    FT_MARITAL_STATUS: 160,
    FT_COMPANY_NAME: 161,
    FT_SPECIAL_NOTES: 162,
    FT_SURNAME_OF_SPOSE: 163,
    FT_TRACKING_NUMBER: 164,
    FT_BOOKLET_NUMBER: 165,
    FT_CHILDREN: 166,
    FT_COPY: 167,
    FT_SERIAL_NUMBER: 168,
    FT_DOSSIER_NUMBER: 169,
    FT_AKA_SURNAME_AND_GIVEN_NAMES: 170,
    FT_TERRITORIAL_VALIDITY: 171,
    FT_MRZ_STRINGS_WITH_CORRECT_CHECK_SUMS: 172,
    FT_DL_CDL_RESTRICTION_CODE: 173,
    FT_DL_UNDER_18_DATE: 174,
    FT_DL_RECORD_CREATED: 175,
    FT_DL_DUPLICATE_DATE: 176,
    FT_DL_ISS_TYPE: 177,
    FT_MILITARY_BOOK_NUMBER: 178,
    FT_DESTINATION: 179,
    FT_BLOOD_GROUP: 180,
    FT_SEQUENCE_NUMBER: 181,
    FT_REG_CERT_BODY_TYPE: 182,
    FT_REG_CERT_CAR_MARK: 183,
    FT_TRANSACTION_NUMBER: 184,
    FT_AGE: 185,
    FT_FOLIO_NUMBER: 186,
    FT_VOTER_KEY: 187,
    FT_ADDRESS_MUNICIPALITY: 188,
    FT_ADDRESS_LOCATION: 189,
    FT_SECTION: 190,
    FT_OCR_NUMBER: 191,
    FT_FEDERAL_ELECTIONS: 192,
    FT_REFERENCE_NUMBER: 193,
    FT_OPTIONAL_DATA_CHECKSUM: 194,
    FT_OPTIONAL_DATA_CHECK_DIGIT: 195,
    FT_VISA_NUMBER: 196,
    FT_VISA_NUMBER_CHECKSUM: 197,
    FT_VISA_NUMBER_CHECK_DIGIT: 198,
    FT_VOTER: 199,
    FT_PREVIOUS_TYPE: 200,
    FT_FIELD_FROM_MRZ: 220,
    FT_CURRENT_DATE: 221,
    FT_STATUS_DATE_OF_EXPIRY: 251,
    FT_BANKNOTE_NUMBER: 252,
    FT_CSC_CODE: 253,
    FT_ARTISTIC_NAME: 254,
    FT_ACADEMIC_TITLE: 255,
    FT_ADDRESS_COUNTRY: 256,
    FT_ADDRESS_ZIPCODE: 257,
    FT_E_ID_RESIDENCE_PERMIT_1: 258,
    FT_E_ID_RESIDENCE_PERMIT_2: 259,
    FT_E_ID_PLACE_OF_BIRTH_STREET: 260,
    FT_E_ID_PLACE_OF_BIRTH_CITY: 261,
    FT_E_ID_PLACE_OF_BIRTH_STATE: 262,
    FT_E_ID_PLACE_OF_BIRTH_COUNTRY: 263,
    FT_E_ID_PLACE_OF_BIRTH_ZIPCODE: 264,
    FT_CDL_CLASS: 265,
    FT_DL_UNDER_19_DATE: 266,
    FT_WEIGHT_POUNDS: 267,
    FT_LIMITED_DURATION_DOCUMENT_INDICATOR: 268,
    FT_ENDORSEMENT_EXPIRATION_DATE: 269,
    FT_REVISION_DATE: 270,
    FT_COMPLIANCE_TYPE: 271,
    FT_FAMILY_NAME_TRUNCATION: 272,
    FT_FIRST_NAME_TRUNCATION: 273,
    FT_MIDDLE_NAME_TRUNCATION: 274,
    FT_EXAM_DATE: 275,
    FT_ORGANIZATION: 276,
    FT_DEPARTMENT: 277,
    FT_PAY_GRADE: 278,
    FT_RANK: 279,
    FT_BENEFITS_NUMBER: 280,
    FT_SPONSOR_SERVICE: 281,
    FT_SPONSOR_STATUS: 282,
    FT_SPONSOR: 283,
    FT_RELATIONSHIP: 284,
    FT_USCIS: 285,
    FT_CATEGORY: 286,
    FT_CONDITIONS: 287,
    FT_IDENTIFIER: 288,
    FT_CONFIGURATION: 289,
    FT_DISCRETIONARY_DATA: 290,
    FT_LINE_1_OPTIONAL_DATA: 291,
    FT_LINE_2_OPTIONAL_DATA: 292,
    FT_LINE_3_OPTIONAL_DATA: 293,
    FT_EQV_CODE: 294,
    FT_ALT_CODE: 295,
    FT_BINARY_CODE: 296,
    FT_PSEUDO_CODE: 297,
    FT_FEE: 298,
    FT_STAMP_NUMBER: 299,
    FT_SBH_SECURITYOPTIONS: 300,
    FT_SBH_INTEGRITYOPTIONS: 301,
    FT_DATE_OF_CREATION: 302,
    FT_VALIDITY_PERIOD: 303,
    FT_PATRON_HEADER_VERSION: 304,
    FT_BDB_TYPE: 305,
    FT_BIOMETRIC_TYPE: 306,
    FT_BIOMETRIC_SUBTYPE: 307,
    FT_BIOMETRIC_PRODUCTID: 308,
    FT_BIOMETRIC_FORMAT_OWNER: 309,
    FT_BIOMETRIC_FORMAT_TYPE: 310,
    FT_PHONE: 311,
    FT_PROFESSION: 312,
    FT_TITLE: 313,
    FT_PERSONAL_SUMMARY: 314,
    FT_OTHER_VALID_ID: 315,
    FT_CUSTODY_INFO: 316,
    FT_OTHER_NAME: 317,
    FT_OBSERVATIONS: 318,
    FT_TAX: 319,
    FT_DATE_OF_PERSONALIZATION: 320,
    FT_PERSONALIZATION_SN: 321,
    FT_OTHERPERSON_NAME: 322,
    FT_PERSONTONOTIFY_DATE_OF_RECORD: 323,
    FT_PERSONTONOTIFY_NAME: 324,
    FT_PERSONTONOTIFY_PHONE: 325,
    FT_PERSONTONOTIFY_ADDRESS: 326,
    FT_DS_CERTIFICATE_ISSUER: 327,
    FT_DS_CERTIFICATE_SUBJECT: 328,
    FT_DS_CERTIFICATE_VALIDFROM: 329,
    FT_DS_CERTIFICATE_VALIDTO: 330,
    FT_VRC_DATAOBJECT_ENTRY: 331,
    FT_TYPE_APPROVAL_NUMBER: 332,
    FT_ADMINISTRATIVE_NUMBER: 333,
    FT_DOCUMENT_DISCRIMINATOR: 334,
    FT_DATA_DISCRIMINATOR: 335,
    FT_ISO_ISSUER_ID_NUMBER: 336,
    FT_GNIB_NUMBER: 340,
    FT_DEPT_NUMBER: 341,
    FT_TELEX_CODE: 342,
    FT_ALLERGIES: 343,
    FT_SP_CODE: 344,
    FT_COURT_CODE: 345,
    FT_CTY: 346,
    FT_SPONSOR_SSN: 347,
    FT_DO_D_NUMBER: 348,
    FT_MC_NOVICE_DATE: 349,
    FT_DUF_NUMBER: 350,
    FT_AGY: 351,
    FT_PNR_CODE: 352,
    FT_FROM_AIRPORT_CODE: 353,
    FT_TO_AIRPORT_CODE: 354,
    FT_FLIGHT_NUMBER: 355,
    FT_DATE_OF_FLIGHT: 356,
    FT_SEAT_NUMBER: 357,
    FT_DATE_OF_ISSUE_BOARDING_PASS: 358,
    FT_CCW_UNTIL: 359,
    FT_REFERENCE_NUMBER_CHECKSUM: 360,
    FT_REFERENCE_NUMBER_CHECK_DIGIT: 361,
    FT_ROOM_NUMBER: 362,
    FT_RELIGION: 363,
    FT_REMAINDER_TERM: 364,
    FT_ELECTRONIC_TICKET_INDICATOR: 365,
    FT_COMPARTMENT_CODE: 366,
    FT_CHECK_IN_SEQUENCE_NUMBER: 367,
    FT_AIRLINE_DESIGNATOR_OF_BOARDING_PASS_ISSUER: 368,
    FT_AIRLINE_NUMERIC_CODE: 369,
    FT_TICKET_NUMBER: 370,
    FT_FREQUENT_FLYER_AIRLINE_DESIGNATOR: 371,
    FT_FREQUENT_FLYER_NUMBER: 372,
    FT_FREE_BAGGAGE_ALLOWANCE: 373,
    FT_PDF_417_CODEC: 374,
    FT_IDENTITY_CARD_NUMBER_CHECKSUM: 375,
    FT_IDENTITY_CARD_NUMBER_CHECK_DIGIT: 376,
    FT_VETERAN: 377,
    FT_DL_CLASS_CODE_A_1_FROM: 378,
    FT_DL_CLASS_CODE_A_1_TO: 379,
    FT_DL_CLASS_CODE_A_1_NOTES: 380,
    FT_DL_CLASS_CODE_A_FROM: 381,
    FT_DL_CLASS_CODE_A_TO: 382,
    FT_DL_CLASS_CODE_A_NOTES: 383,
    FT_DL_CLASS_CODE_B_FROM: 384,
    FT_DL_CLASS_CODE_B_TO: 385,
    FT_DL_CLASS_CODE_B_NOTES: 386,
    FT_DL_CLASS_CODE_C_1_FROM: 387,
    FT_DL_CLASS_CODE_C_1_TO: 388,
    FT_DL_CLASS_CODE_C_1_NOTES: 389,
    FT_DL_CLASS_CODE_C_FROM: 390,
    FT_DL_CLASS_CODE_C_TO: 391,
    FT_DL_CLASS_CODE_C_NOTES: 392,
    FT_DL_CLASS_CODE_D_1_FROM: 393,
    FT_DL_CLASS_CODE_D_1_TO: 394,
    FT_DL_CLASS_CODE_D_1_NOTES: 395,
    FT_DL_CLASS_CODE_D_FROM: 396,
    FT_DL_CLASS_CODE_D_TO: 397,
    FT_DL_CLASS_CODE_D_NOTES: 398,
    FT_DL_CLASS_CODE_BE_FROM: 399,
    FT_DL_CLASS_CODE_BE_TO: 400,
    FT_DL_CLASS_CODE_BE_NOTES: 401,
    FT_DL_CLASS_CODE_C_1_E_FROM: 402,
    FT_DL_CLASS_CODE_C_1_E_TO: 403,
    FT_DL_CLASS_CODE_C_1_E_NOTES: 404,
    FT_DL_CLASS_CODE_CE_FROM: 405,
    FT_DL_CLASS_CODE_CE_TO: 406,
    FT_DL_CLASS_CODE_CE_NOTES: 407,
    FT_DL_CLASS_CODE_D_1_E_FROM: 408,
    FT_DL_CLASS_CODE_D_1_E_TO: 409,
    FT_DL_CLASS_CODE_D_1_E_NOTES: 410,
    FT_DL_CLASS_CODE_DE_FROM: 411,
    FT_DL_CLASS_CODE_DE_TO: 412,
    FT_DL_CLASS_CODE_DE_NOTES: 413,
    FT_DL_CLASS_CODE_M_FROM: 414,
    FT_DL_CLASS_CODE_M_TO: 415,
    FT_DL_CLASS_CODE_M_NOTES: 416,
    FT_DL_CLASS_CODE_L_FROM: 417,
    FT_DL_CLASS_CODE_L_TO: 418,
    FT_DL_CLASS_CODE_L_NOTES: 419,
    FT_DL_CLASS_CODE_T_FROM: 420,
    FT_DL_CLASS_CODE_T_TO: 421,
    FT_DL_CLASS_CODE_T_NOTES: 422,
    FT_DL_CLASS_CODE_AM_FROM: 423,
    FT_DL_CLASS_CODE_AM_TO: 424,
    FT_DL_CLASS_CODE_AM_NOTES: 425,
    FT_DL_CLASS_CODE_A_2_FROM: 426,
    FT_DL_CLASS_CODE_A_2_TO: 427,
    FT_DL_CLASS_CODE_A_2_NOTES: 428,
    FT_DL_CLASS_CODE_B_1_FROM: 429,
    FT_DL_CLASS_CODE_B_1_TO: 430,
    FT_DL_CLASS_CODE_B_1_NOTES: 431,
    FT_SURNAME_AT_BIRTH: 432,
    FT_CIVIL_STATUS: 433,
    FT_NUMBER_OF_SEATS: 434,
    FT_NUMBER_OF_STANDING_PLACES: 435,
    FT_MAX_SPEED: 436,
    FT_FUEL_TYPE: 437,
    FT_EC_ENVIRONMENTAL_TYPE: 438,
    FT_POWER_WEIGHT_RATIO: 439,
    FT_MAX_MASS_OF_TRAILER_BRAKED: 440,
    FT_MAX_MASS_OF_TRAILER_UNBRAKED: 441,
    FT_TRANSMISSION_TYPE: 442,
    FT_TRAILER_HITCH: 443,
    FT_ACCOMPANIED_BY: 444,
    FT_POLICE_DISTRICT: 445,
    FT_FIRST_ISSUE_DATE: 446,
    FT_PAYLOAD_CAPACITY: 447,
    FT_NUMBER_OF_AXELS: 448,
    FT_PERMISSIBLE_AXLE_LOAD: 449,
    FT_PRECINCT: 450,
    FT_INVITED_BY: 451,
    FT_PURPOSE_OF_ENTRY: 452,
    FT_SKIN_COLOR: 453,
    FT_COMPLEXION: 454,
    FT_AIRPORT_FROM: 455,
    FT_AIRPORT_TO: 456,
    FT_AIRLINE_NAME: 457,
    FT_AIRLINE_NAME_FREQUENT_FLYER: 458,
    FT_LICENSE_NUMBER: 459,
    FT_IN_TANKS: 460,
    FT_EXEPT_IN_TANKS: 461,
    FT_FAST_TRACK: 462,
    FT_OWNER: 463,
    FT_MRZ_STRINGS_ICAO_RFID: 464,
    FT_NUMBER_OF_CARD_ISSUANCE: 465,
    FT_NUMBER_OF_CARD_ISSUANCE_CHECKSUM: 466,
    FT_NUMBER_OF_CARD_ISSUANCE_CHECK_DIGIT: 467,
    FT_CENTURY_DATE_OF_BIRTH: 468,
    FT_DL_CLASSCODE_A3_FROM: 469,
    FT_DL_CLASSCODE_A3_TO: 470,
    FT_DL_CLASSCODE_A3_NOTES: 471,
    FT_DL_CLASSCODE_C2_FROM: 472,
    FT_DL_CLASSCODE_C2_TO: 473,
    FT_DL_CLASSCODE_C2_NOTES: 474,
    FT_DL_CLASSCODE_B2_FROM: 475,
    FT_DL_CLASSCODE_B2_TO: 476,
    FT_DL_CLASSCODE_B2_NOTES: 477,
    FT_DL_CLASSCODE_D2_FROM: 478,
    FT_DL_CLASSCODE_D2_TO: 479,
    FT_DL_CLASSCODE_D2_NOTES: 480,
    FT_DL_CLASSCODE_B2E_FROM: 481,
    FT_DL_CLASSCODE_B2E_TO: 482,
    FT_DL_CLASSCODE_B2E_NOTES: 483,
    FT_DL_CLASSCODE_G_FROM: 484,
    FT_DL_CLASSCODE_G_TO: 485,
    FT_DL_CLASSCODE_G_NOTES: 486,
    FT_DL_CLASSCODE_J_FROM: 487,
    FT_DL_CLASSCODE_J_TO: 488,
    FT_DL_CLASSCODE_J_NOTES: 489,
    FT_DL_CLASSCODE_LC_FROM: 490,
    FT_DL_CLASSCODE_LC_TO: 491,
    FT_DLC_LASSCODE_LC_NOTES: 492,
    FT_BANKCARDNUMBER: 493,
    FT_BANKCARDVALIDTHRU: 494,
    FT_TAX_NUMBER: 495,
    FT_HEALTH_NUMBER: 496,
    FT_GRANDFATHERNAME: 497,
    FT_SELECTEE_INDICATOR: 498,
    FT_MOTHER_SURNAME: 499,
    FT_MOTHER_GIVENNAME: 500,
    FT_FATHER_SURNAME: 501,
    FT_FATHER_GIVENNAME: 502,
    FT_MOTHER_DATEOFBIRTH: 503,
    FT_FATHER_DATEOFBIRTH: 504,
    FT_MOTHER_PERSONALNUMBER: 505,
    FT_FATHER_PERSONALNUMBER: 506,
    FT_MOTHER_PLACEOFBIRTH: 507,
    FT_FATHER_PLACEOFBIRTH: 508,
    FT_MOTHER_COUNTRYOFBIRTH: 509,
    FT_FATHER_COUNTRYOFBIRTH: 510,
    FT_DATE_FIRST_RENEWAL: 511,
    FT_DATE_SECOND_RENEWAL: 512,
    getTranslation: function (value) {
        switch (value) {
            case 0:
                return "Document class code";
            case 1:
                return "Issuing state code";
            case 2:
                return "Document #";
            case 3:
                return "Date of expiry";
            case 4:
                return "Date of issue";
            case 5:
                return "Date of birth";
            case 6:
                return "Place of birth";
            case 7:
                return "Personal #";
            case 8:
                return "Surname";
            case 9:
                return "Given name";
            case 10:
                return "Mother\'s name";
            case 11:
                return "Nationality";
            case 12:
                return "Sex";
            case 13:
                return "Height";
            case 14:
                return "Weight";
            case 15:
                return "Eye color";
            case 16:
                return "Hair сolor";
            case 17:
                return "Address";
            case 18:
                return "Donor";
            case 19:
                return "Social insurance number";
            case 20:
                return "DL class";
            case 21:
                return "DL Endorsed";
            case 22:
                return "DL Restriction Code";
            case 23:
                return "Date of 21th birthday";
            case 24:
                return "Issuing authority";
            case 25:
                return "Surname and given names";
            case 26:
                return "Nationality code";
            case 27:
                return "Passport #";
            case 28:
                return "Invitation number";
            case 29:
                return "Visa ID";
            case 30:
                return "Visa Class";
            case 31:
                return "Visa subclass";
            case 32:
                return "MRZ line 1";
            case 33:
                return "MRZ line 2";
            case 34:
                return "MRZ line 3";
            case 35:
                return "MRZ Type";
            case 36:
                return "Optional data";
            case 37:
                return "Document сlass";
            case 38:
                return "Issuing state";
            case 39:
                return "Place of issue";
            case 40:
                return "Checksum for document number";
            case 41:
                return "Checksum for date of birth";
            case 42:
                return "Checksum for date of expiry";
            case 43:
                return "Checksum for personal #";
            case 44:
                return "Final checksum";
            case 45:
                return "Checksum for Passport #";
            case 46:
                return "Checksum for invitation number";
            case 47:
                return "Checksum for visa ID";
            case 48:
                return "Checksum for surname and given names";
            case 49:
                return "Checksum for visa expiry date";
            case 50:
                return "Other";
            case 51:
                return "MRZ lines";
            case 52:
                return "Name suffix";
            case 53:
                return "Name prefix";
            case 54:
                return "Checksum for date of issue";
            case 55:
                return "Check digit for date of issue";
            case 56:
                return "Document series";
            case 57:
                return "Registration number";
            case 58:
                return "Vehicle model";
            case 59:
                return "Vehicle color";
            case 60:
                return "Body number";
            case 61:
                return "Vehicle type";
            case 62:
                return "Max permissible weight";
            case 63:
                return "Unladen mass";
            case 64:
                return "Area";
            case 65:
                return "State";
            case 66:
                return "Building";
            case 67:
                return "Unit";
            case 68:
                return "Apartment";
            case 69:
                return "Place of registration";
            case 70:
                return "Date of registration";
            case 71:
                return "Resident from";
            case 72:
                return "Resident until";
            case 73:
                return "Issuing authority code";
            case 74:
                return "Area of birthplace";
            case 75:
                return "State code of birthplace";
            case 76:
                return "Street";
            case 77:
                return "City";
            case 78:
                return "Jurisdiction code";
            case 79:
                return "Postal code";
            case 80:
                return "Check digit for document number";
            case 81:
                return "Check digit for date of birth";
            case 82:
                return "Check digit for date of expiry";
            case 83:
                return "Check digit for personal # ";
            case 84:
                return "Final check digit";
            case 85:
                return "Check digit for Passport #";
            case 86:
                return "Check digit for invitaiton number";
            case 87:
                return "Check digit for visa ID";
            case 88:
                return "Check digit for surname and given names";
            case 89:
                return "Check digit for visa expiry date";
            case 90:
                return "Permit сlass";
            case 91:
                return "Permit expiry date";
            case 92:
                return "Permit identifier";
            case 93:
                return "Permit issue date";
            case 94:
                return "Permit restriction code";
            case 95:
                return "Permit endorsement code";
            case 96:
                return "Issue time";
            case 97:
                return "Number of duplicates";
            case 98:
                return "Medical indicator/code";
            case 99:
                return "Non-resident indicator";
            case 100:
                return "Visa type";
            case 101:
                return "Visa valid from";
            case 102:
                return "Visa valid until";
            case 103:
                return "Duration of stay";
            case 104:
                return "Number of entries";
            case 105:
                return "Day";
            case 106:
                return "Month";
            case 107:
                return "Year";
            case 108:
                return "Unique сustomer identifier";
            case 109:
                return "Commercial vehicle code";
            case 110:
                return "AKA Date of birth";
            case 111:
                return "AKA Social Insurance Number";
            case 112:
                return "AKA Surname";
            case 113:
                return "AKA Given name";
            case 114:
                return "AKA Name suffix";
            case 115:
                return "AKA Name prefix";
            case 116:
                return "Mailing address - street";
            case 117:
                return "Mailing address - city";
            case 118:
                return "Mailing address - jurisdiction code";
            case 119:
                return "Mailing address - postal code";
            case 120:
                return "Number for validation";
            case 121:
                return "Inventory number";
            case 122:
                return "Race/ethnicity";
            case 123:
                return "Jurisdiction vehicle class";
            case 124:
                return "Jurisdiction endorsement code";
            case 125:
                return "Jurisdiction restriction code";
            case 126:
                return "Surname/given name at birth";
            case 127:
                return "Given name (National)";
            case 128:
                return "Visa ID (National)";
            case 129:
                return "Father\'s name";
            case 130:
                return "Father\'s name (National)";
            case 131:
                return "Surname and given names (National)";
            case 132:
                return "Place of birth (National)";
            case 133:
                return "Issuing authority (National)";
            case 134:
                return "Numeric issuing state code";
            case 135:
                return "Numeric nationality code";
            case 136:
                return "Engine power";
            case 137:
                return "Engine volume";
            case 138:
                return "Chassis number";
            case 139:
                return "Engine number";
            case 140:
                return "Engine model";
            case 141:
                return "Vehicle category";
            case 142:
                return "Identity card number";
            case 143:
                return "Control #";
            case 144:
                return "Parents\' given names";
            case 145:
                return "Second surname";
            case 146:
                return "Middle name";
            case 147:
                return "Vehicle identification number";
            case 148:
                return "Check digit for VIN ";
            case 149:
                return "Checksum for VIN";
            case 150:
                return "Check digit for line 1";
            case 151:
                return "Check digit for line 2";
            case 152:
                return "Check digit for line 3";
            case 153:
                return "Checksum for line 1";
            case 154:
                return "Checksum for line 2";
            case 155:
                return "Checksum for line 3";
            case 156:
                return "Check digit for registration number";
            case 157:
                return "Checksum for registration number";
            case 158:
                return "Vehicle ITS code";
            case 159:
                return "Card access number";
            case 160:
                return "Marital status";
            case 161:
                return "Company name";
            case 162:
                return "Special notes";
            case 163:
                return "Spouse\'s surname ";
            case 164:
                return "Tracking number";
            case 165:
                return "Booklet number";
            case 166:
                return "Children";
            case 167:
                return "Copy";
            case 168:
                return "Serial number";
            case 169:
                return "Dossier number";
            case 170:
                return "AKA Full name";
            case 171:
                return "Territorial validity";
            case 172:
                return "MRZ lines with correct checksums";
            case 173:
                return "CDL Restriction Code";
            case 174:
                return "Date of 18th birthday";
            case 175:
                return "Record created";
            case 176:
                return "Duplicate date";
            case 177:
                return "Iss. Type";
            case 178:
                return "Military book number";
            case 179:
                return "Destination";
            case 180:
                return "Blood group";
            case 181:
                return "Sequence number";
            case 182:
                return "Body type";
            case 183:
                return "Vehicle make";
            case 184:
                return "Transaction number";
            case 185:
                return "Age";
            case 186:
                return "Folio number";
            case 187:
                return "Voter Key";
            case 188:
                return "Municipality";
            case 189:
                return "Location";
            case 190:
                return "Section";
            case 191:
                return "OCR number";
            case 192:
                return "Federal elections";
            case 193:
                return "Unique number";
            case 194:
                return "Checksum for optional data";
            case 195:
                return "Check digit for optional data";
            case 196:
                return "Visa Number";
            case 197:
                return "Checksum for visa number";
            case 198:
                return "Check digit for visa number";
            case 199:
                return "Voter";
            case 200:
                return "Type/number of the previous document";
            case 220:
                return "Field from MRZ";
            case 251:
                return "Status Expiry Date";
            case 252:
                return "Banknote number";
            case 253:
                return "CSC Code";
            case 254:
                return "Pseudonym";
            case 255:
                return "Academic title";
            case 256:
                return "Country";
            case 257:
                return "ZIP code";
            case 258:
                return "Residence permit 1";
            case 259:
                return "Residence permit 2";
            case 260:
                return "Place Of Birth: Street";
            case 261:
                return "Place Of Birth: City";
            case 262:
                return "Place Of Birth: State";
            case 263:
                return "Place Of Birth: Country";
            case 264:
                return "Place Of Birth: Postal code";
            case 265:
                return "CDL Class";
            case 266:
                return "Date of 19th birthday";
            case 267:
                return "Weight (pound)";
            case 268:
                return "Indicator of document limited duration";
            case 269:
                return "Endorsement expiration date";
            case 270:
                return "Revision date";
            case 271:
                return "Compliance type";
            case 272:
                return "Truncated surname/given name at birth ";
            case 273:
                return "First name truncation";
            case 274:
                return "Middle name truncation";
            case 275:
                return "Exam date";
            case 276:
                return "Organization";
            case 277:
                return "Department";
            case 278:
                return "Pay grade";
            case 279:
                return "Rank";
            case 280:
                return "Benefits number";
            case 281:
                return "Sponsor service";
            case 282:
                return "Sponsor status";
            case 283:
                return "Sponsor";
            case 284:
                return "Relationship";
            case 285:
                return "USCIS";
            case 286:
                return "Category";
            case 287:
                return "Conditions";
            case 288:
                return "Identifier";
            case 289:
                return "Configuration";
            case 290:
                return "Discretionary data";
            case 291:
                return "Optional data from line 1";
            case 292:
                return "Optional data from line 2";
            case 293:
                return "Optional data from line 3";
            case 294:
                return "EQV Code";
            case 295:
                return "ALT Code";
            case 296:
                return "Binary code";
            case 297:
                return "Pseudocode";
            case 298:
                return "Fee";
            case 299:
                return "Stamp number";
            case 300:
                return "SBH security options";
            case 301:
                return "SBH integrity options";
            case 302:
                return "Creation date";
            case 303:
                return "Validity period";
            case 304:
                return "Patron header version";
            case 305:
                return "BDB type";
            case 306:
                return "Biometric type";
            case 307:
                return "Biometric subtype";
            case 308:
                return "Biometric product ID";
            case 309:
                return "Biometric format owner";
            case 310:
                return "Biometric format type";
            case 311:
                return "Phone";
            case 312:
                return "Profession";
            case 313:
                return "Position";
            case 314:
                return "Personal data summary";
            case 315:
                return "Other valid IDs";
            case 316:
                return "Custody info";
            case 317:
                return "Other name";
            case 318:
                return "Observations";
            case 319:
                return "Tax";
            case 320:
                return "Personalization date";
            case 321:
                return "Serial number of personalization ";
            case 322:
                return "Other person, name";
            case 323:
                return "Notify person: Date of record";
            case 324:
                return "Notify person: Name";
            case 325:
                return "Notify person: Phone";
            case 326:
                return "Notify person: Address";
            case 327:
                return "DS Certificate Issuer";
            case 328:
                return "DS Certificate Subject";
            case 329:
                return "DS Certificate Valid From";
            case 330:
                return "DS Certificate Valid To";
            case 331:
                return "Vehicle data from the DG1 data group";
            case 332:
                return "Type approval number";
            case 333:
                return "Administrative number";
            case 334:
                return "Document discriminator";
            case 335:
                return "Data discriminator";
            case 336:
                return "ISO issuer ID number";
            case 340:
                return "GNIB Number";
            case 341:
                return "Department number";
            case 342:
                return "Telegraph code";
            case 343:
                return "Allergies";
            case 344:
                return "SP code";
            case 345:
                return "Court code";
            case 346:
                return "County";
            case 347:
                return "Sponsor SSN";
            case 348:
                return "DoD number";
            case 349:
                return "Expiry date of Motorcycle Novice status";
            case 350:
                return "DUF Number";
            case 351:
                return "AGY";
            case 352:
                return "PNR code";
            case 353:
                return "Сode of the airport of departure";
            case 354:
                return "Сode of the airport of arrival";
            case 355:
                return "Flight number";
            case 356:
                return "Date of flight";
            case 357:
                return "Seat number";
            case 358:
                return "Date of boarding pass issue";
            case 359:
                return "CCW Until";
            case 360:
                return "Unique number checksum";
            case 361:
                return "Unique number check digit";
            case 362:
                return "Room number";
            case 363:
                return "Religion";
            case 364:
                return "Months to expire";
            case 365:
                return "Electronic ticket indicator";
            case 366:
                return "Compartment code";
            case 367:
                return "Check-in sequence number";
            case 368:
                return "Airline designator of boarding pass issuer";
            case 369:
                return "Airline numeric code";
            case 370:
                return "Ticket number";
            case 371:
                return "Frequent Flyer airline designator";
            case 372:
                return "Frequent flyer number";
            case 373:
                return "Free baggage allowance";
            case 374:
                return "PDF417 codec";
            case 375:
                return "Checksum for identity card number";
            case 376:
                return "Check digit for identity card number";
            case 377:
                return "Veteran";
            case 378:
                return "DL class code A1 From";
            case 379:
                return "DL class code A1 To";
            case 380:
                return "DL class code A1 Notes";
            case 381:
                return "DL class code A From";
            case 382:
                return "DL class code A To";
            case 383:
                return "DL class code A Notes";
            case 384:
                return "DL class code B From";
            case 385:
                return "DL class code B To";
            case 386:
                return "DL class code B Notes";
            case 387:
                return "DL class code C1 From";
            case 388:
                return "DL class code C1 To";
            case 389:
                return "DL class code C1 Notes";
            case 390:
                return "DL class code C From";
            case 391:
                return "DL class code C To";
            case 392:
                return "DL class code C Notes";
            case 393:
                return "DL class code D1 From";
            case 394:
                return "DL class code D1 To";
            case 395:
                return "DL class code D1 Notes";
            case 396:
                return "DL class code D From";
            case 397:
                return "DL class code D To";
            case 398:
                return "DL class code D Notes";
            case 399:
                return "DL class code BE From";
            case 400:
                return "DL class code BE To";
            case 401:
                return "DL class code BE Notes";
            case 402:
                return "DL class code C1E From";
            case 403:
                return "DL class code C1E To";
            case 404:
                return "DL class code C1E Notes";
            case 405:
                return "DL class code CE From";
            case 406:
                return "DL class code CE To";
            case 407:
                return "DL class code CE Notes";
            case 408:
                return "DL class code D1E From";
            case 409:
                return "DL class code D1E To";
            case 410:
                return "DL class code D1E Notes";
            case 411:
                return "DL class code DE From";
            case 412:
                return "DL class code DE To";
            case 413:
                return "DL class code DE Notes";
            case 414:
                return "DL class code M From";
            case 415:
                return "DL class code M To";
            case 416:
                return "DL class code M Notes";
            case 417:
                return "DL class code L From";
            case 418:
                return "DL class code L To";
            case 419:
                return "DL class code L Notes";
            case 420:
                return "DL class code T From";
            case 421:
                return "DL class code T To";
            case 422:
                return "DL class code T Notes";
            case 423:
                return "DL class code AM From";
            case 424:
                return "DL class code AM To";
            case 425:
                return "DL class code AM Notes";
            case 426:
                return "DL class code A2 From";
            case 427:
                return "DL class code A2 To";
            case 428:
                return "DL class code A2 Notes";
            case 429:
                return "DL class code B1 From";
            case 430:
                return "DL class code B1 To";
            case 431:
                return "DL class code B1 Notes";
            case 432:
                return "Surname at birth";
            case 433:
                return "Civil status";
            case 434:
                return "Number of seats";
            case 435:
                return "Number of standing places";
            case 436:
                return "Max speed";
            case 437:
                return "Fuel type";
            case 438:
                return "Vehicle environmental type";
            case 439:
                return "Power–to–weight ratio";
            case 440:
                return "Max mass of trailer (braked)";
            case 441:
                return "Max mass of trailer (unbraked)";
            case 442:
                return "Transmission type";
            case 443:
                return "Trailer hitch";
            case 444:
                return "Accompanied by";
            case 445:
                return "Police district";
            case 446:
                return "First issue date";
            case 447:
                return "Payload capacity";
            case 448:
                return "Number of axels";
            case 449:
                return "Permissible axle load";
            case 450:
                return "Precinct";
            case 451:
                return "Invited by";
            case 452:
                return "Purpose of entry";
            case 453:
                return "Skin color";
            case 454:
                return "Complexion";
            case 455:
                return "Airport of departure";
            case 456:
                return "Airport of arrival";
            case 457:
                return "Airline name";
            case 458:
                return "Airline loyalty program for frequent flyers";
            case 459:
                return "License number";
            case 460:
                return "In tanks";
            case 461:
                return "Except in tanks";
            case 462:
                return "Fast Track service";
            case 463:
                return "Owner";
            case 464:
                return "MRZ lines from ICAO RFID";
            case 465:
                return "Number of card issuances";
            case 466:
                return "Сhecksum for number of card issuances ";
            case 467:
                return "Сheck digit for number of card issuances";
            case 468:
                return "Century of birth";
            case 469:
                return "DL class code A3 From";
            case 470:
                return "DL class code A3 To";
            case 471:
                return "DL class code A3 Notes";
            case 472:
                return "DL class code C2 From";
            case 473:
                return "DL class code C2 To";
            case 474:
                return "DL class code C2 Notes";
            case 475:
                return "DL class code B2 From";
            case 476:
                return "DL class code B2 To";
            case 477:
                return "DL class code B2 Notes";
            case 478:
                return "DL class code D2 From";
            case 479:
                return "DL class code D2 To";
            case 480:
                return "DL class code D2 Notes";
            case 481:
                return "DL class code B2E From";
            case 482:
                return "DL class code B2E To";
            case 483:
                return "DL class code B2E Notes";
            case 484:
                return "DL class code G From";
            case 485:
                return "DL class code G To";
            case 486:
                return "DL class code G Notes";
            case 487:
                return "DL class code J From";
            case 488:
                return "DL class code J To";
            case 489:
                return "DL class code J Notes";
            case 490:
                return "DL class code LC From";
            case 491:
                return "DL class code LC To";
            case 492:
                return "DL class code LC Notes";
            case 493:
                return "Bank card number";
            case 494:
                return "Bank card validity";
            case 495:
                return "Tax number";
            case 496:
                return "Health insurance number";
            case 497:
                return "Grandfather's name";
            case 498:
                return "Selectee indicator";
            case 499:
                return "Mother's surname";
            case 500:
                return "Mother's given name";
            case 501:
                return "Father's surname";
            case 502:
                return "Father's given name";
            case 503:
                return "Mother's date of birth";
            case 504:
                return "Father's date of birth";
            case 505:
                return "Mother's personal #";
            case 506:
                return "Father's personal #";
            case 507:
                return "Mother's place of birth";
            case 508:
                return "Father's place of birth";
            case 509:
                return "Mother's country of birth";
            case 510:
                return "Father's country of birth";
            case 511:
                return "Date of first renewal";
            case 512:
                return "Date of second renewal";
            default:
                return value;
        }
    }
};

const FrameShapeType = {
    LINE: 0,
    CORNER: 1,
};

const LCID = {
    LATIN: 0,
    AFRIKAANS: 1078,
    ALBANIAN: 1052,
    ARABIC_ALGERIA: 5121,
    ARABIC_BAHRAIN: 15361,
    ARABIC_EGYPT: 3073,
    ARABIC_IRAQ: 2049,
    ARABIC_JORDAN: 11265,
    ARABIC_KUWAIT: 13313,
    ARABIC_LEBANON: 12289,
    ARABIC_LIBYA: 4097,
    ARABIC_MOROCCO: 6145,
    ARABIC_OMAN: 8193,
    ARABIC_QATAR: 16385,
    ARABIC_SAUDI_ARABIA: 1025,
    ARABIC_SYRIA: 10241,
    ARABIC_TUNISIA: 7169,
    ARABIC_UAE: 14337,
    ARABIC_YEMEN: 9217,
    ARABIC_ARMENIAN: 1067,
    AZERI_CYRILIC: 2092,
    AZERI_LATIN: 1068,
    BASQUE: 1069,
    BELARUSIAN: 1059,
    BULGARIAN: 1026,
    CATALAN: 1027,
    CHINESE_HONGKONG_SAR: 3076,
    CHINESE_MACAO_SAR: 5124,
    CHINESE: 2052,
    CHINESE_SINGAPORE: 4100,
    CHINESE_TAIWAN: 1028,
    CROATIAN: 1050,
    CZECH: 1029,
    DANISH: 1030,
    DIVEHI: 1125,
    DUTCH_BELGIUM: 2067,
    DUTCH_NETHERLANDS: 1043,
    ENGLISH_AUSTRALIA: 3081,
    ENGLISH_BELIZE: 10249,
    ENGLISH_CANADA: 4105,
    ENGLISH_CARRIBEAN: 9225,
    ENGLISH_IRELAND: 6153,
    ENGLISH_JAMAICA: 8201,
    ENGLISH_NEW_ZEALAND: 5129,
    ENGLISH_PHILIPPINES: 13321,
    ENGLISH_SOUTH_AFRICA: 7177,
    ENGLISH_TRINIDAD: 11273,
    ENGLISH_UK: 2057,
    ENGLISH_US: 1033,
    ENGLISH_ZIMBABWE: 12297,
    ESTONIAN: 1061,
    FAEROESE: 1080,
    FARSI: 1065,
    FINNISH: 1035,
    FRENCH_BELGIUM: 2060,
    FRENCH_CANADA: 3084,
    FRENCH_FRANCE: 1036,
    FRENCH_LUXEMBOURG: 5132,
    FRENCH_MONACO: 6156,
    FRENCH_SWITZERLAND: 4108,
    FYRO_MACEDONIAN: 1071,
    GALICIAN: 1110,
    GEORGIAN: 1079,
    GERMAN_AUSTRIA: 3079,
    GERMAN_GERMANY: 1031,
    GERMAN_LIECHTENSTEIN: 5127,
    GERMAN_LUXEMBOURG: 4103,
    GERMAN_SWITZERLAND: 2055,
    GREEK: 1032,
    GUJARATI: 1095,
    HEBREW: 1037,
    HINDI_INDIA: 1081,
    HUNGARIAN: 1038,
    ICELANDIC: 1039,
    INDONESIAN: 1057,
    ITALIAN_ITALY: 1040,
    ITALIAN_SWITZERLAND: 2064,
    JAPANESE: 1041,
    KANNADA: 1099,
    KAZAKH: 1087,
    KONKANI: 1111,
    KOREAN: 1042,
    KYRGYZ_CYRILICK: 1088,
    LATVIAN: 1062,
    LITHUANIAN: 1063,
    MALAY_MALAYSIA: 1086,
    MALAY_BRUNEI_DARUSSALAM: 2110,
    MARATHI: 1102,
    MONGOLIAN_CYRILIC: 1104,
    NORWEGIAN_BOKMAL: 1044,
    NORWEGIAN_NYORSK: 2068,
    POLISH: 1045,
    PORTUGUESE_BRAZIL: 1046,
    PORTUGUESE_PORTUGAL: 2070,
    PUNJABI: 1094,
    RHAETO_ROMANIC: 1047,
    ROMANIAN: 1048,
    RUSSIAN: 1049,
    SANSKRIT: 1103,
    SERBIAN_CYRILIC: 3098,
    SERBIAN_LATIN: 2074,
    SLOVAK: 1051,
    SLOVENIAN: 1060,
    SPANISH_ARGENTINA: 11274,
    SPANISH_BOLIVIA: 16394,
    SPANISH_CHILE: 13322,
    SPANICH_COLOMBIA: 9226,
    SPANISH_COSTA_RICA: 5130,
    SPANISH_DOMINICAN_REPUBLIC: 7178,
    SPANISH_ECUADOR: 12298,
    SPANISH_EL_SALVADOR: 17418,
    SPANISH_GUATEMALA: 4106,
    SPANISH_HONDURAS: 18442,
    SPANISH_MEXICO: 2058,
    SPANISH_NICARAGUA: 19466,
    SPANISH_PANAMA: 6154,
    SPANISH_PARAGUAY: 15370,
    SPANISH_PERU: 10250,
    SPANISH_PUERTO_RICO: 20490,
    SPANISH_TRADITIONAL_SORT: 1034,
    SPANISH_INTERNATIONAL_SORT: 3082,
    SPANISH_URUGUAY: 14346,
    SPANISH_VENEZUELA: 8202,
    SWAHILI: 1089,
    SWEDISH: 1053,
    SWEDISH_FINLAND: 2077,
    SYRIAC: 1114,
    TAMIL: 1097,
    TATAR: 1092,
    TELUGU: 1098,
    THAI_THAILAND: 1054,
    TURKISH: 1055,
    TAJIK_CYRILLIC: 1064,
    TURKMEN: 1090,
    UKRAINIAN: 1058,
    URDU: 1056,
    UZBEK_CYRILIC: 2115,
    UZBEK_LATIN: 1091,
    VIETNAMESE: 1066,
    getTranslation: function (value) {
        switch (value) {
            case 0:
                return "Latin";
            case 1025:
                return "Arabic (Saudi Arabia)";
            case 1026:
                return "Bulgarian";
            case 1027:
                return "Catalan";
            case 1028:
                return "Chinese (Taiwan)";
            case 1029:
                return "Czech";
            case 1030:
                return "Danish";
            case 1031:
                return "German (Germany)";
            case 1032:
                return "Greek";
            case 1033:
                return "English (United States)";
            case 1034:
                return "Spanish (Traditional Sort)";
            case 1035:
                return "Finnish";
            case 1036:
                return "French (France)";
            case 1037:
                return "Hebrew";
            case 1038:
                return "Hungarian";
            case 1039:
                return "Icelandic";
            case 1040:
                return "Italian (Italy)";
            case 1041:
                return "Japanese";
            case 1042:
                return "Korean";
            case 1043:
                return "Dutch (Netherlands)";
            case 1044:
                return "Norwegian (Bokmal)";
            case 1045:
                return "Polish";
            case 1046:
                return "Portuguese (Brazil)";
            case 1047:
                return "Rhaeto-Romanic";
            case 1048:
                return "Romanian";
            case 1049:
                return "Russian";
            case 1050:
                return "Croatian";
            case 1051:
                return "Slovak";
            case 1052:
                return "Albanian";
            case 1053:
                return "Swedish";
            case 1054:
                return "Thai (Thailand)";
            case 1055:
                return "Turkish";
            case 1056:
                return "Urdu";
            case 1057:
                return "Indonesian";
            case 1058:
                return "Ukrainian";
            case 1059:
                return "Belarusian";
            case 1060:
                return "Slovenian";
            case 1061:
                return "Estonian";
            case 1062:
                return "Latvian";
            case 1063:
                return "Lithuanian";
            case 1064:
                return "Tajik (Cyrillic)";
            case 1065:
                return "Farsi";
            case 1066:
                return "Vietnamese";
            case 1067:
                return "Armenian";
            case 1068:
                return "Azeri (Latin)";
            case 1069:
                return "Basque";
            case 1071:
                return "FYRO Macedonian";
            case 1078:
                return "Afrikaans";
            case 1079:
                return "Georgian";
            case 1080:
                return "Faeroese";
            case 1081:
                return "Hindi (India)";
            case 1086:
                return "Malay (Malaysia)";
            case 1087:
                return "Kazakh";
            case 1088:
                return "Kyrgyz (Cyrillic)";
            case 1089:
                return "Swahili";
            case 1090:
                return "Turkmen";
            case 1091:
                return "Uzbek (Latin)";
            case 1092:
                return "Tatar";
            case 1094:
                return "Punjabi";
            case 1095:
                return "Gujarati";
            case 1097:
                return "Tamil";
            case 1098:
                return "Telugu";
            case 1099:
                return "Kannada";
            case 1102:
                return "Marathi";
            case 1103:
                return "Sanskrit";
            case 1104:
                return "Mongolian (Cyrillic)";
            case 1110:
                return "Galician";
            case 1111:
                return "Konkani";
            case 1114:
                return "Syriac";
            case 1125:
                return "Divehi";
            case 2049:
                return "Arabic (Iraq)";
            case 2052:
                return "Chinese";
            case 2055:
                return "German (Switzerland)";
            case 2057:
                return "English (United Kingdom)";
            case 2058:
                return "Spanish (Mexico)";
            case 2060:
                return "French (Belgium)";
            case 2064:
                return "Italian (Switzerland)";
            case 2067:
                return "Dutch (Belgium)";
            case 2068:
                return "Norwegian (Nynorsk)";
            case 2070:
                return "Portuguese (Portugal)";
            case 2074:
                return "Serbian (Latin)";
            case 2077:
                return "Swedish (Finland)";
            case 2092:
                return "Azeri (Cyrillic)";
            case 2110:
                return "Malay (Brunei Darussalam)";
            case 2115:
                return "Uzbek (Cyrillic)";
            case 3073:
                return "Arabic (Egypt)";
            case 3076:
                return "Chinese (HongKong S.A.R.)";
            case 3079:
                return "German (Austria)";
            case 3081:
                return "English (Australia)";
            case 3082:
                return "Spanish (International Sort)";
            case 3084:
                return "French (Canada)";
            case 3098:
                return "Serbian (Cyrillic)";
            case 4097:
                return "Arabic (Libya)";
            case 4100:
                return "Chinese (Singapore)";
            case 4103:
                return "German (Luxembourg)";
            case 4105:
                return "English (Canada)";
            case 4106:
                return "Spanish (Guatemala)";
            case 4108:
                return "French (Switzerland)";
            case 5121:
                return "Arabic (Algeria)";
            case 5124:
                return "Chinese (Macao S.A.R.)";
            case 5127:
                return "German (Liechtenstein)";
            case 5129:
                return "English (New Zealand)";
            case 5130:
                return "Spanish (Costa Rica)";
            case 5132:
                return "French (Luxembourg)";
            case 6145:
                return "Arabic (Morocco)";
            case 6153:
                return "English (Ireland)";
            case 6154:
                return "Spanish (Panama)";
            case 6156:
                return "French (Monaco)";
            case 7169:
                return "Arabic (Tunisia)";
            case 7177:
                return "English (South Africa)";
            case 7178:
                return "Spanish (Dominican Republic)";
            case 8193:
                return "Arabic (Oman)";
            case 8201:
                return "English (Jamaica)";
            case 8202:
                return "Spanish (Venezuela)";
            case 9217:
                return "Arabic (Yemen)";
            case 9225:
                return "English (Caribbean)";
            case 9226:
                return "Spanish (Colombia)";
            case 10241:
                return "Arabic (Syria)";
            case 10249:
                return "English (Belize)";
            case 10250:
                return "Spanish (Peru)";
            case 11265:
                return "Arabic (Jordan)";
            case 11273:
                return "English (Trinidad)";
            case 11274:
                return "Spanish (Argentina)";
            case 12289:
                return "Arabic (Lebanon)";
            case 12297:
                return "English (Zimbabwe)";
            case 12298:
                return "Spanish (Ecuador)";
            case 13313:
                return "Arabic (Kuwait)";
            case 13321:
                return "English (Philippines)";
            case 13322:
                return "Spanish (Chile)";
            case 14337:
                return "Arabic (U.A.E.)";
            case 14346:
                return "Spanish (Uruguay)";
            case 15361:
                return "Arabic (Bahrain)";
            case 15370:
                return "Spanish (Paraguay)";
            case 16385:
                return "Arabic (Qatar)";
            case 16394:
                return "Spanish (Bolivia)";
            case 17418:
                return "Spanish (El Salvador)";
            case 18442:
                return "Spanish (Honduras)";
            case 19466:
                return "Spanish (Nicaragua)";
            case 20490:
                return "Spanish (Puerto Rico)";
            default:
                return "";
        }
    }
};

const PDF417Info = {
    errorLevel : null,
    columns : null,
    rows : null,
};

const RGLMeasureSystem = {
    METRIC: 0,
    IMPERIAL: 1,
}

const Enum = {
    AVCaptureSession: AVCaptureSession,
    AVCaptureDevicePosition: AVCaptureDevicePosition,
    FontStyle: FontStyle,
    BarcodeResult: BarcodeResult,
    BarcodeType: BarcodeType,
    diDocType: diDocType,
    CameraTypes: CameraTypes,
    DocReaderAction: DocReaderAction,
    DocReaderFrame: DocReaderFrame,
    DocReaderOrientationAndroid: DocReaderOrientationAndroid,
    DocReaderOrientationIOS: DocReaderOrientationIOS,
    eCheckResult: eCheckResult,
    eGraphicFieldType: eGraphicFieldType,
    eImageQualityCheckType: eImageQualityCheckType,
    eProcessGLCommands: eProcessGLCommands,
    eRequestCommand: eRequestCommand,
    eRFID_AccessControl_ProcedureType: eRFID_AccessControl_ProcedureType,
    eRFID_AuthenticationProcedureType: eRFID_AuthenticationProcedureType,
    eRFID_BaudRate: eRFID_BaudRate,
    eRFID_CertificateType: eRFID_CertificateType,
    eRFID_DataFile_Type: eRFID_DataFile_Type,
    eRFID_NotificationAndErrorCodes: eRFID_NotificationAndErrorCodes,
    eRFID_Password_Type: eRFID_Password_Type,
    eRFID_ResultType: eRFID_ResultType,
    eRFID_SDK_ProfilerType: eRFID_SDK_ProfilerType,
    eRFID_TerminalType: eRFID_TerminalType,
    eRPRM_Authenticity: eRPRM_Authenticity,
    eRPRM_FieldVerificationResult: eRPRM_FieldVerificationResult,
    eRPRM_Lights: eRPRM_Lights,
    eRPRM_ResultType: eRPRM_ResultType,
    eRPRM_ResultType_Internal: eRPRM_ResultType_Internal,
    eRPRM_SecurityFeatureType: eRPRM_SecurityFeatureType,
    eSignManagementAction: eSignManagementAction,
    eVisualFieldType: eVisualFieldType,
    FrameShapeType: FrameShapeType,
    LCID: LCID,
    PDF417Info: PDF417Info,
    RGLMeasureSystem: RGLMeasureSystem,
};


var documentReader = {};

documentReader.getAPIVersion = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getAPIVersion");
}

documentReader.getAvailableScenarios = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getAvailableScenarios");
}

documentReader.getCanRFID = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getCanRFID");
}

documentReader.getCoreMode = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getCoreMode");
}

documentReader.getCoreVersion = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getCoreVersion");
}

documentReader.getDatabaseDate = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseDate");
}

documentReader.getDatabaseID = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseID");
}

documentReader.getDatabaseVersion = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseVersion");
}

documentReader.getDocumentReaderIsReady = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDocumentReaderIsReady");
}

documentReader.getDocumentReaderStatus = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDocumentReaderStatus");
}

documentReader.getDatabaseCountriesNumber = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseCountriesNumber");
}

documentReader.getDatabaseDocumentsNumber = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseDocumentsNumber");
}

documentReader.selectedScenario = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "selectedScenario");
}

documentReader.getSessionLogFolder = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getSessionLogFolder");
}

documentReader.getDatabaseDescription = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getDatabaseDescription");
}

documentReader.initializeReader = function (license, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "initializeReader", [license]);
}

documentReader.prepareDatabase = function (databaseID, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "prepareDatabase", [databaseID]);
}

documentReader.recognizeImage = function (byteString, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeImage", [byteString]);
}

documentReader.recognizeImageFrame = function (byteString, args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeImageFrame", [byteString, args]);
}

documentReader.recognizeImageWithOpts = function (byteString, args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeImageWithOpts", [args, byteString]);
}

documentReader.recognizeVideoFrame = function (byteString, args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeVideoFrame", [byteString, args]);
}

documentReader.runAutoUpdate = function (databaseID, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "runAutoUpdate", [databaseID]);
}

documentReader.setConfig = function (args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "setConfig", [args]);
}

documentReader.setRfidScenario = function (args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "setRfidScenario", [args]);
}

documentReader.showDialog = function (msg, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "showDialog", [mgs]);
}

documentReader.showScanner = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "showScanner");
}

documentReader.showScannerWithCameraID = function (cameraID, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "showScannerWithCameraID", [cameraID]);
}

documentReader.showScannerWithCameraIDAndOpts = function (cameraID, args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "showScannerWithCameraIDAndOpts", [cameraID, args]);
}

documentReader.startNewPage = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "startNewPage");
}

documentReader.startNewSession = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "startNewSession");
}

documentReader.startRFIDReader = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "startRFIDReader");
}

documentReader.stopRFIDReader = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "stopRFIDReader");
}

documentReader.stopScanner = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "stopScanner");
}

documentReader.permissionRead = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "permissionRead");
}

documentReader.deinitializeReader = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "deinitializeReader");
}

documentReader.getCanUseAuthenticator = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getCanUseAuthenticator");
}

documentReader.getConfig = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getConfig");
}

documentReader.getRfidScenario = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getRfidScenario");
}

documentReader.getLicenseExpiryDate = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getLicenseExpiryDate");
}

documentReader.getLicenseCountryFilter = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getLicenseCountryFilter");
}

documentReader.getLicenseMessage = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getLicenseMessage");
}

documentReader.getLicenseMessage = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getLicenseMessage");
}

documentReader.licenseIsShowLogo = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseIsShowLogo");
}

documentReader.licenseIsStatus = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseIsStatus");
}

documentReader.licenseInfoIsAuthenticity = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsAuthenticity");
}

documentReader.licenseInfoIsBarcode = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsBarcode");
}

documentReader.licenseInfoIsDoctype = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsDoctype");
}

documentReader.licenseInfoIsImageQA = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsImageQA");
}

documentReader.licenseInfoIsLocate = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsLocate");
}

documentReader.licenseInfoIsMrz = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsMrz");
}

documentReader.licenseInfoIsOcr = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "licenseInfoIsOcr");
}

documentReader.recognizeImageWithImageInputParams = function (byteString, args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeImageWithImageInputParams", [byteString, args]);
}

documentReader.recognizeImageWithCameraMode = function (byteString, cameraMode, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "recognizeImageWithCameraMode", [byteString, cameraMode]);
}

documentReader.getCameraSessionIsPaused = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getAPIVersion");
}

documentReader.setCameraSessionIsPaused = function (input, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DocumentReader", "getAPIVersion", [input]);
}



documentReader.DocumentReaderResults = DocumentReaderResults;

documentReader.Enum = Enum;

documentReader.Scenario = Scenario;

module.exports = documentReader;