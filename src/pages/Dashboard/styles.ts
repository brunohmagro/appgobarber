import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Provider } from './index'
import colors from '../../utils/styles/colors'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: ${colors.GRAY_PRIMARY};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: ${colors.GRAY_TERTIARY};
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
`

export const UserName = styled.Text`
  color: ${colors.ORANGE_PRIMARY};
`
export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`

export const ProvidedersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${colors.GRAY_TERTIARY};
  font-family: 'RobotoSlab-Medium';
`

export const ProviderContainer = styled(RectButton)`
  background: ${colors.GRAY_PRIMARY};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 16px;
`

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${colors.GRAY_TERTIARY};
`

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.GRAY_SECONDARY};
  font-family: 'RobotoSlab-Regular';
`
