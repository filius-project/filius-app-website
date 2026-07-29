---
title: Fonctions réseau
description: Ethernet, ARP, IPv4, ICMP, TCP, UDP, routage, DHCP, DNS, pare-feu et NAT dans le modèle pédagogique.
sidebar:
  order: 6
---

Filius on iPad modélise de façon déterministe les mécanismes réseau essentiels. L’objectif n’est pas seulement un résultat réussi, mais une explication vérifiable des couches impliquées.

## Ethernet et commutation

Les câbles relient les ports physiques. Un switch apprend par quel port chaque participant est joignable et transmet les trames Ethernet dans le LAN. Une diffusion atteint plusieurs participants ; l’unicast devient plus ciblé après apprentissage.

**À observer :** Reliez plusieurs terminaux à un switch, lancez des pings successifs et comparez les paquets et l’état appris.

## ARP

ARP associe une adresse IPv4 locale à une adresse matérielle. Un échange ARP peut donc précéder le premier paquet IPv4 envoyé à une cible locale ou à la passerelle.

- Cible dans le même sous-réseau : ARP recherche la cible.
- Cible dans un autre sous-réseau : ARP recherche la passerelle.
- Masque incorrect : l’émetteur peut chercher la cible localement à tort ou l’envoyer inutilement à une passerelle.

CMD propose `arp` et `arpsend` pour le diagnostic et les expériences contrôlées.

## IPv4 et ICMP

IPv4 transporte les paquets entre interfaces et réseaux. Le masque et les routes déterminent l’étape suivante. ICMP sert notamment à `ping` et aux messages de diagnostic.

Un ping réussi confirme l’accessibilité IP de base, pas DNS, un port TCP, une application ou des identifiants.

## Routage et RIP

Les routes statiques définissent réseau cible, masque et prochain saut. Les routeurs exigent des interfaces et la transmission adaptées. RIP peut échanger les routes entre routeurs compatibles ; contrôlez la table obtenue au lieu de supposer la convergence.

**Ordre de dépannage :** adresse d’interface → réseaux directement connectés → route par défaut → route spécifique → prochain saut.

## UDP et TCP

- **UDP :** Datagrammes sans connexion, notamment DNS et DHCP. Peu d’étapes, mais aucune phase de connexion TCP.
- **TCP :** Transport avec connexion pour le web, l’e-mail, Gnutella et éventuellement le client simple. Établissement, données et fermeture sont observables séparément.

Les ports identifient le service sur un hôte joignable. Une IP correcte ne suffit pas si aucun service n’écoute ou si le pare-feu bloque le port.

## DHCP

DHCP automatise adresse, masque, passerelle et DNS via les ports UDP simulés `67` et `68`. Le client affiche son bail ; le serveur gère la plage et les attributions fixes facultatives.

## DNS

DNS associe les noms aux adresses IPv4 sur le port UDP `53`. Utilisez `host` ou `nslookup` pour tester la résolution indépendamment d’une application web ou e-mail.

## Pare-feu

Le pare-feu personnel filtre le trafic TCP, UDP et ICMP entrant par terminal. Définissez des règles précises pour le service requis, puis répétez exactement le même essai client.

## Passerelle, NAT et redirection de ports

La passerelle sépare LAN et WAN. NAT peut associer les émetteurs internes à une adresse externe ; la vue d’exécution montre les correspondances. La redirection publie un service interne sélectionné vers le côté extérieur.

## Observer plutôt que traiter le réseau comme une boîte noire

Utilisez ensemble :

- CMD (`ipconfig`, `arp`, `route`, `netstat`, `tcpdump`),
- interfaces et tables de routage,
- état des services et journaux applicatifs,
- inspection des paquets par couche,
- états NAT, DHCP et DNS.

:::note
Le simulateur est un modèle pédagogique, pas un outil d’audit de sécurité, de dimensionnement ou de certification d’un réseau de production.
:::
