export function joinChannel (socket, channel, iam, parent) {
    socket.emit('chat_join', channel, response => {
        if (response) {
            console.log('Successfully joined', channel)
        } else {
            console.log('Failed to join', channel)
        }
    })
    // socket.on('chat_user_list_' + channel, userList => {
    //     setState({ users: userList })
    // })
    // socket.on('chat_user_joined_' + channel, user => {
    //     console.log('user joined', user)
    //     setState({ users: [...state.users.filter(i => i.id !== user.id), user] })
    // })
    // socket.on('chat_user_left_' + channel, user => {
    //     console.log('user left', user)
    //     setState({ users: [...state.users.filter(i => i.id !== user.id)] })
    // })
    socket.on('chat_message_list_' + channel, messageList => {
        console.log('got list', messageList)
        parent.setState({ messages: messageList })
        if (parent.scroll && parent.scroll.current) {
            console.log(parent.scroll.current)
            parent.scroll.current.scrollTop = parent.scroll.current.scrollHeight
        }
    })
    socket.on('chat_message_' + channel, message => {
        parent.setState({ messages: [...parent.state.messages, message] })
        if (parent.scroll && parent.scroll.current) {
            parent.scroll.current.scrollTop = parent.scroll.current.scrollHeight
        }
    })

    return {
        sendMessage: (message) => {
            socket.emit('chat_message', channel, message, response => {
                console.log('Successfully sent message')
            })
        }
    }
}

export function leaveChannel (socket, channel, iam, state, setState) {
    socket.emit('chat_leave', channel, response => {
        console.log('Successfully left', channel)
    })
}
