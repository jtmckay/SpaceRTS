import React from 'react'
import io from 'socket.io-client'
import localId from 'utils/localId'
import { getLocalStorage } from 'utils/localStorage'

function withGameSocket (Component) {
    return class LandingPage extends React.Component {
        state = {
            offset: 0,
            gameClock: null,
            users: [],
            registered: false,
            gamertag: getLocalStorage('gamertag')
        }
        socket = io('http://localhost:3080')

        componentDidMount () {
            if (this.state.gamertag) {
                this.socket.on('connect', () => {
                    const date = Date.now()
                    this.socket.emit('user_register', { id: localId, name: this.state.gamertag, date }, serverNow => {
                        if (serverNow) {
                            console.log('Successfully registered')
                            this.setState({ registered: true, offset: serverNow-date })
                        } else {
                            console.log('Failed to register')
                        }
                    })
                    this.socket.emit('game_connect')
                })
                this.socket.on('game_time', gameClock => {
                    this.setState({ gameClock: gameClock-this.state.offset })
                })
                this.socket.on('user_list', userList => {
                    this.setState({ users: userList })
                })
                this.socket.on('user_joined', user => {
                    this.setState({ users: [...this.state.users.filter(i => i.id !== user.id), user] })
                })
                this.socket.on('user_left', user => {
                    this.setState({ users: [...this.state.users.filter(i => i.id !== user.id)] })
                })
            }
        }

        componentWillUnmount () {
            this.socket.close()
        }

        render () {
            return <Component
                {...this.props}
                setGameClock={time => this.setState({ gameClock: time && time - this.state.offset })}
                gameClock={this.state.gameClock}
                socket={this.socket}
                iam={{ id: localId, name: this.state.gamertag }}
                users={this.state.users}
                />
        }
    }
}

export default withGameSocket
