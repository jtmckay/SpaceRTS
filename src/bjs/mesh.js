import uuid from 'uuid/v4'
import * as BABYLON from 'babylonjs';

export default function createMeshBuilder (scene, objectManager) {
    function createPlane(options: {
        size: number,
        position: BABYLON.Vector3,
        rotation: BABYLON.Vector3,
        material: BABYLON.Material,
        alpha?: number
    }): BABYLON.Mesh {
        const id = uuid()
        const plane = BABYLON.MeshBuilder.CreatePlane(id, options, scene)
        objectManager.add(id, plane)
        return plane
    }
    
    function createLines(options: {
        points: [BABYLON.Vector3],
        colors: [BABYLON.Color4]
    }): BABYLON.Mesh {
        const id = uuid()
        const line = BABYLON.MeshBuilder.CreateLines(id, options, scene)
        objectManager.add(id, line)
        return line
    }
    
    //BABYLON.Mesh.FRONTSIDE
    function createSphere(options: {
        diameterX: number,
        diameterY: number,
        position: BABYLON.Vector3,
        material: BABYLON.Material
    }) {
        const id = uuid()
        var sphere = BABYLON.MeshBuilder.CreateSphere(id, options, scene)
    
        if (options.position) {
            sphere.position = options.position
        }
        if (options.material) {
            sphere.material = options.material
        } else {
            sphere.material = new BABYLON.StandardMaterial('sphere', scene)
            console.log('Missing color for sphere')
        }
    
        sphere.actionManager = new BABYLON.ActionManager(scene)
    
        let oldColor
        //ON MOUSE ENTER
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (event) {
            oldColor = sphere.material.emissiveColor
            sphere.material.emissiveColor = BABYLON.Color3.Blue()
        }));
    
        //ON MOUSE EXIT
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (event) {
            sphere.material.emissiveColor = oldColor
        }));

        objectManager.add(id, sphere)

        return sphere
    }

    return {
        createPlane,
        createLines,
        createSphere
    }
}
