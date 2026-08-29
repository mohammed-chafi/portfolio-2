# Captures des sites projets

`italbox.png` et `mts.png` sont en place : captures 1600 × 1000 des pages
d'accueil, prises en Chrome headless, sans chrome de navigateur (le cadre est
dessiné par le composant `BrowserFrame`).

## Régénérer

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
P=$(mktemp -d)
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="$P" --window-size=1600,1000 --virtual-time-budget=6000 \
  --screenshot="$PWD/public/images/projects/italbox.png" "https://italbox.ma"
rm -rf "$P"
```

Remplacer l'URL et le nom de fichier pour `mtssrl.ma` → `mts.png`.

`--window-size=1600,1000` correspond au 16:10 recadré par le composant. Garder
un budget court : ces sites gardent des requêtes ouvertes (widgets, analytics)
et une valeur élevée fait attendre le navigateur indéfiniment.

Les fichiers sont servis via `next/image`, donc convertis automatiquement en
AVIF/WebP et redimensionnés — inutile de les compresser à la main.
