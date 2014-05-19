var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak"], function(require, exports, Speak) {
    var AjaxDataSource = (function (_super) {
        __extends(AjaxDataSource, _super);
        function AjaxDataSource() {
            _super.apply(this, arguments);
        }
        AjaxDataSource.prototype.initialized = function () {
            var _this = this;
            this.on("change:Url", function () {
                return _this.send();
            });
        };

        AjaxDataSource.prototype.send = function () {
            this.pendingRequests++;
            this.IsBusy = true;

            var t = this.Type;
            if (!t) {
                t = "GET";
            }

            var options = {
                data: this.Data,
                dataType: "json",
                timeout: this.Timeout,
                type: t,
                url: this.Url,
                complete: $.proxy(this.complete, this),
                error: $.proxy(this.error, this),
                success: $.proxy(this.success, this)
            };

            $.ajax(options);
        };

        AjaxDataSource.prototype.complete = function (request, status) {
            var trigger = this.CompleteTrigger;
            if (trigger) {
                this.app.trigger(trigger, request);
            }
        };

        AjaxDataSource.prototype.error = function (request, status) {
            this.Json = null;
            this.HasError = true;
            this.ErrorText = status;

            this.pendingRequests--;
            if (this.pendingRequests <= 0) {
                this.IsBusy = false;
                this.pendingRequests = 0;
            }
        };

        AjaxDataSource.prototype.success = function (json) {
            this.Json = json;
            this.HasError = false;
            this.ErrorText = null;

            this.pendingRequests--;
            if (this.pendingRequests <= 0) {
                this.IsBusy = false;
                this.pendingRequests = 0;
            }
        };
        return AjaxDataSource;
    })(Speak.ControlBase);

    Sitecore.component(AjaxDataSource, "AjaxDataSource");
});
