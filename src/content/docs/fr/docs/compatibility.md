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

## Limite de bureau

Les applications arbitraires de l’assistant de bureau nécessitent un compilateur, une JVM et des API non disponibles sur iPad.

:::danger[À vérifier avant le cours]
Ouvrez les projets pédagogiques dans Filius on iPad et testez chaque application nécessaire. Le chargement réussi ne garantit pas l’exécution de tous les contenus de bureau.
:::
