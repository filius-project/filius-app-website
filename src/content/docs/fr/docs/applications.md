---
title: Applications simulées
description: Installation, utilisation et objectifs pédagogiques de chaque application disponible.
sidebar:
  order: 8
---

Les PC et portables virtuels possèdent leur propre bureau et une zone **Installation de logiciels**. Les applications sont installées appareil par appareil : les rôles client et serveur doivent donc être répartis volontairement.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Bureau virtuel avec des applications installées dans Filius on iPad" loading="eager">

## Installer ou supprimer une application

1. Terminez la topologie et l’adressage en mode conception.
2. Démarrez le mode action.
3. Touchez un PC ou un portable.
4. Ouvrez **Installation de logiciels** ou le menu d’installation.
5. Installez l’application voulue. Son icône apparaît sur le bureau virtuel.
6. Touchez l’application, configurez-la et démarrez-la.

La suppression retire son lanceur de ce bureau virtuel. Enregistrez le projet avant une modification importante.

:::note
Toutes les applications ne doivent pas être installées partout. Un essai web exige un serveur web sur un appareil et un navigateur sur un autre. Le courrier électronique exige au minimum un serveur et des clients correctement configurés.
:::

## CMD

<img class="doc-app-icon" src="/docs-assets/applications/cmd.png" alt="Icône CMD">

Le shell de commandes réunit les diagnostics réseau et le système de fichiers virtuel. C’est l’outil principal de dépannage.

| Groupe                 | Commandes et objectif                                         |
| ---------------------- | ------------------------------------------------------------- |
| Accessibilité          | `ping`, `trace`, `path`, `traceroute`, `route`                |
| Adresses et connexions | `ipconfig`, `netstat`, `arp`, `arpsend`, `tcpdump`            |
| DNS                    | `host`, `nslookup`, `dns add`, `dns remove`, `dns resolve`    |
| Fichiers               | `cat`, `cd`, `cp`, `del`, `ls`, `mkdir`, `mv`, `pwd`, `touch` |
| Aide                   | `help` ou `help <commande>`                                   |

**Exemple :** `ping 192.168.1.20` vérifie l’accessibilité IP. `host web.ecole` teste ensuite la résolution de nom. `tcpdump` affiche un instantané limité des paquets enregistrés et non un processus réel bloquant de l’hôte.

## Explorateur de fichiers

<img class="doc-app-icon" src="/docs-assets/applications/file-explorer.png" alt="Icône Explorateur de fichiers">

Parcourt le système de fichiers virtuel de l’appareil sélectionné. Ces dossiers et fichiers appartiennent à la simulation, pas à la vraie app Fichiers de l’iPad.

**Utilisations :** Contrôler les résultats de l’éditeur de texte, du serveur web, de la messagerie ou de Gnutella ; expliquer les dossiers ; manipuler les mêmes fichiers dans CMD.

## Éditeur de texte

<img class="doc-app-icon" src="/docs-assets/applications/text-editor.png" alt="Icône Éditeur de texte">

Crée et modifie des fichiers texte dans le système virtuel. Les brouillons peuvent être enregistrés ou rétablis à leur dernier état sauvegardé.

**Utilisations :** Pages HTML pour le serveur web, fichiers texte à transférer ou partager en pair à pair, et comparaison avec la commande `cat`.

## Visionneuse d’images

<img class="doc-app-icon" src="/docs-assets/applications/image-viewer.png" alt="Icône Visionneuse d’images">

Ouvre les images virtuelles prises en charge. Elle lit uniquement le système de fichiers simulé de l’appareil courant.

**Utilisations :** Confirmer qu’une image a été transférée ou téléchargée et distinguer une image binaire d’un texte simple.

## Serveur web

<img class="doc-app-icon" src="/docs-assets/applications/web-server.png" alt="Icône Serveur web">

Fournit du contenu HTTP depuis un ordinateur virtuel. Le service peut être démarré, arrêté et redémarré ; son port par défaut est `80`.

**Procédure :**

1. Installez le serveur web sur l’appareil serveur.
2. Préparez le contenu dans son système de fichiers virtuel.
3. Démarrez le service et vérifiez son état.
4. Sur un second appareil, ouvrez le navigateur et saisissez l’adresse IP ou un nom d’hôte résolvable.
5. En cas d’échec, vérifiez d’abord `ping`, ensuite DNS, puis l’état du service.

## Navigateur web

<img class="doc-app-icon" src="/docs-assets/applications/web-browser.svg" alt="Icône Navigateur web">

Résout si nécessaire un nom d’hôte via le serveur DNS configuré, puis récupère le contenu HTTP par TCP simulé.

**Objectif pédagogique :** Expliquer la séquence DNS → TCP → HTTP. Un ping réussi ne garantit pas le chargement d’une page : DNS, le port de destination et le serveur web doivent aussi être corrects.

## Serveur Echo

<img class="doc-app-icon" src="/docs-assets/applications/echo-server.png" alt="Icône Serveur Echo">

Lance un service simple qui renvoie les données reçues au client. Choisissez un port et un protocole adaptés à l’expérience ; les diagnostics indiquent le démarrage, l’arrêt et le trafic.

**Utilisations :** Bases client/serveur, numéros de port et différence entre atteindre un hôte et atteindre un service.

## Client simple

<img class="doc-app-icon" src="/docs-assets/applications/simple-client.png" alt="Icône Client simple">

Se connecte à une adresse et un port via des sockets TCP ou UDP simulés, envoie des données, reçoit une réponse et se déconnecte.

**Expérience type :** Démarrez un serveur Echo sur l’appareil A ; choisissez le même protocole et le même port sur B ; envoyez un texte et comparez la réponse avec l’inspection des paquets.

## Serveur DNS

<img class="doc-app-icon" src="/docs-assets/applications/dns-server.png" alt="Icône Serveur DNS">

Stocke les correspondances nom d’hôte–IPv4 et répond aux requêtes DNS simulées sur le port UDP `53`.

**Procédure :**

1. Attribuez une adresse IP fixe au serveur DNS.
2. Ajoutez, par exemple, `web.ecole → 192.168.10.20`.
3. Configurez cette adresse DNS sur les clients.
4. Testez avec `host web.ecole` ou le navigateur.

DNS ne remplace pas le routage. Le client doit pouvoir atteindre le serveur DNS et l’adresse cible obtenue.

## Serveur DHCP

<img class="doc-app-icon" src="/docs-assets/applications/dhcp-server.png" alt="Icône Serveur DHCP">

Attribue automatiquement des réglages IPv4 aux clients DHCP activés. Configurez la plage d’adresses, le masque, la passerelle, le DNS et, si nécessaire, les attributions fixes. DHCP utilise les ports UDP simulés `67` et `68`.

**Contrôle :** Après l’échange, le client affiche son bail actif. `ipconfig` permet de vérifier l’adresse attribuée.

:::caution
Le serveur DHCP doit lui-même avoir une configuration fixe cohérente. Toute passerelle ou adresse DNS annoncée doit réellement exister et être accessible dans le réseau simulé.
:::

## Pare-feu personnel

<img class="doc-app-icon" src="/docs-assets/applications/firewall.png" alt="Icône Pare-feu personnel">

Filtre le trafic TCP, UDP et ICMP entrant de cet appareil virtuel. ICMP peut être autorisé séparément ; les règles de service peuvent préciser protocole, port et source.

**Expérience pédagogique :** Vérifiez le ping et un service Echo sans filtre. Bloquez ensuite ICMP ou le port choisi et comparez les résultats dans CMD et l’inspection des paquets.

## Serveur de messagerie

<img class="doc-app-icon" src="/docs-assets/applications/email-server.png" alt="Icône Serveur de messagerie">

Héberge les boîtes locales et exécute les services SMTP et POP3 simulés. SMTP utilise par défaut le port `25`, POP3 le port `110`. Configurez un domaine et des comptes utilisateur.

**Utilisations :** Distinguer l’envoi de la relève, comprendre les comptes et domaines et observer plusieurs étapes applicatives sur le même réseau IP.

## Client de messagerie

<img class="doc-app-icon" src="/docs-assets/applications/email-client.png" alt="Icône Client de messagerie">

Envoie les messages via le serveur SMTP configuré et les relève via POP3. Il exige une adresse e-mail, des identifiants, ainsi que l’hôte et le port des deux services.

**Topologie recommandée :** Un serveur avec deux comptes et deux appareils clients. Configurez d’abord l’IP du serveur ; ajoutez ensuite DNS et remplacez l’IP par un nom d’hôte.

## Gnutella

<img class="doc-app-icon" src="/docs-assets/applications/gnutella.png" alt="Icône Gnutella">

Crée un réseau pair à pair simulé. Les pairs peuvent rejoindre le réseau via un participant connu, découvrir d’autres pairs, rechercher des fichiers partagés et les télécharger. Le service fonctionne sur le port TCP `6346`.

L’application comprend les zones **Réseau**, **Recherche**, **Fichiers** et **Réglages**. Les fichiers partagés et téléchargés se trouvent dans le dossier pair à pair du système virtuel.

**Expérience type :** Installez Gnutella sur trois appareils ; mettez deux pairs directement en relation ; faites rejoindre le troisième via un pair connu ; recherchez un fichier et observez l’échange en plusieurs étapes.

## Générateur expérimental d’applications de protocole

Le générateur natif TCP/UDP est destiné à des expériences limitées et reste masqué par défaut.

:::caution
Il n’exécute pas de code source Java arbitraire et ne remplace pas de façon compatible l’assistant Java de la version de bureau. Les projets pédagogiques qui dépendent d’un logiciel Java personnalisé doivent être évalués séparément.
:::

## Dépannage rapide

1. **Liaison présente ?** Vérifiez les câbles et les ports occupés.
2. **IP correcte ?** Vérifiez adresse, masque et passerelle.
3. **Cible accessible ?** Utilisez `ping` ou `trace`.
4. **Nom résolvable ?** Vérifiez `host`/`nslookup` et DNS.
5. **Service démarré ?** Vérifiez l’application serveur et son port.
6. **Client correct ?** Vérifiez destination, protocole, port et identifiants.
7. **Pare-feu ?** Vérifiez les règles entrantes et l’autorisation ICMP.
8. **Inspecter les paquets :** Utilisez l’inspecteur ou `tcpdump` autour de l’étape en échec.
