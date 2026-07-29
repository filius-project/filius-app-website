---
title: Interface et commandes
description: Toutes les zones de l’app, les commandes, les modes, la zone de travail et les inspecteurs en détail.
sidebar:
  order: 3
---

Cette page explique les éléments visibles de **Filius on iPad**. Les noms correspondent à l’affichage iPad normal. En Split View ou dans une fenêtre étroite, plusieurs commandes sont regroupées dans des menus compacts.

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Projet Filius on iPad vide avec barre d’outils en haut, palette d’appareils à gauche et zone de conception" loading="eager">

## Barre d’outils supérieure

| Icône                                                                                            | Élément                | Fonction                                                                                                    |
| ------------------------------------------------------------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img class="doc-icon" src="/docs-assets/modes/new.png" alt="Icône Nouveau">                      | **Nouveau**            | Commence un projet vide. Enregistrez d’abord les modifications non sauvegardées.                            |
| <img class="doc-icon" src="/docs-assets/modes/open.png" alt="Icône Ouvrir">                      | **Ouvrir**             | Importe un projet depuis l’app Fichiers, y compris les fichiers `.fls` pris en charge.                      |
| <img class="doc-icon" src="/docs-assets/modes/save.png" alt="Icône Enregistrer">                 | **Enregistrer**        | Écrit le projet actuel dans un fichier qui peut être partagé ou rouvert.                                    |
| <img class="doc-icon" src="/docs-assets/modes/design.png" alt="Icône mode conception">           | **Mode conception**    | Placer les appareils, tracer les câbles et modifier les réglages réseau.                                    |
| <img class="doc-icon" src="/docs-assets/modes/simulation.png" alt="Icône mode action">           | **Mode action**        | Démarre la simulation et rend les ordinateurs virtuels et leurs applications utilisables.                   |
| <img class="doc-icon" src="/docs-assets/modes/documentation.png" alt="Icône mode documentation"> | **Mode documentation** | Ajoute du texte et des rectangles et exporte la documentation du projet.                                    |
| <img class="doc-icon" src="/docs-assets/modes/help.png" alt="Icône Aide">                        | **Aide**               | Ouvre l’aide contextuelle intégrée.                                                                         |
| <img class="doc-icon" src="/docs-assets/modes/information.png" alt="Icône Information">          | **Information**        | Affiche le produit, la version et les licences.                                                             |
| `•••`                                                                                            | **Plus**               | Contient Annuler, Rétablir, Réglages et, si activé, le générateur expérimental d’applications de protocole. |

### Vitesse de simulation

Le curseur en pourcentage contrôle le temps virtuel et le délai par connexion. Une valeur basse facilite l’observation des paquets ; une valeur élevée accélère les expériences longues. Il ne modifie **pas** la vitesse du vrai Wi-Fi ou d’Internet sur l’iPad.

:::tip
Utilisez une vitesse lente pour commenter les paquets en classe, puis augmentez-la une fois la configuration validée.
:::

## Palette des appareils

La palette de gauche contient l’outil câble, le PC, le portable, le switch, la passerelle, le routeur et Remote Link. L’outil de sélection se trouve en bas.

<img class="doc-screenshot doc-screenshot--palette" src="/docs-assets/interface/device-palette.png" alt="Palette de Filius on iPad avec câble, PC, portable, switch, passerelle, routeur et Remote Link" loading="lazy">

- **Toucher :** activer un outil, puis toucher la zone de travail.
- **Faire glisser :** déplacer directement un appareil de la palette vers sa position.
- **Sélectionner :** marquer un appareil ou un câble existant pour modifier ses propriétés.
- **Affichage étroit :** la palette devient une rangée horizontale compacte.

Chaque élément est décrit sur la page [Appareils et connexions](../devices/).

## Zone de travail

La grande zone centrale représente le schéma du réseau.

- Les appareils peuvent être déplacés et réorganisés.
- Les lignes représentent les connexions physiques entre les ports.
- Un élément sélectionné est visuellement mis en évidence.
- Touchez une zone vide pour annuler la sélection.
- En mode documentation, les textes et rectangles apparaissent au-dessus du réseau.

Une disposition claire — terminaux à l’extérieur, switches au centre et routeurs entre les sous-réseaux — facilite l’explication et le dépannage.

## Configuration de l’appareil et inspecteur

La sélection d’un appareil affiche les réglages disponibles pour ce type. Selon l’appareil :

- nom affiché et position,
- ports physiques et occupation,
- adresse IPv4 et masque par interface,
- passerelle par défaut,
- interfaces supplémentaires et routage d’un routeur,
- côtés WAN et LAN d’une passerelle,
- identifiant de paire et état d’un Remote Link.

Les modifications logiques se font en mode conception. Pendant le mode action, l’app privilégie l’état d’exécution, les applications et les diagnostics.

## Les trois modes de travail

### Mode conception

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/design.png" alt="Mode conception">

Construisez le réseau ici. Les fichiers de projet, appareils, connexions et adresses ne peuvent être modifiés que lorsque la simulation est arrêtée.

### Mode action

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/simulation.png" alt="Mode action">

Le démarrage valide la configuration et crée l’environnement réseau virtuel. Touchez un PC ou un portable pour ouvrir son bureau et ses applications installées.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Ordinateur virtuel en mode action avec son bureau et une fenêtre d’application" loading="lazy">

### Mode documentation

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/documentation.png" alt="Mode documentation">

Ajoutez des textes explicatifs et des rectangles au schéma, puis exportez le résultat en PNG ou PDF. Les appareils restent visibles mais ne sont pas configurés techniquement dans ce mode.

## Vue des paquets et protocoles

Pendant la simulation, Filius on iPad enregistre des événements attribuables. L’inspection sépare un paquet en couches et affiche notamment les appareils participants, le protocole et le temps virtuel.

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Inspecteur de paquets de Filius on iPad avec couches et détails de protocole" loading="lazy">

Ouvrez cette vue après des essais `ping`, DNS, HTTP, e-mail ou client/serveur pour expliquer non seulement le résultat, mais aussi le trajet dans le réseau simulé.
