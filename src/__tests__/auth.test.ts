import { describe, it, expect } from 'vitest'

// We expect this module to exist and export the auth instance
// This import will fail until we create the file
import { auth } from '../lib/auth'

describe('Authentication Configuration', () => {
  it('should export an auth instance', () => {
    expect(auth).toBeDefined()
  })

  it('should be configured with the Prisma adapter', () => {
    // This is a bit of a loose check, but we want to ensure
    // the auth instance is tied to our database
    expect(auth.options.database).toBeDefined()
  })
})
