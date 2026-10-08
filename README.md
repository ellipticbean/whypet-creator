# Unofficial WhyPet Creator Recreation

A fan-made recreation of Whyville's classic Java WhyPet Creator.

The creator rebuilds the old pet-editing behavior in modern HTML/CSS/JavaScript,
generates Whyville's original `desc=` pet data, and can hand the finished design
to Whyville's official Buy Pets page.

## What has been confirmed

The end-to-end flow has been tested successfully:

1. Build a pet in the recreation.
2. Generate the original WhyPet description.
3. Open Whyville's official Buy Pets page.
4. Whyville renders the generated pet.
5. A logged-in account can name and purchase it.
6. The purchased pet appears on the account's WhyPets page.

## Privacy / account safety

This project does **not** contain a Whyville login form.

Users should sign into Whyville normally in their own browser. The creator only
generates the pet description and sends the finished design to Whyville's
official page. Whyville handles authentication, naming, Pearls, and purchase.

Do not add code that asks users for Whyville passwords or attempts to copy
Whyville session cookies.

## Files

Core site files:

- `index.html`
- `style.css`
- `creator.js`
- `public.js`
- `.nojekyll`

You must also upload the original image assets used by your local working copy.

### Required image assets

- `ball-body.png`
- `big-eyes.png`
- `big-teeth-mouth.png`
- `bison-horns.png`
- `boxy-body.png`
- `cat-eyes.png`
- `creator.gif`
- `girly-eyes.png`
- `gumdrop-body.png`
- `left-bat-wing.png`
- `left-blue-robot-arm.png`
- `left-blue-tentacle.png`
- `left-bull-horn.png`
- `left-butterfly-wing-1.png`
- `left-butterfly-wing-2.png`
- `left-cat-ear.png`
- `left-dog-ear.png`
- `left-dove-wing.png`
- `left-dragon-wing.png`
- `left-droopy-ear.png`
- `left-floppy-ear.png`
- `left-fuzzy-hug-arm.png`
- `left-fuzzy-purple-arm.png`
- `left-fuzzy-wave-arm.png`
- `left-green-antenna.png`
- `left-green-pipe-arm.png`
- `left-green-robot-arm.png`
- `left-green-tentacle.png`
- `left-monkey-ear.png`
- `left-monkey-tail.png`
- `left-mouse-ear.png`
- `left-muscle-tentacle.png`
- `left-orange-wing.png`
- `left-pointy-ear.png`
- `left-purple-tentacle.png`
- `left-ram-horn.png`
- `left-red-pipe-arm.png`
- `left-robot-antenna.png`
- `left-robot-arm.png`
- `left-spotted-tentacle.png`
- `left-stray-dog-tail.png`
- `parrot-beak.png`
- `rhino-horn.png`
- `right-bat-wing.png`
- `right-blue-robot-arm.png`
- `right-blue-tentacle.png`
- `right-bull-horn.png`
- `right-butterfly-wing-1.png`
- `right-butterfly-wing-2.png`
- `right-cat-ear.png`
- `right-dog-ear.png`
- `right-dove-wing.png`
- `right-dragon-wing.png`
- `right-droopy-ear.png`
- `right-floppy-ear.png`
- `right-fuzzy-hug-arm.png`
- `right-fuzzy-purple-arm.png`
- `right-fuzzy-wave-arm.png`
- `right-green-antenna.png`
- `right-green-pipe-arm.png`
- `right-green-robot-arm.png`
- `right-green-tentacle.png`
- `right-monkey-ear.png`
- `right-monkey-tail.png`
- `right-mouse-ear.png`
- `right-muscle-tentacle.png`
- `right-orange-wing.png`
- `right-pointy-ear.png`
- `right-purple-tentacle.png`
- `right-ram-horn.png`
- `right-red-pipe-arm.png`
- `right-robot-antenna.png`
- `right-robot-arm.png`
- `right-spotted-tentacle.png`
- `right-stray-dog-tail.png`
- `small-mouth.png`
- `whiskers.png`

## GitHub Pages deployment

1. Create a new GitHub repository, for example `whypet-creator`.
2. Put **all files from this release plus all required PNG/GIF assets** in the
   repository root.
3. Commit/push them to the `main` branch.
4. On GitHub, open **Settings → Pages**.
5. Choose **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.
8. GitHub will provide a public URL such as:
   `https://YOUR-USERNAME.github.io/whypet-creator/`

All creator asset paths are relative, so the project works from a GitHub Pages
subdirectory.

## Public-use flow

1. Open the hosted creator.
2. Log into Whyville separately in the same browser.
3. Build a WhyPet.
4. Press `BUY ME`.
5. Finish naming/purchasing on Whyville's official page.

The public wrapper also includes:

- **COPY PET SHARE LINK** — creates a hosted `?desc=...` link that reconstructs
  the same pet for another person.
- **COPY WHYVILLE BUY LINK** — copies the official Whyville Buy Pets URL without
  immediately navigating away.

## Disclaimer

This is an unofficial fan-made preservation/recreation project and is not an
official Whyville service.

Whyville names, artwork, and original assets belong to their respective rights
holders. The public-release code does not grant a license to redistribute those
third-party assets. If you plan to distribute the artwork broadly, consider
obtaining permission from the relevant rights holder.
