import * as BABYLON from 'babylonjs'

function createArcRotateCamera (scene: BABYLON.Scene, target: BABYLON.Vector3) {
    let camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', -.6*Math.PI, Math.PI/2.5, 100, target, scene)
    camera.inertia = 0
    camera.lowerRadiusLimit = 10
    camera.upperRadiusLimit = 800
    camera.angularSensibilityX = 120
    camera.angularSensibilityY = 120
    camera.maxZ = 1000000

    return camera
}

function createUniversalCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 0, 0), scene);
    return camera
}

function createWebVRFreeCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.WebVRFreeCamera('WVR', new BABYLON.Vector3(0, 0, 0), scene);
    return camera
}

function createVRFreeCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.VRDeviceOrientationFreeCamera('VRFreeCamera', new BABYLON.Vector3(0, 0, 0), scene)
    camera.maxZ = 1000000
    return camera
}

function createArcRotateVRCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.ArcRotateCameraVRDeviceOrientationInput('VRFreeCamera')
    camera.maxZ = 1000000
    return camera
}

export {
    createArcRotateCamera,
    createArcRotateVRCamera,
    createUniversalCamera,
    createWebVRFreeCamera,
    createVRFreeCamera
}
