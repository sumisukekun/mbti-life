# GA4 setup (v95)

Status: instrumentation is shipped, but collection is OFF until a real GA4 measurement ID is set in analytics-config.js. An empty ID does not load any Google script or send events. This is not a local-only visitor counter.

1. Open https://analytics.google.com/ and create/select the owner's GA4 property.
2. Admin > Data streams > Web. URL: https://mbti.businessmaker.net/ . Name: 83億分の1の人生.
3. Turn Enhanced Measurement OFF for this stream. Automatic outbound clicks/form/history events can otherwise bypass our payload allowlist or duplicate views.
4. Copy the public G-... measurement ID to analytics-config.js. No account password, secret or private credential is needed in the repo.
5. Publish, allow analytics on the game, and verify in GA4 Realtime. Only consenting visits are measured. DNT/GPC, ad blockers and deleted cookies affect totals; users represent estimated browser/device users, not exact people.
6. Register event-scoped custom dimensions mbti_type, screen_name, method and content_type under Admin > Custom definitions to analyze them in reports.

Events: page_view (only on actual screen transitions), start_click, select_type, game_start, game_complete (first result screen per playthrough), share_click, result_image_save (download requested, not proof of saved file). share_click means opening the sharing interface, not confirmed posting/sending. Replay and rewind within one playthrough do not produce a second completion; a new game does.

GA4 Reports > Realtime shows current traffic; Acquisition shows referral sources. Engagement > Events shows starts, completions and sharing. Compare game_start to game_complete over appropriate periods; do not treat event counts as unique users or a same-day completion ratio as a cohort conversion rate.

Privacy: consent before loading GA, no retrospective event queue, only enumerated properties. No profile inputs, names, ages, money, seeds, result payloads, arbitrary URLs or client-assigned user IDs. page_location is the root URL; referrers are origin only. GA receives network metadata and uses its own analytics cookies after permission. Advertising signals are disabled. A footer link lets visitors change their choice.

Run: node tests/analytics.test.cjs; node tests/share.test.cjs; node tests/timeline.test.cjs.
