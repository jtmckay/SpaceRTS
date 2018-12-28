import * as BABYLON from 'babylonjs'

function createHemisphericLight (scene: BABYLON.Scene, color = new BABYLON.Color3(.1, .1, .1)) {
    let hemisphericLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene)
    hemisphericLight.diffuse = color
    return hemisphericLight
}

function createOmniLight (scene: BABYLON.Scene, position, color = new BABYLON.Color3(1, 1, 1)) {
    let light = new BABYLON.PointLight("Omni", position, scene)
    light.diffuse = color
    light.specular = color
    return light
}

export { createHemisphericLight, createOmniLight }
