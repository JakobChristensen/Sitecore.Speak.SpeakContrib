var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak"], function(require, exports, Speak) {
    var Debugger = (function (_super) {
        __extends(Debugger, _super);
        function Debugger() {
            _super.apply(this, arguments);
        }
        Debugger.prototype.initialized = function () {
            console.log("=== DEBUGGER STARTED ===");
            console.log("Sitecore");
            console.log(Sitecore);
            console.log("Sitecore.app");
            console.log(this.app);

            setTimeout($.proxy(this.initializeTrace, this), 1);
        };

        Debugger.prototype.initializeTrace = function () {
            for (var name in this.app) {
                var control = this.app[name];
                if (control == null || !control.attributes) {
                    continue;
                }

                control.on("all", this.logEvent, this);
            }
        };

        Debugger.prototype.logEvent = function (event, callback, context) {
            console.log("=== DEBUGGER EVENT ===");

            var name = "";
            if (callback && callback.attributes) {
                name = callback.attributes.name;
            }

            console.log("Event         : ", event);
            console.log("Callback.name : ", name);
            console.log("Callback      : ", callback);
            console.log("Context       : ", context);
        };
        return Debugger;
    })(Speak.ControlBase);

    Sitecore.component(Debugger, "Debugger");
});
