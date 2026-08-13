---
title: Documentation
description: Découvrir Filius on iPad, ses modes de travail et la compatibilité des projets FILIUS.
sidebar:
  order: 1
---

Filius on iPad est une application iPad native pour concevoir, configurer et simuler des réseaux informatiques. Cette documentation distingue les fonctions confirmées des éléments planifiés ou expérimentaux.

## Parcours recommandé

1. Suivez le [démarrage rapide](/fr/quickstart/).
2. Découvrez toutes les zones dans [Interface et commandes](./interface/).
3. Choisissez les bons éléments avec [Appareils et connexions](./devices/).
4. Construisez le réseau en [mode conception](./design/), puis lancez le [mode simulation](./simulation/).
5. Installez les clients et services décrits dans [Applications simulées](./applications/).
6. Vérifiez la [compatibilité](./compatibility/) avant le cours et utilisez le [dépannage](./troubleshooting/) en cas de problème.

:::note[Documentation avant publication]
La disponibilité App Store, les déclarations de confidentialité et la licence publique ne sont pas encore validées.
:::

## Trois étapes

- **Concevoir :** placer les appareils et créer la topologie.
- **Configurer :** définir adresses, routes, services et applications.
- **Simuler :** produire du trafic, l’inspecter et expliquer le résultat.

## Expériences réseau avancées

L’implémentation iPad actuelle permet plusieurs expériences au-delà du premier ping :

- [Fonctions réseau](./networking/) : DNS avec enregistrements `A`, `MX` et `NS`, résolution récursive et administration web d’un routeur ou d’une passerelle,
- [Applications simulées](./applications/) : hôtes virtuels du serveur web, réponses et suppressions dans le client de messagerie,
- [Mode simulation](./simulation/) : perte globale de paquets, capture au format TSV et rapport détaillé expurgé,
- [Mode conception](./design/) : étiquettes issues du nom, de l’adresse IP, de l’adresse MAC ou des deux adresses,
- [Compatibilité](./compatibility/) : état de publication du Remote Link LAN entre deux iPad.

L’article de développement [De la référence Java à l’iPad](/fr/news/java-ipad-parity/) explique comment ces écarts ont été identifiés, implémentés et vérifiés.
