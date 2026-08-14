---
locale: fr
translationKey: custom-java-applications-ipad
slug: custom-java-applications-ipad
title: "Applications personnalisées sur iPad : pourquoi nous n’exécutons pas simplement le code Java"
summary: "L’assistant logiciel de la version bureau modifie et compile du Java. Sur iPad, nous avons choisi un constructeur de protocoles natif et limité, maintenu au stade expérimental tant que les besoins pédagogiques ne sont pas établis."
publishedAt: 2026-08-14
kind: development
topics:
  - Compatibilité
  - Applications personnalisées
  - Enseignement
  - Développement
readingMinutes: 7
featured: true
---

L’une des différences restantes les plus visibles entre FILIUS sur ordinateur et Filius on iPad est aussi l’une des plus faciles à sous-estimer. L’application de bureau propose un assistant logiciel permettant de créer des applications clientes et serveuses personnalisées. Sur iPad, ce parcours ne dispose pas encore d’un équivalent totalement compatible.

Il ne s’agit pas simplement d’un écran d’édition oublié. La fonction Java dépend d’un environnement d’exécution complet, tandis que notre solution actuelle sur iPad ne couvre volontairement qu’une partie limitée du même domaine d’apprentissage. Nous souhaitons expliquer cette limite ouvertement : ce que fait la version de bureau, pourquoi nous ne l’avons pas copiée directement, ce qui existe déjà sur iPad et quelles preuves nous sont nécessaires avant d’aller plus loin.

## Ce que fait réellement l’assistant de bureau

Le parcours sur ordinateur ne se contente pas d’enregistrer quelques paramètres de protocole. Il génère des fichiers source Java à partir de modèles client ou serveur, ouvre ces fichiers pour permettre leur modification, appelle un compilateur Java, puis enregistre l’application compilée afin qu’elle puisse être installée sur un ordinateur simulé.

Ces modèles sont liés aux classes d’application propres à FILIUS, aux sockets simulés, aux tâches d’arrière-plan et aux fenêtres Swing. L’élève peut modifier le traitement des messages, ajouter de la logique et adapter l’interface. Le résultat est un programme Java exécutable dans le même environnement de bureau que FILIUS.

Ce dernier point est essentiel. Un simple éditeur de code reproduirait l’apparence de la fonction, mais pas son résultat. Pour assurer une compatibilité complète, le programme modifié devrait être compilé, chargé, relié au simulateur, capable d’afficher son interface et de s’arrêter proprement, avec un comportement clairement défini lorsque les projets passent d’un système à un autre.

## Pourquoi il ne s’agit pas d’un portage direct

Filius on iPad est une application native écrite en Swift et SwiftUI. Elle n’intègre ni compilateur Java, ni machine virtuelle Java, ni couche de compatibilité Swing, ni mécanisme permettant de charger dynamiquement de nouvelles classes Java compilées.

Ajouter ces éléments pour cette seule fonction reviendrait à construire une seconde plateforme applicative à l’intérieur de l’application iPad. Il faudrait ensuite maintenir la compatibilité avec les API internes de l’assistant Java, son modèle de tâches, ses hypothèses d’interface, son stockage, son cycle de vie, ses erreurs et son intégration au simulateur. Même le code produit par les modèles standards dépend de classes de la version bureau de FILIUS ; il ne peut pas être transmis tel quel à l’environnement natif de l’iPad.

L’exécution de code modifié par les utilisateurs élargirait aussi fortement le périmètre des pannes et de confiance. Un outil pédagogique a besoin de fichiers de projet prévisibles, d’un usage limité des ressources, d’un nettoyage explicite et d’un réseau simulé déterministe. Un environnement général d’exécution de code rend chacun de ces objectifs plus difficile à expliquer, tester et prendre en charge.

Nous avons donc décidé de ne pas rechercher l’exécution arbitraire de Java, de la JVM ou de Swing comme voie vers la parité.

## Nous privilégions l’objectif pédagogique plutôt que le mécanisme

Notre question sur la parité n’est pas : « Pouvons-nous reproduire chaque boîte de dialogue du bureau ? » Elle est : « Un élève peut-il réaliser l’expérience, observer le comportement du réseau et expliquer le résultat ? »

Cette réflexion a conduit à un constructeur natif et déclaratif d’applications de protocole. Au lieu d’écrire du code source, l’utilisateur définit un client ou un serveur, choisit TCP ou UDP et un port, puis fournit des messages clients limités ou des règles ordonnées de requête et de réponse. L’application passe uniquement par le moteur de réseau simulé. Elle ne peut ni se connecter au véritable réseau de l’iPad, ni charger un script, ni introduire une nouvelle fenêtre native.

Ce modèle plus petit nous apporte des propriétés utiles :

- le comportement est déterministe et peut être validé avant l’exécution ;
- le trafic apparaît dans les mêmes traces de paquets simulés que celui des applications intégrées ;
- les définitions personnalisées peuvent être installées sur les PC et portables virtuels ;
- l’arrêt, la désinstallation, la réinitialisation et la suppression d’un appareil peuvent nettoyer les sockets de façon prévisible ;
- l’enregistrement natif et la récupération conservent les définitions sans inventer de classes Java.

Il s’agit d’une fonctionnalité réelle, mais d’une **substitution**, pas d’une implémentation compatible de l’assistant logiciel Java.

## Pourquoi le constructeur iPad reste expérimental

Le constructeur actuel peut modéliser des échanges de messages texte exacts. Il ne peut pas exprimer des calculs arbitraires, des boucles, des automates, des interfaces Java personnalisées ou l’usage général de bibliothèques. Il n’importe et n’exécute pas non plus un projet de code source Java existant.

Son format de projet est propre à Filius on iPad. Lors d’un export vers le format Java `.fls`, les définitions de protocole natives sont omises avec un avertissement de compatibilité au lieu d’être présentées comme des applications Java. Inversement, conserver un contenu de bureau inconnu lors de l’ouverture et du réenregistrement d’un projet ne rend pas ce contenu exécutable sur iPad.

Une question de produit reste également insuffisamment résolue : **Quels cours réels exigent que les élèves construisent une application personnalisée, et quel est le plus petit outil permettant de répondre clairement à ce besoin ?**

Sans activités représentatives, ajouter davantage de commandes relèverait de la supposition. Le parcours actuel fondé sur des messages exacts est utile pour l’évaluation technique, mais pas encore assez intuitif pour tous les élèves. Il reste donc désactivé par défaut derrière **Réglages → Fonctions expérimentales → Activer les applications de protocole**.

## Comment nous pourrions avancer

La prochaine étape ne devrait pas être « ajouter plus de fonctions de programmation ». Elle devrait être une courte phase d’exploration guidée par les besoins pédagogiques.

Avant de repenser le constructeur, nous souhaitons disposer d’activités représentatives fournies par des enseignants ou des responsables de programme. Chaque activité devrait préciser l’objectif d’apprentissage, le comportement de protocole minimal, le déroulement attendu en classe et la manière dont le résultat doit être partagé ou évalué.

Si ce besoin est confirmé, un **Laboratoire de protocoles** guidé constitue la piste la plus prometteuse. Nous étudierions :

1. un petit ensemble de modèles client/serveur faciles à enseigner ;
2. une chronologie visuelle des requêtes et réponses plutôt qu’un formulaire rempli de détails d’implémentation ;
3. un aperçu en direct des paquets qu’une action produirait ;
4. des messages de validation formulés en termes de réseau plutôt qu’en vocabulaire de compilateur ;
5. un format documenté et limité pour partager des définitions de protocole natives ;
6. la traduction d’un ensemble restreint de modèles courants produits par l’assistant de bureau.

Le dernier point doit rester volontairement étroit. Reconnaître et traduire des modèles standards peut être envisageable. Promettre de comprendre ou d’exécuter n’importe quel code source Java ne serait pas honnête.

Tout parcours repensé devrait rester expérimental jusqu’à ce que des enseignants puissent réaliser des activités représentatives sans connaître le code du projet, et jusqu’à ce que l’enregistrement, la récupération, l’export, l’accessibilité et le nettoyage à l’exécution aient été testés comme un parcours pédagogique complet.

## Ce qu’il faut prévoir aujourd’hui

Les cours qui dépendent de la modification et de la compilation d’applications Java personnalisées doivent continuer à utiliser FILIUS sur ordinateur. Sur iPad, utilisez les applications simulées intégrées pour les activités normales et considérez le constructeur de protocoles uniquement comme une fonction d’évaluation.

Si un projet `.fls` existant fait référence à une application personnalisée disponible seulement sur ordinateur, testez l’ensemble de l’activité avant le cours. L’ouverture réussie d’un projet démontre la compatibilité du fichier ; elle ne garantit pas que toutes les applications référencées peuvent s’exécuter.

Cet écart est réel, tout comme sa raison. Nous préférons décrire correctement une substitution volontairement limitée plutôt que présenter un environnement incomplet comme une parité totale. L’avenir de cette fonction doit être déterminé par les expériences dont les élèves ont besoin, et non par le simple fait que l’implémentation de bureau utilise Java.
