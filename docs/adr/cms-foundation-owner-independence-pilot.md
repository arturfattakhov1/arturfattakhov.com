# Slice 7A: CMS Foundation & Owner Independence Pilot

Status: conditional pilot

Baseline: `3d81fe7c4d10be2a5d78f0d5948801bb3a40bb9e`

Pilot branch: `codex/slice-7a-cms-pilot`

## Decision

Pages CMS is suitable for a browser-only owner pilot, but it is not approved for direct production editing.

The pilot exposes exactly:

- `src/content/knowledge` as a structured Knowledge Base collection
- `src/data/cms/home-help.json` as the fixed homepage section “How I can help”

It does not expose routes, components, forms, Consultation, CSP, redirects, legal content, deployment settings, repository workflows, media uploads, or raw/code editors.

## Official findings

- Cost and license: the hosted service, Vercel deployment, and self-hosting are described as free; the source is MIT licensed. Source: [Pages CMS](https://pagescms.org/).
- Data model: content remains in repository files and GitHub is the source of truth. Source: [Pages CMS introduction](https://pagescms.org/docs/) and [caching](https://pagescms.org/docs/development/caching/).
- Authentication: repository writes use a GitHub user token when available, otherwise a repository-scoped GitHub App installation token may be used for invited collaborators. The pilot uses only the owner’s GitHub identity and no Pages CMS collaborators. Source: [authentication](https://pagescms.org/docs/development/authentication/).
- GitHub App permissions: the official setup currently requests Email addresses read-only; Administration, Actions, and Contents read/write; Checks and Commit statuses read-only; Metadata read-only; plus repository and workflow events. This is broader than a content-only integration. Source: [GitHub App setup](https://pagescms.org/docs/guides/installing/github-app/).
- Branch workflow: `.pages.yml` is read per repository and per branch, and Pages CMS saves commits to the branch selected in its UI. It does not provide the repository’s PR or deployment workflow. Source: [configuration overview](https://pagescms.org/docs/configuration/) and [introduction](https://pagescms.org/docs/).
- Preview: Cloudflare Pages creates and updates a preview URL for a pull request opened from a branch in the same repository. Source: [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
- Hosted-service legal risk: the public privacy policy permits collection and cross-border processing of account and usage data, and the terms provide the service “as is” without availability warranty. The published policies are dated 7 February 2024. Sources: [Privacy](https://pagescms.org/privacy/) and [Terms](https://pagescms.org/terms/).

## Security gates

Current repository review on 23 July 2026 found no public ruleset and GitHub Settings reported that classic branch protection is not configured. Therefore:

1. During the pilot, select only `codex/slice-7a-cms-pilot` in Pages CMS. Never select `main`.
2. Install the Pages CMS GitHub App only for `arturfattakhov1/arturfattakhov.com`, not all repositories.
3. Enable GitHub two-factor authentication before installing the CMS. GitHub currently warns that this account must enable 2FA before 23 August 2026.
4. Before production use, protect `main` with required pull requests and the existing `verify` status check, without a Pages CMS bypass.
5. Do not enter patient, client, medical-record, secret, credential, payment, or other personal data into the CMS.

No GitHub App installation, branch-protection change, merge, or production deployment is part of this PR.

## Editorial workflow

1. Owner signs in to `app.pagescms.org` with GitHub.
2. Owner selects repository `arturfattakhov1/arturfattakhov.com`.
3. Owner selects branch `codex/slice-7a-cms-pilot`.
4. Owner edits only the Knowledge Base or the fixed homepage section and saves.
5. Pages CMS creates a commit on the PR branch.
6. GitHub CI and the Cloudflare Preview update from the same branch.
7. Owner reviews the preview and the PR file list.
8. Merge happens only after owner acceptance and separate permission.

Knowledge entries remain invisible when `status` is `draft`. Changing a Knowledge entry to `published` creates a public route only after the PR is merged and production is deployed. The fixed homepage section has no publish flag; branch and PR review are its draft boundary.

## Owner acceptance test

1. Confirm 2FA is enabled and install Pages CMS for this repository only.
2. In Pages CMS, select `codex/slice-7a-cms-pilot`.
3. In “Homepage: How I can help”, append ` — CMS test` to the Russian and English section titles and save.
4. In one existing Knowledge Base draft, append ` — CMS test` to the title, keep `status: draft`, and save.
5. In GitHub, confirm the new commits modify only:
   - `src/data/cms/home-help.json`
   - one file under `src/content/knowledge`
6. Confirm CI passes and Cloudflare Preview shows the temporary homepage title while the draft Knowledge article remains absent.
7. Revert both temporary title changes through Pages CMS and save.
8. Confirm CI passes again, Preview is restored, and the final PR contains no test markers.

Acceptance passes when the browser-only edit/save/revert cycle works, the editable boundary holds, the Knowledge draft does not leak, CI is green, and Cloudflare Preview is correct.

## Backup and exit strategy

- Baseline recovery point: `3d81fe7c4d10be2a5d78f0d5948801bb3a40bb9e`.
- Every CMS save is a Git commit and can be reviewed or reverted through GitHub.
- The canonical content remains ordinary Markdown and JSON; no CMS database export is required for the pilot.
- No non-GitHub collaborators are used, so there is no collaborator database to migrate.
- Exit: revoke/uninstall the Pages CMS GitHub App, remove `.pages.yml`, and continue editing the same files through GitHub or a local editor.
- Optional later exit: self-host the MIT-licensed CMS or map the same files to another Git-backed CMS.

The pilot does not add a paid service, new runtime dependency, database, site script, API, or production deployment dependency.
