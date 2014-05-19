var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak"], function(require, exports, Speak) {
    var ActionManager = (function (_super) {
        __extends(ActionManager, _super);
        function ActionManager() {
            _super.apply(this, arguments);
        }
        ActionManager.prototype.initialized = function () {
            this.app.on("all", this.fire, this);

            this.prefix = (this.Prefix || "action") + ":";
        };

        ActionManager.prototype.fire = function (data, args) {
            if (data.substring(0, this.prefix.length) != this.prefix) {
                return;
            }

            var category = this.Category || "client";

            var script = "/-/speak/v1/" + category + "/" + data.substr(7) + ".js";

            require([script], function (action) {
                action(args);
            });
        };
        return ActionManager;
    })(Speak.ControlBase);

    Sitecore.component(ActionManager, "ActionManager");
});
