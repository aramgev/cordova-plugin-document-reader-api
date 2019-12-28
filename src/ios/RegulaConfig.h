//
//  RegulaConfig.h
//  RNRegulaDocumentReader
//
//  Created by Pavel Masuk on 5/2/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef RegulaConfig_h
#define RegulaConfig_h
#import <DocumentReader/DocumentReader.h>
@import CoreGraphics;
@import UIKit;
@import AVFoundation;

@interface RegulaConfig : NSObject

+(void)setConfig:(NSDictionary*) options : (RGLDocReader*) reader;
+(NSMutableDictionary *)getConfig:(RGLDocReader*) reader;
+(void)setCustomization:(NSDictionary*) options : (RGLCustomization*) customization;
+(void)setFunctionality:(NSDictionary*) options : (RGLFunctionality*) functionality;
+(void)setProcessParams:(NSDictionary*) options : (RGLProcessParams*) processParams;
+(UIColor *)getUIColorObjectFromHexString:(NSString *)hexStr alpha:(CGFloat)alpha;
+(unsigned int)intFromHexString:(NSString *)hexStr;
+(UIImage*)imageFromBase64:(NSString *)base64image;
@end
#endif /* RegulaConfig_h */
