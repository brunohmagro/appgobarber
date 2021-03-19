import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

import Container from './styles'

export interface PropsAvatar {
  size: number
  name: string
  width: number
  height: number
  avatarColor?: string
  background?: string
}

const AvatarDedault: React.FC<PropsAvatar> = ({ size, name, width, height, avatarColor, background, ...props }) => (
  <Container width={width} height={height} background={background} {...props}>
    <Icon name={name} size={size} color={avatarColor} />
  </Container>
)

export default AvatarDedault
