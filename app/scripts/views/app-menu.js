define([
  'backbone',
  'com',
  'session',
  'resources/layouts',
  'templates/index',
], function (Backbone, com, session, Layouts, tpl) {
  return Backbone.View.extend({
    events: {
      'submit #menu-join': 'onJoinSubmit',
      'submit #menu-host': 'onHostSubmit',

      'click #menu-join [data-stage-name]': 'onJoinStage',
      'click #menu-host [data-stage-name]': 'onHostStage',
    },

    show: function () {
      this.render();
      this.renderStages();
    },

    hide: function () {
      this.$el.html('');
    },

    render: function () {
      this.$el.html(tpl.app.menu({hostName: this.defaultHostName()}));
    },

    renderStages: function () {
        var dropdowns = this.$el.find('.dropdown-menu');

      _(_(Layouts).keys()).each(function (key, index) {
        var json = {
          stage: key,
          max: Layouts[key].max,
          cls: Layouts[key].locked ? 'disabled' : '',
        };
        dropdowns.append(tpl.app.menuStages(json));
      });
    },

    host: function (name, stage) {
      com.trigger('game:host', {name: name, stage: stage});
    },

    // name: game name to join
    // stage: any, stage1, stage2, ...
    join: function (options) {
      if ( !options ) options = {stage: 'any'};
      com.trigger('game:join', options);
    },

    defaultHostName: function () { return session.get('player').get('name') + "'s game" },

    getGameName: function (type) { // host | join
      return this.$el.find('#menu-'+type + ' input').val() || this.defaultHostName();
    },

    onHostStage: function (event) {
      var gameName = this.getGameName('host');
      this.host(gameName, event.currentTarget.getAttribute('data-stage-name'));
    },

    onJoinStage: function (event) {
      var gameName = this.getGameName('join');
      console.log('join:', event);
    },

    onHostSubmit: function (event) {
      event.preventDefault();
      var gameName = this.getGameName('host');
      this.host(gameName, 'stage1');
    },

    onJoinSubmit: function (event) {
      event.preventDefault();
    },

  });
});
