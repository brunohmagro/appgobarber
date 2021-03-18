import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import colors from '../../utils/styles/colors'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const BackgroundButton = styled.TouchableOpacity``

export const HeaderTitle = styled.Text`
  color: ${colors.GRAY_TERTIARY};
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`