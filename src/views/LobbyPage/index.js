import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getLocalStorage } from 'utils/localStorage'
import withLobbySocket from 'containers/withLobbySocket'
import Chat from 'components/chat'

const StyledLobbyPage = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
`

const StyledGamerTagPage = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledWelcome = styled.div`
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
`

const StyledGameLobby = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`

const StyledGamertag = styled.div`
    font-weight: bold;
    width: 100%;
    text-align: center;
`

const StyledLink = styled.div`
    margin: 1rem;
    text-align: center;
`

const StyledButton = styled.button`
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
`

class LobbyPage extends React.Component {
    state = {
        gamertag: this.props.iam.name,
        tbGamertag: getLocalStorage('gamertag') || '',
        users: this.props.users
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ gamertag: nextProps.iam.name, users: nextProps.users })
    }

    render () {
        if (this.state.gamertag) {
            return (
                <div>
                    <StyledWelcome>Lobby</StyledWelcome>
                    <StyledLobbyPage>
                        <StyledGameLobby>
                            <StyledGamertag>{this.state.gamertag}</StyledGamertag>
                            <StyledButton onClick={() => {
                                this.setState({ gamertag: null })
                            }}>Change gamertag</StyledButton>
                            <StyledLink>
                                T~WER's Game <Link to='game'>JOIN GAME</Link>
                            </StyledLink>
                        </StyledGameLobby>
                        <Chat
                            socket={this.props.socket}
                            channel='lobby'
                            iam={this.props.iam}
                            users={this.state.users}
                            />
                    </StyledLobbyPage>
                </div>
            )
        } else {
            return (
                <div>
                    <StyledWelcome>Lobby</StyledWelcome>
                    <StyledGamerTagPage>
                        <span>
                            Please choose your gamertag to continue
                        </span>
                        <div>Gamertag: </div><input type='text' onChange={e => this.setState({ tbGamertag: e.target.value })} value={this.state.tbGamertag} />
                        <StyledButton onClick={() => this.props.setGamertag(this.state.tbGamertag)}>continue</StyledButton>
                    </StyledGamerTagPage>
                </div>
            )
        }
    }
}

export default withLobbySocket(LobbyPage)
