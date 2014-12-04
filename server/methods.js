Meteor.methods({
  sendRequestToSlack: function(name, email) {
    // uses standard Slack HTTP post webhook
    // enter your custom webook url in settings.json

    // makes client request to this server method async
    // don't require client (browser/mobile) to wait on this method
    this.unblock();

    // the message we post into Slack
    var message = name + " " + email + " would like Slack access. Admins, please invite them via " +
                  Meteor.settings.slackUrl + "/admin/invites";

    // the https webhook endpoint given to you by slack
    // it's a secret so keep in settings, which is not stored in git
    var slackWebhook = Meteor.settings.slackWebhook;

    // username that shows up in Slack when posting
    var username = "Slack Invite Request Form";

    // Slack icon to use when posting
    var icon = ":slack:";

    // Slack channel to post to
    var channel = "#general";

    // make actual webhook call
    try {
      HTTP.post(slackUrl,
        {data: {
          "text": message,
          "username": username,
          "channel": channel,
          "icon_emoji": icon
        }
      });
    } catch (e) {
      //TODO this should eventually callback to client about a problem
      console.log("slack posting error: " + e);
    }

  }
});