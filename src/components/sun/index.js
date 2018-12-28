import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { createOmniLight } from 'bjs/light'

class Sun extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        const sun = meshBuilder.createSphere({
            diameterX: 5000,
            diameterY: 5000,
            diameterZ: 5000,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 1, 0] }),
            position: new BABYLON.Vector3(0, -5000, 0)
        })

        createOmniLight(scene, sun.position)
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default Sun
