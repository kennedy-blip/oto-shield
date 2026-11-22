//! Frequency helpers, not a medical treatment recommendation.
pub fn reset_frequencies(pitch: f64) -> [f64; 4] { [pitch * 0.77, pitch * 0.90, pitch * 1.11, pitch * 1.29] }
/// RBJ cookbook notch filter normalized coefficients [b0,b1,b2,a1,a2].
pub fn notch(frequency: f64, sample_rate: f64, q: f64) -> [f64; 5] {
 let w = 2.0 * std::f64::consts::PI * frequency / sample_rate;
 let alpha = w.sin() / (2.0 * q); let a0 = 1.0 + alpha;
 [1.0/a0, -2.0*w.cos()/a0, 1.0/a0, -2.0*w.cos()/a0, (1.0-alpha)/a0]
}
