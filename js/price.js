    // Proste filtrowanie w czasie rzeczywistym
    const input = document.getElementById('q');
    const tables = Array.from(document.querySelectorAll('tbody'));

    const filter = () => {
      const q = input.value.trim().toLowerCase();
      tables.forEach(tb => {
        let any = false;
        tb.querySelectorAll('tr').forEach(tr => {
          const text = tr.innerText.toLowerCase();
          const match = !q || text.includes(q);
          tr.style.display = match ? '' : 'none';
          any = any || match;
        });
        // pokaż nagłówek sekcji tylko jeśli są wyniki w tabeli
        const h = tb.parentElement.previousElementSibling; // h2 element
        if (h && h.tagName === 'H2') {
          const visible = Array.from(tb.querySelectorAll('tr')).some(r => r.style.display !== 'none');
          h.style.display = visible ? '' : 'none';
        }
      });
    };

    input.addEventListener('input', filter);

    // Drukowanie
    document.getElementById('printBtn').addEventListener('click', () => window.print());