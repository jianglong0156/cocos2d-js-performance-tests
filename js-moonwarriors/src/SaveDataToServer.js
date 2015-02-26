/**
 * Created by leo on 2015/1/26.
 */

var SaveDataToServer = {
    _postHeadStr: "testData",
    _caseIdStr: "caseID",
    _timeHeadStr: "timeDate",
    _nodeHeadStr: "nodeNum",
    _renderModeStr: "renderMode",
    _systemVersionStr: "systemVersion",
    _deviceModel: "deviceModel",
    _drawCallStr: "drawCallNum",
    _browerTypeStr: "browerType",
    _sysOSStr: "sysOS",
    _dataObj: [],
    _baseData:{},
    _initFlag: false,
    _versionStr: "",
    _renderMode: "",
    _caseId: "",
    _sysBrowerType: "",
    _sysOS: "",
    _nativeUrl:"",
    init: function () {
        this._initFlag = true;
        this._dataObj = [];
        this._versionStr = window["CocosEngine"];

        this._renderMode = ED.getRenderStr();
        this._caseId = new Date().getTime();
        this._sysBrowerType = ED.sys.browserType;
        this._sysOS = ED.sys.os;

        this._baseData[this._caseIdStr] = this._caseId;
        this._baseData[this._renderModeStr] = this._renderMode;
        this._baseData[this._systemVersionStr] = this._versionStr;
        this._baseData[this._deviceModel] = "";
        this._baseData[this._sysOSStr] = this._sysOS;
        this._baseData[this._browerTypeStr] = this._sysBrowerType;
        this._baseData["testStartSec"] = MW.calcStartTime;
        this._baseData["testSec"] = MW.calcTimeOfDuration;
        this._baseData["enemyMax"] = Level1.enemyMax;
        this._baseData["enemyOnceCreateNum"] = Level1.enemies[0].Types.length;
        this._dataObj[this._dataObj.length] = this._baseData;

        if (cc.isNative)
        {
            this._nativeUrl = "http://benchmark.cocos2d-x.org/moonTest/moonWebgl/";
        }
        else
        {
            this._nativeUrl = "";
        }

    },
    sendDataToNet: function () {
        var self = this;
        var postDataStr = this._postHeadStr + "=" + JSON.stringify(this._dataObj);
        this.sendPostData(postDataStr, self._nativeUrl + "server/saveData.php", function(){
            if (cc.isNative)
            {
                if(cc.sys.os == cc.sys.OS_ANDROID){
                    var stringModel = jsb.reflection.callStaticMethod("org/cocos2dx/js_moonwarriors/DeviceHelper", "getDeviceModel", "()Ljava/lang/String;");
                    var postDataStr = "testCaseId=" + this._caseId + "&deviceModel=" + stringModel;
                    this.sendPostData(postDataStr, self._nativeUrl + "server/recordDevice.php", function(){
                        g_sharedGameLayer.hideAll();
                    });
                }
            }
            else
            {
                g_sharedGameLayer.hideAll();
                self.addEventWithHtml();
            }
        });
    },

    addData: function (timeData, nodeNum, drawCallNum) {
        if (!this._initFlag) {
            this.init();
        }
        var objData = {};
        objData[this._caseIdStr] = this._caseId;
        objData[this._timeHeadStr] = timeData.toFixed(3);
        objData[this._nodeHeadStr] = nodeNum;
        objData[this._drawCallStr] = (0 | cc.g_NumberOfDraws);
        this._dataObj[this._dataObj.length] = objData;
    },

    sendPostData: function (postDataStr, url, callback) {
        var xhr = ED.getXMLHttpRequest();
        xhr.open("POST", url);

        //xhr.open("POST", "http://localhost:63342/server/saveData.php");
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                callback();
            }
        };
        //alert(postDataStr);
        xhr.send(postDataStr);
    },
    addEventWithHtml:function()
    {
        document.getElementById("inputForm").style.display = "block";
        document.getElementById("inputForm").getElementsByClassName("testCaseId")[0].value = this._caseId;
    }
};