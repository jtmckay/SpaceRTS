import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { StyledMenu, StyledMenuOption } from 'components/dialog/styles'
import shipShapes from 'components/ships/shapes'

class Ships extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { openDialogMenu, objectManager } = this.props
        const { scene, camera, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        this.props.socket.on('ship_add', ship => {
            const { id, type, color, position } = ship
            const shipMesh = meshBuilder.createSphere(id, {
                ...shipShapes[type],
                material: materialBuilder.createStandardMaterial({ emissiveColor: color }),
                position: new BABYLON.Vector3(position[0], position[1], position[2])
            })

            shipMesh.actionManager = new BABYLON.ActionManager(scene)

            // On right click
            shipMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function (event) {
                openDialogMenu(event.pointerX, event.pointerY, (
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
                            camera.target = shipMesh.position
                            cameraTransformNode.position = shipMesh.position
                            }}>
                            Camera follow
                        </StyledMenuOption>
                    </StyledMenu>
                ))
            }))

            // const button = BABYLON.GUI.Button.CreateSimpleButton('btn');
            // button.color = 'red'
            // button.width = '20px';
            // button.height = '20px';

            objectManager.add({ ...ship, mesh: shipMesh, meshManager: this.meshManager })
        })

        this.props.socket.on('ship_movement_start', data => {
            const { id, heading } = data
            objectManager.move(id, heading)
        })

        this.props.socket.on('ship_movement_stop', data => {
            const { id, position } = data
            objectManager.stop(id, position)
        })
    }

    componetWillUnmount () {
        this.meshManager.removeAll()
    }

    render () {
        return null
    }
}

export default Ships
