// Archive This!
// Created by Alex Hoang – May 2025

chrome.action.onClicked.addListener((tab) => {
  const originalUrl = tab.url;
  const archiveUrl = `https://archive.is/${originalUrl}`;
  chrome.tabs.update(tab.id, { url: archiveUrl });
});
