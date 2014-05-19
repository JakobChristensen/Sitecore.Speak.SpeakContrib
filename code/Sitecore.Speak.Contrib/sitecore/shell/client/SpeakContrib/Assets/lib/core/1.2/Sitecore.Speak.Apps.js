var SpeakApps;
(function (SpeakApps) {
    var PageBase = (function () {
        function PageBase(pageModelKey) {
            if (pageModelKey == null) {
                pageModelKey = Math.floor((1 + Math.random()) * 0x10000).toString(16);
            }

            this.PageModelKey = pageModelKey;
        }
        PageBase.prototype.showDialog = function (completed, dialogOptions) {
            var _this = this;
            var params = this.getOptions();
            params.push({ name: "PageModelKey", value: this.PageModelKey });

            $(window).one("message", function (e) {
                return _this.parseMessage(e, completed);
            });

            SpeakApps.AppHost.Windows.showModalDialog(this.Url + "?" + $.param(params), dialogOptions);
        };

        PageBase.prototype.open = function (completed, target, features, replace) {
            var _this = this;
            var params = this.getOptions();
            params.push({ name: "PageModelKey", value: this.PageModelKey });

            $(window).one("message", function (e) {
                return _this.parseMessage(e, completed);
            });

            SpeakApps.AppHost.Windows.open(this.Url + "?" + $.param(params), target, features, replace);
        };

        PageBase.prototype.getOptions = function () {
            throw "Abstract method called";
        };

        PageBase.prototype.parseMessage = function (e, completed) {
            var data = e.originalEvent.data;
            for (var n in data) {
                this[n] = data[n];
            }

            completed(this);
        };
        return PageBase;
    })();
    SpeakApps.PageBase = PageBase;
})(SpeakApps || (SpeakApps = {}));
var SpeakApps;
(function (SpeakApps) {
    var AppBase = (function () {
        function AppBase(appModelKey) {
            if (appModelKey == null) {
                appModelKey = Math.floor((1 + Math.random()) * 0x10000).toString(16);
            }

            this.AppModelKey = appModelKey;
        }
        AppBase.prototype.showDialog = function (completed, dialogOptions) {
            var _this = this;
            var params = this.getOptions();
            params.push({ name: "AppModelKey", value: this.AppModelKey });

            $(window).one("message", function (e) {
                return _this.parseMessage(e, completed);
            });

            SpeakApps.AppHost.Windows.showModalDialog(this.Url + "?" + $.param(params), dialogOptions);
        };

        AppBase.prototype.open = function (completed, target, features, replace) {
            var _this = this;
            var params = this.getOptions();
            params.push({ name: "AppModelKey", value: this.AppModelKey });

            $(window).one("message", function (e) {
                return _this.parseMessage(e, completed);
            });

            SpeakApps.AppHost.Windows.open(this.Url + "?" + $.param(params), target, features, replace);
        };

        AppBase.prototype.getOptions = function () {
            throw "Abstract method called";
        };

        AppBase.prototype.parseMessage = function (e, completed) {
            var data = e.originalEvent.data;
            for (var n in data) {
                this[n] = data[n];
            }

            completed(this);
        };
        return AppBase;
    })();
    SpeakApps.AppBase = AppBase;
})(SpeakApps || (SpeakApps = {}));
var SpeakApps;
(function (SpeakApps) {
    var SystemEvents = (function () {
        function SystemEvents() {
            Sitecore.on("apps:loaded", this.subscribe);
        }
        SystemEvents.prototype.subscribe = function () {
            _.each(Sitecore.applications, function (app) {
                app.on("window:close dialog:ok dialog:close dialog:cancel", function () {
                    SpeakApps.AppHost.Windows.close();
                });

                app.on("window:alert", function (e) {
                    SpeakApps.AppHost.Windows.alert(e.text);
                });

                app.on("window:reload", function (e) {
                    SpeakApps.AppHost.Windows.reload(e.forceGet);
                });
            });
        };
        return SystemEvents;
    })();
    SpeakApps.SystemEvents = SystemEvents;
})(SpeakApps || (SpeakApps = {}));
var SpeakApps;
(function (SpeakApps) {
    var WindowsHost = (function () {
        function WindowsHost() {
        }
        WindowsHost.prototype.alert = function (text) {
            window.alert(text);
        };

        WindowsHost.prototype.confirm = function (text) {
            return window.confirm(text);
        };

        WindowsHost.prototype.close = function () {
            Sitecore.trigger("window:closing");
            _.each(Sitecore.applications, function (app) {
                return app.trigger("window:closing");
            });

            window.close();
        };

        WindowsHost.prototype.open = function (url, target, features, replace) {
            window.open(url, target, features, replace);
        };

        WindowsHost.prototype.prompt = function (text, defaultValue) {
            return window.prompt(text, defaultValue);
        };

        WindowsHost.prototype.reload = function (forceGet) {
            Sitecore.trigger("window:reloading");
            _.each(Sitecore.applications, function (app) {
                return app.trigger("window:reloading");
            });

            window.location.reload(forceGet);
        };

        WindowsHost.prototype.showModalDialog = function (url, dialogOptions) {
            window.showModalDialog(url, dialogOptions);
        };
        return WindowsHost;
    })();
    SpeakApps.WindowsHost = WindowsHost;
})(SpeakApps || (SpeakApps = {}));
var SpeakApps;
(function (SpeakApps) {
    var AppHostStatic = (function () {
        function AppHostStatic() {
            this.Windows = new SpeakApps.WindowsHost();
            this.Events = new SpeakApps.SystemEvents();
        }
        return AppHostStatic;
    })();
    SpeakApps.AppHostStatic = AppHostStatic;

    SpeakApps.AppHost = new AppHostStatic();
})(SpeakApps || (SpeakApps = {}));
