import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'

class Planets extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene, camera, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        this.props.socket.on('station', ({ owner, size, color, position }) => {
            const stationMesh = meshBuilder.createBox({
                size,
                material: materialBuilder.createStandardMaterial({ emissiveColor: color }),
                position: new BABYLON.Vector3(position[0], position[1], position[2])
            })

            if (owner === this.props.iam.id) {
                camera.target = stationMesh.position
                camera.alpha = -.6 * Math.PI
                camera.beta = Math.PI / 2.5
                camera.radius = 150
                cameraTransformNode.position = stationMesh.position
            }
        })

        this.props.socket.on('clear_all', () => {
            this.objectManager.removeAll()
        })
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default Planets