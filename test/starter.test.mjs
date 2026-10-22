import assert from 'node:assert/strict'
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { checkRepository } from '../scripts/check.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const folder = 'themes/hello-theme'

function scratch(t) {
  const directory = mkdtempSync(join(tmpdir(), 'hibi-theme-starter-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  cpSync(join(root, 'themes'), join(directory, 'themes'), { recursive: true })
  return directory
}
const edit = (directory, file, change) => {
  const path = join(directory, folder, file)
  const value = JSON.parse(readFileSync(path, 'utf8'))
  change(value)
  writeFileSync(path, JSON.stringify(value))
}

test('the repository contains one installable theme with light and dark schemes', () => {
  const [item, ...rest] = checkRepository(root)
  assert.deepEqual(rest, [])
  assert.equal(item.folder, folder)
  assert.equal(item.manifest.kind, 'theme')
  const appearances = item.manifest.themes.map(
    (file) =>
      JSON.parse(readFileSync(join(root, folder, file), 'utf8')).appearance,
  )
  assert.deepEqual(appearances.sort(), ['dark', 'light'])
})

test('the theme also installs on its own from its folder', () => {
  assert.deepEqual(
    checkRepository(join(root, folder)).map((item) => item.folder),
    [''],
  )
})

test('the check rejects files Hibi would refuse', (t) => {
  const directory = scratch(t)
  renameSync(
    join(directory, folder, 'LICENSE.txt'),
    join(directory, folder, 'LICENSE'),
  )
  assert.throws(() => checkRepository(directory), /does not install LICENSE/)
})

test('the check rejects unknown color names and invalid colors', (t) => {
  const directory = scratch(t)
  edit(directory, 'dark.json', (theme) => {
    theme.colors.backgorund = '#000000'
  })
  assert.throws(
    () => checkRepository(directory),
    /unknown color name or invalid hex value: backgorund/,
  )
  edit(directory, 'dark.json', (theme) => {
    delete theme.colors.backgorund
    theme.colors.accent = 'orange'
  })
  assert.throws(
    () => checkRepository(directory),
    /six-digit hex color for accent/,
  )
})

test('the check rejects code in a theme', (t) => {
  const directory = scratch(t)
  edit(directory, 'hibi-addon.json', (manifest) => {
    manifest.entry = 'index.js'
  })
  assert.throws(() => checkRepository(directory), /without code/)
})
