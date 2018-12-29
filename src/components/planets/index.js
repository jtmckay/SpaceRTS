import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { StyledMenu, StyledMenuOption } from 'components/dialog/styles'

class Planets extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { scene, camera, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        this.props.socket.on('planet', ({ id, size, color, position }) => {
            const planetMesh = meshBuilder.createSphere(id, {
                diameterX: size,
                diameterY: size,
                diameterZ: size,
                material: materialBuilder.createStandardMaterial({ emissiveColor: color }),
                position: new BABYLON.Vector3(position[0], position[1], position[2])
            })

            planetMesh.actionManager = new BABYLON.ActionManager(scene)

            // On right click
            planetMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, (event) => {
                this.props.openDialogMenu(event.pointerX, event.pointerY, (
                    <StyledMenu>
                        <StyledMenuOption onClick={e => console.log('GO')}>
                            Approach
                        </StyledMenuOption>
                        <StyledMenuOption onClick={e => console.log('not this one')}>
                            Orbit at optimal
                        </StyledMenuOption>
                        <StyledMenuOption onClick={e => console.log('not this one')}>
                            FTL drive
                        </StyledMenuOption>
                        <StyledMenuOption onClick={e => {
                            const offset = 1500
                            const newPosition = new BABYLON.Vector3(planetMesh.position.x - offset, planetMesh.position.y + offset, planetMesh.position.z - offset)
                            camera.target = newPosition
                            cameraTransformNode.position = newPosition
                            }}>
                            Camera follow
                        </StyledMenuOption>
                    </StyledMenu>
                ))
            }))
        })

        this.props.socket.on('clear_all', () => {
            this.meshManager.removeAll()
        })
    }

    componetWillUnmount () {
        this.meshManager.removeAll()
    }

    render () {
        return null
    }
}

export default Planets
