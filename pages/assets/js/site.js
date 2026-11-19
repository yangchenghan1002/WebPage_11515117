/**
 * KINETIC LAB // 黑流 — 現代極簡冷色調工業風共用腳本 (site.js)
 * 專案：WebPage_11515117/pages
 * 學號：11515117
 * 功能：手機版選單切換、目前頁面標示與驗證、資訊待補點擊安全防護 (Toast 提示)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 手機版漢堡選單切換
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 點擊選單內任意連結自動收合
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // 點擊頁面其他區域自動收合選單
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // 按下 ESC 鍵自動關閉
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  // 2. Toast 提示通知元件（用於提示資訊待補狀態）
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    clearTimeout(toastTimer);
    toast.innerHTML = `<span class="toast-badge">[系統告示]</span> <span>${message}</span>`;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 3. 待補資訊點擊防護（遵守 sitemap.md 互動連結規則：確認填入後才啟用）
  const pendingActions = document.querySelectorAll('[data-status="pending"], .btn-disabled');
  pendingActions.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const infoType = el.getAttribute('data-field') || '此項目';
      showToast(`${infoType}目前為待補狀態，待官方正式公告後方啟用完整外部連結。`);
    });
  });

  // 4. 目前頁面標示主動校對（確保導覽列 active 狀態與檔案一致）
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 輸出控制台初始化訊息（營造工業實驗室數據氛圍）
  console.log('[KINETIC LAB] Core system initialized. Sub-page:', currentPath);
});

