#import <UIKit/UIKit.h>

@class RGLMaskView;
@protocol RGLMaskViewDataSource <NSObject>

- (CGRect)maskRect:(RGLMaskView *_Nullable)maskRect;

@end

NS_SWIFT_NAME(MaskView)
@interface RGLMaskView : UIView

- (instancetype _Nonnull)initWithOffset:(CGFloat)offset cornerRadius:(CGFloat)radius;

@property(nonatomic, weak, nullable) id<RGLMaskViewDataSource> dataSource;
@property(nonatomic, strong) CAShapeLayer* _Nullable maskLayer;
@property(nonatomic) CGFloat offset;
@property(nonatomic) CGFloat cornerRadius;

-(void)setTorchModeOn:(BOOL)mode;

@end


