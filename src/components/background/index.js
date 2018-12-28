import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
// import createMeshBuilder from 'bjs/mesh'
// import createMaterialBuilder from 'bjs/material'

class Background extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene, cameraTransformNode } = this.props.babylon
        // const meshBuilder = createMeshBuilder(scene, this.objectManager)
        // const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000000, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/StarSky", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        skybox.parent = cameraTransformNode
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default Background
