"use client";

import dynamic from "next/dynamic";

// Dynamically import MapPreview to avoid build issues
const MapPreview = dynamic(() => import("@/components/MapPreview"), {
  ssr: false,
});

export default function MapPreviewWrapper() {
  return <MapPreview />;
}

