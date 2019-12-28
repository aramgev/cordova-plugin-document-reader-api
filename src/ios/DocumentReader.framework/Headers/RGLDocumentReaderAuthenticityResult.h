#import <Foundation/Foundation.h>
#import "RGLDocumentReaderResults.h"

@class RGLAuthenticityCheck;

NS_SWIFT_NAME(DocumentReaderAuthenticityResult)
@interface RGLDocumentReaderAuthenticityResult : NSObject

@property(nonatomic, assign, readonly) RGLCheckResult status;
@property(nonatomic, strong, readonly, nullable) NSArray <RGLAuthenticityCheck *> *checks;

- (instancetype _Nonnull)init NS_UNAVAILABLE;
- (instancetype _Nonnull)initWithJSON:(NSDictionary *_Nonnull)json;
+ (instancetype _Nonnull)initWithJSON:(NSDictionary * _Nonnull)json;

@end
