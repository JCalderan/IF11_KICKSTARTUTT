Documentation de rewrites.json
=================
Documentation des règles de réécriture d'url couchdb, définit dans le fichier rewrites.json.

# Introduction

CouchDB fournit un sytème de récriture d'url coté serveur, permettant notamment de s'affranchir de la syntaxe (lourde) imposée par l'api couchDB, et d'obtenir de "jolie" urls, facilement mémorisable par des humains.

En définissant une simple règle dans le fichier rewrites.json, ainsi qu'un vhost qui redirige 'localhost:5984' vers 'kickstartutt:5984', on obtient le même résultat en appelant les deux url suivantes :
- "http://localhost:5984/kickstartutt/_design/kickstartutt/index.html" (url de base fournit par couchdb, pour accèder à notre page d'accueil)
- "http://kickstartutt:5984" (url réécrite, permettant d'accéder également à notre page d'accueil)

Dans le cadre d'un développement simple pour un forum, ou un petit site web, nous pourrions presque nous arréter là.
    
Cepandant dans le cadre de notre développement, nous utilisons le framework Chaplin.js, qui s'appuie sur la valeur des urls, qu'on nomme dans ce cas "routes", pour gérer l'instanciation de ses views, models, et collections (le fonctionnement de notre application en somme).
C'est une sorte d'url rewritting coté client, puisque l'appel d'une url de type "http://<server>/<value1>/<value2>" est en réalité censée être bloqué par chaplin.js, qui récupère alors <value1> et <value2> pour effectuer des traitements.
    
Ce document présente les solutions retenues pour rendre compatible ces deux processus d'url rewritting.
    
Voici ici quelques liens complémentaires :
- [Documentation sur les 'pretty url' de couchDB](http://docs.couchdb.org/en/latest/pretty_urls.html)
- [Wiki sur la réécriture d'url dans couchDB](http://wiki.apache.org/couchdb/Rewriting_urls)
    
# Rewrites.json

L'édition des règles de réécriture d'url, dans couchDB, à lieu dans le fichier "rewrites.json", à la racine de votre "couchapp" (ici le dossier kickstartutt).
Chaque règle est représenté par un objet json, dont les attributs obligatoire sont :
    - from : string, l'url appelante (celle affichée dans le navigateur)
    - to : string, l'url appelée, sur laquelle à lieu la redirection
    - method : string, la méthode http autorisée pour cette règle (par défaut: '*', qui autorise toute les méthodes)
    - query : json object, un object décrivant la manière dont on redirige les éventuelles parties variables de l'url
    
Les url décrites dans "from" sont relative à nom de domaine.
Ainsi "from: '/exemple'" fait référence à une url de type "http://kickstartutt:5984/exemple"
    
Les url décrites dans "to" sont relative au '_design/document' contenant le rewrite.
Ainsi "to: '/exemple'" d'un rewrite contenu dans "http://localhost:5984/ma_bd/_design/monDoc" fait référence à l'url : "http://localhost:5984/ma_bd/_design/monDoc/exemple".
    
Les urls peuvent également contenir des variables, explicite ou implicites :
- ":maVariable" fait ainsi référence à une variable nommée "maVariables
- "*" fait référence à toute la suite de l'url jusqu'a la fin, sous forme d'une variable (Remarque : '*' ne peut être utilisé qu'en fin d'url)
    
Cela permet la création de règles comme ceci :

```code
  {
    "from":"/model/*",
    "to": "../../*",
    "method": "GET"
  },
  {
    "from": "/collection/:col_name",
    "to": "_view/:col_name",
    "method": "GET"
  },
```

Remarque : ici "../../" fait référence à la base de donnée, le symbole ".." permettant de remonté d'un "/" dans l'url du "_design/document".

### Les règles de gestion des fichiers statiques

Notre application compilée par brunch comporte deux fichiers javascript, et un fichier css, qui doivent être accessible à tous moment dans l'application :
- vendor.js : contient l'ensemble des librairies javascripts nécessaire au fonctionnement de l'application.
- app.js : contient l'ensemble du code javascript spécifique à l'application
- bootstrapp.css : contient les classes de style bootstrap nécessaires à la mise en forme de l'application

En effet Chaplin.js étant un framework javascript, l'ensemble de sont processus d'url rewritting est codé dans le fichier vendor.js.
De plus, Chaplin.js implique de développer sont application sous formes de modules requirejs, contenu dans app.js et chargée dynamiquement celon les besoins de l'application.

Par convention nous avons décider que toute les urls faisant références à des fichiers statiques seront précédée par "brunch/", et serait redirigé vers le fichier voulut :

```code
  {
    "from": "/brunch/*",
    "to": "*"
  }

```

En opposition, deux préfixes ('view/' et 'col/') on été définit pour identifier les urls ne pointant pas vers des fichiers (ou documents) stockés dans la base de donnée, mais vers des routes chaplin.
Ces routes devront donc être interprété par chaplin.js, qui est chargée sur notre page d'accueil.

```code
  {
    "from":"/view/*",
    "to":"index.html"
  },
  {
    "from":"/col/*",
    "to":"index.html"
  },
  
```

Enfin nous souhaitons notre nom de domaine (définit en local par notre vhost) pointe vers notre page d'accueil :

```code
  {
    "from": "/",
    "to": "index.html"
  },
  
```

### Les règles de gestion des documents couchdb

Notre application doit tout de même conserver un moyen de dialoguer naturellement avec couchDB, afin d'accéder aux documents stockés en base de données, ou à tout autre outils (view, list, ect...) proposés par l'api couchDB.

Voici la liste des règles que nous fournissons afin de garentir les actions d'accès, création, et modification sur les document couchDB :

```code
  {
    "from":"/model/*",
    "to": "../../*",
    "method": "GET"
  },
  {
    "from":"/model/",
    "to": "../../",
    "method": "POST"
  },
  {
    "from":"/model/*",
    "to": "../../*",
    "method": "PUT"
  }
  
```

Remarque ici aussi on constatera l'utilisation d'un préfixe ("model"), qui est utilisé par convention pour identifier les urls qui pointent vers un document. 

### Les règles de gestion des views couchdb

De même que pour gérer l'accès aux documents stockés en base de données, nous proposont un certain nombre de règles fournissant un accès aux view couchdb :

```code
  {
    "from": "/collection/:col_name",
    "to": "_view/:col_name",
    "method": "GET"
  },
  {
    "from": "/collection/:col_name/:key",
    "to": "_view/:col_name",
    "method": "GET",
    "query": {
      "key": [":key"]
    }
  },
  
```

Remarque ici aussi on constatera l'utilisation d'un préfixe ("collection"), qui est utilisé par convention pour identifier les urls qui pointent vers une view. 


### Les règles de gestion des outils (view, list, update, etc...) particulier :

Ces règles sont proposé pour fournir un accès à certains outils spécifiques.
Dans l'idéale il s'agirait de réduire ces règles au minimum, afin de fournir des règles les plus standardisé possible, dans l'esprit des règles précédemment décrites.

```code
  {
    "to": "_list/top_projects/projects", 
    "from": "top_projects",
    "method": "GET"
  },
  {
    "to": "_view/projects_by_member", 
    "from": "projects_by_member/:id",
    "method": "GET",
    "query": {
      "key": [":id"]
    }
  },
  {
    "to": "_view/projects_by_topic", 
    "from": "projects_by_topic/:topic",
    "method": "GET",
    "query": {
      "key": [":topic"]
    }
  },
  {
      "to": "_list/test/projects",
      "from": "test",
      "method": "GET"
  }
  
```

## Implémentation avec Chaplin.js

A venir

### Introduction

A venir

### SimpleObject_model

A venir

### SimpleObject_collection

A venir
