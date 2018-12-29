import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { createOmniLight } from 'bjs/light'

class Sun extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { scene } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        const sun = meshBuilder.createSphere('sol', {
            diameterX: 5000,
            diameterY: 5000,
            diameterZ: 5000,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 1, 0] }),
            position: new BABYLON.Vector3(0, -5000, 0)
        })

        createOmniLight(scene, sun.position)
    }

    componetWillUnmount () {
        this.meshManager.removeAll()
    }

    render () {
        return null
    }
}

export default Sun
