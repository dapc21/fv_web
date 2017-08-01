(function() {
  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      return $(el).bind('input.rivets', this.publish);
    },
    unbind: function(el) {
      return $(el).unbind('input.rivets');
    }
  };

  rivets.configure({
    prefix: "rv",
    adapter: {
      subscribe: function(obj, keypath, callback) {
        callback.wrapped = function(m, v) {
          return callback(v);
        };
        return obj.on('change:' + keypath, callback.wrapped);
      },
      unsubscribe: function(obj, keypath, callback) {
        return obj.off('change:' + keypath, callback.wrapped);
      },
      read: function(obj, keypath) {
        if (keypath === "cid") {
          return obj.cid;
        }
        return obj.get(keypath);
      },
      publish: function(obj, keypath, value) {
        if (obj.cid) {
          return obj.set(keypath, value);
        } else {
          return obj[keypath] = value;
        }
      }
    }
  });

}).call(this);

(function() {
  var BuilderView, EditFieldView, FormbuilderWindow, FormbuilderWindowCollection, FormbuilderWindowModel, ViewFieldView, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FormbuilderWindowModel = (function(_super) {
    __extends(FormbuilderWindowModel, _super);

    function FormbuilderWindowModel() {
      _ref = FormbuilderWindowModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FormbuilderWindowModel.prototype.sync = function() {};

    FormbuilderWindowModel.prototype.indexInDOM = function() {
      var $wrapper,
        _this = this;
      $wrapper = $(".fb-field-wrapper").filter((function(_, el) {
        return $(el).data('cid') === _this.cid;
      }));
      return $(".fb-field-wrapper").index($wrapper);
    };

    FormbuilderWindowModel.prototype.is_input = function() {
      return FormbuilderWindow.inputFields[this.get(FormbuilderWindow.options.mappings.XTYPE)] != null;
    };

    return FormbuilderWindowModel;

  })(Backbone.DeepModel);

  FormbuilderWindowCollection = (function(_super) {
    __extends(FormbuilderWindowCollection, _super);

    function FormbuilderWindowCollection() {
      _ref1 = FormbuilderWindowCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    FormbuilderWindowCollection.prototype.initialize = function() {
      return this.on('add', this.copyCidToModel);
    };

    FormbuilderWindowCollection.prototype.model = FormbuilderWindowModel;

    FormbuilderWindowCollection.prototype.comparator = function(model) {
      return model.indexInDOM();
    };

    FormbuilderWindowCollection.prototype.copyCidToModel = function(model) {
      return model.attributes.cid = model.cid;
    };

    return FormbuilderWindowCollection;

  })(Backbone.Collection);

  ViewFieldView = (function(_super) {
    __extends(ViewFieldView, _super);

    function ViewFieldView() {
      _ref2 = ViewFieldView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    ViewFieldView.prototype.className = "fb-field-wrapper";

    ViewFieldView.prototype.events = {
      'click .subtemplate-wrapper': 'focusEditView',
      'click .js-duplicate': 'duplicate',
      'click .js-goto-option': 'jump',
      'click .js-calc-option': 'calculations',
      'click .js-clear': 'clear'
    };

    ViewFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    ViewFieldView.prototype.render = function() {
      this.$el.addClass('response-field-' + this.model.get(FormbuilderWindow.options.mappings.XTYPE)).data('cid', this.model.cid).html(FormbuilderWindow.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      return this;
    };

    ViewFieldView.prototype.focusEditView = function() {
      return this.parentView.showEditView(this.model);
    };

    ViewFieldView.prototype.clear = function(e) {
      var cb, x,
        _this = this;
      e.preventDefault();
      e.stopPropagation();
      cb = function() {
        /* Se destruye el objeto hijo del array questions */
        _this.parentView.destroyChildren(_this.model.attributes.cid);
        return _this.model.destroy();
      };
      x = FormbuilderWindow.options.CLEAR_FIELD_CONFIRM;
      switch (typeof x) {
        case 'string':
          if (confirm(x)) {
            return cb();
          }
          break;
        case 'function':
          return x(cb);
        default:
          return cb();
      }
    };

    ViewFieldView.prototype.duplicate = function() {
      var attrs;
      attrs = _.clone(this.model.attributes);
      delete attrs['id'];
      attrs['label'] += ' Copy';
      return this.parentView.createField(attrs, {
        position: this.model.indexInDOM() + 1
      });
    };
    
    ViewFieldView.prototype.jump = function() {
      var attrs;
      this.parentView.formBuilder.trigger('jump',this.model.attributes,this.model.collection.models)
    };
    ViewFieldView.prototype.calculations = function() {
      var attrs;
      console.log(this.model.indexInDOM());
    };

    return ViewFieldView;

  })(Backbone.View);
  
  

  EditFieldView = (function(_super) {
    __extends(EditFieldView, _super);

    function EditFieldView() {
      _ref3 = EditFieldView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EditFieldView.prototype.className = "edit-response-field";

    EditFieldView.prototype.events = {
      'click .js-add-option': 'addOption',
      'click .js-remove-option': 'removeOption',
      'click .js-default-updated': 'defaultUpdated',
      'input .option-label-input': 'forceRender',
      'input .optionsName': 'addName',
      'click .js-add-option-combo': 'addOptionCombo',
      'click .js-remove-option-combo': 'removeOptionCombo',
      'change #selectFormatDatefield': 'updateRegexDatefield',
      'change #selectFormatTimefield': 'updateRegexTimefield',
      'input .regex': 'enableDisableRegexText',
      'change .format': 'enableDisableInvalidText',
      'change .allowBlank': 'enableDisableBlankText',
      'change .vtype': 'enableDisableVtypeText',
      'change .checked': 'updateCheckboxValue',
      'click .fileExtensions': 'updateFileExtensions'
    };

    EditFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      return this.listenTo(this.model, "destroy", this.remove);
    };

    EditFieldView.prototype.render = function() {
      this.$el.html(FormbuilderWindow.templates["edit/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      rivets.bind(this.$el, {
        model: this.model
      });
      return this;
    };

    EditFieldView.prototype.remove = function() {
      this.parentView.editView = void 0;
      this.parentView.$el.find("[data-target=\"#addFieldWindow\"]").click();
      return EditFieldView.__super__.remove.apply(this, arguments);
    };

    EditFieldView.prototype.addOption = function(e) {
      var $el, i, newOption, options;
      $el = $(e.currentTarget);
      i = this.$el.find('.option').index($el.closest('.option'));
      options = this.model.get(FormbuilderWindow.options.mappings.OPTIONS) || [];
      var len = (options.length)+1;
      var newval = len.toString();
      newOption = {
        checked    : false,
        boxLabel   : 'Option '+newval,
        name       : options[0].name,
        inputValue : 'option'+newval,
        id         : 'value'+newval
      };
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(FormbuilderWindow.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.removeOption = function(e) {
      var $el, index, options;
      $el = $(e.currentTarget);
      index = this.$el.find(".js-remove-option").index($el);
      options = this.model.get(FormbuilderWindow.options.mappings.OPTIONS);
      options.splice(index, 1);
      this.model.set(FormbuilderWindow.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.defaultUpdated = function(e) {
      var $el;
      $el = $(e.currentTarget);
      if (this.model.get(FormbuilderWindow.options.mappings.XTYPE) !== 'checkboxfield') {
        this.$el.find(".js-default-updated").not($el).attr('checked', false).trigger('change');
      }
      return this.forceRender();
    };

    EditFieldView.prototype.addName = function(e) {
      var $el, options;
      var newOption = [];
      options = this.model.get(FormbuilderWindow.options.mappings.OPTIONS) || [];
      var len = options.length;
      for (var x=0; x < len; ++x){
        newOption.push({
          checked    : options[x].checked,
          boxLabel   : options[x].boxLabel,
          name       : $('#optionsName').val(),
          inputValue : options[x].inputValue,
          id         : options[x].id
        });
      }
      this.model.set(FormbuilderWindow.options.mappings.OPTIONS, newOption);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.addOptionCombo = function(e) {
      var $el, i, newOption, options;
      $el = $(e.currentTarget);
      i = this.$el.find('.option').index($el.closest('.option'));
      options = this.model.get(FormbuilderWindow.options.mappings.OPTIONSCOMBO) || [];
      var len = (options.length)+1;
      var newval = len.toString();
      newOption = {
        id         : 'option'+newval,
        name       : 'Option '+newval,
        boxLabel   : 'Option '+newval,
        inputValue : 'option'+newval
      };
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(FormbuilderWindow.options.mappings.OPTIONSCOMBO, options);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.OPTIONSCOMBO);
      return this.forceRender();
    };

    EditFieldView.prototype.removeOptionCombo = function(e) {
      var $el, index, options;
      $el = $(e.currentTarget);
      index = this.$el.find(".js-remove-option-combo").index($el);
      options = this.model.get(FormbuilderWindow.options.mappings.OPTIONSCOMBO);
      options.splice(index, 1);
      this.model.set(FormbuilderWindow.options.mappings.OPTIONSCOMBO, options);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.OPTIONSCOMBO);
      return this.forceRender();
    };

    EditFieldView.prototype.updateRegexDatefield = function() {
      var format = $( "#selectFormatDatefield" ).val();
      if(format == 'd/m/Y') {
        var emptyText = 'DD/MM/YYYY';
        var regex = '/^\d{2}\/\d{2}\/\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'd/m/y') {
        var emptyText = 'DD/MM/YY';
        var regex = '/^\d{2}\/\d{2}\/\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'd-m-Y') {
        var emptyText = 'DD-MM-YYYY';
        var regex = '/^\d{2}\-\d{2}\-\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'd-m-y') {
        var emptyText = 'DD-MM-YY';
        var regex = '/^\d{2}\-\d{2}\-\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm/d/Y') {
        var emptyText = 'MM/DD/YYYY';
        var regex = '/^\d{2}\/\d{2}\/\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n/j/Y') {
        var emptyText = 'M/D/YYYY';
        var regex = '/^\d{1}\/\d{1}\/\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n/j/y') {
        var emptyText = 'M/D/YY';
        var regex = '/^\d{1}\/\d{1}\/\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm/j/y') {
        var emptyText = 'MM/D/YY';
        var regex = '/^\d{2}\/\d{1}\/\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n/d/y') {
        var emptyText = 'M/DD/YY';
        var regex = '/^\d{1}\/\d{2}\/\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm/j/Y') {
        var emptyText = 'MM/D/YYYY';
        var regex = '/^\d{2}\/\d{1}\/\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n/d/Y') {
        var emptyText = 'M/DD/YYYY';
        var regex = '/^\d{1}\/\d{2}\/\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm-d-y') {
        var emptyText = 'MM-DD-YY';
        var regex = '/^\d{2}\-\d{2}\-\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm-d-Y') {
        var emptyText = 'MM-DD-YYYY';
        var regex = '/^\d{2}\-\d{2}\-\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm/d') {
        var emptyText = 'MM/DD';
        var regex = '/^\d{2}\/\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'm-d') {
        var emptyText = 'MM-DD';
        var regex = '/^\d{2}\-\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'md') {
        var emptyText = 'MMDD';
        var regex = '/^\d{4}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'mdy') {
        var emptyText = 'MMDDYY';
        var regex = '/^\d{6}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'mdY') {
        var emptyText = 'MMDDYYYY';
        var regex = '/^\d{8}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'd') {
        var emptyText = 'DD';
        var regex = '/^\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'Y-m-d') {
        var emptyText = 'YYYY-MM-DD';
        var regex = '/^\d{4}\-\d{2}\-\d{2}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n-j') {
        var emptyText = 'M-D';
        var regex = '/^\d{1}\-\d{1}$/';
        var regexText = 'Date format is: '+emptyText;
      } else if(format == 'n/j') {
        var emptyText = 'M/D';
        var regex = '/^\d{1}\/\d{1}$/';
        var regexText = 'Date format is: '+emptyText;
      }
      $( "#inputEmptyTextDatefield" ).val(emptyText);
      $( "#inputRegexDatefield" ).val(regex);
      $( "#inputRegexTextDatefield" ).val(regexText);
      this.model.set(FormbuilderWindow.options.mappings.EMPTYTEXT, emptyText);
      this.model.set(FormbuilderWindow.options.mappings.REGEX, regex);
      this.model.set(FormbuilderWindow.options.mappings.REGEXTEXT, regexText);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.EMPTYTEXT);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.REGEX);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.REGEXTEXT);
      return this.forceRender();
    };

    EditFieldView.prototype.updateRegexTimefield = function() {
      var format = $( "#selectFormatTimefield" ).val();
      if(format == 'H:i a') {
        var emptyText = 'H:MM AM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])s([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g:ia') {
        var emptyText = 'H:MMam/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2]):([0-5][0-9])([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g:iA') {
        var emptyText = 'H:MMAM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2]):([0-5][0-9])([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g:i a') {
        var emptyText = 'H:MM am/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2]):([0-5][0-9])s([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g:i A') {
        var emptyText = 'H:MM AM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2]):([0-5][0-9])s([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'h:i') {
        var emptyText = 'HH:MM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2]):([0-5][0-9])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g:i') {
        var emptyText = 'H:MM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2]):([0-5][0-9])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'H:i') {
        var emptyText = 'HH:MM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'ga') {
        var emptyText = 'Ham/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'ha') {
        var emptyText = 'HHam/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'gA') {
        var emptyText = 'HAM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'h a') {
        var emptyText = 'HH am/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])s([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g a') {
        var emptyText = 'H am/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])s([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g A') {
        var emptyText = 'H AM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])s([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'gi') {
        var emptyText = 'HMM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([0-5][0-9])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'hi') {
        var emptyText = 'HHMM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([0-5][0-9])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'gia') {
        var emptyText = 'HMMam/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([0-5][0-9])([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'hia') {
        var emptyText = 'HHMMam/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([0-5][0-9])([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'g') {
        var emptyText = 'H';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'H') {
        var emptyText = 'HH';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[0-9]|1[0-9]|2[0-3])$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'gi a') {
        var emptyText = 'HMM am/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([0-5][0-9])s([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'hi a') {
        var emptyText = 'HHMM am/pm';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([0-5][0-9])s([a|p]m)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'giA') {
        var emptyText = 'HMMAM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([0-5][0-9])([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'hiA') {
        var emptyText = 'HHMMAM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([0-5][0-9])([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'gi A') {
        var emptyText = 'HMM AM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^([1-9]|1[0-2])([0-5][0-9])s([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      } else if(format == 'hi A') {
        var emptyText = 'HHMM AM/PM';
        var empText = 'Time format is: '+emptyText;
        var submitFormat = emptyText;
        var regex = '/^(0[1-9]|1[0-2])([0-5][0-9])s([A|P]M)$/';
        var regexText = 'Time format is: '+emptyText;
      }

      $( "#inputEmptyTextTimefield" ).val('Time format is: '+emptyText);
      $( "#inputRegexTimefield" ).val(regex);
      $( "#inputRegexTextTimefield" ).val(regexText);
      $( ".submitFormat" ).val(emptyText);

      this.model.set(FormbuilderWindow.options.mappings.EMPTYTEXT, empText);
      this.model.set(FormbuilderWindow.options.mappings.REGEX, regex);
      this.model.set(FormbuilderWindow.options.mappings.REGEXTEXT, regexText);
      this.model.set(FormbuilderWindow.options.mappings.SUBMITFORMAT, submitFormat);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.EMPTYTEXT);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.REGEX);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.REGEXTEXT);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.SUBMITFORMAT);
      return this.forceRender();
    };

    EditFieldView.prototype.enableDisableRegexText = function() {
      var regex = $('.regex').val();
      var format = $('.format option:selected').text();
      if(regex!='') {
        $('.regexText').removeAttr('disabled');
        $('.regexText').val('The format is: '+format);
      } else {
        $('.regexText').attr('disabled','disabled');
        $('.regexText').val('');
      }
    };

    EditFieldView.prototype.enableDisableInvalidText = function() {
      var format = $('.format option:selected').val();
      if(format!=undefined) {
        $('.invalidText').removeAttr('disabled');
        $('.invalidText').val('{0} is not a valid date - it must be in the format {1}');
      } else {
        $('.invalidText').attr('disabled','disabled');
        $('.invalidText').val('');
      }
    };

    EditFieldView.prototype.enableDisableBlankText = function() {
      var allowBlank = $('.allowBlank option:selected').val();
      if(allowBlank!=undefined) {
        if(allowBlank=='false') {
          $('.blankText').removeAttr('disabled');
          $('.blankText').val('This field is required');
        } else {
          $('.blankText').attr('disabled','disabled');
          $('.blankText').val('');
        }
      } else {
        $('.blankText').attr('disabled','disabled');
        $('.blankText').val('');
      }
    };

    EditFieldView.prototype.enableDisableVtypeText = function() {
      var vtype = $('.vtype option:selected').val();
      if(vtype!=undefined) {
        if(vtype!='') {
          $('.vtypeText').removeAttr('disabled');
        } else {
          $('.vtypeText').attr('disabled','disabled');
        }
      } else {
        $('.vtypeText').attr('disabled','disabled');
        $('.vtypeText').val('');
      }
    };

    EditFieldView.prototype.updateCheckboxValue = function() {
      var checked = $('.checked option:selected').val();
      if(checked!=undefined) {
        if(checked == 'true') {
          $('.fb-checkbox-window').attr('checked',true);
        } else {
          $('.fb-checkbox-window').attr('checked',false);
        }
      }
    };

    EditFieldView.prototype.updateFileExtensions = function() {
      var fileExtensions ='';
      var cont = 0;
      $('.fb-common-wrapper input[type=checkbox]').each(function(){
        if(this.checked) {
          cont++;
          if(cont == 1) {
            fileExtensions += $(this).val();
          } else {
            fileExtensions += ', '+$(this).val();
          }
        }
      });
      this.model.set(FormbuilderWindow.options.mappings.FILEEXTENSIONS, fileExtensions);
      this.model.trigger("change:" + FormbuilderWindow.options.mappings.FILEEXTENSIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };

    return EditFieldView;

  })(Backbone.View);
  
  
  BuilderView = (function(_super) {
    __extends(BuilderView, _super);

    function BuilderView() {
      _ref4 = BuilderView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-form': 'saveForm',
      'click .fb-tabs a': 'showTab',
      'click .fb-add-field-types a': 'addField',
      'mouseover .fb-add-field-types': 'lockLeftWrapper',
      'mouseout .fb-add-field-types': 'unlockLeftWrapper'
    };

    BuilderView.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.formBuilder = options.formBuilder, this.bootstrapData = options.bootstrapData;
      this.sections = options.sections;
      if (selector != null) {
        this.setElement($(selector));
      }
      this.collection = new FormbuilderWindowCollection;
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('change', this.handleFormUpdate, this);
      this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
      this.collection.bind('destroy', this.ensureEditViewScrolled, this);
      this.render();
      this.collection.reset(this.bootstrapData);
      return this.bindSaveEvent();
    };

    BuilderView.prototype.bindSaveEvent = function() {
      var _this = this;
      this.formSaved = true;
      this.saveFormButton = this.$el.find(".js-save-form");
      this.saveFormButton.attr('disabled', true).text(FormbuilderWindow.options.dict.ALL_CHANGES_SAVED);
      if (!!FormbuilderWindow.options.AUTOSAVE) {
        setInterval(function() {
          return _this.saveForm.call(_this);
        }, 5000);
      }
      return $(window).bind('beforeunload', function() {
        if (_this.formSaved) {
          return void 0;
        } else {
          return FormbuilderWindow.options.dict.UNSAVED_CHANGES;
        }
      });
    };

    BuilderView.prototype.reset = function() {
      this.$responseFields.html('');
      return this.addAll();
    };

    BuilderView.prototype.render = function() {
      var subview, _i, _len, _ref5;
      this.$el.html(FormbuilderWindow.templates['page']());
      this.$fbLeft = this.$el.find('.fb-left');
      this.$responseFields = this.$el.find('.fb-response-fields');
      this.bindWindowScrollEvent();
      this.hideShowNoResponseFields();
      _ref5 = this.SUBVIEWS;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        subview = _ref5[_i];
        new subview({
          parentView: this
        }).render();
      }
      return this;
    };

    BuilderView.prototype.bindWindowScrollEvent = function() {
      var _this = this;
      return $(window).on('scroll', function() {
        var maxMargin, newMargin;
        if (_this.$fbLeft.data('locked') === true) {
          return;
        }
        newMargin = Math.max(0, $(window).scrollTop() - _this.$el.offset().top);
        maxMargin = _this.$responseFields.height();
        return _this.$fbLeft.css({
          'margin-top': Math.min(maxMargin, newMargin)
        });
      });
    };

    BuilderView.prototype.showTab = function(e) {
      var $el, first_model, target;
      $el = $(e.currentTarget);
      target = $el.data('target');
      $el.closest('li').addClass('active').siblings('li').removeClass('active');
      $(target).addClass('active').siblings('.fb-tab-pane').removeClass('active');
      if (target !== '#editFieldWindow') {
        this.unlockLeftWrapper();
      }
      if (target === '#editFieldWindow' && !this.editView && (first_model = this.collection.models[0])) {
        return this.createAndShowEditView(first_model);
      }
    };

    BuilderView.prototype.addOne = function(responseField, _, options) {
      var $replacePosition, view;
      view = new ViewFieldView({
        model: responseField,
        parentView: this
      });
      if (options.$replaceEl != null) {
        return options.$replaceEl.replaceWith(view.render().el);
      } else if ((options.position == null) || options.position === -1) {
        return this.$responseFields.append(view.render().el);
      } else if (options.position === 0) {
        return this.$responseFields.prepend(view.render().el);
      } else if (($replacePosition = this.$responseFields.find(".fb-field-wrapper").eq(options.position))[0]) {
        return $replacePosition.before(view.render().el);
      } else {
        return this.$responseFields.append(view.render().el);
      }
    };

    BuilderView.prototype.setSortable = function() {
      var _this = this;
      if (this.$responseFields.hasClass('ui-sortable')) {
        this.$responseFields.sortable('destroy');
      }
      this.$responseFields.sortable({
        forcePlaceholderSize: true,
        placeholder: 'sortable-placeholder',
        stop: function(e, ui) {
          var rf;
          if (ui.item.data('field-type')) {
            rf = _this.collection.create(FormbuilderWindow.helpers.defaultFieldAttrs(ui.item.data('field-type')), {
              $replaceEl: ui.item
            });
            _this.createAndShowEditView(rf);
          }
          _this.handleFormUpdate();
          return true;
        },
        update: function(e, ui) {
          if (!ui.item.data('field-type')) {
            return _this.ensureEditViewScrolled();
          }
        }
      });
      return this.setDraggable();
    };

    BuilderView.prototype.setDraggable = function() {
      var $addFieldButtons,
        _this = this;
      $addFieldButtons = this.$el.find("[data-field-type]");
      return $addFieldButtons.draggable({
        connectToSortable: this.$responseFields,
        helper: function() {
          var $helper;
          $helper = $("<div class='response-field-draggable-helper' />");
          $helper.css({
            width: _this.$responseFields.width(),
            height: '80px'
          });
          return $helper;
        }
      });
    };

    BuilderView.prototype.addAll = function() {
      this.collection.each(this.addOne, this);
      return this.setSortable();
    };

    BuilderView.prototype.hideShowNoResponseFields = function() {
      return this.$el.find(".fb-no-response-fields")[this.collection.length > 0 ? 'hide' : 'show']();
    };

    BuilderView.prototype.addField = function(e) {
      var field_type;
      field_type = $(e.currentTarget).data('field-type');
      return this.createField(FormbuilderWindow.helpers.defaultFieldAttrs(field_type));
    };

    BuilderView.prototype.createField = function(attrs, options) {
      var rf;
      rf = this.collection.create(attrs, options);
      this.createAndShowEditView(rf);
      return this.handleFormUpdate();
    };

    BuilderView.prototype.createAndShowEditView = function(model) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
      $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
      if (this.editView) {
        if (this.editView.model.cid === model.cid) {
          this.$el.find(".fb-tabs a[data-target=\"#editFieldWindow\"]").click();
          this.scrollLeftWrapper($responseFieldEl);
          return;
        }
        this.editView.remove();
      }
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
      this.$el.find(".fb-tabs a[data-target=\"#editFieldWindow\"]").click();
      this.scrollLeftWrapper($responseFieldEl);
      /*Checa y convierte algunos xtype a textfield*/
      var newModel = this.checkXtype(model);
      /*Setea los componentes*/
      this.setOptions(newModel);
      /*Invoca a la función que habilita/deshabilita opciones por defecto*/
      this.defaultOptions();
      /*Agrega un objeto hijo a los registros generales de "questions" */
      this.addChildren(newModel.attributes);
      console.log('FormbuilderWindow Selected');
      return this;
    };

    BuilderView.prototype.checkXtype = function(model) {
      if (model.attributes.xtype === 'email' || model.attributes.xtype === 'website' || model.attributes.xtype === 'address' || model.attributes.xtype === 'price') {
          model.attributes.xtype = 'textfield';
      }
      return model;
    };

    BuilderView.prototype.showEditView = function(model) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
      $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
      if (this.editView) {
        if (this.editView.model.cid === model.cid) {
          this.$el.find(".fb-tabs a[data-target=\"#editFieldWindow\"]").click();
          this.scrollLeftWrapper($responseFieldEl);
          return;
        }
        this.editView.remove();
      }
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
      this.$el.find(".fb-tabs a[data-target=\"#editFieldWindow\"]").click();
      this.scrollLeftWrapper($responseFieldEl);
      /*Setea los componentes*/
      this.setOptions(model);
      /*Invoca a la función que habilita/deshabilita opciones por defecto*/
      this.defaultOptions();
      return this;
    };

    BuilderView.prototype.ensureEditViewScrolled = function() {
      if (!this.editView) {
        return;
      }
      return this.scrollLeftWrapper($(".fb-field-wrapper.editing"));
    };

    BuilderView.prototype.scrollLeftWrapper = function($responseFieldEl) {
      var _this = this;
      this.unlockLeftWrapper();
      if (!$responseFieldEl[0]) {
        return;
      }

      var maxMargin, newMargin;
        if (_this.$fbLeft.data('locked') === true) {
          return;
        }
        newMargin = Math.max(0, $(window).scrollTop() - _this.$el.offset().top);
        maxMargin = this.$responseFields.height();
         _this.$fbLeft.css({
          'margin-top': Math.min(maxMargin, newMargin)
        });
      return $.scrollWindowTo((this.$el.offset().top + $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200, function() {
        return _this.lockLeftWrapper();
      });
    };

    BuilderView.prototype.setOptions = function(model) {
      var attrs = model.attributes;
      console.log(attrs.xtype);
      $(".allowBlank option[value='" + attrs.configuration.allowBlank + "']").attr("selected","selected");
      $(".hidde option[value='" + attrs.configuration.hidden + "']").attr("selected","selected");
      $(".hideEmptyLabel option[value='" + attrs.configuration.hideEmptyLabel + "']").attr("selected","selected");
      $(".hideLabel option[value='" + attrs.configuration.hideLabel + "']").attr("selected","selected");
      $(".readOnly option[value='" + attrs.configuration.readOnly + "']").attr("selected","selected");
      $(".vtype option[value='" + attrs.configuration.vtype + "']").attr("selected","selected");
      $(".validateBlank option[value='" + attrs.configuration.validateBlank + "']").attr("selected","selected");
      $(".format option[value='" + attrs.configuration.format + "']").attr("selected","selected");
      $(".showToday option[value='" + attrs.configuration.showToday + "']").attr("selected","selected");
      $(".submitFormat option[value='" + attrs.configuration.submitFormat + "']").attr("selected","selected");
      $(".allowDecimals option[value='" + attrs.configuration.allowDecimals + "']").attr("selected","selected");
      $(".allowExponential option[value='" + attrs.configuration.allowExponential + "']").attr("selected","selected");
      $(".decimalSeparator option[value='" + attrs.configuration.decimalSeparator + "']").attr("selected","selected");
      $(".typeAhead option[value='" + attrs.configuration.typeAhead + "']").attr("selected","selected");
      $(".forceSelection option[value='" + attrs.configuration.forceSelection + "']").attr("selected","selected");
      $(".triggerAction option[value='" + attrs.configuration.triggerAction + "']").attr("selected","selected");
      $(".valueField option[value='" + attrs.configuration.valueField + "']").attr("selected","selected");
      $(".displayField option[value='" + attrs.configuration.displayField + "']").attr("selected","selected");
      $(".typeCode option[value='" + attrs.configuration.typeCode + "']").attr("selected","selected");
      if(model.attributes.configuration.items) $('.optionsName').val(model.attributes.configuration.items[0].name);
      if(model.attributes.configuration.fileExtensions) {
        if(model.attributes.configuration.fileExtensions == 'jpg, jpeg') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'png') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'gif') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'bmp') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = true;
        }
        if(model.attributes.configuration.fileExtensions == 'jpg, jpeg, png, gif, bmp') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = true;
        }
        if(model.attributes.configuration.fileExtensions == 'jpg, jpeg, png, gif') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'jpg, jpeg, png') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'png, gif, bmp') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = true;
        }
        if(model.attributes.configuration.fileExtensions == 'png, gif') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = false;
        }
        if(model.attributes.configuration.fileExtensions == 'png, bmp') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = true;
        }
        if(model.attributes.configuration.fileExtensions == 'gif, bmp') {
          $('.fb-common-wrapper input[type=checkbox]')[0].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[1].checked = false;
          $('.fb-common-wrapper input[type=checkbox]')[2].checked = true;
          $('.fb-common-wrapper input[type=checkbox]')[3].checked = true;
        }
      }
    };

    BuilderView.prototype.defaultOptions = function() {
      var regex = $('.regex').val();
      var format = $('.format option:selected').val();
      var allowBlank = $('.allowBlank option:selected').val();
      var vtype = $('.vtype option:selected').val();
      
      if(regex!='') {
        $('.regexText').removeAttr('disabled');
      }
      if(format!=undefined) {
        $('.invalidText').removeAttr('disabled');
      }
      if(allowBlank==undefined) {
        $('.blankText').attr('disabled','disabled');
      } else {
        if(allowBlank=='false') {
          $('.blankText').removeAttr('disabled');
        } else {
          $('.blankText').attr('disabled','disabled');
        }
      }
      if(vtype!=undefined) {
        $('.vtypeText').removeAttr('disabled');
      }
      $('#inputRegexDatefield').attr('disabled','disabled');
      $('#inputRegexTextDatefield').attr('disabled','disabled');
    };

    BuilderView.prototype.lockLeftWrapper = function() {
      return this.$fbLeft.data('locked', true);
    };

    BuilderView.prototype.unlockLeftWrapper = function() {
      return this.$fbLeft.data('locked', false);
    };

    BuilderView.prototype.destroyChildren = function(cid) {
      var selected = Ext.getCmp(controller+'GridSection').getSelectionModel().getSelection();
      var record = selected[0];
      var questions = record.get('questions');
      var qlength = Object.keys(questions);
      for(var i = 0, len = qlength.length; i < len; i++) {
          if (questions[i].id_parent) {
            if (questions[i].cid === cid) {
                questions.splice(i,1);
                $("#"+cid).remove();
                break;
            }
          }
      }
      this.updateChildren(questions);
    };

    BuilderView.prototype.addChildren = function(newChildren) {
      var id_parent = $('#buttonModalFormbuilder').val();
      var content = $('#contentGridfield-'+id_parent).html();
      var children = '<div id='+newChildren.cid+'>'+newChildren.configuration.fieldLabel+' - '+newChildren.xtype+'</div>';
      $('#contentGridfield-'+id_parent).html('');
      $('#contentGridfield-'+id_parent).append(content+children);
      var selected = Ext.getCmp(controller+'GridSection').getSelectionModel().getSelection();
      var record = selected[0];
      var questions = record.get('questions');
      var newQuestions = questions.concat(newChildren);
      return this.handleFormUpdate();
    };

    BuilderView.prototype.updateChildren = function(questions) {
      var selected = Ext.getCmp(controller+'GridSection').getSelectionModel().getSelection();
      var record = selected[0];
      var id = record.get('_id');
      var name = record.get('name');
      var id_form = record.get('id_form');
      var token = window.localStorage.getItem('token');
      var questions = this.clearPayload(questions);
      var store = Ext.data.StoreManager.lookup(controller+'.ListSection');

      if(token != undefined){
        $.ajax({
          url: moduleConfig.services.urlListSection+'/'+id,
          type: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          data: Ext.JSON.encode({
            'name'        : name,
            'id_form'     : id_form,
            'status'      : 'active',
            'questions'   : questions,
            'synchronize' : ['questions']
          }),
          contentType: "application/json",
          success  : function(data){
            store.load();
          },
          failure  : function(response) {
            console.log(response);
            $('#modalError').modal('show');
            $('#closeModalError').click(function (e) {
              e.preventDefault(); 
              store.load();
            });
          }
        });
      } else {
        window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
      }
    };

    BuilderView.prototype.clearPayload = function(questions) {
      for (var q=0; q < questions.length; q++) {
        delete questions[q]._id;
        delete questions[q].created_at;
        delete questions[q].updated_at;
        delete questions[q].id_user_update;
      }
      return questions;
    };

    BuilderView.prototype.handleFormUpdate = function() {
      if (this.updatingBatch) {
        return;
      }
      this.formSaved = false;
      return this.saveFormButton.removeAttr('disabled').text(FormbuilderWindow.options.dict.SAVE_FORM);
    };

    BuilderView.prototype.saveForm = function(e) {
      var payload;
      if (this.formSaved) {
        return;
      }
      this.formSaved = true;
      this.saveFormButton.attr('disabled', true).text(FormbuilderWindow.options.dict.ALL_CHANGES_SAVED);
      this.collection.sort();
      payload = this.getPayload();
      this.updateChildren(payload);
      return this.formBuilder.trigger('save', payload);
    };

    BuilderView.prototype.getPayload = function() {
      var selected = Ext.getCmp(controller+'GridSection').getSelectionModel().getSelection();
      var record = selected[0];
      var questions = record.get('questions');
      var newModel = this.formBuilder.mainView.editView.model.attributes;
      var sw = 0, order = 0;
      var qlength = questions.length;
      var parents = [];
      /* Actualizo en la posición que corresponde */
      if(qlength > 0) {
        for (var q=0; q < qlength; q++) {
          if (questions[q].id_parent) {
            if(questions[q].cid == newModel.cid) {
              order = q+1;
              newModel.order = order;
              questions.splice(q,1);
              questions.splice(q,0,newModel);
              sw = 1;
              break;
            }
          }
        }
      }
      /* Ingreso el primero o el último */
      if(sw == 0) {
        order = qlength+1;
        newModel.order = order;
        questions.push(newModel);
      }
      /* Ordeno haciendo un filtrado (por un bug de la versión) */
      if(qlength > 1 && sw == 1) {
        var children = this.sortPayloadChildren(qlength, questions);
        for (var pt=0; pt < qlength; pt++) {
          if (!questions[pt].id_parent) {
            parents.push(questions[pt]);
          }
        }
        questions = [];
        questions = parents.concat(children);
      }
      return questions;
    };

    BuilderView.prototype.sortPayloadChildren = function(qlength, questions) {
      var originalPayload = fbWindow.mainView.collection.toJSON();
      var payload = [];
      var plength = payload.length;
      for (var k=0; k < originalPayload.length; k++) {
        for (var j=0; j < qlength; j++) {
          if (questions[j].id_parent) {
            if(questions[j].cid == originalPayload[k].cid) {
              plength = plength+1;
              originalPayload[k].order = plength;
              payload.splice(k,0,originalPayload[k]);
            }
          }
        }
      }
      return payload;
    };

    BuilderView.prototype.doAjaxSave = function(payload) {
      var _this = this;
      return $.ajax({
        url: FormbuilderWindow.options.HTTP_ENDPOINT,
        type: FormbuilderWindow.options.HTTP_METHOD,
        data: payload,
        contentType: "application/json",
        success: function(data) {
          var datum, _i, _len, _ref5;
          _this.updatingBatch = true;
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            datum = data[_i];
            if ((_ref5 = _this.collection.get(datum.cid)) != null) {
              _ref5.set({
                id: datum.id
              });
            }
            _this.collection.trigger('sync');
          }
          return _this.updatingBatch = void 0;
        }
      });
    };

    return BuilderView;

  })(Backbone.View);

  FormbuilderWindow = (function() {
    FormbuilderWindow.helpers = {
      defaultFieldAttrs: function(field_type) {
        var attrs, _base;
        attrs = {};
        attrs[FormbuilderWindow.options.mappings.ORDER] = 'order';
        attrs[FormbuilderWindow.options.mappings.HASHTAG] = 'Hashtag';
        attrs[FormbuilderWindow.options.mappings.HELPTEXT] = 'Helptext';
        attrs[FormbuilderWindow.options.mappings.XTYPE] = field_type;
        attrs[FormbuilderWindow.options.mappings.FIELDLABEL] = 'Title';
        attrs[FormbuilderWindow.options.mappings.EMPTYTEXT] = 'Default text...';
        attrs[FormbuilderWindow.options.mappings.BLANKTEXT] = 'This field is required';
        attrs[FormbuilderWindow.options.mappings.ALLOWBLANK] = false;
        attrs[FormbuilderWindow.options.mappings.HIDDEN] = false;
        attrs[FormbuilderWindow.options.mappings.HIDEEMPTYLABEL] = true;
        attrs[FormbuilderWindow.options.mappings.HIDELABEL] = false;
        attrs[FormbuilderWindow.options.mappings.READONLY] = false;
        attrs['configuration'] = {};
        //attrs.configuration[FormbuilderWindow.options.mappings.SECTION] = true;
        return (typeof (_base = FormbuilderWindow.fields[field_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
      },
      simple_format: function(x) {
        return x != null ? x.replace(/\n/g, '<br />') : void 0;
      }
    };

    FormbuilderWindow.options = {
      BUTTON_CLASS: 'fb-button',
      HTTP_ENDPOINT: '',
      HTTP_METHOD: 'POST',
      AUTOSAVE: true,
      SECTIONS: 1,
      CLEAR_FIELD_CONFIRM: false,
      mappings: {
        HELPTEXT: 'helptext',
        ORDER: 'order',
        ID_PARENT: 'id_parent',
        HASHTAG: 'hashtag',
        SECTION: 'section',
        MANDATORY: 'section',
        XTYPE: 'xtype',
        REQUIRED: 'required',
        ISEVALUABLE: 'evaluable',
        ADMIN_ONLY: 'admin_only',
        SIZE: 'configuration.size',
        UNITS: 'configuration.units',
        FIELDLABEL: 'configuration.fieldLabel',
        EMPTYTEXT: 'configuration.emptyText',
        ALLOWBLANK: 'configuration.allowBlank',
        BLANKTEXT: 'configuration.blankText',
        HIDDEN: 'configuration.hidden',
        HIDEEMPTYLABEL: 'configuration.hideEmptyLabel',
        HIDELABEL: 'configuration.hideLabel',
        READONLY: 'configuration.readOnly',
        VALUE: 'configuration.value',
        REGEX: 'configuration.regex',
        REGEXTEXT: 'configuration.regexText',
        VTYPE: 'configuration.vtype',
        VTYPETEXT: 'configuration.vtypeText',
        TEST: 'configuration.test',
        OPTIONS: 'configuration.items',
        DEFAULTTYPE: 'configuration.defaultType',
        DESCRIPTION: 'configuration.description',
        INCLUDE_OTHER: 'configuration.include_other_option',
        INCLUDE_BLANK: 'configuration.include_blank_option',
        INTEGER_ONLY: 'configuration.integer_only',
        MIN: 'configuration.min',
        MAX: 'configuration.max',
        MINLENGTH: 'configuration.minLength',
        MAXLENGTH: 'configuration.maxLength',
        MINLENGTHTEXT: 'configuration.minLengthText',
        MAXLENGTHTEXT: 'configuration.maxLengthText',
        VALIDATEBLANK: 'configuration.validateBlank',
        LENGTH_UNITS: 'configuration.min_max_length_units',
        FORMAT: 'configuration.format',
        INVALIDTEXT: 'configuration.invalidText',
        MAXTEXT: 'configuration.maxText',
        MINTEXT: 'configuration.minText',
        MAXVALUE: 'configuration.maxValue',
        MINVALUE: 'configuration.minValue',
        SHOWTODAY: 'configuration.showToday',
        SUBMITFORMAT: 'configuration.submitFormat',
        ALLOWDECIMALS: 'configuration.allowDecimals',
        ALLOWEXPONENTIAL: 'configuration.allowExponential',
        DECIMALPRECISION: 'configuration.decimalPrecision',
        DECIMALSEPARATOR: 'configuration.decimalSeparator',
        NEGATIVETEXT: 'configuration.negativeText',
        COLS: 'configuration.cols',
        ROWS: 'configuration.rows',
        QUERYMODE: 'configuration.queryMode',
        DISPLAYFIELD: 'configuration.displayField',
        VALUEFIELD: 'configuration.valueField',
        EDITABLE: 'configuration.editable',
        LABELWIDTH: 'configuration.labelWidth',
        PAGESIZE: 'configuration.pageSize',
        TYPEAHEAD: 'configuration.typeAhead',
        FORCESELECTION: 'configuration.forceSelection',
        TRIGGERACTION: 'configuration.triggerAction',
        OPTIONSCOMBO: 'configuration.items',
        FIELDS: 'configuration.fields',
        BUTTONTEXT: 'configuration.buttonText',
        MAXFILESIZE: 'configuration.maxFileSize',
        MAXNUMBERFILES: 'configuration.maxNumberFiles',
        FILEEXTENSIONS: 'configuration.fileExtensions',
        TYPECODE: 'configuration.typeCode',
        LABEL: 'configuration.label',
        BOXLABEL: 'configuration.boxLabel',
        CHECKED: 'configuration.checked'
      },
      dict: {
        ALL_CHANGES_SAVED: 'All changes saved',
        SAVE_FORM: 'Save form',
        UNSAVED_CHANGES: 'You have unsaved changes. If you leave this page, you will lose those changes!'
      }
    };

    FormbuilderWindow.fields = {};

    FormbuilderWindow.inputFields = {};

    FormbuilderWindow.nonInputFields = {};

    FormbuilderWindow.jump = function(name, opts) {
        console.log('llega al jump 777')
    }
    
    FormbuilderWindow.registerField = function(name, opts) {
      var x, _i, _len, _ref5;
      _ref5 = ['view', 'edit'];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        x = _ref5[_i];
        opts[x] = _.template(opts[x]);
      }
      opts.xtype = name;
      FormbuilderWindow.fields[name] = opts;
      if (opts.type === 'non_input') {
        return FormbuilderWindow.nonInputFields[name] = opts;
      } else {
        return FormbuilderWindow.inputFields[name] = opts;
      }
    };

    function FormbuilderWindow(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        formBuilder: this
      });
      this.mainView = new BuilderView(args);
    }

    return FormbuilderWindow;

  })();

  window.FormbuilderWindow = FormbuilderWindow;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = FormbuilderWindow;
  } else {
    window.FormbuilderWindow = FormbuilderWindow;
  }

}).call(this);

(function() {
  FormbuilderWindow.registerField('textfield', {
    order: 1,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/regex']() %>\n<%= FormbuilderWindow.templates['edit/regextext']() %>\n<%= FormbuilderWindow.templates['edit/vtype']() %>\n<%= FormbuilderWindow.templates['edit/vtypetext']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-font'></span></span> Text",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.emptyText = 'Default text...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '/[a-z_]/i';
      attrs.configuration.regexText = 'This field should only contain letters and _';
      attrs.configuration.vtype = 'alpha';
      attrs.configuration.vtypeText = 'This field should only contain letters and _';
      attrs.configuration.minLength = 0;
      attrs.configuration.maxLength = 20;
      attrs.configuration.minLengthText = 'The minimum length for this field is {0}';
      attrs.configuration.maxLengthText = 'The maximum length for this field is {0}';
      attrs.configuration.validateBlank = false;
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('textareafield', {
    order: 2,
    view: "<textarea placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' class='rf-size-large'></textarea>",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/regex']() %>\n<%= FormbuilderWindow.templates['edit/regextext']() %>\n<%= FormbuilderWindow.templates['edit/vtype']() %>\n<%= FormbuilderWindow.templates['edit/vtypetext']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/cols']() %>\n<%= FormbuilderWindow.templates['edit/rows']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class=\"symbol\">&#182;</span> Paragraph",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Title';
      attrs.configuration.emptyText = 'Default text...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.minLength = 0;
      attrs.configuration.maxLength = 200;
      attrs.configuration.minLengthText = 'The minimum length for this field is {0}';
      attrs.configuration.maxLengthText = 'The maximum length for this field is {0}';
      attrs.configuration.validateBlank = false;
      attrs.configuration.cols = 20;
      attrs.configuration.rows = 4;
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('checkboxfield', {
    order: 3,
    view: "\n<label class='section-name'>\n<input type='checkbox' class='fb-checkbox-window' <%= rf.get(FormbuilderWindow.options.mappings.CHECKED) %> />&nbsp;&nbsp;<%= rf.get(FormbuilderWindow.options.mappings.BOXLABEL) %></label>\n",
    edit: "<%= FormbuilderWindow.templates['edit/partialcheckbox']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-check\"></span></span> Checkboxes",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Checkbox';
      attrs.configuration.checked = false;
      attrs.configuration.boxLabel ='Option 1';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('fieldcontainer', {
    order: 4,
    view: "<% for (i in (rf.get(FormbuilderWindow.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='radio' <%= rf.get(FormbuilderWindow.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(FormbuilderWindow.options.mappings.OPTIONS)[i].boxLabel %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(FormbuilderWindow.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='radio' />\n      Other\n    </label>\n\n    <input type='text' />\n  </div>\n<% } %>",
    edit: "<%= FormbuilderWindow.templates['edit/options']({ includeOther: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-record\"></span></span> Multiple Choice",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.defaultType = 'radiofield';
      attrs.configuration.fieldLabel = 'Radio Group';
      attrs.configuration.items = [
        {
          checked    : false,
          boxLabel   : 'Option 1',
          name       : 'radiogroup',
          inputValue : 'option1'
        },
        {
          checked    : false,
          boxLabel   : 'Option 2',
          name       : 'radiogroup',
          inputValue : 'option2'
        }
      ];
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('combobox', {
    order: 5,
    view: "<select placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' >\n  <% if (rf.get(FormbuilderWindow.options.mappings.INCLUDE_BLANK)) { %>\n    <option value=''></option>\n  <% } %>\n\n  <% for (i in (rf.get(FormbuilderWindow.options.mappings.OPTIONS) || [])) { %>\n    <option <%= rf.get(FormbuilderWindow.options.mappings.OPTIONS)[i].checked && 'selected' %>>\n      <%= rf.get(FormbuilderWindow.options.mappings.OPTIONS)[i].label %>\n    </option>\n  <% } %>\n</select>",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/displayfield']() %>\n<%= FormbuilderWindow.templates['edit/valuefield']() %>\n<%= FormbuilderWindow.templates['edit/pagesize']() %>\n<%= FormbuilderWindow.templates['edit/typeahead']() %>\n<%= FormbuilderWindow.templates['edit/forceselection']() %>\n<%= FormbuilderWindow.templates['edit/triggeraction']() %>\n<%= FormbuilderWindow.templates['edit/optionscombo']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-triangle-bottom\"></span></span> Dropdown",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.emptyText = 'Select a option...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.queryMode = 'local';
      attrs.configuration.displayField = 'name';
      attrs.configuration.valueField = 'id';
      attrs.configuration.editable = false;
      attrs.configuration.labelWidth = '100%';
      attrs.configuration.pageSize = 10;
      attrs.configuration.typeAhead = false;
      attrs.configuration.forceSelection = true;
      attrs.configuration.triggerAction = 'all';
      attrs.configuration.fields = ['id', 'name'];
      attrs.configuration.items = [
        {
          id         : 'option1',
          name       : 'Option 1',
          boxLabel   : 'Option 1',
          inputValue : 'option1'
        }
        ,
        {
          id         : 'option2',
          name       : 'Option 2',
          boxLabel   : 'Option 2',
          inputValue : 'option2'
        }
      ];
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('numberfield', {
    order: 6,
    view: "<input placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' class='rf-size-large' type='text' />\n<% if (units = rf.get(FormbuilderWindow.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/regex']() %>\n<%= FormbuilderWindow.templates['edit/regextext']() %>\n<%= FormbuilderWindow.templates['edit/vtype']() %>\n<%= FormbuilderWindow.templates['edit/vtypetext']() %>\n<%= FormbuilderWindow.templates['edit/maxtext']() %>\n<%= FormbuilderWindow.templates['edit/mintext']() %>\n<%= FormbuilderWindow.templates['edit/maxvalue']() %>\n<%= FormbuilderWindow.templates['edit/minvalue']() %>\n<%= FormbuilderWindow.templates['edit/allowdecimals']() %>\n<%= FormbuilderWindow.templates['edit/allowexponential']() %>\n<%= FormbuilderWindow.templates['edit/decimalprecision']() %>\n<%= FormbuilderWindow.templates['edit/decimalseparator']() %>\n<%= FormbuilderWindow.templates['edit/negativetext']() %>",
    addButton: "<span class=\"symbol\">123</span> Number",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Number';
      attrs.configuration.emptyText = 'Type a number...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '/^[0-9]*$/';
      attrs.configuration.regexText = 'This field should only contain numbers';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.maxText = 'The maximum value for this field is {0}';
      attrs.configuration.minText = 'The minimum value for this field is {0}';
      attrs.configuration.maxValue = '';
      attrs.configuration.minValue = '';
      attrs.configuration.allowDecimals = true;
      attrs.configuration.allowExponential = true;
      attrs.configuration.decimalPrecision = 2;
      attrs.configuration.decimalSeparator = '.';
      attrs.configuration.negativeText = 'The value cannot be negative';
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('timefield', {
    order: 7,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/partialtimefield']() %>\n<%= FormbuilderWindow.templates['edit/partialrequiredfield']() %>\n<%= FormbuilderWindow.templates['edit/partialvtype']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-time\"></span></span> Time",
    defaultAttributes: function(attrs) {
      var format = ($( "#selectFormatTimefield" ).val() == null) ? 'H:i a' : $( "#selectFormatTimefield" ).val();
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Time';
      attrs.configuration.emptyText = 'Time format is: H:MM AM/PM. For ex. 6:00 AM or 8:00 PM';
      attrs.configuration.value = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.format = format;
      attrs.configuration.regex = '/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])s([A|P]M)$/';
      attrs.configuration.regexText = 'Time format is: '+format;
      attrs.configuration.invalidText = '{0} is not a valid time';
      attrs.configuration.maxText = 'The time in this field must be equal to or before {0}';
      attrs.configuration.minText = 'The time in this field must be equal to or after {0}';
      attrs.configuration.maxValue = '8:00 PM';
      attrs.configuration.minValue = '6:00 AM';
      attrs.configuration.submitFormat = format;
      return attrs;
    }
  });

}).call(this);

(function() {
  FormbuilderWindow.registerField('datefield', {
    order: 8,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/partialdatefield']() %>\n<%= FormbuilderWindow.templates['edit/partialrequiredfield']() %>\n<%= FormbuilderWindow.templates['edit/partialvtype']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-calendar\"></span></span> Date",
    defaultAttributes: function(attrs) {
      var now = new Date();
      var dd = now.getDate();
      var mm = now.getMonth()+1;
      var yyyy = now.getFullYear();
      var today = mm+'/'+dd+'/'+yyyy;
      var format = ($( "#selectFormatDatefield" ).val() == null) ? 'm/d/Y' : $( "#selectFormatDatefield" ).val();
      var emptyText = ($( "#selectFormatDatefield" ).val() == null) ? 'MM/DD/YYYY' : $( "#inputEmptyTextDatefield" ).val();
      var regex = ($( "#selectFormatDatefield" ).val() == null) ? '/^\d{2}\/\d{2}\/\d{4}$/' : $( "#inputRegexDatefield" ).val();
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Date';
      attrs.configuration.emptyText = emptyText;
      attrs.configuration.value = '';
      attrs.configuration.vtype = 'alphanum';
      attrs.configuration.vtypeText = 'This field should be Alphanumeric';
      attrs.configuration.format = format;
      attrs.configuration.regex = regex;
      attrs.configuration.regexText = 'Date format is: '+format;
      attrs.configuration.invalidText = '{0} is not a valid date - it must be in the format {1}';
      attrs.configuration.maxText = 'The date in this field must be equal to or before {0}';
      attrs.configuration.minText = 'The date in this field must be equal to or after {0}';
      attrs.configuration.maxValue = today;
      attrs.configuration.minValue = '01/01/'+yyyy;
      attrs.configuration.showToday = true;
      return attrs;
    }   
  });
}).call(this);

//(function() {
//  FormbuilderWindow.registerField('address', {
//    order: 9,
//    view: "<div class='input-line'>\n  <span class='street'>\n    <input type='text' />\n    <label>Address</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='city'>\n    <input type='text' />\n    <label>City</label>\n  </span>\n\n  <span class='state'>\n    <input type='text' />\n    <label>State / Province / Region</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='zip'>\n    <input type='text' />\n    <label>Zipcode</label>\n  </span>\n\n  <span class='country'>\n    <select><option>United States</option></select>\n    <label>Country</label>\n  </span>\n</div>",
//    edit: "",
//    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-home\"></span></span> Address",
//    defaultAttributes: function(attrs) {
//      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
//      attrs.configuration.fieldLabel = 'Composite Field (Address)';
//    }
//  });
//}).call(this);

(function() {
  FormbuilderWindow.registerField('email', {
    order: 10,
    view: "<input placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' type='text' class='rf-size-large' />",
    edit: "<%= FormbuilderWindow.templates['edit/emptytext']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-envelope\"></span></span> Email",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Email';
      attrs.configuration.emptyText = 'name@domain.com';
      attrs.configuration.value = '';
      attrs.configuration.regex = '/[a-z0-9_\.\-@\+]/i';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = 'email';
      attrs.configuration.vtypeText = 'This field should be an e-mail address in the format "user@example.com"';
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('filefield', {
    order: 11,
    view: "<div class='width-full-inline'><div class='floating-box-input'><input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' /> </div><div class='floating-box-button'><button class='floating-box-button-config'><span class='symbol'><span class='glyphicon glyphicon-folder-open'></span></span> <%= rf.get(FormbuilderWindow.options.mappings.BUTTONTEXT) %></button></div></div>",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/buttontext']() %>\n<%= FormbuilderWindow.templates['edit/maxfilesize']() %>\n<%= FormbuilderWindow.templates['edit/maxnumberfiles']() %>\n<%= FormbuilderWindow.templates['edit/fileextensions']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-cloud-upload'></span></span> File Upload",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'File';
      attrs.configuration.emptyText = 'Upload file...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.buttonText = 'Browse...';
      attrs.configuration.maxFileSize = 1024;
      attrs.configuration.maxNumberFiles = 1;
      attrs.configuration.fileExtensions = 'jpg, jpeg, png, gif, bmp';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('website', {
    order: 12,
    view: "<input type='text' class='rf-size-large' placeholder='http://<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-link\"></span></span> Website",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Website';
      attrs.configuration.emptyText = 'www.domain.com';
      attrs.configuration.value = '';
      attrs.configuration.regex = '/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/';
      attrs.configuration.regexText = 'Website format is "www.domain.com"';
      attrs.configuration.vtype = 'url';
      attrs.configuration.vtypeText = 'This field should be valid domain in the format "www.domain.com"';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('price', {
    order: 13,
    view: "<input placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' type='text' class='rf-size-large' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/maxtext']() %>\n<%= FormbuilderWindow.templates['edit/mintext']() %>\n<%= FormbuilderWindow.templates['edit/maxvalue']() %>\n<%= FormbuilderWindow.templates['edit/minvalue']() %>\n<%= FormbuilderWindow.templates['edit/allowdecimals']() %>\n<%= FormbuilderWindow.templates['edit/allowexponential']() %>\n<%= FormbuilderWindow.templates['edit/decimalprecision']() %>\n<%= FormbuilderWindow.templates['edit/decimalseparator']() %>\n<%= FormbuilderWindow.templates['edit/negativetext']() %>",
    addButton: "<span class=\"symbol\"><span class=\"glyphicon glyphicon-usd\"></span></span> Price",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Price';
      attrs.configuration.emptyText = 'Enter the price...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/';
      attrs.configuration.regexText = 'Money format, example: $1,530,602.24 or 1,530,602.24';
      attrs.configuration.vtype = 'price';
      attrs.configuration.vtypeText = 'This field should be a price in the money format. Example: $1,530,602.24 or 1,530,602.24';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('photofield', {
    order: 14,
    view: "<div class='width-full-inline'><div class='floating-box-input'><input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' /> </div><div class='floating-box-button'><button class='floating-box-button-config'><span class='symbol'><span class='glyphicon glyphicon-folder-open'></span></span> <%= rf.get(FormbuilderWindow.options.mappings.BUTTONTEXT) %></button></div></div>",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/buttontext']() %>\n<%= FormbuilderWindow.templates['edit/maxfilesize']() %>\n<%= FormbuilderWindow.templates['edit/maxnumberfiles']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-picture'></span></span> Photo Upload",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Photo';
      attrs.configuration.emptyText = 'Upload photo...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.buttonText = 'Browse...';
      attrs.configuration.maxFileSize = 1024;
      attrs.configuration.maxNumberFiles = 1;
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('signaturefield', {
    order: 15,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-pencil'></span></span> Signature",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Signature';
      attrs.configuration.emptyText = 'Type your signature...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('qrcodefield', {
    order: 16,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-qrcode'></span></span> QR Code",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'QR Code';
      attrs.configuration.emptyText = 'Type your text...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('barcodefield', {
    order: 17,
    view: "<input type='text' class='rf-size-large' placeholder='<%= rf.get(FormbuilderWindow.options.mappings.EMPTYTEXT) %>' />",
    edit: "\n<%= FormbuilderWindow.templates['edit/typecode']() %>\n<%= FormbuilderWindow.templates['edit/emptytext']() %>\n<%= FormbuilderWindow.templates['edit/blanktext']() %>\n<%= FormbuilderWindow.templates['edit/allowblank']() %>\n<%= FormbuilderWindow.templates['edit/hidden']() %>\n<%= FormbuilderWindow.templates['edit/hideemptylabel']() %>\n<%= FormbuilderWindow.templates['edit/hidelabel']() %>\n<%= FormbuilderWindow.templates['edit/readonly']() %>\n<%= FormbuilderWindow.templates['edit/value']() %>\n<%= FormbuilderWindow.templates['edit/minlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/maxlengthtext']() %>\n<%= FormbuilderWindow.templates['edit/validateblank']() %>\n<%= FormbuilderWindow.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-barcode'></span></span> Bar Code",
    defaultAttributes: function(attrs) {
      attrs.id_parent = $('#buttonModalFormbuilder').attr('value');
      attrs.configuration.fieldLabel = 'Bar Code';
      attrs.configuration.emptyText = 'Type your text...';
      attrs.configuration.value = '';
      attrs.configuration.regex = '';
      attrs.configuration.regexText = '';
      attrs.configuration.vtype = '';
      attrs.configuration.vtypeText = '';
      attrs.configuration.typeCode = 'CODABAR';
      return attrs;
    }
  });
}).call(this);

(function() {
  FormbuilderWindow.registerField('labelfield', {
    order: 18,
    view: "<label class='section-name'><%= rf.get(FormbuilderWindow.options.mappings.LABEL) %></label>\n",
    edit: "",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-minus'></span></span> Label",
    defaultAttributes: function(attrs) {
      attrs.configuration.fieldLabel = 'Label';
    }
});
}).call(this);

(function() {
  FormbuilderWindow.registerField('recordvideofield', {
    order: 19,
    view: "<label class='section-name'></label>\n",
    edit: "",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-facetime-video'></span></span> Record Vídeo",
    defaultAttributes: function(attrs) {
      attrs.configuration.fieldLabel = 'Record Vídeo';
    }
});
}).call(this);

(function() {
  FormbuilderWindow.registerField('recordvoicefield', {
    order: 20,
    view: "<label class='section-name'></label>\n",
    edit: "",
    addButton: "<span class='symbol'><span class='glyphicon glyphicon-bullhorn'></span></span> Record Voice",
    defaultAttributes: function(attrs) {
      attrs.configuration.fieldLabel = 'Record Voice';
    }
});
}).call(this);

this["FormbuilderWindow"] = this["FormbuilderWindow"] || {};
this["FormbuilderWindow"]["templates"] = this["FormbuilderWindow"]["templates"] || {};
this["FormbuilderWindow"]["templates"]["edit/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
//((__t = ( FormbuilderWindow.templates['edit/base_header']() )) == null ? '' : __t) +
//'\n' +
((__t = ( FormbuilderWindow.templates['edit/common']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.fields[rf.get(FormbuilderWindow.options.mappings.XTYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/base_header"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-field-label\'>\n  <span data-rv-text="model.' +
((__t = ( FormbuilderWindow.options.mappings.FIELDLABEL )) == null ? '' : __t) +
'"></span>\n  <code class=\'field-type\' data-rv-text=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.XTYPE )) == null ? '' : __t) +
'\'></code>\n  <span class=\'glyphicon glyphicon-arrow-right pull-right\'></span>\n</div>';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( FormbuilderWindow.templates['edit/base_header']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.fields[rf.get(FormbuilderWindow.options.mappings.XTYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/checkboxes"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.REQUIRED )) == null ? '' : __t) +
'\' />\n  Required\n</label>\n<!-- label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.ADMIN_ONLY )) == null ? '' : __t) +
'\' />\n  Admin only\n</label -->';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/common"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 
  '<div class=\'fb-edit-section-header\'>Fieldlabel</div>\n\n<div class=\'fb-common-wrapper\'>\n  <div class=\'fb-label-description\'>\n    ' +
((__t = ( FormbuilderWindow.templates['edit/label_description']() )) == null ? '' : __t) +
'\n  </div>\n' +
((__t = ( FormbuilderWindow.templates['edit/hashtag']() )) == null ? '' : __t) +
((__t = ( FormbuilderWindow.templates['edit/helptext']() )) == null ? '' : __t) + '\n</div>\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/integer_only"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Integer only</div>\n<label>\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.INTEGER_ONLY )) == null ? '' : __t) +
'\' />\n  Only accept integers\n</label>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/label_description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type=\'text\' class="fieldLabel" data-rv-input=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.FIELDLABEL )) == null ? '' : __t) +'\' />';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/min_max"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\n\nAbove\n<input type="text" class="min" data-rv-input="model.' +
((__t = ( FormbuilderWindow.options.mappings.MIN )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nBelow\n<input type="text" class="max" data-rv-input="model.' +
((__t = ( FormbuilderWindow.options.mappings.MAX )) == null ? '' : __t) +
'" style="width: 30px" />\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/min_max_length"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Length Limit</div>\n\nMin\n<input type="text" class="minLength" data-rv-input="model.' +
((__t = ( FormbuilderWindow.options.mappings.MINLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n\nMax\n<input type="text" class="maxLength" data-rv-input="model.' +
((__t = ( FormbuilderWindow.options.mappings.MAXLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\n\n&nbsp;&nbsp;\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/optionsname"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Group Name</div>\n<div class="fb-common-wrapper"><div class="fb-label-description"><input type="text" id="optionsName" class=\'optionsName\'/>' +
'\n</div></div>\n  <div class=\'fb-clear\'></div>\n</div>\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += ((__t = ( FormbuilderWindow.templates['edit/optionsname']() )) == null ? '' : __t);
__p += '<div class=\'fb-edit-section-header\'>Options</div>\n\n';
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\n  <input type="text" data-rv-input="option:boxLabel" class=\'option-label-input\' />\n  <a class="js-add-option ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Option"><i class=\'glyphicon glyphicon-plus-sign\'></i></a>\n  <a class="js-remove-option ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Option"><i class=\'glyphicon glyphicon-minus-sign\'></i></a>\n</div>\n\n';
__p += '\n\n<div class=\'fb-bottom-add\'>\n  <a class="js-add-option ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add option</a>\n</div>\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/optionscheckbox"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += ((__t = ( Formbuilder.templates['edit/optionsname']() )) == null ? '' : __t);
__p += '<div class=\'fb-edit-section-header\'>Options</div>\n\n';
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\n  <input type="text" data-rv-input="option:boxLabel" class=\'option-label-input\' />\n</div>\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/optionscombo"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Options</div>\n\n';
__p += '\n\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( FormbuilderWindow.options.mappings.OPTIONSCOMBO )) == null ? '' : __t) +
'\'>\n  <input type="text" data-rv-input="option:name" class=\'option-label-input\' />\n  <a class="js-add-option-combo ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +'" title="Add Option"><i class=\'glyphicon glyphicon-plus-sign\'></i></a>\n  <a class="js-remove-option-combo ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +'" title="Remove Option"><i class=\'glyphicon glyphicon-minus-sign\'></i></a>\n</div>\n\n';
__p += '\n\n<div class=\'fb-bottom-add\'>\n  <a class="js-add-option-combo ' +((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +'">Add option</a>\n</div>\n';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/size"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Size</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.SIZE )) == null ? '' : __t) +'">\n  <option value="small">Small</option>\n  <option value="medium">Medium</option>\n  <option value="large">Large</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/units"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Units</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.UNITS )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/emptytext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Emptytext</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="emptyText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.EMPTYTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/hashtag"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Hashtag</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="hashTag" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.HASHTAG )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/helptext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Helptext</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="helpText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.HELPTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/isevaluable"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Emptytext</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="emptyText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.EMPTYTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};
///////////////////////////////////////////

this["FormbuilderWindow"]["templates"]["edit/blanktext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Blanktext</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="blankText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.BLANKTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/allowblank"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>AllowBlank</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="allowBlank" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.ALLOWBLANK )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/hidden"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Hidden</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hidde" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDDEN )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/hideemptylabel"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>HideEmptyLabel</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideEmptyLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDEEMPTYLABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/hidelabel"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>HideLabel</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDELABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/readonly"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ReadOnly</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="readOnly" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.READONLY )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/value"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Value</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="value" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.VALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/regex"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>RegEx</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regex" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEX )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/regextext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>RegExText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" id="regexText" class="regexText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEXTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/vtype"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Vtype</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="vtype" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.VTYPE )) == null ? '' : __t) +'">\n  <option value="alpha">Alphabetic</option>\n  <option value="alphanum">Alphanumeric</option>\n</select>';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/vtypetext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>VtypeText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="vtypeText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.VTYPETEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/minlengthtext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MinLengthText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minLengthText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINLENGTHTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/maxlengthtext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MaxLengthText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxLengthText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXLENGTHTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/validateblank"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ValidateBlank</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="validateBlank" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.VALIDATEBLANK )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/formatdatefield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Format</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select id="selectFormatDatefield" class="format" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.FORMAT )) == null ? '' : __t) +'">\n<option value="d/m/Y">DD/MM/YYYY</option>\n<option value="d/m/y">DD/MM/YY</option>\n<option value="d-m-Y">DD-MM-YYYY</option>\n<option value="d-m-y">DD-MM-YY</option>\n<option value="m/d/Y">MM/DD/YYYY</option>\n<option value="n/j/Y">M/D/YYYY</option>\n<option value="n/j/y">M/D/YY</option>\n<option value="m/j/y">MM/D/YY</option>\n<option value="n/d/y">M/DD/YY</option>\n<option value="m/j/Y">MM/D/YYYY</option>\n<option value="n/d/Y">M/DD/YYYY</option>\n<option value="m-d-y">MM-DD-YY</option>\n<option value="m-d-Y">MM-DD-YYYY</option>\n<option value="m/d">MM/DD</option>\n<option value="m-d">MM-DD</option>\n<option value="md">MMDD</option>\n<option value="mdy">MMDDYY</option>\n<option value="mdY">MMDDYYYY</option>\n<option value="d">DD</option>\n<option value="Y-m-d">YYYY-MM-DD</option>\n<option value="n-j">M-D</option>\n<option value="n/j">M/D</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/format"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Format</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="format" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.FORMAT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/invalidtext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>InvalidText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="invalidText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.INVALIDTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/maxtext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MaxText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/mintext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MinText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/maxvalue"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MaxValue</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/minvalue"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MinValue</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/showtoday"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ShowToday</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="showToday" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.SHOWTODAY )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/submitformat"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>SubmitFormat</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="submitFormat" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.SUBMITFORMAT )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/allowdecimals"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>AllowDecimals</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="allowDecimals" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.ALLOWDECIMALS )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/allowexponential"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>AllowExponential</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="allowExponential" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.ALLOWEXPONENTIAL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/decimalprecision"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>DecimalPrecision</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="decimalPrecision" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.DECIMALPRECISION )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/decimalseparator"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>DecimalSeparator</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="decimalSeparator" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.DECIMALSEPARATOR )) == null ? '' : __t) +'">\n  <option value=".">Point</option>\n  <option value=",">Comma</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/negativetext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>NegativeText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="negativeText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.NEGATIVETEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/cols"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Cols</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="cols" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.COLS )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/rows"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Rows</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="rows" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.ROWS )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/pagesize"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>PageSize</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="pageSize" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.PAGESIZE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/typeahead"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>TypeAhead</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="typeAhead" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.TYPEAHEAD )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/forceselection"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ForceSelection</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="forceSelection" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.FORCESELECTION )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/triggeraction"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>TriggerAction</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="triggerAction" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.TRIGGERACTION )) == null ? '' : __t) +'">\n  <option value="all">All</option>\n  <option value="query">Query</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/valuefield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ValueField</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="valueField" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.VALUEFIELD )) == null ? '' : __t) +'">\n  <option value="id">ID</option>\n  <option value="name">Name</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/displayfield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>DisplayField</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="displayField" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.DISPLAYFIELD )) == null ? '' : __t) +'">\n  <option value="id">ID</option>\n  <option value="name">Name</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/buttontext"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>ButtonText</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="buttonText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.BUTTONTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/maxfilesize"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MaxFileSize</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxFileSize" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXFILESIZE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/maxnumberfiles"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>MaxNumberFiles</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxNumberFiles" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXNUMBERFILES )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/fileextensions"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>FileExtensions</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="option"><input type="checkbox" name="imageExtensions[]" class="fileExtensions" value="jpg, jpeg" />&nbsp;&nbsp;<label> JPG/JPEG</label></div>\n';
__p += '<div class="option"><input type="checkbox" name="imageExtensions[]" class="fileExtensions" value="png" />&nbsp;&nbsp;<label> PNG</label></div>\n';
__p += '<div class="option"><input type="checkbox" name="imageExtensions[]" class="fileExtensions" value="gif" />&nbsp;&nbsp;<label> GIF</label></div>\n';
__p += '<div class="option"><input type="checkbox" name="imageExtensions[]" class="fileExtensions" value="bmp" />&nbsp;&nbsp;<label> BMP</label></div>\n';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/typecode"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Type Code</div>\n';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="typeCode" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.TYPECODE )) == null ? '' : __t) +'">\n  <option value="CODABAR">Codabar</option>\n<option value="CODE_39">Code 39</option>\n<option value="CODE_93">Code 93</option>\n<option value="CODE_128">Code 128</option>\n  <option value="DATA_MATRIX">Data Matrix</option>\n  <option value="EAN_8">International Article Number (8 digit)</option>\n  <option value="EAN_13">International Article Number (13 digit)</option>\n  <option value="ITF">Interleaved Two of Five</option>\n  <option value="PDF417">PDF417</option>\n  <option value="UPC_A">Universal Product Code (6 digit)</option>\n  <option value="UPC_E">Universal Product Code (12 digit)</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialcheckbox"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Checkbox Configuration</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Checked</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="checked" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.CHECKED )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>BoxLabel</strong>\n&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type=\'text\' class="boxLabel" data-rv-input=\'model.' +((__t = ( FormbuilderWindow.options.mappings.BOXLABEL )) == null ? '' : __t) +'\' />\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialrequiredfield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Required Field</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>AllowBlank</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="allowBlank" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.ALLOWBLANK )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>BlankText</strong>\n&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type=\'text\' class="blankText" data-rv-input=\'model.' +((__t = ( FormbuilderWindow.options.mappings.BLANKTEXT )) == null ? '' : __t) +'\' disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialregexp"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Regular Expression</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Regex</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regex" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEX )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>RegexText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regexText" id="inputRegexTextDatefield" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEXTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialvtype"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Field Validation</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Vtype</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="vtype" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.VTYPE )) == null ? '' : __t) +'">\n  <option value="alpha">Alphabetic</option>\n  <option value="alphanum">Alphanumeric</option>\n</select>';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>VtypeText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input class="vtypeText" type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.VTYPETEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
}
return __p
};
this["FormbuilderWindow"]["templates"]["edit/partialformat"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Field Format</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Format</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="format" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.FORMAT )) == null ? '' : __t) +'" >\n<option value="d/m/Y">DD/MM/YYYY</option>\n<option value="d/m/y">DD/MM/YY</option>\n<option value="d-m-Y">DD-MM-YYYY</option>\n<option value="d-m-y">DD-MM-YY</option>\n<option value="m/d/Y">MM/DD/YYYY</option>\n<option value="n/j/Y">M/D/YYYY</option>\n<option value="n/j/y">M/D/YY</option>\n<option value="m/j/y">MM/D/YY</option>\n<option value="n/d/y">M/DD/YY</option>\n<option value="m/j/Y">MM/D/YYYY</option>\n<option value="n/d/Y">M/DD/YYYY</option>\n<option value="m-d-y">MM-DD-YY</option>\n<option value="m-d-Y">MM-DD-YYYY</option>\n<option value="m/d">MM/DD</option>\n<option value="m-d">MM-DD</option>\n<option value="md">MMDD</option>\n<option value="mdy">MMDDYY</option>\n<option value="mdY">MMDDYYYY</option>\n<option value="d">DD</option>\n<option value="Y-m-d">YYYY-MM-DD</option>\n<option value="n-j">M-D</option>\n<option value="n/j">M/D</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>InvalidText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input class="invalidText" type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.INVALIDTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialtimefield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Emptytext</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type=\'text\' class="emptyText" id="inputEmptyTextTimefield" data-rv-input=\'model.' +((__t = ( FormbuilderWindow.options.mappings.EMPTYTEXT )) == null ? '' : __t) +'\' />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Hidden</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hidde" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDDEN )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>HideEmptyLabel</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideEmptyLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDEEMPTYLABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>HideLabel</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDELABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>ReadOnly</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="readOnly" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.READONLY )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Value</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="value" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.VALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MaxText</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MinText</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MaxValue</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MinValue</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>SubmitFormat</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.SUBMITFORMAT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
/**Regular Expression**/
__p += '<div class=\'fb-edit-section-header\'>Regular Expression</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Regex</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regex" id="inputRegexTimefield" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEX )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>RegexText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regexText" id="inputRegexTextTimefield" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEXTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
/**End Regular Expression**/
/**Format**/
__p += '<div class=\'fb-edit-section-header\'>Field Format</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Format</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="format" id="selectFormatTimefield" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.FORMAT )) == null ? '' : __t) +'" ><option value="H:i a">HH:MM AM/PM (Hour, 24-hour, with leading zeros [00–23])</option>\n<option value="g:ia">H:MMam/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="g:iA">H:MMAM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="g:i a">H:MM am/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="g:i A">H:MM AM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="h:i">HH:MM (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="g:i">H:MM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="H:i">HH:MM (Hour, 24-hour, with leading zeros [00–23])</option>\n<option value="ga">Ham/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="ha">HHam/pm (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="gA">HAM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="h a">HH am/pm (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="g a">H am/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="g A">H AM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="gi">HMM(Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="hi">HHMM (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="gia">HMMam/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="hia">HHMMam/pm (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="g">H(Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="H">HH (Hour, 24-hour, with leading zeros [00–23])</option>\n<option value="gi a">HMM am/pm (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="hi a">HHMM am/pm (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="giA">HMMAM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="hiA">HHMMAM/PM (Hour, 12-hour, with leading zeros [01–12])</option>\n<option value="gi A">HMM AM/PM (Hour, 12-hour, without leading zeros [1–12])</option>\n<option value="hi A">HHMM AM/PM (Hour, 12-hour, with leading zeros [01–12])</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>InvalidText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input class="invalidText" type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.INVALIDTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
/**End Format**/
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/partialdatefield"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Emptytext</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type=\'text\' class="emptyText" id="inputEmptyTextDatefield" data-rv-input=\'model.' +((__t = ( FormbuilderWindow.options.mappings.EMPTYTEXT )) == null ? '' : __t) +'\' />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Hidden</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hidde" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDDEN )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>HideEmptyLabel</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideEmptyLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDEEMPTYLABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>HideLabel</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="hideLabel" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.HIDELABEL )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>ReadOnly</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="readOnly" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.READONLY )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option></select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>Value</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="value" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.VALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MaxText</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MinText</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minText" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINTEXT )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MaxValue</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="maxValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MAXVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>MinValue</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="minValue" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.MINVALUE )) == null ? '' : __t) +'" />\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
__p += '<div class=\'fb-edit-section-header\'>ShowToday</div>';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="showToday" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.SHOWTODAY )) == null ? '' : __t) +'">\n  <option value="true">True</option>\n  <option value="false">False</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
/************************************************************************/
/**Regular Expression**/
__p += '<div class=\'fb-edit-section-header\'>Regular Expression</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Regex</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regex" id="inputRegexDatefield" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEX )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>RegexText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input type="text" class="regexText" id="inputRegexTextDatefield" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.REGEXTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
/**End Regular Expression**/
/**Format**/
__p += '<div class=\'fb-edit-section-header\'>Field Format</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>Format</strong>\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<select class="format" id="selectFormatDatefield" data-rv-value="model.' +((__t = ( FormbuilderWindow.options.mappings.FORMAT )) == null ? '' : __t) +'" >\n<option value="d/m/Y">DD/MM/YYYY</option>\n<option value="d/m/y">DD/MM/YY</option>\n<option value="d-m-Y">DD-MM-YYYY</option>\n<option value="d-m-y">DD-MM-YY</option>\n<option value="m/d/Y">MM/DD/YYYY</option>\n<option value="n/j/Y">M/D/YYYY</option>\n<option value="n/j/y">M/D/YY</option>\n<option value="m/j/y">MM/D/YY</option>\n<option value="n/d/y">M/DD/YY</option>\n<option value="m/j/Y">MM/D/YYYY</option>\n<option value="n/d/Y">M/DD/YYYY</option>\n<option value="m-d-y">MM-DD-YY</option>\n<option value="m-d-Y">MM-DD-YYYY</option>\n<option value="m/d">MM/DD</option>\n<option value="m-d">MM-DD</option>\n<option value="md">MMDD</option>\n<option value="mdy">MMDDYY</option>\n<option value="mdY">MMDDYYYY</option>\n<option value="d">DD</option>\n<option value="Y-m-d">YYYY-MM-DD</option>\n<option value="n-j">M-D</option>\n<option value="n/j">M/D</option>\n</select>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
__p += '<div class=\'input-line\'>';
__p += '<strong>InvalidText</strong>\n&nbsp;';
__p += '<div class="fb-common-wrapper">';
__p += '<div class="fb-label-description">';
__p += '<input class="invalidText" type="text" data-rv-input="model.' +((__t = ( FormbuilderWindow.options.mappings.INVALIDTEXT )) == null ? '' : __t) +'" disabled/>\n';
__p += '</div>';
__p += '</div>';
__p += '</div>';
/**End Format**/
}
return __p
};

this["FormbuilderWindow"]["templates"]["edit/compositegrid"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-bottom-add\' >\n';
__p += '<button data-toggle="modal" data-target="#modalFormbuilder" class="js-save-form fb-button" title="Fields Settings"><i class=\'glyphicon glyphicon-plus-sign\'></i></span></span> Fields Settings</button>\n';
__p += '</div>\n';
}
return __p
};

///////////////////////////////////////////
this["FormbuilderWindow"]["templates"]["page"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( FormbuilderWindow.templates['partials/save_button']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.templates['partials/left_side']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.templates['partials/right_side']() )) == null ? '' : __t) +
'\n<div class=\'fb-clear\'></div>';

}
return __p
};
this["FormbuilderWindow"]["templates"]["newpage"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( FormbuilderWindow.templates['partials/save_button']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.templates['partials/left_side']() )) == null ? '' : __t) +
'\n' +
((__t = ( FormbuilderWindow.templates['partials/right_side']() )) == null ? '' : __t) +
'\n<div class=\'fb-clear\'></div>';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/add_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-tab-pane active\' id=\'addFieldWindow\'>\n  <div class=\'fb-add-field-types\'>\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(FormbuilderWindow.inputFields, 'order'), function(f){ ;
__p += '\n        <a data-field-type="' +
((__t = ( f.xtype )) == null ? '' : __t) +
'" class="' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n\n    <div class=\'section\'>\n      ';
 _.each(_.sortBy(FormbuilderWindow.nonInputFields, 'order'), function(f){ ;
__p += '\n        <a data-field-type="' +
((__t = ( f.xtype )) == null ? '' : __t) +
'" class="' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\n        </a>\n      ';
 }); ;
__p += '\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/edit_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'editFieldWindow\'>\n  <div class=\'fb-edit-field-wrapper\'></div>\n</div>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/custome_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'customeField\'>\n  <div class=\'fb-custome-field-wrapper\'></div>\n</div>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/left_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-left\'>\n  <ul class=\'fb-tabs\'>\n  <li class=\'active\'><a data-target=\'#addFieldWindow\'>Add new field</a></li>\n    <li><a data-target=\'#editFieldWindow\'>Edit field</a></li>\n    </ul>\n\n  <div class=\'fb-tab-content\'>\n    ' +
'\n    ' +
((__t = ( FormbuilderWindow.templates['partials/add_field']() )) == null ? '' : __t) +
'\n    ' +
((__t = ( FormbuilderWindow.templates['partials/edit_field']() )) == null ? '' : __t) +
'\n    ' +
//((__t = ( FormbuilderWindow.templates['partials/custome_field']() )) == null ? '' : __t) +
'\n  </div>\n</div>';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/right_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-right\'>\n  <div class=\'fb-no-response-fields\'>No response fields</div>\n  <div class=\'fb-response-fields\'></div>\n</div>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["partials/save_button"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-save-wrapper\'>\n  <button class=\'js-save-form ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'\'></button>\n</div>';

}
return __p
};

this["FormbuilderWindow"]["templates"]["view/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\n  <div class=\'cover\'></div>\n  ' +
((__t = ( FormbuilderWindow.templates['view/label']({rf: rf}) )) == null ? '' : __t) +
'\n\n  ' +
((__t = ( FormbuilderWindow.fields[rf.get(FormbuilderWindow.options.mappings.XTYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\n\n  ' +
((__t = ( FormbuilderWindow.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
'\n  ' +
((__t = ( FormbuilderWindow.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\n</div>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["view/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

this["FormbuilderWindow"]["templates"]["view/description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'help-block\'>\n  ' +
((__t = ( FormbuilderWindow.helpers.simple_format(rf.get(FormbuilderWindow.options.mappings.DESCRIPTION)) )) == null ? '' : __t) +
'\n</span>\n';

}
return __p
};

this["FormbuilderWindow"]["templates"]["view/duplicate_remove"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'actions-wrapper\'>\n  '+ 
        '  <a class="js-clear ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Field"><i class=\'glyphicon glyphicon-minus-sign\'></i></a>\n' + 
        '  <a class="js-goto-option ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Jump to Field"><i class=\'glyphicon glyphicon-info-sign\'></i></a>\n' + 
        '  <a class="js-calc-option ' +
((__t = ( FormbuilderWindow.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add calculation"><i class=\'glyphicon glyphicon-ok-sign\'></i></a>\n' + 

        '</div>';

}
return __p
};

this["FormbuilderWindow"]["templates"]["view/label"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<label>\n  <span>' +
((__t = ( FormbuilderWindow.helpers.simple_format(rf.get(FormbuilderWindow.options.mappings.FIELDLABEL)) )) == null ? '' : __t) +
'\n  ';
 if (rf.get(FormbuilderWindow.options.mappings.REQUIRED)) { ;
__p += '\n    <abbr title=\'required\'>*</abbr>\n  ';
 } ;
__p += '\n</label>\n';

}
return __p
};
