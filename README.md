# Projet_JS_Groupe16


Nous faisons 3 rôles:

Vendeur: post une annonce, modifie une annonce.
Admin : peut modifier, poster, supprimer des post.
Acheter: peut voir les annonces.


# Project Title

A brief description of what this project does and who it's for

##CARSELL

Fonctionnalités
-File system => Gestion du système de fichiers
-Buffer => Lecture de données (réseau/fichier)
-Path => Gestion des chemins (concaténation/absolute_path/...)
-Child process => Création de sous-process (node/shell/...) ("multi-threading")
-HTTP/HTTPS => Gestion des calls HTTP/S (client/serveur)
-Socket => Sous-objet permettant de lire la data des calls réseaux (client/serveur)
-JSDOM => Parsing d'un contenu HTML pour utiliser l'API DOM
-ExpressJS (Server Web/Routing)
-Sequelize (ORM => BDD) / MySQL
-JWT (Authentification)
-OAUTH2 (Authentification)


## API Reference

#### Get all items

Item
    GET : Récupérer un item
        200 : OK
        404 : Not Found
    PUT : Remplacer un item (= update)
        200 : OK
        400 : Bad Request => Le format attendu n'est pas correct (xml à la place de json)
        422 : Unprocessable Entity => Format OK, data corrompu (ex. number dans un champs email)
        404 : Not Found
    DELETE : Supprimer un item
        04 : No Content
        404 : Not Found

Collection
    GET : Récupérer la collection d'items
        200 : OK
    POST : Créer un item dans la collection
        201 : CREATED
        400 : Bad Request => Le format attendu n'est pas correct (xml à la place de json)
        422 : Unprocessable Entity => Format OK, data corrompu (ex. number dans un champs email)


Collection
    GET : Récupérer la collection d'items
    POST : Créer un item dans la collection
    Item
        GET : Récupérer un item
        PUT : Remplacer un item (= update)
        DELETE : Supprimer un item
    SubCollection
        GET : Récupère un collection d'items associé à une ressource
## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

