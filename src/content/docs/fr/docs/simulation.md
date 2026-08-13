---
title: Mode simulation
description: Démarrer l’exécution, utiliser les appareils virtuels et inspecter le trafic.
sidebar:
  order: 7
---

Le mode action fige la conception et crée un environnement réseau virtuel. Revenez au mode conception pour modifier la topologie ; utilisez le mode action pour les applications et les diagnostics.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Ordinateur virtuel et applications en mode action" loading="eager">

## Démarrer et arrêter

1. Enregistrez la conception.
2. Touchez **Mode action**.
3. Corrigez les éventuels avertissements.
4. Réglez une vitesse adaptée.
5. Revenez au mode conception pour arrêter.

L’arrêt termine l’environnement d’exécution. Enregistrez les modifications pertinentes et notez les résultats avant de reconstruire l’expérience.

## Ouvrir un ordinateur virtuel

Touchez un PC ou un portable. Son bureau affiche les applications installées. **Installation de logiciels** ajoute ou supprime des applications par appareil. Consultez [Applications simulées](../applications/) pour la référence complète.

Les appareils réseau, comme les switches, routeurs et passerelles, affichent plutôt leur état, leurs interfaces, le routage ou la table NAT.

## Produire le premier trafic

Ouvrez CMD sur le PC 1 :

```text
ipconfig
ping 192.168.1.20
arp
```

- `ipconfig` confirme la configuration locale.
- Le premier `ping` peut utiliser ARP pour découvrir l’adresse matérielle de la cible.
- ICMP transporte ensuite la requête et la réponse.
- `arp` affiche le voisin appris.

Un second ping peut produire moins de paquets préparatoires, car l’état ARP existe déjà.

## Observer les applications

Pour les protocoles applicatifs, suivez une séquence fixe :

1. Vérifiez l’accessibilité IP avec `ping`.
2. Si un nom est utilisé, vérifiez DNS avec `host` ou `nslookup`.
3. Démarrez le service serveur et notez son port.
4. Configurez la destination, le protocole et le port du client.
5. Exécutez l’essai.
6. Comparez la sortie de l’application et les paquets.

## Inspection des paquets

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Inspecteur de paquets avec couches et détails" loading="lazy">

Recherchez la dernière étape réussie :

- **aucun ARP :** vérifiez sous-réseau local, liaison et interface,
- **ARP mais aucun résultat ICMP :** vérifiez cible, route et pare-feu,
- **requête DNS sans réponse adaptée :** vérifiez serveur et enregistrement DNS,
- **établissement TCP sans réponse applicative :** vérifiez service, port et application serveur,
- **erreur SMTP, POP3 ou HTTP :** vérifiez données applicatives et identifiants.

## Simuler volontairement une perte de paquets

Utilisez **Perdre les paquets** pour introduire une panne globale contrôlée dans une expérience en cours. Maintenez la commande enfoncée : tant qu’elle le reste, chaque nouvelle trame du réseau simulé est supprimée. Relâchez-la pour que le nouveau trafic circule à nouveau normalement.

Une expérience reproductible :

1. Lancez un `ping` continu ou des requêtes client répétées.
2. Maintenez **Perdre les paquets** enfoncé pendant quelques secondes.
3. Observez les expirations et les événements marqués comme supprimés.
4. Relâchez la commande et vérifiez que les nouvelles requêtes réussissent.

La commande agit sur toute la topologie simulée, pas seulement sur l’appareil sélectionné. Elle est volontairement momentanée et se désactive lorsque la simulation s’arrête ou redémarre.

## Exporter la capture de paquets en texte

Ouvrez **Échange de paquets** sur un appareil, choisissez une interface si nécessaire, puis touchez **Exporter**. Filius on iPad enregistre un texte UTF-8 séparé par des tabulations, limité à l’appareil choisi et, le cas échéant, à son interface.

L’ordre est déterministe et le fichier convient à un tableur ou à une analyse personnalisée. Les mots de passe, identifiants, codes Remote Link, charges utiles et corps de messages sont retirés ou signalés. La conservation est limitée afin qu’une longue simulation n’augmente pas la mémoire sans fin. Si d’anciens événements ont déjà été supprimés, leur nombre figure explicitement dans l’export.

## Exporter un rapport détaillé

Ouvrez **Plus** et choisissez **Exporter le rapport détaillé**. Le rapport texte résume les métadonnées du projet, les liaisons, appareils et interfaces, applications, routes, DNS, DHCP, NAT et redirections de ports, pare-feu, configurations web et e-mail, Remote Links, perte de paquets, statistiques de trafic et événements individuels.

Utilisez-le pour un devoir, un diagnostic ou la comparaison de deux états d’expérience. Les valeurs sensibles et le contenu des messages sont masqués. Il représente l’état actuel du projet et les données d’exécution encore conservées ; lorsque la rétention a supprimé d’anciens événements, le rapport en indique aussi le nombre.

## Ordre de diagnostic

1. Câble et état du lien
2. Adresse IP et masque
3. Passerelle et table de routage
4. DNS lorsque des noms sont utilisés
5. Règles du pare-feu
6. Processus serveur et port cible
7. Configuration du client
8. Paquets, `tcpdump` et journaux

:::tip
Ne modifiez qu’une variable par répétition. La cause du succès ou de l’échec devient alors visible dans la séquence des paquets.
:::
