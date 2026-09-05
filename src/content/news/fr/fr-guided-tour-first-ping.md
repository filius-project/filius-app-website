---
locale: fr
translationKey: guided-tour-first-ping
slug: guided-tour-first-ping
title: "Le premier ping, clairement guidé étape par étape"
summary: "La nouvelle visite interactive enseigne Filius on iPad dans la véritable interface : deux ordinateurs, un switch, deux câbles, des adresses claires et un ping réussi."
publishedAt: 2026-09-05
kind: development
topics:
  - Premiers pas
  - Enseignement
  - Visite guidée
  - Accessibilité
readingMinutes: 5
featured: true
---

Une zone de travail réseau vide peut être étonnamment intimidante. Une personne qui connaît déjà FILIUS sait par où commencer. Un élève qui ouvre un simulateur de réseau pour la première fois doit, lui, comprendre simultanément les outils, l’ordre des actions et le résultat attendu.

La nouvelle visite interactive de Filius on iPad élimine cette incertitude sans remplacer l’app par un diaporama. Les élèves travaillent dans le véritable éditeur, utilisent les vraies commandes et terminent avec un petit réseau capable de répondre à un ping simulé.

## Un premier réseau complet

L’exercice mène maintenant à un résultat cohérent :

1. placer un ordinateur émetteur ;
2. placer un ordinateur récepteur ;
3. placer un switch réseau ;
4. relier les deux ordinateurs au switch ;
5. attribuer des noms clairs et des adresses IP ;
6. démarrer la simulation ;
7. ouvrir l’invite de commandes et envoyer un ping vers l’autre ordinateur ;
8. observer l’échange de paquets.

Ce choix est important, car un ordinateur et un switch ne constituent pas encore une expérience réseau. Deux terminaux rendent visibles le rôle des câbles, des adresses, de l’invite de commandes et de la trace des paquets. L’élève voit la requête quitter un ordinateur et reçoit une réponse concrète de l’autre.

## L’interface indique précisément quoi utiliser

Chaque action est associée à un repère orange et noir très contrasté. Une petite main animée pointe vers la cible actuelle pendant que le reste de l’application est assombri. La carte d’instructions emploie des phrases courtes, par exemple « Touche le bouton PC entouré » ou « Touche une fois l’intérieur de la zone de gauche ».

Le repère n’est pas seulement décoratif. Pendant une action obligatoire, seul le contrôle ou la zone de placement mis en évidence accepte un toucher. Choisir le mauvais appareil, ouvrir un autre menu, déplacer la zone de travail ou placer du matériel ailleurs ne peut pas détourner discrètement l’élève du parcours. Dès que l’action demandée est terminée, le guide passe à la cible suivante.

La carte se déplace également pour ne pas masquer la zone à utiliser. Les repères suivent leurs commandes en plein écran, en orientation portrait ou paysage et dans les fenêtres iPad compactes. Le réglage Réduire les animations supprime les mouvements non indispensables tout en conservant le guidage visuel.

## De vraies actions dans un espace d’exercice sûr

La visite fonctionne dans un espace temporaire. Elle ne modifie pas le projet actuel et ne déclenche pas l’enregistrement automatique normal. Quitter la visite rétablit le contexte précédent ; la terminer enregistre le résultat de l’initiation puis ramène l’élève dans l’application avec les bases du parcours en main.

L’utilisation de la véritable interface est un choix important. Une vidéo peut montrer un câble. La visite interactive permet à l’élève de sélectionner lui-même l’outil câble, choisir les terminaux, configurer les adresses, démarrer la simulation, saisir une commande et observer le résultat. Ce sont ces actions qu’il doit pouvoir reprendre dans son premier exercice autonome.

## Conçue pour les débutants, testée comme un parcours complet

L’implémentation est vérifiée à plusieurs niveaux. Des tests de géométrie contrôlent l’alignement des repères lorsqu’une fenêtre iPad n’est pas placée à l’origine de l’écran. Des tests d’interface couvrent l’éditeur normal et une fenêtre compacte, y compris la présence visible du repère et le blocage des commandes non concernées. Un parcours automatisé complet suit le même chemin qu’un élève : de la zone vide à la configuration des deux ordinateurs, puis au ping et à l’échange de paquets.

La visite interactive fait actuellement partie de la version en préparation. Sa disponibilité finale dépend encore de la publication publique de Filius on iPad, mais le parcours d’apprentissage est désormais implémenté et préparé avec le reste de la première version.
