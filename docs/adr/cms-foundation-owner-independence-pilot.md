# Slice 7A–7B: CMS Foundation and Owner Operations

Status: implemented for owner acceptance

Production baseline: `2a7a5999962ba36e81f4814808aedeb6067bab99`

Implementation branch: `v2/cms-owner-operations`

## Decision

Pages CMS remains a browser-only editing layer over repository content. Git is the source of truth. The public site remains fully static and Pages CMS does not add a database, permanent server runtime, public script, or deployment dependency.

The approved CMS surfaces are exactly:

- `src/content/knowledge` — Knowledge Base entries
- `src/data/cms/home-help.json` — fixed RU/EN Homepage section “How I can help”
- `src/data/cms/media.json` — structured bilingual Media records
- `src/data/cms/profiles.json` — fixed supported Profile platforms
- `src/data/cms/home-materials.json` — selection of one to three existing verified publications for Homepage

There are no separate confirmed podcast episode or video records. The existing YouTube channel and Spotify show remain Media records. Do not create episode-level records until their publication is verified.

## Editable boundary

Knowledge Base owner fields:

- translation key, language, URL slug
- title, excerpt, category and publication date
- SEO title and meta description
- publication status: `draft` or `published`
- Markdown article body without media upload

Knowledge technical fields remain hidden and structured:

- `featured`
- `relatedMedia`
- `relatedVideo`
- `relatedPodcast`

Media owner fields:

- restricted record type: interview, project, video channel, article channel or podcast
- publication status: `draft` or `published`
- display order
- RU/EN title and summary
- structured external links with RU/EN source labels and HTTPS URL

Media technical `id` is a hidden generated UUID. The existing project-role field is also hidden and preserved. Draft Media records are excluded from the public Media page and Pagefind.

Profile owner fields:

- URL
- display order
- active/inactive

Profile platform key and display name are readonly. The supported platform set is fixed because each platform is tied to a local icon and validation rule. Unknown platforms cannot be added through CMS. Inactive profiles are excluded from cards, footer links and JSON-LD.

Homepage owner fields:

- approved RU/EN copy in the fixed “How I can help” section
- one to three existing publication records selected from the verified catalogue

Homepage does not expose layout, components, HTML, CSS, routes, canonical, hreflang, JSON-LD, or CTA URLs.

## Protected areas

CMS does not expose:

- raw or code editors
- media uploads
- components or routes
- Consultation, forms or Formspree
- legal content
- CSP, security headers or redirects
- GitHub Actions, Cloudflare or deployment settings
- `package.json`
- confidential or unlaunched projects

The verifier rejects missing, extra or duplicate content keys; unexpected CMS paths; raw/code editors; protected paths; invalid hidden/readonly modes; unsupported Media types or Profile platforms; invalid links; incomplete RU/EN data; and draft leakage.

`settings.content.merge: true` remains enabled as defense in depth so unmanaged keys are preserved on save. Every connected data key is also represented by a structured CMS field; technical keys are hidden or readonly rather than made editable.

## Owner workflow

1. Create a separate content branch from current `main`.
2. Select that branch in Pages CMS. Never select `main`.
3. Make and save the content change.
4. Wait for the Cloudflare Preview deployment.
5. Check the RU and EN pages in Preview.
6. Open a Pull Request to `main`.
7. Wait for the required `verify` check.
8. Request owner approval.
9. Merge only after separate explicit owner permission.
10. Check production after merge.

Merge is never automated. Direct writes to `main`, force pushes, rebase and production deployment from a content branch are prohibited.

## Owner acceptance test

Do not perform this test on behalf of the owner.

1. Before this Slice is merged, select `v2/cms-owner-operations` in Pages CMS, or use a temporary test branch created from its current head. After an approved merge, use a dedicated content branch from current `main`.
2. Open “Media records”, choose an existing published record and make one harmless RU/EN summary change without changing its URLs, type or status.
3. Save, wait for CI and Cloudflare Preview, and verify the change on `/ru/media/` and `/en/media/`.
4. Revert the Media text in Pages CMS, save and confirm Preview is restored.
5. Open “Profiles” and either make a reversible URL change within the same validated platform domain or set one nonessential profile inactive.
6. Save, wait for Preview, and verify both `/ru/profiles/` and `/en/profiles/`; if inactive, also confirm the profile is absent from page source JSON-LD.
7. Revert the Profile change, save and confirm Preview is restored.
8. Open “Homepage: Featured publications”, reorder the current selection or replace one item with another existing verified publication.
9. Save and verify the same selected records appear on `/ru/` and `/en/`; do not create or imply new content.
10. Revert the Homepage selection and save.
11. In the Pull Request diff, confirm hidden/readonly values remain unchanged: Knowledge `featured` and `related*`, Media `id` and project `role`, and Profile `key` and `name`.
12. Confirm final CI passes, Preview contains no test markers, drafts remain absent from public routes, sitemap and Pagefind, and the Pull Request has no unrelated files.

Acceptance passes when all edit/save/Preview/revert cycles work, RU/EN remain consistent, technical values are preserved, protected paths are untouched, and the final branch returns to the approved content state.

## Security and recovery

- Install the Pages CMS GitHub App only for `arturfattakhov1/arturfattakhov.com`.
- Keep GitHub 2FA enabled and recovery codes stored securely.
- Do not enter patient, client, medical-record, credential, payment or other personal data into CMS.
- `main` remains protected by Pull Request, required `verify`, up-to-date branch and conversation-resolution rules, without a CMS bypass.
- Every CMS save is a Git commit and can be reviewed or reverted.
- Exit path: revoke the Pages CMS GitHub App, remove `.pages.yml`, and edit the same Markdown and JSON files through GitHub or locally.

Pages CMS service availability, privacy terms and GitHub App permissions remain external risks. The repository content and public static build remain portable.
