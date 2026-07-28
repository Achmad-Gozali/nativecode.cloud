export const ALAMAT =
  'Jl. Fort Timur No.31, RT.3/RW.12, Koja, Kec. Koja, Jkt Utara, Daerah Khusus Ibukota Jakarta 14220';

export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1400462124784!2d106.8922311753109!3d-6.111840293874735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1f935ee82f91%3A0x5d99ddbf5ceb7d4e!2sJl.%20Fort%20Timur%20No.31%2C%20RT.3%2FRW.12%2C%20Koja%2C%20Kec.%20Koja%2C%20Jkt%20Utara%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2014220!5e0!3m2!1sid!2sid!4v1785229516938!5m2!1sid!2sid';

export const MAPS_LINK_URL =
  'https://www.google.com/maps/place/Jl.+Fort+Timur+No.31,+RT.3%2FRW.12,+Koja,+Kec.+Koja,+Jkt+Utara,+Daerah+Khusus+Ibukota+Jakarta+14220';

export function MapEmbed({
  className = '',
  height = 320,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-gray-200 ${className}`}
      style={{ height }}
    >
      <iframe
        src={MAPS_EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Lokasi nativecode.cloud - Jl. Fort Timur No.31, Koja, Jakarta Utara"
      />
    </div>
  );
}