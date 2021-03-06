import localId from 'utils/localId'

export function startGame (socket, players) {
    console.log('starting', localId, players)
    socket.emit('game_start', { id: localId, players }, time => {
        if (time) {
            console.log('Successfully started game')
        } else {
            console.log('Failed to start game')
        }
    })
}

export function endGame (socket) {
    console.log('ending', localId)
    socket.emit('game_end', { id: localId }, response => {
        if (response) {
            console.log('Successfully ended game')
        } else {
            console.log('Failed to end game')
        }
    })
}

export function approach (socket, unitsToOrder, target) {
    socket.emit('command_units_approach_target', { id: localId, unitsToOrder, target }, response => {
        if (response) {
            console.log('Approaching target')
        } else {
            console.log('Failed to approach')
        }
    })
}

export function stop (socket, unitsToOrder) {
    socket.emit('command_units_stop', { id: localId, unitsToOrder }, response => {
        if (response) {
            console.log('Stopping')
        } else {
            console.log('Failed to stop')
        }
    })
}

export function vectorHeading (socket, camera, unitsToOrder, target, speed) {
    socket.emit('command_units_vector_heading', {
        id: localId,
        unitsToOrder,
        target: [
            target.x - camera.target.x,
            target.y - camera.target.y,
            target.z - camera.target.z
        ],
        speed
    }, response => {
        if (response) {
            console.log('Vector locked in')
        } else {
            console.log('Failed to set heading')
        }
    })
}
