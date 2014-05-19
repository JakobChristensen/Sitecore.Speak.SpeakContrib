var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak", "/sitecore/shell/client/SpeakContrib/Assets/lib/core/1.2/Sitecore.Speak.Apps.js"], function(require, exports, Speak) {
    var PageModel = (function (_super) {
        __extends(PageModel, _super);
        function PageModel() {
            _super.apply(this, arguments);
        }
        // #endregion
        PageModel.prototype.initialized = function () {
            this.app.on("dialog:ok", this.handleDialogOk, this);
        };

        PageModel.prototype.handleDialogOk = function () {
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
        return PageModel;
    })(Speak.ControlBase);

    Sitecore.component(PageModel, "PageModel");
});
