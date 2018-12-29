import React from 'react'
import BABYLON from 'babylonjs'
import createMeshManager from 'bjs/meshManager'
import createMeshBuilder from 'bjs/mesh'

const colors = [new BABYLON.Color4(0.5, .5, 1, 0), new BABYLON.Color4(0.5, .5, 1, .5)]

// function combinePoints (pointA, pointB) {
//     return new BABYLON.Vector3(pointA.x + pointB.x, pointA.y + pointB.y, pointA.z + pointB.z)
// }

function getPoints (distance) {
    const top = new BABYLON.Vector3(0, distance, 0)
    const bottom = new BABYLON.Vector3(0, -distance, 0)
    const right = new BABYLON.Vector3(distance, 0, 0)
    const left = new BABYLON.Vector3(-distance, 0, 0)
    const back = new BABYLON.Vector3(0, 0, -distance)
    const front = new BABYLON.Vector3(0, 0, distance)
    return [top, bottom, right, left, back, front]
}

// function createTacticalLines (meshBuilder, outterLimit, innerLimit) {
//     const outerPoints = getPoints(outterLimit)
//     const innerPoints = getPoints(innerLimit)
//     outerPoints.forEach((outerPoint, index) => {
//         meshBuilder.createLines({ points: [innerPoints[index], outerPoint] })
//     })
// }

function createTacticalNotches (meshBuilder, outterLimit, innerLimit, interval, size) {
    let tracker = 0
    if (tracker < innerLimit) {
        tracker = Math.ceil(innerLimit / interval) * interval
    }
    function handlePoint (point, index) {
        if (point.x) {
            meshBuilder.createLines('x1' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(point.x, 0, -size),
                    new BABYLON.Vector3(point.x, 0, 0)
                ],
                colors
            })
            meshBuilder.createLines('x2' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(point.x, size, 0),
                    new BABYLON.Vector3(point.x, 0, 0)
                ],
                colors
            })
        } else if (point.y) {
            meshBuilder.createLines('y1' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(-size, point.y, 0),
                    new BABYLON.Vector3(0, point.y, 0)
                ],
                colors
            })
            meshBuilder.createLines('y2' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(0, point.y, -size),
                    new BABYLON.Vector3(0, point.y, 0)
                ],
                colors
            })
        } else if (point.z) {
            meshBuilder.createLines('z1' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(-size, 0, point.z),
                    new BABYLON.Vector3(0, 0, point.z)
                ],
                colors
            })
            meshBuilder.createLines('z2' + tracker + '_' + index + '_' + interval, {
                points: [
                    new BABYLON.Vector3(0, size, point.z),
                    new BABYLON.Vector3(0, 0, point.z)
                ],
                colors
            })
        }
    }
    while (tracker <= outterLimit) {
        const startingPoints = getPoints(tracker)
        startingPoints.forEach(handlePoint)
        tracker += interval
    }
}

class TacticalOverlay extends React.Component {
    meshManager = createMeshManager()

    componentDidMount () {
        const { scene, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.meshManager)
        const outterLimit = 300
        const innerLimit = 10
        createTacticalNotches(meshBuilder, outterLimit, innerLimit, 100, 4)
        createTacticalNotches(meshBuilder,  outterLimit, innerLimit, 20, 1)
        this.meshManager.getAll().forEach(obj => {
            obj.parent = cameraTransformNode
        })
    }

    componetWillUnmount () {
        this.meshManager.removeAll()
    }

    render () {
        return null
    }
}

export default TacticalOverlay
