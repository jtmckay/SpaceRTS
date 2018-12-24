import BABYLON from 'babylonjs'

export default function createColor ([r, g, b, alpha]) {
    if (alpha) {
        return new BABYLON.Color4(r, g, b, alpha)
    } else {
        return new BABYLON.Color3(r, g, b)
    }
}
