TeamProfile.Models.Group = Backbone.Model.extend({
  urlRoot: '/groups',
  parse: function(response) {
    console.log("parsing the group");
    response.members = new TeamProfile.Collections.Users(response.members, {parse: true});
    return response;
  }
});