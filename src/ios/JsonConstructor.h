//
//  JsonConstructor.h
//  test08
//
//  Created by Pavel Masuk on 4/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef JsonConstructor_h
#define JsonConstructor_h
#import <DocumentReader/DocumentReader.h>
@import CoreGraphics;
@import UIKit;

@interface JsonConstructor : NSObject
+ (NSString*)resultsToJsonString:(RGLDocumentReaderResults*) results;
+ (NSMutableDictionary*)generateImageQualityGroup:(RGLImageQualityGroup*) imageQualityGroup;
+(NSMutableArray*)generateImageQualityList:(NSArray<RGLImageQuality *> * _Nonnull) imageQualityList;
+(NSMutableDictionary*)generateImageQuality:(RGLImageQuality*) imageQuality;
+(NSMutableDictionary*)generateDocumentReaderJsonResult:(RGLDocumentReaderJsonResult*) documentReaderJsonResult;
+(NSMutableArray*)generateNSArrayDocumentReaderJsonResultGroup:(NSArray<RGLDocumentReaderJsonResultGroup *> * _Nonnull) list;
+(NSMutableDictionary*)generateDocumentReaderJsonResultGroup:(RGLDocumentReaderJsonResultGroup*) documentReaderJsonResultGroup;
+(NSMutableDictionary*)generateDocumentReaderGraphicResult:(RGLDocumentReaderGraphicResult*) documentReaderGraphicResult;
+(NSMutableArray*)generateNSArrayDocumentReaderGraphicResultGroup:(NSArray<RGLDocumentReaderGraphicField *> * _Nonnull) list;
+(NSMutableDictionary*)generateDocumentReaderGraphicField:(RGLDocumentReaderGraphicField*) documentReaderGraphicField;
+(NSMutableDictionary*)generateCGRect:(CGRect) cgRect;
+(NSMutableDictionary*)generateDocumentReaderTextResult:(RGLDocumentReaderTextResult*) documentReaderTextResult;
+(NSMutableArray*)generateNSArrayDocumentReaderTextField:(NSArray<RGLDocumentReaderTextField *> * _Nonnull) list;
+(NSMutableDictionary*)generateDocumentReaderTextField:(RGLDocumentReaderTextField*) documentReaderTextField;
+(NSMutableArray*)generateNSArrayDocumentReaderValue:(NSArray<RGLDocumentReaderValue *> * _Nonnull) list;
+(NSMutableDictionary*)generateDocumentReaderValue:(RGLDocumentReaderValue*) documentReaderValue;
+(NSMutableDictionary*)generateDocumentReaderDocumentType:(RGLDocumentReaderDocumentType*) documentReaderDocumentType;
+(NSMutableArray*)generateNSArrayNSNumber:(NSArray<NSNumber *> * _Nonnull) list;
+(NSString*)generateScenario:(RGLScenario*) scenario;

@end
#endif /* JsonConstructor_h */
