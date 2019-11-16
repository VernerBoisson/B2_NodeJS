# ISAAC

Nous avions pour projet en cours de NodeJS de créer un script nous permettant de récupérer des informations à partir d'une API et de proposer un certain nombre de fonctionnalité grâce aux données récupérées, tout ça ce passe dans un terminal.

Notre script (isaac.js) récupère les données de l'API du jeu The Binding of Isaac (https://bindingofisaac.docs.apiary.io/). Mais cette API est très peu fourni et les données sont souvent pas reliées.

Avant de pouvoir être lancé, ce script nécessite l'installation de plusieurs modules :

* Commander : Permet de créer des options de lancement

* Sqlite3 : Permet de créer des bases de données et de les manipuler

* Axios : Permet de récupérer les données d'une API

* Inquirer : Permet de faire une petite interface utilisateur

* File-system : Permet de manipuler les fichiers systèmes

* Images-Downloader :  Permet de télécharger des images

* Console-png : Affiche les images dans la console

* Rimraf : Equivalent a Rm -RF (supprime les dossiers choisis)

Nous lui avons donné plusieurs fonctionnalités. Lorsqu'on lance le script (node isaac.js) il faudra ajouter derrière un -h pour voir la liste des fonctionnalités, mais nous la postons aussi ici.
* -I : Initialise les bases de données, crée des répertoires et télécharge les sprites à l'interieur.
* -C : Montre la liste des personnages.
* -c : Amène vers la selection d'un personnage et affiche le sprite du personnage en question.
* -B : Montre la liste des boss.
* -U : Supprime la base de données.
* -T : Supprime les répertoires créés.
* -S : Affiche le sprite de tous les personnages.

Créé par [Verner Boisson](https://github.com/VernerBoisson) et [Antoine Nicolleau](https://github.com/antoinenicolleau)
