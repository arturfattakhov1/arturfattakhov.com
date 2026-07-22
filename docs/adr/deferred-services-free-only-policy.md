# ADR: Deferred services and free-only policy

Status: accepted for deferred-system evaluation.

Policy review date: 2026-07-22. Provider plans and limits can change; recheck official terms immediately before any connection.

## Decision

- A new external service may be selected only when it has a permanent Free plan or a confirmed free period of at least 12 months.
- A trial lasting weeks or a few months is not acceptable.
- Activation must not require a payment card or enable an automatic transition to paid billing.
- Document quotas, privacy and security impact, operational ownership, data export, and an exit strategy before approval.
- Do not connect any candidate within Slice 6.

## Candidates for future analysis

- Formspree Free - current forms; retain as the only form backend unless a later decision replaces it.
- Cloudflare Turnstile Free - only with secure server-side verification.
- Cal.com Individual Free - only after approval of a scheduling stage.
- Cloudflare Web Analytics Free - only after a separate privacy and CSP decision.
- Decap CMS open source - only after authentication and owner workflow are resolved.
- Git-native editing through GitHub - current fallback.

These labels are evaluation candidates, not guarantees of future pricing, availability, suitability, or approval.

## Deferred without provider selection

- Newsletter and double opt-in.
- Payments.
- Secure medical uploads.
- Analytics.
- CMS.
- Scheduling.
- Independent `.ru` domain.
