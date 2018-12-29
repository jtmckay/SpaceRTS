import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { StyledMenu, StyledMenuOption } from 'components/dialog/styles'
import shipShapes from 'components/ships/shapes'
import * as actions from 'utils/actions'

class Ships extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { openDialogMenu, objectManager } = this.props
        const { scene, camera, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        this.props.socket.on('ship', ({ id, owner, type, color, position }) => {
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

            objectManager.add(owner, type, id, shipMesh, this.meshManager)
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
