(function () {
  var GA_ID = 'G-E7TBHGYDYW';
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  if (!window.gtag) {
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function getMeta(name){
    var el = document.querySelector('meta[name="' + name + '"]');
    return el ? el.getAttribute('content') : '';
  }

  var body = document.body || {};
  var pageType = body.getAttribute ? body.getAttribute('data-page-type') : '';
  var contentId = body.getAttribute ? body.getAttribute('data-content-id') : '';
  var author = body.getAttribute ? body.getAttribute('data-author') : '';
  var publishDate = body.getAttribute ? body.getAttribute('data-publish-date') : '';
  var topicCluster = body.getAttribute ? body.getAttribute('data-topic-cluster') : '';

  // page_view context
  gtag('event', 'page_view', {
    page_type: pageType || 'page',
    content_id: contentId,
    author: author,
    publish_date: publishDate,
    topic_cluster: topicCluster,
    page_title: document.title,
    page_location: window.location.href
  });

  // scroll depth
  var fired = {};
  function onScroll(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop || document.body.scrollTop);
    var height = (h.scrollHeight - h.clientHeight);
    if (height <= 0) return;
    var percent = Math.round((scrolled / height) * 100);
    [25,50,75,100].forEach(function(p){
      if (percent >= p && !fired[p]) {
        fired[p] = true;
        gtag('event', 'scroll_depth', {
          percent: p,
          page_type: pageType,
          content_id: contentId
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // outbound, mailto, tel, cta
  document.addEventListener('click', function(e){
    var el = e.target;
    while (el && el.tagName !== 'A' && el !== document.body) el = el.parentElement;
    if (!el || el.tagName !== 'A') return;
    var href = el.getAttribute('href') || '';
    var text = (el.textContent || '').trim().slice(0, 120);
    var isMail = href.startsWith('mailto:');
    var isTel = href.startsWith('tel:');
    var isOutbound = href.startsWith('http') && !href.includes(window.location.hostname);
    var isCta = el.classList.contains('outline-btn') || el.getAttribute('data-cta') === 'true';

    if (isMail) {
      gtag('event', 'email_click', { link_url: href, link_text: text, content_id: contentId });
    }
    if (isTel) {
      gtag('event', 'phone_click', { link_url: href, link_text: text, content_id: contentId });
    }
    if (isOutbound) {
      gtag('event', 'outbound_click', { link_url: href, link_text: text, content_id: contentId });
    }
    if (isCta) {
      gtag('event', 'cta_click', { cta_text: text, cta_type: 'link', placement: 'inline', content_id: contentId });
    }
  });
})();
