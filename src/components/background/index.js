import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
import createMeshBuilder from 'bjs/mesh'
import createMaterialBuilder from 'bjs/material'

class Background extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const materialBuilder = createMaterialBuilder(scene, this.objectManager)

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 7000, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/StarSky", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;


        meshBuilder.createSphere({
            diameterX: 1,
            diameterY: 1,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 0, 0] })
        })

        meshBuilder.createSphere({
            diameterX: 1,
            diameterY: 1,
            material: materialBuilder.createStandardMaterial({ emissiveColor: [1, 0, 0] }),
            position: new BABYLON.Vector3(10, 10, 10)
        })
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default Background
