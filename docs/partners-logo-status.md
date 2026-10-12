# Official partner-logo acquisition

## User-supplied asset update

The later asset set supplied in `public/images/partners/` adds usable artwork for
Chemonics, the Alliance Bioversity International–CIAT, BID, CAF, GIZ, IICA, SDC,
and UN Trade and Development, plus KfW. These supplied marks are used for this
site at the user's direction; this note does not claim independent legal clearance.
Raster marks were converted to WebP with transparency retained. Flat white or
checkerboard backgrounds were removed from supplied files where present; original
brand colors and both SVGs were preserved. Remaining dataset organizations without
supplied marks use their names as text.

Reviewed the shortlist in `partners-logo-links.md` on October 11, 2026.
No third-party aggregators, recoloring, logo recreation, or replacement brands were used.

| Organization | Application rendering | Official source / review outcome |
| --- | --- | --- |
| DGRV | Original SVG, `/images/partners/dgrv.svg` | Downloaded unchanged from https://www.dgrv.de/wp-content/uploads/2024/04/dgrv_logo.svg, linked by https://www.dgrv.de/en/. Reviewed https://www.dgrv.de/impressum/; no specific third-party logo restriction was found on that page. Informational identification only; this is not a blanket license. |
| COSUDE / SDC | Text | The supplied legacy logo page was unavailable; official current site https://www.deza.eda.admin.ch/en blocked acquisition (403). No substitute federal emblem used. |
| Chemonics | Text | https://www.chemonics.com/ blocked acquisition (403). No unofficial copy substituted. |
| IICA | Text | https://iica.int/es/ blocked acquisition (403). Official identity manual found, but no downloadable source logo was safely obtained. |
| KfW | Text | Header logo found, but https://www.kfw.de/Über-die-KfW/Impressum.html restricts reproduction of website graphics without prior consent. |
| GIZ | Text | https://www.giz.de/de/newsroom directs external users to a registered Corporate Design Center. No authorized kit supplied. |
| CAF | Text | Official source requests failed (502 through browsing; certificate verification failed for direct download). TLS verification was not bypassed. |
| BID / IDB | Text | https://www.iadb.org/en/terms-conditions-and-notices/terms-and-conditions expressly requires prior written consent for official marks. |
| UNCTAD | Text | https://unctad.org/brand blocked acquisition (403); https://unctad.org/terms and https://unctad.org/copyright restrict redistribution. |
| Alliance Bioversity International–CIAT | Text | Official kit linked at https://alliancebioversityciat.org/information-new-logo: https://alliancebioversityciat.org/sites/default/files/documents/ALLIANCE_LOGO.zip returned 403. No recreated mark substituted. |

To integrate an authorized logo later, place the original in `public/images/partners/`
and set its `image` in `data/partners.ts`. The shared mark component falls back to the
organization name if an image is absent or fails to load.
