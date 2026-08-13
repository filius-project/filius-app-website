---
title: Compatibilité FILIUS
description: Contenus .fls modifiables, conservés ou indisponibles sur iPad.
sidebar:
  order: 7
---

Filius on iPad traite le format de projet FILIUS comme un contrat de compatibilité.

## Flux pris en charge

- importer des fichiers `.fls`
- modifier les appareils, liens et configurations connus
- enregistrer et rouvrir les projets
- utiliser les applications simulées prises en charge
- conserver les contenus inconnus dans des limites de sécurité explicites

## Conservé ne signifie pas exécutable

Un contenu JavaBean/XML inconnu peut rester dans le projet sans être exécutable sur l’iPad.

## État de publication du Remote Link en réseau local

La connexion **Dans ce projet** entre deux Remote Links d’une même topologie reste prise en charge. Une configuration **Autre iPad** enregistrée est conservée, mais elle reste inactive dans les versions prêtes à être publiées.

L’implémentation LAN existe et dispose de tests automatisés. Son acceptation finale exige encore deux iPad physiques sur le même réseau local, avec l’autorisation Réseau local d’iPadOS, la découverte automatique, la saisie manuelle d’adresse, la reconnexion et un scénario réaliste en classe.

:::caution[Ne pas encore l’intégrer à un cours]
Utilisez **Dans ce projet** pour une expérience Remote Link qui doit fonctionner de manière fiable aujourd’hui. Ne prévoyez **Autre iPad** qu’après l’enregistrement d’une validation sur deux iPad pour la version concernée.
:::

## Limite de bureau

Les applications arbitraires de l’assistant de bureau nécessitent un compilateur, une JVM et des API non disponibles sur iPad.

:::danger[À vérifier avant le cours]
Ouvrez les projets pédagogiques dans Filius on iPad et testez chaque application nécessaire. Le chargement réussi ne garantit pas l’exécution de tous les contenus de bureau.
:::
