/* Consent-first GA4 measurement. No profile values or shared-result payloads. */
(function (w, d) {
  'use strict';
  const id = (w.LIFE_ANALYTICS_CONFIG || {}).measurementId || '';
  const configured = /^G-[A-Z0-9]{6,20}$/.test(id);
  const key = 'life83.analyticsConsent.v1';
  const views = new Set(['home','types93','country93','quiz','card','setup','friend','life','finale','end']);
  const events = new Set(['start_click','select_type','game_start','game_complete','share_click','result_image_save']);
  let consent = '', loaded = false, currentView = '', banner;
  try { consent = w.localStorage.getItem(key) || ''; } catch (_) {}
  function referrer() { try { return new URL(d.referrer).origin + '/'; } catch (_) { return ''; } }
  const base = {page_location: w.location.origin + '/', page_referrer: referrer(), page_title: '83億分の1の人生'};
  function ready() { return configured && consent === 'granted' && w.navigator.doNotTrack !== '1' && !w.navigator.globalPrivacyControl; }
  function tag() { w.dataLayer.push(arguments); }
  function load() {
    if (!ready() || loaded) return;
    loaded = true; w['ga-disable-' + id] = false; w.dataLayer = w.dataLayer || [];
    tag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    tag('js',new Date());
    tag('config',id,{...base,send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
    const script = d.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    script.referrerPolicy = 'origin'; d.head.appendChild(script);
  }
  function send(name, values) { if (!ready()) return; load(); tag('event',name,{...base,...values}); }
  function view(name) {
    if (!views.has(name) || currentView === name) return;
    currentView = name;
    send('page_view',{page_title:'83億分の1の人生 / '+name,screen_name:name});
  }
  function event(name, values = {}) {
    if (!events.has(name)) return;
    const safe = {};
    if (/^[IE][NS][TF][JP]$/.test(values.mbti_type || '')) safe.mbti_type = values.mbti_type;
    if (['x','line','native'].includes(values.method)) safe.method = values.method;
    if (['invite','result'].includes(values.content_type)) safe.content_type = values.content_type;
    send(name,safe);
  }
  function choose(value) {
    consent = value; w['ga-disable-' + id] = value !== 'granted'; try { w.localStorage.setItem(key,value); } catch (_) {}
    if (banner) banner.remove(); banner = null;
    if (loaded) tag('consent','update',{analytics_storage:value === 'granted' ? 'granted':'denied'});
    if (ready()) { load(); if (currentView) send('page_view',{page_title:'83億分の1の人生 / '+currentView,screen_name:currentView}); }
  }
  function settings() {
    if (!configured || banner || w.navigator.doNotTrack === '1' || w.navigator.globalPrivacyControl) return;
    const ja = d.documentElement.lang === 'ja';
    banner = d.createElement('section'); banner.setAttribute('role','region'); banner.setAttribute('aria-label',ja?'アクセス解析の設定':'Analytics preferences');
    banner.style.cssText = 'position:fixed;inset:auto 12px 12px;z-index:9999;max-width:650px;margin:auto;padding:16px;background:#121b3b;color:#f4f5ff;border:1px solid #64dfff;border-radius:16px;box-shadow:0 6px 30px #0008;font:14px/1.7 system-ui';
    const p = d.createElement('p'); p.style.margin = '0 0 10px';
    p.textContent = ja?'ゲーム改善のため、Google Analyticsで利用状況を計測してもよいですか？年収・家族情報などの入力内容や、結果リンクの中身は送信しません。':'Allow Google Analytics to measure usage to improve the game? Your profile inputs and shared-result payloads are not sent.';
    banner.appendChild(p);
    for (const [value,label] of [['granted',ja?'許可する':'Allow'],['denied',ja?'許可しない':'Decline']]) {
      const b = d.createElement('button'); b.type = 'button'; b.textContent = label;
      b.style.cssText = 'padding:9px 16px;margin:0 10px 4px 0;border-radius:9px;border:1px solid #64dfff;background:#121b3b;color:#f4f5ff;cursor:pointer;font:inherit';
      b.addEventListener('click',()=>choose(value)); banner.appendChild(b);
    }
    const a = d.createElement('a'); a.href = '/privacy.html'; a.textContent = ja?'詳細':'Details'; a.style.color = '#64dfff'; banner.appendChild(a);
    d.body.appendChild(banner);
  }
  w.LifeAnalytics = {view,event,settings,configured};
  d.addEventListener('click',function (e) {
    const a = e.target.closest('[data-share95],[data-analytics-settings]'); if (!a) return;
    if (a.hasAttribute('data-analytics-settings')) { e.preventDefault(); settings(); return; }
    event('share_click',{method:a.dataset.share95,content_type:a.dataset.content95});
  });
  if (configured && !consent) settings();
})(window, document);
