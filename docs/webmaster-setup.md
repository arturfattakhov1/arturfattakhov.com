# Webmaster setup

The site is prepared for indexing at `https://arturfattakhov.com`. Its sitemap index is available at `https://arturfattakhov.com/sitemap-index.xml`, and `robots.txt` permits crawling.

## Before registration

1. Deploy the current `main` branch.
2. Confirm that the canonical HTTPS hostname responds without an authentication screen.
3. Open `/robots.txt` and `/sitemap-index.xml` in a private browser window.
4. Prefer DNS verification. It verifies the whole domain and does not require a permanent token in the repository.
5. Keep every verification DNS record or file in place: webmaster services may recheck ownership.

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a **Domain property** for `arturfattakhov.com`.
3. Add the TXT value supplied by Google to the domain's DNS, then complete verification.
4. In **Sitemaps**, submit `https://arturfattakhov.com/sitemap-index.xml`.
5. Inspect `/ru/`, `/en/`, `/ru/about/`, and `/en/about/` with URL Inspection and request indexing only after the deployed pages are accessible.
6. Review Page indexing, Sitemaps, HTTPS, and Core Web Vitals after Google begins collecting data.

Official references: [ownership verification](https://support.google.com/webmasters/answer/9008080), [adding a property](https://support.google.com/webmasters/answer/34592), and [Search Console workflow](https://developers.google.com/search/docs/monitor-debug/search-console-start).

## Yandex Webmaster

1. Open [Yandex Webmaster](https://webmaster.yandex.com/) and add `https://arturfattakhov.com/` exactly with HTTPS and without `www`.
2. Verify ownership with the supplied DNS TXT record. HTML-file and homepage meta-tag methods remain valid alternatives.
3. Open **Indexing → Sitemap files** and add `https://arturfattakhov.com/sitemap-index.xml`.
4. Check the server response for the homepage, both language homepages, `robots.txt`, and the sitemap index.
5. Review indexing diagnostics and excluded-page reasons after processing begins.

Official references: [getting started](https://yandex.com/support/webmaster/en/service/quick-start), [ownership verification](https://yandex.com/support/webmaster/en/service/rights), and [sitemap files](https://yandex.com/support/webmaster/en/indexing-options/sitemap).

## Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Import the verified Google Search Console property, or add the site manually and verify it through DNS, an XML file, or a meta tag.
3. If the sitemap was not imported, submit `https://arturfattakhov.com/sitemap-index.xml` under **Sitemaps**.
4. Confirm that the sitemap is processed and review Site Scan and URL Inspection after data becomes available.

Official references: [add and verify a site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b), [getting-started checklist](https://www.bing.com/webmasters/help/getting-started-checklist-66a806de), and [sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed).

## Ongoing checks

- Submit only the sitemap index; it points services to generated sitemap files.
- Do not add verification tokens until a service supplies the exact value.
- Do not remove ownership records after verification.
- Recheck canonical URLs, hreflang pairs, structured data, and indexing status after routing or domain changes.
- Investigate exclusions before requesting repeated indexing; empty collections should remain indexable only while their landing pages provide useful context.
