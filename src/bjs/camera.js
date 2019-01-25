import * as BABYLON from 'babylonjs'

function createArcRotateCamera (scene: BABYLON.Scene, target: BABYLON.Vector3) {
    let camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', -.6 * Math.PI, Math.PI / 2.5, 100, target, scene)
    camera.inertia = 0
    camera.lowerRadiusLimit = 10
    camera.upperRadiusLimit = 800
    camera.angularSensibilityX = 120
    camera.angularSensibilityY = 120
    camera.maxZ = 100000

    return camera
}

function createUniversalCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 0, 0), scene);
    return camera
}

function createWebVrFreeCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.WebVRFreeCamera('WVR', new BABYLON.Vector3(0, 0, 0), scene);
    camera.maxZ = 100000
    return camera
}

function createArcRotateVrCamera (scene: BABYLON.Scene, target) {
    let camera = new BABYLON.VRDeviceOrientationArcRotateCamera('VRArcRotateCamera', -.6 * Math.PI, Math.PI / 2.5, 100, target, scene)
    camera.maxZ = 100000
    return camera
}

export {
    createArcRotateCamera,
    createArcRotateVrCamera,
    createUniversalCamera,
    createWebVrFreeCamera
}
