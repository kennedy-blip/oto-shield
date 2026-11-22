//! Simple magnitude-domain subtraction; no claim of clinical efficacy.
pub fn subtract(signal: &[f32], noise: &[f32]) -> Vec<f32> { signal.iter().zip(noise).map(|(s,n)| (s-n).max(0.0)).collect() }
