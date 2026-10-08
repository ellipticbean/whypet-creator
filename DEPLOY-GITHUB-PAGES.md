# Quick GitHub Pages Setup

## Before uploading

Your folder should look roughly like:

```text
whypet-creator/
├── index.html
├── style.css
├── creator.js
├── public.js
├── creator.gif
├── ball-body.png
├── boxy-body.png
├── gumdrop-body.png
├── ...all remaining WhyPet PNG files...
└── .nojekyll
```

Do not put the PNGs in a new subfolder unless you also change the paths in
`creator.js`.

## GitHub website steps

1. Go to GitHub and create a new repository.
2. Give it a name such as `whypet-creator`.
3. Upload the entire folder contents.
4. Open the repository's **Settings**.
5. Open **Pages**.
6. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
7. Save.
8. Wait for GitHub to publish the site.
9. Open the URL GitHub gives you.

## Test after publishing

Before sharing the URL publicly:

- BODY/EYES/MOUTH/etc. load correctly.
- All images display.
- Search works.
- Tooltip names work.
- Scroller works.
- Dragging/snapping works.
- `COPY PET SHARE LINK` rebuilds the same pet in a fresh tab.
- Log into Whyville separately.
- `COPY WHYVILLE BUY LINK` opens the correct official pet.
- BUY ME reaches Whyville's official purchase page.

Do one final inexpensive pet purchase only after the official page shows your
real logged-in Whyville account.
