# ADR: Pagefind and Content Security Policy

Status: accepted temporarily for Slice 1.

## Context

Pagefind 1.5.2 generates a self-hosted static index after the Astro build. Its browser search uses WebAssembly, so the current Content Security Policy permits `'wasm-unsafe-eval'` in `script-src`.

The Cloudflare `_headers` file currently applies one CSP to every static route. Route-specific CSP rules would add deployment complexity and are outside this follow-up patch, so the narrow WebAssembly permission remains global for now.

## Decision

- Keep Pagefind 1.5.2 as a build-time devDependency.
- Keep the RU and EN indexes separate and self-host every Pagefind asset.
- Keep `noWorker: true` to avoid expanding CSP with a `worker-src` exception.
- Allow `'wasm-unsafe-eval'` temporarily.
- Prohibit ordinary `'unsafe-eval'`, external script origins, and hosted search services.

Pagefind is retained because it provides static deployment, good bilingual indexing, no runtime server, and no external search provider.

## Review trigger

Revisit this decision when the deployment architecture, search implementation, CSP delivery mechanism, or index size changes. Prefer a route-scoped WebAssembly permission or a verified pure-JavaScript static alternative if it can preserve RU and EN search quality without adding operational risk.
