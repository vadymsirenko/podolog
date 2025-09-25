(function () {
  // Висота фіксованого header, під який потрібно зробити offset
  const HEADER_OFFSET = 70;

  // Безпечна функція, яка переводить path -> '#id'
  function pathToHash(pathname) {
    // прибираємо початкові та кінцеві слеші
    const name = pathname.replace(/^\/|\/$/g, '');
    return name ? '#' + name : '';
  }

  // Повертає "цільовий" елемент за URL (може бути hash або path)
  function getTargetElementFromUrl(url) {
    // url може бути об'єктом URL або рядком
    const u = (typeof url === 'string') ? new URL(url, location.origin) : url;
    let hash = u.hash;
    if (!hash || hash === '#') {
      // якщо хешу немає — спробуємо з pathname
      hash = pathToHash(u.pathname);
    }
    if (!hash) return null;
    try {
      return document.querySelector(hash);
    } catch (err) {
      return null;
    }
  }

  // Плавний скрол з offset і фокусом (для доступності)
  function smoothScrollToElement(el) {
    if (!el) return;
    // робимо тимчасовий tabindex, щоб можна було фокуснути
    const prevTab = el.getAttribute('tabindex');
    if (!prevTab) el.setAttribute('tabindex', '-1');

    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - HEADER_OFFSET,
      behavior: 'smooth'
    });

    // фокус через невеликий таймаут (щоб не завадити анімації)
    setTimeout(() => {
      el.focus({ preventScroll: true });
      // відновимо tabindex, якщо він відсутній був
      if (!prevTab) el.removeAttribute('tabindex');
    }, 400);
  }

  // Обробник кліків по сторінці — перехоплюємо лінки на ту ж домену/секції
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Відкриття в новій вкладці / з модифікаторами — ігноруємо перехоплення
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Побудуємо абсолютний URL для аналізу
    let url;
    try {
      url = new URL(href, location.origin);
    } catch (err) {
      return;
    }

    // Якщо зовнішній лінк — ігноруємо
    if (url.origin !== location.origin) return;

    // Якщо це лінк на ту саму сторінку/секцію — перехоплюємо
    const targetEl = getTargetElementFromUrl(url);
    if (!targetEl) return;

    // Не даємо браузеру перезавантажувати сторінку
    e.preventDefault();

    // Оновимо URL в адресному рядку (залишимо чистий /about або / — залежно від href)
    const newPath = url.pathname + (url.hash || '');
    if (newPath !== location.pathname + location.hash) {
      history.pushState(null, '', newPath);
    }

    // Плавно скролимо
    smoothScrollToElement(targetEl);
  }, false);

  // Обробка прямого заходу на сторінку (напр. користувач відкрив /about або /#about)
  function handleDirectNavigation() {
    const targetEl = getTargetElementFromUrl(location);
    if (!targetEl) return;

    // Невелика затримка, щоб відбулась верстка — 50..100ms
    setTimeout(() => {
      smoothScrollToElement(targetEl);
    }, 50);
  }

  // Обробка кнопок назад/вперед
  window.addEventListener('popstate', function () {
    const targetEl = getTargetElementFromUrl(location);
    if (targetEl) {
      // не пушимо стан, просто скролимо
      smoothScrollToElement(targetEl);
    } else {
      // якщо немає цілі — прокрутимо на топ
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Дочекаємось DOM
  document.addEventListener('DOMContentLoaded', function () {
    // Керуємо автоматичною відновою скролу в браузері (якщо підтримується)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    handleDirectNavigation();
  });

})();
