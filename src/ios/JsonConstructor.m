//
//  JsonConstructor.m
//  test08
//
//  Created by Pavel Masuk on 4/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JsonConstructor.h"
@import DocumentReader;

@implementation JsonConstructor

+ (NSString*)resultsToJsonString:(RGLDocumentReaderResults*) results{
    NSMutableDictionary *myDictionary = [[NSMutableDictionary alloc] init];
    myDictionary[@"resolutionType"] = [NSNumber numberWithInteger:results.resolutionType];
    myDictionary[@"overallResult"] = [NSNumber numberWithInteger:results.overallResult];
    myDictionary[@"authenticityResults"] = [self generateRGLDocumentReaderAuthenticityResult:results.authenticityResults];
    myDictionary[@"imageQuality"] = [self generateImageQualityGroup:results.imageQualityGroup];
    myDictionary[@"barcodePosition"] = @"empty";
    myDictionary[@"documentPosition"] = @"empty";
    myDictionary[@"jsonResult"] = [self generateDocumentReaderJsonResult:results.jsonResult];
    myDictionary[@"graphicResult"] = [self generateDocumentReaderGraphicResult:results.graphicResult];
    myDictionary[@"textResult"] = [self generateDocumentReaderTextResult:results.textResult];
    myDictionary[@"documentType"] = [self generateNSArrayDocumentReaderDocumentType:results.documentType];
    myDictionary[@"barcodeResult"] = [self generateRGLDocumentReaderBarcodeResult:results.barcodeResult];
    myDictionary[@"chipPage"] = [NSNumber numberWithInteger:results.chipPage];
    myDictionary[@"rfidSessionData"] = @"in development";
    
    return [[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:myDictionary options:NSJSONWritingPrettyPrinted error:nil] encoding:NSUTF8StringEncoding];
}

+ (NSMutableDictionary*)generateRGLDocumentReaderBarcodeResult:(RGLDocumentReaderBarcodeResult*) documentReaderBarcodeResult{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"fields"] = [self generateNSArrayRGLDocumentReaderBarcodeField:documentReaderBarcodeResult.fields];
    
    return output;
}

+(NSMutableArray*)generateNSArrayRGLDocumentReaderBarcodeField:(NSArray<RGLDocumentReaderBarcodeField *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderBarcodeField* documentReaderBarcodeField in list){
        [output addObject:[self generateRGLDocumentReaderBarcodeField:documentReaderBarcodeField]];
    }
    
    return output;
}

+ (NSMutableDictionary*)generateRGLDocumentReaderBarcodeField:(RGLDocumentReaderBarcodeField*) documentReaderBarcodeField{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"barcodeType"] = [NSNumber numberWithInteger:documentReaderBarcodeField.barcodeType];
    output[@"status"] = [NSNumber numberWithInteger:documentReaderBarcodeField.status];
    if(documentReaderBarcodeField.pdf417Info != nil)
        output[@"pdf417Info"] = [self generateRGLPDF417Info:documentReaderBarcodeField.pdf417Info];
    output[@"data"] = [[NSString alloc] initWithData:documentReaderBarcodeField.data encoding:NSUTF8StringEncoding];
    output[@"pageIndex"] = [NSNumber numberWithInteger:documentReaderBarcodeField.pageIndex];
    
    return output;
}

+ (NSMutableDictionary*)generateRGLPDF417Info:(RGLPDF417Info*) pdf417Info{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"errorLevel"] = [NSNumber numberWithInteger:pdf417Info.errorLevel];
    output[@"columns"] = [NSNumber numberWithInteger:pdf417Info.columns];
    output[@"rows"] = [NSNumber numberWithInteger:pdf417Info.rows];
    
    return output;
}

+ (NSMutableDictionary*)generateRGLDocumentReaderAuthenticityResult:(RGLDocumentReaderAuthenticityResult*) documentReaderAuthenticityResult{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"status"] = [NSNumber numberWithInteger:documentReaderAuthenticityResult.status];
    output[@"checks"] = [self generateNSArrayRGLAuthenticityCheck:documentReaderAuthenticityResult.checks];
    
    return output;
}

+(NSMutableArray*)generateNSArrayRGLAuthenticityCheck:(NSArray<RGLAuthenticityCheck *> * _Nonnull) authenticityCheckList{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLAuthenticityCheck* authenticityCheck in authenticityCheckList){
        [output addObject:[self generateRGLAuthenticityCheck:authenticityCheck]];
    }
    
    return output;
}

+ (NSMutableDictionary*)generateRGLAuthenticityCheck:(RGLAuthenticityCheck*) authenticityCheck{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"type"] = [NSNumber numberWithInteger:authenticityCheck.type];
    output[@"status"] = [NSNumber numberWithInteger:authenticityCheck.status];
    output[@"elements"] = [self generateNSArrayRGLAuthenticityElement:authenticityCheck.elements];
    output[@"pageIndex"] = [NSNumber numberWithInteger:authenticityCheck.pageIndex];
    
    return output;
}

+(NSMutableArray*)generateNSArrayRGLAuthenticityElement:(NSArray<RGLAuthenticityElement *> * _Nonnull) authenticityElementList{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLAuthenticityElement* authenticityElement in authenticityElementList){
        [output addObject:[self generateRGLAuthenticityElement:authenticityElement]];
    }
    
    return output;
}

+ (NSMutableDictionary*)generateRGLAuthenticityElement:(RGLAuthenticityElement*) authenticityElement{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"status"] = [NSNumber numberWithInteger:authenticityElement.status];
    output[@"elementType"] = [NSNumber numberWithInteger:authenticityElement.elementType];
    
    return output;
}

+ (NSMutableDictionary*)generateImageQualityGroup:(RGLImageQualityGroup*) imageQualityGroup{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"count"] = [NSNumber numberWithInteger:imageQualityGroup.count];
    output[@"result"] = [NSNumber numberWithInteger:imageQualityGroup.result];
    output[@"imageQualityList"] = [self generateImageQualityList:imageQualityGroup.imageQualityList];
    
    return output;
}

+(NSMutableArray*)generateImageQualityList:(NSArray<RGLImageQuality *> * _Nonnull) imageQualityList{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLImageQuality* imageQuality in imageQualityList){
        [output addObject:[self generateImageQuality:imageQuality]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateImageQuality:(RGLImageQuality*) imageQuality{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"type"] = [NSNumber numberWithInteger:imageQuality.type];
    output[@"result"] = [NSNumber numberWithInteger:imageQuality.result];
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderJsonResult:(RGLDocumentReaderJsonResult*) documentReaderJsonResult{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"results"] = [self generateNSArrayDocumentReaderJsonResultGroup:documentReaderJsonResult.results];
    
    return output;
}

+(NSMutableArray*)generateNSArrayDocumentReaderJsonResultGroup:(NSArray<RGLDocumentReaderJsonResultGroup *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderJsonResultGroup* documentReaderJsonResultGroup in list){
        [output addObject:[self generateDocumentReaderJsonResultGroup:documentReaderJsonResultGroup]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderJsonResultGroup:(RGLDocumentReaderJsonResultGroup*) documentReaderJsonResultGroup{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"resultType"] = [NSNumber numberWithInteger:documentReaderJsonResultGroup.resultType];
    output[@"lightType"] = [NSNumber numberWithInteger:documentReaderJsonResultGroup.lightType];
    output[@"pageIdx"] = [NSNumber numberWithInteger:documentReaderJsonResultGroup.pageIdx];
    output[@"jsonResult"] = [NSJSONSerialization JSONObjectWithData:[documentReaderJsonResultGroup.jsonResult dataUsingEncoding:NSUTF8StringEncoding] options:0 error:nil];
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderGraphicResult:(RGLDocumentReaderGraphicResult*) documentReaderGraphicResult{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"fields"] = [self generateNSArrayDocumentReaderGraphicResultGroup:documentReaderGraphicResult.fields];
    
    return output;
}

+(NSMutableArray*)generateNSArrayDocumentReaderGraphicResultGroup:(NSArray<RGLDocumentReaderGraphicField *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderGraphicField* documentReaderGraphicField in list){
        [output addObject:[self generateDocumentReaderGraphicField:documentReaderGraphicField]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderGraphicField:(RGLDocumentReaderGraphicField*) documentReaderGraphicField{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"sourceType"] = [NSNumber numberWithInteger:documentReaderGraphicField.sourceType];
    output[@"fieldType"] = [NSNumber numberWithInteger:documentReaderGraphicField.fieldType];
    output[@"fieldName"] = documentReaderGraphicField.fieldName;
    output[@"lightType"] = [NSNumber numberWithInteger:documentReaderGraphicField.lightType];
    output[@"lightName"] = documentReaderGraphicField.lightName;
    output[@"fieldRect"] = [self generateCGRect:documentReaderGraphicField.boundRect];
    output[@"width"] = @(documentReaderGraphicField.boundRect.size.width);
    output[@"height"] = @(documentReaderGraphicField.boundRect.size.height);
    NSData *imageData = UIImageJPEGRepresentation(documentReaderGraphicField.value, 1.0);
    NSString * base64String = [imageData base64EncodedStringWithOptions:0];
    output[@"value"] = base64String;
    output[@"pageIndex"] = [NSNumber numberWithInteger:documentReaderGraphicField.pageIndex];
    
    return output;
}

+(NSMutableDictionary*)generateCGRect:(CGRect) cgRect{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"top"] = @(cgRect.origin.y);
    output[@"left"] = @(cgRect.origin.x);
    output[@"bottom"] = @(cgRect.origin.y+cgRect.size.height);
    output[@"right"] = @(cgRect.origin.x+cgRect.size.width);
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderTextResult:(RGLDocumentReaderTextResult*) documentReaderTextResult{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"fields"] = [self generateNSArrayDocumentReaderTextField:documentReaderTextResult.fields];
    output[@"status"] = [NSNumber numberWithInteger:documentReaderTextResult.status];
    
    return output;
}

+(NSMutableArray*)generateNSArrayDocumentReaderTextField:(NSArray<RGLDocumentReaderTextField *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderTextField* documentReaderTextField in list){
        [output addObject:[self generateDocumentReaderTextField:documentReaderTextField]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderTextField:(RGLDocumentReaderTextField*) documentReaderTextField{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"fieldType"] = [NSNumber numberWithInteger:documentReaderTextField.fieldType];
    output[@"fieldName"] = documentReaderTextField.fieldName;
    output[@"lcid"] = [NSNumber numberWithInteger:documentReaderTextField.lcid];
    output[@"lcidName"] = documentReaderTextField.lcidName;
    output[@"values"] = [self generateNSArrayDocumentReaderValue:documentReaderTextField.values];
    output[@"status"] = [NSNumber numberWithInteger:documentReaderTextField.status];
    output[@"value"] = [self generateDocumentReaderValue:[documentReaderTextField getValue]];
    
    return output;
}

+(NSMutableArray*)generateNSArrayDocumentReaderValue:(NSArray<RGLDocumentReaderValue *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderValue* documentReaderValue in list){
        [output addObject:[self generateDocumentReaderValue:documentReaderValue]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderValue:(RGLDocumentReaderValue*) documentReaderValue{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"sourceType"] = [NSNumber numberWithInteger:documentReaderValue.sourceType];
    output[@"value"] = documentReaderValue.value;
    output[@"originalValue"] = documentReaderValue.originalValue;
    output[@"boundRect"] = [self generateCGRect:documentReaderValue.boundRect];
    output[@"validity"] = [NSNumber numberWithInteger:documentReaderValue.validity];
    output[@"pageIndex"] = [NSNumber numberWithInteger:documentReaderValue.pageIndex];
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    for(NSNumber* key in documentReaderValue.comparison){
        dict[[key stringValue]] = documentReaderValue.comparison[key];
    }
    output[@"comparison"] = dict;
    
    return output;
}

+(NSMutableArray*)generateNSArrayDocumentReaderDocumentType:(NSArray<RGLDocumentReaderDocumentType *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(RGLDocumentReaderDocumentType* documentReaderDocumentType in list){
        [output addObject:[self generateDocumentReaderDocumentType:documentReaderDocumentType]];
    }
    
    return output;
}

+(NSMutableDictionary*)generateDocumentReaderDocumentType:(RGLDocumentReaderDocumentType*) documentReaderDocumentType{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"pageIndex"] = [NSNumber numberWithInteger:documentReaderDocumentType.pageIndex];
    output[@"name"] = documentReaderDocumentType.name;
    output[@"documentID"] = [NSNumber numberWithInteger:documentReaderDocumentType.documentID];
    output[@"ICAOCode"] = documentReaderDocumentType.ICAOCode;
    output[@"FDSID"] = [self generateNSArrayNSNumber:documentReaderDocumentType.FDSID];
    output[@"dType"] = [NSNumber numberWithInteger:documentReaderDocumentType.dType];
    output[@"dFormat"] = [NSNumber numberWithInteger:documentReaderDocumentType.dFormat];
    output[@"dMRZ"] = [NSNumber numberWithBool:documentReaderDocumentType.dMRZ];
    output[@"dDescription"] = documentReaderDocumentType.dDescription;
    output[@"dYear"] = documentReaderDocumentType.dYear;
    output[@"dCountryName"] = documentReaderDocumentType.dCountryName;
    
    return output;
}

+(NSMutableArray*)generateNSArrayNSNumber:(NSArray<NSNumber *> * _Nonnull) list{
    NSMutableArray *output = [[NSMutableArray alloc] init];
    for(NSNumber* number in list){
        [output addObject:number];
    }
    
    return output;
}

+(NSString*)generateScenario:(RGLScenario*) scenario{
    NSMutableDictionary *output = [[NSMutableDictionary alloc] init];
    output[@"name"] = scenario.identifier;
    output[@"frame"] = [NSNumber numberWithInteger:scenario.frame];
    output[@"frameKWHLandscape"] = [NSNumber numberWithDouble: scenario.frameKWHLandscape];
    output[@"frameKWHPortrait"] = [NSNumber numberWithDouble: scenario.frameKWHPortrait];
    output[@"description"] = scenario.scenarioDescription;
    output[@"barcodeExt"] = [NSNumber numberWithBool:scenario.barcodeExt];
    output[@"faceExt"] = [NSNumber numberWithBool:scenario.faceExt];
    output[@"multiPageOff"] = [NSNumber numberWithBool:scenario.multiPageOff];
    output[@"caption"] = scenario.caption;
    output[@"uvTorch"] = [NSNumber numberWithBool:scenario.uvTorch];
    output[@"frameOrientation"] = [NSNumber numberWithInteger:scenario.frameOrientation];
    
    return [[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:output options:NSJSONWritingPrettyPrinted error:nil] encoding:NSUTF8StringEncoding];
}


@end
