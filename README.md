# Portfolio — Mohammed Chafi

Site vitrine trilingue (FR / EN / AR) pour Mohammed Chafi, Software & AI Engineer.
Next.js 14 (App Router) · TypeScript · Tailwind CSS · next-intl · Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000 → redirige vers /fr
npm run build   # build de production
npm run lint
```

---

## À remplacer avant la mise en production

| Fichier | Constante | Valeur actuelle | À faire |
|---|---|---|---|
| `lib/site.ts` | `SITE_URL` | `https://mohammedchafi.com` | **À faire.** Mettre le domaine réel. Il alimente les canonicals, `sitemap.xml`, `robots.txt` et le JSON-LD. Marqué `// TODO`. |
| `components/ProjectVisual.tsx` | — | 4 schémas SVG | Remplacer par de vraies captures d'écran quand elles seront disponibles. |
| `components/ContactForm.tsx` | — | envoi par `mailto:` | Optionnel : brancher un vrai backend (route handler + Resend/Formspree). |
| `messages/*.json` | `experience.items[].responsibilities` | 4 puces par poste | Dérivées des résumés fournis. À remplacer par le texte exact du CV Master (sections 3.1 à 3.5). |
| `messages/*.json` | `education.degrees` | 1 diplôme (EMSI) | Ajouter les diplômes antérieurs (le stage PFE de 2022 en suppose un). |

---

## Calendly

**Le compte est déjà relié.** `CALENDLY_URL` pointe sur `https://calendly.com/mohammed-chafi/30min`,
un événement actif (« 30 Minute Meeting », 30 min, fuseau Maroc, visioconférence). Ce n'était
donc pas un placeholder : le lien est fonctionnel en l'état, rien à faire pour la mise en ligne.

Pour changer de compte ou d'événement **sans toucher au code**, définir la variable
d'environnement (Vercel → Settings → Environment Variables, ou `.env.local` en local) :

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<compte>/<evenement>
```

Voir `.env.example`. Sans cette variable, le lien par défaut de `lib/site.ts` s'applique.

### Deux points à connaître

1. **L'intitulé de l'événement ne correspond pas au site.** Le site annonce « Échange découverte
   — 30 minutes » (`contact.calendly.subtitle` dans les `messages/*.json`), alors que l'événement
   Calendly s'appelle « 30 Minute Meeting ». Le renommer côté Calendly aligne les deux — c'est un
   réglage de compte, pas une modification de code.
2. **Les couleurs de l'embed sont réservées aux offres payantes.** `pageSettings` transmet bien
   `#1D4ED8` en couleur primaire, mais Calendly ignore ces paramètres sur un compte gratuit et
   sert son thème par défaut, avec le bandeau « Powered by Calendly ». Le code est déjà prêt : le
   thème s'appliquera automatiquement en cas de passage à une offre payante.

L'intégration utilise `react-calendly` en `InlineWidget` (jamais de popup), montée après
l'hydratation, dans un conteneur de 700 px de haut réservé à l'avance pour éviter tout saut de
mise en page. Un lien de repli « Ouvrir Calendly dans un nouvel onglet » est affiché sous le
widget si celui-ci ne se charge pas.

---

## Écart assumé par rapport au brief

**Une seule couleur a été modifiée.** Le brief demande `#94A3B8` pour le texte tertiaire *et* la
conformité WCAG AA. Les deux sont incompatibles : `#94A3B8` donne un contraste de **2,46:1** sur
le fond `#FAFAFA`, là où AA exige 4,5:1. Le token `ink-3` utilise donc `#64748B` (**4,56:1**),
un cran plus bas sur la même rampe slate, pour un rôle visuel identique. `#94A3B8` reste
disponible sous le nom `ink-faint`, réservé aux tracés non textuels des illustrations.

Tout le reste de la palette est conforme au brief et passe AA :
`#0F172A` 17,1:1 · `#475569` 7,3:1 · `#1D4ED8` 6,4:1 · blanc sur `#1D4ED8` 6,7:1.

---

## Parti pris de design

**L'élément signature est une règle de mesure**, placée sous le titre du hero et graduée
`Web · IA · Data · IoT · Industrie`. Le positionnement de Mohammed est littéralement une
*amplitude* — « du web au terrain industriel » — donc elle est dessinée comme un instrument
plutôt que répétée en prose. Les deux extrémités portent la revendication (graduation haute,
en bleu accent), les trois arrêts intermédiaires sont ce qui vit à l'intérieur. La règle se
trace une fois au chargement, depuis le bord de départ, et s'inverse d'elle-même en RTL.

Le même vocabulaire de graduations se retrouve dans les eyebrows de section, la barre du
wordmark, les points de la timeline et les segments de niveau de langue.

**Les visuels de projet sont des schémas, pas des mockups génériques.** Chacun abstrait ce que
le système fait réellement : la recherche instantanée et le catalogue pour ITALBOX, la courbe
capteur qui franchit son seuil d'alerte pour la maintenance prédictive, l'afficheur de poids et
son ticket pour la pesée industrielle, la matrice de conformité pour le suivi des formations.
SVG inline, palette du site uniquement, aucun poids d'image.

**Une seule bande blanche** sur toute la page : la section Services. Elle marque le basculement
du CV vers l'offre commerciale.

---

## Système de motion

Le brief impose la sobriété (« usage sobre uniquement », « jamais de mouvement décoratif »).
Le parti pris est donc **le soin, pas la quantité** : peu de mouvements, tous orchestrés,
aucun purement décoratif. Toutes les valeurs viennent de `lib/motion.ts` — une seule courbe
d'accélération (expo-out `[0.16, 1, 0.3, 1]` : départ rapide, arrivée longue, ce qui se lit
comme précis plutôt que rebondissant) et une échelle de durées partagée. **Rien n'anime une
propriété de layout** : uniquement `transform` et `opacity`, donc zéro reflow.

| Où | Ce qui se passe |
|---|---|
| Hero | Séquence unique : bandeau d'identité, puis le titre **mot à mot** (chaque mot monte derrière sa propre ligne), puis l'accroche, puis les boutons, puis la règle qui se trace et ses graduations qui se posent dans l'ordre |
| Header | Une hairline de **progression de lecture** sur le bord bas — la même idée de mesure que la règle du hero, appliquée au document. Marqueur de section active qui se trace sous le lien courant |
| Sections | Entrée unique de 14 px, en cascade pilotée par variantes (`RevealGroup` / `RevealItem`) et non par des délais calculés à l'index — le rythme reste juste quel que soit le nombre de cartes |
| Timeline | La colonne vertébrale **se trace vers le bas** et chaque point se pose dessus à son tour : le parcours se lit comme tracé, pas comme affiché |
| Visuels projets | Chaque schéma **s'assemble dans l'ordre où le système réel fonctionne** : la requête avant les résultats, le seuil avant la courbe, la courbe avant l'alerte. Ici le mouvement *est* l'explication — c'est ce qui lui donne sa place |
| Cartes | Lift de 2 px, ombre courte, et une hairline accent qui se trace sur l'arête haute au survol (même vocabulaire de graduation) |
| Boutons | Retour tactile à l'appui (`active:scale-[0.98]`) |

### Deux décisions structurantes

1. **Le hero est en CSS pur, pas en JavaScript.** Titre, accroche, boutons et règle sont animés
   par keyframes. Le contenu le plus important du site ne dépend donc d'aucun script pour
   devenir visible : une animation JS qui ne démarre pas laisserait le hero vide, ce n'est pas
   un risque à prendre au-dessus de la ligne de flottaison. `Hero`, `SplitWords` et `RangeRule`
   sont restés des composants serveur.
2. **`LazyMotion` + composants `m`.** Le jeu de fonctionnalités `domAnimation` (variantes,
   `whileInView`, gestes) est chargé au lieu du build complet de Framer Motion. Les composants
   importent `m` et non `motion` — `strict` le fait respecter. Résultat : **First Load JS passé
   de 168 kB à 144 kB** malgré l'ajout de tout le système de motion.

### Accessibilité du mouvement

`MotionConfig reducedMotion="user"` neutralise les animations de transform de Framer, et le
killswitch CSS de `globals.css` neutralise les keyframes — **délais compris** (sans quoi un
visiteur en `prefers-reduced-motion` fixerait du contenu masqué pendant toute la durée du plus
long délai avant de le voir apparaître d'un coup).

---

## Internationalisation

- Routing par préfixe : `/fr` (défaut), `/en`, `/ar` — `middleware.ts` + `lib/routing.ts`.
- `dir="rtl"` et IBM Plex Sans Arabic chargée **uniquement** sur la locale `ar` ; Inter partout ailleurs.
- Le RTL est structurel, pas seulement textuel : grilles, timeline (colonne vertébrale à droite),
  icônes directionnelles, règle du hero et graduations sont tous inversés via des propriétés logiques
  (`start`/`end`, `ms`/`me`, `ps`/`pe`).
- Les capitales espacées sont neutralisées en arabe (`.label-caps` sous `[lang='ar']`) : l'arabe ne
  se met ni en majuscules ni en interlettrage, cela casse la liaison des glyphes.
- `.tech-tag` utilise `unicode-bidi: plaintext` et les chaînes arabes contenant `.NET` portent une
  marque LRM, sinon le point initial se retrouve rejeté à la fin du mot.
- Les trois fichiers `messages/*.json` ont une structure de clés strictement identique.

### Image Open Graph

Générée par locale via `next/og` (`app/[locale]/opengraph-image.tsx`). Satori dessine bien les
glyphes arabes mais **n'applique pas l'algorithme bidi** : la carte `ar` inverse donc ses tokens
à la main et tient sur une seule ligne. Si une future version de Satori corrige le bidi, retirer
le helper `rtl()` de ce fichier. Le site lui-même n'est pas concerné — le navigateur gère le bidi.

---

## Vérifications effectuées

- `npm run build` et `npm run lint` : sans erreur ni avertissement, 3 locales prérendues.
- Un seul `h1`, 34 titres sans saut de niveau, tous les éléments interactifs nommés, landmarks
  complets, lien d'évitement en premier focus.
- Aucun débordement horizontal en 375px comme en 1440px, en LTR comme en RTL.
- Accordéon de la timeline : un seul panneau ouvert, `aria-expanded` / `aria-hidden` cohérents.
- Formulaire : validation avec `aria-invalid` et `aria-describedby` reliés aux messages d'erreur.
- `prefers-reduced-motion` respecté (animations et **délais** neutralisés, `scroll-behavior` en `auto`).
- Titre du hero : le découpage mot à mot ne casse pas le texte — `textContent` reste strictement
  identique à la source en FR comme en AR, et le façonnage arabe est intact (la coupure se fait
  sur les espaces, jamais à l'intérieur d'un mot).
- Bandeau de progression : vérifié à 0 / 25 / 50 / 75 / 100 % de défilement.

**Non vérifiable dans l'environnement de développement utilisé :** les révélations au scroll et
le rendu animé des schémas. Le navigateur intégré maintient l'onglet en `visibilityState:
hidden`, ce qui suspend `requestAnimationFrame`, l'horloge d'animation, les événements de
scroll et la livraison des `IntersectionObserver`. Les états finaux ont été validés en forçant
les animations via la Web Animations API, mais le déroulé lui-même est à contrôler dans un vrai
navigateur.
