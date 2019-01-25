import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'
import { StyledMenu, StyledMenuOption } from 'components/dialog/styles'

class Stations extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { openDialogMenu } = this.props
        const { scene, camera, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        this.props.socket.on('station_add', ({ id, ownerId, size, color, position }) => {
            const stationMesh = meshBuilder.createBox(id, {
                size,
                material: materialBuilder.createStandardMaterial({ emissiveColor: color }),
                position: new BABYLON.Vector3(position[0], position[1], position[2])
            })

            stationMesh.actionManager = new BABYLON.ActionManager(scene)

            // On right click
            stationMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function (event) {
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
                            camera.target = stationMesh.position
                            cameraTransformNode.position = stationMesh.position
                            }}>
                            Camera follow
                        </StyledMenuOption>
                    </StyledMenu>
                ))
            }))

            if (ownerId === this.props.iam.id) {
                console.log('camera', camera)
                camera.position = stationMesh.position
                cameraTransformNode.position = stationMesh.position
            }
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

export default Stations
