import { test } from 'node:test'
import assert from 'node:assert/strict'
import { safeMinutes, oshaMinutes } from '../src/engines/audio.js'
test('NIOSH 3 dB exchange halves time at each 3 dB increase', () => {
 assert.equal(safeMinutes(85), 480)
 assert.equal(safeMinutes(94), 60)
 assert.equal(safeMinutes(103), 7.5)
})
test('OSHA 5 dB exchange halves time at each 5 dB increase', () => {
 assert.equal(oshaMinutes(90), 480)
 assert.equal(oshaMinutes(95), 240)
})
