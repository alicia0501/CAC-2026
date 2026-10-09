type ZipRecord = { city: string; state: string }
type ZipcodeLookup = { lookupByState: (state: string) => ZipRecord[] }

const zipcodes = require('zipcodes') as ZipcodeLookup

export function getCitiesForState(state: string) {
  return [...new Set(
    zipcodes.lookupByState(state)
      .filter((record) => record.state === state && record.city)
      .map((record) => record.city.trim()),
  )].sort((first, second) => first.localeCompare(second))
}

export const validStateCodes = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
])
