import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (f: string) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8')

describe('package metadata', () => {
  it('names the RebeLLM authors and the RebeLLM-AI repository, and no company', () => {
    const pkg = JSON.parse(read('package.json'))
    expect(pkg.author).toBe('RebeLLM')
    expect(pkg.repository.url).toBe('git+https://github.com/RebeLLM-AI/RebeLLM-Bridge.git')
    expect(pkg.bugs.url).toBe('https://github.com/RebeLLM-AI/RebeLLM-Bridge/issues')
    expect(pkg.license).toBe('PolyForm-Noncommercial-1.0.0')
    expect(read('LICENSE')).toMatch(/^Required Notice: Copyright \(c\) 2026 the RebeLLM authors/)
    expect(read('LICENSE')).toContain('# PolyForm Noncommercial License 1.0.0')
    for (const f of ['package.json', 'LICENSE', 'README.md']) expect(read(f)).not.toMatch(/Byteleap/i)
  })
})
