import uuid from 'uuid/v4'
import * as BABYLON from 'babylonjs';

export default function createMeshBuilder (scene, objectManager) {
    function createPlane(options: {
        size: number,
        position: BABYLON.Vector3,
        rotation: BABYLON.Vector3,
        material: BABYLON.Material,
        alpha?: number
    }): BABYLON.Mesh {
        const id = uuid()
        const plane = BABYLON.MeshBuilder.CreatePlane(id, options, scene)
        objectManager.add(id, plane)
        return plane
    }
    
    function createLines(options: {
        points: [BABYLON.Vector3],
        colors: [BABYLON.Color4]
    }): BABYLON.Mesh {
        const id = uuid()
        const line = BABYLON.MeshBuilder.CreateLines(id, options, scene)
        objectManager.add(id, line)
        return line
    }
    
    function createSphere (options: {
        diameterX: number,
        diameterY: number,
        position: BABYLON.Vector3,
        material: BABYLON.Material
    }) {
        const id = uuid()
        var sphere = BABYLON.MeshBuilder.CreateSphere(id, options, scene)
    
        if (options.position) {
            sphere.position = options.position
        }
        if (options.material) {
            sphere.material = options.material
        } else {
            sphere.material = new BABYLON.StandardMaterial('sphere', scene)
            console.log('Missing color for sphere')
        }

        objectManager.add(id, sphere)

        return sphere
    }

    function createBox (options: {
        size: number,
        width: number,
        height: number,
        depth: number,
        position: BABYLON.Vector3,
        material: BABYLON.Material
    }) {
        const id = uuid()
        const square = BABYLON.MeshBuilder.CreateBox(id, options, scene)
        if (options.position) {
            square.position = options.position
        }
        if (options.material) {
            square.material = options.material
        } else {
            square.material = new BABYLON.StandardMaterial('square', scene)
            console.log('Missing color for square')
        }

        objectManager.add(id, square)

        return square
    }

    return {
        createPlane,
        createLines,
        createSphere,
        createBox
    }
}
