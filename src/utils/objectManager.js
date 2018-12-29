export default function () {
    const objectMap = {}

    function render () {}

    function add (owner, type, id, mesh, meshManager) {
        if (!owner) {
            owner = 'non-player'
        }
        console.log('owner', owner, type, id)
        if (!objectMap[owner]) {
            objectMap[owner] = {}
        }
        if (!objectMap[owner][type]) {
            objectMap[owner][type] = {}
        }
        if (objectMap[owner][type][id]) {
            console.log('error, cannot add an object to object mapper that already exists')
        } else {
            objectMap[owner][type][id] = {
                mesh,
                meshManager
            }
        }
    }

    function remove (owner, type, id) {
        objectMap[owner][type][id].meshManager.remove(id)
        delete objectMap[owner][type][id]
    }

    function removeAll () {
        const owners = Object.keys(objectMap)
        owners.forEach(owner => {
            const types = Object.keys(objectMap[owner])
            types.forEach(type => {
                const ids = Object.keys(objectMap[owner][type])
                ids.forEach(id => {
                    objectMap[owner][type][id].meshManager.removeAll()
                })
            })
            delete objectMap[owner]
        })
    }

    return {
        objectMap,
        render,
        add,
        remove,
        removeAll
    }
}
