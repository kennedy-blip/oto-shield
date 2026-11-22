const DATABASE = 'otoshield'
const STORE = 'records'
const LEGACY_KEY = 'otoshield-records'
let opening
function openDatabase() {
  if (!opening) opening = new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  return opening
}
function transaction(mode, operation) {
  return openDatabase().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const request = operation(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(request.result)
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error || new Error('Storage transaction aborted'))
  }))
}
export async function records() {
  // Import previous versions' records once, removing the old copy only after success.
  const legacy = localStorage.getItem(LEGACY_KEY)
  if (legacy) {
    let entries
    try { entries = JSON.parse(legacy) } catch { entries = [] }
    if (Array.isArray(entries)) {
      for (const entry of entries) await transaction('readwrite', store => store.put({ ...entry, id: entry.id || crypto.randomUUID() }))
    }
    localStorage.removeItem(LEGACY_KEY)
  }
  const all = await transaction('readonly', store => store.getAll())
  return all.sort ( (a, b) => b.date.localeCompare(a.date))
}
export async function saveRecord(record) {
  await transaction('readwrite', store => store.put({ ...record, id: crypto.randomUUID(), date: new Date().toISOString() }))
  return records()
}
export async function deleteRecord(id) {
  await transaction('readwrite', store => store.delete(id))
  return records()
}
