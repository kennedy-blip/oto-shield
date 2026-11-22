package handler
import (
 "encoding/json"
 "net/http"
 "strconv"
 "otoshield/go_audiology"
)
// Handler is an optional server-side calculator; the web UI works without it.
func Handler(w http.ResponseWriter, r *http.Request) {
 db, err := strconv.ParseFloat(r.URL.Query().Get("db"), 64)
 if err != nil || db < 0 || db > 200 { http.Error(w,"provide db between 0 and 200",http.StatusBadRequest); return }
 w.Header().Set("Content-Type","application/json")
 json.NewEncoder(w).Encode(map[string]float64{"niosh_minutes":go_audiology.NIOSHMinutes(db),"osha_minutes":go_audiology.OSHAMinutes(db)})
}
