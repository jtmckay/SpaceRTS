import React from 'react'
import BABYLON from 'babylonjs'
import createObjectManager from 'bjs/objectManager'
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

function createTactialNotches (meshBuilder, outterLimit, innerLimit, interval, size) {
    let tracker = 0
    if (tracker < innerLimit) {
        tracker = Math.ceil(innerLimit / interval) * interval
    }
    while (tracker <= outterLimit) {
        const startingPoints = getPoints(tracker)
        startingPoints.forEach(point => {
            if (point.x) {
                const test = meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(point.x, 0, -size),
                        new BABYLON.Vector3(point.x, 0, 0)
                    ],
                    colors
                })
                meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(point.x, size, 0),
                        new BABYLON.Vector3(point.x, 0, 0)
                    ],
                    colors
                })
            } else if (point.y) {
                meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(-size, point.y, 0),
                        new BABYLON.Vector3(0, point.y, 0)
                    ],
                    colors
                })
                meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(0, point.y, -size),
                        new BABYLON.Vector3(0, point.y, 0)
                    ],
                    colors
                })
            } else if (point.z) {
                meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(-size, 0, point.z),
                        new BABYLON.Vector3(0, 0, point.z)
                    ],
                    colors
                })
                meshBuilder.createLines({
                    points: [
                        new BABYLON.Vector3(0, size, point.z),
                        new BABYLON.Vector3(0, 0, point.z)
                    ],
                    colors
                })
            }
        })
        tracker += interval
    }
}

class TacticalOverlay extends React.Component {
    objectManager = createObjectManager()

    componentDidMount () {
        const { scene, cameraTransformNode } = this.props.babylon
        const meshBuilder = createMeshBuilder(scene, this.objectManager)
        const outterLimit = 300
        const innerLimit = 10
        createTactialNotches(meshBuilder, outterLimit, innerLimit, 100, 4)
        createTactialNotches(meshBuilder,  outterLimit, innerLimit, 20, 1)
        this.objectManager.getAll().forEach(obj => {
            obj.parent = cameraTransformNode
        })
    }

    componetWillUnmount () {
        this.objectManager.removeAll()
    }

    render () {
        return null
    }
}

export default TacticalOverlay
