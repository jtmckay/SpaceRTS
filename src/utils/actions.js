import localId from 'utils/localId'

export function startGame (socket, setGameClock, players) {
    console.log('starting', localId, players)
    socket.emit('game_start', { id: localId, players }, time => {
        if (time) {
            console.log('Successfully started game')
            setGameClock(time)
        } else {
            console.log('Failed to start game')
        }
    })
}

export function endGame (socket, setGameClock) {
    console.log('ending', localId)
    socket.emit('game_end', { id: localId }, response => {
        if (response) {
            console.log('Successfully ended game')
            setGameClock(null)
        } else {
            console.log('Failed to end game')
        }
    })
}
