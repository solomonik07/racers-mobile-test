import React from 'react'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'


const HomeScreenContainer = styled.View`
    height: 100%;
    width: 100%;
`

const LinearGradientStyled = styled(LinearGradient)`
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 100%;
    width: 100%;
`

const WelcomeText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
`

const NextPageText = styled.Text`
    font-size: 20px;
    color: #fff;
`


const Index = ({ navigation }) => {
  return (
    <HomeScreenContainer>
        <LinearGradientStyled
            colors={['#f4f4f4', 'rgb(189,143,242)', 'rgb(62,90,193)']}
        >
            <WelcomeText>Welcome {"\n"} to my simple app </WelcomeText>
            <NextPageText onPress={() => navigation.navigate('TableScreen')}>
                go to app ->
            </NextPageText>
        </LinearGradientStyled>
    </HomeScreenContainer>
  )
}


export default Index
