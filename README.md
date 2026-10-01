# Archive This!

A tiny Chrome extension that opens the newest public Archive.today snapshot of the page you're viewing.

**One click. No popup. No account. No analytics.**

Archive This! is useful when a live page has changed, disappeared, or is otherwise difficult to access and a public archived copy exists.

## How it works

When you click the toolbar button, Archive This!:

1. reads the current tab URL after your click;
2. removes only common tracking parameters such as `utm_*`, `fbclid`, and `gclid`;
3. preserves query parameters that may identify the actual page;
4. removes the URL fragment;
5. opens the newest available Archive.today snapshot through `archive.is/newest/` in the same tab.

If no snapshot exists, Archive.today decides what to show next.

## Privacy

Archive This! does not collect, store, sell, or analyze your browsing data.

The extension uses Chrome's `activeTab` permission only after you click it. The page URL is then sent to Archive.today through the `archive.is` service because that is required to look up the archived copy.

See [PRIVACY.md](PRIVACY.md) for details.

## Permissions

- `activeTab` — access the current page URL only after you click Archive This!

There are no host permissions, browsing-history permission, storage permission, analytics, or background tracking.

## Install

### Chrome Web Store

[Archive This! on the Chrome Web Store](https://chromewebstore.google.com/detail/archive-this/kjikkoaceomhbldilpnmfoadoebhaicp)

### Load unpacked

1. Clone or download this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository folder.

## Version 1.1.1

- Uses the newest-snapshot route instead of a generic Archive.today lookup.
- Uses the `archive.is` mirror, which proved reachable in testing.
- Removes common tracking parameters while preserving meaningful URL parameters.
- Ignores unsupported non-HTTP(S) pages.
- Reduces permissions to `activeTab` only.
- Corrects extension icon sizes.
- Cleans repository metadata and documentation.

## License

MIT License. See [LICENSE](LICENSE).

© 2025–2026 Alex Hoang
