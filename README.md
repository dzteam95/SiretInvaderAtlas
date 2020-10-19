## CLI 

| Commande | Action |
| --- | --- |

| npm run start | 
| npm run stop |
| npm run restart | 


## Step 1 - Récuperer le  projet
```
# Clone le projet

git clone 

# aller dans le projet 
cd SiretInvaderAtlas

# Installer les déppandances
npm install

```

## Step 2 - télécharger le csv data

* aller sur ce lien  : [StockEtablissement_utf8.zip](https://www.data.gouv.fr/fr/datasets/r/7e73e851-3b07-45e6-a29a-506733eafb2d)
* dézip et stockage à l'interieur du projet dans le dossier data 
  Modifier le nom Stock.csv




## Step 3 -découpage de fichier en plusieurs fichiers de taille 50 mo

On utilise csv splitter en lançant la commande :  node utils/csvSpliter.js

Cette commande crée un dossier : chunk ou sont stocker les fichiers .


# MongoDB connexion .
DB="mongodb+srv://user:"motdepasse"@cluster0.kcnnt.mongodb.net/pm2?retryWrites=true&w=majority";

# Step 4 - démarrer les  process
 pm2 start  : qui lance l’insertion dans la base de donnée et crée des fichiers logs


Pour mettre en pause c’est pm2 stop 
