export function getLocalStorage (key) {
    const localString = localStorage.getItem(key)
    return JSON.parse(localString) || null
}

export function setLocalStorage (key, value) {
    const valueString = JSON.stringify(value)
    localStorage.setItem(key, valueString)
}
