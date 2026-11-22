/**
 * Global Interactive Ripple Effect
 * Menambahkan gelombang ripple halus pada semua tombol (button & pill) saat diklik.
 */
export function initRipple() {
  if (typeof window === 'undefined') return;

  window.addEventListener('pointerdown', (e) => {
    // Cari elemen tombol terdekat
    const button = e.target.closest('button, [role="button"]');
    if (!button || button.disabled) return;

    // Hindari input teks / form elements
    const tag = button.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-circle';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Pastikan tombol memiliki position relative dan overflow hidden
    const computed = window.getComputedStyle(button);
    if (computed.position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 550);
  });
}
