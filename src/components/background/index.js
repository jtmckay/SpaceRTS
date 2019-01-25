import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
// import createMeshBuilder from 'bjs/mesh'
// import createMaterialBuilder from 'bjs/material'

class Background extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { scene } = this.props.babylon
        // const meshBuilder = createMeshBuilder(scene, this.meshManager)
        // const materialBuilder = createMaterialBuilder(scene, this.meshManager)

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skybox", 50000, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/StarSky", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
    }

    componetWillUnmount () {
        this.meshManager.removeAll()
    }

    render () {
        return null
    }
}

export default Background
