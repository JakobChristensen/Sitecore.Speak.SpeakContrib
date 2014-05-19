Sitecore.component(["jquery"], {
  name: "StaticJsonDataSource",

  initialize: function (initial, app, el, sitecore) {
    var data = $(el).text().trim();
    if (data && data != "") {
      var json = $.parseJSON(data);

      for (var n = 0; n < json.length; n++) {
        this.Data.push(json[n]);
      }
    }
  }
});