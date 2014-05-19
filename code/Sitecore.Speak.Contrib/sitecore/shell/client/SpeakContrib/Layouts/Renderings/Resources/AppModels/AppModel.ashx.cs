// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AppModel.ashx.cs" company="Sitecore A/S">
//   Copyright (C) by Sitecore A/S
// </copyright>
// <summary>
//   Summary description for AppModel
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace Sitecore.Shell.Client.SpeakContrib.Layouts.Renderings.Resources.AppModels
{
  using System.Collections.Generic;
  using System.Web;
  using System.Web.SessionState;

  using Sitecore.Diagnostics;
  using Sitecore.Web;

  /// <summary>
  /// Class AppModel.
  /// </summary>
  public class AppModel : IHttpHandler, IRequiresSessionState
  {
    #region Public Properties

    /// <summary>
    /// Gets a value indicating whether another request can use the <see cref="T:System.Web.IHttpHandler" /> instance.
    /// </summary>
    /// <value><c>true</c> if this instance is reusable; otherwise, <c>false</c>.</value>
    /// <returns>true if the <see cref="T:System.Web.IHttpHandler" /> instance is reusable; otherwise, false.</returns>
    public bool IsReusable
    {
      get
      {
        return true;
      }
    }

    #endregion

    #region Public Methods and Operators

    /// <summary>Enables processing of HTTP Web requests by a custom HttpHandler that implements the <see cref="T:System.Web.IHttpHandler"/> interface.</summary>
    /// <param name="context">An <see cref="T:System.Web.HttpContext"/> object that provides references to the intrinsic server objects (for example, Request, Response, Session, and Server) used to service HTTP requests.</param>
    public void ProcessRequest(HttpContext context)
    {
      Assert.ArgumentNotNull(context, "context");

      var appModelKey = WebUtil.GetFormValue("AppModelKey");
      if (string.IsNullOrEmpty(appModelKey))
      {
        context.Response.StatusCode = 404;
        return;
      }

      var appModelSessionKey = "SC_APPMODEL_" + appModelKey;

      var appModel = WebUtil.GetSessionValue(appModelSessionKey) as Dictionary<string, string>;
      if (appModel == null)
      {
        appModel = new Dictionary<string, string>();
        WebUtil.SetSessionValue(appModelSessionKey, appModel);
      }

      var name = WebUtil.GetFormValue("Name");
      if (string.IsNullOrEmpty(name))
      {
        return;
      }

      var value = WebUtil.GetFormValue("Value");

      appModel[name] = value;
    }

    #endregion
  }
}