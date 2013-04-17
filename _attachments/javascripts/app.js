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
    


    return "<form class=\"form-horizontal well\">\n    <fieldset>\n        <!-- Sign up form -->\n\n<h2>Sign up</h2>\n\n        <!-- identifiant input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Identifiant</label>\n            <div class=\"controls\">\n                <input id=\"identifiant\" name=\"identifiant\" type=\"text\" placeholder=\"identifiant\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- password input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Password</label>\n            <div class=\"controls\">\n                <input id=\"password\" name=\"password\" type=\"password\" placeholder=\"password\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>    \n        <!-- nom input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Nom</label>\n            <div class=\"controls\">\n                <input id=\"Nom\" name=\"Nom\" type=\"text\" placeholder=\"Nom\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- prenom input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Prénom</label>\n            <div class=\"controls\">\n                <input id=\"prenom\" name=\"prenom\" type=\"text\" placeholder=\"prenom\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n        <!-- type select -->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Type</label>\n            <div class=\"controls\">\n                <select id=\"type\" name=\"type\" class=\"input-xlarge\">\n                    <option value=\"\" selected=\"selected\">Type</option>\n                    <option value=\"Etudiant\">Etudiant</option>\n                    <option value=\"Doctorant\">Doctorant</option>\n                    <option value=\"Enseignant\">Enseignant</option>\n                    <option value=\"Exterieur\">Extérieur</option>\n                </select>\n            </div>\n        </div>\n        <!-- email input-->\n        <div class=\"control-group\">\n            <label class=\"control-label\">Email</label>\n            <div class=\"controls\">\n                <input id=\"email\" name=\"email\" type=\"text\" placeholder=\"email\"\n                class=\"input-xlarge\">\n                <p class=\"help-block\"></p>\n            </div>\n        </div>\n    </fieldset>\n</form>";
    });
});
window.require.register("views/templates/splitPage", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"container-fluid\">\n    <div class=\"row-fluid\">\n        <div class=\"span10\" id=\"splitPage_left\">\n        <!--Body content-->\n        </div>\n        <div class=\"span2\" id=\"splitPage_right\">\n        <!--Sidebar content-->\n        </div>\n    </div>\n</div>\n<div style=\"height: 85px;\"></div>";
    });
});
