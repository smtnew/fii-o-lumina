/* ============================================
   Progress Bar - Fetch from Supabase
   ============================================ */

(function () {
  'use strict';

  function formatNumber(num) {
    return num.toLocaleString('ro-RO');
  }

  function updateProgressUI(raised, target) {
    var percent = Math.min((raised / target) * 100, 100);

    var amountEl = document.getElementById('amountRaised');
    var fillEl = document.getElementById('progressFill');
    var targetLabelEl = document.getElementById('targetLabel');

    if (amountEl) amountEl.textContent = formatNumber(raised);
    if (targetLabelEl) targetLabelEl.textContent = formatNumber(target);
    if (fillEl) {
      setTimeout(function () {
        fillEl.style.width = percent + '%';
      }, 300);
    }
  }

  function fetchProgress(cfg) {
    var url = cfg.supabaseUrl + '/rest/v1/campaign_progress?select=*&limit=1';

    fetch(url, {
      headers: {
        'apikey': cfg.supabasePublishableKey,
        'Authorization': 'Bearer ' + cfg.supabasePublishableKey,
      },
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.length > 0) {
          var campaign = data[0];
          updateProgressUI(campaign.amount_raised, campaign.target_amount);
          window.__campaignId = campaign.id;
        }
      })
      .catch(function (err) {
        console.warn('Could not fetch campaign progress:', err);
        updateProgressUI(0, 10000);
      });
  }

  function updatePlaseUI(count) {
    var target = 100;
    var percent = Math.min((count / target) * 100, 100);

    var countEl = document.getElementById('plaseDonate');
    var fillEl = document.getElementById('plaseFill');

    if (countEl) countEl.textContent = count;
    if (fillEl) {
      setTimeout(function () {
        fillEl.style.width = percent + '%';
      }, 300);
    }
  }

  function fetchPlaseCount(cfg) {
    var url = cfg.supabaseUrl + '/rest/v1/rpc/get_plase_count';

    fetch(url, {
      method: 'POST',
      headers: {
        'apikey': cfg.supabasePublishableKey,
        'Authorization': 'Bearer ' + cfg.supabasePublishableKey,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })
      .then(function (res) { return res.json(); })
      .then(function (count) {
        updatePlaseUI(typeof count === 'number' ? count : 0);
      })
      .catch(function (err) {
        console.warn('Could not fetch plase count:', err);
        updatePlaseUI(0);
      });
  }

  // Load config then fetch progress from Supabase
  fetch('config.json')
    .then(function (res) { return res.json(); })
    .then(function (cfg) {
      window.__cfg = cfg;
      if (cfg.supabaseUrl.indexOf('YOUR_PROJECT') === -1) {
        fetchProgress(cfg);
        fetchPlaseCount(cfg);
      } else {
        // Demo mode - Supabase not configured yet
        updateProgressUI(6320, 10000);
        updatePlaseUI(42);
      }
    })
    .catch(function () {
      // Config not loaded - show demo values
      updateProgressUI(6320, 10000);
      updatePlaseUI(42);
    });
})();
