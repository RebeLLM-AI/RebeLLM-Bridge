import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (f: string) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8')

describe('package metadata', () => {
  it('names the RebeLLM authors and the RebeLLM-AI repository, and no company', () => {
    const pkg = JSON.parse(read('package.json'))
    expect(pkg.author).toBe('RebeLLM')
    expect(pkg.repository.url).toBe('git+https://github.com/RebeLLM-AI/RebeLLM-Bridge.git')
    expect(pkg.bugs.url).toBe('https://github.com/RebeLLM-AI/RebeLLM-Bridge/issues')
    expect(read('LICENSE')).toContain('Licensor: the RebeLLM authors')
    for (const f of ['package.json', 'LICENSE', 'README.md']) expect(read(f)).not.toMatch(/Byteleap/i)
  })
})
