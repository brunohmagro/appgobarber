import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import colors from '../../utils/styles/colors'

import { Provider } from './index'

interface PropsProviderContainer {
  selected: boolean
}

interface PropsProviderName {
  selected: boolean
}

interface HourProps {
  available: boolean
  selected: boolean
}

interface HourTextProps {
  selected: boolean
}

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

export const Content = styled.ScrollView``

export const ProviderListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`
export const ProviderContainer = styled(RectButton)<PropsProviderContainer>`
  background: ${props => (props.selected ? colors.ORANGE_PRIMARY : colors.GRAY_QUINARY)};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const ProviderName = styled.Text<PropsProviderName>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  color: ${props => (props.selected ? colors.GRAY_PRIMARY : colors.GRAY_QUATERNARY)};
`

export const Calendar = styled.View``

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${colors.GRAY_QUATERNARY};
  font-size: 24px;
  margin: 0 24px 24px;
`
export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: ${colors.ORANGE_PRIMARY};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${colors.GRAY_SECONDARY};
`
export const Schedule = styled.View`
  padding: 24px 0 16px;
`

export const Section = styled.View`
  margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: ${colors.GRAY_TERTIARY};
  font-family: 'RobotoSlab-Medium';
  margin: 0 24px 12px;
`

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? colors.ORANGE_PRIMARY : colors.GRAY_QUINARY)};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? colors.GRAY_PRIMARY : colors.GRAY_QUATERNARY)};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`
