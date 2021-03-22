import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 65 : 150}px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4edeb;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0 24px;
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`
