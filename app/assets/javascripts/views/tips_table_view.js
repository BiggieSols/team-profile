TeamProfile.Views.TipsTableView = Backbone.View.extend({
  template: JST['users/tips_table'],

  initialize: function(options) {
    this.tipsCategory = options.tipsCategory;
  },

  // _tipsToDisplay: function() {
  //   var selectedTips, personality_type = this.model.get("personality_type");

  //   switch(this.tipsCategory) {
  //     case "colleague":
  //       selectedTips = personality_type.get("as_colleague");
  //       break;
  //     case "manager":
  //       selectedTips = personality_type.get("as_manager");
  //       break;
  //     case "employee":
  //       selectedTips = personality_type.get("as_employee");
  //       break;
  //   }
  //   return selectedTips;
  // },
  render: function() {
    var renderedContent = this.template({
      tips: this._tipsToDisplay()
    });
    this.$el.html(renderedContent);
    return this;
  },

  _tipsToDisplay: function() {
    var selectedTips, personality_type = this.model.get("personality_type");

    switch(this.tipsCategory) {
      case "colleague":
        selectedTips = personality_type.get("as_colleague");
        break;
      case "manager":
        selectedTips = personality_type.get("as_manager");
        break;
      case "employee":
        selectedTips = personality_type.get("as_employee");
        break;
    }
    return selectedTips;
  },
});