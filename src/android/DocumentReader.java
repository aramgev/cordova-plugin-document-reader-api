package cordova.plugin.documentreader;

import android.Manifest;
import android.content.pm.PackageManager;
import android.content.Context;
import android.support.v4.app.ActivityCompat;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.widget.Toast;
import android.util.Base64;

import com.regula.documentreader.api.enums.DocReaderAction;
import com.regula.documentreader.api.enums.eRFID_Password_Type;
import com.regula.documentreader.api.enums.eVisualFieldType;
import com.regula.documentreader.api.params.RfidScenario;
import com.regula.documentreader.api.params.ImageInputParam;
import com.regula.documentreader.api.results.DocumentReaderResults;

import com.regula.documentreader.api.results.DocumentReaderScenario;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import android.util.Log;
import java.util.Date;
import java.util.ArrayList;
import cordova.plugin.documentreader.JSONConstructor;
import cordova.plugin.documentreader.RegulaConfig;

import android.view.View;

public class DocumentReader extends CordovaPlugin {
    private CallbackContext callbackContext;
    private static CordovaInterface cordovaStatic;
    private boolean status;
    int timer = -2000000000;
    
    public static Context getContext(){
        return cordovaStatic.getActivity().getApplicationContext();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        this.cordovaStatic = this.cordova;
        if (action.equals("getAPIVersion")) {
            this.getAPIVersion();
            return true;
        } else if (action.equals("getAvailableScenarios")) {
            this.getAvailableScenarios();
            return true;
        } else if (action.equals("getCanRFID")) {
            this.getCanRFID();
            return true;
        } else if (action.equals("getCoreMode")) {
            this.getCoreMode();
            return true;
        } else if (action.equals("getCoreVersion")) {
            this.getCoreVersion();
            return true;
        } else if (action.equals("getDatabaseDate")) {
            this.getDatabaseDate();
            return true;
        } else if (action.equals("getDatabaseID")) {
            this.getDatabaseID();
            return true;
        } else if (action.equals("getDatabaseVersion")) {
            this.getDatabaseVersion();
            return true;
        } else if (action.equals("getDocumentReaderIsReady")) {
            this.getDocumentReaderIsReady();
            return true;
        } else if (action.equals("getDocumentReaderStatus")) {
            this.getDocumentReaderStatus();
            return true;
        } else if (action.equals("getDatabaseCountriesNumber")) {
            this.getDatabaseCountriesNumber();
            return true;
        } else if (action.equals("getDatabaseDocumentsNumber")) {
            this.getDatabaseDocumentsNumber();
            return true;
        } else if (action.equals("selectedScenario")) {
            this.selectedScenario();
            return true;
        } else if (action.equals("getSessionLogFolder")) {
            this.getSessionLogFolder();
            return true;
        } else if (action.equals("getDatabaseDescription")) {
            this.getDatabaseDescription();
            return true;
        } else if (action.equals("initializeReader")) {
            Object license = args.get(0);
            this.initializeReader(license);
            return true;
        } else if (action.equals("prepareDatabase")) {
            this.prepareDatabase(args.getString(0));
            return true;
        } else if (action.equals("recognizeImage")) {
            this.recognizeImage(args.getString(0));
            return true;
        } else if (action.equals("recognizeImageFrame")) {
            this.recognizeImageFrame(args.getString(0), args.getJSONObject(1));
            return true;
        } else if (action.equals("recognizeImageWithOpts")) {
            this.recognizeImageWithOpts(args.getJSONObject(0), args.getString(1));
            return true;
        } else if (action.equals("recognizeVideoFrame")) {
            this.recognizeVideoFrame(args.getString(0), args.getJSONObject(1));
            return true;
        } else if (action.equals("runAutoUpdate")) {
            this.runAutoUpdate(args.getString(0));
            return true;
        } else if (action.equals("setConfig")) {
            this.setConfig(args.getJSONObject(0));
            return true;
        } else if (action.equals("setCameraSessionIsPaused")) {
            this.setCameraSessionIsPaused(args.getBoolean(0));
            return true;
        }else if (action.equals("setRfidScenario")) {
            this.setRfidScenario(args.getJSONObject(0));
            return true;
        } else if (action.equals("showDialog")) {
            this.showDialog(args.getString(0));
            return true;
        } else if (action.equals("showScanner")) {
            this.showScanner();
            return true;
        } else if (action.equals("showScannerWithCameraID")) {
            this.showScannerWithCameraID(args.getInt(0));
            return true;
        } else if (action.equals("showScannerWithCameraIDAndOpts")) {
            this.showScannerWithCameraIDAndOpts(args.getInt(0), args.getJSONObject(1));
            return true;
        } else if (action.equals("startNewPage")) {
            this.startNewPage();
            return true;
        } else if (action.equals("startNewSession")) {
            this.startNewSession();
            return true;
        } else if (action.equals("startRFIDReader")) {
            this.startRFIDReader();
            return true;
        } else if (action.equals("stopRFIDReader")) {
            this.stopRFIDReader();
            return true;
        } else if (action.equals("stopScanner")) {
            this.stopScanner();
            return true;
     

    }else if(action.equals("deinitializeReader")){
            this.deinitializeReader();
        } else if (action.equals("getCanUseAuthenticator")) {
            this.getCanUseAuthenticator();
        } else if (action.equals("getConfig")) {
            this.getConfig();
        } else if (action.equals("getRfidScenario")) {
            this.getRfidScenario();
        } else if (action.equals("getLicenseExpiryDate")) {
            this.getLicenseExpiryDate();
        } else if (action.equals("getLicenseCountryFilter")) {
            this.getLicenseCountryFilter();
        } else if (action.equals("getLicenseMessage")) {
            this.getLicenseMessage();
        } else if (action.equals("licenseIsShowLogo")) {
            this.licenseIsShowLogo();
        } else if (action.equals("licenseIsStatus")) {
            this.licenseIsStatus();
        } else if (action.equals("licenseInfoIsAuthenticity")) {
            this.licenseInfoIsAuthenticity();
        } else if (action.equals("licenseInfoIsBarcode")) {
            this.licenseInfoIsBarcode();
        } else if (action.equals("licenseInfoIsDoctype")) {
            this.licenseInfoIsDoctype();
        } else if (action.equals("licenseInfoIsImageQA")) {
            this.licenseInfoIsImageQA();
        } else if (action.equals("licenseInfoIsLocate")) {
            this.licenseInfoIsLocate();
        } else if (action.equals("licenseInfoIsMrz")) {
            this.licenseInfoIsMrz();
        } else if (action.equals("licenseInfoIsOcr")) {
            this.licenseInfoIsOcr();
        } else if (action.equals("recognizeImageWithImageInputParams")) {
            this.recognizeImageWithImageInputParams(args.getString(0), args.getJSONObject(1));
        } else if (action.equals("permissionRead")) {
            this.permissionRead();
        }

        return false;
    }

    public void deinitializeReader() {
        com.regula.documentreader.api.DocumentReader.Instance().deinitializeReader();
        callbackContext.success();
    }

    public void getCanUseAuthenticator() {
        callbackContext
                .success(com.regula.documentreader.api.DocumentReader.Instance().getCanUseAuthenticator() ? 1 : 0);
    }

    public void getConfig() {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            callbackContext.success(
                    RegulaConfig.getConfig(com.regula.documentreader.api.DocumentReader.Instance()).toString());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void getRfidScenario() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().rfidScenario().toJson());
    }

    public void selectedScenario() {
        ArrayList<String> scenarioNames = new ArrayList<String>();
        for (int i = 0; i < com.regula.documentreader.api.DocumentReader.Instance().availableScenarios.size(); i++) {
            scenarioNames.add(com.regula.documentreader.api.DocumentReader.Instance().availableScenarios.get(i).name);
        }
        callbackContext.success(JSONConstructor.generateDocumentReaderScenario(
                com.regula.documentreader.api.DocumentReader.Instance().availableScenarios.get(scenarioNames
                        .indexOf(com.regula.documentreader.api.DocumentReader.Instance().processParams().scenario)))
                .toString());
    }

    public void getLicenseExpiryDate() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license()
                .getExpiryDate().toString());
    }

    public void getLicenseCountryFilter() {
        JSONArray list = new JSONArray();
        if (com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().getCountryFilter() == null)
            callbackContext.success("null");
        else {
            for (String item : com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().getCountryFilter())
                list.put(item);
            callbackContext.success(list.toString());
        }
    }

    public void getLicenseMessage() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().getMessage());
    }

    public void licenseIsShowLogo() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().isShowLogo() ? 1 : 0);
    }

    public void licenseIsStatus() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().isStatus() ? 1 : 0);
    }

    public void licenseInfoIsAuthenticity() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isAuthenticity()
                        ? 1
                        : 0);
    }

    public void licenseInfoIsBarcode() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isBarcode() ? 1
                        : 0);
    }

    public void licenseInfoIsDoctype() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isDoctype() ? 1
                        : 0);
    }

    public void licenseInfoIsImageQA() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isImageQA() ? 1
                        : 0);
    }

    public void licenseInfoIsLocate() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isLocate() ? 1
                        : 0);
    }

    public void licenseInfoIsMrz() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isMrz() ? 1 : 0);
    }

    public void licenseInfoIsOcr() {
        callbackContext.success(
                com.regula.documentreader.api.DocumentReader.Instance().licenseResult().license().info.isOcr() ? 1 : 0);
    }

    public void getDocumentReaderIsReady() {
        callbackContext
                .success(com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady() ? 1 : 0);
    }

    public void getDocumentReaderStatus() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderStatus());
    }

    public void getCanRFID() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().getCanRFID() ? 1 : 0);
    }

    private void initializeReader(Object license) {
        if (!com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            byte[] licenseBytes = Base64.decode(license.toString(), Base64.DEFAULT);
            com.regula.documentreader.api.DocumentReader.Instance().initializeReader(cordova.getActivity(),
                    licenseBytes, getInitCompletion());
        } else {
            callbackContext.error("already initialized");
        }
    }

    public void startNewSession() {
        com.regula.documentreader.api.DocumentReader.Instance().startNewSession();
        callbackContext.success();
    }

    public void startNewPage() {
        com.regula.documentreader.api.DocumentReader.Instance().startNewPage();
        callbackContext.success();
    }

    public void recognizeImageWithImageInputParams(String base64Image, final JSONObject params) {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            try {
                com.regula.documentreader.api.DocumentReader.Instance().recognizeImage(image,
                        new ImageInputParam(params.getInt("width"), params.getInt("height"), params.getInt("type")),
                        getCompletion());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void recognizeImageWithOpts(final JSONObject opts, String base64Image) throws JSONException {
        RegulaConfig.setConfig(com.regula.documentreader.api.DocumentReader.Instance(), opts);
        recognizeImage(base64Image);
    }

    public void recognizeImage(String base64Image) {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            com.regula.documentreader.api.DocumentReader.Instance().recognizeImage(image, getCompletion());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void recognizeImageFrame(String base64Image, final JSONObject opts) throws JSONException {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            byte[] decodedString = Base64.decode(base64Image, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            com.regula.documentreader.api.DocumentReader.Instance().recognizeImageFrame(image,
                    new ImageInputParam(opts.getInt("width"), opts.getInt("height"), opts.getInt("type")),
                    getCompletion());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void recognizeVideoFrame(String byteString, final JSONObject opts) throws JSONException {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            com.regula.documentreader.api.DocumentReader.Instance().recognizeVideoFrame(byteString.getBytes(),
                    new ImageInputParam(opts.getInt("width"), opts.getInt("height"), opts.getInt("type")),
                    getCompletion());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void showScannerWithCameraID(int cameraID) {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            com.regula.documentreader.api.DocumentReader.Instance().showScanner(cameraID, getCompletion());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void showScanner() {
        showScannerWithCameraID(-1);
    }

    public void showScannerWithCameraIDAndOpts(int cameraID, final JSONObject opts) throws JSONException {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            RegulaConfig.setConfig(com.regula.documentreader.api.DocumentReader.Instance(), opts);
            com.regula.documentreader.api.DocumentReader.Instance().showScanner(cameraID, getCompletion());
        } else {
            callbackContext.error("document reader not ready");
        }
    }

    public void stopScanner() {
        com.regula.documentreader.api.DocumentReader.Instance().stopScanner();
        callbackContext.success();
    }

    public void startRFIDReader() {
        com.regula.documentreader.api.DocumentReader.Instance().startRFIDReader(getCompletion());
    }

    public void stopRFIDReader() {
        com.regula.documentreader.api.DocumentReader.Instance().stopRFIDReader();
        callbackContext.success();
    }

    public void prepareDatabase(String dbID) {
        com.regula.documentreader.api.DocumentReader.Instance().prepareDatabase(cordova.getActivity(), dbID,
                getPrepareCompletion());
    }

    public void runAutoUpdate(String dbID) {
        com.regula.documentreader.api.DocumentReader.Instance().runAutoUpdate(cordova.getActivity(), dbID,
                getPrepareCompletion());
    }

    public void setRfidScenario(final JSONObject opts) throws JSONException {
        RegulaConfig.setRfidScenario(com.regula.documentreader.api.DocumentReader.Instance(), opts);
        callbackContext.success();
    }

    public void getAPIVersion() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.api);
    }

    public void getCoreVersion() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.core);
    }

    public void getCoreMode() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.coreMode);
    }

    public void getDatabaseID() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.database.databaseID);
    }

    public void getDatabaseVersion() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.database.version);
    }

    public void getDatabaseDate() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().version.database.date);
    }

    public void getDatabaseDescription() {
        callbackContext
                .success(com.regula.documentreader.api.DocumentReader.Instance().version.database.databaseDescription);
    }

    public void getDatabaseCountriesNumber() {
        callbackContext
                .success(com.regula.documentreader.api.DocumentReader.Instance().version.database.countriesNumber);
    }

    public void getDatabaseDocumentsNumber() {
        callbackContext
                .success(com.regula.documentreader.api.DocumentReader.Instance().version.database.documentsNumber);
    }

    public void getAvailableScenarios() {
        JSONArray scenarios = new JSONArray();
        for (DocumentReaderScenario scenario : com.regula.documentreader.api.DocumentReader
                .Instance().availableScenarios) {
            scenarios.put(JSONConstructor.generateDocumentReaderScenario(scenario));
        }
        callbackContext.success(scenarios.toString());
    }

    public void getSessionLogFolder() {
        callbackContext.success(com.regula.documentreader.api.DocumentReader.Instance().processParams().sessionLogFolder);
    }

    private void showDialog(String msg) {
        Toast.makeText(cordova.getActivity(), msg, Toast.LENGTH_LONG).show();
    }

    public void setConfig(final JSONObject opts) throws JSONException {
        if (com.regula.documentreader.api.DocumentReader.Instance().getDocumentReaderIsReady()) {
            RegulaConfig.setConfig(com.regula.documentreader.api.DocumentReader.Instance(), opts);
            callbackContext.success();
        } else {
            callbackContext.error("document reader not ready");
        }
    }
    
    public void setCameraSessionIsPaused(boolean ignored) {
        callbackContext.error("setCameraSessionIsPaused() is an ios-only method");
    }

    public void permissionRead() {
        if (ActivityCompat.checkSelfPermission(cordova.getActivity(), Manifest.permission.READ_EXTERNAL_STORAGE) != 0) {
            ActivityCompat.requestPermissions(cordova.getActivity(),
                    new String[] { Manifest.permission.READ_EXTERNAL_STORAGE }, 1);
            callbackContext.error("no permission");
        }else{
            callbackContext.success("");
        }
    }

    private com.regula.documentreader.api.DocumentReader.DocumentReaderCompletion getCompletion() {
        return new com.regula.documentreader.api.DocumentReader.DocumentReaderCompletion() {
            @Override
            public void onCompleted(int action, DocumentReaderResults results, String error) {
                switch (action) {
                case DocReaderAction.COMPLETE:
                    callbackContext.success(JSONConstructor.resultsToJsonObject(results).toString());
                    break;
                case DocReaderAction.CANCEL:
                    callbackContext.error("Canceled by user");
                    break;
                case DocReaderAction.ERROR:
                    callbackContext.error("Error: " + error);
                    break;
                }
            }
        };
    }

    private com.regula.documentreader.api.DocumentReader.DocumentReaderPrepareCompletion getPrepareCompletion() {
        return new com.regula.documentreader.api.DocumentReader.DocumentReaderPrepareCompletion() {
            @Override
            public void onPrepareProgressChanged(int progress) {
                if ((int) (System.currentTimeMillis()) > timer + 10) {
                    Log.e("AAA", "Downloading database: " + progress + "%");
                    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,
                            "Downloading database: " + progress + "%");
                    pluginResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(pluginResult);
                    timer = (int) (System.currentTimeMillis());
                }
            }

            @Override
            public void onPrepareCompleted(boolean status, String error) {
                if (status) {
                    callbackContext.success("database prepared");
                } else {
                    callbackContext.error("database preparation failed: " + error);
                }
            }
        };
    }

    private com.regula.documentreader.api.DocumentReader.DocumentReaderInitCompletion getInitCompletion() {
        return new com.regula.documentreader.api.DocumentReader.DocumentReaderInitCompletion() {
            @Override
            public void onInitCompleted(boolean success, String error) {
                if (success) {
                    com.regula.documentreader.api.DocumentReader
                            .Instance().processParams().scenario = com.regula.documentreader.api.DocumentReader
                                    .Instance().availableScenarios.get(0).name;
                    callbackContext.success("init completed");
                } else {
                    callbackContext.error("Init failed:" + error);
                }
            }
        };
    }
}