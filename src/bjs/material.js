import uuid from 'uuid/v4'
import BABYLON from 'babylonjs'
import createColor from './color'

export default function createMaterialBuilder (scene, objectManager) {
    function createStandardMaterial(options: {
        diffuseColor: [number],
        emissiveColor: [number]
    }): BABYLON.Mesh {
        const id = uuid()
        const material = new BABYLON.StandardMaterial(id, scene);
        if (options.diffusiveColor) {
            const diffusiveColor = createColor(options.diffusiveColor)
            material.diffusiveColor = diffusiveColor
        }
        if (options.emissiveColor) {
            const emissiveColor = createColor(options.emissiveColor)
            material.emissiveColor = emissiveColor
        }
        objectManager.add(id, material)
        return material
    }

    return {
        createStandardMaterial
    }
}
