import React from 'react'
import styled from 'styled-components'

const StyledDialog = styled.div`
    position: absolute;
    background: white;
    width: 200px;
`

class Planets extends React.Component {
    render () {
        const {
            contents,
            positionX,
            positionY
        } = this.props

        if (!contents) {
            return null
        }

        return (
            <StyledDialog style={{ top: positionY, left: positionX }} onContextMenu={e => {
                e.preventDefault()
            }}>
                {contents}
            </StyledDialog>
        )
    }
}

export default Planets
