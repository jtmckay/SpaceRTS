export default function createObjectManager () {
    const objectIds = []
    const objectMap = {}

    function add (id, mesh) {
        if (!objectMap[id]) {
            objectIds.push(id)
            objectMap[id] = mesh
        } else {
            console.log('error: id already exists in object manager')
        }
    }
    
    function remove (idsToRemove) {
        idsToRemove.forEach(id => {
            objectIds.splice(objectIds.findIndex(id), 1)
            objectMap[id].dispose()
            delete objectMap[id]
        })
    }

    function removeAll () {
        objectIds.forEach(id => {
            objectMap[id].dispose()
            delete objectMap[id]
        })
        objectIds.splice(0, objectIds.length)
    }

    return {
        add,
        remove,
        removeAll
    }
}
