import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Accessibility & Contrast', () => {
  it('should have Neon Volt color defined with high-contrast value', () => {
    const globalsCss = fs.readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8')
    expect(globalsCss).toContain('--neon-volt: #C6FF00')
    expect(globalsCss).toContain('--background: #050505')
  })
})
