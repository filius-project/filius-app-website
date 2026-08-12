---
locale: fr
translationKey: ipad-remote-link
slug: ipad-remote-link
title: "Deux iPad, un réseau simulé : Remote Link sur le réseau local"
summary: "Remote Link reliera deux simulations Filius exécutées sur des iPad distincts, avec des trames Ethernet complètes, une détection automatique et un transport chiffré."
publishedAt: 2026-08-12
kind: development
topics:
  - Remote Link
  - Réseau
  - Classe
  - Sécurité
readingMinutes: 5
featured: true
---

Deux groupes conçoivent des réseaux séparés, lancent leurs simulations sur deux iPad, puis relient les deux topologies par le véritable réseau local. C’est la situation pédagogique que le nouveau mode iPad à iPad de Remote Link doit rendre possible.

## Prolonger l’idée de la version pour ordinateur

Dans la version Java originale de FILIUS, le modem pouvait relier deux instances actives de l’application au moyen d’une véritable connexion TCP. Nous avons vérifié à nouveau le code source : un côté accepte la connexion, l’autre la rejoint avec une adresse IP et un port, puis des trames Ethernet simulées complètes circulent dans les deux sens.

Sur iPad, Remote Link reprend ce rôle. Le mode existant, qui associe deux Remote Links dans un même projet, reste disponible. Une nouvelle portée de connexion, **Autre iPad**, ajoute la liaison entre appareils.

## Relier les deux simulations

Chaque groupe ajoute un Remote Link à sa topologie et le raccorde au réseau simulé avec un câble. Quelques réglages communs suffisent ensuite :

1. Sélectionner **Autre iPad** sur les deux appareils.
2. Saisir le même code de liaison.
3. Choisir **Héberger la connexion** sur un iPad et **Rejoindre la connexion** sur l’autre.
4. Laisser l’iPad qui rejoint détecter automatiquement l’hôte sur le réseau local — ou saisir manuellement son adresse et son port.
5. Démarrer les deux simulations et autoriser l’accès au réseau local lorsque iPadOS le demande.

Les états affichés pendant l’exécution indiquent si Remote Link attend, recherche, établit la connexion ou est connecté. Si la connexion réelle est interrompue, l’iPad qui l’a rejointe tente automatiquement de la rétablir.

## Bien plus qu’un ping

Remote Link ne transporte pas un message ping spécialement préparé et ne sert pas d’intermédiaire pour un seul service. Il transmet la trame Ethernet complète produite par la simulation. ARP, IPv4, ICMP, TCP et UDP peuvent donc franchir la même liaison, tout comme les applications simulées qui reposent sur ces protocoles.

Cette distinction est importante en classe : la frontière entre les deux iPad reste une partie du réseau étudié. Les élèves peuvent continuer à examiner les paquets dans la simulation au lieu de les perdre dans un tunnel propre à une application.

> Le réseau local transporte les trames simulées ; les règles du réseau simulé restent visibles et vérifiables sur les deux iPad.

## Conçu pour le réseau local

La détection automatique utilise le mécanisme local de découverte de services d’Apple. Si le réseau d’un établissement ne transmet pas ces annonces entre appareils, un nom d’hôte ou une adresse IP et un port peuvent être saisis manuellement.

Le code de liaison partagé ne sert pas uniquement à associer les deux extrémités. Il permet aussi de dériver une clé pour un chiffrement authentifié. Le code lui-même n’est pas annoncé sur le réseau local, et la connexion ne nécessite aucun service cloud ni serveur relais.

Remote Link suit également le cycle de vie de la simulation. Arrêter la simulation, désactiver l’appareil ou quitter l’état actif de l’app ferme la connexion réelle. Les deux apps doivent donc rester ouvertes et actives pendant la simulation commune.

## Des limites assumées

Ce mode est prévu pour deux iPad sur un même réseau local joignable. Il ne s’agit pas d’un relais Internet, il ne traverse ni le NAT ni les pare-feu, et il n’utilise pas directement le format réseau du modem Java. Les réseaux Wi-Fi qui isolent leurs clients peuvent également bloquer les connexions directes entre appareils.

Chaque extrémité Remote Link accepte exactement un correspondant. Une classe peut néanmoins utiliser plusieurs liaisons séparées avec des codes de liaison et des ports différents.

## État du développement

La fonctionnalité est implémentée dans l’app iPad. Les tests automatisés couvrent notamment la négociation chiffrée, les codes de liaison incorrects, le transfert bidirectionnel des trames, la reconnexion, la sauvegarde et le fonctionnement actuel de Remote Link au sein d’un projet.

Une étape d’acceptation importante reste nécessaire avant d’en faire une publication : un essai réel avec deux iPad physiques sur le même Wi-Fi, comprenant l’autorisation d’accès au réseau local, la détection automatique et un scénario de classe réaliste. C’est pourquoi cette publication porte le statut **Développement**, et non celui d’une version disponible.
