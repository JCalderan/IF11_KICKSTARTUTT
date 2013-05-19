(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, FooterController, HeaderController, Layout, mediator, routes, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  HeaderController = require('controllers/header_controller');

  FooterController = require('controllers/footer_controller');

  Layout = require('views/layout');

  mediator = require('mediator');

  routes = require('routes');

  module.exports = Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      _ref = Application.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Application.prototype.title = 'Brunch of Champions';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '_controller'
      });
      this.initLayout();
      this.initMediator();
      this.initComposer();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      new HeaderController();
      return new FooterController();
    };

    Application.prototype.initMediator = function() {
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      _ref = Controller.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/footer_controller", function(exports, require, module) {
  var Controller, FooterController, FooterView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  FooterView = require('views/footer-view');

  module.exports = FooterController = (function(_super) {
    __extends(FooterController, _super);

    function FooterController() {
      _ref = FooterController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FooterController.prototype.initialize = function() {
      FooterController.__super__.initialize.apply(this, arguments);
      return this.view = new FooterView();
    };

    return FooterController;

  })(Controller);
  
});
window.require.register("controllers/header_controller", function(exports, require, module) {
  var Controller, HeaderController, HeaderView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {
    __extends(HeaderController, _super);

    function HeaderController() {
      _ref = HeaderController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HeaderController.prototype.initialize = function() {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView();
    };

    return HeaderController;

  })(Controller);
  
});
window.require.register("controllers/home_controller", function(exports, require, module) {
  var Controller, HomeController, HomePageView, ModInfoModel, ModInfoView, ProjectLauncher, ProjectView, ProjectsColView, SignUpView, SimpleObjectModel, SimpleObject_collection, SplitPageView, UserProfile, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/homePage_view');

  SplitPageView = require('views/splitPage_view');

  SimpleObjectModel = require('models/simpleObject_model');

  SimpleObject_collection = require('models/simpleObject_collection');

  ModInfoModel = require('models/modInfo_model');

  ModInfoView = require('views/modInfo_view');

  ProjectsColView = require('views/projectsCol_view');

  ProjectView = require('views/project_view');

  SignUpView = require('views/signUp_view');

  ProjectLauncher = require('views/projectLauncher_view');

  UserProfile = require('views/userProfile_view');

  module.exports = HomeController = (function(_super) {
    __extends(HomeController, _super);

    function HomeController() {
      _ref = HomeController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HomeController.prototype.index = function() {
      var staredProjects_model, staredProjects_view;

      this.view = new HomePageView({
        container: '#page_container'
      });
      staredProjects_model = new ModInfoModel({
        title: "Hot Projects",
        theme_color: "#CC4400"
      });
      return staredProjects_view = new ModInfoView({
        model: staredProjects_model,
        container: this.view.inner_container
      });
    };

    HomeController.prototype.list_projects = function(params) {
      var projectsCol_view, projects_collection;

      this.view = new SplitPageView({
        container: '#page_container'
      });
      projects_collection = new SimpleObject_collection({
        couchView: (params.collection ? params.collection : ""),
        couchKey: (params.filter ? params.filter : "")
      });
      projectsCol_view = new ProjectsColView({
        collection: projects_collection,
        container: "#splitPage_left"
      });
      return projects_collection.fetch();
    };

    HomeController.prototype.get_project = function(params) {
      var project_model, project_view;

      this.view = new SplitPageView({
        container: '#page_container'
      });
      project_model = new SimpleObjectModel({
        _id: params.id ? params.id : null
      });
      project_view = new ProjectView({
        model: project_model,
        container: "#splitPage_left"
      });
      return project_model.fetch();
    };

    HomeController.prototype.signup = function(params) {
      this.view = new SignUpView({
        container: '#page_container'
      });
      return $('#signup').submit(function() {
        var myData;

        myData = {
          a: $this.identiant.value
        };
        return alert(myData);
      });
    };

    HomeController.prototype.launch_project = function(params) {
      var project, projectLauncher_view;

      this.view = new SplitPageView({
        container: '#page_container'
      });
      project = new SimpleObjectModel();
      return projectLauncher_view = new ProjectLauncher({
        model: project,
        container: '#splitPage_left'
      });
    };

    HomeController.prototype.userProfile = function(params) {
      return this.view = new UserProfile({
        container: '#page_container'
      });
    };

    return HomeController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;

    app = new Application();
    return app.initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var mediator,
    __slice = [].slice;

  mediator = require('mediator');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;

    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('url', function() {
    var options, params, routeName, url, _i;

    routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
    url = null;
    mediator.publish('!router:reverse', routeName, params, function(result) {
      return url = result ? "/" + result : routeName;
    });
    return url;
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      _ref = Model.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("models/modInfo_model", function(exports, require, module) {
  var ModInfoModel, Model, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = ModInfoModel = (function(_super) {
    __extends(ModInfoModel, _super);

    function ModInfoModel() {
      _ref = ModInfoModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ModInfoModel.prototype.urlRoot = "/getModInfo";

    ModInfoModel.prototype.initialize = function() {
      return ModInfoModel.__super__.initialize.call(this);
    };

    ModInfoModel.prototype.parse = function(data) {
      return data.items;
    };

    return ModInfoModel;

  })(Model);
  
});
window.require.register("models/simpleObject_collection", function(exports, require, module) {
  var Collection, ProjectsCol, simpleObjectmModel, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  simpleObjectmModel = require('models/simpleObject_model');

  module.exports = ProjectsCol = (function(_super) {
    __extends(ProjectsCol, _super);

    function ProjectsCol() {
      _ref = ProjectsCol.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectsCol.prototype.model = simpleObjectmModel;

    ProjectsCol.prototype.initialize = function(options) {
      options ||  (options = {});
      ProjectsCol.__super__.initialize.call(this, options);
      if (options.couchView) {
        return this.url = function() {
          var paramKey, paramValue, tmp_url, url;

          tmp_url = "/collection/" + options.couchView + "/" + (options.couchKey ? options.couchKey : "");
          if (options.couchQueryParams) {
            tmp_url += "?";
            tmp_url += (function() {
              var _ref1, _results;

              _ref1 = options.couchQueryParams;
              _results = [];
              for (paramKey in _ref1) {
                paramValue = _ref1[paramKey];
                _results.push("" + paramKey + "=" + paramValue + "&");
              }
              return _results;
            })();
          }
          return url = tmp_url;
        };
      }
    };

    ProjectsCol.prototype.parse = function(data) {
      if (data.rows) {
        return data.rows;
      } else {
        return data;
      }
    };

    return ProjectsCol;

  })(Collection);
  
});
window.require.register("models/simpleObject_model", function(exports, require, module) {
  var CommentModel, Model, mediator, __appDesignDoc, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  mediator = require('mediator');

  __appDesignDoc = "kickstartutt";

  module.exports = CommentModel = (function(_super) {
    __extends(CommentModel, _super);

    function CommentModel() {
      this.watch = __bind(this.watch, this);    _ref = CommentModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommentModel.prototype.idAttribute = "_id";

    CommentModel.prototype.feed = null;

    CommentModel.prototype.initialize = function(options) {
      CommentModel.__super__.initialize.call(this, options);
      this.url = function() {
        return "/model/" + (this.id ? this.id : "");
      };
      return this.feed = {};
    };

    CommentModel.prototype.watch = function(options) {
      var req,
        _this = this;

      options || (options = {});
      if (options.filter && !this.feed.filter) {
        if (typeof options.filter === "string") {
          this.feed.filter = __appDesignDoc + "/" + options.filter;
        } else {
          this.feed.filter = options.filter;
        }
      }
      if (!this.feed.since) {
        if (options.since) {
          if (options.since === "now") {
            this.feed.since = 0;
            this.feed.descending = true;
            this.feed.limit = 1;
          } else {
            this.feed.since = options.since;
          }
        } else {
          this.feed.since = 0;
        }
      }
      if (options !== "stop") {
        req = $.ajax({
          url: "/model/_changes?id=" + this.id + "&feed=longpoll",
          method: "GET",
          contentType: "application/json; charset=utf-8",
          data: this.feed,
          dataType: "json"
        });
        req.done(function(dataChanges) {
          console.log(dataChanges);
          if (dataChanges.last_seq) {
            _this.watch({
              since: dataChanges.last_seq
            });
            return _this.fetch({
              watchSince: dataChanges.last_seq
            });
          } else {
            return console.log("error");
          }
        });
        return req.fail(function(dataError) {
          dataError = typeof dataError === "string" ? JSON.parse(dataError) : dataError;
          if (dataError.last_seq) {
            return _this.watch({
              since: dataError.last_seq
            });
          }
        });
      }
    };

    CommentModel.prototype.fetch = function(options) {
      options ||  (options = {});
      CommentModel.__super__.fetch.call(this, options);
      if (options.watchSince) {
        console.log("watch since :" + options.watchSince);
        return this.watch({
          "since": options.watchSince
        });
      }
    };

    CommentModel.prototype.parse = function(data) {
      if (data.value) {
        return data.value;
      } else {
        return data;
      }
    };

    return CommentModel;

  })(Model);
  
});
window.require.register("routes", function(exports, require, module) {
  module.exports = function(match) {
    match('', 'home#index');
    match('col/:collection', 'home#list_projects');
    match('col/:collection/:filter', 'home#list_projects');
    match('view/project/:id', 'home#get_project');
    match('view/signup', 'home#signup');
    match('view/projectLauncher', 'home#launch_project');
    return match('view/userProfile', 'home#userProfile');
  };
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {
    __extends(CollectionView, _super);

    function CollectionView() {
      _ref = CollectionView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/collection_view", function(exports, require, module) {
  var Chaplin, CollectionView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {
    __extends(CollectionView, _super);

    function CollectionView() {
      _ref = CollectionView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {
    __extends(View, _super);

    function View() {
      _ref = View.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/comment_view", function(exports, require, module) {
  var CommentView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require("views/templates/comment");

  View = require("views/base/view");

  mediator = require('mediator');

  module.exports = CommentView = (function(_super) {
    __extends(CommentView, _super);

    function CommentView() {
      this.render = __bind(this.render, this);    _ref = CommentView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommentView.prototype.autoRender = true;

    CommentView.prototype.template = template;

    CommentView.prototype.className = "comment row-fluid";

    CommentView.prototype.container = null;

    CommentView.prototype.initialize = function() {
      CommentView.__super__.initialize.apply(this, arguments);
      return this.listenTo(this.model, "change", this.render);
    };

    CommentView.prototype.render = function() {
      return CommentView.__super__.render.apply(this, arguments);
    };

    return CommentView;

  })(View);
  
});
window.require.register("views/commentsCol_view", function(exports, require, module) {
  var CollectionView, CommentView, CommentsColView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/base/collection_view');

  CommentView = require('views/comment_view');

  module.exports = CommentsColView = (function(_super) {
    __extends(CommentsColView, _super);

    function CommentsColView() {
      _ref = CommentsColView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommentsColView.prototype.autoRender = true;

    CommentsColView.prototype.tagname = 'div';

    CommentsColView.prototype.className = 'commentsCol-view';

    CommentsColView.prototype.container = null;

    CommentsColView.prototype.itemView = CommentView;

    return CommentsColView;

  })(CollectionView);
  
});
window.require.register("views/footer-view", function(exports, require, module) {
  var FooterView, View, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/footer');

  module.exports = FooterView = (function(_super) {
    __extends(FooterView, _super);

    function FooterView() {
      _ref = FooterView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FooterView.prototype.autoRender = true;

    FooterView.prototype.className = 'footer navbar navbar-fixed-bottom navbar-inverse';

    FooterView.prototype.container = '#footer_container';

    FooterView.prototype.id = 'footer';

    FooterView.prototype.template = template;

    FooterView.prototype.toogled = null;

    FooterView.prototype.initialize = function() {
      FooterView.__super__.initialize.apply(this, arguments);
      this.toogled = false;
      return this.delegate("click", ".tooglers", this.toogleFooter);
    };

    FooterView.prototype.toogleFooter = function(event) {
      event.preventDefault();
      if (this.toogled) {
        $(".tooglings").hide();
        return this.toogled = false;
      } else {
        $(".tooglings").show();
        return this.toogled = true;
      }
    };

    return FooterView;

  })(View);
  
});
window.require.register("views/header-view", function(exports, require, module) {
  var HeaderView, View, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      _ref = HeaderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header navbar navbar-fixed-top navbar-inverse';

    HeaderView.prototype.container = '#header_container';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    HeaderView.prototype.initialize = function() {
      return HeaderView.__super__.initialize.apply(this, arguments);
    };

    HeaderView.prototype.render = function() {
      HeaderView.__super__.render.apply(this, arguments);
      console.log($(this.el).find(".typeahead"));
      $(this.el).find(".typeahead").typeahead({
        source: function(query, process) {
          return $.ajax({
            url: "/collection/projects?startkey=[" + JSON.stringify(query) + "]",
            methode: "GET",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            beforeSend: function() {
              return console.log(query);
            }
          }).done(function(data) {
            var result;

            result = [];
            data.rows.forEach(function(row) {
              return result.push(row.value.nom_projet);
            });
            return process(result);
          });
        }
      });
      return $(this.el).find("#formSearchProjects").submit(function(event) {
        return $(this).attr("action", "/col/projects/" + $(this).find("#inputSearchProjects").val());
      });
    };

    return HeaderView;

  })(View);
  
});
window.require.register("views/homePage_view", function(exports, require, module) {
  var HomePageView, View, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/view');

  module.exports = HomePageView = (function(_super) {
    __extends(HomePageView, _super);

    function HomePageView() {
      _ref = HomePageView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'row-fluid';

    HomePageView.prototype.container = null;

    HomePageView.prototype.inner_container = "#home_page_container";

    HomePageView.prototype.id = 'home_page';

    HomePageView.prototype.template = template;

    return HomePageView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {
    __extends(Layout, _super);

    function Layout() {
      _ref = Layout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("views/modInfo_view", function(exports, require, module) {
  var ModInfoView, View, mediator, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/modInfo');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = ModInfoView = (function(_super) {
    __extends(ModInfoView, _super);

    function ModInfoView() {
      _ref = ModInfoView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ModInfoView.prototype.autoRender = true;

    ModInfoView.prototype.className = 'modInfo';

    ModInfoView.prototype.container = null;

    ModInfoView.prototype.template = template;

    ModInfoView.prototype.initialize = function() {
      ModInfoView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.model, "change", this.render);
      this.delegate("click", "[id^=carousel-selector-]", this.carouselSelector);
      return this.delegate('slid', "#myCarousel", this.carouselUpdateText);
    };

    ModInfoView.prototype.render = function() {
      ModInfoView.__super__.render.apply(this, arguments);
      $(this.el).find("#myCarousel").carousel({
        interval: 5000
      });
      return $(this.el).find("#carousel-text").html($(this.el).find("#slide-content-0").html());
    };

    ModInfoView.prototype.carouselSelector = function(event) {
      var id, id_selector;

      if (event) {
        event.preventDefault();
      }
      id_selector = event.currentTarget.id;
      id = id_selector.substr(id_selector.lastIndexOf("-") + 1);
      id = parseInt(id);
      return $("#myCarousel").carousel(id);
    };

    ModInfoView.prototype.carouselUpdateText = function(event) {
      var id;

      if (event) {
        event.preventDefault();
      }
      id = $(this.el).find(".item.active").data("slide-number");
      return $(this.el).find("#carousel-text").html($(this.el).find("#slide-content-" + id).html());
    };

    return ModInfoView;

  })(View);
  
});
window.require.register("views/projectItem_view", function(exports, require, module) {
  var ProjectItemView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/projectItem');

  View = require('views/base/view');

  mediator = require("mediator");

  module.exports = ProjectItemView = (function(_super) {
    __extends(ProjectItemView, _super);

    function ProjectItemView() {
      this.setProjectLinks = __bind(this.setProjectLinks, this);
      this.setRaty = __bind(this.setRaty, this);
      this.render = __bind(this.render, this);    _ref = ProjectItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectItemView.prototype.autoRender = true;

    ProjectItemView.prototype.template = template;

    ProjectItemView.prototype.className = "projectItem span4";

    ProjectItemView.prototype.container = null;

    ProjectItemView.prototype.raty_img = null;

    ProjectItemView.prototype.initialize = function() {
      var brunch_img;

      ProjectItemView.__super__.initialize.apply(this, arguments);
      brunch_img = "/brunch/images/";
      this.raty_img = {
        "starHalf": brunch_img + "star-half.png",
        "starOff": brunch_img + "star-off.png",
        "starOn": brunch_img + "star-on.png",
        "cancelOff": brunch_img + "cancel-off.png",
        "cancelOn": brunch_img + "cancel-on.png"
      };
      return this.listenTo(this.model, "change", this.render);
    };

    ProjectItemView.prototype.render = function() {
      ProjectItemView.__super__.render.apply(this, arguments);
      this.setProjectLinks();
      return this.setRaty();
    };

    ProjectItemView.prototype.setRaty = function() {
      var raty_el;

      raty_el = $(this.el).find(".star_rating");
      raty_el.raty();
      raty_el.raty("set", this.raty_img);
      raty_el.raty("score", this.model.attributes.note_moyenne ? this.model.attributes.note_moyenne * 0.25 : 0);
      return raty_el.raty('readOnly', true);
    };

    ProjectItemView.prototype.setProjectLinks = function() {
      $(this.el).find(".toResProject").attr("href", "/view/project/" + this.model.attributes._id);
      return $(this.el).find(".toResTags").each(function() {
        return $(this).attr("href", "/col/projets_by_topic/" + $(this).text());
      });
    };

    return ProjectItemView;

  })(View);
  
});
window.require.register("views/projectLauncher_view", function(exports, require, module) {
  var ProjectItemView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/projectLauncher');

  View = require('views/base/view');

  mediator = require("mediator");

  module.exports = ProjectItemView = (function(_super) {
    __extends(ProjectItemView, _super);

    function ProjectItemView() {
      this.toogleProjectAttr = __bind(this.toogleProjectAttr, this);
      this.render = __bind(this.render, this);    _ref = ProjectItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectItemView.prototype.autoRender = true;

    ProjectItemView.prototype.template = template;

    ProjectItemView.prototype.className = "projectLauncher row-fluid";

    ProjectItemView.prototype.container = null;

    ProjectItemView.prototype.projectState = 0;

    ProjectItemView.prototype.state = '';

    ProjectItemView.prototype.errors = true;

    ProjectItemView.prototype.now = null;

    ProjectItemView.prototype.deadline = null;

    ProjectItemView.prototype.imageReader = null;

    ProjectItemView.prototype.attrToSave = null;

    ProjectItemView.prototype.initialize = function() {
      var nowTemp,
        _this = this;

      ProjectItemView.__super__.initialize.apply(this, arguments);
      this.state = ["creation", "incubation", "campagne", "fin"][(this.model.get("state") ? this.model.get("state") : 0)];
      nowTemp = new Date();
      this.now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
      this.imageReader = new FileReader();
      this.imageReader.onloadend = function(e) {
        var imgElem;

        imgElem = $(_this.el).find("#project_thumbnail");
        return imgElem.attr("src", e.target.result);
      };
      console.log(this.imageReader.result);
      this.attrToSave = {
        "type": "project"
      };
      this.listenTo(this.model, "change", this.render);
      this.delegate("click", ".project_attr", this.toogleProjectAttr);
      this.delegate("blur", ".project_attr_input", this.toogleProjectAttr);
      this.delegate("click", "#project_thumbnail", this.setProjectThumbnail);
      this.delegate("change", "#project_thumbnail_input", this.showProjectThumbnail);
      this.delegate("keyup", "#project_title_input", this.checkTitle);
      this.delegate("changeDate", "#datePicker", this.setDeadline);
      this.delegate("show", "#validateInfo", this.loadValidateInfoContent);
      return this.delegate("click", "#save_change_button", this.validate);
    };

    ProjectItemView.prototype.render = function() {
      var _this = this;

      ProjectItemView.__super__.render.apply(this, arguments);
      $(this.el).find("#datePicker").datepicker({
        onRender: function(date) {
          if (date.valueOf() < _this.now.valueOf()) {
            return "disabled";
          } else {
            return '';
          }
        }
      }).datepicker("setValue", this.now);
      $(this.el).find("#tp_toolTip").tooltip({
        "title": "définir une nouvelle deadline"
      });
      $(this.el).find(".project_attr").css({
        "cursor": "pointer"
      });
      return $(this.el).find("#pill_" + this.state).addClass("active");
    };

    ProjectItemView.prototype.toogleProjectAttr = function(event) {
      var elem, new_val;

      event.preventDefault();
      elem = $(event.target);
      if (elem.is('.project_attr')) {
        elem.hide();
        return elem.parent().find(".project_attr_input").val(elem.text()).show();
      } else if (elem.is('.project_attr_input')) {
        new_val = elem.val();
        elem.hide();
        if (new_val !== "") {
          elem.parent().find(".project_attr").html(new_val);
        } else {
          elem.val(elem.parent().find(".project_attr").text());
        }
        return elem.parent().find(".project_attr").show();
      }
    };

    ProjectItemView.prototype.setProjectThumbnail = function(event) {
      event.preventDefault();
      return $(this.el).find("#project_thumbnail_input").click();
    };

    ProjectItemView.prototype.showProjectThumbnail = function(event) {
      var file;

      file = event.target.files[0];
      if (file.type.match("image\/(jpeg|png|gif|tiff)") && file.type.match("image\/(jpeg|png|gif|tiff)")[0] === file.type) {
        return this.imageReader.readAsDataURL(file);
      }
    };

    ProjectItemView.prototype.checkTitle = function(event) {
      var elem, query, req;

      elem = $(event.target);
      query = JSON.stringify($(event.target).val());
      req = $.ajax({
        url: "/collection/projects_name?key=" + query,
        contentType: "application/json; charset=utf-8;",
        dataType: "json",
        methode: "GET"
      });
      return req.done(function(data) {
        var result;

        result = [];
        data.rows.forEach(function(row) {
          return result.push(row.key);
        });
        console.log(result);
        if (result.length > 0) {
          return elem.parents("#project_header").addClass("error");
        } else {
          return elem.parents("#project_header").removeClass("error");
        }
      });
    };

    ProjectItemView.prototype.setDeadline = function(event) {
      var deltaTime, elem, info, tooltip;

      this.deadline = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), 0, 0, 0, 0);
      deltaTime = Math.round((this.deadline - this.now) / 1000 / 60 / 60 / 24);
      info = ("" + deltaTime + " jour") + (deltaTime > 1 ? "s" : "") + " restant&nbsp;";
      elem = $(event.target);
      elem.datepicker('hide').hide();
      tooltip = elem.parent().find("small").find("a");
      return elem.parent().find("small").html(info).append(tooltip).show();
    };

    ProjectItemView.prototype.loadValidateInfoContent = function(event) {
      var content, deltaTime, elem, error_container, error_title, info_container, info_deadline, info_description, info_title, warning_container, warning_deadline, warning_description, warning_info, warning_thumbnail;

      this.errors = false;
      elem = $(this.el).find("#validateInfo");
      content = elem.find(".modal-body");
      content.html("");
      info_container = $("<div>");
      warning_container = $("<div>");
      error_container = $("<div>");
      switch (this.state) {
        case "creation":
          content.append($("<p>", {
            "text": "Valider la création du projet ?"
          }));
          warning_info = $("<p>", {
            "class": "text-warning",
            "text": " vous ne pourrez plus modifier le titre de votre projet."
          }).prepend($("<i>", {
            "class": "icon-warning-sign"
          }));
          warning_container.append(warning_info);
          if ($("#project_title_input").val().length === 0 || $("#project_title_input").val() === $("#project_title_input").attr("placeholder")) {
            error_title = $("<p>", {
              "class": "text-error",
              "text": " Vous devez donner un titre à votre projet avant de continuer."
            }).prepend($("<i>", {
              "class": "icon-ban-circle"
            }));
            error_container.append(error_title);
            this.errors = true;
          } else if ($("#project_header").hasClass("error")) {
            error_title = $("<p>", {
              "class": "text-error",
              "text": " Ce titre de projet n'est pas disponible, modifiez le avant de continuer."
            }).prepend($("<i>", {
              "class": "icon-ban-circle"
            }));
            error_container.append(error_title);
            this.errors = true;
          } else {
            info_title = $("<p>", {
              "class": "text-info",
              "text": " titre : " + $('#project_title_input').val()
            });
            this.attrToSave["nom_projet"] = $('#project_title_input').val();
            info_container.append(info_title);
          }
          if ($("#project_description_input").val() === "") {
            warning_description = $("<p>", {
              "class": "text-warning",
              "text": " Aucune description pour votre projet, vous pourrez l'éditer par la suite."
            }).prepend($("<i>", {
              "class": "icon-warning-sign"
            }));
            warning_container.append(warning_description);
          } else {
            info_description = $("<p>", {
              "class": "text-info",
              "text": " description : " + $('#project_description_input').val()
            });
            info_container.append(info_description);
            this.attrToSave["description_projet"] = $("#project_description_input").val();
          }
          if (this.deadline === null ||  (this.now - this.deadline) === 0) {
            warning_deadline = $("<p>", {
              "class": "text-warning",
              "text": " Aucune deadline pour votre projet, vous pourrez l'éditer par la suite."
            }).prepend($("<i>", {
              "class": "icon-warning-sign"
            }));
            warning_container.append(warning_deadline);
          } else {
            deltaTime = Math.round((this.deadline - this.now) / 1000 / 60 / 60 / 24);
            info_deadline = $("<p>", {
              "class": "text-info",
              "text": (" " + deltaTime + " jour") + (deltaTime > 1 ? "s" : "") + " restant"
            });
            info_container.append(info_deadline);
            this.attrToSave["deadline_projet"] = this.deadline.valueOf();
          }
          if (!this.imageReader.result) {
            warning_thumbnail = $("<p>", {
              "class": "text-warning",
              "text": " Aucune image pour votre projet, vous pourrez l'éditer par la suite."
            }).prepend($("<i>", {
              "class": "icon-warning-sign"
            }));
            warning_container.append(warning_thumbnail);
          } else {
            this.attrToSave["thumbnails_projet"] = [];
            this.attrToSave["thumbnails_projet"].push(this.imageReader.result);
          }
          break;
        case "incubation":
          "";
          break;
        case "campagne":
          "";
          break;
        case "fin":
          "";
          break;
        default:
          return "Error";
      }
      if (this.errors) {
        elem.find(".modal-footer").find(".btn-primary").attr("disabled", "disabled");
      } else {
        elem.find(".modal-footer").find(".btn-primary").removeAttr("disabled");
      }
      return content.append(info_container, $("<hr>"), warning_container, $("<hr>"), error_container);
    };

    ProjectItemView.prototype.validate = function(event) {
      if (!this.errors) {
        this.model.set(this.attrToSave);
        return this.model.save();
      }
    };

    return ProjectItemView;

  })(View);
  
});
window.require.register("views/project_view", function(exports, require, module) {
  var CommentColView, ProjectView, View, mediator, simpleObjectCollection, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/project');

  View = require('views/base/view');

  mediator = require('mediator');

  simpleObjectCollection = require('models/simpleObject_collection');

  CommentColView = require('views/commentsCol_view');

  module.exports = ProjectView = (function(_super) {
    __extends(ProjectView, _super);

    function ProjectView() {
      this.setCommentLinks = __bind(this.setCommentLinks, this);
      this.render = __bind(this.render, this);    _ref = ProjectView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectView.prototype.autoRender = true;

    ProjectView.prototype.className = 'projectView';

    ProjectView.prototype.container = null;

    ProjectView.prototype.template = template;

    ProjectView.prototype.commentCol = null;

    ProjectView.prototype.commentColView = null;

    ProjectView.prototype.initialize = function() {
      ProjectView.__super__.initialize.apply(this, arguments);
      this.commentCol = new simpleObjectCollection({
        couchView: "comments",
        couchKey: this.model.attributes._id,
        couchQueryParams: {
          "limit": 3
        }
      });
      this.listenTo(this.model, "change", this.render);
      return this.delegate("click", "#comments_pill_link", this.initLoadComments);
    };

    ProjectView.prototype.render = function() {
      ProjectView.__super__.render.apply(this, arguments);
      this.setCommentLinks();
      this.commentColView = new CommentColView({
        collection: this.commentCol,
        container: "#comments"
      });
      return this.subview('commentCol', this.commentColView);
    };

    ProjectView.prototype.initLoadComments = function(event) {
      console.log(this.commentCol);
      this.commentCol.fetch();
      return this.commentColView.render();
    };

    ProjectView.prototype.setCommentLinks = function() {
      var comments_nbr;

      return comments_nbr = this.model.attributes.commentaires ? this.model.attributes.commentaires.length : 0;
    };

    return ProjectView;

  })(View);
  
});
window.require.register("views/projectsCol_view", function(exports, require, module) {
  var CollectionView, ProjectItemView, ProjectsColView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionView = require('views/base/collection_view');

  ProjectItemView = require('views/projectItem_view');

  module.exports = ProjectsColView = (function(_super) {
    __extends(ProjectsColView, _super);

    function ProjectsColView() {
      _ref = ProjectsColView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectsColView.prototype.autoRender = true;

    ProjectsColView.prototype.tagname = 'div';

    ProjectsColView.prototype.className = 'projectCol-view';

    ProjectsColView.prototype.container = null;

    ProjectsColView.prototype.itemView = ProjectItemView;

    ProjectsColView.prototype.initialize = function() {
      ProjectsColView.__super__.initialize.apply(this, arguments);
      return console.log("nouvelle projectsCol_view");
    };

    return ProjectsColView;

  })(CollectionView);
  
});
window.require.register("views/signUp_view", function(exports, require, module) {
  var SignUpView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/signUp');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = SignUpView = (function(_super) {
    __extends(SignUpView, _super);

    function SignUpView() {
      this.signUpHide = __bind(this.signUpHide, this);    _ref = SignUpView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SignUpView.prototype.autoRender = true;

    SignUpView.prototype.className = 'SignUpView';

    SignUpView.prototype.container = null;

    SignUpView.prototype.template = template;

    SignUpView.prototype.initialize = function() {
      SignUpView.__super__.initialize.apply(this, arguments);
      return this.delegate("hide", "#myModal", this.signUpHide);
    };

    SignUpView.prototype.render = function() {
      SignUpView.__super__.render.apply(this, arguments);
      return $(this.el).find("#myModal").modal({
        keyboard: true
      });
    };

    SignUpView.prototype.signUpHide = function(event) {
      event.preventDefault();
      return window.location.replace("/");
    };

    return SignUpView;

  })(View);
  
});
window.require.register("views/splitPage_view", function(exports, require, module) {
  var SplitPageView, View, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/splitPage');

  View = require('views/base/view');

  module.exports = SplitPageView = (function(_super) {
    __extends(SplitPageView, _super);

    function SplitPageView() {
      _ref = SplitPageView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SplitPageView.prototype.autoRender = true;

    SplitPageView.prototype.className = 'split-page';

    SplitPageView.prototype.container = null;

    SplitPageView.prototype.id = 'split_page';

    SplitPageView.prototype.template = template;

    SplitPageView.prototype.initialize = function() {
      SplitPageView.__super__.initialize.apply(this, arguments);
      return console.log("nouvelle splitPageView");
    };

    return SplitPageView;

  })(View);
  
});
window.require.register("views/templates/comment", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<div class=\"comment_container span12\">\n    <hr />\n    <div class=\"row-fluid\">\n        <div class=\"span2 comment_user\">\n            <a href=\"#\" class=\"thumbnail\" ><img src=\"http://placehold.it/70x70\" alt=\"user_avatar\"/></a>\n        </div>\n        <div class=\"span10\">\n            <div class=\"row-fluid\">\n                <div class=\"span12 comment_header\">\n                    <p>\n                        <i class=\"icon-user\"></i> <strong> ";
    if (stack1 = helpers.ref_utilisateur) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.ref_utilisateur; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</strong> <small class=\"muted\"> le 10 Juillet</small>\n                        \n                    </p>\n                </div>\n                <div class=\"span12 comment_content\">\n                    ";
    if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
    return buffer;
    });
});
window.require.register("views/templates/footer", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"navbar-inner\">\n  <div class=\"container\">\n    <div class=\"nav-collapse\">\n      <div class=\"row-fluid\">\n        <div class=\"span12\">\n          <div class=\"span8\">\n            <ul class=\"nav span12\">\n              <li class=\"span4 text-center\"><a href=\"#\" class=\"tooglers\"><i class=\"icon-th icon-white\"></i> Categories</a>\n                <div class=\"span12 tooglings\" style=\"display: none\">\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Informatique</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Materiaux</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Mécanique</a>\n                </div>\n              </li>\n              <li class=\"span4 text-center\"><a href=\"#\" class=\"tooglers\"><i class=\"icon-pencil icon-white\"></i> Launch project</a>\n                <div class=\"span12 tooglings\" style=\"display: none\">\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Informatique</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Materiaux</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Mécanique</a>\n                </div>\n              </li>\n              <li class=\"span4 text-center\"><a href=\"#\" class=\"tooglers\"><i class=\"icon-zoom-in icon-white\"></i> About</a>\n                <div class=\"span12 tooglings\" style=\"display: none\">\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Informatique</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Materiaux</a>\n                  <a class=\"span6\" style=\"margin: 0px;\" href=\"#\">Mécanique</a>\n                </div>\n              </li>\n            </ul>\n          </div>\n          <div class=\"span4\">\n             <ul class=\"nav pull-right\">\n                <li><a href=\"#\"><i class=\"icon-question-sign icon-white\"></i> Help</a></li>\n                <li ><a href=\"#\"><i class=\"icon-envelope icon-white\"></i> Contact</a></li>\n              </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!--<ul class=\"nav\">\n  <li><a href=\"#\"><i class=\"icon-home icon-white\"></i> Home</a></li>\n  <li ><a href=\"#\"><i class=\"icon-star icon-white\"></i> Top Projects</a></li>\n  <li><a href=\"#\"><i class=\"icon-list icon-white\"></i> All Projects</a></li>\n  <li><a href=\"#\"><i class=\"icon-pencil icon-white\"></i> Launch your Project</a></li>\n</ul>-->";
    });
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"navbar-inner\">\n  <div class=\"container\">\n    <a class=\"brand\" href=\"#\">KICKSTARTUTT</a>\n    <div class=\"nav-collapse\">\n      <ul class=\"nav\">\n        <li><a href=\"/\"><i class=\"icon-home icon-white\"></i> Home</a></li>\n        <li ><a href=\"/col/projects/top\"><i class=\"icon-star icon-white\"></i> Top Projects</a></li>\n        <li><a href=\"/col/projects\"><i class=\"icon-list icon-white\"></i> All Projects</a></li>\n        <li><a href=\"/view/projectLauncher\"><i class=\"icon-pencil icon-white\"></i> Launch your Project</a></li>\n      </ul>\n      <form class=\"navbar-form form-search span3\" id=\"formSearchProjects\">\n          <input id=\"inputSearchProjects\" type=\"text\" style=\"height: 100%; width: 100%;\" class=\"search-query typeahead\" placeholder=\"Search projects\" autocomplete=\"off\"/>\n          <input type=\"submit\" value=\"search\" style=\"display: none;\" />\n<!--        <div class=\"input-append search\" >\n          <input type=\"text\" style=\"height: 100%;\" class=\"span2 typeahead\"/>\n          <div class=\"btn-group\" style=\"height: 100%;\">\n            <button tabindex=\"-1\" class=\"btn\">Search</button>\n            <button tabindex=\"-1\" data-toggle=\"dropdown\" class=\"btn dropdown-toggle\">\n              <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n              <li><a href=\"#\">Action</a></li>\n              <li><a href=\"#\">Another action</a></li>\n              <li><a href=\"#\">Something else here</a></li>\n              <li class=\"divider\"></li>\n              <li><a href=\"#\">Separated link</a></li>\n            </ul>\n          </div>\n        </div>-->\n      </form> \n      <ul class=\"nav pull-right\">\n        <li class=\"dropdown\">\n          <a data-toggle=\"dropdown\" href=\"#\" class=\"dropdown-toggle\">Sign In <strong class=\"caret\"></strong></a>\n          <div class=\"dropdown-menu\"  style=\"padding: 15px; padding-bottom: 0px;\">\n           <form accept-charset=\"UTF-8\" action=\"login\" method=\"post\">\n              <input type=\"text\" name=\"username\" id=\"username\" placeholder=\"Username\" style=\"margin-bottom: 15px;\" />\n              <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" style=\"margin-bottom: 15px;\" />\n              <input type=\"checkbox\" value=\"1\" id=\"remember-me\" name=\"remember-me\" style=\"float: left; margin-right: 10px;\" />\n              <label for=\"remember-me\" class=\"string optional\"> Remember me</label>\n              <input type=\"submit\" value=\"Sign In\" id=\"sign-in\" class=\"btn btn-primary btn-block\">\n              <label style=\"text-align:center;margin-top:5px\">or</label>\n              <a href=\"/view/signup\" id=\"sign-up\" class=\"btn btn-primary btn-block\">Sign Up</a>\n            </form>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div style=\"width: 100%; color: white;\">\n  <p class=\"text-center\" style=\"background-color: #0088CC; height: 30px; font-size: 1.2em; line-height: 1.7em;\" >Official UTT's projects showcase and launcher !</p>\n</div>\n";
    });
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"span12\" >\n  <div id=\"home_page_container\" class=\"row-fluid\">\n    \n  </div>\n  <div style=\"height: 85px;\"></div>\n</div>\n";
    });
});
window.require.register("views/templates/modInfo", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;
    }

    buffer += "<div class=\" row-fluid tabbable\">\n  <div class=\"span2\">\n    <ul class=\"nav nav-list\">\n      <li class=\"active\"><a href=\"#tab1\" data-toggle=\"tab\">Notre sélection</a></li>\n      <li><a href=\"#tab2\" data-toggle=\"tab\">Financés</a></li>\n      <li><a href=\"#tab3\" data-toggle=\"tab\">Les plus populaires</a></li>\n      <li><a href=\"#tab4\" data-toggle=\"tab\">Juste commencés</a></li>\n      <li><a href=\"#tab5\" data-toggle=\"tab\">Bientôt terminés</a></li>\n    </ul>\n  </div>\n  <div class=\"tab-content span10\">\n    <div class=\"tab-pane active\" id=\"tab1\">\n        <!-- Slider -->\n        <div class=\"row-fluid\" id=\"slider\">\n          <!-- Top part of the slider -->\n          <div class=\"span8\" id=\"carousel-bounding-box\">\n            <div id=\"myCarousel\" class=\"carousel slide\">\n              <!-- Carousel items -->\n              <div class=\"carousel-inner\">\n                <div class=\"active item\" data-slide-number=\"0\"><img src=\"http://placehold.it/770x300&text=one\" /></div>\n                <div class=\"item\" data-slide-number=\"1\"><img src=\"http://placehold.it/770x300&text=two\" /></div>\n                <div class=\"item\" data-slide-number=\"2\"><img src=\"http://placehold.it/770x300&text=three\" /></div>\n                <div class=\"item\" data-slide-number=\"3\"><img src=\"http://placehold.it/770x300&text=four\" /></div>\n                <div class=\"item\" data-slide-number=\"4\"><img src=\"http://placehold.it/770x300&text=five\" /></div>\n                <div class=\"item\" data-slide-number=\"5\"><img src=\"http://placehold.it/770x300&text=six\" /></div>\n              </div>\n              <!-- Carousel nav -->\n              <a class=\"carousel-control left\" href=\"#myCarousel\" data-slide=\"prev\">‹</a>\n              <a class=\"carousel-control right\" href=\"#myCarousel\" data-slide=\"next\">›</a>\n            </div>\n            <div class=\"hidden-phone\" id=\"slider-thumbs\">\n              <!-- Bottom switcher of slider -->\n              <ul class=\"thumbnails\">\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-0\">\n                    <img src=\"http://placehold.it/170x100&text=one\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-1\">\n                    <img src=\"http://placehold.it/170x100&text=two\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-2\">\n                    <img src=\"http://placehold.it/170x100&text=three\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-3\">\n                    <img src=\"http://placehold.it/170x100&text=four\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-4\">\n                    <img src=\"http://placehold.it/170x100&text=five\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-5\">\n                    <img src=\"http://placehold.it/170x100&text=six\" />\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"span4\" id=\"carousel-text\"></div> \n          <div style=\"display: none;\" id=\"slide-content\">\n            <div id=\"slide-content-0\">\n              <h2>Slider One</h2>\n              <p>Lorem ipsum dolor sit amet,   dolor in reprehenderit in voluptate velit esse cilludolor in tate velit esse cilludolor in reprehenderitehenderit in voluptate velit esse cilludolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n            <div id=\"slide-content-1\">\n              <h2>Slider Two</h2>\n              <p>Lorem Ipsum Dolor</p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n            <div id=\"slide-content-2\">\n              <h2>Slider Three</h2>\n              <p>Lorem Ipsum Dolor</p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n            <div id=\"slide-content-3\">\n              <h2>Slider Four</h2>\n              <p>Lorem Ipsum Dolor</p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n            <div id=\"slide-content-4\">\n              <h2>Slider Five</h2>\n              <p>Lorem Ipsum Dolor</p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n            <div id=\"slide-content-5\">\n              <h2>Slider Six</h2>\n              <p>Lorem Ipsum Dolor</p>\n              <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n            </div>\n          </div>\n        </div>\n\n    </div>\n    <div class=\"tab-pane\" id=\"tab2\">\n      <p>Howdy, I'm in Section 2.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab3\">\n      <p>Howdy, I'm in Section 3.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab4\">\n      <p>Howdy, I'm in Section 4.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab5\">\n      <p>Howdy, I'm in Section 5.</p>\n    </div>\n  </div>\n</div>\n\n<!--<div class=\"thumbnail\" style=\"height: 350px;\">\n    <div class=\"row-fluid\" style=\"margin-bottom: 3%;\">\n        <div class=\"span12\" style=\"\n                                color: #FFFFFF;border: 1px solid #D4D4D4;\n                                border-radius: 4px 4px 4px 4px;\n                                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);\n                                background-color: ";
    if (stack1 = helpers.theme_color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.theme_color; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + ";\n                                #background-image: linear-gradient(to bottom, #F2F2F2, #CC4400);\n                                background-repeat: repeat-x;\n                                padding-top: 5px;\n        \">\n            <p class=\"text-center lead\" style=\"margin: 0px;\">";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p>\n        </div>\n    </div>\n    <div class=\"row-fluid\" style=\"height: 80%; overflow-x: hidden; overflow-y: auto; padding-right: 5px;\">\n        ";
    stack1 = helpers.each.call(depth0, depth0.articles, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += " \n        <div class=\"span12 thumbnail\" style=\"height: 125px; margin: 0px;\">\n            <div class=\"span4\">\n                <a href=\""
      + escapeExpression(((stack1 = depth0.link),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\"><img src=\""
      + escapeExpression(((stack1 = depth0.img),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "http://placehold.it/320x200\" alt=\"ALT NAME\"/></a>\n            </div>\n            <div class=\"caption span6\">\n                <p >"
      + escapeExpression(((stack1 = depth0.resume),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</p>\n            </div>\n            <div class=\"span2\" style=\"height: 100%; position: relative;\">\n                <p class=\"text-center\" style=\"position: absolute; top: 50%; margin-top: -15px; height: 30px; width: 100%;\"> 10/20 </a>\n            </div>\n        </div>\n        <div class=\"span12\" ></div>\n               \n    </div>\n    <div class=\"row-fluid\">\n        <div class=\"span12\">\n        </div>\n    </div>\n</div>-->\n    \n    \n    \n    \n<!--\n      <img src=\"http://placehold.it/320x200\" alt=\"ALT NAME\" />\n      <div class=\"caption\">\n        <h3>Header Name</h3>\n        <p>Description</p>\n        <p align=\"center\"><a href=\"http://bootsnipp.com/\" class=\"btn btn-primary btn-block\">Open</a></p>\n      </div>\n    </div>\n-->";
    return buffer;
    });
});
window.require.register("views/templates/modInfoBackUp", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;
    }

    buffer += "<div class=\"thumbnail\" style=\"height: 350px;\">\n    <div class=\"row-fluid\" style=\"margin-bottom: 3%;\">\n        <div class=\"span12\" style=\"\n                                color: #FFFFFF;border: 1px solid #D4D4D4;\n                                border-radius: 4px 4px 4px 4px;\n                                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);\n                                background-color: ";
    if (stack1 = helpers.theme_color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.theme_color; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + ";\n                                #background-image: linear-gradient(to bottom, #F2F2F2, #CC4400);\n                                background-repeat: repeat-x;\n                                padding-top: 5px;\n        \">\n            <p class=\"text-center lead\" style=\"margin: 0px;\">";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p>\n        </div>\n    </div>\n    <div class=\"row-fluid\" style=\"height: 80%; overflow-x: hidden; overflow-y: auto; padding-right: 5px;\">\n        ";
    stack1 = helpers.each.call(depth0, depth0.articles, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += " \n        <div class=\"span12 thumbnail\" style=\"height: 125px; margin: 0px;\">\n            <div class=\"span4\">\n                <a href=\""
      + escapeExpression(((stack1 = depth0.link),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\"><img src=\""
      + escapeExpression(((stack1 = depth0.img),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "http://placehold.it/320x200\" alt=\"ALT NAME\"/></a>\n            </div>\n            <div class=\"caption span6\">\n                <p >"
      + escapeExpression(((stack1 = depth0.resume),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</p>\n            </div>\n            <div class=\"span2\" style=\"height: 100%; position: relative;\">\n                <p class=\"text-center\" style=\"position: absolute; top: 50%; margin-top: -15px; height: 30px; width: 100%;\"> 10/20 </a>\n            </div>\n        </div>\n        <div class=\"span12\" ></div>\n               \n    </div>\n    <div class=\"row-fluid\">\n        <div class=\"span12\">\n        </div>\n    </div>\n</div>\n    \n    \n    \n    \n<!--\n      <img src=\"http://placehold.it/320x200\" alt=\"ALT NAME\" />\n      <div class=\"caption\">\n        <h3>Header Name</h3>\n        <p>Description</p>\n        <p align=\"center\"><a href=\"http://bootsnipp.com/\" class=\"btn btn-primary btn-block\">Open</a></p>\n      </div>\n    </div>\n-->";
    return buffer;
    });
});
window.require.register("views/templates/modInfoBackup2", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    return buffer;
    }

    buffer += "<div class=\"tabbable tabs-left well well-small\">\n  <ul class=\"nav nav-list\">\n    <li class=\"active\"><a href=\"#tab1\" data-toggle=\"tab\">Notre sélection</a></li>\n    <li><a href=\"#tab2\" data-toggle=\"tab\">Financés</a></li>\n    <li><a href=\"#tab3\" data-toggle=\"tab\">Les plus populaires</a></li>\n    <li><a href=\"#tab4\" data-toggle=\"tab\">Juste commencés</a></li>\n    <li><a href=\"#tab5\" data-toggle=\"tab\">Bientôt terminés</a></li>\n  </ul>\n  <div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"tab1\">\n      <!-- Main Area  Slider-->\n      <div id=\"main_area\">\n        <!-- Slider -->\n        <div class=\"span12\" id=\"slider\">\n          <!-- Top part of the slider -->\n          <div class=\"span8\" id=\"carousel-bounding-box\">\n            <div id=\"myCarousel\" class=\"carousel slide\">\n              <!-- Carousel items -->\n              <div class=\"carousel-inner\">\n                <div class=\"active item\" data-slide-number=\"0\"><img src=\"http://placehold.it/770x300&text=one\" /></div>\n                <div class=\"item\" data-slide-number=\"1\"><img src=\"http://placehold.it/770x300&text=two\" /></div>\n                <div class=\"item\" data-slide-number=\"2\"><img src=\"http://placehold.it/770x300&text=three\" /></div>\n                <div class=\"item\" data-slide-number=\"3\"><img src=\"http://placehold.it/770x300&text=four\" /></div>\n                <div class=\"item\" data-slide-number=\"4\"><img src=\"http://placehold.it/770x300&text=five\" /></div>\n                <div class=\"item\" data-slide-number=\"5\"><img src=\"http://placehold.it/770x300&text=six\" /></div>\n              </div>\n              <!-- Carousel nav -->\n              <a class=\"carousel-control left\" href=\"#myCarousel\" data-slide=\"prev\">‹</a>\n              <a class=\"carousel-control right\" href=\"#myCarousel\" data-slide=\"next\">›</a>\n            </div>\n          </div>\n          <div class=\"span4\" id=\"carousel-text\"></div> \n            <div style=\"display: none;\" id=\"slide-content\">\n              <div id=\"slide-content-0\">\n                <h2>Slider One</h2>\n                <p>Lorem ipsum dolor sit amet,   dolor in reprehenderit in voluptate velit esse cilludolor in tate velit esse cilludolor in reprehenderitehenderit in voluptate velit esse cilludolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n              <div id=\"slide-content-1\">\n                <h2>Slider Two</h2>\n                <p>Lorem Ipsum Dolor</p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n              <div id=\"slide-content-2\">\n                <h2>Slider Three</h2>\n                <p>Lorem Ipsum Dolor</p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n              <div id=\"slide-content-3\">\n                <h2>Slider Four</h2>\n                <p>Lorem Ipsum Dolor</p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n              <div id=\"slide-content-4\">\n                <h2>Slider Five</h2>\n                <p>Lorem Ipsum Dolor</p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n              <div id=\"slide-content-5\">\n                <h2>Slider Six</h2>\n                <p>Lorem Ipsum Dolor</p>\n                <p class=\"sub-text\">October 24 2012 - <a href=\"#\">Read more</a></p>\n              </div>\n            </div>\n          </div>\n          <div class=\"hidden-phone\" id=\"slider-thumbs\">\n            <div class=\"span8\">\n              <!-- Bottom switcher of slider -->\n              <ul class=\"thumbnails\">\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-0\">\n                    <img src=\"http://placehold.it/170x100&text=one\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-1\">\n                    <img src=\"http://placehold.it/170x100&text=two\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-2\">\n                    <img src=\"http://placehold.it/170x100&text=three\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-3\">\n                    <img src=\"http://placehold.it/170x100&text=four\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-4\">\n                    <img src=\"http://placehold.it/170x100&text=five\" />\n                  </a>\n                </li>\n                <li class=\"span2\">\n                  <a class=\"thumbnail\" id=\"carousel-selector-5\">\n                    <img src=\"http://placehold.it/170x100&text=six\" />\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n    </div>\n    <div class=\"tab-pane\" id=\"tab2\">\n      <p>Howdy, I'm in Section 2.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab3\">\n      <p>Howdy, I'm in Section 3.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab4\">\n      <p>Howdy, I'm in Section 4.</p>\n    </div>\n    <div class=\"tab-pane\" id=\"tab5\">\n      <p>Howdy, I'm in Section 5.</p>\n    </div>\n  </div>\n</div>\n\n<!--<div class=\"thumbnail\" style=\"height: 350px;\">\n    <div class=\"row-fluid\" style=\"margin-bottom: 3%;\">\n        <div class=\"span12\" style=\"\n                                color: #FFFFFF;border: 1px solid #D4D4D4;\n                                border-radius: 4px 4px 4px 4px;\n                                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);\n                                background-color: ";
    if (stack1 = helpers.theme_color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.theme_color; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + ";\n                                #background-image: linear-gradient(to bottom, #F2F2F2, #CC4400);\n                                background-repeat: repeat-x;\n                                padding-top: 5px;\n        \">\n            <p class=\"text-center lead\" style=\"margin: 0px;\">";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p>\n        </div>\n    </div>\n    <div class=\"row-fluid\" style=\"height: 80%; overflow-x: hidden; overflow-y: auto; padding-right: 5px;\">\n        ";
    stack1 = helpers.each.call(depth0, depth0.articles, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += " \n        <div class=\"span12 thumbnail\" style=\"height: 125px; margin: 0px;\">\n            <div class=\"span4\">\n                <a href=\""
      + escapeExpression(((stack1 = depth0.link),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\"><img src=\""
      + escapeExpression(((stack1 = depth0.img),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "http://placehold.it/320x200\" alt=\"ALT NAME\"/></a>\n            </div>\n            <div class=\"caption span6\">\n                <p >"
      + escapeExpression(((stack1 = depth0.resume),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "</p>\n            </div>\n            <div class=\"span2\" style=\"height: 100%; position: relative;\">\n                <p class=\"text-center\" style=\"position: absolute; top: 50%; margin-top: -15px; height: 30px; width: 100%;\"> 10/20 </a>\n            </div>\n        </div>\n        <div class=\"span12\" ></div>\n               \n    </div>\n    <div class=\"row-fluid\">\n        <div class=\"span12\">\n        </div>\n    </div>\n</div>-->\n    \n    \n    \n    \n<!--\n      <img src=\"http://placehold.it/320x200\" alt=\"ALT NAME\" />\n      <div class=\"caption\">\n        <h3>Header Name</h3>\n        <p>Description</p>\n        <p align=\"center\"><a href=\"http://bootsnipp.com/\" class=\"btn btn-primary btn-block\">Open</a></p>\n      </div>\n    </div>\n-->";
    return buffer;
    });
});
window.require.register("views/templates/project", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n                                <div class=\"span12\">\n                                    <a class=\"thumbnail\" href=\"#\" ><img id=\"project_thumbnail\" alt=\"ALT NAME\" src=\""
      + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
      + "\"></a>\n                                    <input type=\"file\" id=\"project_thumbnail_input\" style=\"display: none;\"/>\n                                </div>\n                            ";
    return buffer;
    }

    buffer += "<div id=\"project_header\" class=\"row-fluid control-group\">\n    <h3 id=\"project_title\" class=\"span6\">\n        <input id=\"project_title_input\" class=\"project_attr_input\" type=\"text\" placeholder=\"Titre du projet\" style=\"display: none;\" value=\"\"/>\n        <strong class=\"project_attr\" id=\"project_title\">";
    if (stack1 = helpers.nom_projet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.nom_projet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</strong>\n        <small>, par <a href=\"#\">auteur</a></small>\n    </h3>\n    <h3 class=\"span6 text-right\">\n        <small class=\"text-info project_attr\">\n            0 jour restant\n            <a href=\"#\" id=\"tp_toolTip\">\n                &nbsp;<i class=\"icon-time\"></i>\n            </a>\n        </small>\n        <div data-date-format=\"dd-mm-yyyy\" data-date=\"\" id=\"datePicker\" class=\"input-append date project_attr_input\" style=\"display: none;\">\n            <input type=\"text\" readonly=\"\" value=\"\" size=\"16\" >\n            <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>\n        </div>\n    </h3>\n</div>\n<div id=\"project_body\" class=\"row-fluid\">\n    <div class=\"bs-docs-example\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"active\"><a data-toggle=\"tab\" href=\"#home\"><i class=\"icon-list-alt\"></i> Accueil</a></li>\n            <li class=\"\"><a data-toggle=\"tab\" href=\"#news\"><i class=\"icon-envelope\"></i> Membres</a></li>\n            <li class=\"\"><a data-toggle=\"tab\" href=\"#comments\" id=\"comments_pill_link\"><i class=\"icon-comment\"></i> Commentaires</a></li>\n        </ul>\n        <div class=\"tab-content\">\n            <div id=\"home\" class=\"tab-pane fade active in\">\n                <div class=\"row-fluid\" id=\"project_content\">\n                    <div class=\"span8\">\n                        <div class=\"row-fluid\">\n                            ";
    stack1 = helpers.each.call(depth0, depth0.thumbnails_projet, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                        </div>\n                        <div class=\"horizontal_divider row-fluid\">&nbsp;</div>\n                        <div class=\"row-fluid\">\n                            <div class=\"span12\">\n                                <p><strong>Description :</strong></p>\n                            </div>\n                        </div>\n                        <div class=\"row-fluid\">\n                            <div class=\"span12 well\">\n                                <textarea id=\"project_description_input\" class=\"project_attr_input span12\" rows=\"10\" style=\"display: none;\" ></textarea>\n                                <p id=\"project_description\" class=\"project_attr\" style=\"cursor: pointer\">\n                                    ";
    if (stack1 = helpers.description_projet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.description_projet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"span4\" >\n                        <p class=\"text-center\"><strong>Topics & Tags</strong></p>\n                    </div>\n                </div>\n            </div>\n            <div id=\"news\" class=\"tab-pane fade\">\n                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>\n            </div>\n            <div id=\"comments\" class=\"tab-pane fade\">\n                <div class=\"row-fluid\" id=\"comments_header\">\n                    <div class=\"\"></div>\n                </div>\n                <div class=\"row-fluid\" id=\"comments_content\"></div>\n                \n                \n                <div class=\"span4 well\">\n                    <form accept-charset=\"UTF-8\" action=\"\" method=\"POST\">\n                        <textarea class=\"span4\" id=\"new_message\" name=\"new_message\"\n                        placeholder=\"Type in your message\" rows=\"5\"></textarea>\n                        <h6 class=\"pull-right\">320 characters remaining</h6>\n                        <button class=\"btn btn-info\" type=\"submit\">Post New Message</button>\n                    </form>\n                </div>\n            </div>\n        </div>\n      </div>\n<!--    -->\n</div>";
    return buffer;
    });
});
window.require.register("views/templates/projectItem (copie)", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n                    <a href=\"#\" class=\"toResTags\" ><span class=\"label label-info\">"
      + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
      + "</span></a> \n                ";
    return buffer;
    }

  function program3(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                        ";
    stack1 = helpers['if'].call(depth0, depth0.fondateur, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                    ";
    return buffer;
    }
  function program4(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                            "
      + escapeExpression(((stack1 = ((stack1 = depth0.fondateur),stack1 == null || stack1 === false ? stack1 : stack1.ref_utilisateur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\n                        ";
    return buffer;
    }

    buffer += "<div class=\"projectItem_container span12\">\n  <style>\n    .pricing-table .plan {\n    border-radius: 5px;\n    text-align: center;\n    background-color: #f3f3f3;\n    -moz-box-shadow: 0 0 6px 2px #b0b2ab;\n    -webkit-box-shadow: 0 0 6px 2px #b0b2ab;\n    box-shadow: 0 0 6px 2px #b0b2ab;\n    }\n    .plan:hover {\n    background-color: #fff;\n    -moz-box-shadow: 0 0 12px 3px #b0b2ab;\n    -webkit-box-shadow: 0 0 12px 3px #b0b2ab;\n    box-shadow: 0 0 12px 3px #b0b2ab;\n    }\n    .plan {\n    padding: 20px;\n    color: #ff;\n    background-color: #5e5f59;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .plan-name-bronze {\n    padding: 20px;\n    color: #fff;\n    background-color: #665D1E;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .plan-name-silver {\n    padding: 20px;\n    color: #fff;\n    background-color: #C0C0C0;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .plan-name-gold {\n    padding: 20px;\n    color: #fff;\n    background-color: #FFD700;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .pricing-table-bronze {\n    padding: 20px;\n    color: #fff;\n    background-color: #f89406;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .pricing-table .plan .plan-name span {\n    font-size: 20px;\n    }\n    .pricing-table .plan ul {\n    list-style: none;\n    margin: 0;\n    -moz-border-radius: 0 0 5px 5px;\n    -webkit-border-radius: 0 0 5px 5px;\n    border-radius: 0 0 5px 5px;\n    }\n    .pricing-table .plan ul li.plan-feature {\n    padding: 15px 10px;\n    border-top: 1px solid #c5c8c0;\n    }\n    .pricing-three-column {\n    margin: 0 auto;\n    width: 80%;\n    }\n    .pricing-variable-height .plan {\n    float: none;\n    margin-left: 2%;\n    vertical-align: bottom;\n    display: inline-block;\n    zoom:1;\n    *display:inline;\n    }\n    .plan-mouseover .plan-name {\n    background-color: #4e9a06 !important;\n    }\n    .btn-plan-select {\n    padding: 8px 25px;\n    font-size: 18px;\n    }\n  </style>\n\n  <div class=\"row-fluid pricing-table pricing-three-column\">\n    <div class=\"span4 plan\">\n      <div class=\"plan-name-bronze\">\n        <h2>Bronze</h2>\n        <span>$8.99 / Month</span>\n      </div>\n      <ul>\n        <li class=\"plan-feature\">10 Users</li>\n        <li class=\"plan-feature\">5TB Disk Space</li>\n        <li class=\"plan-feature\"><a href=\"#\" class=\"btn btn-primary btn-plan-select\"><i class=\"icon-white icon-ok\"></i> Select</a></li>\n      </ul>\n    </div>\n  </div>\n    \n\n\n\n<!--\n\n    <div class=\"projectItem_header row-fluid\">\n        <div class=\"span12\">\n            <h4><strong><a href=\"#\" class=\"toResProject\">";
    if (stack1 = helpers.nom_projet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.nom_projet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</a></strong></h4>\n        </div>\n    </div>\n    <div class=\"projectItem_body row-fluid\">\n        <div class=\"span3\">\n            <a href=\"#\" class=\"toResProject thumbnail\"><img src=\"http://placehold.it/260x180\" alt=\"ALT NAME\"/></a>\n        </div>\n        <div class=\"span6\">\n            <p>\n                ";
    if (stack1 = helpers.description_projet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.description_projet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "...\n            </p>\n            <a href=\"#\" class=\"toResProject\">Read More</a>\n        </div>\n        <div class=\"span3\">\n            <p><i class=\"icon-tags\"></i> Tags :</p>\n            <p>\n                ";
    stack1 = helpers.each.call(depth0, depth0.topics, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n            </p>\n        </div>\n    </div>\n    <div class=\"projectItem_footer row-fluid\">\n        <div class=\"span12\">\n            <p></p>\n            <p>\n                <i class=\"icon-user\"></i> by <a href=\"#\">\n                    ";
    stack1 = helpers.each.call(depth0, depth0.members, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </a> \n                | <i class=\"icon-calendar\"></i> ";
    if (stack1 = helpers.date_creation) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.date_creation; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n                | <i class=\"icon-comment\"></i> <a href=\"/collection/comments/";
    if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"comments_number\" ></a>\n                | <i class=\"icon-pencil\"></i> <a  href=\"#\" >N Contributeurs</a>\n                | <i class=\"icon-star\"></i> Note :\n                <span class=\"star_rating\"></span>\n              </p>\n        </div>\n        <div class=\"span12\">\n            <div class=\"row-fluid comments_container\" style=\"display: none;\">\n                <div class=\"span12\" id=\"comment_list_";
    if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\"></div>\n                <div class=\"span12\"><span class=\"pull-right\"><a href=\"#\" class=\"hide_comments\">cacher</a></span></div>\n            </div>\n        </div>\n    </div>\n    <hr />\n-->\n\n</div>\n";
    return buffer;
    });
});
window.require.register("views/templates/projectItem", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                ";
    stack1 = helpers['if'].call(depth0, depth0.fondateur, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n              ";
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                  "
      + escapeExpression(((stack1 = ((stack1 = depth0.fondateur),stack1 == null || stack1 === false ? stack1 : stack1.ref_utilisateur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\n                ";
    return buffer;
    }

  function program4(depth0,data) {
    
    var buffer = "";
    buffer += "\n            <a href=\"#\" class=\"toResTags\" ><span class=\"label label-info\">"
      + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
      + "</span></a> \n          ";
    return buffer;
    }

  function program6(depth0,data) {
    
    var buffer = "";
    buffer += "\n                    <a href=\"#\" class=\"toResTags\" ><span class=\"label label-info\">"
      + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
      + "</span></a> \n                ";
    return buffer;
    }

  function program8(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                        ";
    stack1 = helpers['if'].call(depth0, depth0.fondateur, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                    ";
    return buffer;
    }
  function program9(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n                            "
      + escapeExpression(((stack1 = ((stack1 = depth0.fondateur),stack1 == null || stack1 === false ? stack1 : stack1.ref_utilisateur)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + "\n                        ";
    return buffer;
    }

    buffer += "<div class=\"projectItem_container\">\n\n  <style>\n    .project-thumbnail .plan {\n    border-radius: 5px;\n    text-align: center;\n    background-color: #f3f3f3;\n    -moz-box-shadow: 0 0 6px 2px #b0b2ab;\n    -webkit-box-shadow: 0 0 6px 2px #b0b2ab;\n    box-shadow: 0 0 6px 2px #b0b2ab;\n    margin-top:20px;\n    }\n    .plan:hover {\n    background-color: #fff;\n    -moz-box-shadow: 0 0 12px 3px #b0b2ab;\n    -webkit-box-shadow: 0 0 12px 3px #b0b2ab;\n    box-shadow: 0 0 12px 3px #b0b2ab;\n    }\n    .plan {\n    color: #ff;\n    background-color: #5e5f59;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .plan-name-color {\n    padding:5px;    \n    color: #fff;\n    background-color: #663D1E;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n\n    .project-thumbnail-color {\n    padding: 20px;\n    color: #fff;\n    background-color: #f89406;\n    -moz-border-radius: 5px 5px 0 0;\n    -webkit-border-radius: 5px 5px 0 0;\n    border-radius: 5px 5px 0 0;\n    }\n    .project-thumbnail .plan .plan-name span {\n    font-size: 20px;\n    }\n    .project-thumbnail .plan ul {\n    list-style: none;\n    margin: 0;\n    -moz-border-radius: 0 0 5px 5px;\n    -webkit-border-radius: 0 0 5px 5px;\n    border-radius: 0 0 5px 5px;\n    }\n    .project-thumbnail .plan ul li.plan-feature {\n    padding: 15px 10px;\n    border-top: 1px solid #c5c8c0;\n    text-align:left;\n    }\n    .project-three-column {\n    margin: 0 auto;\n    width: 80%;\n    }\n    .project-variable-height .plan {\n    float: none;\n    margin-left: 2%;\n    vertical-align: bottom;\n    display: inline-block;\n    zoom:1;\n    *display:inline;\n    }\n    .plan-mouseover .plan-name {\n    background-color: #4e9a06 !important;\n    }\n    .btn-plan-select {\n    padding: 8px 25px;\n    font-size: 18px;\n    }\n  </style>\n\n  <div class=\"row-fluid project-thumbnail project-three-column\">\n    <div class=\"plan\">\n      <div class=\"plan-name-color\">\n        <h4><strong><a href=\"#\" class=\"toResProject\">";
    if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</a></strong></h4>\n         <p>\n          ";
    if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "...\n         </p>\n         <a href=\"#\" class=\"toResProject\">Read More</a>        \n      </div>\n      <ul>\n        <li class=\"plan-feature\">\n           <i class=\"icon-user\"></i> by <a href=\"#\">\n              ";
    stack1 = helpers.each.call(depth0, depth0.members, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n              </a><br /> \n              <i class=\"icon-calendar\"></i> ";
    if (stack1 = helpers.creation_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.creation_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n              <i class=\"icon-comment\"></i> <a href=\"/collection/comments/";
    if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"comments_number\" ></a>\n              <i class=\"icon-pencil\"></i> <a  href=\"#\" >N Contributeurs</a>\n        </li>\n        <li class=\"plan-feature\">\n          <i class=\"icon-star\"></i> Note :  <span class=\"star_rating\"></span>          \n          <i class=\"icon-tags\"></i> Tags :\n          ";
    stack1 = helpers.each.call(depth0, depth0.topics, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "      \n        </li>\n      </ul>\n    </div>\n  </div>\n    \n\n<!--\n\n    <div class=\"projectItem_header row-fluid\">\n        <div class=\"span12\">\n            <h4><strong><a href=\"#\" class=\"toResProject\">";
    if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</a></strong></h4>\n        </div>\n    </div>\n    <div class=\"projectItem_body row-fluid\">\n        <div class=\"span3\">\n            <a href=\"#\" class=\"toResProject thumbnail\"><img src=\"http://placehold.it/260x180\" alt=\"ALT NAME\"/></a>\n        </div>\n        <div class=\"span6\">\n            <p>\n                ";
    if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "...\n            </p>\n            <a href=\"#\" class=\"toResProject\">Read More</a>\n        </div>\n        <div class=\"span3\">\n            <p><i class=\"icon-tags\"></i> Tags :</p>\n            <p>\n                ";
    stack1 = helpers.each.call(depth0, depth0.topics, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n            </p>\n        </div>\n    </div>\n    <div class=\"projectItem_footer row-fluid\">\n        <div class=\"span12\">\n            <p></p>\n            <p>\n                <i class=\"icon-user\"></i> by <a href=\"#\">\n                    ";
    stack1 = helpers.each.call(depth0, depth0.members, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n                </a> \n                | <i class=\"icon-calendar\"></i> ";
    if (stack1 = helpers.creation_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.creation_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\n                | <i class=\"icon-comment\"></i> <a href=\"/collection/comments/";
    if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\" class=\"comments_number\" ></a>\n                | <i class=\"icon-pencil\"></i> <a  href=\"#\" >N Contributeurs</a>\n                | <i class=\"icon-star\"></i> Note :\n                <span class=\"star_rating\"></span>\n              </p>\n        </div>\n        <div class=\"span12\">\n            <div class=\"row-fluid comments_container\" style=\"display: none;\">\n                <div class=\"span12\" id=\"comment_list_";
    if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "\"></div>\n                <div class=\"span12\"><span class=\"pull-right\"><a href=\"#\" class=\"hide_comments\">cacher</a></span></div>\n            </div>\n        </div>\n    </div>\n    <hr />\n-->\n</div>\n";
    return buffer;
    });
});
window.require.register("views/templates/projectLauncher", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div id=\"project_state_header\" class=\"row-fluid\" style=\"color: white;\">\n    <ul class=\"nav nav-pills\">\n        <li id=\"pill_creation\"><a href=\"#\">Creation</a></li>\n        <li><a href=\"#\" id=\"pill_incubation\">Incubation</a></li>\n        <li><a href=\"#\" id=\"pill_campagne\">Campagne</a></li>\n        <li><a href=\"#\" id=\"pill_fin\">Fin</a></li>\n    </ul>\n</div>\n<div id=\"project_header\" class=\"row-fluid control-group\">\n    <h3 id=\"project_title\" class=\"span6\">\n        <input id=\"project_title_input\" class=\"project_attr_input\" type=\"text\" placeholder=\"Titre du projet\" style=\"display: none;\" value=\"\"/>\n        <strong class=\"project_attr\" id=\"project_title\">Titre du projet</strong>\n        <small>, par <a href=\"#\">auteur</a></small>\n    </h3>\n    <h3 class=\"span6 text-right\">\n        <small class=\"text-info project_attr\">\n            0 jour restant\n            <a href=\"#\" id=\"tp_toolTip\">\n                &nbsp;<i class=\"icon-time\"></i>\n            </a>\n        </small>\n        <div data-date-format=\"dd-mm-yyyy\" data-date=\"\" id=\"datePicker\" class=\"input-append date project_attr_input\" style=\"display: none;\">\n            <input type=\"text\" readonly=\"\" value=\"\" size=\"16\" >\n            <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>\n        </div>\n    </h3>\n</div>\n<div id=\"project_body\" class=\"row-fluid\">\n    <div class=\"bs-docs-example\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"active\"><a data-toggle=\"tab\" href=\"#home\"><i class=\"icon-list-alt\"></i> Accueil</a></li>\n            <li class=\"\"><a data-toggle=\"tab\" href=\"#news\"><i class=\"icon-envelope\"></i> Membres</a></li>\n            <li class=\"\"><a data-toggle=\"tab\" href=\"#comments\"><i class=\"icon-comment\"></i> Commentaires</a></li>\n        </ul>\n        <div class=\"tab-content\">\n            <div id=\"home\" class=\"tab-pane fade active in\">\n                <div class=\"row-fluid\" id=\"project_content\">\n                    <div class=\"span8\">\n                        <div class=\"row-fluid\">\n                            <div class=\"span12\">\n                                <a class=\"thumbnail\" href=\"#\" ><img id=\"project_thumbnail\" alt=\"ALT NAME\" src=\"http://placehold.it/650x250\"></a>\n                                <input type=\"file\" id=\"project_thumbnail_input\" style=\"display: none;\"/>\n                            </div>\n                        </div>\n                        <div class=\"horizontal_divider row-fluid\">&nbsp;</div>\n                        <div class=\"row-fluid\">\n                            <div class=\"span12\">\n                                <p><strong>Description :</strong></p>\n                            </div>\n                        </div>\n                        <div class=\"row-fluid\">\n                            <div class=\"span12 well\">\n                                <textarea id=\"project_description_input\" class=\"project_attr_input span12\" rows=\"10\" style=\"display: none;\" ></textarea>\n                                <p id=\"project_description\" class=\"project_attr\" style=\"cursor: pointer\">\n                                    Description de votre projet\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"span4\" >\n                        <p class=\"text-center\"><strong>Topics & Tags</strong></p>\n                    </div>\n                </div>\n            </div>\n            <div id=\"news\" class=\"tab-pane fade\">\n                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>\n            </div>\n            <div id=\"comments\" class=\"tab-pane fade\">\n                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>\n            </div>\n        </div>\n      </div>\n<!--    -->\n</div>\n\n<div id=\"project_footer\" class=\"row-fluid text-center\">\n    <a id=\"project_validator\" class=\"btn btn-success btn-large\" href=\"#validateInfo\" data-toggle=\"modal\">Valider</a>\n</div>\n\n<!-- Modal -->\n<div id=\"validateInfo\" class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n        <h3 id=\"myModalLabel\">Validation des informations</h3>\n    </div>\n    <div class=\"modal-body\">\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n        <button class=\"btn btn-primary\" id=\"save_change_button\">Save changes</button>\n    </div>\n</div>\n\n";
    });
});
window.require.register("views/templates/projectsCol", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div></div>";
    });
});
window.require.register("views/templates/signUp", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"modal small hide fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n        <h3 id=\"myModalLabel\">Sign Up !</h3>\n    </div>\n    <div class=\"modal-body\">\n        \n      <form id=\"signup\" class=\"form-horizontal\">\n        <fieldset>\n          <!-- identifiant input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Identifiant</label>\n            <div class=\"controls\">\n                <input id=\"identifiant\" name=\"identifiant\" type=\"text\" placeholder=\"identifiant\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div>\n          <!-- password input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Mot de passe</label>\n            <div class=\"controls\">\n                <input id=\"password\" name=\"password\" type=\"password\" placeholder=\"Mot de passe\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div>    \n          <!-- nom input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Nom</label>\n            <div class=\"controls\">\n                <input id=\"Nom\" name=\"Nom\" type=\"text\" placeholder=\"Nom\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div>\n          <!-- prenom input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Prénom</label>\n            <div class=\"controls\">\n                <input id=\"prenom\" name=\"prenom\" type=\"text\" placeholder=\"prenom\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div>\n          <!-- type select -->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Type</label>\n            <div class=\"controls\">\n                <select id=\"type\" name=\"type\" class=\"input-xlarge\">\n                    <option value=\"\" selected=\"selected\">Type</option>\n                    <option value=\"Etudiant\">Etudiant</option>\n                    <option value=\"Doctorant\">Doctorant</option>\n                    <option value=\"Enseignant\">Enseignant</option>\n                    <option value=\"Exterieur\">Extérieur</option>\n                </select>\n            </div>\n          </div>\n        \n          <p> /!\\ Faire apparaitre le choix de branche et de niveau quand étudiant est selectionné /!\\</p>\n        \n          <!-- type select -->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Branche</label>\n            <div class=\"controls\">\n                <select id=\"branche\" name=\"branche\" class=\"input-xlarge\">\n                    <option value=\"\" selected=\"selected\">Branche</option>\n                    <option value=\"ISI\">ISI</option>\n                    <option value=\"MTE\">MTE</option>\n                    <option value=\"SM\">SM</option>\n                    <option value=\"SI\">SI</option>\n                    <option value=\"TC\">TC</option>\n                </select>\n                <br /><br />\n                <select id=\"niveau\" name=\"niveau\" class=\"input-xlarge\">\n                    <option value=\"\" selected=\"selected\">Niveau</option>\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                    <option value=\"4\">4</option>\n                    <option value=\"5\">5</option>\n                    <option value=\"6\">6</option>\n                    <option value=\"7\">7</option>\n                    <option value=\"8\">8</option>\n                </select>\n            </div>\n          </div>\n        \n          <!-- email input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Email</label>\n            <div class=\"controls\">\n                <input id=\"email\" name=\"email\" type=\"text\" placeholder=\"email\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div>\n        \n          <!-- telephone input-->\n          <div class=\"control-group\">\n            <label class=\"control-label\">Téléphone</label>\n            <div class=\"controls\">\n                <input id=\"telephone\" name=\"telephone\" type=\"text\" placeholder=\"Téléphone\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n          </div> \n          </div>\n          <div class=\"modal-footer\">\n            <!-- Submit -->\n          <div class=\"control-group\">\n            <div class=\"controls\">\n                <button type=\"submit\" class=\"btn btn-success\">Get started !</button>\n                <p class=\"help-block\"></p>\n            </div>\n          </div>      \n          </div>\n          </fieldset>\n      </form> \n</div>\n";
    });
});
window.require.register("views/templates/splitPage", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"container-fluid\">\n    <div class=\"row-fluid\">\n        <div class=\"span8\" id=\"splitPage_left\">\n        <!--Body content-->\n        </div>\n        <div class=\"span4\" id=\"splitPage_right\">\n        <!--Sidebar content-->\n        </div>\n    </div>\n</div>\n<div style=\"height: 85px;\"></div>\n";
    });
});
window.require.register("views/templates/userProfile", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"tabbable\"> <!-- Only required for left/right tabs -->\n  <ul class=\"nav nav-pills\">\n    <li class=\"active\"><a href=\"#tab1\" data-toggle=\"tab\">Profil public</a></li>\n    <li><a href=\"#tab2\" data-toggle=\"tab\">Paramètres</a></li>\n  </ul>\n<div class=\"tab-content\">\n  <div class=\"tab-pane active\" id=\"tab1\">\n    <table class=\"table table-striped table-bordered\">     \n      <thead>\n        <tr><th>Données personnelles</th></tr>\n      </thead>      \n      <tbody>\n        <tr>\n          <td>Nom</td>\n          <td>\n            <span id=\"user_nom\" class=\"user_attr\" style=\"cursor: pointer\">Doe</span>\n            <input type=\"text\" id=\"user_nom_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>\n        <tr>\n          <td>Prénom</td>\n          <td>\n            <span id=\"user_prenom\" class=\"user_attr\" style=\"cursor: pointer\">John</span>\n            <input type=\"text\" id=\"user_prenom_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>\n        <tr>\n          <td>Type</td>\n          <td>\n            <span id=\"user_type\" class=\"user_attr\" style=\"cursor: pointer\">Etudiant</span>\n            <select id=\"user_type_select\" name=\"type\" class=\"user_attr_input\" style=\"display:none\">\n              <option value=\"\" selected=\"selected\">Type</option>\n              <option value=\"Etudiant\">Etudiant</option>\n              <option value=\"Doctorant\">Doctorant</option>\n              <option value=\"Enseignant\">Enseignant</option>\n              <option value=\"Exterieur\">Extérieur</option>\n            </select>\n          </td>\n        </tr>\n        <tr>\n          <td>Branche</td>\n          <td>\n            <span id=\"user_branche\" class=\"user_attr\" style=\"cursor: pointer\">isi</span>\n            <select id=\"user_branche_select\" name=\"branche\" class=\"user_attr_input\" style=\"display:none\">\n              <option value=\"\" selected=\"selected\">Branche</option>\n              <option value=\"ISI\">ISI</option>\n              <option value=\"MTE\">MTE</option>\n              <option value=\"SM\">SM</option>\n              <option value=\"SI\">SI</option>\n              <option value=\"TC\">TC</option>\n            </select>\n          </td>\n        </tr>\n        <tr>\n          <td>Niveau</td>\n          <td>\n            <span id=\"user_niveau\" class=\"user_attr\" style=\"cursor: pointer\">5</span>\n            <select id=\"user_niveau_select\" name=\"niveau\" class=\"user_attr_input\" style=\"display:none\">\n              <option value=\"\" selected=\"selected\">Niveau</option>\n              <option value=\"1\">1</option>\n              <option value=\"2\">2</option>\n              <option value=\"3\">3</option>\n              <option value=\"4\">4</option>\n              <option value=\"5\">5</option>\n              <option value=\"6\">6</option>\n              <option value=\"7\">7</option>\n              <option value=\"8\">8</option>\n            </select>\n          </td>\n        </tr>        \n        <tr>\n          <td>Email</td>\n          <td>\n            <span id=\"user_email\" class=\"user_attr\" style=\"cursor: pointer\">john.doe@somewhere.com</span>\n            <input type=\"text\" id=\"user_email_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>\n        <tr>\n          <td>Téléphone</td>\n          <td>\n            <span id=\"user_tel\" class=\"user_attr\" style=\"cursor: pointer\">0638656565</span>\n            <input type=\"text\" id=\"user_tel_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>\n        \n      </tbody>\n    </table>\n    Mettre le choix des compétences/tags et la possibilité d'en ajouter des nouvelles ici ?\n    /!\\ Faire apparaitre le choix de branche et de niveau quand le type est étudiant est selectionné /!\\   \n  </div>  \n  <div class=\"tab-pane\" id=\"tab2\">\n    <table class=\"table table-striped table-bordered\">     \n      <tbody>\n        <tr>\n          <td>Identifiant</td>\n          <td>\n            <span id=\"user_identifiant\" class=\"user_attr\" style=\"cursor: pointer\">John</span>\n            <input type=\"text\" id=\"user_identifiant_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>\n        <tr>\n          <td>Mot de passe</td>\n          <td>\n            <span id=\"user_password\" class=\"user_attr\" style=\"cursor: pointer\">****</span>\n            <input type=\"text\" id=\"user_password_input\" class=\"user_attr_input\" style=\"display:none\">\n          </td>\n        </tr>    \n      </tbody>\n    </table>\n</div>       \n";
    });
});
window.require.register("views/userProfile_view", function(exports, require, module) {
  var UserProfileView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/userProfile');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = UserProfileView = (function(_super) {
    __extends(UserProfileView, _super);

    function UserProfileView() {
      this.toogleProjectAttr = __bind(this.toogleProjectAttr, this);
      this.render = __bind(this.render, this);    _ref = UserProfileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserProfileView.prototype.autoRender = true;

    UserProfileView.prototype.className = 'UserProfileView';

    UserProfileView.prototype.container = null;

    UserProfileView.prototype.template = template;

    UserProfileView.prototype.initialize = function() {
      UserProfileView.__super__.initialize.apply(this, arguments);
      this.delegate("click", ".user_attr", this.toogleProjectAttr);
      return this.delegate("blur", ".user_attr_input", this.toogleProjectAttr);
    };

    UserProfileView.prototype.render = function() {
      return UserProfileView.__super__.render.apply(this, arguments);
    };

    UserProfileView.prototype.toogleProjectAttr = function(event) {
      var elem, new_val;

      event.preventDefault();
      elem = $(event.target);
      if (elem.is('.user_attr')) {
        elem.hide();
        return elem.parent().find(".user_attr_input").val(elem.text()).show();
      } else if (elem.is('.user_attr_input')) {
        new_val = elem.val();
        elem.hide();
        if (new_val !== "") {
          elem.parent().find(".user_attr").html(new_val);
        } else {
          elem.val(elem.parent().find(".user_attr").text());
        }
        return elem.parent().find(".user_attr").show();
      }
    };

    return UserProfileView;

  })(View);
  
});
