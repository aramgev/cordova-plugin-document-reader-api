#import <Foundation/Foundation.h>

typedef enum {
    RGLRFIDNotificationCodesError                        = 0x00010000,
    RGLRFIDNotificationCodesDocumentReady                = 0x00010001,
    
    RGLRFIDNotificationCodesReadProtocol4                = 0x00010003,
    RGLRFIDNotificationCodesReadProtocol3                = 0x0001000A,
    RGLRFIDNotificationCodesProgress                     = 0x0001000B,
    
    RGLRFIDNotificationCodesPaRequest                    = 0x00013000,  //val = (long)(TPassiveAuthenticationData *)
    
    RGLRFIDNotificationCodesTaStep                       = 0x0001000E,  //val = (long)(TTerminalAuthenticationData *)
    
    RGLRFIDNotificationCodesSmRequired                   = 0x0001000F,
    RGLRFIDNotificationCodesSmEtablished                 = 0x0001400F,
    
    RGLRFIDNotificationCodesISOError                     = 0x00011000,
    RGLRFIDNotificationCodesPCSCReaderDisconnected       = 0x00020000,
    RGLRFIDNotificationCodesPCSCReaderListChanged        = 0x00020001,
    RGLRFIDNotificationCodesPCSCReaderListChanging       = 0x00020008,
    
    RGLRFIDNotificationCodesPCSCBytesReceived            = 0x00020002,
    RGLRFIDNotificationCodesPCSCTotalReadingTime         = 0x00020003,  //ms
    RGLRFIDNotificationCodesPCSCDataReceived             = 0x00020004,
    RGLRFIDNotificationCodesPCSCBytesSent                = 0x00020005,
    RGLRFIDNotificationCodesPCSCTotalReadingSpeed        = 0x00020006,  //val = (int)((float)speed * 1000)  kB/s
    RGLRFIDNotificationCodesPCSCTotalProcessTime         = 0x00020007,  //ms
    
    RGLRFIDNotificationCodesPCSCExtLengthSupport         = 0x00020010,
    
    RGLRFIDNotificationCodesPaCertificateChain           = 0x00020011,  //val = false(start), true(end)
    RGLRFIDNotificationCodesPaCertificateChainItem       = 0x00020012,  //val = eRFID_CertificateType
    
    RGLRFIDNotificationCodesScenario                     = 0x00020020,  //val - VARIANT * с XML-строкой шага сценария чтения
    //при возврате помещается модифицированная XML-строка с
    //выбранными верхним приложением параметрами шага сценария чтения
    
    //составные коды нотификаций
    RGLRFIDNotificationCodesPCSCReadingDatagroup         = 0x00030000,  // + eRFID_DataFile_Type, val = false(start), true(end)
    RGLRFIDNotificationCodesPCSCFileNotFound             = 0x00040000,  // + eRFID_DataFile_Type
    RGLRFIDNotificationCodesPCSCEndOfFile                = 0x00050000,  // + eRFID_DataFile_Type
    RGLRFIDNotificationCodesPCSCFileAccessDenied         = 0x00060000,  // + eRFID_DataFile_Type
    RGLRFIDNotificationCodesPCSCApplicationSelected      = 0x00070000,  // + eRFID_Application_Type, val = result
    RGLRFIDNotificationCodesACProcedureStart             = 0x00080000,  // + eRFID_AccessControl_ProcedureType
    RGLRFIDNotificationCodesACProcedureFinish            = 0x00090000,  // + eRFID_AccessControl_ProcedureType, val = result
    RGLRFIDNotificationCodesPASecurityObjectCheck        = 0x000A0000,  // + eRFID_DataFile_Type, val = (RFID_Error_NotPerformed, RFID_Error_NoError, RFID_Error_Failed)
    RGLRFIDNotificationCodesPAFileCheck                  = 0x000B0000,  // + eRFID_DataFile_Type, val = result
    RGLRFIDNotificationCodesPCSCUpdatingDatagroup        = 0x000C0000,  // + eRFID_DataFile_Type
    RGLRFIDNotificationCodesAuxiliaryDataValidation      = 0x000D0000,  // + eRFID_AuxiliaryDataType, val = (RFID_Error_NoError, RFID_Error_Failed)
    
    RGLRFIDNotificationCodesRISectorID                   = 0x000E0000,  // + eRFID_SectorKeyType
    // val = (long)(TRF_FT_BYTES *) - ссылка на соответствующий
    // TRFID_AccessControlInfo.SpecificData текущего объекта сессии
    // при возврате из callback-функции в поле SectorID->nType
    // необходимо поместить true, если чип отозван
    // в этом случае для TRFID_AccessControlInfo будет сформирован правильный
    // код статуса при возврате из RFID_ExecuteCommand(RFID_Command_Session_AccessControlProc)
    // по умолчанию же чип не считается отозванным (SectorID->nType==0)
    
    RGLRFIDNotificationCodesBiometricsEmptyPlaceholder   = 0x000F0000  // + eRFID_DataFile_Type
    // DG3-4, использован пустой шаблон (0x53)
    // Supplement to Doc9303, R7-p1_v2_sIII_0057 и R7-p3_v2_sIII_0011
} RGLRFIDNotificationCodes NS_SWIFT_NAME(RFIDNotificationCodes);

typedef NS_ENUM(NSInteger, RGLRFIDDataFileType) {
    RGLRFIDDataFileTypeUnspecified                 = 0,
    RGLRFIDDataFileTypePassportDG1                 = 1,
    RGLRFIDDataFileTypePassportDG2                 = 2,
    RGLRFIDDataFileTypePassportDG3                 = 3,
    RGLRFIDDataFileTypePassportDG4                 = 4,
    RGLRFIDDataFileTypePassportDG5                 = 5,
    RGLRFIDDataFileTypePassportDG6                 = 6,
    RGLRFIDDataFileTypePassportDG7                 = 7,
    RGLRFIDDataFileTypePassportDG8                 = 8,
    RGLRFIDDataFileTypePassportDG9                 = 9,
    RGLRFIDDataFileTypePassportDG10                = 10,
    RGLRFIDDataFileTypePassportDG11                = 11,
    RGLRFIDDataFileTypePassportDG12                = 12,
    RGLRFIDDataFileTypePassportDG13                = 13,
    RGLRFIDDataFileTypePassportDG14                = 14,
    RGLRFIDDataFileTypePassportDG15                = 15,
    RGLRFIDDataFileTypePassportDG16                = 16,
    RGLRFIDDataFileTypePassportDG17                = 17,
    RGLRFIDDataFileTypePassportDG18                = 18,
    RGLRFIDDataFileTypePassportDG19                = 19,
    RGLRFIDDataFileTypePassportDG20                = 20,
    RGLRFIDDataFileTypePassportSOD                 = 21,
    RGLRFIDDataFileTypePassportCVCA                = 22,
    RGLRFIDDataFileTypePassportCOM                 = 23,
    RGLRFIDDataFileTypeIDDG1                       = 101,
    RGLRFIDDataFileTypeIDDG2                       = 102,
    RGLRFIDDataFileTypeIDDG3                       = 103,
    RGLRFIDDataFileTypeIDDG4                       = 104,
    RGLRFIDDataFileTypeIDDG5                       = 105,
    RGLRFIDDataFileTypeIDDG6                       = 106,
    RGLRFIDDataFileTypeIDDG7                       = 107,
    RGLRFIDDataFileTypeIDDG8                       = 108,
    RGLRFIDDataFileTypeIDDG9                       = 109,
    RGLRFIDDataFileTypeIDDG10                      = 110,
    RGLRFIDDataFileTypeIDDG11                      = 111,
    RGLRFIDDataFileTypeIDDG12                      = 112,
    RGLRFIDDataFileTypeIDDG13                      = 113,
    RGLRFIDDataFileTypeIDDG14                      = 114,
    RGLRFIDDataFileTypeIDDG15                      = 115,
    RGLRFIDDataFileTypeIDDG16                      = 116,
    RGLRFIDDataFileTypeIDDG17                      = 117,
    RGLRFIDDataFileTypeIDDG18                      = 118,
    RGLRFIDDataFileTypeIDDG19                      = 119,
    RGLRFIDDataFileTypeIDDG20                      = 120,
    RGLRFIDDataFileTypeIDDG21                      = 121,
    RGLRFIDDataFileTypeDLCOM                       = 150,
    RGLRFIDDataFileTypeDLDG1                       = 151,
    RGLRFIDDataFileTypeDLDG2                       = 152,
    RGLRFIDDataFileTypeDLDG3                       = 153,
    RGLRFIDDataFileTypeDLDG4                       = 154,
    RGLRFIDDataFileTypeDLDG5                       = 155,
    RGLRFIDDataFileTypeDLDG6                       = 156,
    RGLRFIDDataFileTypeDLDG7                       = 157,
    RGLRFIDDataFileTypeDLDG8                       = 158,
    RGLRFIDDataFileTypeDLDG9                       = 159,
    RGLRFIDDataFileTypeDLDG10                      = 160,
    RGLRFIDDataFileTypeDLDG11                      = 161,
    RGLRFIDDataFileTypeDLDG12                      = 162,
    RGLRFIDDataFileTypeDLDG13                      = 163,
    RGLRFIDDataFileTypeDLDG14                      = 164,
    RGLRFIDDataFileTypeDLSOD                       = 165,
    RGLRFIDDataFileTypeDLCE                        = 166,
    RGLRFIDDataFileTypeDLCVCA                      = 167,
    RGLRFIDDataFileTypePACECardAccess              = 200,
    RGLRFIDDataFileTypePACECardSecurity            = 201,
    RGLRFIDDataFileTypePACEChipSecurity            = 202,
    RGLRFIDDataFileTypeMIFAREData                  = 300,
    RGLRFIDDataFileTypeMIFAREValidity              = 301,
    RGLRFIDDataFileTypeAuthenticityV2              = 302,
    RGLRFIDDataFileTypeATR                         = 400,
    RGLRFIDDataFileTypeESignPK                     = 500,
    RGLRFIDDataFileTypeESignSignedData             = 501,
    RGLRFIDDataFileTypeCertificate                 = 600,
    RGLRFIDDataFileTypeMasterList                  = 601,
    RGLRFIDDataFileTypeDefectList                  = 602,
    RGLRFIDDataFileTypeDeviationList               = 603,
    RGLRFIDDataFileTypeAppDirectory                = 700,
    RGLRFIDDataFileTypeSession                     = 701,
    RGLRFIDDataFileTypeLogData                     = 702,
    RGLRFIDDataFileTypeChipProperties              = 703,
    RGLRFIDDataFileTypeUserDefined                 = 1000
} NS_SWIFT_NAME(RFIDDataFileType);

typedef enum {
    RGLRFIDErrorCodesNoError                          = 0x00000001,
    RGLRFIDErrorCodesAlreadyDone                      = 0x00000002,
    
    RGLRFIDErrorCodesFailed                           = 0xffffffff,
    
    //  RFID_Error_GraphManager                     = 0x80010000,
    RGLRFIDErrorCodesNoChipDetected                   = 0x80010001,
    RGLRFIDErrorCodesNotAvailable                     = 0x80010002,
    
    RGLRFIDErrorCodesInvalidParameter                 = 0x80010004,
    RGLRFIDErrorCodesNotInitialized                   = 0x80010005,
    RGLRFIDErrorCodesNotEnoughMemory                  = 0x80010006,
    RGLRFIDErrorCodesInvalidDirectory                 = 0x80010008,
    RGLRFIDErrorCodesUnknownCommand                   = 0x80010009,
    RGLRFIDErrorCodesFileIOError                      = 0x8001000A,
    RGLRFIDErrorCodesBusy                             = 0x8001000B,
    RGLRFIDErrorCodesOldFirmware                      = 0x8001000C,
    
    RGLRFIDErrorCodesPCSCFailed                      = 0x80020000,
    RGLRFIDErrorCodesPCSCReaderNotAvailable          = 0x80020001,
    RGLRFIDErrorCodesPCSCCantConnectCard             = 0x80020002,
    RGLRFIDErrorCodesPCSCCardIsNotConnected          = 0x80020003,
    RGLRFIDErrorCodesPCSCOperationCancelled          = 0x80020004,
    RGLRFIDErrorCodesPCSCCardIsBusy                  = 0x80020005,
    RGLRFIDErrorCodesPCSCFailedSCard                 = 0x80020006,
    RGLRFIDErrorCodesPCSCExtLeFailed                 = 0x80020010,  //ошибка операции чтения с исп-ем команд расширенной длины
    
    //необходима активация Secure Messaging
    RGLRFIDErrorCodesLayer6SecurityManager              = 0x86000000,
    
    //"Application not found"
    RGLRFIDErrorCodesLayer6AppSelectionFailure          = 0x86000001,   // ISO7816_A_03 "Application selection failure"
    
    //"BAC authentication failure"
    RGLRFIDErrorCodesLayer6MutualAuthMacFail            = 0x86000100,   // ISO7816_B_01 "Mutual authentication MAC failure"
    RGLRFIDErrorCodesLayer6MutualAuthEncFail            = 0x86000101,   // ISO7816_B_02 "Mutual authentication encryption failure"
    RGLRFIDErrorCodesLayer6MutualAuthFailure            = 0x86000102,   // ISO7816_B_03 "Mutual authentication failure"
    RGLRFIDErrorCodesLayer6MutualAuthFailureData        = 0x86000103,
    
    //"Secure messaging failure"
    RGLRFIDErrorCodesLayer6SmDo8eMissing                 = 0x86000200,   // "SM failure – MAC missing"
    RGLRFIDErrorCodesLayer6SmDo87Missing                 = 0x86000201,   // "SM failure – cryptogram missing"
    RGLRFIDErrorCodesLayer6SmDo99Missing                 = 0x86000202,   // "SM failure – secured status bytes missing"
    RGLRFIDErrorCodesLayer6SmMacIncorrect                = 0x86000203,   // "SM failure – incorrect MAC"
    RGLRFIDErrorCodesLayer6SmDo87Incorrect               = 0x86000204,   // "SM failure – incorrect cryptogram"
    //RFID_LAYER6_SM_DO85_TLV_INCORRECT           = 0x8600000A,   // неправильный формат DO85 (не TLV)
    
    //ошибки выполнения отдельных APDU
    RGLRFIDErrorCodesLayer6NonTlvResponseData           = 0x86000300,   // данные от чипа на команду чтения B1 не обернуты в тэги 0x53 или 0х73
    RGLRFIDErrorCodesLayer6WrongRndIccLength            = 0x86000301,   // неверная длина данных от чипа на команду APDU_INS_GET_CHALLENGE
    RGLRFIDErrorCodesLayer6IntAuthFailure               = 0x86000302,   // ошибка команды APDU_INS_INTERNAL_AUTHENTICATE
    RGLRFIDErrorCodesLayer6MseSetKatFailure             = 0x86000303,   // ошибка команды MSE:Set KAT (Key Agreement Template)
    RGLRFIDErrorCodesLayer6MseSetDstFailure             = 0x86000304,   // ошибка команды MSE:Set DST (выбор ключа проверки подписи TA сертификата)
    RGLRFIDErrorCodesLayer6PsoCertificateFailure        = 0x86000305,   // ошибка команды проверки сертификата
    RGLRFIDErrorCodesLayer6MseSetAtFailure              = 0x86000306,   // ошибка команды MSE:Set AT
    RGLRFIDErrorCodesLayer6GetChallengeFailure          = 0x86000307,   // ошибка команды GET CHALLENGE
    RGLRFIDErrorCodesLayer6ExtAuthFailure               = 0x86000308,   // ошибка команды APDU_INS_INTERNAL_AUTHENTICATE (External Authentication)
    
    RGLRFIDErrorCodesLayer6GeneralAuthFailure           = 0x86000309,   // ошибка команды APDU_INS_INTERNAL_AUTHENTICATE (External Authentication)
    
    //общие ошибки чтения файлов
    RGLRFIDErrorCodesLayer6FileNotFound                 = 0x80006A82,   // "File selection failure", "File not found"
    RGLRFIDErrorCodesLayer6FileEof1                     = 0x80006282,   // "Reading beyond EOF",     "Unexpected EOF”
    RGLRFIDErrorCodesLayer6FileEof2                     = 0x80006B00,   // "Reading beyond EOF",     "Unexpected EOF”
    
    //детали базовых ошибок RFID_LAYER6_MSE_SET_AT_FAILURE и RFID_LAYER6_GENERAL_AUTH_FAILURE
    RGLRFIDErrorCodesLayer6IncorrectParams              = 0x80006A80,   // терминал не поддерживает исп-е указанного типа пароля
    // указанный алгоритм не поддерживается
    // ошибка инициализации
    RGLRFIDErrorCodesLayer6NoReferenceData              = 0x80006A88,   //
    
    RGLRFIDErrorCodesLayer6PwdSuspend                   = 0x800063C1,   // PACE
    RGLRFIDErrorCodesLayer6PwdBlocked                   = 0x800063C0,   // PACE
    RGLRFIDErrorCodesLayer6PwdDeactivated               = 0x80006283,   // PACE
    
    RGLRFIDErrorCodesLayer6PwdBlocked2                  = 0x80006983,   // PACE (ответ General Authenticate), eSign операции
    RGLRFIDErrorCodesLayer6PwdDeactivated2              = 0x80006984,   // PACE (ответ General Authenticate),
    // eSign операции :
    //  - eSign-PIN terminated (при RFID_Command_Session_eSign_ChangePIN)
    //  - private key is not terminated (при RFID_Command_Session_eSign_CreatePIN)
    RGLRFIDErrorCodesLayer6PwdSuspend2                  = 0x80006985,   // PACE (ответ General Authenticate), eSign операции
    
    RGLRFIDErrorCodesLayer6PwdFailed                    = 0x801063C0,   // + N (оставшееся к-во попыток, >1)
    
    
    //**********************************************************************************************************
    // SDK 3.0
    //**********************************************************************************************************
    //-----------------------------------------------------------------------------
    // ошибки команд сессионной работы
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesNotPerformed                          = 0x83000000, //операция не проводилась (в контексте)
    RGLRFIDErrorCodesSessionIsClosed                       = 0x83000001, //сессия закрыта, операция невозможна
    RGLRFIDErrorCodesSessionTerminalUnsupportedOperation   = 0x83000002, //операция не поддерживается текущим типом терминала
    
    //-----------------------------------------------------------------------------
    // тип терминала
    //-----------------------------------------------------------------------------
    //ошибки команды RFID_Command_Session_SetTerminalType
    RGLRFIDErrorCodesSessionTerminalTypeUnknown            = 0x83000010, //неизвестный тип терминала
    RGLRFIDErrorCodesSessionTerminalTypeBadCertificate     = 0x83000011, //ошибка чтения/разбора данных сертификата терминала
    
    //ошибки команд работы с открытой сессией
    RGLRFIDErrorCodesSessionTerminalTypeNotSet             = 0x83000012, //тип терминала не был установлен для текущей сессии
    
    //-----------------------------------------------------------------------------
    // тип процедуры проверки подлинности
    //-----------------------------------------------------------------------------
    //ошибки команды RFID_Command_Session_SetProcedureType
    RGLRFIDErrorCodesSessionProcedureTypeUnknown           = 0x83000013, //неизвестный тип процедуры проверки подлинности
    RGLRFIDErrorCodesessionProcedureTypeUnsupported        = 0x83000014, //терминал установленного типа не поддерживает данный тип процедуры
    
    //ошибки команд работы с открытой сессией
    RGLRFIDErrorCodesSessionProcedureTypeNotSet            = 0x83000015, //тип процедуры проверки подлинности не был установлен
    
    //-----------------------------------------------------------------------------
    // ключ доступа к данным
    //-----------------------------------------------------------------------------
    //ошибки команды RFID_Command_Session_SetAccessKey
    RGLRFIDErrorCodesSessionAccessKeyUnknownType           = 0x83000016, //неизвестный тип ключа доступа
    RGLRFIDErrorCodesSessionAccessKeyUnsupportedSMType     = 0x83000017, //неподдерживаемый тип процедуры доступа (базовый SM)
    RGLRFIDErrorCodesSessionAccessKeyIncorrectSMType       = 0x83000018, //процедура доступа не допускает исп-е указанного типа ключа
    RGLRFIDErrorCodesSession_AccessKey_Restricted          = 0x83000019, //тип ключа не поддерживается указанным ранее типом терминала
    //либо недостаточные права на его использование
    RGLRFIDErrorCodesSessionAccessKeyIncorrectData         = 0x8300001A, //некорректные данные самого ключа (пустая либо нулевая строка)
    
    //ошибки команд работы с открытой сессией
    RGLRFIDErrorCodesSessionAccessKeyNotSet                = 0x8300001B, //ключ не был установлен для текущей сессии (требуется SM)
    
    //-----------------------------------------------------------------------------
    // операции с паролями eID
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionPwdManagementNotAuthorized     = 0x8300001C, //операция запрещена для текущего терминала
    
    //-----------------------------------------------------------------------------
    // процедура защищённого доступа к данным
    //-----------------------------------------------------------------------------
    //ошибки команды RFID_Command_Session_AccessControlProc
    RGLRFIDErrorCodesSessionAccessControlUnknownType       = 0x83000020, //неизвестный тип процедуры
    RGLRFIDErrorCodesSessionAccessControlRequiresSM        = 0x83000021, //требуется предварительное открытие защищённой сессии (PACE либо BAC)
    RGLRFIDErrorCodesSessionAccessControlRequiresPACE      = 0x83000022, //требуется предварительное открытие защищённой сессии (PACE)
    RGLRFIDErrorCodesSessionAccessControlRequiresCAKeys    = 0x83000023, //требуется выполнение предварительного шага TA -
    //генерация ключей CA (EAC v2) (TCA_SetupParams *)->TA_preliminary_step
    RGLRFIDErrorCodesSessionAccessControlRequiresTA        = 0x83000024, //требуется предварительное проведение TA
    RGLRFIDErrorCodesSessionAccessControlRequiresCA        = 0x83000025, //требуется предварительное проведение CA
    
    RGLRFIDErrorCodesSessionAccessControlIncorrectOptionCA = 0x83000026, //несоответствие выбранного варианта проведения CA на предварительном
    //и основном этапах (TCA_SetupParams *)->nOptionIdx
    //т.е. ключи были сгенерированы с другими параметрами
    
    //отличные от RFID_Error_Failed коды нужны для работы с ReadProtocol4(), где невозможно анализировать
    //состояние объекта сессии в процессе работы, а можно ориентироваться только на общий код возврата
    //точная причина регистрируется в accessControlInfo->Status и в accessControlInfo->Notifications
    //(для RI - в TRFID_AccessControlInfo.SpecificData.nType содержится признак отзыва чипа)
    RGLRFIDErrorCodesSessionAccessControlCaFailed         = 0x83000027, //CA не прошла
    RGLRFIDErrorCodesSessionAccessControlTaFailed         = 0x83000028, //TA не прошла
    RGLRFIDErrorCodesSessionAccessControlAaFailed         = 0x83000029, //AA не прошла
    RGLRFIDErrorCodesSessionAccessControlRiFailed         = 0x8300002A, //RI не прошла
    
    //-----------------------------------------------------------------------------
    // процедура пассивной аутентификации
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionPaSignatureCheckFailed         = 0x83000030, //проверка подписи объекта защиты (SO) не прошла
    RGLRFIDErrorCodesSessionPaHashCheckFailed              = 0x83000031, //проверка хэша файла не прошла
    
    //-----------------------------------------------------------------------------
    // проверка вспомогательных пользовательских данных
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionInvalidAuxDataDateOfExpiry     = 0x83000040,
    RGLRFIDErrorCodesSessionInvalidAuxDataDateOfBirth      = 0x83000041,
    RGLRFIDErrorCodesSessionInvalidAuxDataCommunityID      = 0x83000042,
    
    //-----------------------------------------------------------------------------
    // eSign
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionESignRequiresAppSelection      = 0x83000050, //для доступа к функциям требуется выбор приложения eSign
    RGLRFIDErrorCodesSessionESignPinNotSet                 = 0x83000051, //необходимо установить значение eSign-PIN для текущей сессии
    RGLRFIDErrorCodesSessionESignPinNotVerified            = 0x83000052, //необходимо выполнить верификацию eSign-PIN для текущей сессии
    
    //-----------------------------------------------------------------------------
    // загрузка данных сессии
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionIncorrectData                  = 0x83000060,
    
    //-----------------------------------------------------------------------------
    // групповые коды критических ошибок - + file ID из eRFID_DataFile_Type
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesSessionFileNotEnoughData              = 0x83010000, //нехватает данных для создания объекта ASN.1
    //(file->Notifications содержит errLDS_ASN_NotEnoughData)
    RGLRFIDErrorCodesSessionFileIncorrectData              = 0x83020000, //неверные данные для создания объекта ASN.1
    //(file->Notifications содержит errLDS_ASN_IncorrectData)
    RGLRFIDErrorCodesSessionFileUnexpectedData             = 0x83030000, //несоответствие структуры объекта описанию ASN.1
    //(file->Notifications содержит errLDS_ASN_Contents_UnexpectedData)
    RGLRFIDErrorCodesSessionFileContentsUnexpectedData     = 0x83040000, //несоответствие структуры объекта описанию в контексте файла
    //(file->Notifications содержит errLDS_DG_Contents_UnexpectedData)
    RGLRFIDErrorCodesSessionFileWrongTag                   = 0x83050000, //неверное значение тэга группы данных
    //(file->Notifications содержит errLDS_DG_WrongTag)
    RGLRFIDErrorCodesSessionFileCantUseData                = 0x83060000, //использование прочитанных данных невозможно
    //(например, реакция на dplStrictISO при наличии каких-то замечаний)
    //(file->Notifications содержит код конкретной ошибки)
    RGLRFIDErrorCodesSessionFileCantReadData               = 0x83070000, //ошибка физического чтения данных
    RGLRFIDErrorCodesSessionFileAccessDenied               = 0x83080000, //ошибка доступа к защищённым группам данных
    
    //-----------------------------------------------------------------------------
    // новые команды SDK v3.5 - настройка/работа по Layer1-4
    //-----------------------------------------------------------------------------
    RGLRFIDErrorCodesLayer34NoError                         = 0x84000000,   //
    RGLRFIDErrorCodesLayer34TimeOut                         = 0x84010000,   //time-out
    RGLRFIDErrorCodesLayer34Collision                       = 0x84020000,   //collision
    RGLRFIDErrorCodesLayer34CRC                             = 0x84030000,   //BCC, CRC (software check)
    RGLRFIDErrorCodesLayer34DataIntegrity                   = 0x84040000,   //parity, CRC (hardware check)
    RGLRFIDErrorCodesLayer34DataLength                      = 0x84050000,   //неверное к-во принятых байт (по контексту)
    RGLRFIDErrorCodesLayer34RFU                             = 0x84060000,   //использование RFU данных
    RGLRFIDErrorCodesLayer34CollisionTooMany                = 0x84070000,   //слишком много итераций в цикле антиколлизии
    RGLRFIDErrorCodesLayer34ProtocolB                       = 0x84080000,   //ошибки протокола 14443B (stop-bit, SOF, EOF)
    RGLRFIDErrorCodesLayer34DataContents                    = 0x84090000,   //неверное содержимое данных (по значению)
    RGLRFIDErrorCodesLayer34Protocol                        = 0x840A0000,   //несоблюдение протокола (неверный тип блока, содержимое ответа)
    RGLRFIDErrorCodesLayer34GlobalTimeOut                   = 0x840B0000,   //time-out
    RGLRFIDErrorCodesLayer34MifareAuth                      = 0x840C0000   //MIFARE Authentication
} RGLRFIDErrorCodes NS_SWIFT_NAME(RFIDErrorCodes);

typedef NS_ENUM(NSInteger, RGLRFIDCertificateType) {
  RGLRFIDCertificateTypeUndefined  = 0,
  RGLRFIDCertificateTypeCSCA       = 1,
  RGLRFIDCertificateTypeCSCALink   = 2,
  RGLRFIDCertificateTypeDS         = 3,
  RGLRFIDCertificateTypeMLS        = 4,
  RGLRFIDCertificateTypeDevLS      = 5,
  RGLRFIDCertificateTypeDefLS      = 6
} NS_SWIFT_NAME(RFIDCertificateType);

NS_SWIFT_NAME(RFIDNotify)
@interface RGLRFIDNotify: NSObject

@property(nonatomic, assign, readonly) UInt32 code;
@property(nonatomic, assign, readonly) double value;
@property(nonatomic, assign, readonly) UInt32 aCode;
@property(nonatomic, assign, readonly) UInt32 number;

- (instancetype)initWithCode:(UInt32)code number:(UInt32)number;

+ (NSString *)rfidDataFileTypeName:(RGLRFIDDataFileType)type;
+ (NSString *)rfidErrorCodesName:(RGLRFIDErrorCodes)errorCode;

@end
