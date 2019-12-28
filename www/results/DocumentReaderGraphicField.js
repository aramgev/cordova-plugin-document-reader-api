/*
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap.Config;
import android.util.Base64;
import java.nio.ByteBuffer;
import org.json.JSONObject;
*/

import {FieldRect} from './FieldRect';

export class DocumentReaderGraphicField {
    constructor(){
        this.sourceType=null;//int
        this.fieldType=null;//int
        this.light = -1;//int
        this.fieldRect = new FieldRect();//FieldRect
        this.imgBytes = [];//byte[]
        this.base64Value = null;//String
        this.pageIndex = null;//int
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
            field.sourceType=jsonObject["sourceType"];
            field.fieldType=jsonObject["fieldType"];
            field.light = jsonObject["light"];
            field.fieldRect = FieldRect.fromJson(jsonObject["fieldRect"]);
            //field.imgBytes=atob(jsonObject["value"], 3);  DECODE 64
            field.base64Value = jsonObject["value"];
            field.width=jsonObject["width"];
            field.height=jsonObject["height"];
            return field;
        }

        return null;
    }
}
