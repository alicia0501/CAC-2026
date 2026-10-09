import ResourceFinder from '@/components/resource-finder'
import { getCitiesForState } from '@/lib/locations'

export default function Page() {
  return <ResourceFinder initialCities={getCitiesForState('FL')} />
}

