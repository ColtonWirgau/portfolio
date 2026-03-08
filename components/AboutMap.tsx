'use client';

import { useState, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { LifeEvent } from './LifeEventSheet';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CENTER = {
  latitude: 42.48,
  longitude: -83.05,
};

const MARKER_SIZE = 48;
const ACTIVE_SIZE = 64;

interface AboutMapProps {
  events: LifeEvent[];
  selected: LifeEvent | null;
  onSelect: (event: LifeEvent) => void;
}

export default function AboutMap({ events, selected, onSelect }: AboutMapProps) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait a tick so the container is fully in the DOM before mounting the map
    const timer = requestAnimationFrame(() => {
      if (containerRef.current && containerRef.current.offsetHeight > 0) {
        setReady(true);
      }
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full bg-border/30 flex items-center justify-center text-muted text-sm">
        Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {ready && (
        <Map
          key="about-map"
          initialViewState={{
            ...CENTER,
            zoom: 8.5,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactive={true}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          keyboard={false}
          attributionControl={false}
        >
          {events.map((event) => {
            const isActive = selected?.id === event.id;
            const size = isActive ? ACTIVE_SIZE : MARKER_SIZE;

            return (
              <Marker
                key={event.id}
                latitude={event.lat}
                longitude={event.lng}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  onSelect(event);
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
                  className="cursor-pointer"
                >
                  <div
                    className="rounded-full overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      width: size,
                      height: size,
                      border: isActive ? '3px solid var(--color-fg)' : '2px solid var(--color-fg)',
                      boxShadow: isActive
                        ? '0 4px 20px rgba(0,0,0,0.2)'
                        : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.label}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </Marker>
            );
          })}
        </Map>
      )}
    </div>
  );
}
