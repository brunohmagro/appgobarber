import styled from 'styled-components/native'
import colors from '../../../utils/styles/colors'

interface PropsContainer {
  width: number
  height: number
  background?: string
}

const Container = styled.View<PropsContainer>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.width / 2}px;
  background: ${props => (props.background ? props.background : colors.ORANGE_PRIMARY)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

export default Container
