//
//  RGLDocumentReader.m
//  CordovaDocumentReader
//
//  Created by Dmitry Smolyakov on 9/16/17.
//  Copyright © 2017 Dmitry Smolyakov. All rights reserved.
//
@import UIKit;
#import "RGLDocumentReader.h"
@import DocumentReader;

@implementation RGLDocumentReader

- (void) initializeReader:(CDVInvokedUrlCommand*)command {
    
    NSData *licenseData = [[command arguments] objectAtIndex:0];
    
    self.docReader = RGLDocReader.shared;
    self.docReader.functionality.videoCaptureMotionControl = NO;
    [self.docReader initializeReader:licenseData completion:^(BOOL success, NSString * _Nullable error) {
        CDVPluginResult* pluginResult;
        if (success) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"init complete"];
        }
        else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@[[NSString stringWithFormat:@"%@/%@", @"init failed: ", error]]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) initializeReaderWithDatabasePath:(CDVInvokedUrlCommand*)command {
    
    NSData *licenseData = [[command arguments] objectAtIndex:0];
    
    self.docReader = RGLDocReader.shared;
    self.docReader.functionality.videoCaptureMotionControl = NO;

    [self.docReader initializeReader:licenseData databasePath:[[command arguments] objectAtIndex:1] completion:^(BOOL success, NSString * _Nullable error ) {
        CDVPluginResult* pluginResult;
        if (success) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"init complete"];
        }
        else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@[[NSString stringWithFormat:@"%@/%@", @"init failed: ", error]]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) prepareDatabase:(CDVInvokedUrlCommand*)command {
    self.docReader = RGLDocReader.shared;
    [self.docReader prepareDatabase:[[command arguments] objectAtIndex:0] progressHandler:^(NSProgress * _Nonnull progress) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"msg" : [NSString stringWithFormat:@"%@%.1f%@", @"Downloading database: ", progress.fractionCompleted * 100, @"%"]}];
        [result setKeepCallbackAsBool:YES];// NOT WORKING
        [self.commandDelegate sendPluginResult:result callbackId: @"prepareDatabaseProgressChangeEvent"];
    } completion:^(BOOL successful, NSString * _Nullable error) {
        CDVPluginResult* pluginResult;
        if (successful) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"database prepared"];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@[[NSString stringWithFormat:@"%@/%@", @"database preparation failed: ", error]]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) showScanner:(CDVInvokedUrlCommand*)command {
    if([self.docReader isDocumentReaderIsReady]){
    [self.docReader showScanner:self.viewController completion:^(enum RGLDocReaderAction action, RGLDocumentReaderResults * _Nullable result, NSString * _Nullable error) {
            switch (action) {
                case RGLDocReaderActionCancel: {
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Cancelled by user"] callbackId:command.callbackId];
                    break;
                }
                    
                case RGLDocReaderActionComplete: {
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[JsonConstructor resultsToJsonString:result]] callbackId:command.callbackId];
                    break;
                }
                    
                case RGLDocReaderActionError: {
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error] callbackId:command.callbackId];
                    break;
                }
                    
                case RGLDocReaderActionProcess: {
                    break;
                }
                    
                case RGLDocReaderActionMorePagesAvailable: {
                    break;
                }
                    
                default: {
                    break;
                }
            }
        }];
    }else{
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"document reader not ready"] callbackId:command.callbackId];
    }
}

- (void) recognizeImage:(CDVInvokedUrlCommand*)command {
    if([self.docReader isDocumentReaderIsReady]){
        NSMutableString *base64 = [NSMutableString stringWithString: [[command arguments] objectAtIndex:0]];
        if(![[[[command arguments] objectAtIndex:0] substringToIndex:10] isEqualToString:@"data:image"]){
            base64 = [NSMutableString stringWithFormat: @"%@%@", @"data:image/jpeg;base64,", [[command arguments] objectAtIndex:0]];
        }
        NSURL *url = [NSURL URLWithString:base64];
        NSData *imageData = [NSData dataWithContentsOfURL:url];
        UIImage *image = [UIImage imageWithData:imageData];
        NSLog(@"-----SCANNING------");
    [self.docReader recognizeImage:image cameraMode:false completion:^(enum RGLDocReaderAction action, RGLDocumentReaderResults * _Nullable result, NSString * _Nullable error) {
        CDVPluginResult* pluginResult;
        switch (action) {
            case RGLDocReaderActionCancel: {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Cancelled by user"];
                break;
            }
                
            case RGLDocReaderActionComplete: {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[JsonConstructor resultsToJsonString:result]];
                break;
            }
                
            case RGLDocReaderActionError: {
                [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
                break;
            }
                
            case RGLDocReaderActionProcess: {
                break;
            }
                
            case RGLDocReaderActionMorePagesAvailable: {
                break;
            }
                
            default: {
                break;
            }
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    }else{
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"document reader not ready"] callbackId:command.callbackId];
    }
}

-(void) recognizeImageWithCameraMode:(CDVInvokedUrlCommand*)command {
    if([self.docReader isDocumentReaderIsReady]){
        NSMutableString *base64 = [NSMutableString stringWithString: [[command arguments] objectAtIndex:0]];
        if(![[[[command arguments] objectAtIndex:0] substringToIndex:10] isEqualToString:@"data:image"]){
            base64 = [NSMutableString stringWithFormat: @"%@%@", @"data:image/jpeg;base64,", [[command arguments] objectAtIndex:0]];
        }
        NSURL *url = [NSURL URLWithString:base64];
        NSData *imageData = [NSData dataWithContentsOfURL:url];
        UIImage *image = [UIImage imageWithData:imageData];
        NSLog(@"-----SCANNING------");
        [self.docReader recognizeImage:image cameraMode:[[command arguments] objectAtIndex:1] completion:^(enum RGLDocReaderAction action, RGLDocumentReaderResults * _Nullable result, NSString * _Nullable error) {
            NSLog(@"DocumentReaderAction %ld", (long)action);
                
            CDVPluginResult* pluginResult;
            switch (action) {
                case RGLDocReaderActionCancel: {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Cancelled by user"];
                    break;
                }
                
                case RGLDocReaderActionComplete: {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[JsonConstructor resultsToJsonString:result]];
                    break;
                }
                    
                case RGLDocReaderActionError: {
                    [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error];
                    break;
                }
                
                case RGLDocReaderActionProcess: {
                    break;
                }
                
                case RGLDocReaderActionMorePagesAvailable: {
                    break;
                }
                
                default: {
                    break;
                }
            }}];
    }else{
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"document reader not ready"] callbackId:command.callbackId];
    }
}

- (void) runAutoUpdate:(CDVInvokedUrlCommand*)command {
    self.docReader = RGLDocReader.shared;
    [self.docReader runAutoUpdate:[[command arguments] objectAtIndex:0] progressHandler:^(NSProgress * _Nonnull progress) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"msg" : [NSString stringWithFormat:@"%@%.1f%@", @"Downloading database: ", progress.fractionCompleted * 100, @"%"]}];
        [result setKeepCallbackAsBool:YES];// NOT WORKING
        [self.commandDelegate sendPluginResult:result callbackId: @"prepareDatabaseProgressChangeEvent"];
    } completion:^(BOOL successful, NSString * _Nullable error) {
        CDVPluginResult* pluginResult;
        if (successful) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"database prepared"];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@[[NSString stringWithFormat:@"%@/%@", @"database preparation failed: ", error]]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void) setConfig:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult;
    if([self.docReader isDocumentReaderIsReady]){
        [RegulaConfig setConfig:[[command arguments] objectAtIndex:0] :self.docReader];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"document reader not ready"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void) getConfig:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult;
    if([self.docReader isDocumentReaderIsReady]){
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:[RegulaConfig getConfig:self.docReader] options:NSJSONWritingPrettyPrinted error:nil] encoding:NSUTF8StringEncoding]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"document reader not ready"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void) startRFIDReading:(CDVInvokedUrlCommand*)command {
//    [self.docReader startRFIDReading];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"in development"] callbackId:command.callbackId];
}

- (void) startRFIDReaderFromPresenter:(CDVInvokedUrlCommand*)command {
    //    [self.docReader startRFIDReaderFromPresenter];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"in development"] callbackId:command.callbackId];
}

- (void) deinitializeReader:(CDVInvokedUrlCommand*)command {
    [self.docReader deinitializeReader];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
}

- (void) selectedScenario:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[JsonConstructor generateScenario:self.docReader.selectedScenario]] callbackId:command.callbackId];
}


- (void) stopScanner:(CDVInvokedUrlCommand*)command {
    [self.docReader stopScanner:^(){[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];}];
}

- (void) startNewSession:(CDVInvokedUrlCommand*)command {
    [self.docReader startNewSession];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
}

- (void) startNewPage:(CDVInvokedUrlCommand*)command {
    [self.docReader startNewPage];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
}

- (void) getDocumentReaderIsReady:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self.docReader isDocumentReaderIsReady] ? @YES : @NO] callbackId:command.callbackId];
}

- (void) getAPIVersion:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[self.docReader version] api]] callbackId:command.callbackId];
}

- (void) getCoreVersion:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[self.docReader version] core]] callbackId:command.callbackId];
}

- (void) getCoreMode:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[self.docReader version] coreMode]] callbackId:command.callbackId];
}

- (void) getDatabaseID:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[[self.docReader version] database] databaseID]] callbackId:command.callbackId];
}

- (void) getDatabaseVersion:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[[self.docReader version] database] version]] callbackId:command.callbackId];
}

- (void) getDatabaseDate:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[[self.docReader version] database] date]] callbackId:command.callbackId];
}

- (void) getDatabaseDescription:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[[self.docReader version] database] databaseDescription]] callbackId:command.callbackId];
}

- (void) getDatabaseCountriesNumber:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat: @"%ld", (long)self.docReader.version.database.countriesNumber]] callbackId:command.callbackId];
}

- (void) getDatabaseDocumentsNumber:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat: @"%ld", (long)self.docReader.version.database.documentsNumber]] callbackId:command.callbackId];
}

- (void) getCameraSessionIsPaused:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[self.docReader isCameraSessionIsPaused] ? @YES : @NO] callbackId:command.callbackId];
}

- (void) setCameraSessionIsPaused:(CDVInvokedUrlCommand*)command {
    self.docReader.cameraSessionIsPaused = [[command arguments] objectAtIndex:0];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
}

- (void) getCanRFID:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@NO] callbackId:command.callbackId];
}

- (void) getAvailableScenarios:(CDVInvokedUrlCommand*)command {
    NSMutableArray *availableScenarios = [[NSMutableArray alloc] init];
    for(RGLScenario *scenario in [self.docReader availableScenarios]){
        [availableScenarios addObject:[JsonConstructor generateScenario:scenario]];
    }
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:availableScenarios options:NSJSONWritingPrettyPrinted error:nil] encoding:NSUTF8StringEncoding]] callbackId:command.callbackId];
}

- (void) getCanUseAuthenticator:(CDVInvokedUrlCommand*)command {// useAuthenticatorAvailable
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self.docReader isUseAuthenticatorAvailable] ? @YES : @NO] callbackId:command.callbackId];
}

- (void) getDocumentReaderStatus:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self.docReader documentReaderStatus]] callbackId:command.callbackId];
}

- (void) getLicenseExpiryDate:(CDVInvokedUrlCommand*)command {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setFormatterBehavior:NSDateFormatterBehaviorDefault];
    [formatter setDateStyle:NSDateFormatterShortStyle];
    [formatter setTimeStyle:NSDateFormatterNoStyle];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[formatter stringFromDate:[[self.docReader license] expiryDate]]] callbackId:command.callbackId];
}

- (void) getLicenseCountryFilter:(CDVInvokedUrlCommand*)command {
    if(self.docReader.license.countryFilter == nil)
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"nil"] callbackId:command.callbackId];
    else
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:[[self.docReader license] countryFilter] options:NSJSONWritingPrettyPrinted error:nil] encoding:NSUTF8StringEncoding]] callbackId:command.callbackId];
}

- (void) getLicenseMessage:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"nil"] callbackId:command.callbackId];
}

- (void) getSessionLogFolder:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:self.docReader.processParams.sessionLogFolder] callbackId:command.callbackId];
}

@end
