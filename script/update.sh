# Example
# sh ./update.sh cordova/cordova-plugin-document-reader-api/ Release  Release + + Beta +
#1) path to module
#2) ios api branch(Beta or Release)
#3) android api branch(Beta or Release)
#4) ios api version
#5) android api version
#6) module branch(beta or release, if beta, module name will be changed to cordova-plugin-document-reader-api-beta in package.json)
#7) module version
Base_path=$1
Branch_ios=$2
Branch_android=$3
Version_ios=$4
Version_android=$5
Destination_type=$6
Cordova_module_version=$7
PODS_URL_RELEASE='https://pods.regulaforensics.com/DocumentReader/'
PODS_URL_BETA='https://pods.regulaforensics.com/DocumentReaderBeta/'
MAVEN_URL_RELEASE='http://maven.regulaforensics.com/RegulaDocumentReader/com/regula/documentreader/api/'
MAVEN_URL_BETA='http://maven.regulaforensics.com/RegulaDocumentReader/Beta/com/regula/documentreader/api/'
if [ "$Branch_ios" == 'Beta' ]; then
    STATE_IOS='Beta'
    URL_IOS=$PODS_URL_BETA
else
	if [ "$Branch_ios" == 'Release' ]; then
		STATE_IOS=''
		URL_IOS=$PODS_URL_RELEASE
	else
		echo "Incorrect ios type(must be Beta or Release)"
		exit 1
	fi
fi
if [ "$Branch_android" == 'Beta' ]; then
    URL_ANDROID=$MAVEN_URL_BETA
else
	if [ "$Branch_android" == 'Release' ]; then
		URL_ANDROID=$MAVEN_URL_RELEASE
	else
		echo "Incorrect android type(must be Beta or Release)"
		exit 1
	fi
fi
if [ "$Destination_type" == 'Beta' ]; then
    DEST_TYPE='-beta'
else
	if [ "$Destination_type" == 'Release' ]; then
		DEST_TYPE=''
	else
		echo "Incorrect destination type(must be Beta or Release)"
		exit 1
	fi
fi 

PKG_NAME="cordova-plugin-document-reader-api$DEST_TYPE"
if [ "$Cordova_module_version" == '+' ]; then
	LatestModuleVersion="$(sudo npm view $PKG_NAME version)"
	Cordova_module_version="${LatestModuleVersion%.*}.$((${LatestModuleVersion##*.}+1))"
fi
if [ "$Cordova_module_version" == '.1' ]; then
	Cordova_module_version='0.0.1'
    ModuleIsNew='(new)'
fi
if [ "$Version_ios" == '+' ]; then
    /usr/local/bin/wget -O index.html "$URL_IOS"
    if [[ $? -ne 0 ]]; then
        echo "Failed on wget call for $URL_IOS"
    exit 1
    fi
    size=$(xmllint --html -xpath "count(//a)" index.html)
    count=$(( size - 2 ))
    v=$(xmllint --html -xpath "//html/body/table/tr[$count]/td[2]/a/text()" index.html)
    Version_ios=${v:0:${#v}-1}
    rm index.html
fi
if [ "$Version_android" == '+' ]; then
    MAVEN_MATADATA="$URL_ANDROID/maven-metadata.xml"
    /usr/local/bin/wget -O maven-metadata.xml $MAVEN_MATADATA
    if [[ $? -ne 0 ]]; then
        echo "Failed on wget call for $MAVEN_MATADATA"
    exit 1
    fi
    Version_android=$(xmllint --xpath 'string(//metadata/versioning/release)' maven-metadata.xml)
    rm maven-metadata.xml
fi

/usr/local/bin/wget -O DocumentReaderAndroidTemp.zip $URL_ANDROID$Version_android/api-$Version_android.aar
if [[ $? -ne 0 ]]; then
    echo "Failed on wget call for android: $URL_ANDROID$Version_android/api-$Version_android.aar"
    exit 1
fi
rm DocumentReaderAndroidTemp.zip

cd "$Base_path/script/"

cp -R documentreader.gradle "$Base_path/src/android/"
sed -i -e "s/version_place_holder/$Version_android/" "$Base_path/src/android/documentreader.gradle"
rm -fr "$Base_path/src/android/documentreader.gradle-e"

cp -R plugin.xml "$Base_path/"
sed -i -e "s/pkg_name_place_holder/$PKG_NAME/" "$Base_path/plugin.xml"
sed -i -e "s/version_place_holder/$Cordova_module_version/" "$Base_path/plugin.xml"
rm -fr "$Base_path/plugin.xml-e"

/usr/local/bin/wget -O DocumentReader.zip $URL_IOS$Version_ios/DocumentReader$STATE_IOS-$Version_ios.zip
if [[ $? -ne 0 ]]; then
    echo "Failed on wget call for ios: $URL_IOS$Version_ios/DocumentReader$STATE_IOS-$Version_ios.zip"
    exit 1
fi
cp DocumentReader.zip "$Base_path/src/ios/"
rm DocumentReader.zip
cd "$Base_path/src/ios/"
rm -fr DocumentReader.framework
unzip -P pcp9100 DocumentReader.zip
rm -fr __MACOSX
rm DocumentReader.zip

cd "$Base_path"
/usr/local/bin/jq --arg PKG_NAME "$PKG_NAME" '.name = $PKG_NAME' package.json > tmp.$$.json && mv tmp.$$.json package.json
/usr/local/bin/jq --arg Cordova_module_version "$Cordova_module_version" '.version = $Cordova_module_version' package.json > tmp.$$.json && mv tmp.$$.json package.json
/usr/local/bin/jq --arg PKG_NAME "$PKG_NAME" '.cordova.id = $PKG_NAME' package.json > tmp.$$.json && mv tmp.$$.json package.json

sudo /usr/local/bin/npm publish

echo ''
echo 'SUCCESS!'
echo ''
echo "Android: $Branch_android $Version_android"
echo "IOS: $Branch_ios $Version_ios"
echo "Module: $Destination_type $Cordova_module_version$ModuleIsNew"
echo ''
