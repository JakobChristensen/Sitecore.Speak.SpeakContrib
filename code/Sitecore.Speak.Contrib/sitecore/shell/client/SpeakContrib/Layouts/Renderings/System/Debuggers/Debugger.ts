import Speak = require("sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak");

class Debugger extends Speak.ControlBase {

  initialized() {
    console.log("=== DEBUGGER STARTED ===");
    console.log("Sitecore");
    console.log(Sitecore);
    console.log("Sitecore.app");
    console.log(this.app);

    setTimeout($.proxy(this.initializeTrace, this), 1);
  }

  initializeTrace() {
    for (var name in this.app) {
      var control = this.app[name];
      if (control == null || !control.attributes) {
        continue;
      }

      control.on("all", this.logEvent, this);
    }
  }

  logEvent(event, callback, context) {
    console.log("=== DEBUGGER EVENT ===");

    var name = "";
    if (callback && callback.attributes) {
      name = callback.attributes.name;
    }

    console.log("Event         : ", event);
    console.log("Callback.name : ", name);
    console.log("Callback      : ", callback);
    console.log("Context       : ", context);
  }
}

Sitecore.component(Debugger, "Debugger");