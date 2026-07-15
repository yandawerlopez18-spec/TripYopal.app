export function getMapConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    center: { lat: 5.337, lng: -72.395 },
    zoom: 12,
    embedUrl: "https://www.google.com/maps?q=Yopal,Casanare&z=12&output=embed",
  };
}
