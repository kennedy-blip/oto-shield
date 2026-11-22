//! Audiology utility mathematics. Not a clinical diagnostic device.
pub mod notched_neuromod;
pub mod spectral_subtraction;
/// Arithmetic mean of four measured thresholds; callers must ensure calibration.
pub fn pure_tone_average(thresholds: [f64; 4]) -> f64 { thresholds.iter().sum::<f64>() / 4.0 }
#[cfg(test)] mod tests { #[test] fn average() { assert_eq!(super::pure_tone_average([5., 10., 10., 15.]),10.); } }
