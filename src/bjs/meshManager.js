export default function createMeshManager () {
    let meshIds = []
    let meshMap = {}

    function add (id, mesh) {
        if (!meshMap[id]) {
            meshIds.push(id)
            meshMap[id] = mesh
        } else {
            console.log('error: id already exists in mesh manager')
        }
    }
    
    function remove (id) {
        console.log('id', id)
        meshMap[id].dispose()
        meshIds = meshIds.filter(i => i !== id)
        delete meshMap[id]
    }

    function removeSet (idsToRemove) {
        idsToRemove.forEach(id => {
            remove(id)
        })
    }

    function removeAll () {
        if (meshIds.length === 0) {
            return
        }
        meshIds.forEach(id => {
            meshMap[id].dispose()
        })
        meshMap = {}
        meshIds = []
    }

    function getAll () {
        return Object.values(meshMap)
    }

    return {
        getAll,
        add,
        remove,
        removeSet,
        removeAll
    }
}
