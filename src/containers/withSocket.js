import React from 'react'
import io from 'socket.io-client'
import localId from 'utils/localId'
import { getLocalStorage, setLocalStorage } from 'utils/localStorage'

function withSocket (Component) {
    return class LandingPage extends React.Component {
        state = {
            gamertag: getLocalStorage('gamertag'),
            users: []
        }
        socket = io('http://localhost:3060')

        componentDidMount () {
            this.socket.on('connect', () => {
                this.socket.emit('user_register', { id: localId, name: this.state.gamertag }, response => {
                    if (response) {
                        console.log('Successfully registered')
                    } else {
                        console.log('Failed to register')
                    }
                })
            })
            this.socket.on('user_list', userList => {
                this.setState({ users: userList })
            })
            this.socket.on('user_joined', user => {
                console.log('user joined', user)
                this.setState({ users: [...this.state.users.filter(i => i.id !== user.id), user] })
            })
            this.socket.on('user_left', user => {
                console.log('user left', user)
                this.setState({ users: [...this.state.users.filter(i => i.id !== user.id)] })
            })
        }
    
        componentWillUnmount () {
            this.socket.close()
        }
        render () {
            return <Component
                {...this.props}
                socket={this.socket}
                iam={{ id: localId, name: this.state.gamertag }}
                users={this.state.users}
                setGamertag={gamertag => {
                    setLocalStorage('gamertag', gamertag)
                    this.setState({ gamertag })
                    this.socket.emit('user_register', { id: localId, name: gamertag }, response => {
                        if (response) {
                            console.log('Successfully registered')
                        } else {
                            console.log('Failed to register')
                        }
                    })
                }} /> 
        }
    }
}



export default withSocket
