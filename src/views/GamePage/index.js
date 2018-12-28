import React from 'react'
import withGameSocket from 'containers/withGameSocket'
import styled from 'styled-components'
import * as BABYLON from 'babylonjs'
import { createArcRotateCamera } from 'bjs/camera'
import { createOmniLight } from 'bjs/light'
import Dialog from 'components/dialog'
import TacticalOveraly from 'components/tacticalOverlay'
import Background from 'components/background'
import Settings from 'components/settings'
import Sun from 'components/sun'
import Planets from 'components/planets'
import Stations from 'components/stations'
import * as actions from 'utils/actions'

const StyledGamePage = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    touch-action: none;
`

const NoDisplay = styled.div`
    visibility: hidden;
`

let resizeHandler

const dialogDefault = {
    contents: null,
    positionX: 0,
    positionY: 0,
}

class GamePage extends React.Component {
    state = {
        dialog: dialogDefault,
        showSettings: false,
        settings: {
            tacticalOverlay: true
        },
        babylon: {
            scene: null,
            camera: null,
            canvas: null
        }
    }

    componentDidMount () {
        // Get the canvas DOM element
        const canvas = document.getElementById('renderCanvas')
        let camera
        // Load the 3D engine
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })

        // CreateScene function that creates and return the scene
        const createScene = () => {
            // Create a basic BJS Scene object
            const scene = new BABYLON.Scene(engine)
            camera = createArcRotateCamera(scene)
            camera.attachControl(canvas, false, false, false)
            createOmniLight(scene, camera.position, new BABYLON.Color3(.2, .2, .2))

            var cameraTransformNode = new BABYLON.TransformNode("root")
            cameraTransformNode.position = new BABYLON.Vector3(0, 0, 0)
            this.setState({ babylon: {
                ...this.state.babylon,
                scene,
                camera,
                canvas,
                cameraTransformNode
            } })
            return scene
        }

        // call the createScene function
        createScene()

        // run the render loop
        engine.runRenderLoop(() => {
            this.state.babylon.scene.render()
        })

        // the canvas/window resize event handler
        resizeHandler = function () {
            engine.resize()
        }
        window.addEventListener('resize', resizeHandler)
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('click', this.handleMouseDown)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', resizeHandler)
        window.removeEventListener('keydown', this.handleKeyDown)
        window.removeEventListener('click', this.handleMouseDown)
    }

    handleKeyDown = ({ key }) => {
        console.log('key', key)
        if (key === 'Escape') {
            if (this.state.dialog.contents) {
                this.setState({ dialog: dialogDefault })
            } else {
                this.setState({ showSettings: !this.state.showSettings })
            }
        }
        if (key === 'F10') {
            this.setState({ showSettings: !this.state.showSettings })
        }
    }

    handleMouseDown = () => {
        if (this.state.dialog.contents) {
            this.closeDialogMenu()
        }
    }

    openDialogMenu = (positionX, positionY, contents) => {
        this.setState({ dialog: { positionX, positionY, contents } })
    }

    closeDialogMenu = () => {
        this.setState({ dialog: dialogDefault })
    }

    render () {
        return (
            <StyledGamePage>
                <StyledCanvas id="renderCanvas"></StyledCanvas>
                <Dialog {...this.state.dialog} />
                {this.state.showSettings &&
                    <Settings
                        babylon={this.state.babylon}
                        playerCount={this.props.users.length}
                        gameClock={this.props.gameClock}
                        startGame={() => actions.startGame(this.props.socket, this.props.setGameClock, this.props.users)}
                        endGame={() => actions.endGame(this.props.socket, this.props.setGameClock)}
                        closeSettings={() => this.setState({ showSettings: false })}
                        setSettings={settings => this.setState({ settings })}
                        />
                }
                {this.state.babylon.scene &&
                    <NoDisplay>
                        <Background babylon={this.state.babylon} />
                        <Sun babylon={this.state.babylon} openDialogMenu={this.openDialogMenu} closeDialogMenu={this.closeDialogMenu} />
                        <Planets socket={this.props.socket} iam={this.props.iam} babylon={this.state.babylon} openDialogMenu={this.openDialogMenu} closeDialogMenu={this.closeDialogMenu} />
                        <Stations socket={this.props.socket} iam={this.props.iam} babylon={this.state.babylon} openDialogMenu={this.openDialogMenu} closeDialogMenu={this.closeDialogMenu} />
                        {this.state.settings.tacticalOverlay &&
                            <TacticalOveraly
                                babylon={this.state.babylon}
                                />
                        }
                    </NoDisplay>
                }
            </StyledGamePage>
        )
    }
}

export default withGameSocket(GamePage)
