var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak", "/sitecore/shell/client/SpeakContrib/Assets/lib/core/1.2/Sitecore.Speak.Apps.js"], function(require, exports, Speak) {
    var AppModel = (function (_super) {
        __extends(AppModel, _super);
        function AppModel() {
            _super.apply(this, arguments);
        }
        // #endregion
        AppModel.prototype.initialized = function () {
            this.on("all", this.update, this);
            this.app.on("dialog:ok", this.handleDialogOk, this);
        };

        AppModel.prototype.update = function (data) {
            if (data.substring(0, 7) != "change:") {
                return;
            }

            var name = data.substr(7);
            var value = this[name];

            var postData = {
                AppModelKey: this.AppModelKey,
                Name: name,
                Value: value
            };

            var options = {
                data: postData,
                dataType: "text",
                type: "POST",
                url: "/sitecore/shell/client/SpeakContrib/Layouts/Renderings/Resources/AppModels/AppModel.ashx",
                error: $.proxy(this.error, this)
            };

            $.ajax(options);
        };

        AppModel.prototype.error = function (request, status) {
            // console.log(status);
        };

        AppModel.prototype.handleDialogOk = function () {
            if (window.opener == null) {
                return;
            }

            var data = {};

            // get property names from this.properties but read value from this
            var properties = this.properties;
            for (var n in properties) {
                var value = this[n];
                if (_.isString(value) || _.isNumber(value) || _.isBoolean(value)) {
                    data[n] = value;
                }
            }

            window.opener.postMessage(data, "*");
        };
        return AppModel;
    })(Speak.ControlBase);

    Sitecore.component(AppModel, "AppModel");
});
