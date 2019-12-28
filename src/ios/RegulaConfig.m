//
//  RegulaConfig.m
//  RNRegulaDocumentReader
//
//  Created by Pavel Masuk on 5/2/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RegulaConfig.h"

@implementation RegulaConfig
+(void)setConfig:(NSDictionary*) options : (RGLDocReader*) reader{
    if([options valueForKey:@"customization"] != nil){
        [self setCustomization: [options valueForKey:@"customization"]: reader.customization];
    }
    if([options valueForKey:@"functionality"] != nil){
        [self setFunctionality: [options valueForKey:@"functionality"]: reader.functionality];
    }
    if([options valueForKey:@"processParams"] != nil){
        [self setProcessParams: [options valueForKey:@"processParams"]: reader.processParams];
    }
}

+(NSMutableDictionary *)getConfig:(RGLDocReader*) reader{
    NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
    result[@"customization"] = [self getCustomization: reader.customization];
    result[@"functionality"] = [self getFunctionality: reader.functionality];
    result[@"processParams"] = [self getProcessParams: reader.processParams];
    
    return result;
}

+(UIColor *)getUIColorObjectFromHexString:(NSString *)hexStr alpha:(CGFloat)alpha
{
    unsigned int hexint = [self intFromHexString:hexStr];
    UIColor *color =
    [UIColor colorWithRed:((CGFloat) ((hexint & 0xFF0000) >> 16))/255
                    green:((CGFloat) ((hexint & 0xFF00) >> 8))/255
                     blue:((CGFloat) (hexint & 0xFF))/255
                    alpha:alpha];
    
    return color;
}

+ (NSString *)hexStringFromUIColor:(UIColor *)color {
    const CGFloat *components = CGColorGetComponents(color.CGColor);
    
    CGFloat r = components[0];
    CGFloat g = components[1];
    CGFloat b = components[2];
    
    return [NSString stringWithFormat:@"#%02lX%02lX%02lX",
            lroundf(r * 255),
            lroundf(g * 255),
            lroundf(b * 255)];
}

+ (unsigned int)intFromHexString:(NSString *)hexStr
{
    unsigned int hexInt = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexStr];
    [scanner setCharactersToBeSkipped:[NSCharacterSet characterSetWithCharactersInString:@"#"]];
    [scanner scanHexInt:&hexInt];
    
    return hexInt;
}

+(UIImage*)imageFromBase64:(NSString *)base64image
{
    NSMutableString *base64 = [NSMutableString stringWithString: base64image];
    if(![[base64image substringToIndex:10] isEqualToString:@"data:image"]){
        base64 = [NSMutableString stringWithFormat: @"%@%@", @"data:image/jpeg;base64,", base64image];
    }
    NSURL *url = [NSURL URLWithString:base64];
    NSData *imageData = [NSData dataWithContentsOfURL:url];
    UIImage *image = [UIImage imageWithData:imageData];
    return image;
}

+(void)setCustomization:(NSDictionary*) options : (RGLCustomization*) customization{
    if([options valueForKey:@"cameraFrameBorderWidth"] != nil){
        customization.cameraFrameBorderWidth = [[options valueForKey:@"cameraFrameBorderWidth"] floatValue];
    }
    if([options valueForKey:@"cameraFrameDefaultColor"] != nil){
        customization.cameraFrameDefaultColor = [self getUIColorObjectFromHexString:[options valueForKey:@"cameraFrameDefaultColor"] alpha:1];
    }
    if([options valueForKey:@"cameraFrameActiveColor"] != nil){
        customization.cameraFrameActiveColor = [self getUIColorObjectFromHexString:[options valueForKey:@"cameraFrameActiveColor"] alpha:1];
    }
    if([options valueForKey:@"cameraFrameShapeType"] != nil){
        customization.cameraFrameShapeType = [[options valueForKey:@"cameraFrameShapeType"]intValue];
    }
    if([options valueForKey:@"cameraFrameLineLength"] != nil){
        customization.cameraFrameLineLength = [[options valueForKey:@"cameraFrameLineLength"] intValue];
    }
    if([options valueForKey:@"status"] != nil){
        customization.status = [options valueForKey:@"status"];
    }
    if([options valueForKey:@"showStatusMessages"] != nil){
        customization.showStatusMessages = [[options valueForKey:@"showStatusMessages"] boolValue];
    }
    if([options valueForKey:@"statusTextFont"] != nil){
        if([options valueForKey:@"statusTextSize"] != nil)
            customization.statusTextFont = [UIFont fontWithName:[options valueForKey:@"statusTextFont"] size:[[options valueForKey:@"statusTextSize"] floatValue]];
        else
            customization.statusTextFont = [UIFont fontWithName:[options valueForKey:@"statusTextFont"] size:17];
    }
    if([options valueForKey:@"statusTextColor"] != nil){
        customization.statusTextColor = [self getUIColorObjectFromHexString:[options valueForKey:@"statusTextColor"] alpha:1];
    }
    if([options valueForKey:@"statusPositionMultiplier"] != nil){
        customization.statusPositionMultiplier = [[options valueForKey:@"statusPositionMultiplier"] doubleValue];
    }
    if([options valueForKey:@"showResultStatusMessages"] != nil){
        customization.showResultStatusMessages = [[options valueForKey:@"showResultStatusMessages"] boolValue];
    }
    if([options valueForKey:@"resultStatus"] != nil){
        customization.resultStatus = [options valueForKey:@"resultStatus"];
    }
    if([options valueForKey:@"resultStatusTextFont"] != nil){
        if([options valueForKey:@"resultStatusTextSize"] != nil)
            customization.resultStatusTextFont = [UIFont fontWithName:[options valueForKey:@"resultStatusTextFont"] size:[[options valueForKey:@"resultStatusTextSize"] floatValue]];
        else
            customization.resultStatusTextFont = [UIFont fontWithName:[options valueForKey:@"resultStatusTextFont"] size:17];
    }
    if([options valueForKey:@"resultStatusTextColor"] != nil){
        customization.resultStatusTextColor = [self getUIColorObjectFromHexString:[options valueForKey:@"resultStatusTextColor"] alpha:1];
    }
    if([options valueForKey:@"resultStatusBackgroundColor"] != nil){
        customization.resultStatusBackgroundColor = [self getUIColorObjectFromHexString:[options valueForKey:@"resultStatusBackgroundColor"] alpha:1];
    }
    if([options valueForKey:@"resultStatusPositionMultiplier"] != nil){
        customization.resultStatusPositionMultiplier = [[options valueForKey:@"resultStatusPositionMultiplier"] doubleValue];
    }
    if([options valueForKey:@"showHelpAnimation"] != nil){
        customization.showHelpAnimation = [[options valueForKey:@"showHelpAnimation"] boolValue];
    }
    if([options valueForKey:@"showNextPageAnimation"] != nil){
        customization.showNextPageAnimation = [[options valueForKey:@"showNextPageAnimation"] boolValue];
    }
    if([options valueForKey:@"helpAnimationImage"] != nil){
        customization.helpAnimationImage = [self imageFromBase64:[options valueForKey:@"helpAnimationImage"]];
    }
    if([options valueForKey:@"multipageAnimationFrontImage"] != nil){
        customization.multipageAnimationFrontImage = [self imageFromBase64:[options valueForKey:@"multipageAnimationFrontImage"]];
    }
    if([options valueForKey:@"multipageAnimationBackImage"] != nil){
        customization.multipageAnimationBackImage = [self imageFromBase64:[options valueForKey:@"multipageAnimationBackImage"]];
    }
    if([options valueForKey:@"tintColor"] != nil){
        customization.tintColor = [self getUIColorObjectFromHexString:[options valueForKey:@"tintColor"] alpha:1];
    }
    if([options valueForKey:@"multipageButtonBackgroundColor"] != nil){
        customization.multipageButtonBackgroundColor = [self getUIColorObjectFromHexString:[options valueForKey:@"multipageButtonBackgroundColor"] alpha:1];
    }
    if([options valueForKey:@"activityIndicatorColor"] != nil){
        customization.activityIndicatorColor = [self getUIColorObjectFromHexString:[options valueForKey:@"activityIndicatorColor"] alpha:1];
    }
    if([options valueForKey:@"showBackgroundMask"] != nil){
        customization.showBackgroundMask = [[options valueForKey:@"showBackgroundMask"] boolValue];
    }
    if([options valueForKey:@"borderBackgroundImage"] != nil){
        customization.borderBackgroundImage = [self imageFromBase64:[options valueForKey:@"borderBackgroundImage"]];
    }
    if([options valueForKey:@"backgroundMaskAlpha"] != nil){
        customization.backgroundMaskAlpha = [[options valueForKey:@"backgroundMaskAlpha"] floatValue];
    }
    if([options valueForKey:@"helpAnimationImageContentMode"] != nil){
        customization.helpAnimationImageContentMode = [[options valueForKey:@"helpAnimationImageContentMode"] integerValue];
    }
    if([options valueForKey:@"multipageAnimationFrontImageContentMode"] != nil){
        customization.multipageAnimationFrontImageContentMode = [[options valueForKey:@"multipageAnimationFrontImageContentMode"] integerValue];
    }
    if([options valueForKey:@"multipageAnimationBackImageContentMode"] != nil){
        customization.multipageAnimationBackImageContentMode = [[options valueForKey:@"multipageAnimationBackImageContentMode"] integerValue];
    }
    if([options valueForKey:@"borderBackgroundImageContentMode"] != nil){
        customization.borderBackgroundImageContentMode = [[options valueForKey:@"borderBackgroundImageContentMode"] integerValue];
    }
}

+(void)setFunctionality:(NSDictionary*) options : (RGLFunctionality*) functionality{
    if([options valueForKey:@"cameraFrame"] != nil){
        NSString *enumFromAndroid = [options valueForKey:@"cameraFrame"];
        if([enumFromAndroid  isEqual: @"id1"])
            functionality.cameraFrame = 0;
        if([enumFromAndroid  isEqual: @"max"])
            functionality.cameraFrame = 1;
        if([enumFromAndroid  isEqual: @"none"])
            functionality.cameraFrame = 2;
    }
    if([options valueForKey:@"showTorchButton"] != nil){
        functionality.showTorchButton = [[options valueForKey:@"showTorchButton"] boolValue];
    }
    if([options valueForKey:@"showCloseButton"] != nil){
        functionality.showCloseButton = [[options valueForKey:@"showCloseButton"] boolValue];
    }
    if([options valueForKey:@"showCaptureButton"] != nil){
        functionality.showCaptureButton = [[options valueForKey:@"showCaptureButton"] boolValue];
    }
    if([options valueForKey:@"showChangeFrameButton"] != nil){
        functionality.showChangeFrameButton = [[options valueForKey:@"showChangeFrameButton"] boolValue];
    }
    if([options valueForKey:@"showSkipNextPageButton"] != nil){
        functionality.showSkipNextPageButton = [[options valueForKey:@"showSkipNextPageButton"] boolValue];
    }
    if([options valueForKey:@"showCameraSwitchButton"] != nil){
        functionality.showCameraSwitchButton = [[options valueForKey:@"showCameraSwitchButton"] boolValue];
    }
    if([options valueForKey:@"videoCaptureMotionControl"] != nil){
        functionality.videoCaptureMotionControl = [[options valueForKey:@"videoCaptureMotionControl"] boolValue];
    }
    if([options valueForKey:@"skipFocusingFrames"] != nil){
        functionality.skipFocusingFrames = [[options valueForKey:@"skipFocusingFrames"] boolValue];
    }
    if([options valueForKey:@"orientation"] != nil){
        NSInteger orientation = [[options valueForKey:@"orientation"] intValue];
        switch(orientation){
            case 0:
                functionality.orientation = UIInterfaceOrientationMaskPortrait;
                break;
            case 1:
                functionality.orientation = UIInterfaceOrientationMaskLandscapeLeft;
                break;
            case 2:
                functionality.orientation = UIInterfaceOrientationMaskLandscapeRight;
                break;
            case 3:
                functionality.orientation = UIInterfaceOrientationMaskPortraitUpsideDown;
                break;
            case 4:
                functionality.orientation = UIInterfaceOrientationMaskLandscape;
                break;
            case 5:
                functionality.orientation = UIInterfaceOrientationMaskAll;
                break;
            case 6:
                functionality.orientation = UIInterfaceOrientationMaskAllButUpsideDown;
                break;
            default:
                NSLog(@"got wrong orientation value, applying UIInterfaceOrientationMaskAll");
                functionality.orientation = UIInterfaceOrientationMaskAll;
        }
    }
    if([options valueForKey:@"videoSessionPreset"] != nil){
        functionality.videoSessionPreset = [options valueForKey:@"videoSessionPreset"];
    }
    if([options valueForKey:@"singleResult"] != nil){
        functionality.singleResult = [[options valueForKey:@"singleResult"] boolValue];
    }
    if([options valueForKey:@"cameraPosition"] != nil){
        functionality.cameraPosition = [[options valueForKey:@"cameraPosition"] intValue];
    }
    if([options valueForKey:@"onlineMode"] != nil){
        functionality.onlineMode = [[options valueForKey:@"onlineMode"] boolValue];
    }
    if([options valueForKey:@"serviceURL"] != nil){
        functionality.serviceURL = [[options valueForKey:@"serviceURL"] stringValue];
    }
    if([options valueForKey:@"btDeviceName"] != nil){
        functionality.btDeviceName = [[options valueForKey:@"btDeviceName"] stringValue];
    }
    if([options valueForKey:@"useAuthenticator"] != nil){
        functionality.useAuthenticator = [[options valueForKey:@"useAuthenticator"] boolValue];
    }
    if([options valueForKey:@"rfidEnabled"] != nil){
        functionality.rfidEnabled = [[options valueForKey:@"rfidEnabled"] boolValue];
    }
    if([options valueForKey:@"showCaptureButtonDelayFromDetect"] != nil){
        functionality.showCaptureButtonDelayFromDetect = [[options valueForKey:@"showCaptureButtonDelayFromDetect"] doubleValue];
    }
    if([options valueForKey:@"showCaptureButtonDelayFromStart"] != nil){
        functionality.showCaptureButtonDelayFromStart = [[options valueForKey:@"showCaptureButtonDelayFromStart"] doubleValue];
    }
}

+(void)setProcessParams:(NSDictionary*) options : (RGLProcessParams*) processParams{
    if([options valueForKey:@"multipageProcessing"] != nil){
        processParams.multipageProcessing = [[options valueForKey:@"multipageProcessing"] boolValue];
    }
    if([options valueForKey:@"dateFormat"] != nil){
        processParams.dateFormat = [options valueForKey:@"dateFormat"];
    }
    if([options valueForKey:@"logs"] != nil){
        processParams.logs = [[options valueForKey:@"logs"] boolValue];
    }
    if([options valueForKey:@"debugSaveImages"] != nil){
        processParams.debugSaveImages = [[options valueForKey:@"debugSaveImages"] boolValue];
    }
    if([options valueForKey:@"debugSaveCroppedImages"] != nil){
        processParams.debugSaveCroppedImages = [[options valueForKey:@"debugSaveCroppedImages"] boolValue];
    }
    if([options valueForKey:@"debugSaveLogs"] != nil){
        processParams.debugSaveLogs = [[options valueForKey:@"debugSaveLogs"] boolValue];
    }
    if([options valueForKey:@"scenario"] != nil){
        processParams.scenario = [options valueForKey:@"scenario"];
    }
    if([options valueForKey:@"barcodeTypes"] != nil){
        processParams.barcodeTypes = [options valueForKey:@"barcodeTypes"];
    }
    if([options valueForKey:@"documentIDList"] != nil){
        processParams.documentIDList = [options valueForKey:@"documentIDList"];
    }
    if([options valueForKey:@"fieldTypesFilter"] != nil){
        processParams.fieldTypesFilter = [options valueForKey:@"fieldTypesFilter"];
    }
    if([options valueForKey:@"disableFocusingCheck"] != nil){
        processParams.disableFocusingCheck = [[options valueForKey:@"disableFocusingCheck"] boolValue];
    }
    if([options valueForKey:@"captureButtonScenario"] != nil){
        processParams.captureButtonScenario = [options valueForKey:@"captureButtonScenario"];
    }
    if([options valueForKey:@"sessionLogFolder"] != nil){
        processParams.sessionLogFolder = [[options valueForKey:@"sessionLogFolder"] stringValue];
    }
    if([options valueForKey:@"rfidOptions"] != nil){
        //        processParams.rfidOptions = [[options valueForKey:@"rfidOptions"] stringValue];
    }
    if([options valueForKey:@"measureSystem"] != nil){
        processParams.measureSystem = [[options valueForKey:@"measureSystem"] integerValue];
    }
    if([options valueForKey:@"returnUncroppedImage"] != nil){
        processParams.returnUncroppedImage = [[options valueForKey:@"returnUncroppedImage"] boolValue];
    }
    if([options valueForKey:@"customParams"] != nil){
        processParams.customParams = [options objectForKey:@"customParams"];
    }
}

+(NSMutableDictionary *)getCustomization:(RGLCustomization*) customization{
    NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
    result[@"showHelpAnimation"] = [NSNumber numberWithBool:customization.showHelpAnimation];
    result[@"helpAnimationImage"] = [UIImageJPEGRepresentation(customization.helpAnimationImage, 1.0) base64Encoding];
    result[@"showStatusMessages"] = [NSNumber numberWithBool:customization.showStatusMessages];
    result[@"status"] = customization.status;
    result[@"resultStatus"] = customization.resultStatus;
    result[@"statusPositionMultiplier"] = [NSNumber numberWithFloat:customization.statusPositionMultiplier];
    result[@"resultStatusPositionMultiplier"] = [NSNumber numberWithFloat:customization.resultStatusPositionMultiplier];
    result[@"cameraFrameShapeType"] = [NSNumber numberWithFloat:customization.cameraFrameShapeType];
    if(customization.tintColor != nil)
        result[@"tintColor"] = [self hexStringFromUIColor:customization.tintColor];
    if(customization.resultStatusTextColor != nil)
        result[@"resultStatusTextColor"] = [self hexStringFromUIColor:customization.resultStatusTextColor];
    result[@"resultStatusTextFont"] = customization.resultStatusTextFont.fontName;
    if(customization.resultStatusBackgroundColor != nil)
        result[@"resultStatusBackgroundColor"] = [self hexStringFromUIColor:customization.resultStatusBackgroundColor];
    if(customization.cameraFrameDefaultColor != nil)
        result[@"cameraFrameDefaultColor"] = [self hexStringFromUIColor:customization.cameraFrameDefaultColor];
    if(customization.cameraFrameActiveColor != nil)
        result[@"cameraFrameActiveColor"] = [self hexStringFromUIColor:customization.cameraFrameActiveColor];
    result[@"cameraFrameBorderWidth"] = [NSNumber numberWithFloat:customization.cameraFrameBorderWidth];
    if(customization.statusTextColor != nil)
        result[@"statusTextColor"] = [self hexStringFromUIColor:customization.statusTextColor];
    result[@"statusTextFont"] = customization.statusTextFont.fontName;
    if(customization.activityIndicatorColor != nil)
        result[@"activityIndicatorColor"] = [self hexStringFromUIColor:customization.activityIndicatorColor];
    if(customization.multipageButtonBackgroundColor != nil)
        result[@"multipageButtonBackgroundColor"] = [self hexStringFromUIColor:customization.multipageButtonBackgroundColor];
    result[@"multipageAnimationFrontImage"] = [UIImageJPEGRepresentation(customization.multipageAnimationFrontImage, 1.0) base64Encoding];
    result[@"multipageAnimationBackImage"] = [UIImageJPEGRepresentation(customization.multipageAnimationBackImage, 1.0) base64Encoding];
    result[@"cameraFrameLineLength"] = [NSNumber numberWithFloat:customization.cameraFrameLineLength];
    result[@"showNextPageAnimation"] = [NSNumber numberWithBool:customization.showNextPageAnimation];
    result[@"showBackgroundMask"] = [NSNumber numberWithBool:customization.showBackgroundMask];
    result[@"borderBackgroundImage"] = [UIImageJPEGRepresentation(customization.borderBackgroundImage, 1.0) base64Encoding];
    result[@"backgroundMaskAlpha"] = [NSNumber numberWithFloat:customization.backgroundMaskAlpha];
    result[@"helpAnimationImageContentMode"] = [NSNumber numberWithInteger:customization.helpAnimationImageContentMode];
    result[@"multipageAnimationFrontImageContentMode"] = [NSNumber numberWithInteger:customization.multipageAnimationFrontImageContentMode];
    result[@"multipageAnimationBackImageContentMode"] = [NSNumber numberWithInteger:customization.multipageAnimationBackImageContentMode];
    result[@"borderBackgroundImageContentMode"] = [NSNumber numberWithInteger:customization.borderBackgroundImageContentMode];
    
    return result;
}

+(NSMutableDictionary *)getFunctionality:(RGLFunctionality*) functionality{
    NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
    result[@"cameraFrame"] = [NSNumber numberWithInteger:functionality.cameraFrame];
    result[@"showTorchButton"] = [NSNumber numberWithBool:functionality.showTorchButton];
    result[@"showCloseButton"] = [NSNumber numberWithBool:functionality.showCloseButton];
    result[@"showCaptureButton"] = [NSNumber numberWithBool:functionality.showCaptureButton];
    result[@"showChangeFrameButton"] = [NSNumber numberWithBool:functionality.showChangeFrameButton];
    result[@"showCameraSwitchButton"] = [NSNumber numberWithBool:functionality.showCameraSwitchButton];
    result[@"showSkipNextPageButton"] = [NSNumber numberWithBool:functionality.showSkipNextPageButton];
    result[@"skipFocusingFrames"] = [NSNumber numberWithBool:functionality.skipFocusingFrames];
    result[@"videoSessionPreset"] = functionality.videoSessionPreset;
    result[@"videoCaptureMotionControl"] = [NSNumber numberWithBool:functionality.videoCaptureMotionControl];
    result[@"orientation"] = [NSNumber numberWithInteger:functionality.orientation];
    result[@"onlineMode"] = [NSNumber numberWithBool:functionality.onlineMode];
    result[@"serviceURL"] = functionality.serviceURL;
    result[@"cameraPosition"] = [NSNumber numberWithInteger:functionality.cameraPosition];
    result[@"btDeviceName"] = functionality.btDeviceName;
    result[@"useAuthenticator"] = [NSNumber numberWithBool:functionality.isUseAuthenticator];
    result[@"rfidEnabled"] = [NSNumber numberWithBool:functionality.rfidEnabled];
    result[@"showCaptureButtonDelayFromDetect"] = [NSNumber numberWithDouble:functionality.showCaptureButtonDelayFromDetect];
    result[@"showCaptureButtonDelayFromStart"] = [NSNumber numberWithDouble:functionality.showCaptureButtonDelayFromStart];
    
    return result;
}

+(NSMutableDictionary *)getProcessParams:(RGLProcessParams*) processParams{
    NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
    result[@"scenario"] = processParams.scenario;
    result[@"captureButtonScenario"] = processParams.captureButtonScenario;
    result[@"logs"] = [NSNumber numberWithBool:processParams.logs];
    result[@"multipageProcessing"] = [NSNumber numberWithBool:processParams.multipageProcessing];
    result[@"disableFocusingCheck"] = [NSNumber numberWithBool:processParams.disableFocusingCheck];
    result[@"debugSaveImages"] = [NSNumber numberWithBool:processParams.debugSaveImages];
    result[@"debugSaveCroppedImages"] = [NSNumber numberWithBool:processParams.debugSaveCroppedImages];
    result[@"debugSaveLogs"] = [NSNumber numberWithBool:processParams.debugSaveLogs];
    result[@"dateFormat"] = processParams.dateFormat;
    result[@"documentIDList"] = processParams.documentIDList;
    result[@"sessionLogFolder"] = processParams.sessionLogFolder;
    result[@"fieldTypesFilter"] = processParams.fieldTypesFilter;
    result[@"barcodeTypes"] = processParams.barcodeTypes;
    result[@"rfidOptions"] = @"in development";
    result[@"measureSystem"] = [NSNumber numberWithInteger:processParams.measureSystem];
    result[@"returnUncroppedImage"] = [NSNumber numberWithBool:processParams.returnUncroppedImage];
    result[@"customParams"] = processParams.customParams;
    
    return result;
}

@end
