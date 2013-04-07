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
$ cd whateverpath
$ git clone https://github.com/JCalderan/IF11_KICKSTARTUTT.git <app_name>
$ cd <app_name>
$ brunch build --optimize
$ couchapp init
$ couchapp push . http://<user>:<passwd>@localhost:5984/<db_name>
```

In your host configuration file (/etc/hosts on Unix systems), add (or edit if existing) a row :
```text
# <ip> <domain1>:<port> <domain2>:<port>
# if editing the row starting with 127.0.0.1 DO NOT remove the localhost domain
# just add the name of your domain at the end of the line
127.0.0.1 localhost <domain> 
```

In your couchdb configuration document (default localisation : http://localhost:5984/_utils/config.html) add a row :
```text
vhosts: <domain>:5984 = /<db_name>/_design/<app_name>/_rewrite
```

## Features
(Coming soon)
