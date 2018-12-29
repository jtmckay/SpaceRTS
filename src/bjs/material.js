import uuid from 'uuid/v4'
import BABYLON from 'babylonjs'
import createColor from './color'

export default function createMaterialBuilder (scene, meshManager) {
    function createStandardMaterial(options: {
        diffuseColor: [number],
        emissiveColor: [number]
    } = {}): BABYLON.Mesh {
        const id = uuid()
        const material = new BABYLON.StandardMaterial(id, scene);
        if (!options.diffusiveColor) {
            material.diffuseColor = new BABYLON.Color3(1, 1, 1)
        } else {
            const diffusiveColor = createColor(options.diffusiveColor)
            material.diffusiveColor = diffusiveColor
        }
        if (!options.emissiveColor) {
            material.emissiveColor = new BABYLON.Color3(1, 1, 1)
        } else {
            const emissiveColor = createColor(options.emissiveColor)
            material.emissiveColor = emissiveColor
        }
        meshManager.add(id, material)
        return material
    }

    return {
        createStandardMaterial
    }
}
