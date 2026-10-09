'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  Dumbbell,
  GraduationCap,
  DollarSign,
  ArrowDownWideNarrow,
  ArrowRight,
  Baby,
  PackageOpen,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  ImagePlus,
  FilePenLine,
  Languages,
  List,
  MapPin,
  MapPinned,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Utensils,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Category = 'All' | 'Events' | 'Food' | 'Sports' | 'Arts' | 'Family Support' | 'Extracurricular Activities'
type Resource = {
  id: string
  title: string
  category: Exclude<Category, 'All'>
  date: string
  schedule?: { days: string[]; opens: string; closes: string; notes: string }
  address: string
  city: string
  state: string
  zip: string
  age: string
  distance: number
  cost: 'free' | 'sliding' | 'low'
  costNote: string
  benefits: string[]
  description: string
  phone: string
  contact: string
  lat: number
  lng: number
  imageTone: string
  icon: 'art' | 'food' | 'sport' | 'familySupport' | 'event' | 'learning'
  imageUrl?: string
}

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' }, { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' }, { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
] as const

const examples: Resource[] = [
  {
    id: 'story-garden',
    title: 'Kids’ Storytime',
    category: 'Events',
    date: 'Today, 10:30 AM',
    address: '1901 SW 1st Street, Miami, FL 33130',
    city: 'Miami',
    state: 'FL',
    zip: '33130',
    age: 'Ages 2–6',
    distance: 0.4,
    cost: 'free',
    costNote: '100% free',
    benefits: ['All are welcome'],
    description: 'Free storytime with books, songs, and outdoor play. Caregivers and siblings are welcome.',
    phone: '(215) 555-0142',
    contact: 'Call to ask about access needs',
    lat: 25.768,
    lng: -80.194,
    imageTone: 'resource-art',
    icon: 'event',
  },
  {
    id: 'fresh-pantry',
    title: 'Community Food Pantry',
    category: 'Food',
    date: 'Today, 1:00–4:00 PM',
    address: '4233 SW 8th Street, Miami, FL 33130',
    city: 'Miami',
    state: 'FL',
    zip: '33130',
    age: 'All ages',
    distance: 0.8,
    cost: 'free',
    costNote: '100% free',
    benefits: ['No ID required', 'Fresh produce'],
    description: 'Pick up free groceries, including fresh produce and pantry staples. No appointment needed.',
    phone: '(215) 555-0176',
    contact: 'Call for today’s pantry hours',
    lat: 25.766,
    lng: -80.198,
    imageTone: 'resource-food',
    icon: 'food',
  },
  {
    id: 'little-kicks',
    title: 'Youth Soccer',
    category: 'Sports',
    date: 'Sat, Oct 12 · 9:00 AM',
    address: '4520 NW 2nd Avenue, Miami, FL 33130',
    city: 'Miami',
    state: 'FL',
    zip: '33130',
    age: 'Ages 5–10',
    distance: 1.1,
    cost: 'sliding',
    costNote: 'Pay what you can; free spots available',
    benefits: ['SNAP/EBT accepted', 'Gear provided'],
    description: 'Saturday soccer for kids. Loaner gear and free or reduced-cost spots are available.',
    phone: '(215) 555-0128',
    contact: 'Ask about a scholarship spot',
    lat: 25.7605,
    lng: -80.193,
    imageTone: 'resource-sport',
    icon: 'sport',
  },
  {
    id: 'make-and-play',
    title: 'Kids’ Art Workshop',
    category: 'Arts',
    date: 'Sat, Oct 12 · 11:00 AM',
    address: '301 South Miami Avenue, Miami, FL 33130',
    city: 'Miami',
    state: 'FL',
    zip: '33130',
    age: 'Ages 4–12',
    distance: 1.3,
    cost: 'low',
    costNote: '$0–5 suggested',
    benefits: ['SNAP/EBT accepted', 'All supplies included'],
    description: 'Make art together. Supplies are included, and families can attend even if they can’t contribute.',
    phone: '(215) 555-0193',
    contact: 'Text for language support',
    lat: 25.7612,
    lng: -80.201,
    imageTone: 'resource-art',
    icon: 'art',
  },
  {
    id: 'family-support',
    title: 'Family Supply Closet',
    category: 'Family Support',
    date: 'Mon–Fri, 9:00 AM–2:00 PM',
    address: '4100 SW 1st Avenue, Miami, FL 33130',
    city: 'Miami',
    state: 'FL',
    zip: '33130',
    age: 'Children 0–12',
    distance: 1.7,
    cost: 'free',
    costNote: '100% free',
    benefits: ['Diapers & hygiene kits', 'No referral needed'],
    description: 'Free diapers, wipes, seasonal children’s clothing, and family hygiene kits. Stop by during open hours or call ahead.',
    phone: '(215) 555-0165',
    contact: 'Call to check available sizes',
    lat: 25.755,
    lng: -80.199,
    imageTone: 'resource-support',
    icon: 'familySupport',
  },
]

const WEEKDAYS = [
  { value: 'Mon', en: 'Monday', es: 'Lunes' },
  { value: 'Tue', en: 'Tuesday', es: 'Martes' },
  { value: 'Wed', en: 'Wednesday', es: 'Miércoles' },
  { value: 'Thu', en: 'Thursday', es: 'Jueves' },
  { value: 'Fri', en: 'Friday', es: 'Viernes' },
  { value: 'Sat', en: 'Saturday', es: 'Sábado' },
  { value: 'Sun', en: 'Sunday', es: 'Domingo' },
] as const

const translations = {
  en: {
    navExplore: 'Explore', navSaved: 'Saved', navShare: 'Share a resource', language: 'Español', languageAction: 'Switch language to', loadingMap: 'Loading neighborhood map…', removedNotice: 'Removed from saved resources.', madeFor: 'Made for families,', madeBy: 'by students.',
    radiusOne: 'Within 1 mile', radiusThree: 'Within 3 miles', radiusFive: 'Within 5 miles', radiusTen: 'Within 10 miles',
    eyebrow: 'Local family resources', heading: 'Connecting community to opportunity.', intro: 'Discover free and affordable youth activities, food pantries, and community care near you — no sign up required.',
    search: 'Search activities, food, and more', state: 'State', city: 'City', allCities: 'All cities', zipCode: 'ZIP code', zipHint: 'Set your starting point to estimate miles.', invalidZip: 'Enter a valid US ZIP code to calculate distances.', loadingCities: 'Loading cities…', citiesUnavailable: 'Could not load cities for this state. Please try again.', age: 'Age range', distance: 'Distance', category: 'Browse by category', filters: 'Filters',
    all: 'All resources', events: 'Events', food: 'Food', sports: 'Sports', arts: 'Arts', familySupport: 'Family Support', extracurricular: 'Extracurriculars',
    results: 'near you', list: 'List', map: 'Map', nearest: 'Nearest first', freeOnly: 'Only show 100% free', snapOnly: 'SNAP / EBT accepted',
    free: '100% free', sliding: 'Pay what you can', low: 'Price listed', save: 'Save', saved: 'Saved', details: 'View details', edit: 'Edit', delete: 'Delete resource', confirmDelete: 'Delete this shared resource? This cannot be undone.', updated: 'Your resource was updated.', deleted: 'Your shared resource was deleted.',
    resourceNote: 'Helping families find local support, close to home.',
    submitTitle: 'Know a good place?', submitCopy: 'Help another family find it. Share a free or affordable local resource.', submitCta: 'Add a resource',
    noResults: 'No matches just yet', noResultsCopy: 'Try a different category or widen your distance.', reset: 'Clear filters',
    savedTitle: 'Your saved places', savedCopy: 'Saved on this device for your next visit.', noSaved: 'Nothing saved yet', noSavedCopy: 'Tap the bookmark on any resource to keep it close.', browse: 'Explore resources',
    detail: 'About this place', ageLabel: 'Good for', open: 'Hours / next time', address: 'Address', contact: 'Contact',
    formTitle: 'Share a resource', formCopy: 'Know a welcoming place for local families? Add the details below.', editFormCopy: 'Update the details for the resource you shared.', name: 'Resource name', type: 'Category', date: 'Days and hours', addressField: 'Street address', ageField: 'Age range', cost: 'Cost for families', costHint: 'Be specific so families know what to expect before they go.', freeCostTitle: 'Free', freeCostCopy: 'No fee to attend; all families are welcome.', slidingCostTitle: 'Pay what you can', slidingCostCopy: 'A contribution is optional; free spots are welcome.', fixedCostTitle: 'Set a price', fixedCostCopy: 'Share the actual amount families will pay.', costDetailsLabel: 'What will families pay?', slidingDetailsLabel: 'Suggested contribution (optional)', costDetailsHint: 'Mention whether it’s per child, per family, or per visit.', slidingDetailsHint: 'Share a typical contribution and confirm families can still attend for free.', fixedCostPlaceholder: 'e.g. $10 per family', slidingCostPlaceholder: 'e.g. $0–$10 suggested per visit', slidingDefaultNote: 'Pay what you can; free spots available', contactField: 'Phone or contact', description: 'A little about it', cityField: 'City', stateField: 'State', zipField: 'ZIP code', chooseCity: 'Choose a city', ageAll: 'All ages', daysOpen: 'Days available', opens: 'From', closes: 'Until', scheduleNotes: 'Extra schedule details (optional)', zipPinHint: 'The map pin will be placed near the ZIP code area.', thumbnailTitle: 'Event thumbnail (optional)', chooseThumbnail: 'Choose an image', removeThumbnail: 'Remove image', processingThumbnail: 'Preparing image…', thumbnailPreview: 'Selected thumbnail preview', thumbnailHint: 'Your image is optional. If you skip it, we’ll use the preset image for this category.', thumbnailInvalid: 'Choose a JPG, PNG, or WebP image.', thumbnailTooLarge: 'Choose an image under 5 MB.', thumbnailProcessing: 'Could not prepare that image. Please try another.', scheduleDaysRequired: 'Choose at least one day.', scheduleTimesRequired: 'Enter both opening and closing times, or leave both blank.', zipMismatch: 'That ZIP code does not match the selected city and state.', mapAccuracy: 'Map pins are approximate and use the ZIP code area.', weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], weekdayShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], submit: 'Submit resource', cancel: 'Cancel', submitted: 'Thanks for sharing your resource.',
    ageAny: 'Any age', age0: '0–3 years', age4: '4–7 years', age8: '8–12 years', ageTeen: '13+ years', miles: 'miles',
    eventsCat: 'Events', foodCat: 'Food', sportsCat: 'Sports', artsCat: 'Arts', familySupportCat: 'Family Support', extracurricularCat: 'Extracurricular Activities',
    snapAccepted: 'SNAP/EBT accepted', freeBadge: '100% free', slidingBadge: 'Sliding scale', lowBadge: 'Low cost',
    pinHint: 'Select a pin to see its location.', offlineHint: 'Saved details stay available on this device.',
  },
  es: {
    navExplore: 'Explorar', navSaved: 'Guardados', navShare: 'Compartir recurso', language: 'English', languageAction: 'Cambiar idioma a', loadingMap: 'Cargando el mapa del vecindario…', removedNotice: 'Se quitó de los recursos guardados.', madeFor: 'Hecho para las familias,', madeBy: 'por la comunidad.',
    radiusOne: 'A menos de 1 milla', radiusThree: 'A menos de 3 millas', radiusFive: 'A menos de 5 millas', radiusTen: 'A menos de 10 millas',
    eyebrow: 'Recursos familiares locales', heading: 'Conectamos a la comunidad con nuevas oportunidades.', intro: 'Descubre actividades juveniles gratuitas, despensas de alimentos y apoyo comunitario cerca de ti, sin necesidad de inscribirte.',
    search: 'Busca actividades, comida y más', state: 'Estado', city: 'Ciudad', allCities: 'Todas las ciudades', zipCode: 'Código postal', zipHint: 'Indica el punto de partida para estimar las millas.', invalidZip: 'Escribe un código postal válido de EE. UU. para calcular distancias.', loadingCities: 'Cargando ciudades…', citiesUnavailable: 'No se pudieron cargar las ciudades. Inténtalo de nuevo.', age: 'Rango de edad', distance: 'Distancia', category: 'Explora por categoría', filters: 'Filtros',
    all: 'Todos', events: 'Eventos', food: 'Comida', sports: 'Deportes', arts: 'Arte', familySupport: 'Apoyo familiar', extracurricular: 'Actividades extracurriculares',
    results: 'cerca de ti', list: 'Lista', map: 'Mapa', nearest: 'Más cercanos', freeOnly: 'Solo opciones 100% gratis', snapOnly: 'Acepta SNAP / EBT',
    free: '100% gratis', sliding: 'Paga lo que puedas', low: 'Precio indicado', save: 'Guardar', saved: 'Guardado', details: 'Ver detalles', edit: 'Editar', delete: 'Eliminar recurso', confirmDelete: '¿Eliminar este recurso compartido? Esta acción no se puede deshacer.', updated: 'Tu recurso se actualizó.', deleted: 'Tu recurso compartido se eliminó.',
    resourceNote: 'Ayudamos a las familias a encontrar apoyo cerca de casa.',
    submitTitle: '¿Conoces un buen lugar?', submitCopy: 'Ayuda a otra familia a encontrarlo. Comparte un recurso local gratuito o económico.', submitCta: 'Añadir recurso',
    noResults: 'No hay resultados', noResultsCopy: 'Prueba otra categoría o amplía la distancia.', reset: 'Borrar filtros',
    savedTitle: 'Tus lugares guardados', savedCopy: 'Guardados en este dispositivo para tu próxima visita.', noSaved: 'Todavía no hay nada guardado', noSavedCopy: 'Toca el marcador de cualquier recurso para guardarlo.', browse: 'Explorar recursos',
    detail: 'Acerca de este lugar', ageLabel: 'Ideal para', open: 'Horario / próxima actividad', address: 'Dirección', contact: 'Contacto',
    formTitle: 'Comparte un recurso', formCopy: '¿Conoces un lugar acogedor para familias? Añade los detalles.', editFormCopy: 'Actualiza los detalles del recurso que compartiste.', name: 'Nombre del recurso', type: 'Categoría', date: 'Días y horario', addressField: 'Dirección', ageField: 'Rango de edad', cost: 'Costo para las familias', costHint: 'Sé específico para que las familias sepan qué esperar.', freeCostTitle: 'Gratis', freeCostCopy: 'Sin costo para asistir; todas las familias son bienvenidas.', slidingCostTitle: 'Paga lo que puedas', slidingCostCopy: 'La contribución es opcional; hay cupos gratis.', fixedCostTitle: 'Indica el precio', fixedCostCopy: 'Comparte el costo exacto para las familias.', costDetailsLabel: '¿Cuánto pagarán las familias?', slidingDetailsLabel: 'Contribución sugerida (opcional)', costDetailsHint: 'Indica si el precio es por niño, familia o visita.', slidingDetailsHint: 'Comparte una contribución típica y confirma que se puede asistir gratis.', fixedCostPlaceholder: 'p. ej., $10 por familia', slidingCostPlaceholder: 'p. ej., $0–$10 sugeridos por visita', slidingDefaultNote: 'Paga lo que puedas; hay cupos gratis', contactField: 'Teléfono o contacto', description: 'Cuéntanos un poco', cityField: 'Ciudad', stateField: 'Estado', zipField: 'Código postal', chooseCity: 'Elige una ciudad', ageAll: 'Todas las edades', daysOpen: 'Días disponibles', opens: 'Desde', closes: 'Hasta', scheduleNotes: 'Detalles adicionales del horario (opcional)', zipPinHint: 'El marcador del mapa se ubicará cerca del área del código postal.', thumbnailTitle: 'Imagen del evento (opcional)', chooseThumbnail: 'Elegir una imagen', removeThumbnail: 'Quitar imagen', processingThumbnail: 'Preparando imagen…', thumbnailPreview: 'Vista previa de la imagen', thumbnailHint: 'La imagen es opcional. Si no eliges una, usaremos la imagen predeterminada de esta categoría.', thumbnailInvalid: 'Elige una imagen JPG, PNG o WebP.', thumbnailTooLarge: 'Elige una imagen de menos de 5 MB.', thumbnailProcessing: 'No se pudo preparar la imagen. Intenta con otra.', scheduleDaysRequired: 'Elige al menos un día.', scheduleTimesRequired: 'Indica la hora de apertura y cierre, o deja ambas en blanco.', zipMismatch: 'El código postal no coincide con la ciudad y el estado seleccionados.', mapAccuracy: 'Los marcadores son aproximados y usan el área del código postal.', weekdays: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'], weekdayShort: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], submit: 'Enviar recurso', cancel: 'Cancelar', submitted: 'Gracias por compartir tu recurso.',
    ageAny: 'Cualquier edad', age0: '0–3 años', age4: '4–7 años', age8: '8–12 años', ageTeen: '13+ años', miles: 'millas',
    eventsCat: 'Eventos', foodCat: 'Comida', sportsCat: 'Deportes', artsCat: 'Arte', familySupportCat: 'Apoyo familiar', extracurricularCat: 'Actividades extracurriculares',
    snapAccepted: 'Acepta SNAP/EBT', freeBadge: '100% gratis', slidingBadge: 'Escala variable', lowBadge: 'Bajo costo',
    pinHint: 'Selecciona un marcador para ver el lugar.', offlineHint: 'Los detalles guardados siguen disponibles en este dispositivo.',
  },
} as const

type Language = keyof typeof translations
type IconName = Resource['icon']
const categoryList: Category[] = ['All', 'Events', 'Food', 'Sports', 'Arts', 'Family Support', 'Extracurricular Activities']
const categoryTranslation: Record<Category, keyof (typeof translations)['en']> = {
  All: 'all', Events: 'events', Food: 'food', Sports: 'sports', Arts: 'arts', 'Family Support': 'familySupport', 'Extracurricular Activities': 'extracurricular',
}
const categoryLabelKey: Record<Exclude<Category, 'All'>, keyof (typeof translations)['en']> = {
  Events: 'eventsCat', Food: 'foodCat', Sports: 'sportsCat', Arts: 'artsCat', 'Family Support': 'familySupportCat', 'Extracurricular Activities': 'extracurricularCat',
}
const categoryIcons: Record<Category, IconName | 'all'> = {
  All: 'all', Events: 'event', Food: 'food', Sports: 'sport', Arts: 'art', 'Family Support': 'familySupport', 'Extracurricular Activities': 'learning',
}
const savedStorageKey = 'good-neighbor-saved-v1'

function milesBetween(origin: { latitude: number; longitude: number }, point: { lat: number; lng: number }) {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180)
  const latitudeDelta = toRadians(point.lat - origin.latitude)
  const longitudeDelta = toRadians(point.lng - origin.longitude)
  const originLatitude = toRadians(origin.latitude)
  const pointLatitude = toRadians(point.lat)
  const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(originLatitude) * Math.cos(pointLatitude) * Math.sin(longitudeDelta / 2) ** 2
  return 3958.8 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}

function matchesAge(resourceAge: string, selectedAge: string) {
  if (selectedAge === 'Any age' || resourceAge === 'All ages') return true
  const ageRanges: Record<string, [number, number]> = {
    '0–3 years': [0, 3],
    '4–7 years': [4, 7],
    '8–12 years': [8, 12],
    '13+ years': [13, 99],
  }
  const requested = ageRanges[selectedAge]
  if (!requested) return true
  const match = resourceAge.match(/(\d+)\s*[–-]\s*(\d+)/)
  if (match) return Number(match[1]) <= requested[1] && Number(match[2]) >= requested[0]
  const minimum = resourceAge.match(/(\d+)\s*\+/)
  if (minimum) return requested[1] >= Number(minimum[1])
  return true
}

function CategoryGlyph({ category, size = 16 }: { category: Category; size?: number }) {
  const icon = categoryIcons[category]
  if (icon === 'all') return <Sparkles size={size} aria-hidden="true" />
  const iconProps = { size, 'aria-hidden': true as const }
  if (icon === 'food') return <Utensils {...iconProps} />
  if (icon === 'sport') return <Dumbbell {...iconProps} />
  if (icon === 'familySupport') return <PackageOpen {...iconProps} />
  if (icon === 'learning') return <GraduationCap {...iconProps} />
  return <Heart {...iconProps} />
}

const MapView = dynamic(() => import('@/components/resource-map'), {
  ssr: false,
  loading: () => <div className="map-loading" aria-label="Loading map"><MapPinned size={24} /><span>Loading neighborhood map…</span></div>,
})

export default function ResourceFinder({ initialCities }: { initialCities: string[] }) {
  const [language, setLanguage] = useState<Language>('en')
  const [category, setCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [stateCode, setStateCode] = useState('FL')
  const [city, setCity] = useState('Miami')
  const [zip, setZip] = useState('')
  const [zipOrigin, setZipOrigin] = useState<{ latitude: number; longitude: number } | null>(null)
  const zipLookupRequestRef = useRef(0)
  const [cities, setCities] = useState<string[]>(initialCities)
  const [citiesLoading, setCitiesLoading] = useState(false)
  const citiesRequestRef = useRef(0)
  const cityCacheRef = useRef<Record<string, string[]>>({ FL: initialCities })
  const [age, setAge] = useState('Any age')
  const [radius, setRadius] = useState('5')
  const [freeOnly, setFreeOnly] = useState(false)
  const [snapOnly, setSnapOnly] = useState(false)
  const [view, setView] = useState<'list' | 'map'>('list')
  const [savedOnly, setSavedOnly] = useState(false)
  const [saved, setSaved] = useState<Resource[]>([])
  const [submissions, setSubmissions] = useState<Resource[]>([])
  const [activeResource, setActiveResource] = useState<Resource | null>(null)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [formCost, setFormCost] = useState<Resource['cost']>('free')
  const [selectedThumbnail, setSelectedThumbnail] = useState('')
  const [thumbnailError, setThumbnailError] = useState('')
  const [isThumbnailProcessing, setIsThumbnailProcessing] = useState(false)
  const thumbnailRequestRef = useRef(0)
  const [showForm, setShowForm] = useState(false)
  const [formStateCode, setFormStateCode] = useState('FL')
  const [formCity, setFormCity] = useState('Miami')
  const [formCities, setFormCities] = useState<string[]>([])
  const [formCitiesLoading, setFormCitiesLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formCityCacheRef = useRef<Record<string, string[]>>({})
  const formCitiesRequestRef = useRef(0)
  const [notice, setNotice] = useState('')
  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    try {
      const cached = window.localStorage.getItem(savedStorageKey)
      if (cached) {
        const parsed: unknown = JSON.parse(cached)
        if (Array.isArray(parsed)) setSaved(parsed.filter((item): item is Resource => Boolean(item && typeof item.id === 'string' && typeof item.title === 'string')).map((item) => ({ ...item, city: item.city || 'Miami', state: item.state || 'FL', zip: item.zip || '33130' })))
      }
    } catch {
      setNotice('Saved items are unavailable in this browser.')
    }
  }, [])

  const resources = useMemo(() => [...submissions, ...examples], [submissions])
  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    const normalizedCity = city.trim().toLocaleLowerCase()
    const source = savedOnly ? saved : resources
    return source
      .map((item) => ({ ...item, distance: zipOrigin ? milesBetween(zipOrigin, item) : item.distance }))
      .filter((item) => category === 'All' || item.category === category)
      .filter((item) => !normalizedSearch || `${item.title} ${item.category} ${item.address} ${item.city} ${item.state} ${item.description} ${item.benefits.join(' ')}`.toLocaleLowerCase().includes(normalizedSearch))
      .filter((item) => item.state === stateCode)
      .filter((item) => !normalizedCity || item.city.toLocaleLowerCase() === normalizedCity)
      .filter((item) => item.distance <= Number(radius))
      .filter((item) => !freeOnly || item.cost === 'free')
      .filter((item) => !snapOnly || item.benefits.some((benefit) => /snap|ebt/i.test(benefit)))
      .filter((item) => matchesAge(item.age, age))
      .sort((a, b) => a.distance - b.distance)
  }, [age, category, city, freeOnly, radius, resources, saved, savedOnly, search, snapOnly, stateCode, zipOrigin])

  async function changeState(nextState: string, selectedCity = '') {
    setStateCode(nextState)
    setCity(selectedCity)
    const requestId = ++citiesRequestRef.current
    const cachedCities = cityCacheRef.current[nextState]
    if (cachedCities) {
      setCities(cachedCities)
      setCitiesLoading(false)
      return
    }

    setCities([])
    setCitiesLoading(true)
    try {
      const response = await fetch(`/api/locations?state=${encodeURIComponent(nextState)}`)
      if (!response.ok) throw new Error('City lookup failed')
      const result = await response.json() as { cities?: string[] }
      if (requestId !== citiesRequestRef.current) return
      const nextCities = Array.isArray(result.cities) ? result.cities : []
      cityCacheRef.current[nextState] = nextCities
      setCities(nextCities)
    } catch {
      if (requestId === citiesRequestRef.current) setNotice(t.citiesUnavailable)
    } finally {
      if (requestId === citiesRequestRef.current) setCitiesLoading(false)
    }
  }

  async function loadFormCities(nextState: string, selectedCity = '') {
    const requestId = ++formCitiesRequestRef.current
    setFormCitiesLoading(true)
    setFormCity(selectedCity)
    const cachedCities = formCityCacheRef.current[nextState]
    if (cachedCities) {
      setFormCities(cachedCities)
      setFormCitiesLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/locations?state=${encodeURIComponent(nextState)}`)
      if (!response.ok) throw new Error('City lookup failed')
      const result = await response.json() as { cities?: string[] }
      if (requestId !== formCitiesRequestRef.current) return
      const nextCities = Array.isArray(result.cities) ? result.cities : []
      formCityCacheRef.current[nextState] = nextCities
      setFormCities(nextCities)
    } catch {
      if (requestId === formCitiesRequestRef.current) {
        setFormCities([])
        setNotice(t.citiesUnavailable)
      }
    } finally {
      if (requestId === formCitiesRequestRef.current) setFormCitiesLoading(false)
    }
  }

  function openResourceForm(resource?: Resource) {
    const nextState = resource?.state ?? stateCode
    const nextCity = (resource?.city ?? city) || 'Miami'
    setNotice('')
    thumbnailRequestRef.current += 1
    setThumbnailError('')
    setIsThumbnailProcessing(false)
    setSelectedThumbnail(resource?.imageUrl ?? '')
    setFormCost(resource?.cost ?? 'free')
    setEditingResource(resource ?? null)
    setFormStateCode(nextState)
    setShowForm(true)
    void loadFormCities(nextState, nextCity)
  }

  async function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const file = input.files?.[0]
    if (!file) return

    const requestId = ++thumbnailRequestRef.current
    setThumbnailError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setThumbnailError(t.thumbnailInvalid)
      input.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setThumbnailError(t.thumbnailTooLarge)
      input.value = ''
      return
    }

    setIsThumbnailProcessing(true)
    let bitmap: ImageBitmap | undefined
    try {
      bitmap = await createImageBitmap(file)
      if (requestId !== thumbnailRequestRef.current) return
      if (bitmap.width * bitmap.height > 40_000_000) {
        setThumbnailError(t.thumbnailTooLarge)
        return
      }
      const canvas = document.createElement('canvas')
      canvas.width = 720
      canvas.height = 540
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Canvas is unavailable')
      const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height)
      const width = bitmap.width * scale
      const height = bitmap.height * scale
      context.drawImage(bitmap, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
      let thumbnail = canvas.toDataURL('image/webp', 0.76)
      if (thumbnail.length > 220_000) thumbnail = canvas.toDataURL('image/webp', 0.56)
      if (thumbnail.length > 220_000) {
        setThumbnailError(t.thumbnailTooLarge)
        return
      }
      setSelectedThumbnail(thumbnail)
    } catch {
      if (requestId === thumbnailRequestRef.current) setThumbnailError(t.thumbnailProcessing)
    } finally {
      bitmap?.close()
      input.value = ''
      if (requestId === thumbnailRequestRef.current) setIsThumbnailProcessing(false)
    }
  }

  async function changeZip(value: string) {
    const nextZip = value.replace(/\D/g, '').slice(0, 5)
    setZip(nextZip)
    setZipOrigin(null)
    const requestId = ++zipLookupRequestRef.current
    if (nextZip.length !== 5) return

    try {
      const response = await fetch(`/api/locations?zip=${encodeURIComponent(nextZip)}`)
      if (!response.ok) throw new Error('ZIP lookup failed')
      const location = await response.json() as { latitude: number; longitude: number; city: string; state: string }
      if (requestId !== zipLookupRequestRef.current) return
      setZipOrigin({ latitude: location.latitude, longitude: location.longitude })
      setNotice('')
      void changeState(location.state, location.city)
    } catch {
      if (requestId === zipLookupRequestRef.current) setNotice(t.invalidZip)
    }
  }

  function toggleSaved(resource: Resource) {
    const exists = saved.some((item) => item.id === resource.id)
    const next = exists ? saved.filter((item) => item.id !== resource.id) : [resource, ...saved]
    setSaved(next)
    try {
      window.localStorage.setItem(savedStorageKey, JSON.stringify(next))
      setNotice(exists ? t.removedNotice : t.offlineHint)
    } catch {
      setNotice('This browser could not save the resource. Check your device storage settings.')
    }
  }

  async function submitResource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formCitiesLoading || isSubmitting || isThumbnailProcessing) return
    const form = new FormData(event.currentTarget)
    const title = String(form.get('name') || '').trim()
    const address = String(form.get('address') || '').trim()
    const selectedCity = String(form.get('city') || '').trim()
    const selectedState = String(form.get('state') || formStateCode).trim()
    const zipCode = String(form.get('zip') || '').trim()
    const days = form.getAll('days').map(String)
    const opens = String(form.get('opens') || '')
    const closes = String(form.get('closes') || '')
    const scheduleNotes = String(form.get('schedule-notes') || '').trim()
    const cost = String(form.get('cost') || 'free') as Resource['cost']
    const costDetails = String(form.get('costDetails') || '').trim()
    if (!title || !address) return
    if (cost === 'low' && !costDetails) return
    if (days.length === 0) {
      setNotice(t.scheduleDaysRequired)
      return
    }
    if (Boolean(opens) !== Boolean(closes)) {
      setNotice(t.scheduleTimesRequired)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/locations?zip=${encodeURIComponent(zipCode)}`)
      if (!response.ok) {
        setNotice(t.zipMismatch)
        return
      }
      const location = await response.json() as { city: string; state: string; latitude: number; longitude: number }
      if (location.state !== selectedState || location.city.toLocaleLowerCase() !== selectedCity.toLocaleLowerCase()) {
        setNotice(t.zipMismatch)
        return
      }

      const type = String(form.get('category') || 'Events') as Exclude<Category, 'All'>
      const weekdayLabels = days.map((day) => {
        const index = WEEKDAYS.findIndex((item) => item.value === day)
        return index >= 0 ? t.weekdayShort[index] : day
      })
      const formatTime = (value: string) => new Date(`1970-01-01T${value}:00`).toLocaleTimeString(language === 'en' ? 'en-US' : 'es-US', { hour: 'numeric', minute: '2-digit' })
      const date = [
        weekdayLabels.join(', '),
        opens && closes ? `${formatTime(opens)}–${formatTime(closes)}` : '',
        scheduleNotes,
      ].filter(Boolean).join(' · ')
      const resource: Resource = {
        id: editingResource?.id ?? `community-${Date.now()}`,
        title,
        category: type,
        date,
        schedule: { days, opens, closes, notes: scheduleNotes },
        address,
        city: location.city,
        state: location.state,
        zip: zipCode,
        age: String(form.get('age') || 'All ages'),
        distance: editingResource?.distance ?? 0.1,
        cost,
        costNote: cost === 'free' ? '100% free' : costDetails || t.slidingDefaultNote,
        benefits: String(form.get('snap') || '') ? ['SNAP/EBT accepted'] : [],
        description: String(form.get('description') || 'Community-submitted resource.'),
        phone: String(form.get('phone') || 'Contact details not provided'),
        contact: 'Community-submitted listing',
        lat: location.latitude,
        lng: location.longitude,
        imageTone: type === 'Food' ? 'resource-food' : type === 'Sports' ? 'resource-sport' : type === 'Family Support' ? 'resource-support' : type === 'Extracurricular Activities' ? 'resource-learning' : 'resource-art',
        imageUrl: selectedThumbnail || undefined,
        icon: type === 'Food' ? 'food' : type === 'Sports' ? 'sport' : type === 'Family Support' ? 'familySupport' : type === 'Extracurricular Activities' ? 'learning' : type === 'Events' ? 'event' : 'art',
      }
      const wasEditing = Boolean(editingResource)
      setSubmissions((current) => wasEditing ? current.map((item) => item.id === resource.id ? resource : item) : [resource, ...current])
      if (wasEditing) {
        const nextSaved = saved.map((item) => item.id === resource.id ? resource : item)
        setSaved(nextSaved)
        try {
          window.localStorage.setItem(savedStorageKey, JSON.stringify(nextSaved))
        } catch {
          setNotice('This browser could not update saved resources.')
        }
      }
      thumbnailRequestRef.current += 1
      setEditingResource(null)
      setShowForm(false)
      setIsThumbnailProcessing(false)
      setSelectedThumbnail('')
      setThumbnailError('')
      setFormCost('free')
      setCategory('All')
      setSearch('')
      setSavedOnly(false)
      setNotice(wasEditing ? t.updated : t.submitted)
    } catch {
      setNotice(t.zipMismatch)
    } finally {
      setIsSubmitting(false)
    }
  }

  function editResource(resource: Resource) {
    setActiveResource(null)
    thumbnailRequestRef.current += 1
    setIsThumbnailProcessing(false)
    setThumbnailError('')
    setSelectedThumbnail(resource.imageUrl ?? '')
    setFormCost(resource.cost)
    setEditingResource(resource)
    setShowForm(true)
  }

  function closeResourceForm() {
    thumbnailRequestRef.current += 1
    setShowForm(false)
    setEditingResource(null)
    setIsThumbnailProcessing(false)
    setSelectedThumbnail('')
    setThumbnailError('')
    setFormCost('free')
  }

  function deleteEditedResource() {
    if (!editingResource || !window.confirm(t.confirmDelete)) return
    const deletedId = editingResource.id
    setSubmissions((current) => current.filter((item) => item.id !== deletedId))
    const nextSaved = saved.filter((item) => item.id !== deletedId)
    setSaved(nextSaved)
    try {
      window.localStorage.setItem(savedStorageKey, JSON.stringify(nextSaved))
    } catch {
      setNotice('')
    }
    thumbnailRequestRef.current += 1
    setEditingResource(null)
    setShowForm(false)
    setIsThumbnailProcessing(false)
    setSelectedThumbnail('')
    setThumbnailError('')
    setFormCost('free')
    setNotice(t.deleted)
  }

  const clearFilters = () => {
    setCategory('All')
    setSearch('')
    setStateCode('FL')
    setCity('Miami')
    setZip('')
    setZipOrigin(null)
    zipLookupRequestRef.current += 1
    setCities(['Miami'])
    cityCacheRef.current = { FL: ['Miami'] }
    citiesRequestRef.current += 1
    setCitiesLoading(false)
    setAge('Any age')
    setRadius('5')
    setFreeOnly(false)
    setSnapOnly(false)
  }

  return (
    <main className="resource-app">
      <div className="site-wrap">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Hestia home">
            <span className="brand-mark"><Image src="/hestia-vitex-transparent.png" alt="" width={990} height={1275} priority /></span>
            <span className="brand-word">Hestia</span><span className="brand-sparkle" aria-hidden="true" />
          </a>
          <nav className="top-nav" aria-label="Main navigation">
            <button className={!savedOnly ? 'nav-link active' : 'nav-link'} onClick={() => setSavedOnly(false)}>{t.navExplore}</button>
            <button className={savedOnly ? 'nav-link active' : 'nav-link'} onClick={() => setSavedOnly(true)}>{t.navSaved}{saved.length > 0 && <span className="saved-count">{saved.length}</span>}</button>
          </nav>
          <div className="top-actions">
            <button className="language-switch" onClick={() => setLanguage((current) => current === 'en' ? 'es' : 'en')} aria-label={`${t.languageAction} ${t.language}`}><Languages size={16} aria-hidden="true" /><span>{t.language}</span></button>
            <button className="share-button" aria-label={t.navShare} onClick={() => openResourceForm()}><Plus size={17} aria-hidden="true" /><span>{t.navShare}</span></button>
          </div>
        </header>

        <section className="welcome" id="top">
          <div className="welcome-copy">
                    <h1>{t.heading}</h1>
            <p className="welcome-intro">{t.intro}</p>
          </div>
          <div className="welcome-note"><span className="note-icon"><Heart size={16} fill="currentColor" aria-hidden="true" /></span><span>{t.madeFor} <strong>{t.madeBy}</strong></span></div>
        </section>

        <div className="finder-layout">
          <aside className="filters-panel" aria-label={t.filters}>
            <div className="filter-title"><span className="filter-icon"><SlidersHorizontal size={16} aria-hidden="true" /></span><h2>{t.filters}</h2><button className="text-button" onClick={clearFilters}>{t.reset}</button></div>
            <label className="field-label" htmlFor="search-input">{t.search}</label>
            <div className="search-field"><Search size={17} aria-hidden="true" /><input id="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.search} /></div>
            <div className="filter-row">
              <label className="field-label" htmlFor="state-select">{t.state}</label>
              <div className="select-wrap"><select id="state-select" value={stateCode} onChange={(event) => { zipLookupRequestRef.current += 1; setZip(''); setZipOrigin(null); setNotice(''); void changeState(event.target.value) }} aria-label={t.state}>{US_STATES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></div>
            </div>
            <div className="filter-row">
              <label className="field-label" htmlFor="city-select">{t.city}</label>
              <div className="select-wrap"><select id="city-select" value={city} onChange={(event) => setCity(event.target.value)} disabled={citiesLoading} aria-label={t.city}><option value="">{citiesLoading ? t.loadingCities : t.allCities}</option>{cities.map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></div>
            </div>
            <div className="filter-row">
              <label className="field-label" htmlFor="zip-filter">{t.zipCode}</label>
              <div className="zip-input-wrap"><input id="zip-filter" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="[0-9]{5}" value={zip} onChange={(event) => void changeZip(event.target.value)} placeholder="e.g. 33130" aria-label={t.zipCode} aria-describedby="zip-hint" /></div><p className="zip-help" id="zip-hint">{t.zipHint}</p>
            </div>
            <div className="filter-row">
              <label className="field-label" htmlFor="age-select">{t.age}</label>
              <div className="select-wrap"><select id="age-select" value={age} onChange={(event) => setAge(event.target.value)}><option value="Any age">{t.ageAny}</option><option value="0–3 years">{t.age0}</option><option value="4–7 years">{t.age4}</option><option value="8–12 years">{t.age8}</option><option value="13+ years">{t.ageTeen}</option></select><ChevronDown size={15} aria-hidden="true" /></div>
            </div>
            <div className="filter-row">
              <label className="field-label" htmlFor="radius-select">{t.distance}</label>
              <div className="select-wrap"><select id="radius-select" value={radius} onChange={(event) => setRadius(event.target.value)}><option value="1">{t.radiusOne}</option><option value="3">{t.radiusThree}</option><option value="5">{t.radiusFive}</option><option value="10">{t.radiusTen}</option></select><ChevronDown size={15} aria-hidden="true" /></div>
            </div>
            <div className="filter-divider" />
            <p className="field-label category-heading">{t.category}</p>
            <div className="category-list" role="group" aria-label={t.category}>
              {categoryList.map((item) => <button key={item} className={`category-option ${category === item ? 'selected' : ''}`} onClick={() => { setCategory(item); setSavedOnly(false) }} aria-pressed={category === item}><span className={`category-glyph ${item.toLowerCase().replace(/\s+/g, '-')}`}><CategoryGlyph category={item} size={16} /></span><span>{t[categoryTranslation[item]]}</span>{item === 'All' && <span className="category-total">{resources.length}</span>}</button>)}
            </div>
            <div className="filter-divider lower-divider" />
            <label className="check-row"><input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} /><span className="custom-check"><Check size={12} aria-hidden="true" /></span><span>{t.freeOnly}</span></label>
            <label className="check-row"><input type="checkbox" checked={snapOnly} onChange={(event) => setSnapOnly(event.target.checked)} /><span className="custom-check"><Check size={12} aria-hidden="true" /></span><span>{t.snapOnly}</span></label>
            <div className="sidebar-prompt"><span className="prompt-spark"><Sparkles size={16} aria-hidden="true" /></span><div><strong>{t.submitTitle}</strong><p>{t.submitCopy}</p><button onClick={() => openResourceForm()}>{t.submitCta}<ArrowRight size={14} aria-hidden="true" /></button></div></div>
          </aside>

          <section className="results-section" aria-label={savedOnly ? t.savedTitle : t.all}>
            {savedOnly ? <div className="saved-heading"><div><p className="section-kicker"><Bookmark size={14} aria-hidden="true" />{t.navSaved}</p><h2>{t.savedTitle}</h2><p>{t.savedCopy}</p></div><span className="saved-total">{saved.length} {language === 'en' ? 'saved' : 'guardados'}</span></div> : <>
              <div className="category-strip" aria-label={t.category}>
                {categoryList.map((item) => <button key={item} className={`category-pill ${category === item ? 'selected' : ''}`} onClick={() => { setCategory(item); setSavedOnly(false) }} aria-pressed={category === item}><CategoryGlyph category={item} size={15} />{t[categoryTranslation[item]]}</button>)}
              </div>
              <div className="results-heading"><div><p className="section-kicker"><MapPin size={14} aria-hidden="true" />{city ? `${city}, ${US_STATES.find((item) => item.code === stateCode)?.name ?? stateCode}` : US_STATES.find((item) => item.code === stateCode)?.name ?? stateCode}</p><h2>{filtered.length} <span>{t.results}</span></h2></div><div className="results-controls"><span className="sort-label"><ArrowDownWideNarrow size={15} aria-hidden="true" />{t.nearest}</span><div className="view-switch" role="group" aria-label={language === 'en' ? 'View mode' : 'Modo de vista'}><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-pressed={view === 'list'} aria-label={t.list}><List size={16} aria-hidden="true" /><span>{t.list}</span></button><button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')} aria-pressed={view === 'map'} aria-label={t.map}><MapPinned size={16} aria-hidden="true" /><span>{t.map}</span></button></div></div></div>
            </>}

            {notice && <div className="sr-only" role="status" aria-live="polite">{notice}</div>}
            {view === 'map' && !savedOnly ? <div className="map-panel"><div className="map-caption"><span className="map-caption-dot" />{filtered.length} {language === 'en' ? 'places on the map' : 'lugares en el mapa'}<span>{t.mapAccuracy}</span></div><MapView resources={filtered} onSelect={(resource) => { const match = resources.find((item) => item.id === resource.id); if (match) setActiveResource(match) }} /></div> : null}

            {filtered.length > 0 ? <div className={view === 'map' && !savedOnly ? 'resource-list map-list' : 'resource-list'}>
              {filtered.map((resource) => {
                const isSaved = saved.some((item) => item.id === resource.id)
                return <article className="resource-card" key={resource.id}>
                  <button className={`resource-art ${resource.imageTone}${resource.imageUrl ? ' has-thumbnail' : ''}`} onClick={() => setActiveResource(resource)} aria-label={`${t.details}: ${resource.title}`}>{resource.imageUrl && <Image className="resource-thumbnail" src={resource.imageUrl} alt="" fill sizes="(max-width: 680px) 30vw, 184px" unoptimized />}<div className="art-shape art-shape-one" /><div className="art-shape art-shape-two" /><span className="art-category"><CategoryGlyph category={resource.category} size={15} />{t[categoryLabelKey[resource.category]]}</span><span className="art-illustration"><CategoryGlyph category={resource.category} size={31} /></span></button>
                  <div className="resource-content">
                    <div className="resource-topline"><span className={`cost-badge ${resource.cost}`}>{resource.cost === 'free' ? <Check size={12} aria-hidden="true" /> : <Heart size={11} aria-hidden="true" />}{resource.cost === 'free' ? t.free : resource.cost === 'sliding' ? t.sliding : t.low}</span><button className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSaved(resource)} aria-label={isSaved ? `${t.saved}: ${resource.title}` : `${t.save}: ${resource.title}`} aria-pressed={isSaved}><Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" /></button></div>
                    {resource.cost !== 'free' && <p className="resource-cost-note">{resource.costNote}</p>}
                    <button className="resource-title" onClick={() => setActiveResource(resource)}>{resource.title}</button>
                    <p className="resource-date"><Clock3 size={14} aria-hidden="true" />{resource.date}</p>
                    <p className="resource-address"><MapPin size={14} aria-hidden="true" /><span>{resource.address}</span><span className="distance">{resource.distance.toFixed(1)} mi</span></p>
                    <div className="resource-meta"><span className="age-pill"><Baby size={13} aria-hidden="true" />{resource.age}</span>{resource.benefits.some((benefit) => /snap|ebt/i.test(benefit)) && <span className="snap-pill">{t.snapAccepted}</span>}</div>
                    <div className="resource-card-actions"><button className="card-details" onClick={() => setActiveResource(resource)}>{t.details}<ArrowRight size={14} aria-hidden="true" /></button>{submissions.some((item) => item.id === resource.id) && <button className="card-edit" onClick={() => editResource(resource)} aria-label={`${t.edit}: ${resource.title}`}><FilePenLine size={13} aria-hidden="true" />{t.edit}</button>}</div>
                  </div>
                </article>
              })}
            </div> : <div className="empty-state"><span className="empty-icon"><Search size={21} aria-hidden="true" /></span><h3>{savedOnly ? t.noSaved : t.noResults}</h3><p>{savedOnly ? t.noSavedCopy : t.noResultsCopy}</p><button onClick={savedOnly ? () => setSavedOnly(false) : clearFilters}>{savedOnly ? t.browse : t.reset}<ArrowRight size={14} aria-hidden="true" /></button></div>}
            <p className="data-footnote"><span className="footnote-heart"><Heart size={13} fill="currentColor" aria-hidden="true" /></span>{t.resourceNote}</p>
          </section>
        </div>

        {activeResource && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveResource(null) }}><section className="resource-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button className="modal-close" onClick={() => setActiveResource(null)} aria-label={language === 'en' ? 'Close details' : 'Cerrar detalles'}><X size={18} aria-hidden="true" /></button><div className={`detail-art ${activeResource.imageTone}${activeResource.imageUrl ? ' has-thumbnail' : ''}`}>{activeResource.imageUrl && <Image className="resource-thumbnail" src={activeResource.imageUrl} alt="" fill sizes="550px" unoptimized />}{!activeResource.imageUrl && <span className="art-illustration"><CategoryGlyph category={activeResource.category} size={34} /></span>}<span className={`cost-badge ${activeResource.cost}`}>{activeResource.cost === 'free' ? t.free : activeResource.cost === 'sliding' ? t.sliding : t.low}</span></div><div className="detail-body"><p className="section-kicker"><CategoryGlyph category={activeResource.category} size={14} />{t[categoryLabelKey[activeResource.category]]} · {activeResource.distance.toFixed(1)} mi</p><h2 id="detail-title">{activeResource.title}</h2><p className="detail-description">{activeResource.description}</p><div className="detail-facts"><div><span className="fact-icon"><Clock3 size={15} aria-hidden="true" /></span><div><small>{t.open}</small><strong>{activeResource.date}</strong></div></div><div><span className="fact-icon"><Baby size={15} aria-hidden="true" /></span><div><small>{t.ageLabel}</small><strong>{activeResource.age}</strong></div></div><div><span className="fact-icon"><DollarSign size={15} aria-hidden="true" /></span><div><small>{t.cost}</small><strong className="detail-cost-amount">{activeResource.costNote}</strong></div></div><div><span className="fact-icon"><MapPin size={15} aria-hidden="true" /></span><div><small>{t.address}</small><strong>{activeResource.address}</strong></div></div><div><span className="fact-icon"><Phone size={15} aria-hidden="true" /></span><div><small>{t.contact}</small><strong><a href={`tel:${activeResource.phone.replace(/[^\d+]/g, '')}`}>{activeResource.phone}</a></strong><span className="contact-note">{activeResource.contact}</span></div></div></div><div className="detail-benefits">{activeResource.benefits.map((benefit) => <span key={benefit}><Check size={13} aria-hidden="true" />{/snap|ebt/i.test(benefit) ? t.snapAccepted : benefit}</span>)}</div><div className="detail-actions"><button className="share-button" onClick={() => toggleSaved(activeResource)}><Bookmark size={16} aria-hidden="true" />{saved.some((item) => item.id === activeResource.id) ? t.saved : t.save}</button><span className="verify-reminder"><Sparkles size={13} aria-hidden="true" />{t.resourceNote}</span></div></div></section></div>}

        {showForm && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeResourceForm() }}><section className="resource-modal form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><button className="modal-close" onClick={closeResourceForm} aria-label={language === 'en' ? 'Close form' : 'Cerrar formulario'}><X size={18} aria-hidden="true" /></button><div className="form-heading"><span className="form-icon"><Heart size={19} aria-hidden="true" /></span><p className="section-kicker">{language === 'en' ? 'GOOD NEIGHBOR COMMUNITY' : 'COMUNIDAD GOOD NEIGHBOR'}</p><h2 id="form-title">{editingResource ? t.edit : t.formTitle}</h2><p>{editingResource ? t.editFormCopy : t.formCopy}</p></div>{editingResource && <button className="delete-resource-button" type="button" onClick={deleteEditedResource}><Trash2 size={14} aria-hidden="true" />{t.delete}</button>}{notice && <p className="form-error" role="alert">{notice}</p>}<form className="resource-form" onSubmit={submitResource}>
<label>{t.name}<input name="name" defaultValue={editingResource?.title ?? ''} required maxLength={90} placeholder={language === 'en' ? 'e.g. Kids’ storytime' : 'p. ej., Hora de cuentos infantil'} /></label><div className="form-grid category-form-row"><label>{t.type}<select name="category" defaultValue={editingResource?.category ?? 'Events'}><option value="Events">{t.eventsCat}</option><option value="Food">{t.foodCat}</option><option value="Sports">{t.sportsCat}</option><option value="Arts">{t.artsCat}</option><option value="Family Support">{t.familySupportCat}</option><option value="Extracurricular Activities">{t.extracurricularCat}</option></select></label></div><fieldset className="cost-options"><legend>{t.cost}</legend><p className="cost-options-hint">{t.costHint}</p><div className="cost-choice-grid"><label className={`cost-choice${formCost === 'free' ? ' selected' : ''}`}><input type="radio" name="cost" value="free" checked={formCost === 'free'} onChange={() => setFormCost('free')} /><span className="cost-choice-copy"><strong>{t.freeCostTitle}</strong><small>{t.freeCostCopy}</small></span></label><label className={`cost-choice${formCost === 'sliding' ? ' selected' : ''}`}><input type="radio" name="cost" value="sliding" checked={formCost === 'sliding'} onChange={() => setFormCost('sliding')} /><span className="cost-choice-copy"><strong>{t.slidingCostTitle}</strong><small>{t.slidingCostCopy}</small></span></label><label className={`cost-choice${formCost === 'low' ? ' selected' : ''}`}><input type="radio" name="cost" value="low" checked={formCost === 'low'} onChange={() => setFormCost('low')} /><span className="cost-choice-copy"><strong>{t.fixedCostTitle}</strong><small>{t.fixedCostCopy}</small></span></label></div></fieldset>{formCost !== 'free' && <label key={formCost} className="cost-details-field">{formCost === 'sliding' ? t.slidingDetailsLabel : t.costDetailsLabel}<input name="costDetails" type="text" defaultValue={editingResource && editingResource.cost !== 'free' && !['low cost', 'sliding scale'].includes(editingResource.costNote.toLocaleLowerCase()) ? editingResource.costNote : ''} required={formCost === 'low'} maxLength={90} placeholder={formCost === 'sliding' ? t.slidingCostPlaceholder : t.fixedCostPlaceholder} /><span className="cost-details-hint">{formCost === 'sliding' ? t.slidingDetailsHint : t.costDetailsHint}</span></label>}<fieldset className="schedule-days"><legend>{t.daysOpen}</legend><div className="weekday-options">{WEEKDAYS.map((day, index) => <label className="weekday-option" key={day.value}><input type="checkbox" name="days" value={day.value} defaultChecked={editingResource?.schedule?.days.includes(day.value) ?? false} /><span>{language === 'en' ? day.en : day.es}</span></label>)}</div></fieldset><div className="form-grid"><label>{t.opens}<input name="opens" type="time" defaultValue={editingResource?.schedule?.opens ?? ''} /></label><label>{t.closes}<input name="closes" type="time" defaultValue={editingResource?.schedule?.closes ?? ''} /></label></div><label>{t.scheduleNotes}<input name="schedule-notes" defaultValue={editingResource?.schedule?.notes ?? (editingResource && !editingResource.schedule ? editingResource.date : '')} maxLength={100} placeholder={language === 'en' ? 'e.g. Call ahead for holiday hours' : 'p. ej. Llama para confirmar horarios festivos'} /></label><label>{t.ageField}<select name="age" defaultValue={editingResource?.age ?? 'All ages'}>{editingResource?.age && !['All ages', '0–3 years', '4–7 years', '8–12 years', '13+ years'].includes(editingResource.age) && <option value={editingResource.age}>{editingResource.age}</option>}<option value="All ages">{t.ageAll}</option><option value="0–3 years">{t.age0}</option><option value="4–7 years">{t.age4}</option><option value="8–12 years">{t.age8}</option><option value="13+ years">{t.ageTeen}</option></select></label>
<label>{t.addressField}<input name="address" defaultValue={editingResource?.address ?? ''} required maxLength={120} placeholder={language === 'en' ? 'Street address' : 'Dirección'} /></label>
<div className="form-grid"><label>{t.stateField}<select name="state" value={formStateCode} onChange={(event) => { setFormStateCode(event.target.value); void loadFormCities(event.target.value) }}>{US_STATES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label><label>{t.cityField}<select name="city" value={formCity} required disabled={formCitiesLoading} onChange={(event) => setFormCity(event.target.value)}><option value="">{formCitiesLoading ? t.loadingCities : t.chooseCity}</option>{formCity && !formCities.includes(formCity) && <option value={formCity}>{formCity}</option>}{formCities.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div><label>{t.zipField}<input name="zip" defaultValue={editingResource?.zip ?? ''} required inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="[0-9]{5}" placeholder="e.g. 33130" onChange={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 5) }} /></label><p className="form-location-hint">{t.zipPinHint}</p><div className="form-grid"><label>{t.contactField}<input name="phone" defaultValue={editingResource?.phone ?? ''} maxLength={80} placeholder="(215) 555-0100" /></label></div><label>{t.description}<textarea name="description" defaultValue={editingResource?.description ?? ''} maxLength={360} rows={3} placeholder={language === 'en' ? 'What should families know?' : '¿Qué deben saber las familias?'} /></label>
<div className="thumbnail-field"><span className="thumbnail-field-title">{t.thumbnailTitle}</span><div className="thumbnail-choice"><div className="thumbnail-preview" role="img" aria-label={selectedThumbnail ? t.thumbnailPreview : t.thumbnailHint}>{selectedThumbnail ? <Image src={selectedThumbnail} alt="" fill sizes="108px" unoptimized /> : <ImagePlus size={25} aria-hidden="true" />}</div><div className="thumbnail-controls"><label className={`thumbnail-picker${isThumbnailProcessing ? ' is-processing' : ''}`} htmlFor="resource-thumbnail"><ImagePlus size={14} aria-hidden="true" /><span aria-live="polite">{isThumbnailProcessing ? t.processingThumbnail : t.chooseThumbnail}</span><input id="resource-thumbnail" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" disabled={isThumbnailProcessing} onChange={(event) => { void handleThumbnailChange(event) }} /></label>{selectedThumbnail && <button className="thumbnail-remove" type="button" disabled={isThumbnailProcessing} onClick={() => { setSelectedThumbnail(''); setThumbnailError('') }}>{t.removeThumbnail}</button>}<p className="thumbnail-hint">{t.thumbnailHint}</p></div></div>{thumbnailError && <p className="thumbnail-error" role="alert">{thumbnailError}</p>}</div><label className="form-check"><input type="checkbox" name="snap" defaultChecked={editingResource?.benefits.some((benefit) => /snap|ebt/i.test(benefit)) ?? false} /><span>{t.snapAccepted}</span></label><div className="form-actions"><button type="button" className="cancel-button" onClick={closeResourceForm}>{t.cancel}</button><button type="submit" className="share-button" disabled={isSubmitting || formCitiesLoading || isThumbnailProcessing}>{editingResource ? t.edit : t.submit}<ArrowRight size={15} aria-hidden="true" /></button></div></form></section></div>}
      </div>
    </main>
  )
}
