---
locale: fr
translationKey: java-ipad-parity
slug: java-ipad-parity
title: "De la référence Java à l’iPad : combler un nouvel écart de parité"
summary: "Comment une comparaison au niveau du code source est devenue un ensemble d’améliorations orientées production pour DNS, le web, l’e-mail, le diagnostic, les rapports et l’observation réseau sur iPad."
publishedAt: 2026-08-13
kind: development
topics:
  - Compatibilité
  - Réseau
  - Qualité
  - Développement
readingMinutes: 7
featured: false
---

Un projet de compatibilité peut sembler complet bien avant de se comporter de manière complète. Les principaux écrans existent, les projets s’ouvrent et les premiers exercices fonctionnent. Les différences restantes se cachent souvent un niveau plus bas : un type d’enregistrement impossible à choisir, un parcours qui s’arrête après l’envoi ou des données de diagnostic visibles, mais impossibles à remettre.

Tel était le point de départ de la dernière passe de parité entre Java et l’iPad. Au lieu de demander seulement si Filius on iPad possédait « DNS », « Web » ou « E-mail », nous avons comparé les parcours observables de la référence Java avec l’implémentation iPad. La question plus stricte était : **une personne apprenante peut-elle réaliser la même expérience et expliquer le même résultat ?**

## Comparer le comportement, pas le nom des écrans

La version Java a servi de référence comportementale, pas de modèle de mise en page. Une interface iPad native doit suivre les interactions d’iPadOS, mais le contrat pédagogique sous-jacent doit survivre au changement de plateforme.

Pour chaque écart, quatre éléments ont été définis avant de modifier l’interface :

1. l’entrée configurable par l’élève,
2. le comportement réseau attendu,
3. les preuves qui doivent rester visibles,
4. les données qui doivent survivre à l’enregistrement et à la réouverture du projet.

Cette méthode évite les portages superficiels. Un menu DNS contenant `MX` et `NS` serait inutile si la résolution ne comprenait toujours que `A`. Un bouton de rapport ne serait pas sûr s’il copiait des mots de passe ou des messages e-mail dans un fichier partagé. Une commande de perte de paquets ne serait pas fiable si elle laissait la simulation dans un état modifié invisible.

## La table DNS est devenue un résolveur

Le serveur DNS de l’iPad gère maintenant des enregistrements typés `A`, `MX` et `NS` avec leur TTL. Il peut répondre comme serveur faisant autorité, transmettre les requêtes à un autre serveur DNS ou suivre les délégations `NS` et les adresses complémentaires fournies (« glue records ») pendant une résolution récursive. Les réponses réussies entrent dans un cache ; des limites de boucle et de sauts conservent un comportement déterministe même avec une topologie incorrecte.

Plusieurs séquences pédagogiques deviennent ainsi possibles sur iPad : déléguer un sous-domaine, suivre une recherche à travers plusieurs réseaux simulés, comparer une première recherche avec une réponse en cache et trouver un serveur de messagerie séparément de son adresse.

La principale leçon d’implémentation était que tous les appelants devaient utiliser le même résolveur typé. Améliorer l’application DNS ne suffit pas si le navigateur ou l’e-mail emploie encore un ancien raccourci. La passe finale a donc suivi la requête depuis l’action de l’utilisateur, à travers l’échange UDP simulé, jusqu’à la réponse.

## Les expériences web disposent de deux formes d’hébergement

Les serveurs web simulés ordinaires peuvent désormais définir des hôtes virtuels. Un nom d’hôte et un port facultatif sélectionnent une racine de documents, avec des états explicites d’activation et de valeur par défaut. Deux noms peuvent donc pointer vers la même adresse IP tout en servant des sites différents.

Les routeurs et passerelles disposent en plus d’un service distinct d’administration web sous `/admin`. Un réseau source autorisé et un port d’administration forment la politique d’accès. Depuis un client simulé autorisé, les élèves peuvent consulter ou modifier les routes, DHCP, NAT et les redirections de ports, ainsi que les règles du pare-feu via HTTP.

Cette administration appartient entièrement au réseau simulé. Elle n’expose ni l’iPad réel, ni le Wi-Fi de l’établissement, ni le routeur domestique. Rendre cette limite explicite faisait partie de la fonctionnalité.

## De petites actions complètent de grands parcours

Le client de messagerie savait déjà envoyer et relever les messages. La comparaison de parité a montré la suite manquante : répondre, répondre à tous et supprimer un message de la boîte de réception ou des messages envoyés.

Les actions de réponse créent maintenant un nouveau brouillon avec les destinataires pertinents et une référence au message d’origine. La suppression demande confirmation et reste limitée au dossier ouvert. Retirer une copie envoyée ne supprime donc pas silencieusement la copie correspondante de la boîte de réception.

La modification d’interface est modeste, mais son effet pédagogique est plus large. Les élèves peuvent suivre une conversation sur plusieurs messages, puis expliquer des vues locales séparées de la boîte aux lettres au lieu de réduire l’e-mail à une démonstration unique.

## Le diagnostic devient une preuve transportable

Trois changements liés facilitent l’observation et la remise d’un travail :

- **Perdre les paquets** est une commande globale momentanée. Tant qu’elle est maintenue, toutes les nouvelles trames simulées sont supprimées ; le trafic normal reprend après son relâchement.
- **Échange de paquets** peut exporter l’appareil ou l’interface sélectionnée au format TSV UTF-8 déterministe.
- **Exporter le rapport détaillé** produit un instantané texte stable de la topologie, de la configuration, des services, des règles de sécurité, des Remote Links, des preuves de perte de paquets et du trafic conservé.

Les deux exports masquent les identifiants, les codes de liaison partagés, les charges utiles et le corps des messages. Une longue simulation exige aussi une limite de mémoire : la conservation des traces est donc bornée. Lorsque d’anciens événements ont été supprimés, les exports en indiquent le nombre au lieu de présenter l’échantillon restant comme un historique complet.

Ce dernier détail vient d’une révision de la fonctionnalité comme système opérationnel, et non de l’arrêt au premier export réussi. Un outil de diagnostic doit décrire les limites de ses propres preuves.

## Les étiquettes servent maintenant l’expérience

Les étiquettes des PC et portables peuvent suivre le nom manuel, l’adresse IP, l’adresse MAC ou les deux identités réseau. Le nom manuel reste la valeur de secours si la donnée choisie n’est pas disponible.

Il devient moins nécessaire de recopier les adresses dans des annotations séparées. Les étiquettes IP aident pour les exercices de sous-réseaux ; les étiquettes MAC relient visiblement les résultats ARP et les tables d’apprentissage du switch aux appareils du canevas.

## La vérification faisait partie de chaque tranche

Le travail a été divisé en tranches verticales : état et persistance, comportement d’exécution, commandes natives, localisation et accessibilité, puis vérification ciblée. Les tests ont couvert la validation des enregistrements et le DNS récursif, la sélection des hôtes virtuels et les mutations d’administration, les réponses et suppressions e-mail, le cycle de vie de la perte de paquets, la dérivation des étiquettes, le masquage, l’ordre des exports et le chargement rétrocompatible.

Des parcours plus larges, centrés sur les services puis sur l’interface complète, ont vérifié ces éléments dans l’application réelle. Des oracles de protocole ont comparé des contrats réseau essentiels indépendamment des vues SwiftUI. Les compilations Release pour le simulateur ont enfin vérifié l’intégration dans l’application complète.

Le processus comportait aussi plusieurs revues finales. Elles ont révélé, entre autres, l’absence d’une limite de production pour l’historique des paquets et la nécessité d’une version de format explicite dans les rapports. Corriger ces points avant de publier leur description montre pourquoi la parité est un processus, pas une liste à cocher.

## Une barrière de publication reste volontairement fermée

LAN Remote Link peut relier deux simulations actives à travers un véritable réseau local. Son protocole, son chiffrement, sa découverte, sa persistance et sa reconnexion disposent d’une couverture automatisée. Il n’est pourtant pas encore présenté comme publié.

L’acceptation finale exige toujours un parcours complet sur **deux iPad physiques** dans le même réseau accessible, avec l’autorisation Réseau local d’iPadOS, la découverte automatique, la saisie manuelle de secours, une interruption et un scénario réaliste en classe. Les versions prêtes à être publiées conservent donc une configuration **Autre iPad**, mais la laissent inactive. Le mode Remote Link interne au projet reste disponible.

Cette distinction est volontaire. Les preuves automatisées fournissent une base technique solide ; elles ne remplacent pas la dernière étape d’acceptation propre au matériel.

## Le résultat

Cette passe de parité n’a pas cherché à reproduire chaque boîte de dialogue du bureau sur iPad. Elle a transféré les comportements qui donnent du sens aux expériences : DNS enrichi, hébergement web par nom, administration réseau simulée, parcours e-mail complets, panne contrôlée, preuves transportables et étiquettes liées à l’identité réseau.

La documentation a été mise à jour avec l’implémentation afin que ces fonctions deviennent des expériences utilisables plutôt que des commandes cachées. La barrière restante du LAN Remote Link est décrite aussi clairement que le travail terminé. La préparation à la production exige ces deux formes d’honnêteté.
