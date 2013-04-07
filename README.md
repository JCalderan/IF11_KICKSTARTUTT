IF11_KICKSTARTUTT
=================

KICKSTARTUTT project's repository, carried out under the UV 'EDI et Commerce électronique' (EDI and e-business), at the University of Technology of Troyes (UTT).

# KICKSTARTUTT
(- Better - english translation coming soon)
KICKSTARTUTT est un projet ayant pour but de mettre à disposition des étudiants de l'Université de Technologie de Troyes un espace sur le web où exposer leurs projets et leur permettant de capitaliser leurs compétences.

KICKSTARTUUT is a project aimed at providing to the students of the Université de Technologie de Troyes a space on the Web where they can show off their projects and capitalize their knowledge.

KICKSTARTUTT use the [Brunch](http://brunch.io) 'skeleton' [Brunch of Champions](https://github.com/simple10/brunch-of-champions), based on [Chaplin](https://github.com/chaplinjs/chaplin) and [Bootstrap](http://twitter.github.com/bootstrap) frameworks.

## Requires
- [Node.js](http://nodejs.org) 1.0+
- [Brunch](http://brunch.io) 1.4+
- [Brunch of Champions](https://github.com/simple10/brunch-of-champions)
- [CouchDB](http://couchdb.apache.org)

### Recommended 
- [couchapp](https://github.com/couchapp/couchapp)
- or any other tools that help you to create web application through Couchdb

## Getting started

We assume that you already have git, node.js, brunch, couchdb, and couchapp installed and set up on your computer.

```bash
$ cd ~/<myPath>
$ git clone https://github.com/JCalderan/IF11_KICKSTARTUTT.git <app_name>
$ cd KICKSTARTUTT
$ couchapp init
$ couchapp push . http://<user>:<passwd>@localhost:5984/kickstartutt
```

In your couchdb configuration document (default localisation : http://localhost:5984/_utils/config.html) add a row :
```text
vhosts: localhost:5984/kickstartutt = /kickstartutt/_design/<app_name>/_rewrite
```

## Features
(Coming soon)
