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
    _initFlag: false,
    _versionStr: "",
    _renderMode: "",
    _caseId: "",
    _sysBrowerType: "",
    _sysOS: "",
    init: function () {
        this._initFlag = true;
        this._dataObj = [];
        this._versionStr = window["CocosEngine"];

        this._renderMode = ED.getRenderStr();
        this._caseId = new Date().getTime();
        this._sysBrowerType = ED.sys.browserType;
        this._sysOS = ED.sys.os;
    },
    getXMLHttpRequest: function () {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
    },
    sendDataToNet: function () {
        var xhr = this.getXMLHttpRequest();

        xhr.open("POST", "server/saveData.php");
        //xhr.open("POST", "http://localhost:63342/server/saveData.php");
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                console.log("POST Response (100 chars):  \n" + xhr.responseText);
                console.log("Status: Got POST response! " + xhr.statusText);
            }
        };
        var dataJson = this._postHeadStr + "=" + JSON.stringify(this._dataObj);
        xhr.send(dataJson);
    },

    addData: function (timeData, nodeNum, drawCallNum) {
        if (!this._initFlag) {
            this.init();
        }
        var objData = {};
        objData[this._caseIdStr] = this._caseId;
        objData[this._timeHeadStr] = timeData.toFixed(3);
        objData[this._nodeHeadStr] = nodeNum;
        objData[this._renderModeStr] = this._renderMode;
        objData[this._systemVersionStr] = this._versionStr;
        objData[this._deviceModel] = "";
        objData[this._drawCallStr] = (0 | cc.g_NumberOfDraws);
        objData[this._browerTypeStr] = this._sysBrowerType;
        objData[this._sysOSStr] = this._sysOS;
        this._dataObj[this._dataObj.length] = objData;
    }
};