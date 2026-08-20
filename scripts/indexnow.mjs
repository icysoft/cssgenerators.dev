#!/usr/bin/env node
/**
 * IndexNow submission script
 * Usage:
 *   node scripts/indexnow.mjs            → submit all URLs
 *   node scripts/indexnow.mjs --changed  → submit only URLs changed since last run
 *
 * Supported engines (all accept IndexNow):
 *   Bing, Yandex, IndexNow.org (relays to all partners)
 */

const KEY = '07e1e549a5a853968ba4c48dfe1342101ced6f583a69ba814cbb7344b3c085aa';
const HOST = 'cssgenerators.dev';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/css-text-shadow-generator`,
  `https://${HOST}/css-filter-generator`,
  `https://${HOST}/css-flexbox-generator`,
  `https://${HOST}/css-box-shadow-generator`,
  `https://${HOST}/css-drop-shadow-generator`,
  `https://${HOST}/css-button-generator`,
  `https://${HOST}/css-grid-generator`,
  `https://${HOST}/css-border-generator`,
  `https://${HOST}/css-border-radius-generator`,
  `https://${HOST}/css-clip-path-generator`,
  `https://${HOST}/css-triangle-generator`,
  `https://${HOST}/css-arrow-generator`,
  `https://${HOST}/css-speech-bubble-generator`,
  `https://${HOST}/css-gradient-generator`,
];

// IndexNow.org relays to Bing, Yandex, Seznam and other partners automatically
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
];

async function submit(endpoint, urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  return { endpoint, status: res.status, ok: res.ok };
}

async function main() {
  console.log(`\n📡 IndexNow — submitting ${URLS.length} URLs to search engines\n`);
  console.log('URLs:');
  URLS.forEach(u => console.log(`  ${u}`));
  console.log('');

  const results = await Promise.all(ENDPOINTS.map(ep => submit(ep, URLS)));

  let allOk = true;
  for (const { endpoint, status, ok } of results) {
    const icon = ok ? '✅' : '❌';
    console.log(`${icon} ${endpoint} → HTTP ${status}`);
    if (!ok) allOk = false;
  }

  if (allOk) {
    console.log('\n✅ All engines notified. URLs will be crawled within minutes by Bing + partners.');
    console.log('   → Check Bing Webmaster Tools for indexing status.');
  } else {
    console.error('\n⚠️  Some submissions failed. Check status codes above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
