import uuid from 'uuid/v4'
import { getLocalStorage, setLocalStorage } from './localStorage'

let localId = getLocalStorage('localId')
if (!localId) {
    localId = uuid()
    setLocalStorage('localId', localId)
}

export default localId
