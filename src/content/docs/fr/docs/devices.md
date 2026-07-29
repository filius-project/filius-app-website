---
title: Appareils et connexions
description: Câble, PC, portable, switch, passerelle, routeur et Remote Link en détail.
sidebar:
  order: 4
---

La palette des appareils construit la topologie physique. Chaque icône possède un rôle et des ports différents.

## Outil câble

<img class="doc-device" src="/docs-assets/devices/cable.png" alt="Outil câble de Filius on iPad">

L’outil câble relie deux ports libres.

1. Sélectionnez Câble.
2. Touchez le premier appareil ou port.
3. Touchez l’appareil ou le port de destination.
4. Vérifiez que la ligne de connexion est visible.

Un port ne peut pas recevoir plusieurs câbles simultanément. Un switch fournit donc de nombreux ports. Une connexion directe entre deux ordinateurs convient au premier test de ping.

## PC

<img class="doc-device" src="/docs-assets/devices/pc.png" alt="Icône PC">

**Rôle :** Terminal simulé pour les applications utilisateur et les services serveur.  
**Port par défaut :** `eth0`  
**Réglages courants :** Adresse IPv4, masque, passerelle par défaut et DHCP facultatif.  
**Utilisation :** CMD, navigateur, client e-mail, serveur web, DNS ou DHCP.

Le PC et le portable se comportent de la même façon au niveau réseau. Leurs icônes différentes rendent les rôles plus lisibles.

## Portable

<img class="doc-device" src="/docs-assets/devices/notebook.png" alt="Icône portable">

**Rôle :** Terminal mobile doté du même environnement applicatif simulé qu’un PC.  
**Port par défaut :** `eth0`  
**Utilisation :** Deuxième participant d’un ping, client web, client e-mail ou nœud pair à pair.

Filius on iPad ne simule pas ici un vrai Wi-Fi. Le portable est lui aussi relié par un câble virtuel.

## Switch

<img class="doc-device" src="/docs-assets/devices/switch.png" alt="Icône switch">

**Rôle :** Relie plusieurs appareils dans un même LAN.  
**Ports :** 24 ports physiques (`sw1` à `sw24`).  
**Objectif pédagogique :** Commutation Ethernet, apprentissage MAC et topologie en étoile.

Un switch n’est pas un routeur : il relie les appareils du réseau local, mais ne crée pas automatiquement un chemin vers un autre sous-réseau IPv4.

## Routeur

<img class="doc-device" src="/docs-assets/devices/router.png" alt="Icône routeur">

**Rôle :** Transmet les paquets IPv4 entre différents sous-réseaux.  
**Configuration initiale :** Une interface (`rt1`) ; d’autres peuvent être ajoutées.  
**Réglages courants :** Adresse et masque par interface, plus les entrées de routage ou de transmission.

Chaque réseau raccordé exige une interface du routeur ayant une adresse de ce réseau. Les terminaux utilisent cette adresse comme passerelle par défaut.

## Passerelle

<img class="doc-device" src="/docs-assets/devices/gateway.png" alt="Icône passerelle">

**Rôle :** Relie un côté LAN à un côté WAN et permet d’étudier la traduction d’adresses.  
**Ports :** `wan0` et `lan0` fixes.  
**Utilisation :** Un réseau interne communique avec un second réseau via une adresse externe ; la table NAT peut être consultée et réinitialisée en mode action.

Branchez le réseau interne sur `lan0` et le réseau extérieur sur `wan0`.

## Remote Link

<img class="doc-device" src="/docs-assets/devices/remote-link.png" alt="Icône Remote Link">

**Rôle :** Crée une liaison point à point déterministe entre deux zones du schéma dessinées séparément.  
**Port :** `remote0`  
**Configuration :** Activez les deux Remote Links et donnez-leur le même identifiant de paire unique.

Les états distinguent non appairé, actif, ambigu et désactivé. Exactement deux liens activés avec le même identifiant forment une paire. Aucun socket du vrai réseau hôte n’est ouvert.

## Appareil non pris en charge

Les types inconnus importés depuis des fichiers `.fls` peuvent être conservés comme espaces réservés. Ils sont signalés, mais leur comportement peut ne pas être modifiable ou simulable. Voir [Compatibilité](../compatibility/).

## Quel élément choisir ?

| Objectif                              | Topologie recommandée                         |
| ------------------------------------- | --------------------------------------------- |
| Premier ping                          | Deux terminaux et un câble direct             |
| Plusieurs appareils dans un LAN       | Terminaux → switch                            |
| Deux sous-réseaux IPv4                | Un LAN de chaque côté → routeur               |
| Observer LAN/WAN et NAT               | LAN interne → passerelle → réseau externe     |
| Relier deux zones séparées du schéma  | Deux Remote Links avec le même identifiant    |
| Tester une application client/serveur | Deux terminaux avec les applications adaptées |

:::tip
Nommez les appareils selon leur rôle : `Client`, `Serveur web`, `DNS` ou `Routeur A`. C’est plus utile pour le cours et l’inspection des paquets que plusieurs PC portant le même nom.
:::
