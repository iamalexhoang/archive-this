// Archive This!
// One click -> newest public Archive.today snapshot.

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

    // Fragments are not sent to the web server and usually only reduce
    // the chance of matching an existing archived snapshot.
    url.hash = "";

    // Remove only high-confidence tracking parameters. Preserve all other
    // query parameters because they may identify the actual article/page.
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
  return `https://archive.ph/newest/${pageUrl}`;
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
