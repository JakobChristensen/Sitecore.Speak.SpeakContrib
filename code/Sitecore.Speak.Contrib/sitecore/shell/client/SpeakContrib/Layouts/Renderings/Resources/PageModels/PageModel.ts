﻿/// <amd-dependency path="/sitecore/shell/client/SpeakContrib/Assets/lib/core/1.2/Sitecore.Speak.Apps.js" />
import Speak = require("sitecore/shell/client/Speak/Assets/lib/core/1.2/SitecoreSpeak");

class PageModel extends Speak.ControlBase {
  // #region Public Properties
  // This region was generated by a tool. Changes to this region may cause incorrect behavior and will be lost if the code is regenerated.
  public PageModelKey: string;
  // #endregion

  initialized() {
    this.app.on("dialog:ok", this.handleDialogOk, this);
  }

  handleDialogOk() {
    if (window.opener == null) {
      return;
    }

    var data = {};

    // get property names from this.properties but read value from this
    var properties = (<any>this).properties;
    for (var n in properties) {
      var value = this[n];
      if (_.isString(value) || _.isNumber(value) || _.isBoolean(value)) {
        data[n] = value;
      }
    }

    window.opener.postMessage(data, "*");
  }
}

Sitecore.component(PageModel, "PageModel");
