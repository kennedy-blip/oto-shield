package go_audiology
import "math"
// NIOSHMinutes estimates allowable duration at a constant A-weighted level.
func NIOSHMinutes(db float64) float64 { return 480 * math.Pow(2, (85-db)/3) }
func OSHAMinutes(db float64) float64 { return 480 * math.Pow(2, (90-db)/5) }
func DeratedNRR(nrr float64) float64 { return math.Max(0, (nrr-7)/2) }
