import styled from 'styled-components'

export const NormalText = styled.Text`
    font-weight: normal;
    font-size: 18px;
    color: ${({ disabled }) => disabled ? '#dedede' : '#666'};
`
