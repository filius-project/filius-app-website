---
title: Mode conception
description: Placer, relier, sélectionner et configurer complètement les appareils.
sidebar:
  order: 5
---

Le mode conception construit la structure physique et logique du réseau. Consultez [Appareils et connexions](../devices/) pour chaque symbole de la palette.

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Mode conception vide avec barre d’outils, palette d’appareils et zone de travail" loading="eager">

## 1. Planifier la topologie

Définissez les rôles avant de placer les appareils : quels systèmes sont clients, lesquels fournissent des services, et quels réseaux doivent être séparés par un routeur ou une passerelle ? Nommez rapidement les appareils selon leur rôle.

Deux terminaux suffisent pour un premier LAN. À partir de trois participants, une topologie en étoile autour d’un switch est plus lisible.

## 2. Placer les appareils

Faites glisser PC, portables, switches, routeurs, passerelles ou Remote Links depuis la palette. Laissez de la place pour les câbles, les adresses et la documentation.

Après sélection, le nom, les interfaces, la position et les réglages réseau peuvent être modifiés selon le type d’appareil.

## 3. Créer les câbles

1. Sélectionnez l’outil câble.
2. Touchez le premier appareil ou un port libre.
3. Touchez l’appareil ou le port cible.
4. Vérifiez que la ligne est visible et que le port est occupé.

Une liaison directe entre terminaux est possible. Utilisez un switch lorsque plusieurs appareils partagent un LAN.

## 4. Attribuer les adresses IPv4

Pour un essai direct, les deux appareils appartiennent au même réseau :

| Appareil |        Adresse |          Masque | Passerelle par défaut |
| -------- | -------------: | --------------: | --------------------: |
| PC 1     | `192.168.1.10` | `255.255.255.0` |                  vide |
| PC 2     | `192.168.1.20` | `255.255.255.0` |                  vide |

Avec `/24`, les trois premiers groupes sont identiques et le dernier nombre doit être unique.

## 5. Relier deux sous-réseaux

| Zone                    | Adresse du routeur | Terminal        | Passerelle du terminal |
| ----------------------- | ------------------ | --------------- | ---------------------- |
| LAN A `192.168.10.0/24` | `192.168.10.1`     | `192.168.10.10` | `192.168.10.1`         |
| LAN B `192.168.20.0/24` | `192.168.20.1`     | `192.168.20.10` | `192.168.20.1`         |

Le routeur exige une interface dans chaque réseau. Sans passerelle correcte, le terminal n’envoie pas les paquets destinés à l’autre réseau au routeur.

## 6. Vérifier avant la simulation

- tous les câbles nécessaires sont présents,
- chaque adresse IPv4 est unique dans son réseau,
- les masques correspondent aux sous-réseaux,
- la passerelle appartient au réseau local du terminal,
- le routeur est adressé des deux côtés,
- les Remote Links forment une paire non ambiguë,
- les serveurs portent des noms explicites.

:::caution
Des IP dupliquées, des réseaux séparés sans routeur, un masque incorrect, une passerelle hors sous-réseau ou un câble absent donnent souvent des symptômes similaires. Dépannez depuis la liaison physique vers l’application.
:::
