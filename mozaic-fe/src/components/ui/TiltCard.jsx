import { useState, useRef, useCallback } from 'react';

/**
 * TiltCard Component
 * Menghasilkan kartu visual dengan orientasi miring (baseRotation) dan efek interaktif 3D Tilt
 * yang merespons posisi kursor mouse secara halus (smooth spring).
 *
 * Props:
 * - baseRotation: Sudut rotasi istirahat kartu dalam derajat (contoh: -2, 1.8, -1.2)
 * - maxTilt: Derajat maksimal kemiringan interaktif 3D pada sumbu X & Y (default: 8)
 * - scale: Pembesaran lembut saat kursor berada di atas kartu (default: 1.025)
 * - perspective: Kedalaman perspektif 3D dalam px (default: 1000)
 */
export function TiltCard({
  children,
  className = '',
  baseRotation = 0,
  maxTilt = 8,
  scale = 1.025,
  perspective = 1000,
  ...props
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalisasi -1 s.d. 1
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      setTilt({ x: rotX, y: rotY, isHovered: true });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, isHovered: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.isHovered
          ? `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) rotate(${baseRotation}deg) scale3d(${scale}, ${scale}, ${scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) rotate(${baseRotation}deg) scale3d(1, 1, 1)`,
        transition: tilt.isHovered
          ? 'transform 0.08s cubic-bezier(0.03, 0.98, 0.52, 0.99)'
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        zIndex: tilt.isHovered ? 20 : 1,
      }}
      className={`relative cursor-pointer select-none transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
