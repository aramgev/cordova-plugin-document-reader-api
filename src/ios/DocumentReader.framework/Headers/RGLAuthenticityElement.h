#import <Foundation/Foundation.h>
#import "RGLDocumentReaderResults.h"

NS_SWIFT_NAME(AuthenticityElement)
@interface RGLAuthenticityElement : NSObject

@property(nonatomic, assign, readonly) RGLCheckResult status;
@property(nonatomic, assign, readonly) RGLSecurityFeatureType elementType;

- (instancetype _Nonnull)init NS_UNAVAILABLE;
- (instancetype _Nonnull)initWithJSON:(NSDictionary *_Nonnull)json;
+ (instancetype _Nonnull)initWithJSON:(NSDictionary * _Nonnull)json;

@end
