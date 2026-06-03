"use client";

export default function LocationMap() {
  return (
    <iframe
      src="https://www.google.com/maps?q=-6.939573703556067, 109.75465997796861&z=12&output=embed"
      width="100%"
      height="320"
      style={{
        border: 0,
        borderRadius: "28px",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
