# OtoShield

A hearing-wellness prototype built with Vue and plain JavaScript. Run `npm install && npm run dev`; build with `npm run build`; run calculation tests with `node --test tests/*.test.js`.

## Safety and limitations
This is **not a medical device**. The audiogram shows example or manually entered values, not measured or calibrated dB HL thresholds. Web audio output and microphones vary by device; do not use this app for diagnosis or occupational exposure compliance. The dosimeter uses selected simulated sound levels, not a live calibrated meter. Exposure estimates assume a constant sound level, and hearing protection estimates assume a good fit. Tinnitus noise is experimental and is not a proven treatment. Use comfortable volume and consult a clinician for hearing concerns.

Records are stored in IndexedDB on the current browser and can be exported as JSON. Clearing browser storage deletes them. No data is synchronized to the cloud. The production build installs a service worker to cache the app shell after the first online visit; external fonts fall back to system fonts offline. This is not a guarantee of availability during an emergency.

The Java and Rust sources are preliminary utilities, not integrated native plugins or a compiled WASM bridge. The Go function is optional. An Android project and signed APK are not yet provided; the Android download is intentionally disabled rather than offering a fabricated package. Role selection is cosmetic, not security enforcement. Speech clarification and calibrated live SPL measurement are not yet implemented.
