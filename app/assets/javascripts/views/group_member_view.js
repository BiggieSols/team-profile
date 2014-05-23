TeamProfile.Views.GroupMemberView = Backbone.View.extend({
  template: JST['groups/member'],
  removalAlert: JST['groups/remove_member'],

  initialize: function(options) {
    this.group = options.group;
    this.model = options.model;
  },

  events: {
    "click .admin-destroy":"removeMember",
    "mouseenter .destroy":"showTooltip",
    "mouseenter .make-admin":"showTooltip",
    "click .make-admin":"confirmAdminTransfer",
    // "mouseleave .destroy":"hideTooltip"
  },

  confirmAdminTransfer: function() {
    $('#transfer-modal .modal-body').html("Are you sure you want to transfer all admin privileges to " + this.model.get("name") + "? You will no longer be the admin for this group!");
    $('#transfer-modal').modal("show");

    var throttledAdminTransfer = _.throttle(this._transferAdmin.bind(this), 1000);
    // var that = this;
    $(".transfer-admin-confirm").on("click", function() {
      throttledAdminTransfer();
    });
  },

  showTooltip: function(event) {
    // if(!this.toolTipActive) {
      // this.toolTipActive = true;
      $(event.currentTarget).tooltip("show");
    // }
  },

  _transferAdmin: function() {
    console.log("got here");
    $('#transfer-modal').modal("hide");

    // $('body').removeClass('modal-open');
    // $('.modal-backdrop').remove();

    this.group.set("admin_id", this.model.get("id"));
    this.group.save();
  },

  // throttledAdminTransfer: function() {
  //   return _.throttle(this._transferAdmin, 5000).bind(this);
  // },

  removeMember: function() {
    var that = this;
    var user_id = this.model.get("id");
    var group_id = $('.group-member-container').eq(0).closest('.group-container').data("id");
    var groupMember = new TeamProfile.Models.GroupMember({id: -1});
    groupMember.destroy({data: {user_id: user_id, group_id: group_id}, processData: true});
    this.$el.html(that.removalAlert({member: that.model}));
    this.model.collection.remove(user_id);
  },

  render: function() {
    var admin_id = this.group.get("admin_id");
    var isAdmin = this.model.get("id") == admin_id;
    var isCurrentUser = this.model.get("id") == TeamProfile.currentUser.id;
    var deletePermitted = admin_id == TeamProfile.currentUser.id;

    if(isAdmin) deletePermitted = false;

    var renderedContent = this.template({
      member: this.model,
      deletePermitted: deletePermitted,
      isAdmin: isAdmin,
      isCurrentUser: isCurrentUser
    });
    this.$el.html(renderedContent);
    return this;
  },
});