INSTALLATION GUIDE
==================
Guide d'installation sous Ubuntu/Debian

#Prerequis

- Ubuntu 12.04.2 +

Installer quelques paquets indispensables pour la suite :

```bash
sudo apt-get install build-essential, python-dev, g++
```

##Optionel

Installer quelques outils facilitant la tâche :
- [vim[](http://www.vim.org/about.php) est un editeur de text console puissant, et plus accessible que vi.
- [zsh](http://zsh.sourceforge.net/) est un shell qui propose plus d'interactivite avec l'utilisateur que bash ([documentation](http://doc.ubuntu-fr.org/zsh))
- [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) est un framework pour Zsh qui permet de pousser encore plus loins les fonctionalites offertes par zsh

```bash
sudo apt-get install vim, zsh
curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
chsh -s /bin/zsh
zsh
```

A partir d'ici on pourra editer le fichier ~/.zshrc, qui est charger à chaque demarage d'un terminal zsh.
Ajouter cette ligne à la fin du fichier (ou modifiez la si elle existe dejà)
```text
plugins=(git git-flow extract rvm python pip vim)
```
##Installer Node.js

A present installons node.js. Pour ce faire plusieurs moyens s'offrent à vous [ici]().