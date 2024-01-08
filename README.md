
![Logo](https://imgdb.net/storage/uploads/c16548d9afab6f5d6a6c4e09156f707866393103ecd067fa9fb9ac3d7c9f3c7e.png)

# **minako**

minako est un réseau social open source fait avec NextJS et Prisma parce que pourquoi pas.

Vous pouvez dès à présent y accéder via https://minako.app.
## Technologies

**Client :** React, TailwindCSS, DaisyUI, Remark

**Serveur :** Node, NextJS, Prisma, NextAuth


## Installation ( local )

Pour commencer, téléchargez la dernière version de minako via GitHub.
```bash
  git clone https://github.com/LixagDev/Minako
```

Aller à la racine du projet.
```bash
  cd Minako
```

Exécutez ces deux commandes afin d'installer les dépendances et de générer Prisma :
```bash
  npm install
  npx prisma generate
```

Créez un fichier **.env** en le copiant du fichier **.env.example**. Aller sur https://discord.com/developers/applications pour créer une nouvelle application, c'est elle qui va nous servir à nous connecter via Discord.

![App Screenshot](https://imgdb.net/storage/uploads/363b5e1efbbf76af976f6b4bee34a366b0f7e79a219eb3db14a82ff4bee94942.png)

Après l'avoir créé, vous aller dans la catégorie **OAuth2** puis **General** afin de récupérer le **CLIENT ID** et le **CLIENT SECRET**.

![App Screenshot](https://imgdb.net/storage/uploads/74471dfa4941ae7ab107a77ca5923356028040e8ee16360868fa9f23ee89fa65.png)

**CLIENT ID** et **CLIENT SECRET** que vous aller mettre dans chaque variable d'environnement qui correspond : 
```env
  DISCORD_CLIENT_ID="CLIENT ID"
  DISCORD_CLIENT_SECRET="CLIENT SECRET"
```

Ensuite il faut ajouter le lien de retour après la connexion via l'OAuth2 de Discord, pour faire tourner l'application en local vous êtes obligé de mettre http://localhost:3000 :
```env
  NEXTAUTH_URL="http://localhost:3000"
```

Mais il faut aussi le préciser côté application Discord via un lien Redirect. **! LE NEXTAUTH_URL ET LE LIEN REDIRECT DOIVENT TOUJOURS CONCORDER !**

![App Screenshot](https://imgdb.net/storage/uploads/73784ac652e1cfb926bc50346e051328956466e30b6988dfe393f1268b4ae5da.png)

Pars la suite nous allons ajouter une nouvelle variable d'environnement où vous allez y mettre un clé secret qui permet d'encrypter les données passantes quand vous vous connectez. Il est conseillé de mettre un hash en base 64 par exemple.
```bash
  NEXTAUTH_SECRET="HASH BASE64"
```

Et pour finir avec les variables d'environnement, une dernière très importante qui va contenir le lien de notre base de donnée ( exemple : mysql://NOM_UTILISATEUR:MOTDEPASSE@HOST:PORT/NOM_BASE_DE_DONNÉES ) :
```bash
  DATABASE_URL="LIEN BASE DE DONNÉES"
```

Ouf, c'est enfin finir avec le fichier **.env**, si tout est bon il devait ressembler à ceci :
```bash
  DISCORD_CLIENT_ID="CLIENT ID"
  DISCORD_CLIENT_SECRET="CLIENT SECRET"
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="HASH BASE64"
  DATABASE_URL="LIEN BASE DE DONNÉES"
```

Exécutez cette commande afin de push les tables dans la base de données :
```bash
  npx prisma db push
```

Et pour lancer le projet en local :
```bash
  npm run dev
```