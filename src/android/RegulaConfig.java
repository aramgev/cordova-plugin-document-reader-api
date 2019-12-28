package cordova.plugin.documentreader;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import com.regula.documentreader.api.DocumentReader;
import com.regula.documentreader.api.ParamsCustomization;
import com.regula.documentreader.api.params.Functionality;
import com.regula.documentreader.api.params.ProcessParam;
import com.regula.documentreader.api.params.DataGroups;
import com.regula.documentreader.api.enums.BarcodeType;
import android.widget.ImageView.ScaleType;
import android.graphics.Typeface;
import android.graphics.Matrix;
import android.util.Log;

public class RegulaConfig {

  static String[] extractStringArray(JSONArray readableArray) throws JSONException {
    String[] result = new String[readableArray.length()];
    for (int i = 0; i < readableArray.length(); i++) {
      result[i] = readableArray.getString(i);
    }
    return result;
  }

  static int[] extractIntArray(JSONArray readableArray) throws JSONException {
    int[] result = new int[readableArray.length()];
    for (int i = 0; i < readableArray.length(); i++) {
      result[i] = readableArray.getInt(i);
    }
    return result;
  }

  static float[] extractFloatArray(JSONArray readableArray) throws JSONException {
    float[] result = new float[readableArray.length()];
    for (int i = 0; i < readableArray.length(); i++) {
      result[i] = (float) readableArray.getDouble(i);
    }
    return result;
  }

  public static void setConfig(DocumentReader reader, JSONObject opts) {
    try {
      if (opts.has("customization")) {
        setCustomization(reader.customization(), opts.getJSONObject("customization"));
      }
      if (opts.has("functionality")) {
        setFunctionality(reader.functionality(), opts.getJSONObject("functionality"));
      }
      if (opts.has("processParams")) {
        setProcessParams(reader.processParams(), opts.getJSONObject("processParams"));
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  public static JSONObject getConfig(DocumentReader reader) {
    JSONObject object = new JSONObject();
    try {
      object.put("customization", getCustomization(reader.customization()));
      object.put("functionality", getFunctionality(reader.functionality()));
      object.put("processParams", getProcessParams(reader.processParams()));
    } catch (JSONException e) {
    }

    return object;
  }

  public static void setFunctionality(Functionality functionality, JSONObject opts) throws JSONException {
    if (opts.has("pictureOnBoundsReady")) {
      functionality.setPictureOnBoundsReady(opts.getBoolean("pictureOnBoundsReady"));
    }
    if (opts.has("showTorchButton")) {
      functionality.setShowTorchButton(opts.getBoolean("showTorchButton"));
    }
    if (opts.has("showCloseButton")) {
      functionality.setShowCloseButton(opts.getBoolean("showCloseButton"));
    }
    if (opts.has("videoCaptureMotionControl")) {
      functionality.setVideoCaptureMotionControl(opts.getBoolean("videoCaptureMotionControl"));
    }
    if (opts.has("showCaptureButton")) {
      functionality.setShowCaptureButton(opts.getBoolean("showCaptureButton"));
    }
    if (opts.has("showChangeFrameButton")) {
      functionality.setShowChangeFrameButton(opts.getBoolean("showChangeFrameButton"));
    }
    if (opts.has("showCaptureButtonDelayFromDetect")) {
      functionality.setShowCaptureButtonDelayFromDetect(opts.getInt("showCaptureButtonDelayFromDetect"));
    }
    if (opts.has("showCaptureButtonDelayFromStart")) {
      functionality.setShowCaptureButtonDelayFromStart(opts.getInt("showCaptureButtonDelayFromStart"));
    }
    if (opts.has("isOnlineMode")) {
      functionality.setOnlineMode(opts.getBoolean("isOnlineMode"));
    }
    if (opts.has("databaseAutoupdate")) {
      functionality.setDatabaseAutoupdate(opts.getBoolean("databaseAutoupdate"));
    }
    if (opts.has("showSkipNextPageButton")) {
      functionality.setShowSkipNextPageButton(opts.getBoolean("showSkipNextPageButton"));
    }
    if (opts.has("useAuthenticator")) {
      functionality.setUseAuthenticator(opts.getBoolean("useAuthenticator"));
    }
    if (opts.has("skipFocusingFrames")) {
      functionality.setSkipFocusingFrames(opts.getBoolean("skipFocusingFrames"));
    }
    if (opts.has("showCameraSwitchButton")) {
      functionality.setShowCameraSwitchBtn(opts.getBoolean("showCameraSwitchButton"));
    }
    if (opts.has("cameraFrame")) {
      functionality.setCameraFrame(opts.getString("cameraFrame"));
    }
    if (opts.has("serviceURL")) {
      functionality.setServiceURL(opts.getString("serviceURL"));
    }
    if (opts.has("databaseIdentifier")) {
      functionality.setDatabaseIdentifier(opts.getString("databaseIdentifier"));
    }
    if (opts.has("btDeviceName")) {
      functionality.setBtDeviceName(opts.getString("btDeviceName"));
    }
    if (opts.has("orientation")) {
      functionality.setOrientation(opts.getInt("orientation"));
    }
  }
  
  public static void setProcessParams(ProcessParam processParams, JSONObject opts) throws JSONException {
    if (opts.has("multipageProcessing")) {
      processParams.multipageProcessing = opts.getBoolean("multipageProcessing");
    }
    if (opts.has("dateFormat")) {
      processParams.dateFormat = opts.getString("dateFormat");
    }
    if (opts.has("logs")) {
      processParams.setLogs(opts.getBoolean("logs"));
    }
    if (opts.has("debugSaveImages")) {
      processParams.debugSaveImages = opts.getBoolean("debugSaveImages");
    }
    if (opts.has("debugSaveLogs")) {
      processParams.debugSaveLogs = opts.getBoolean("debugSaveLogs");
    }
    if (opts.has("returnUncroppedImage")) {
      processParams.returnUncroppedImage = opts.getBoolean("returnUncroppedImage");
    }
    if (opts.has("customParams")) {
      processParams.customParams = opts.getJSONObject("customParams");
    }
    if (opts.has("uvTorchEnabled")) {
      processParams.uvTorchEnabled = opts.getBoolean("uvTorchEnabled");
    }
    if (opts.has("debugSaveCroppedImages")) {
      processParams.debugSaveCroppedImages = opts.getBoolean("debugSaveCroppedImages");
    }
    if (opts.has("scenario")) {
      processParams.scenario = opts.getString("scenario");
    }
    if (opts.has("measureSystem")) {
      processParams.measureSystem = opts.getInt("measureSystem");
    }
    if (opts.has("captureButtonScenario")) {
      processParams.captureButtonScenario = opts.getString("captureButtonScenario");
    }
    if (opts.has("barcodeTypes")) {
      JSONArray barcodes = opts.getJSONArray("barcodeTypes");
      if (barcodes != null && barcodes.length() > 0) {
        processParams.doBarcodes = new String[barcodes.length()];
        for (int i = 0; i < barcodes.length(); ++i) {
          processParams.doBarcodes[i] = BarcodeType.valueOf(barcodes.getInt(i));
        }
      }
    }
    if (opts.has("documentIDList")) {
      JSONArray documents = opts.getJSONArray("documentIDList");
      if (documents != null && documents.length() > 0) {
        processParams.documentIDList = new int[documents.length()];
        for (int i = 0; i < documents.length(); ++i) {
          processParams.documentIDList[i] = documents.getInt(i);
        }
      }
    }
    if (opts.has("fieldTypesFilter")) {
      JSONArray fieldsFilter = opts.getJSONArray("fieldTypesFilter");
      if (fieldsFilter != null && fieldsFilter.length() > 0) {
        processParams.fieldTypesFilter = new int[fieldsFilter.length()];
        for (int i = 0; i < fieldsFilter.length(); ++i) {
          processParams.fieldTypesFilter[i] = fieldsFilter.getInt(i);
        }
      }
    }
    if (opts.has("disableFocusingCheck")) {
      processParams.disableFocusingCheck=opts.getBoolean("disableFocusingCheck");
    }
  }

  public static void setCustomization(ParamsCustomization customization, JSONObject opts) throws JSONException {
    if (opts.has("status")) {
      customization.setStatus(opts.getString("status"));
    }
    if (opts.has("resultStatus")) {
      customization.setResultStatus(opts.getString("resultStatus"));
    }
    if (opts.has("cameraFrameDefaultColor")) {
      customization.setCameraFrameDefaultColor(opts.getString("cameraFrameDefaultColor"));
    }
    if (opts.has("cameraFrameActiveColor")) {
      customization.setCameraFrameActiveColor(opts.getString("cameraFrameActiveColor"));
    }
    if (opts.has("statusTextColor")) {
      customization.setStatusTextColor(opts.getString("statusTextColor"));
    }
    if (opts.has("resultStatusTextColor")) {
      customization.setResultStatusTextColor(opts.getString("resultStatusTextColor"));
    }
    if (opts.has("resultStatusBackgroundColor")) {
      customization.setResultStatusBackgroundColor(opts.getString("resultStatusBackgroundColor"));
    }
    if (opts.has("multipageButtonBackgroundColor")) {
      customization.setMultipageButtonBackgroundColor(opts.getString("multipageButtonBackgroundColor"));
    }
    if (opts.has("tintColor")) {
      customization.setTintColor(opts.getString("tintColor"));
    }
    if (opts.has("activityIndicatorColor")) {
      customization.setActivityIndicatorColor(opts.getString("activityIndicatorColor"));
    }
    if (opts.has("showStatusMessages")) {
      customization.setShowStatusMessages(opts.getBoolean("showStatusMessages"));
    }
    if (opts.has("showResultStatusMessages")) {
      customization.setShowResultStatusMessages(opts.getBoolean("showResultStatusMessages"));
    }
    if (opts.has("showHelpAnimation")) {
      customization.setShowHelpAnimation(opts.getBoolean("showHelpAnimation"));
    }
    if (opts.has("showNextPageAnimation")) {
      customization.setShowNextPageAnimation(opts.getBoolean("showNextPageAnimation"));
    }
    if (opts.has("showBackgroundMask")) {
      customization.setShowBackgroundMask(opts.getBoolean("showBackgroundMask"));
    }
    if (opts.has("cameraFrameBorderWidth")) {
      customization.setCameraFrameBorderWidth(opts.getInt("cameraFrameBorderWidth"));
    }
    if (opts.has("statusTextSize")) {
      customization.setStatusTextSize(opts.getInt("statusTextSize"));
    }
    if (opts.has("cameraFrameLineLength")) {
      customization.setCameraFrameLineLength(opts.getInt("cameraFrameLineLength"));
    }
    if (opts.has("cameraFrameShapeType")) {
      customization.setCameraFrameShapeType(opts.getInt("cameraFrameShapeType"));
    }
    if (opts.has("resultStatusTextSize")) {
      customization.setResultStatusTextSize(opts.getInt("resultStatusTextSize"));
    }
    if (opts.has("helpAnimationImageID")) {
      customization.setHelpAnimationImageID(opts.getInt("helpAnimationImageID"));
    }
    if (opts.has("multipageAnimationFrontImage")) {
      customization.setMultipageAnimationFrontImage(opts.getInt("multipageAnimationFrontImage"));
    }
    if (opts.has("multipageAnimationBackImage")) {
      customization.setMultipageAnimationBackImage(opts.getInt("multipageAnimationBackImage"));
    }
    if (opts.has("borderBackgroundImage")) {
      customization.setBorderBackgroundImage(opts.getInt("borderBackgroundImage"));
    }
    if (opts.has("statusPositionMultiplier")) {
      customization.setStatusPositionMultiplier(opts.getDouble("statusPositionMultiplier"));
    }
    if (opts.has("resultStatusPositionMultiplier")) {
      customization.setResultStatusPositionMultiplier(opts.getDouble("resultStatusPositionMultiplier"));
    }
    if (opts.has("backgroundMaskAlpha")) {
      customization.setBackgroundMaskAlpha((float) opts.getDouble("backgroundMaskAlpha"));
    }
    if (opts.has("statusTextFont")) {
      if (opts.has("statusTextFontStyle")) {
        customization.setStatusTextFont(Typeface.create(opts.getString("statusTextFont"), opts.getInt("statusTextFontStyle")));
      } else{
        customization.setStatusTextFont(Typeface.create(opts.getString("statusTextFont"), Typeface.NORMAL));
      }
    }
    if (opts.has("resultStatusTextFont")) {
      if (opts.has("resultStatusTextFontStyle")) {
        customization.setResultStatusTextFont(Typeface.create(opts.getString("resultStatusTextFont"), opts.getInt("resultStatusTextFontStyle")));
      } else {
        customization.setResultStatusTextFont(Typeface.create(opts.getString("resultStatusTextFont"), Typeface.NORMAL));
      }
    }
    if (opts.has("helpAnimationImageScaleType")) {
      customization.setHelpAnimationImageScaleType(ScaleType.valueOf(opts.getString("helpAnimationImageScaleType")));
    }
    if (opts.has("multipageAnimationFrontImageScaleType")) {
      customization.setMultipageAnimationFrontImageScaleType(
          ScaleType.valueOf(opts.getString("multipageAnimationFrontImageScaleType")));
    }
    if (opts.has("multipageAnimationBackImageScaleType")) {
      customization.setMultipageAnimationBackImageScaleType(
          ScaleType.valueOf(opts.getString("multipageAnimationBackImageScaleType")));
    }
    if (opts.has("helpAnimationImageMatrix")) {
      Matrix matrix = new Matrix();
      matrix.setValues(extractFloatArray(opts.getJSONArray("helpAnimationImageMatrix")));
      customization.setHelpAnimationImageMatrix(matrix);
    }
    if (opts.has("multipageAnimationFrontImageMatrix")) {
      Matrix matrix = new Matrix();
      matrix.setValues(extractFloatArray(opts.getJSONArray("multipageAnimationFrontImageMatrix")));
      customization.setMultipageAnimationFrontImageMatrix(matrix);
    }
    if (opts.has("multipageAnimationBackImageMatrix")) {
      Matrix matrix = new Matrix();
      matrix.setValues(extractFloatArray(opts.getJSONArray("multipageAnimationBackImageMatrix")));
      customization.setMultipageAnimationBackImageMatrix(matrix);
    }
  }

  public static JSONObject getFunctionality(Functionality functionality) {
    JSONObject object = new JSONObject();
    try {
      object.put("pictureOnBoundsReady", functionality.isPictureOnBoundsReady());
      object.put("showTorchButton", functionality.isShowTorchButton());
      object.put("showCloseButton", functionality.isShowCloseButton());
      object.put("videoCaptureMotionControl", functionality.isVideoCaptureMotionControl());
      object.put("showCaptureButton", functionality.isShowCaptureButton());
      object.put("showChangeFrameButton", functionality.isShowChangeFrameButton());
      object.put("showCaptureButtonDelayFromDetect", functionality.getShowCaptureButtonDelayFromDetect());
      object.put("showCaptureButtonDelayFromStart", functionality.getShowCaptureButtonDelayFromStart());
      object.put("isOnlineMode", functionality.isOnlineMode());
      object.put("databaseAutoupdate", functionality.isDatabaseAutoupdate());
      object.put("showSkipNextPageButton", functionality.isShowSkipNextPageButton());
      object.put("useAuthenticator", functionality.isUseAuthenticator());
      object.put("skipFocusingFrames", functionality.isSkipFocusingFrames());
      object.put("showCameraSwitchButton", functionality.isShowCameraSwitchBtn());
      object.put("cameraFrame", functionality.getCameraFrame());
      object.put("serviceURL", functionality.getServiceURL());
      object.put("databaseIdentifier", functionality.getDatabaseIdentifier());
      object.put("btDeviceName", functionality.getBtDeviceName());
      object.put("orientation", functionality.getOrientation());
    } catch (JSONException e) {
    }

    return object;
  }

  public static JSONObject getCustomization(ParamsCustomization customization) {
    JSONObject object = new JSONObject();
    try {
      object.put("status", customization.getStatus());
      object.put("resultStatus", customization.getResultStatus());
      object.put("cameraFrameDefaultColor", customization.getCameraFrameDefaultColor());
      object.put("cameraFrameActiveColor", customization.getCameraFrameActiveColor());
      object.put("statusTextColor", customization.getStatusTextColor());
      object.put("resultStatusTextColor", customization.getResultStatusTextColor());
      object.put("resultStatusBackgroundColor", customization.getResultStatusBackgroundColor());
      object.put("multipageButtonBackgroundColor", customization.getMultipageButtonBackgroundColor());
      object.put("tintColor", customization.getTintColor());
      object.put("activityIndicatorColor", customization.getActivityIndicatorColor());
      object.put("showStatusMessages", customization.isShowStatusMessages());
      object.put("showResultStatusMessages", customization.isShowResultStatusMessages());
      object.put("showHelpAnimation", customization.isShowHelpAnimation());
      object.put("showNextPageAnimation", customization.isShowNextPageAnimation());
      object.put("showBackgroundMask", customization.isShowBackgroundMask());
      object.put("cameraFrameBorderWidth", customization.getCameraFrameBorderWidth());
      object.put("statusTextSize", customization.getStatusTextSize());
      object.put("cameraFrameLineLength", customization.getCameraFrameLineLength());
      object.put("cameraFrameShapeType", customization.getCameraFrameShapeType());
      object.put("resultStatusTextSize", customization.getResultStatusTextSize());
      object.put("helpAnimationImageID", customization.getHelpAnimationImageID());
      object.put("multipageAnimationFrontImage", customization.getMultipageAnimationFrontImage());
      object.put("multipageAnimationBackImage", customization.getMultipageAnimationBackImage());
      object.put("borderBackgroundImage", customization.getBorderBackgroundImage());
      object.put("helpAnimationImageScaleType", customization.getHelpAnimationImageScaleType());
      object.put("multipageAnimationFrontImageScaleType", customization.getMultipageAnimationFrontImageScaleType());
      object.put("multipageAnimationBackImageScaleType", customization.getMultipageAnimationBackImageScaleType());
      object.put("helpAnimationImageMatrix", customization.getHelpAnimationImageMatrix());
      object.put("multipageAnimationFrontImageMatrix", customization.getMultipageAnimationFrontImageMatrix());
      object.put("multipageAnimationBackImageMatrix", customization.getMultipageAnimationBackImageMatrix());
      object.put("statusTextFont", customization.getStatusTextFont());
      object.put("resultStatusTextFont", customization.getResultStatusTextFont());
      object.put("statusPositionMultiplier", customization.getStatusPositionMultiplier());
      object.put("resultStatusPositionMultiplier", customization.getResultStatusPositionMultiplier());
      object.put("backgroundMaskAlpha", customization.getBackgroundMaskAlpha());
    } catch (JSONException e) {
    }

    return object;
  }

  public static JSONObject getProcessParams(ProcessParam processParams) {
    JSONObject object = new JSONObject();
    try {
      object.put("scenario", processParams.scenario);
      object.put("measureSystem", processParams.measureSystem);
      object.put("uvTorchEnabled", processParams.uvTorchEnabled);
      object.put("logs", processParams.logs);
      object.put("debugSaveImages", true);
      object.put("debugSaveLogs", processParams.debugSaveLogs);
      object.put("multipageProcessing", processParams.multipageProcessing);
      object.put("dateFormat", processParams.dateFormat);
      object.put("debugSaveCroppedImages", processParams.debugSaveCroppedImages);
      object.put("sessionLogFolder", processParams.sessionLogFolder);
      object.put("disableFocusingCheck", processParams.disableFocusingCheck);
      object.put("captureButtonScenario", processParams.captureButtonScenario);
      object.put("returnUncroppedImage", processParams.returnUncroppedImage);
      if (processParams.customParams != null) {
        object.put("customParams", processParams.customParams.toString());
      } else {
        object.put("customParams", new JSONArray());
      }

      JSONArray jdocumentIDList = new JSONArray();
      if (processParams.documentIDList != null && processParams.documentIDList.length > 0) {
        int index = 0;
        for (int item : processParams.documentIDList) {
          jdocumentIDList.put(index, item);
          index++;
        }
      }
      object.put("documentIDList", jdocumentIDList);

      JSONArray jdoBarcodes = new JSONArray();
      if (processParams.doBarcodes != null && processParams.doBarcodes.length > 0) {
        int index = 0;
        for (String item : processParams.doBarcodes) {
          jdoBarcodes.put(index, item);
          index++;
        }
      }
      object.put("barcodeTypes", jdoBarcodes);

      JSONArray jfieldTypesFilter = new JSONArray();
      if (processParams.fieldTypesFilter != null && processParams.fieldTypesFilter.length > 0) {
        int index = 0;
        for (int item : processParams.fieldTypesFilter) {
          jfieldTypesFilter.put(index, item);
          index++;
        }
      }
      object.put("fieldTypesFilter", jfieldTypesFilter);
    } catch (Exception e) {
    }

    return object;
  }

  public static void setRfidScenario(DocumentReader reader, JSONObject opts) {
    try {
      if (opts.has("paceStaticBinding"))
        reader.Instance().rfidScenario().setPaceStaticBinding(opts.getBoolean("PACE_StaticBinding"));
      if (opts.has("signManagementAction"))
        reader.Instance().rfidScenario().setSignManagementAction(opts.getInt("signManagementAction"));
      if (opts.has("readingBuffer"))
        reader.Instance().rfidScenario().setReadingBuffer(opts.getInt("readingBuffer"));
      if (opts.has("onlineTAToSignDataType"))
        reader.Instance().rfidScenario().setOnlineTAToSignDataType(opts.getInt("onlineTAToSignDataType"));
      if (opts.has("onlineTA"))
        reader.Instance().rfidScenario().setOnlineTA(opts.getBoolean("onlineTA"));
      if (opts.has("writeEid"))
        reader.Instance().rfidScenario().setWriteEid(opts.getBoolean("writeEid"));
      if (opts.has("profilerType"))
        reader.Instance().rfidScenario().setProfilerType(opts.getInt("profilerType"));
      if (opts.has("authProcType"))
        reader.Instance().rfidScenario().setAuthProcType(opts.getInt("authProcType"));
      if (opts.has("baseSMProcedure"))
        reader.Instance().rfidScenario().setBaseSMProcedure(opts.getInt("baseSMProcedure"));
      if (opts.has("pacePasswordType"))
        reader.Instance().rfidScenario().setPacePasswordType(opts.getInt("pacePasswordType"));
      if (opts.has("terminalType"))
        reader.Instance().rfidScenario().setTerminalType(opts.getInt("terminalType"));
      if (opts.has("universalAccessRights"))
        reader.Instance().rfidScenario().setUniversalAccessRights(opts.getBoolean("universalAccessRights"));
      if (opts.has("authorizedRestrictedIdentification"))
        reader.Instance().rfidScenario()
            .setAuthorizedRestrictedIdentification(opts.getBoolean("authorizedRestrictedIdentification"));
      if (opts.has("auxVerificationCommunityID"))
        reader.Instance().rfidScenario().setAuxVerificationCommunityID(opts.getBoolean("auxVerificationCommunityID"));
      if (opts.has("auxVerificationDateOfBirth"))
        reader.Instance().rfidScenario().setAuxVerificationDateOfBirth(opts.getBoolean("auxVerificationDateOfBirth"));
      if (opts.has("skipAA"))
        reader.Instance().rfidScenario().setSkipAA(opts.getBoolean("skipAA"));
      if (opts.has("strictProcessing"))
        reader.Instance().rfidScenario().setStrictProcessing(opts.getBoolean("strictProcessing"));
      if (opts.has("pkdDSCertPriority"))
        reader.Instance().rfidScenario().setPkdDSCertPriority(opts.getBoolean("pkdDSCertPriority"));
      if (opts.has("pkdUseExternalCSCA"))
        reader.Instance().rfidScenario().setPkdUseExternalCSCA(opts.getBoolean("pkdUseExternalCSCA"));
      if (opts.has("trustedPKD"))
        reader.Instance().rfidScenario().setTrustedPKD(opts.getBoolean("trustedPKD"));
      if (opts.has("passiveAuth"))
        reader.Instance().rfidScenario().setPassiveAuth(opts.getBoolean("passiveAuth"));
      if (opts.has("password"))
        reader.Instance().rfidScenario().setPassword(opts.getString("password"));
      if (opts.has("useSFI"))
        reader.Instance().rfidScenario().setUseSFI(opts.getBoolean("useSFI"));
      if (opts.has("pkdPA"))
        reader.Instance().rfidScenario().setPkdPA(opts.getString("pkdPA"));
      if (opts.has("pkdEAC"))
        reader.Instance().rfidScenario().setPkdEAC(opts.getString("pkdEAC"));
      if (opts.has("readEPassport"))
        reader.Instance().rfidScenario().setReadEPassport(opts.getBoolean("readEPassport"));
      if (opts.has("readEID"))
        reader.Instance().rfidScenario().setReadEID(opts.getBoolean("readEID"));
      if (opts.has("readEDL"))
        reader.Instance().rfidScenario().setReadEDL(opts.getBoolean("readEDL"));
      if (opts.has("mrz"))
        reader.Instance().rfidScenario().setMrz(opts.getString("mrz"));
      if (opts.has("eSignPINDefault"))
        reader.Instance().rfidScenario().seteSignPINDefault(opts.getString("eSignPINDefault"));
      if (opts.has("eSignPINNewValue"))
        reader.Instance().rfidScenario().seteSignPINNewValue(opts.getString("eSignPINNewValue"));
      if (opts.has("authorizedSTSignature"))
        reader.Instance().rfidScenario().setAuthorizedSTSignature(opts.getBoolean("authorizedSTSignature"));
      if (opts.has("authorizedSTQSignature"))
        reader.Instance().rfidScenario().setAuthorizedSTQSignature(opts.getBoolean("authorizedSTQSignature"));
      if (opts.has("authorizedWriteDG17"))
        reader.Instance().rfidScenario().setAuthorizedWriteDG17(opts.getBoolean("authorizedWriteDG17"));
      if (opts.has("authorizedWriteDG18"))
        reader.Instance().rfidScenario().setAuthorizedWriteDG18(opts.getBoolean("authorizedWriteDG18"));
      if (opts.has("authorizedWriteDG19"))
        reader.Instance().rfidScenario().setAuthorizedWriteDG19(opts.getBoolean("authorizedWriteDG19"));
      if (opts.has("authorizedWriteDG20"))
        reader.Instance().rfidScenario().setAuthorizedWriteDG20(opts.getBoolean("authorizedWriteDG20"));
      if (opts.has("authorizedWriteDG21"))
        reader.Instance().rfidScenario().setAuthorizedWriteDG21(opts.getBoolean("authorizedWriteDG21"));
      if (opts.has("authorizedVerifyAge"))
        reader.Instance().rfidScenario().setAuthorizedVerifyAge(opts.getBoolean("authorizedVerifyAge"));
      if (opts.has("authorizedVerifyCommunityID"))
        reader.Instance().rfidScenario().setAuthorizedVerifyCommunityID(opts.getBoolean("authorizedVerifyCommunityID"));
      if (opts.has("authorizedPrivilegedTerminal"))
        reader.Instance().rfidScenario()
            .setAuthorizedPrivilegedTerminal(opts.getBoolean("authorizedPrivilegedTerminal"));
      if (opts.has("authorizedCANAllowed"))
        reader.Instance().rfidScenario().setAuthorizedCANAllowed(opts.getBoolean("authorizedCANAllowed"));
      if (opts.has("authorizedPINManagement"))
        reader.Instance().rfidScenario().setAuthorizedPINManagment(opts.getBoolean("authorizedPINManagement"));
      if (opts.has("authorizedInstallCert"))
        reader.Instance().rfidScenario().setAuthorizedInstallCert(opts.getBoolean("authorizedInstallCert"));
      if (opts.has("authorizedInstallQCert"))
        reader.Instance().rfidScenario().setAuthorizedInstallQCert(opts.getBoolean("authorizedInstallQCert"));
      if (opts.has("ePassportDataGroups"))
        setDataGroups(reader.Instance().rfidScenario().ePassportDataGroups(),
            opts.getJSONObject("ePassportDataGroups"));
      if (opts.has("eIDDataGroups"))
        setDataGroups(reader.Instance().rfidScenario().eIDDataGroups(), opts.getJSONObject("eIDDataGroups"));
      if (opts.has("eDLDataGroups"))
        setDataGroups(reader.Instance().rfidScenario().eDLDataGroups(), opts.getJSONObject("eDLDataGroups"));
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  private static void setDataGroups(DataGroups dataGroup, JSONObject opts) throws JSONException {
    if (opts.has("DG1"))
      dataGroup.setDG1(opts.getBoolean("DG1"));
    if (opts.has("DG2"))
      dataGroup.setDG2(opts.getBoolean("DG2"));
    if (opts.has("DG3"))
      dataGroup.setDG3(opts.getBoolean("DG3"));
    if (opts.has("DG4"))
      dataGroup.setDG4(opts.getBoolean("DG4"));
    if (opts.has("DG5"))
      dataGroup.setDG5(opts.getBoolean("DG5"));
    if (opts.has("DG6"))
      dataGroup.setDG6(opts.getBoolean("DG6"));
    if (opts.has("DG7"))
      dataGroup.setDG7(opts.getBoolean("DG7"));
    if (opts.has("DG8"))
      dataGroup.setDG8(opts.getBoolean("DG8"));
    if (opts.has("DG9"))
      dataGroup.setDG9(opts.getBoolean("DG9"));
    if (opts.has("DG10"))
      dataGroup.setDG10(opts.getBoolean("DG10"));
    if (opts.has("DG11"))
      dataGroup.setDG11(opts.getBoolean("DG11"));
    if (opts.has("DG12"))
      dataGroup.setDG12(opts.getBoolean("DG12"));
    if (opts.has("DG13"))
      dataGroup.setDG13(opts.getBoolean("DG13"));
    if (opts.has("DG14"))
      dataGroup.setDG14(opts.getBoolean("DG14"));
    if (opts.has("DG15"))
      dataGroup.setDG15(opts.getBoolean("DG15"));
    if (opts.has("DG16"))
      dataGroup.setDG16(opts.getBoolean("DG16"));
  }
}