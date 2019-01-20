import { getPosition } from 'algorithms/movement'

export default function () {
    const objectMap = {}
    const movementIds = {}

    function move (id, heading) {
        movementIds[id] = true
        objectMap[id].heading = heading
    }

    function preRender () {
        let time = Date.now()
        Object.keys(movementIds).forEach(id => {
            const [x, y, z] = getPosition(time, objectMap[id])
            objectMap[id].mesh.position.x = x
            objectMap[id].mesh.position.y = y
            objectMap[id].mesh.position.z = z
        })
    }

    function add (obj) {
        let { id, owner, type, mesh, meshManager } = obj
        let error = false

        if (!owner) {
            owner = 'non-player'
        }
        if (!type) {
            console.log('error adding object to object manager. Type is required')
            error = true
        }
        if (!id) {
            console.log('error adding object to object manager. Id is required')
            error = true
        }
        if (!mesh) {
            console.log('error adding object to object manager. Mesh is required')
            error = true
        }
        if (!meshManager) {
            console.log('error adding object to object manager. Mesh Manager is required')
            error = true
        }
        if (error) {
            return
        }

        console.log('owner', owner, type, id)
        if (objectMap[id]) {
            remove(id)
            console.log('replaced object', id)
            objectMap[id] = obj
            if (obj.heading) {
                movementIds[id] = true
            }
        } else {
            objectMap[id] = obj
            if (obj.heading) {
                movementIds[id] = true
            }
        }
    }

    function remove (id) {
        objectMap[id].meshManager.remove(id)
        delete objectMap[id]
        delete movementIds[id]
    }

    function removeAll () {
        const ids = Object.keys(objectMap)
        ids.forEach(id => {
            objectMap[id].meshManager.remove(id)
            delete objectMap[id]
            delete movementIds[id]
        })
    }

    return {
        objectMap,
        preRender,
        add,
        remove,
        removeAll,
        move
    }
}
