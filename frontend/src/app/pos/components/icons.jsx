"use client";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function IconBarcode(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} {...props}>
      <path d="M4 5v14M7 5v14M10 5v14M12 5v14M15 5v14M18 5v14M20 5v14" strokeWidth="1.8" />
    </svg>
  );
}

export function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" {...stroke} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function IconSparkle(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} {...props}>
      <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
  );
}

export function IconQuantity(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} {...props}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

export function IconTax(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} {...props}>
      <path d="M19 5L5 19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

export function IconDiscount(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.93 4.93l14.14 14.14" />
    </svg>
  );
}

export function IconCoupon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} {...props}>
      <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z" />
      <path d="M9 12h6" />
    </svg>
  );
}

// Product SVG Glyphs
export function GlyphTee(props) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...stroke} {...props}>
      <path d="M22 8l10 6 10-6 12 8-6 9-6-3v32H16V22l-6 3-6-9z" />
    </svg>
  );
}

export function GlyphJeans(props) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...stroke} {...props}>
      <path d="M18 6h28l2 20-4 32h-8l-4-24-4 24h-8l-4-32z" />
      <path d="M32 6v18" />
    </svg>
  );
}

export function GlyphShirt(props) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...stroke} {...props}>
      <path d="M22 8l10 5 10-5 12 8-6 9-6-3v32H16V22l-6 3-6-9z" />
      <path d="M32 13v10" />
      <path d="M28 24h8" />
    </svg>
  );
}

export function GlyphJacket(props) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...stroke} {...props}>
      <path d="M20 8l12 6 12-6 10 10-6 8-4-3v33H20V25l-4 3-6-8z" />
      <path d="M32 14v34" />
    </svg>
  );
}

export function GlyphBag(props) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...stroke} {...props}>
      <path d="M16 22h32l-3 32H19z" />
      <path d="M24 22v-4a8 8 0 0 1 16 0v4" />
    </svg>
  );
}
