// JavaScript fallback; no WebAssembly binary is bundled yet.
export const resetFrequencies = pitch => [0.77, 0.90, 1.11, 1.29].map(ratio => pitch * ratio)
export const pureToneAverage = values => values.reduce((a, b) => a + b, 0) / values.length
