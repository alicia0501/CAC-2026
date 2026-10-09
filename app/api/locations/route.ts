import { NextResponse } from 'next/server'
import { getCitiesForState, validStateCodes } from '@/lib/locations'

type ZipLocation = { city: string; state: string; latitude: number; longitude: number }
type ZipcodeLookup = { lookup: (zip: string) => ZipLocation | undefined }

const zipcodes = require('zipcodes') as ZipcodeLookup

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const zip = searchParams.get('zip')

  if (zip !== null) {
    if (!/^\d{5}$/.test(zip)) {
      return NextResponse.json({ error: 'Enter a valid five-digit US ZIP code.' }, { status: 400 })
    }

    const location = zipcodes.lookup(zip)
    if (!location) {
      return NextResponse.json({ error: 'ZIP code not found.' }, { status: 404 })
    }

    return NextResponse.json(location)
  }

  const state = searchParams.get('state')?.toUpperCase()

  if (!state || !validStateCodes.has(state)) {
    return NextResponse.json({ error: 'Choose a valid US state.' }, { status: 400 })
  }

  return NextResponse.json({ cities: getCitiesForState(state) })
}
