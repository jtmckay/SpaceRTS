import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLandingPage = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledWelcome = styled.div`
    font-size: 2rem;
`

const StyledLink = styled.div`
    margin: 2rem;
    text-align: center;
`

class LandingPage extends React.Component {
    render () {
        return (
            <StyledLandingPage>
                <StyledWelcome>Welcome to Space RTS!</StyledWelcome>
                <StyledLink>
                    <Link to='lobby'>Let's Go!</Link>
                </StyledLink>
            </StyledLandingPage>
        )
    }
}

export default LandingPage
