import { getPosition } from 'algorithms/movement'

export default function (advancedDynamicTexture) {
    const objectMap = {}
    const movementIds = {}
    const overlay = {}

    function move (id, heading) {
        movementIds[id] = true
        objectMap[id].heading = heading
    }

    function stop (id, position) {
        delete movementIds[id]
        objectMap[id].position = position
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
        let { id, ownerId, type, mesh, meshManager, overlayControl } = obj
        let error = false

        if (!ownerId) {
            ownerId = 'non-player'
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

        // console.log('ownerId', ownerId, type, id)
        if (objectMap[id]) {
            remove(id)
            console.log('replaced object', id)
        }
        
        objectMap[id] = obj

        if (obj.heading) {
            movementIds[id] = true
        }

        if (overlayControl) {
            advancedDynamicTexture.addControl(overlayControl)
            overlay[id] = {
                id,
                control: overlayControl,
                mesh
            }
        }
    }

    function remove (id) {
        objectMap[id].meshManager.remove(id)
        advancedDynamicTexture.removeControl(overlay[id].control)
        delete overlay[id]
        delete objectMap[id]
        delete movementIds[id]
    }

    function removeAll () {
        const ids = Object.keys(objectMap)
        ids.forEach(id => {
            remove(id)
        })
    }

    return {
        overlay,
        objectMap,
        preRender,
        add,
        remove,
        removeAll,
        move,
        stop
    }
}
