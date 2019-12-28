package cordova.plugin.documentreader;

import android.graphics.Rect;
import android.graphics.Bitmap;
import android.util.Base64;

import com.regula.documentreader.api.results.DocumentReaderDocumentType;
import com.regula.documentreader.api.results.DocumentReaderGraphicField;
import com.regula.documentreader.api.results.DocumentReaderGraphicResult;
import com.regula.documentreader.api.results.DocumentReaderJsonResult;
import com.regula.documentreader.api.results.DocumentReaderJsonResultGroup;
import com.regula.documentreader.api.results.DocumentReaderNotification;
import com.regula.documentreader.api.results.DocumentReaderResults;
import com.regula.documentreader.api.results.DocumentReaderTextField;
import com.regula.documentreader.api.results.DocumentReaderTextResult;
import com.regula.documentreader.api.results.DocumentReaderValue;
import com.regula.documentreader.api.results.FieldRect;
import com.regula.documentreader.api.results.ImageQuality;
import com.regula.documentreader.api.results.ImageQualityGroup;
import com.regula.documentreader.api.results.authenticity.DocumentReaderAuthenticityResult;
import com.regula.documentreader.api.results.authenticity.DocumentReaderAuthenticityCheck;
import com.regula.documentreader.api.results.authenticity.DocumentReaderAuthenticityElement;
import com.regula.documentreader.api.results.DocumentReaderBarcodeResult;
import com.regula.documentreader.api.results.DocumentReaderBarcodeField;
import com.regula.documentreader.api.results.DocumentReaderScenario;
import com.regula.documentreader.api.results.rfid.AccessControlProcedureType;
import com.regula.documentreader.api.results.rfid.Application;
import com.regula.documentreader.api.results.rfid.Attribute;
import com.regula.documentreader.api.results.rfid.Authority;
import com.regula.documentreader.api.results.rfid.CardProperties;
import com.regula.documentreader.api.results.rfid.CertificateChain;
import com.regula.documentreader.api.results.rfid.CertificateData;
import com.regula.documentreader.api.results.rfid.Extension;
import com.regula.documentreader.api.results.rfid.File;
import com.regula.documentreader.api.results.rfid.FileData;
import com.regula.documentreader.api.results.rfid.RFIDSessionData;
import com.regula.documentreader.api.results.rfid.SecurityObject;
import com.regula.documentreader.api.results.rfid.SecurityObjectCertificates;
import com.regula.documentreader.api.results.rfid.SignerInfo;
import com.regula.documentreader.api.results.rfid.Validity;
import com.regula.documentreader.api.results.rfid.Value;
import com.regula.documentreader.api.enums.PDF417Info;
import com.regula.documentreader.api.enums.LCID;
import com.regula.documentreader.api.enums.eRPRM_Lights;
import com.regula.documentreader.api.enums.eGraphicFieldType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class JSONConstructor {

    static JSONObject resultsToJsonObject(DocumentReaderResults results) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("chipPage", results.chipPage);
            jsonObject.put("highResolution", results.highResolution);
            jsonObject.put("morePagesAvailable", results.morePagesAvailable);
            jsonObject.put("overallResult", results.overallResult);
            jsonObject.put("processingFinished", results.processingFinished);
            jsonObject.put("rfidResult", results.rfidResult);
            if (results.barcodePosition != null)
                jsonObject.put("barcodePosition", results.barcodePosition.toJson());
            if (results.documentPosition != null)
                jsonObject.put("documentPosition", results.documentPosition.toJson());
            if (results.documentReaderNotification != null)
                jsonObject.put("documentReaderNotification",
                        generateDocumentReaderNotification(results.documentReaderNotification));
            if (results.documentType != null)
                jsonObject.put("documentType", generatArrayListDocumentReaderDocumentType(results.documentType));
            if (results.graphicResult != null)
                jsonObject.put("graphicResult", generateDocumentReaderGraphicResult(results.graphicResult));
            if (results.imageQuality != null)
                jsonObject.put("imageQuality", generateImageQualityGroup(results.imageQuality));
            if (results.jsonResult != null)
                jsonObject.put("jsonResult", generateDocumentReaderJsonResult(results.jsonResult));
            if (results.mrzPosition != null)
                jsonObject.put("mrzPosition", results.mrzPosition.toJson());
            if (results.rfidSessionData != null)
                jsonObject.put("rfidSessionData", generateRfidSessionData(results.rfidSessionData));
            if (results.textResult != null)
                jsonObject.put("textResult", generateDocumentReaderTextResult(results.textResult));
            if (results.authenticityResult != null)
                jsonObject.put("authenticityResult",
                        generateDocumentReaderAuthenticityResult(results.authenticityResult));
            if (results.barcodeResult != null)
                jsonObject.put("barcodeResult", generateDocumentReaderBarcodeResult(results.barcodeResult));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    static JSONObject generateDocumentReaderScenario(DocumentReaderScenario documentReaderScenario) {
        JSONObject result = new JSONObject();
        try{
        result.put("name", documentReaderScenario.name);
        result.put("caption", documentReaderScenario.caption);
        result.put("description", documentReaderScenario.description);
        result.put("uvTorch", documentReaderScenario.uvTorch);
    }catch(Exception ignored){}

        return result;
    }

    static private JSONObject generateDocumentReaderNotification(DocumentReaderNotification documentReaderNotification)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("code", documentReaderNotification.code);
        result.put("value", documentReaderNotification.value);

        return result;
    }

    static private JSONArray generatArrayListDocumentReaderDocumentType(ArrayList<DocumentReaderDocumentType> arrayList)
            throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderDocumentType documentReaderDocumentType : arrayList) {
            if (documentReaderDocumentType != null)
                result.put(index, generateDocumentReaderDocumentType(documentReaderDocumentType));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderDocumentType(DocumentReaderDocumentType documentReaderDocumentType)
            throws JSONException {
        JSONObject documentType = new JSONObject();
        documentType.put("dFormat", documentReaderDocumentType.dFormat);
        documentType.put("dMRZ", documentReaderDocumentType.dMRZ);
        documentType.put("documentID", documentReaderDocumentType.documentID);
        documentType.put("dType", documentReaderDocumentType.dType);
        documentType.put("dCountryName", documentReaderDocumentType.dCountryName);
        documentType.put("dDescription", documentReaderDocumentType.dDescription);
        documentType.put("dYear", documentReaderDocumentType.dYear);
        if (documentReaderDocumentType.FDSID != null)
            documentType.put("FDSID", generateIntArray(documentReaderDocumentType.FDSID));
        documentType.put("ICAOCode", documentReaderDocumentType.ICAOCode);
        documentType.put("name", documentReaderDocumentType.name);
        documentType.put("pageIndex", documentReaderDocumentType.pageIndex);

        return documentType;
    }

    static private JSONObject generateDocumentReaderGraphicResult(
            DocumentReaderGraphicResult documentReaderGraphicResult) throws JSONException {
        JSONObject result = new JSONObject();
        if(documentReaderGraphicResult.fields != null)
            result.put("fields", generateArrayListDocumentReaderGraphicField(documentReaderGraphicResult.fields));

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderGraphicField(
            ArrayList<DocumentReaderGraphicField> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderGraphicField documentReaderGraphicField : arrayList) {
            if (documentReaderGraphicField != null)
                result.put(index, generateDocumentReaderGraphicField(documentReaderGraphicField));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderGraphicField(DocumentReaderGraphicField documentReaderGraphicField)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("sourceType", documentReaderGraphicField.sourceType);
        result.put("fieldType", documentReaderGraphicField.fieldType);
        result.put("fieldName", eGraphicFieldType.getTranslation(DocumentReader.getContext(), documentReaderGraphicField.fieldType));
        result.put("lightType", documentReaderGraphicField.light);
        result.put("lightName", eRPRM_Lights.getTranslation(DocumentReader.getContext(), documentReaderGraphicField.light));
        if(documentReaderGraphicField.fieldRect != null)
            result.put("fieldRect", generateFieldRect(documentReaderGraphicField.fieldRect));
        result.put("pageIndex", documentReaderGraphicField.pageIndex);
        if(documentReaderGraphicField.value() != null)
            result.put("value", bitmapToBase64String(documentReaderGraphicField.value()));

        return result;
    }

    static private String bitmapToBase64String(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        String result = Base64.encodeToString(byteArray, Base64.DEFAULT);

        return result;
    }

    static private JSONObject generateFieldRect(FieldRect fieldRect) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("bottom", fieldRect.bottom);
        result.put("top", fieldRect.top);
        result.put("left", fieldRect.left);
        result.put("right", fieldRect.right);
        return result;
    }

    static private JSONArray generateIntArray(int[] array) throws JSONException {
        JSONArray jarray = new JSONArray();
        int index = 0;
        for (int item : array) {
            jarray.put(index, item);
            index++;
        }

        return jarray;
    }

    static private JSONObject generateImageQualityGroup(ImageQualityGroup imageQualityGroup) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("result", imageQualityGroup.result);
        result.put("count", imageQualityGroup.count);
        if (imageQualityGroup.imageQualityList != null)
            result.put("imageQualityList", generateArrayListImageQuality(imageQualityGroup.imageQualityList));

        return result;
    }

    static private JSONArray generateArrayListImageQuality(ArrayList<ImageQuality> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (ImageQuality imageQuality : arrayList) {
            if (imageQuality != null)
                result.put(index, generateImageQuality(imageQuality));
            index++;
        }

        return result;
    }

    static private JSONObject generateImageQuality(ImageQuality imageQuality) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("result", imageQuality.result);
        result.put("type", imageQuality.type);
        result.put("featureType", imageQuality.featureType);

        return result;
    }

    static private JSONObject generateDocumentReaderJsonResult(DocumentReaderJsonResult documentReaderJsonResult)
            throws JSONException {
        JSONObject result = new JSONObject();
        if(documentReaderJsonResult.results != null)
            result.put("results", generateListDocumentReaderJsonResultGroup(documentReaderJsonResult.results));

        return result;
    }

    static private JSONArray generateListDocumentReaderJsonResultGroup(List<DocumentReaderJsonResultGroup> list)
            throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderJsonResultGroup documentReaderJsonResultGroup : list) {
            if (documentReaderJsonResultGroup != null)
                result.put(index, generateDocumentReaderJsonResultGroup(documentReaderJsonResultGroup));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderJsonResultGroup(
            DocumentReaderJsonResultGroup documentReaderJsonResultGroup) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("lightType", documentReaderJsonResultGroup.lightType);
        result.put("pageIdx", documentReaderJsonResultGroup.pageIdx);
        result.put("resultType", documentReaderJsonResultGroup.resultType);
        if (documentReaderJsonResultGroup.jsonResult != null)
            result.put("jsonResult",
                    generateDocumentReaderJsonResultGroupJsonResult(documentReaderJsonResultGroup.jsonResult));

        return result;
    }

    static private JSONObject generateDocumentReaderJsonResultGroupJsonResult(String jsonResult) throws JSONException {
        return new JSONObject(jsonResult);
    }

    static private JSONObject generateRfidSessionData(RFIDSessionData rfidSessionData) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("totalBytesSent", rfidSessionData.totalBytesSent);
        result.put("totalBytesReceived", rfidSessionData.totalBytesReceived);
        result.put("status", rfidSessionData.status);
        result.put("processTime", rfidSessionData.processTime);
        result.put("extLeSupport", rfidSessionData.extLeSupport);
        if (rfidSessionData.accessControls != null)
            result.put("accessControls", generateArrayListAccessControlProcedureType(rfidSessionData.accessControls));
        if (rfidSessionData.applications != null)
            result.put("applications", generateArrayListApplication(rfidSessionData.applications));
        if (rfidSessionData.cardProperties != null)
            result.put("cardProperties", generateCardProperties(rfidSessionData.cardProperties));
        if (rfidSessionData.securityObjects != null)
            result.put("securityObjects", generateArrayListSecurityObject(rfidSessionData.securityObjects));

        return result;
    }

    static private JSONArray generateArrayListAccessControlProcedureType(
            ArrayList<AccessControlProcedureType> arrayList) throws JSONException {
        JSONArray accessControls = new JSONArray();
        int index = 0;
        for (AccessControlProcedureType type : arrayList) {
            if(type != null)
                accessControls.put(index, generateAccessControlProcedureType(type));
            index++;
        }

        return accessControls;
    }

    static private JSONObject generateAccessControlProcedureType(AccessControlProcedureType type) throws JSONException {
        JSONObject accessControl = new JSONObject();
        accessControl.put("activeOptionIdx", type.activeOptionIdx);
        accessControl.put("status", type.status);
        accessControl.put("type", type.type);
        if (type.notifications != null)
            accessControl.put("notifications", generateListLong(type.notifications));

        return accessControl;
    }

    static private JSONArray generateListLong(List<Long> list) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (long l : list) {
            result.put(index, l);
            index++;
        }

        return result;
    }

    static private JSONArray generateArrayListLong(ArrayList<Long> list) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (long l : list) {
            result.put(index, l);
            index++;
        }

        return result;
    }

    static private JSONArray generateArrayListApplication(ArrayList<Application> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (Application application : arrayList) {
            if(application != null)
                result.put(index, generateApplication(application));
            index++;
        }

        return result;
    }

    static private JSONObject generateApplication(Application application) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("status", application.status);
        result.put("type", application.type);
        result.put("applicationID", application.applicationID);
        result.put("dataHashAlgorithm", application.dataHashAlgorithm);
        result.put("unicodeVersion", application.unicodeVersion);
        result.put("version", application.version);
        if(application.files != null)
            result.put("files", generateArrayListFile(application.files));

        return result;
    }

    static private JSONArray generateArrayListFile(ArrayList<File> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (File file : arrayList) {
            if(file != null)
                result.put(index, generateFile(file));
            index++;
        }

        return result;
    }

    static private JSONArray generateArrayListInteger(ArrayList<Integer> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (Integer integer : arrayList) {
            if(integer != null)
                result.put(index, integer.intValue());
            index++;
        }

        return result;
    }

    static private JSONObject generateFile(File file) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("fileID", file.fileID);
        result.put("pAStatus", file.pAStatus);
        result.put("readingStatus", file.readingStatus);
        result.put("readingTime", file.readingTime);
        result.put("type", file.type);
        if (file.docFieldsText != null)
            result.put("docFieldsText", generateArrayListInteger(file.docFieldsText));
        if (file.notifications != null)
            result.put("notifications", generateArrayListLong(file.notifications));
        if (file.certificates != null)
            result.put("certificates", generateSecurityObjectCertificates(file.certificates));
        if (file.fileData != null)
            result.put("fileData", generateFileData(file.fileData));
        if (file.docFieldsGraphics != null)
            result.put("docFieldsGraphics", generateArrayListInteger(file.docFieldsGraphics));
        if (file.docFieldsOriginals != null)
            result.put("docFieldsOriginals", generateArrayListInteger(file.docFieldsOriginals));

        return result;
    }

    static private JSONObject generateSecurityObjectCertificates(SecurityObjectCertificates securityObjectCertificates)
            throws JSONException {
        JSONObject result = new JSONObject();
        if(securityObjectCertificates.securityObject != null)
            result.put("securityObject", generateCertificateData(securityObjectCertificates.securityObject));
        return result;
    }

    static private JSONObject generateCertificateData(CertificateData certificateData) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("length", certificateData.length);
        result.put("data", certificateData.data);

        return result;
    }

    static private JSONObject generateFileData(FileData fileData) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("length", fileData.length);
        result.put("status", fileData.status);
        result.put("type", fileData.type);
        result.put("data", fileData.data);

        return result;
    }

    static private JSONObject generateCardProperties(CardProperties cardProperties) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("aTQA", cardProperties.aTQA);
        result.put("bitRateR", cardProperties.bitRateR);
        result.put("bitRateS", cardProperties.bitRateS);
        result.put("chipTypeA", cardProperties.chipTypeA);
        result.put("mifareMemory", cardProperties.mifareMemory);
        result.put("rfidType", cardProperties.rfidType);
        result.put("sAK", cardProperties.sAK);
        result.put("support4", cardProperties.support4);
        result.put("supportMifare", cardProperties.supportMifare);
        result.put("aTQB", cardProperties.aTQB);
        result.put("aTR", cardProperties.aTR);
        result.put("baudrate1", cardProperties.baudrate1);
        result.put("baudrate2", cardProperties.baudrate2);
        result.put("uID", cardProperties.uID);

        return result;
    }

    static private JSONArray generateArrayListSecurityObject(ArrayList<SecurityObject> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (SecurityObject securityObject : arrayList) {
            if (securityObject != null)
                result.put(index, generateSecurityObject(securityObject));
            index++;
        }

        return result;
    }

    static private JSONObject generateSecurityObject(SecurityObject securityObject) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("objectType", securityObject.objectType);
        result.put("fileReference", securityObject.fileReference);
        result.put("version", securityObject.version);
        if (securityObject.notifications != null)
            result.put("notifications", generateArrayListLong(securityObject.notifications));
        if (securityObject.signerInfos != null)
            result.put("signerInfos", generateArrayListSignerInfo(securityObject.signerInfos));

        return result;
    }

    static private JSONArray generateArrayListSignerInfo(ArrayList<SignerInfo> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (SignerInfo signerInfo : arrayList) {
            if (signerInfo != null)
                result.put(index, generateSignerInfo(signerInfo));
            index++;
        }

        return result;
    }

    static private JSONArray generateArrayListAttribute(ArrayList<Attribute> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (Attribute attribute : arrayList) {
            if (attribute != null)
                result.put(index, generateAttribute(attribute));
            index++;
        }

        return result;
    }

    static private JSONObject generateAttribute(Attribute attribute) throws JSONException {
        JSONObject result = new JSONObject();
        if(attribute.value != null)
            result.put("value", generateValue(attribute.value));
        result.put("type", attribute.type);

        return result;
    }

    static private JSONArray generateArrayListCertificateChain(ArrayList<CertificateChain> arrayList)
            throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (CertificateChain certificateChain : arrayList) {
            if (certificateChain != null)
                result.put(index, generateCertificateChain(certificateChain));
            index++;
        }

        return result;
    }

    static private JSONArray generateArrayListExtension(ArrayList<Extension> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (Extension extension : arrayList) {
            if (extension != null)
                result.put(index, generateExtension(extension));
            index++;
        }

        return result;
    }

    static private JSONObject generateExtension(Extension extension) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("data", extension.data);
        result.put("type", extension.type);

        return result;
    }

    static private JSONObject generateCertificateChain(CertificateChain certificateChain) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("origin", certificateChain.origin);
        result.put("paStatus", certificateChain.paStatus);
        result.put("type", certificateChain.type);
        result.put("version", certificateChain.version);
        result.put("serialNumber", certificateChain.serialNumber);
        result.put("signatureAlgorithm", certificateChain.signatureAlgorithm);
        result.put("subjectPKAlgorithm", certificateChain.subjectPKAlgorithm);
        if (certificateChain.fileName != null)
            result.put("fileName", generateValue(certificateChain.fileName));
        if (certificateChain.subject != null)
            result.put("subject", generateAuthority(certificateChain.subject));
        if (certificateChain.extensions != null)
            result.put("extensions", generateArrayListExtension(certificateChain.extensions));
        if (certificateChain.issuer != null)
            result.put("issuer", generateAuthority(certificateChain.issuer));
        if (certificateChain.notifications != null)
            result.put("notifications", generateArrayListLong(certificateChain.notifications));
        if (certificateChain.validity != null)
            result.put("validity", generateValidity(certificateChain.validity));

        return result;
    }

    static private JSONObject generateValue(Value value) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("data", value.data);
        result.put("length", value.length);
        result.put("status", value.status);
        result.put("type", value.type);
        result.put("format", value.format);

        return result;
    }

    static private JSONObject generateAuthority(Authority authority) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("data", authority.data);
        if (authority.friendlyName != null)
            result.put("friendlyName", generateValue(authority.friendlyName));
        if (authority.attributes != null)
            result.put("attributes", generateArrayListAttribute(authority.attributes));

        return result;
    }

    static private JSONObject generateValidity(Validity validity) throws JSONException {
        JSONObject result = new JSONObject();
        if (validity.notAfter != null)
            result.put("notAfter", generateValue(validity.notAfter));
        if (validity.notBefore != null)
            result.put("notBefore", generateValue(validity.notBefore));

        return result;
    }

    static private JSONObject generateSignerInfo(SignerInfo signerInfo) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("paStatus", signerInfo.paStatus);
        result.put("version", signerInfo.version);
        result.put("dataToHash", signerInfo.dataToHash);
        result.put("digestAlgorithm", signerInfo.digestAlgorithm);
        result.put("signatureAlgorithm", signerInfo.signatureAlgorithm);
        if (signerInfo.signature != null)
            result.put("signature", generateValue(signerInfo.signature));
        if (signerInfo.serialNumber != null)
            result.put("serialNumber", generateValue(signerInfo.serialNumber));
        if (signerInfo.subjectKeyIdentifier != null)
            result.put("subjectKeyIdentifier", generateValue(signerInfo.subjectKeyIdentifier));
        if (signerInfo.issuer != null)
            result.put("issuer", generateAuthority(signerInfo.issuer));
        if (signerInfo.certificateChain != null)
            result.put("certificateChain", generateArrayListCertificateChain(signerInfo.certificateChain));
        if (signerInfo.notifications != null)
            result.put("notifications", generateArrayListLong(signerInfo.notifications));
        if (signerInfo.signedAttributes != null)
            result.put("signedAttributes", generateArrayListExtension(signerInfo.signedAttributes));

        return result;
    }

    static private JSONObject generateDocumentReaderTextResult(DocumentReaderTextResult documentReaderTextResult)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("status", documentReaderTextResult.status);
        if (documentReaderTextResult.fields != null)
            result.put("fields", generateArrayListDocumentReaderTextField(documentReaderTextResult.fields));

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderTextField(ArrayList<DocumentReaderTextField> arrayList)
            throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderTextField documentReaderTextField : arrayList) {
            if (documentReaderTextField != null)
                result.put(index, generateDocumentReaderTextField(documentReaderTextField));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderTextField(DocumentReaderTextField documentReaderTextField)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("fieldType", documentReaderTextField.fieldType);
        result.put("lcid", documentReaderTextField.lcid);
        result.put("lcidName", LCID.getTranslation(DocumentReader.getContext(), documentReaderTextField.lcid));
        result.put("status", documentReaderTextField.status);
        result.put("fieldName", documentReaderTextField.fieldName);
        if (documentReaderTextField.value() != null)
            result.put("value", generateDocumentReaderValue(documentReaderTextField.value()));
        if (documentReaderTextField.values != null)
            result.put("values", generateArrayListDocumentReaderValue(documentReaderTextField.values));

        return result;
    }

    static private JSONObject generateDocumentReaderValue(DocumentReaderValue documentReaderValue)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("pageIndex", documentReaderValue.pageIndex);
        result.put("sourceType", documentReaderValue.sourceType);
        result.put("validity", documentReaderValue.validity);
        result.put("value", documentReaderValue.value);
        result.put("originalValue", documentReaderValue.originalValue);
        if (documentReaderValue.comparison != null)
            result.put("comparison", generateHashMapIntegerInteger(documentReaderValue.comparison));
        if (documentReaderValue.boundRect != null)
            result.put("boundRect", generateRect(documentReaderValue.boundRect));

        return result;
    }

    static private JSONObject generateRect(Rect rect) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("bottom", rect.bottom);
        result.put("left", rect.left);
        result.put("top", rect.top);
        result.put("right", rect.right);

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderValue(ArrayList<DocumentReaderValue> arrayList)
            throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderValue documentReaderValue : arrayList) {
            if (documentReaderValue != null)
                result.put(index, generateDocumentReaderValue(documentReaderValue));
            index++;
        }

        return result;
    }

    static private JSONArray generateHashMapIntegerInteger(HashMap<Integer, Integer> hashMap) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (Map.Entry<Integer, Integer> entry : hashMap.entrySet()) {
            if(entry != null)
                result.put(index, generatePairIntegerInteger(entry));
            index++;
        }
        return result;
    }

    static private JSONObject generatePairIntegerInteger(Map.Entry<Integer, Integer> entry) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("key", entry.getKey());
        result.put("value", entry.getValue());

        return result;
    }

    static private JSONObject generateDocumentReaderAuthenticityResult(
            DocumentReaderAuthenticityResult documentReaderAuthenticityResult) throws JSONException {
        JSONObject result = new JSONObject();
        if(documentReaderAuthenticityResult.checks != null)
            result.put("checks", generateArrayListDocumentReaderAuthenticityCheck(documentReaderAuthenticityResult.checks));

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderAuthenticityCheck(
            ArrayList<DocumentReaderAuthenticityCheck> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderAuthenticityCheck documentReaderAuthenticityCheck : arrayList) {
            if (documentReaderAuthenticityCheck != null)
                result.put(index, generateDocumentReaderAuthenticityCheck(documentReaderAuthenticityCheck));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderAuthenticityCheck(
            DocumentReaderAuthenticityCheck documentReaderAuthenticityCheck) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("type", documentReaderAuthenticityCheck.type);
        result.put("status", documentReaderAuthenticityCheck.status);
        result.put("pageIndex", documentReaderAuthenticityCheck.pageIndex);
        if(documentReaderAuthenticityCheck.elements != null)
            result.put("elements",
                    generateArrayListDocumentReaderAuthenticityElement(documentReaderAuthenticityCheck.elements));

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderAuthenticityElement(
            ArrayList<DocumentReaderAuthenticityElement> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderAuthenticityElement documentReaderAuthenticityElement : arrayList) {
            if (documentReaderAuthenticityElement != null)
                result.put(index, generateDocumentReaderAuthenticityElement(documentReaderAuthenticityElement));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderAuthenticityElement(
            DocumentReaderAuthenticityElement documentReaderAuthenticityElement) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("elementType", documentReaderAuthenticityElement.elementType);
        result.put("status", documentReaderAuthenticityElement.status);

        return result;
    }

    static private JSONObject generateDocumentReaderBarcodeResult(
            DocumentReaderBarcodeResult documentReaderBarcodeResult) throws JSONException {
        JSONObject result = new JSONObject();
        if(documentReaderBarcodeResult.fields != null)
            result.put("fields", generateArrayListDocumentReaderBarcodeField(documentReaderBarcodeResult.fields));

        return result;
    }

    static private JSONArray generateArrayListDocumentReaderBarcodeField(
            ArrayList<DocumentReaderBarcodeField> arrayList) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (DocumentReaderBarcodeField documentReaderBarcodeField : arrayList) {
            if (documentReaderBarcodeField != null)
                result.put(index, generateDocumentReaderBarcodeField(documentReaderBarcodeField));
            index++;
        }

        return result;
    }

    static private JSONObject generateDocumentReaderBarcodeField(DocumentReaderBarcodeField documentReaderBarcodeField)
            throws JSONException {
        JSONObject result = new JSONObject();
        result.put("barcodeType", documentReaderBarcodeField.barcodeType);
        result.put("status", documentReaderBarcodeField.status);
        result.put("pageIndex", documentReaderBarcodeField.pageIndex);
        if(documentReaderBarcodeField.pdf417Info != null)
            result.put("pdf417Info", generatePDF417Info(documentReaderBarcodeField.pdf417Info));
        if(documentReaderBarcodeField.data != null)
            result.put("data", generateByteArray(documentReaderBarcodeField.data));

        return result;
    }

    static private JSONObject generatePDF417Info(PDF417Info pdf417Info) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("errorLevel", pdf417Info.errorLevel);
        result.put("columns", pdf417Info.columns);
        result.put("rows", pdf417Info.rows);

        return result;
    }

    static private JSONArray generateByteArray(byte[] array) throws JSONException {
        JSONArray result = new JSONArray();
        int index = 0;
        for (byte element : array) {
            result.put(index, element);
            index++;
        }

        return result;
    }
}
