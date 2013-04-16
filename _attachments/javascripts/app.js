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
  var Controller, HomeController, HomePageView, ModInfoModel, ModInfoView, ProjectModel, ProjectView, ProjectsCol, ProjectsColView, SignUpView, SplitPageView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/homePage_view');

  SplitPageView = require('views/splitPage_view');

  ModInfoModel = require('models/modInfo_model');

  ModInfoView = require('views/modInfo_view');

  ProjectsCol = require('models/projects_collection');

  ProjectsColView = require('views/projectsCol_view');

  ProjectModel = require('models/project_model');

  ProjectView = require('views/project_view');

  SignUpView = require('views/signUp_view');

  module.exports = HomeController = (function(_super) {
    __extends(HomeController, _super);

    function HomeController() {
      _ref = HomeController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HomeController.prototype.index = function() {
      var lastProjects_model, lastProjects_view, projectIdeas_model, projectIdeas_view, skillAdd_model, skillAdd_view, staredProjects_model, staredProjects_view;

      this.view = new HomePageView({
        container: '#page_container'
      });
      staredProjects_model = new ModInfoModel({
        title: "Hot Projects",
        theme_color: "#CC4400"
      });
      staredProjects_view = new ModInfoView({
        model: staredProjects_model,
        container: this.view.inner_container
      });
      lastProjects_model = new ModInfoModel({
        title: "Last Projects",
        theme_color: "#CC4400"
      });
      lastProjects_view = new ModInfoView({
        model: lastProjects_model,
        container: this.view.inner_container
      });
      skillAdd_model = new ModInfoModel({
        title: "Need Skills ?",
        theme_color: "#CC4400"
      });
      skillAdd_view = new ModInfoView({
        model: skillAdd_model,
        container: this.view.inner_container
      });
      projectIdeas_model = new ModInfoModel({
        title: "Ideas ???",
        theme_color: "#CC4400"
      });
      projectIdeas_view = new ModInfoView({
        model: projectIdeas_model,
        container: this.view.inner_container
      });
      return $(".modInfo").css({
        "margin-left": "0px",
        "margin-right": "10px",
        "margin-bottom": "10px"
      });
    };

    HomeController.prototype.list_projects = function(params) {
      var projectsCol_view, projects_collection;

      this.view = new SplitPageView({
        container: '#page_container'
      });
      projects_collection = new ProjectsCol();
      projects_collection.url = "/collection/" + (params.collection ? params.collection : "") + "/" + (params.filter ? params.filter : "");
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
      project_model = new ProjectModel({
        _id: params.id ? params.id : null
      });
      project_view = new ProjectView({
        model: project_model,
        container: "#splitPage_left"
      });
      return project_model.fetch();
    };

    HomeController.prototype.signup = function(params) {
      return this.view = new SignUpView({
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
window.require.register("models/comment_model", function(exports, require, module) {
  var CommentModel, Model, mediator, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  mediator = require('mediator');

  module.exports = CommentModel = (function(_super) {
    __extends(CommentModel, _super);

    function CommentModel() {
      _ref = CommentModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommentModel.prototype.idAttribute = "_id";

    CommentModel.prototype.initialize = function() {
      return CommentModel.__super__.initialize.apply(this, arguments);
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
window.require.register("models/comments_collection", function(exports, require, module) {
  var Collection, CommentsCol, commentModel, mediator, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  commentModel = require('models/comment_model');

  mediator = require('mediator');

  module.exports = CommentsCol = (function(_super) {
    __extends(CommentsCol, _super);

    function CommentsCol() {
      _ref = CommentsCol.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CommentsCol.prototype.model = commentModel;

    CommentsCol.prototype.initialize = function() {
      return CommentsCol.__super__.initialize.apply(this, arguments);
    };

    CommentsCol.prototype.parse = function(data) {
      if (data.rows) {
        return data.rows;
      } else {
        return data;
      }
    };

    return CommentsCol;

  })(Collection);
  
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
window.require.register("models/projectItem_model", function(exports, require, module) {
  var Model, ProjectItemModel, mediator, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  mediator = require('mediator');

  module.exports = ProjectItemModel = (function(_super) {
    __extends(ProjectItemModel, _super);

    function ProjectItemModel() {
      _ref = ProjectItemModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectItemModel.prototype.idAttribute = "_id";

    ProjectItemModel.prototype.initialize = function() {
      return ProjectItemModel.__super__.initialize.apply(this, arguments);
    };

    ProjectItemModel.prototype.parse = function(data) {
      if (data.value) {
        return data.value;
      } else {
        return data;
      }
    };

    return ProjectItemModel;

  })(Model);
  
});
window.require.register("models/project_model", function(exports, require, module) {
  var Model, ProjectModel, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = ProjectModel = (function(_super) {
    __extends(ProjectModel, _super);

    function ProjectModel() {
      _ref = ProjectModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectModel.prototype.urlRoot = "/model";

    ProjectModel.prototype.idAttribute = "_id";

    ProjectModel.prototype.initialize = function() {
      return ProjectModel.__super__.initialize.apply(this, arguments);
    };

    ProjectModel.prototype.parse = function(data) {
      if (data.rows) {
        return data.rows;
      } else {
        return data;
      }
    };

    return ProjectModel;

  })(Model);
  
});
window.require.register("models/projects_collection", function(exports, require, module) {
  var Collection, ProjectsCol, projectItemModel, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  projectItemModel = require('models/projectItem_model');

  module.exports = ProjectsCol = (function(_super) {
    __extends(ProjectsCol, _super);

    function ProjectsCol() {
      _ref = ProjectsCol.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectsCol.prototype.model = projectItemModel;

    ProjectsCol.prototype.initialize = function() {
      return ProjectsCol.__super__.initialize.apply(this, arguments);
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
window.require.register("routes", function(exports, require, module) {
  module.exports = function(match) {
    match('', 'home#index');
    match('col/:collection', 'home#list_projects');
    match('col/:collection/:filter', 'home#list_projects');
    match('view/project/:id', 'home#get_project');
    return match('view/signup', 'home#signup');
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

    ModInfoView.prototype.className = 'span6 modInfo';

    ModInfoView.prototype.container = null;

    ModInfoView.prototype.template = template;

    ModInfoView.prototype.initialize = function() {
      ModInfoView.__super__.initialize.apply(this, arguments);
      return this.listenTo(this.model, "change", this.render);
    };

    return ModInfoView;

  })(View);
  
});
window.require.register("views/projectItem_view", function(exports, require, module) {
  var CommentCol, CommentColView, ProjectItemView, View, mediator, template, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require("views/templates/projectItem");

  View = require("views/base/view");

  CommentCol = require("models/comments_collection");

  CommentColView = require("views/commentsCol_view");

  mediator = require("mediator");

  module.exports = ProjectItemView = (function(_super) {
    __extends(ProjectItemView, _super);

    function ProjectItemView() {
      this.setCommentLinks = __bind(this.setCommentLinks, this);
      this.setProjectLinks = __bind(this.setProjectLinks, this);
      this.setRaty = __bind(this.setRaty, this);
      this.render = __bind(this.render, this);    _ref = ProjectItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectItemView.prototype.autoRender = true;

    ProjectItemView.prototype.template = template;

    ProjectItemView.prototype.className = "projectItem row-fluid";

    ProjectItemView.prototype.container = null;

    ProjectItemView.prototype.raty_img = null;

    ProjectItemView.prototype.commentCol = null;

    ProjectItemView.prototype.commentColView = null;

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
      this.commentCol = new CommentCol();
      this.commentCol.url = "/collection/comments/" + this.model.attributes._id + "?limit=3";
      this.listenTo(this.model, "change", this.render);
      this.delegate("click", ".comments_number", this.initLoadComments);
      return this.delegate("click", ".hide_comments", this.hideComments);
    };

    ProjectItemView.prototype.initLoadComments = function(event) {
      this.commentCol.fetch();
      this.commentColView.render();
      return this.showComments(event);
    };

    ProjectItemView.prototype.render = function() {
      ProjectItemView.__super__.render.apply(this, arguments);
      this.setProjectLinks();
      this.setCommentLinks();
      this.setRaty();
      this.commentColView = new CommentColView({
        collection: this.commentCol,
        container: "#comment_list_" + this.model.attributes._id
      });
      return this.subview('commentCol', this.commentColView);
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

    ProjectItemView.prototype.setCommentLinks = function() {
      var comments_nbr;

      comments_nbr = this.model.attributes.commentaires ? this.model.attributes.commentaires.length : 0;
      return $(this.el).find(".comments_number").html(comments_nbr + " Commentaires");
    };

    ProjectItemView.prototype.hideComments = function(event) {
      if (event) {
        event.preventDefault();
      }
      return $(this.el).find(".comments_container").slideUp();
    };

    ProjectItemView.prototype.showComments = function(event) {
      if (event) {
        event.preventDefault();
      }
      return $(this.el).find(".comments_container").slideDown();
    };

    return ProjectItemView;

  })(View);
  
});
window.require.register("views/project_view", function(exports, require, module) {
  var ProjectView, View, mediator, template, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/project');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = ProjectView = (function(_super) {
    __extends(ProjectView, _super);

    function ProjectView() {
      _ref = ProjectView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProjectView.prototype.autoRender = true;

    ProjectView.prototype.className = 'projectView';

    ProjectView.prototype.container = null;

    ProjectView.prototype.template = template;

    ProjectView.prototype.initialize = function() {
      ProjectView.__super__.initialize.apply(this, arguments);
      return this.listenTo(this.model, "change", this.render);
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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/signUp');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = SignUpView = (function(_super) {
    __extends(SignUpView, _super);

    function SignUpView() {
      _ref = SignUpView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SignUpView.prototype.autoRender = true;

    SignUpView.prototype.className = 'SignUpView';

    SignUpView.prototype.container = null;

    SignUpView.prototype.template = template;

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
    


    return "\n<div class=\"navbar-inner\">\n  <div class=\"container\">\n    <a class=\"brand\">KICKSTARTUTT</a>\n    <div class=\"nav-collapse\">\n      <ul class=\"nav\">\n        <li><a href=\"/\"><i class=\"icon-home icon-white\"></i> Home</a></li>\n        <li ><a href=\"/col/projects/top\"><i class=\"icon-star icon-white\"></i> Top Projects</a></li>\n        <li><a href=\"/col/projects\"><i class=\"icon-list icon-white\"></i> All Projects</a></li>\n        <li><a href=\"/view/projectLauncher\"><i class=\"icon-pencil icon-white\"></i> Launch your Project</a></li>\n      </ul>\n      <form class=\"navbar-form form-inline span2\">\n        <div class=\"input-append\" >\n          <input type=\"text\" style=\"height: 100%;\" class=\"span2\"/>\n          <div class=\"btn-group\" style=\"height: 100%;\">\n            <button tabindex=\"-1\" class=\"btn\">Search</button>\n            <button tabindex=\"-1\" data-toggle=\"dropdown\" class=\"btn dropdown-toggle\">\n              <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n              <li><a href=\"#\">Action</a></li>\n              <li><a href=\"#\">Another action</a></li>\n              <li><a href=\"#\">Something else here</a></li>\n              <li class=\"divider\"></li>\n              <li><a href=\"#\">Separated link</a></li>\n            </ul>\n          </div>\n        </div>\n      </form>\n      <ul class=\"nav pull-right\">\n        <li class=\"dropdown\">\n          <a data-toggle=\"dropdown\" href=\"#\" class=\"dropdown-toggle\">Sign In <strong class=\"caret\"></strong></a>\n          <div class=\"dropdown-menu\"  style=\"padding: 15px; padding-bottom: 0px;\">\n           <form accept-charset=\"UTF-8\" action=\"login\" method=\"post\">\n              <input type=\"text\" name=\"username\" id=\"username\" placeholder=\"Username\" style=\"margin-bottom: 15px;\" />\n              <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" style=\"margin-bottom: 15px;\" />\n              <input type=\"checkbox\" value=\"1\" id=\"remember-me\" name=\"remember-me\" style=\"float: left; margin-right: 10px;\" />\n              <label for=\"remember-me\" class=\"string optional\"> Remember me</label>\n              <input type=\"submit\" value=\"Sign In\" id=\"sign-in\" class=\"btn btn-primary btn-block\">\n              <label style=\"text-align:center;margin-top:5px\">or</label>\n              <a href=\"/view/signup\" id=\"sign-up\" class=\"btn btn-primary btn-block\">Sign Up</a>\n            </form>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div style=\"width: 100%; color: white;\">\n  <p class=\"text-center\" style=\"background-color: #0088CC; height: 30px; font-size: 1.2em; line-height: 1.7em;\" >Official UTT's projects showcase and launcher !</p>\n</div>\n";
    });
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"span12\" >\n  <div id=\"home_page_container\" class=\"row-fluid\">\n    \n  </div>\n  <div style=\"height: 85px;\"></div>\n</div>";
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
window.require.register("views/templates/project", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<div id=\"project_header\" class=\"row-fluid\">\n    <h3><strong><a href=\"#\">Titre du projet</a></strong></h3>\n</div>\n<div id=\"project_thumbnail\" class=\"row-fluid\">\n    <div class=\"span12\">\n        <a href=\"#\" class=\"thumbnail\"><img src=\"http://placehold.it/650x250\" alt=\"ALT NAME\"/></a>\n    </div>\n</div>\n<div id=\"project_details\" class=\"row-fluid\">\n    <div class=\"span12\">\n        <ul>\n            <li>Lauched by : Name of launcher</li>\n            <li>Date of launch : XX/XX/XX</li> \n            <li>Deadline : XX/XX/XX/XX</li>\n            <li>Finished : y/n</li>\n        </ul>\n    </div>\n    <div class=\"spanX\">\n        Members : "
      + escapeExpression(((stack1 = depth0.auteur),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
      + ", member 2, member 3\n    </div>\n</div>\n<div class=\"row-fluid\">\n    <p><strong>Description of the project :</strong></p>\n    <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de tex...</p>\n</div>\n    \n";
    return buffer;
    });
});
window.require.register("views/templates/projectItem", function(exports, require, module) {
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

    buffer += "<div class=\"projectItem_container span12\">\n    <div class=\"projectItem_header row-fluid\">\n        <div class=\"span12\">\n            <h4><strong><a href=\"#\" class=\"toResProject\">";
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
    buffer += "\n            </p>\n        </div>\n    </div>\n    <div class=\"projectItem_footer row-fluid\">\n        <div class=\"span12\">\n            <p><!-- petit espace pour la representation --></p>\n            <p>\n                <i class=\"icon-user\"></i> by <a href=\"#\">\n                    ";
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
      + "\"></div>\n                <div class=\"span12\"><span class=\"pull-right\"><a href=\"#\" class=\"hide_comments\">cacher</a></span></div>\n            </div>\n        </div>\n    </div>\n    <hr />\n</div>\n";
    return buffer;
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
    


    return "<form class=\"form-horizontal well\">\n    <fieldset>\n        <!-- Sign up form -->\n\n<h2>Sign up</h2>\n\n        <!-- full-name input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Full Name</label>\n            <div class=\"controls\">\n                <input id=\"full-name\" name=\"full-name\" type=\"text\" placeholder=\"full name\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- address-line1 input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Address Line 1</label>\n            <div class=\"controls\">\n                <input id=\"address-line1\" name=\"address-line1\" type=\"text\" placeholder=\"address line 1\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\">Street address, P.O. box, company name, c/o</p>\n            </div>\n        </div>\n        <!-- address-line2 input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Address Line 2</label>\n            <div class=\"controls\">\n                <input id=\"address-line2\" name=\"address-line2\" type=\"text\" placeholder=\"address line 2\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\">Apartment, suite , unit, building, floor, etc.</p>\n            </div>\n        </div>\n        <!-- city input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">City / Town</label>\n            <div class=\"controls\">\n                <input id=\"city\" name=\"city\" type=\"text\" placeholder=\"city\" class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- region input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">State / Province / Region</label>\n            <div class=\"controls\">\n                <input id=\"region\" name=\"region\" type=\"text\" placeholder=\"state / province / region\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- postal-code input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Zip / Postal Code</label>\n            <div class=\"controls\">\n                <input id=\"postal-code\" name=\"postal-code\" type=\"text\" placeholder=\"zip or postal code\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- country select -->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Country</label>\n            <div class=\"controls\">\n                <select id=\"country\" name=\"country\" class=\"input-xlarge\">\n                    <option value=\"\" selected=\"selected\">(please select a country)</option>\n                    <option value=\"AF\">Afghanistan</option>\n                    <option value=\"AL\">Albania</option>\n                    <option value=\"DZ\">Algeria</option>\n                    <option value=\"AS\">American Samoa</option>\n                    <option value=\"AD\">Andorra</option>\n                    <option value=\"AO\">Angola</option>\n                    <option value=\"AI\">Anguilla</option>\n                    <option value=\"AQ\">Antarctica</option>\n                    <option value=\"AG\">Antigua and Barbuda</option>\n                    <option value=\"AR\">Argentina</option>\n                    <option value=\"AM\">Armenia</option>\n                    <option value=\"AW\">Aruba</option>\n                    <option value=\"AU\">Australia</option>\n                    <option value=\"AT\">Austria</option>\n                    <option value=\"AZ\">Azerbaijan</option>\n                    <option value=\"BS\">Bahamas</option>\n                    <option value=\"BH\">Bahrain</option>\n                    <option value=\"BD\">Bangladesh</option>\n                    <option value=\"BB\">Barbados</option>\n                    <option value=\"BY\">Belarus</option>\n                    <option value=\"BE\">Belgium</option>\n                    <option value=\"BZ\">Belize</option>\n                    <option value=\"BJ\">Benin</option>\n                    <option value=\"BM\">Bermuda</option>\n                    <option value=\"BT\">Bhutan</option>\n                    <option value=\"BO\">Bolivia</option>\n                    <option value=\"BA\">Bosnia and Herzegowina</option>\n                    <option value=\"BW\">Botswana</option>\n                    <option value=\"BV\">Bouvet Island</option>\n                    <option value=\"BR\">Brazil</option>\n                    <option value=\"IO\">British Indian Ocean Territory</option>\n                    <option value=\"BN\">Brunei Darussalam</option>\n                    <option value=\"BG\">Bulgaria</option>\n                    <option value=\"BF\">Burkina Faso</option>\n                    <option value=\"BI\">Burundi</option>\n                    <option value=\"KH\">Cambodia</option>\n                    <option value=\"CM\">Cameroon</option>\n                    <option value=\"CA\">Canada</option>\n                    <option value=\"CV\">Cape Verde</option>\n                    <option value=\"KY\">Cayman Islands</option>\n                    <option value=\"CF\">Central African Republic</option>\n                    <option value=\"TD\">Chad</option>\n                    <option value=\"CL\">Chile</option>\n                    <option value=\"CN\">China</option>\n                    <option value=\"CX\">Christmas Island</option>\n                    <option value=\"CC\">Cocos (Keeling) Islands</option>\n                    <option value=\"CO\">Colombia</option>\n                    <option value=\"KM\">Comoros</option>\n                    <option value=\"CG\">Congo</option>\n                    <option value=\"CD\">Congo, the Democratic Republic of the</option>\n                    <option value=\"CK\">Cook Islands</option>\n                    <option value=\"CR\">Costa Rica</option>\n                    <option value=\"CI\">Cote d'Ivoire</option>\n                    <option value=\"HR\">Croatia (Hrvatska)</option>\n                    <option value=\"CU\">Cuba</option>\n                    <option value=\"CY\">Cyprus</option>\n                    <option value=\"CZ\">Czech Republic</option>\n                    <option value=\"DK\">Denmark</option>\n                    <option value=\"DJ\">Djibouti</option>\n                    <option value=\"DM\">Dominica</option>\n                    <option value=\"DO\">Dominican Republic</option>\n                    <option value=\"TP\">East Timor</option>\n                    <option value=\"EC\">Ecuador</option>\n                    <option value=\"EG\">Egypt</option>\n                    <option value=\"SV\">El Salvador</option>\n                    <option value=\"GQ\">Equatorial Guinea</option>\n                    <option value=\"ER\">Eritrea</option>\n                    <option value=\"EE\">Estonia</option>\n                    <option value=\"ET\">Ethiopia</option>\n                    <option value=\"FK\">Falkland Islands (Malvinas)</option>\n                    <option value=\"FO\">Faroe Islands</option>\n                    <option value=\"FJ\">Fiji</option>\n                    <option value=\"FI\">Finland</option>\n                    <option value=\"FR\">France</option>\n                    <option value=\"FX\">France, Metropolitan</option>\n                    <option value=\"GF\">French Guiana</option>\n                    <option value=\"PF\">French Polynesia</option>\n                    <option value=\"TF\">French Southern Territories</option>\n                    <option value=\"GA\">Gabon</option>\n                    <option value=\"GM\">Gambia</option>\n                    <option value=\"GE\">Georgia</option>\n                    <option value=\"DE\">Germany</option>\n                    <option value=\"GH\">Ghana</option>\n                    <option value=\"GI\">Gibraltar</option>\n                    <option value=\"GR\">Greece</option>\n                    <option value=\"GL\">Greenland</option>\n                    <option value=\"GD\">Grenada</option>\n                    <option value=\"GP\">Guadeloupe</option>\n                    <option value=\"GU\">Guam</option>\n                    <option value=\"GT\">Guatemala</option>\n                    <option value=\"GN\">Guinea</option>\n                    <option value=\"GW\">Guinea-Bissau</option>\n                    <option value=\"GY\">Guyana</option>\n                    <option value=\"HT\">Haiti</option>\n                    <option value=\"HM\">Heard and Mc Donald Islands</option>\n                    <option value=\"VA\">Holy See (Vatican City State)</option>\n                    <option value=\"HN\">Honduras</option>\n                    <option value=\"HK\">Hong Kong</option>\n                    <option value=\"HU\">Hungary</option>\n                    <option value=\"IS\">Iceland</option>\n                    <option value=\"IN\">India</option>\n                    <option value=\"ID\">Indonesia</option>\n                    <option value=\"IR\">Iran (Islamic Republic of)</option>\n                    <option value=\"IQ\">Iraq</option>\n                    <option value=\"IE\">Ireland</option>\n                    <option value=\"IL\">Israel</option>\n                    <option value=\"IT\">Italy</option>\n                    <option value=\"JM\">Jamaica</option>\n                    <option value=\"JP\">Japan</option>\n                    <option value=\"JO\">Jordan</option>\n                    <option value=\"KZ\">Kazakhstan</option>\n                    <option value=\"KE\">Kenya</option>\n                    <option value=\"KI\">Kiribati</option>\n                    <option value=\"KP\">Korea, Democratic People's Republic of</option>\n                    <option value=\"KR\">Korea, Republic of</option>\n                    <option value=\"KW\">Kuwait</option>\n                    <option value=\"KG\">Kyrgyzstan</option>\n                    <option value=\"LA\">Lao People's Democratic Republic</option>\n                    <option value=\"LV\">Latvia</option>\n                    <option value=\"LB\">Lebanon</option>\n                    <option value=\"LS\">Lesotho</option>\n                    <option value=\"LR\">Liberia</option>\n                    <option value=\"LY\">Libyan Arab Jamahiriya</option>\n                    <option value=\"LI\">Liechtenstein</option>\n                    <option value=\"LT\">Lithuania</option>\n                    <option value=\"LU\">Luxembourg</option>\n                    <option value=\"MO\">Macau</option>\n                    <option value=\"MK\">Macedonia, The Former Yugoslav Republic of</option>\n                    <option value=\"MG\">Madagascar</option>\n                    <option value=\"MW\">Malawi</option>\n                    <option value=\"MY\">Malaysia</option>\n                    <option value=\"MV\">Maldives</option>\n                    <option value=\"ML\">Mali</option>\n                    <option value=\"MT\">Malta</option>\n                    <option value=\"MH\">Marshall Islands</option>\n                    <option value=\"MQ\">Martinique</option>\n                    <option value=\"MR\">Mauritania</option>\n                    <option value=\"MU\">Mauritius</option>\n                    <option value=\"YT\">Mayotte</option>\n                    <option value=\"MX\">Mexico</option>\n                    <option value=\"FM\">Micronesia, Federated States of</option>\n                    <option value=\"MD\">Moldova, Republic of</option>\n                    <option value=\"MC\">Monaco</option>\n                    <option value=\"MN\">Mongolia</option>\n                    <option value=\"MS\">Montserrat</option>\n                    <option value=\"MA\">Morocco</option>\n                    <option value=\"MZ\">Mozambique</option>\n                    <option value=\"MM\">Myanmar</option>\n                    <option value=\"NA\">Namibia</option>\n                    <option value=\"NR\">Nauru</option>\n                    <option value=\"NP\">Nepal</option>\n                    <option value=\"NL\">Netherlands</option>\n                    <option value=\"AN\">Netherlands Antilles</option>\n                    <option value=\"NC\">New Caledonia</option>\n                    <option value=\"NZ\">New Zealand</option>\n                    <option value=\"NI\">Nicaragua</option>\n                    <option value=\"NE\">Niger</option>\n                    <option value=\"NG\">Nigeria</option>\n                    <option value=\"NU\">Niue</option>\n                    <option value=\"NF\">Norfolk Island</option>\n                    <option value=\"MP\">Northern Mariana Islands</option>\n                    <option value=\"NO\">Norway</option>\n                    <option value=\"OM\">Oman</option>\n                    <option value=\"PK\">Pakistan</option>\n                    <option value=\"PW\">Palau</option>\n                    <option value=\"PA\">Panama</option>\n                    <option value=\"PG\">Papua New Guinea</option>\n                    <option value=\"PY\">Paraguay</option>\n                    <option value=\"PE\">Peru</option>\n                    <option value=\"PH\">Philippines</option>\n                    <option value=\"PN\">Pitcairn</option>\n                    <option value=\"PL\">Poland</option>\n                    <option value=\"PT\">Portugal</option>\n                    <option value=\"PR\">Puerto Rico</option>\n                    <option value=\"QA\">Qatar</option>\n                    <option value=\"RE\">Reunion</option>\n                    <option value=\"RO\">Romania</option>\n                    <option value=\"RU\">Russian Federation</option>\n                    <option value=\"RW\">Rwanda</option>\n                    <option value=\"KN\">Saint Kitts and Nevis</option>\n                    <option value=\"LC\">Saint LUCIA</option>\n                    <option value=\"VC\">Saint Vincent and the Grenadines</option>\n                    <option value=\"WS\">Samoa</option>\n                    <option value=\"SM\">San Marino</option>\n                    <option value=\"ST\">Sao Tome and Principe</option>\n                    <option value=\"SA\">Saudi Arabia</option>\n                    <option value=\"SN\">Senegal</option>\n                    <option value=\"SC\">Seychelles</option>\n                    <option value=\"SL\">Sierra Leone</option>\n                    <option value=\"SG\">Singapore</option>\n                    <option value=\"SK\">Slovakia (Slovak Republic)</option>\n                    <option value=\"SI\">Slovenia</option>\n                    <option value=\"SB\">Solomon Islands</option>\n                    <option value=\"SO\">Somalia</option>\n                    <option value=\"ZA\">South Africa</option>\n                    <option value=\"GS\">South Georgia and the South Sandwich Islands</option>\n                    <option value=\"ES\">Spain</option>\n                    <option value=\"LK\">Sri Lanka</option>\n                    <option value=\"SH\">St. Helena</option>\n                    <option value=\"PM\">St. Pierre and Miquelon</option>\n                    <option value=\"SD\">Sudan</option>\n                    <option value=\"SR\">Suriname</option>\n                    <option value=\"SJ\">Svalbard and Jan Mayen Islands</option>\n                    <option value=\"SZ\">Swaziland</option>\n                    <option value=\"SE\">Sweden</option>\n                    <option value=\"CH\">Switzerland</option>\n                    <option value=\"SY\">Syrian Arab Republic</option>\n                    <option value=\"TW\">Taiwan, Province of China</option>\n                    <option value=\"TJ\">Tajikistan</option>\n                    <option value=\"TZ\">Tanzania, United Republic of</option>\n                    <option value=\"TH\">Thailand</option>\n                    <option value=\"TG\">Togo</option>\n                    <option value=\"TK\">Tokelau</option>\n                    <option value=\"TO\">Tonga</option>\n                    <option value=\"TT\">Trinidad and Tobago</option>\n                    <option value=\"TN\">Tunisia</option>\n                    <option value=\"TR\">Turkey</option>\n                    <option value=\"TM\">Turkmenistan</option>\n                    <option value=\"TC\">Turks and Caicos Islands</option>\n                    <option value=\"TV\">Tuvalu</option>\n                    <option value=\"UG\">Uganda</option>\n                    <option value=\"UA\">Ukraine</option>\n                    <option value=\"AE\">United Arab Emirates</option>\n                    <option value=\"GB\">United Kingdom</option>\n                    <option value=\"US\">United States</option>\n                    <option value=\"UM\">United States Minor Outlying Islands</option>\n                    <option value=\"UY\">Uruguay</option>\n                    <option value=\"UZ\">Uzbekistan</option>\n                    <option value=\"VU\">Vanuatu</option>\n                    <option value=\"VE\">Venezuela</option>\n                    <option value=\"VN\">Viet Nam</option>\n                    <option value=\"VG\">Virgin Islands (British)</option>\n                    <option value=\"VI\">Virgin Islands (U.S.)</option>\n                    <option value=\"WF\">Wallis and Futuna Islands</option>\n                    <option value=\"EH\">Western Sahara</option>\n                    <option value=\"YE\">Yemen</option>\n                    <option value=\"YU\">Yugoslavia</option>\n                    <option value=\"ZM\">Zambia</option>\n                    <option value=\"ZW\">Zimbabwe</option>\n                </select>\n            </div>\n        </div>\n    </fieldset>\n</form>";
    });
});
window.require.register("views/templates/splitPage", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"container-fluid\">\n    <div class=\"row-fluid\">\n        <div class=\"span10\" id=\"splitPage_left\">\n        <!--Body content-->\n        </div>\n        <div class=\"span2\" id=\"splitPage_right\">\n        <!--Sidebar content-->\n        </div>\n    </div>\n</div>\n<div style=\"height: 85px;\"></div>";
    });
});
