# Project imagery

Use `/images/projects/<project-slug>/cover.webp` for covers
and `/images/projects/<project-slug>/gallery-01.webp`,
`gallery-02.webp`, etc. for galleries. Set the corresponding
`image` and `gallery` paths in `data/omicron-projects.json`
when the actual assets are supplied. Do not add nonexistent
gallery paths. Blank covers use the existing project
placeholder through the shared ContentImage component;
failed cover loads use that same fallback. Image frames keep
their existing responsive aspect ratios.

Covers are provisional Pexels stock photos (sources and licence in
`docs/image-sources.md`); replace each `cover.webp` with real project
photography when available. No galleries have been supplied yet.
