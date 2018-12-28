import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'

class Planets extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        this.props.socket.on('planet', ({ size, color, position }) => {
            meshBuilder.createSphere({
                diameterX: size,
                diameterY: size,
                diameterZ: size,
                material: materialBuilder.createStandardMaterial({ emissiveColor: color }),
                position: new BABYLON.Vector3(position[0], position[1], position[2])
            })
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
