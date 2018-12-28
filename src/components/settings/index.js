import React from 'react'
import styled from 'styled-components'

const StyledSettings = styled.div`
    width: 800px;
    height: 600px;
    background: gray;
`

const StyledOverlay = styled.div`
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
`

const Column = styled.div`
    width: 700px;
    height: 550px;
    margin: 25px;
    display: flex;
    flex-direction: column;
`

const ColumnHeader = styled.div`
    width: 100%;
    font-size: 2rem;
    text-align: center;
`

const Option = styled.div`
    display: flex;
    margin-top: 10px;
`

const OptionLabel = styled.div`
    width: 50%;
    text-align: center;
`

const OptionValue = styled.div`
    width: 50%;
    text-align: center;
`

class Settings extends React.Component {
    render () {
        const { closeSettings } = this.props
        const { camera, canvas } = this.props.babylon
        return (
            <StyledOverlay>
                <StyledSettings>
                    <Column>
                        <ColumnHeader>
                            Graphics
                        </ColumnHeader>
                        <Option>
                            <OptionLabel>
                                Fullscreen Recommended
                            </OptionLabel>
                            <OptionValue>
                                Press F11 to toggle fullscreen
                            </OptionValue>
                        </Option>
                        <Option>
                            <OptionLabel>
                                Virtual Reality
                            </OptionLabel>
                            <OptionValue>
                                <button onClick={() => {
                                    camera.attachControl(canvas, true)
                                }}>Attach Headset</button>
                            </OptionValue>
                        </Option>
                        <Option>
                            <OptionLabel>
                                Current # Players: {this.props.playerCount}
                            </OptionLabel>
                            <OptionValue>
                                {
                                    this.props.gameClock
                                    ?
                                        <button onClick={() => {
                                            this.props.endGame()
                                        }}>END GAME</button>
                                    :
                                        <button onClick={() => {
                                            this.props.startGame()
                                            closeSettings()
                                        }}>Start Game</button>
                                }
                            </OptionValue>
                        </Option>
                    </Column>
                </StyledSettings>
            </StyledOverlay>
        )
    }
}

export default Settings
