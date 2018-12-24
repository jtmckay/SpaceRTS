import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'

function movePoint (pointA, pointB) {
    pointA.x += pointB.x
    pointA.y += pointB.y
    pointA.z += pointB.z
}

async function movePerSecond (position, point) {
    await new Promise(resolve => setTimeout(resolve, 7))
    movePoint(position, point)
    movePerSecond(position, point)
}

class Ships extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene, camera } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        const sphere1 = meshBuilder.createSphere({
            diameterX: 1,
            diameterY: 1,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 0, 0] }),
            position: new BABYLON.Vector3(0, 0, 0)
        })

        camera.target = sphere1

        const sphere2 = meshBuilder.createSphere({
            diameterX: 1,
            diameterY: 1,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 0, 0] }),
            position: new BABYLON.Vector3(10, 10, 10)
        })

        movePerSecond(sphere1.position, new BABYLON.Vector3(0, 0, .01))
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default Ships
