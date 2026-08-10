---
locale: fr
translationKey: contact-form-architecture
slug: contact-form-behind-the-scenes
title: "Dans les coulisses du formulaire : un petit service sans grand détour"
summary: "Pourquoi le formulaire d’assistance utilise un service privé interne et renonce volontairement aux fichiers, à une base de données et à un CAPTCHA tiers."
publishedAt: 2026-08-10
kind: development
topics:
  - Assistance
  - Confidentialité
  - Infrastructure
readingMinutes: 4
---

Un formulaire de contact paraît simple : adresse, sujet, message, envoi. Cette petite interface implique pourtant une décision d’architecture importante. Filius on iPad n’utilise ni service de formulaire externe ni CAPTCHA tiers.

## Un chemin court et contrôlé

Le navigateur envoie le formulaire au même site. Le conteneur web transmet uniquement le chemin `/api/contact` à un service de contact séparé sur un réseau Docker privé. Ce service valide les données puis transmet le message accepté par la boîte d’assistance authentifiée.

Le service de contact ne possède aucun port public. Seul le conteneur web peut le joindre.

## Volontairement peu de données

Le formulaire ne propose aucun envoi de fichier et ne possède pas sa propre base de données. Il traite uniquement les informations nécessaires à la demande d’assistance. Un champ invisible ralentit les robots simples ; des limites de taille, le contrôle de l’origine et un identifiant temporaire de limitation complètent la protection.

L’adresse de la personne devient l’adresse de réponse. Elle n’a pas besoin d’être copiée dans les journaux du serveur ou dans un second système de stockage.

## Pourquoi un service séparé ?

Un site statique peut être distribué rapidement et de manière sûre, mais il ne doit jamais contenir d’identifiants SMTP. Le service séparé conserve ces identifiants au moment de l’exécution sur le serveur, tandis que le conteneur web public reste petit et en lecture seule.

Le résultat n’est pas une fonction spectaculaire. C’est une infrastructure volontairement discrète : l’assistance doit rester accessible sans multiplier inutilement les systèmes et les traces de données.
