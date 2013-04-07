INSTALLATION GUIDE
==================
Guide d'installation sous Ubuntu/Debian

#Prerequis

- Ubuntu 12.04.2 +

Installer quelques paquets indispensables pour la suite :

```bash
sudo apt-get update
sudo apt-get install build-essential python-dev g++ make curl
```

##Optionel

Installer quelques outils facilitant la tâche :
- [vim[](http://www.vim.org/about.php) est un editeur de text console puissant, et plus accessible que vi.
- [zsh](http://zsh.sourceforge.net/) est un shell qui propose plus d'interactivite avec l'utilisateur que bash ([documentation](http://doc.ubuntu-fr.org/zsh)).
- [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) est un framework pour Zsh qui permet de pousser encore plus loins les fonctionalites offertes par zsh.

```bash
$ sudo apt-get install vim, zsh
$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
$ chsh -s /bin/zsh
$ zsh
```
Si votre bash n'est pas remplacer par zsh au démarage d'un terminal, ajouter la ligne suivante à votre fichier ~/.bashrc

```text
zsh
```

A partir d'ici on pourra editer le fichier ~/.zshrc, qui est charger à chaque demarage d'un terminal zsh.
Ajouter cette ligne à la fin du fichier (ou modifiez la si elle existe dejà).

```text
plugins=(git git-flow extract rvm python pip vim)
```
##Installer Node.js

A present installons node.js. Pour ce faire plusieurs moyens s'offrent a vous [ici](http://doc.ubuntu-fr.org/nodejs).
Dans notre cas nous proposont d'utiliser le projet [nvm](https://github.com/creationix/nvm) qui permet de gerer simplement les differentes versions de Node.js.

```bash
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```
Ajouter alors la ligne suivante à la fin de votre fichier ~/.bashrc (ou ~/.zshrc si vous avez installer oh-my-zsh).
Notez que les chemin d'acces proposer ici peut être different chez vous.

```text
source ~/.nvm/bash_completion
source /usr/local/lib/node_modules/npm/lib/utils/completion.sh
. ~/.nvm/nvm.sh
```

A present installez node.js via la commande suivante :

```bash
$ nvm install 0.10
```
Enfin on rajoute une ligne au fichier ~/.bashrc ou ~/.zshrc afin de charger node.js au demarage d'un terminal :

```text
nvm use 0.10
```

## Installer le module Brunch

Maintenant nous pouvons installer [Brunch](http://brunch.io/), qui va nous permettre de gérer la l'infrasctructure de notre application web, au niveau de son arborescence mais également en gérant l'emsemble des frameworks et librairies qu'elle utilise.

```bash
$ npm install -g brunch
```

## Installer Git

Installons Git via :

```bash
$ sudo apt-get install git-core
```
### Optionel

Afin de gérer plus facilement sont dépot git nous proposont d'utiliser la librairie python [Legit](http://www.git-legit.org/).
Avant cela installons le package manager python [pip](https://pypi.python.org/pypi/pip), et les gestionnaires d'environnement virtuel python [virtualenv](https://pypi.python.org/pypi/virtualenv) et [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/)
```bash
$ sudo apt-get install python-setuptools
$ sudo easy_install pip
$ sudo pip install virtualenv
$ sudo pip install virtualenvwrapper
mkdir -p ~/.virtualenvs
```

Enfin ajoutez au fichier ~/.bashrc (ou ~/.zshrc) les lignes suivantes :

```bash
export WORKON_HOME=~/.virtualenvs
source ~/.local/bin/virtualenvwrapper.sh
```