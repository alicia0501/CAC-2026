'use client'

import { useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'

export type MapResource = {
  id: string
  title: string
  address: string
  costNote: string
  date: string
  lat: number
  lng: number
}

function FitResources({ resources }: { resources: MapResource[] }) {
  const map = useMap()
  useEffect(() => {
    if (resources.length === 0) return
    if (resources.length === 1) {
    map.setView([resources[0].lat, resources[0].lng], 14)
     return
  }
   map.fitBounds(resources.map((item) => [item.lat, item.lng] as [number, number]), { padding: [34, 34], maxZoom: 14 })
  }, [map, resources])
  return null
}

export default function ResourceMap({ resources, onSelect }: { resources: MapResource[]; onSelect: (resource: MapResource) => void }) {
  const center: LatLngExpression = resources.length > 0 ? [resources[0].lat, resources[0].lng] : [39.8283, -98.5795]
  
  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="leaflet-map" aria-label="Map of the selected resource locations">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitResources resources={resources} />
      {resources.map((resource, index, arr) => {
        // Find if other resources share this exact lat/lng and offset them slightly
        const duplicates = arr.filter(r => r.lat === resource.lat && r.lng === resource.lng)
        const dupIndex = duplicates.findIndex(r => r.id === resource.id)
        
        const offsetLat = resource.lat + (dupIndex > 0 ? (dupIndex * 0.0008) * Math.cos(dupIndex * 2.1) : 0)
        const offsetLng = resource.lng + (dupIndex > 0 ? (dupIndex * 0.0008) * Math.sin(dupIndex * 2.1) : 0)

        return (
          <CircleMarker 
            key={resource.id} 
            center={[offsetLat, offsetLng]} 
            radius={10} 
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#1b6751', fillOpacity: 1 }} 
            eventHandlers={{ click: () => onSelect(resource) }}
          >
            <Popup>
              <strong>{resource.title}</strong><br />
              {resource.date}<br />
              <span>{resource.address}</span>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}