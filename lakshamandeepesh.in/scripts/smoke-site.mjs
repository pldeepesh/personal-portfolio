#!/usr/bin/env node

const baseUrl = new URL(process.argv[2] ?? 'https://lakshmanadeepesh.in');
const canonicalOrigin = (process.argv[3] ?? 'https://lakshmanadeepesh.in').replace(/\/$/, '');
const failures = [];

const unfinishedTools = [
  'ab-test-readiness-checker',
  'dashboard-kpi-planner',
  'cac-roas-calculator',
  'lead-scoring-template-generator',
  'ai-use-case-prioritization-matrix'
];

function fail(label, detail) {
  failures.push(`${label}: ${detail}`);
}

async function request(pathname, expectedStatus = 200) {
  const url = new URL(pathname, baseUrl);
  let response;

  try {
    response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
      headers: { 'user-agent': 'portfolio-release-smoke-check/1.0' }
    });
  } catch (error) {
    fail(pathname, error instanceof Error ? error.message : String(error));
    return { body: '', response: null };
  }

  const body = await response.text();
  if (response.status !== expectedStatus) {
    fail(pathname, `expected ${expectedStatus}, received ${response.status}`);
  }

  return { body, response };
}

function expectIncludes(label, value, expected) {
  if (!value.includes(expected)) {
    fail(label, `missing ${JSON.stringify(expected)}`);
  }
}

function expectExcludes(label, value, unexpected) {
  if (value.includes(unexpected)) {
    fail(label, `unexpectedly contains ${JSON.stringify(unexpected)}`);
  }
}

const home = await request('/');
expectIncludes('homepage canonical', home.body, `rel="canonical" href="${canonicalOrigin}/"`);
expectExcludes('homepage hostname', home.body, 'https://www.lakshmanadeepesh.in');

const blog = await request('/blog/');
expectIncludes('blog canonical', blog.body, `rel="canonical" href="${canonicalOrigin}/blog/"`);

const liveTool = await request('/tools/funnel-drop-diagnostic/');
expectIncludes('live tool canonical', liveTool.body, `${canonicalOrigin}/tools/funnel-drop-diagnostic/`);
expectIncludes('live tool indexability', liveTool.body, 'content="index, follow"');

const unfinishedTool = await request(`/tools/${unfinishedTools[0]}/`);
expectIncludes('unfinished tool indexability', unfinishedTool.body, 'content="noindex, follow"');

const missing = await request('/release-smoke-check-missing-page/', 404);
expectIncludes('404 indexability', missing.body, 'noindex');
expectExcludes('404 canonical', missing.body, 'rel="canonical"');

const sitemap = await request('/sitemap.xml');
expectIncludes('sitemap canonical host', sitemap.body, `<loc>${canonicalOrigin}/`);
expectIncludes('sitemap live tool', sitemap.body, `${canonicalOrigin}/tools/funnel-drop-diagnostic/`);
for (const slug of unfinishedTools) {
  expectExcludes('sitemap unfinished tools', sitemap.body, `/tools/${slug}/`);
}
expectExcludes('sitemap hostname', sitemap.body, 'https://www.lakshmanadeepesh.in');

const feed = await request('/feed.xml');
expectIncludes('feed self link', feed.body, `href="${canonicalOrigin}/feed.xml" rel="self"`);
expectExcludes('feed hostname', feed.body, 'https://www.lakshmanadeepesh.in');

const robots = await request('/robots.txt');
expectIncludes('robots sitemap', robots.body, `Sitemap: ${canonicalOrigin}/sitemap.xml`);

if (failures.length > 0) {
  console.error(`Smoke check failed for ${baseUrl.href}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Smoke check passed for ${baseUrl.href}`);
