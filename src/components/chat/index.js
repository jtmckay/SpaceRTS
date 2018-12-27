import React from 'react'
import styled from 'styled-components'
import { joinChannel, leaveChannel } from 'utils/chatChannel'

const StyledChat = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
`

const StyledWelcome = styled.div`
    font-size: 2rem;
`

const MessageScroll = styled.div`
    background-color: lightgray;
    height: 600px;
    width: 400px;
    overflow: auto;
`

const MessageContainer = styled.div`
    min-height: 580px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: flex-end;
`

const StyledMessages = styled.div`

`

const StyledName = styled.span`
    font-weight: bold;
`

const StyledMessage = styled.div`
`

const StyledUserLobby = styled.div`
    margin: 1rem;
`

const StyledUsers = styled.div`
    display: flex;
    flex-direction: column;
`

class Chat extends React.Component {
    state = {
        text: '',
        users: [],
        messages: []
    }

    scroll = React.createRef()

    componentDidMount () {
        console.log('this', this.scroll)
        const { sendMessage } = joinChannel(this.props.socket, 'lobby', this.props.iam, this)
        this.sendMessage = sendMessage
    }

    componentWillUnmount () {
        leaveChannel(this.props.socket, 'lobby', this.props.iam, this)
    }

    render () {
        return (
            <StyledChat>
                <StyledMessages>
                    <MessageScroll ref={this.scroll}>
                        <MessageContainer>
                            {this.state.messages.map((i, index) => {
                                return (
                                    <StyledMessage key={index}>
                                        <StyledName>{i.name}</StyledName>: {i.text}
                                    </StyledMessage>
                                )
                            })}
                        </MessageContainer>
                    </MessageScroll>
                    {this.props.iam.name}&nbsp;
                    <input type='text' value={this.state.text} onChange={e => this.setState({ text: e.target.value })} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.sendMessage({ iam: this.props.iam, text: this.state.text })
                            this.setState({ text: '' })
                        }
                    }} />
                    <button onClick={() => {
                        this.sendMessage({ iam: this.props.iam, text: this.state.text })
                        this.setState({ text: '' })
                    }}>Send Message</button>
                </StyledMessages>
                <StyledUserLobby>
                    <StyledWelcome>Users</StyledWelcome>
                    <StyledUsers>
                        {this.props.users.map(i => {
                            return <div key={i.id}>{i.name}</div>
                        })}
                    </StyledUsers>
                </StyledUserLobby>
            </StyledChat>
        )
    }
}

export default Chat
