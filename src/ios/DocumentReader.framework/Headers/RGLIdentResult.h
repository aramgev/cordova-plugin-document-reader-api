#import <Foundation/Foundation.h>
#import "RGLAuthenticityElement.h"
#import <UIKit/UIKit.h>

@class RGLElementRect;

NS_SWIFT_NAME(IdentResult)
@interface RGLIdentResult : RGLAuthenticityElement

@property(nonatomic, strong, readonly, nonnull) UIImage *etalonImage;
@property(nonatomic, strong, readonly, nonnull) UIImage *image;
@property(nonatomic, assign, readonly) NSInteger percentValue;
@property(nonatomic, assign, readonly) NSInteger lightIndex;
@property(nonatomic, strong, readonly, nonnull) RGLElementRect *area;

- (NSString *_Nonnull)elementTypeName;

@end
