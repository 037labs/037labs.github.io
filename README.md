# Compléter et mettre à jour le site 037 Labs

Le site est statique : les textes se modifient dans les pages HTML, les fiches du catalogue dans `apps.js`, et les images dans `assets/`. Après chaque modification, enregistrez puis publiez les changements sur GitHub ; GitHub Pages redéploie le site.

Le bouton **EN / FR** est présent sur les pages publiques ; le choix de langue est mémorisé dans le navigateur. Les cartes des applications utilisent `description` pour le français et `descriptionEn` pour l’anglais. Quand vous ajouterez une application, fournissez les deux descriptions et ajoutez les deux versions de texte dans ses pages publiques.

## Prévisualiser le site en local

Tu peux ouvrir directement `index.html` dans ton navigateur, même avant d’envoyer les changements sur GitHub. Le catalogue est chargé depuis `apps.js`, un script local, et non par `fetch` d’un fichier JSON bloqué par les navigateurs en mode `file://`.

## 1. Identité visuelle et icônes

### Logo de 037 Labs

- Remplacez `assets/037labs_icon.png` par le logo de 037 Labs. Gardez ce nom de fichier pour éviter de modifier les pages.
- Le favicon rond utilisé dans les onglets est `assets/037labs_favicon.png`, une version du logo avec les coins transparents.
- Si vous remplacez le logo, remplacez également le favicon par une version circulaire avec fond transparent.
- Le texte « 037 Labs » à côté du symbole est du texte HTML. Pour changer le nom de marque, utilisez la recherche/remplacement global de VS Code et vérifiez les mentions juridiques une par une.

### Icônes de Carryall et Pitchy

- Remplacez `assets/apps/carryall_icon.png` et `assets/apps/pitchy_icon.png` par les icônes carrées des applications.
- Gardez ces noms, ou modifiez le champ `icon` correspondant dans `apps.js` si vous utilisez un autre nom ou format.
- Les icônes apparaissent dans les cartes de la page d’accueil et à gauche du titre sur la page de présentation. Préférez un carré net d’au moins 256 × 256 pixels ; le navigateur l’affiche dans un carré arrondi.
- En l’absence d’icône valide, le catalogue affiche automatiquement l’initiale du nom de l’application.

## 2. Page d’accueil et catalogue

Dans `index.html`, modifiez les textes visibles de la page d’accueil si vous souhaitez changer le slogan, le texte de présentation ou les titres. Le logo et la description SEO de la page se trouvent également dans ce fichier.

Dans `apps.js`, une fiche contrôle le nom, les descriptions, la plateforme, l’image, le lien Google Play et l’affichage du lien de suppression. Exemple :

```js
window.APP_CATALOG = [
  {
    slug: "carryall",
    name: "Carryall",
    description: "Remplacez ce texte par une description courte et exacte.",
    descriptionEn: "Add the matching English description here.",
    platform: "Android",
    icon: "assets/apps/carryall_icon.png",
    playStoreUrl: "",
    accountDeletion: true
  }
];
```

- `description` : résumé court affiché sur la carte de la page d’accueil.
- `descriptionEn` : traduction du résumé affichée en anglais.
- `platform` : étiquette affichée, par exemple `Android`, `iOS` ou `Android · iOS`.
- `icon` : chemin de l’image, relatif à la racine du site.
- `playStoreUrl` : URL officielle de la fiche Google Play, par exemple `https://play.google.com/store/apps/details?id=com.exemple.app`. Laisse la valeur vide tant que l’URL exacte n’est pas connue. Le bouton apparaît sur la carte et la page de l’application quand une URL est renseignée.
- `accountDeletion: true` : affiche le lien de suppression de compte. Ne l’activez que si l’application permet de créer un compte **et** si la page de suppression correspondante existe.
- `slug` : nom du dossier et partie de l’URL. Ne le changez pas après publication sans mettre à jour les liens déjà communiqués.

`apps.js` contient la liste JavaScript `window.APP_CATALOG`. Ajoutez les nouvelles applications dans ce tableau en séparant les objets par une virgule. Une modification dans `apps.js` ne change pas automatiquement les pages de présentation ou les documents ; modifiez-les également aux endroits décrits ci-dessous.

## 3. Informations propres à chaque application

### Carryall

- Présentation et e-mail de contact : `apps/carryall/index.html`.
- Privacy Policy : `apps/carryall/privacy-policy/index.html`.
- Terms & Conditions : `apps/carryall/terms/index.html`.
- Suppression de compte : `apps/carryall/delete-account/index.html`.

Carryall permet de créer un compte dans l’application ou avec Google. La page de suppression doit donc expliquer les deux cas, présenter une méthode accessible sans l’application et ne pas laisser croire que révoquer Google supprime le compte Carryall.

### Pitchy

- Présentation et e-mail de contact : `apps/pitchy/index.html`.
- Privacy Policy : `apps/pitchy/privacy-policy/index.html`.
- Terms & Conditions : `apps/pitchy/terms/index.html`.

Pitchy ne propose actuellement pas de compte. Il n’y a donc pas de page de suppression ni de lien de suppression dans son catalogue. Si Pitchy permet un jour de créer des comptes, copiez `_templates/app/delete-account/index.html` vers `apps/pitchy/delete-account/index.html`, complétez la page et ajoutez `"accountDeletion": true` à sa fiche dans `apps.js`.

### Texte de présentation et e-mail

Dans chaque page de présentation, remplacez l’adresse entre crochets par un e-mail que vous consultez et remplacez le texte d’introduction par une description concrète : à quoi sert l’application, pour qui, et quelles sont ses fonctions principales.

Ajoutez la même adresse de contact, ou une adresse spécialisée, dans les sections de contact des pages de confidentialité, des conditions et, pour Carryall, de suppression de compte. Ces adresses figurent dans les fichiers HTML listés ci-dessus ; elles ne sont pas centralisées.

## 4. Contenu à compléter dans les documents

**Ne publiez pas les pages juridiques avec leurs champs entre crochets.** Les textes fournis sont des trames à compléter et à vérifier selon le fonctionnement réel des applications ; ils ne constituent pas un avis juridique.

### Dans chaque Privacy Policy

Remplacez les champs entre crochets dans `apps/<application>/privacy-policy/index.html` et ajoutez les précisions manquantes :

- date d’entrée en vigueur ou de dernière mise à jour ;
- identité légale et coordonnées postales du responsable, adresse e-mail de contact ;
- toutes les données collectées, leur source et les champs concernés — y compris celles collectées par les SDK ; distinguez les deux méthodes d’inscription de Carryall ;
- finalité et base juridique pour chaque traitement ;
- nom, rôle, données concernées et politique de confidentialité de chaque prestataire ou SDK (authentification, publicité, analyse, paiement, crash/diagnostic, hébergement, etc.) ;
- durée ou critères de conservation, pays d’hébergement et garanties applicables aux transferts internationaux ;
- procédure pour exercer les droits, retirer un consentement et déposer une réclamation ;
- mesures de sécurité réellement appliquées, public visé et règles pour les mineurs ;
- moyen utilisé pour signaler les changements importants.

Ne déclarez pas qu’aucune donnée n’est collectée sans avoir vérifié l’application, ses bibliothèques et ses prestataires. Pour Google Sign-In, dites précisément quelles informations Google fournit à Carryall et comment elles sont utilisées.

### Dans chaque Terms & Conditions

Complétez `apps/<application>/terms/index.html` avec :

- date d’entrée en vigueur, identité légale et coordonnées de 037 Labs ;
- utilisateurs visés, âge minimum, territoires et exigences techniques ;
- description réelle du service, règles d’utilisation et motifs éventuels de suspension ;
- droits sur l’application et licence accordée ;
- disponibilité, maintenance, garanties et limites de responsabilité applicables ;
- achats intégrés, abonnements, tarifs, renouvellement, annulation et remboursement, ou indiquez clairement si cela ne s’applique pas ;
- services tiers et conditions correspondantes ;
- procédure d’information en cas de modification, droit applicable et juridiction, selon les règles de protection des consommateurs ;
- adresse e-mail de contact.

### Dans la page de suppression Carryall

Complétez `apps/carryall/delete-account/index.html` avec une procédure réelle et testée :

- emplacement exact du bouton de suppression dans l’application, libellé et étapes de confirmation ;
- procédure alternative par e-mail pour les personnes ayant désinstallé l’application ou perdu l’accès ;
- informations minimales à fournir pour identifier le compte et méthode de vérification sûre ;
- confirmation que le parcours fonctionne pour les comptes créés avec Google **et** ceux créés dans l’application ;
- données supprimées, données éventuellement conservées, motif légal et durée exacte ;
- délai de traitement et méthode d’envoi de confirmation ;
- adresse e-mail de suppression et contact général.

Ne demandez jamais le mot de passe ni les identifiants Google. La désinstallation de l’application et la révocation de Google ne remplacent pas la suppression du compte Carryall.

### Année et champs entre crochets

Remplacez les mentions `© [Année]` par l’année de publication ou l’année courante dans les pages de présentation et les pieds de page juridiques. Dans VS Code, faites `Ctrl+Shift+F` et recherchez `[` pour retrouver les champs qui restent à remplir. Relisez ensuite les phrases pour retirer les consignes destinées à l’éditeur.

## 5. app-ads.txt

Le fichier `app-ads.txt` est unique pour 037 Labs et se trouve à la racine du site. Si Carryall, Pitchy ou une future application utilise des publicités, remplacez les commentaires par les lignes exactes fournies par chaque réseau : domaine du vendeur, identifiant éditeur, type de relation (`DIRECT` ou `RESELLER`) et identifiant de certification lorsque requis. Ne devinez pas ces valeurs. Si aucun partenaire publicitaire ne vous demande de déclaration, n’inventez aucune ligne.

Après publication, vérifiez l’URL `https://votre-domaine/app-ads.txt` et déclarez ce même domaine comme site développeur dans les consoles concernées. Avec un dépôt Pages de projet, le fichier peut se trouver sous un chemin de dépôt ; utilisez un domaine personnalisé ou le dépôt `<identifiant>.github.io` si un partenaire exige le fichier directement à la racine du domaine.

## 6. Publier vos changements sur GitHub

Après avoir modifié les fichiers, ouvrez un terminal à la racine du projet et exécutez :

```sh
git add .
git commit -m "Met à jour les informations des applications"
git push
```

GitHub Pages redéploie le site depuis la branche configurée. Vérifiez ensuite la page d’accueil, chaque URL de document publiée dans les stores et le fichier `app-ads.txt`. Les URL de Carryall et Pitchy sont sous `apps/carryall/` et `apps/pitchy/` ; conservez les slugs pour ne pas casser les liens existants.
