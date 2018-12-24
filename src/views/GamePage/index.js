import React from 'react'
import styled from 'styled-components'
import * as BABYLON from 'babylonjs'
import { createArcRotateCamera } from 'bjs/camera'
import { createHemisphericLight } from 'bjs/light'
import createObjectManager from 'bjs/objectManager'
import TacticalOveraly from 'components/tacticalOverlay'
import Background from 'components/background'
import Settings from 'components/settings'

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

class GamePage extends React.Component {
    objectManager = createObjectManager()

    state = {
        showSettings: false,
        settings: {
            tacticalOverlay: true
        },
        babylon: {
            scene: null,
            camera: null,
            canvas: null,
            nextFrames: [],
            callstack: [],
            objectManager: {}
        }
    }

    move (getMoves) {
        this.state.babylon.callstack.push(() => {
            return getMoves()
        })
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
            createHemisphericLight(scene)

            this.setState({ babylon: { ...this.state.babylon, scene, camera, canvas } })
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
    }

    componentWillUnmount () {
        window.removeEventListener('resize', resizeHandler)
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = ({ key }) => {
        console.log('key', key)
        if (key === 'Escape') {
            this.setState({ showSettings: !this.state.showSettings })
        }
        if (key === 'F10') {
            this.setState({ showSettings: !this.state.showSettings })
        }
    }

    render () {
        return (
            <StyledGamePage>
                <StyledCanvas id="renderCanvas"></StyledCanvas>
                {this.state.showSettings &&
                    <Settings
                        babylon={this.state.babylon}
                        closeSettings={() => this.setState({ showSettings: false })}
                        setSettings={settings => this.setState({ settings })}
                        />
                }
                {this.state.babylon.scene &&
                    <NoDisplay>
                        <Background babylon={this.state.babylon} />
                        {this.state.settings.tacticalOverlay &&
                            <TacticalOveraly babylon={this.state.babylon} />
                        }
                    </NoDisplay>
                }
            </StyledGamePage>
        )
    }
}

export default GamePage
