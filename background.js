// Archive This! — v1.1.1
// One click -> newest public Archive.today snapshot.

const ARCHIVE_BASE = "https://archive.is";

const TRACKING_PARAMS = new Set([
  "fbclid",
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "_hsenc",
  "_hsmi"
]);

function cleanPageUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    // Fragments are client-side only and can prevent a clean archive match.
    url.hash = "";

    // Remove only high-confidence tracking parameters. Preserve all others
    // because query parameters can be part of the page's actual identity.
    for (const key of [...url.searchParams.keys()]) {
      const normalized = key.toLowerCase();

      if (normalized.startsWith("utm_") || TRACKING_PARAMS.has(normalized)) {
        url.searchParams.delete(key);
      }
    }

    return url.toString();
  } catch {
    return null;
  }
}

function newestArchiveUrl(pageUrl) {
  return `${ARCHIVE_BASE}/newest/${pageUrl}`;
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab?.id || !tab.url) {
    return;
  }

  const cleanedUrl = cleanPageUrl(tab.url);

  if (!cleanedUrl) {
    return;
  }

  chrome.tabs.update(tab.id, {
    url: newestArchiveUrl(cleanedUrl)
  });
});
