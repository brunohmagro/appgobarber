import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import { Container, Header, BackgroundButton, HeaderTitle, UserAvatar } from './styles'

interface RouteParams {
  providerId: string
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const route = useRoute()
  const { providerId } = route.params as RouteParams
  const { goBack } = useNavigation()

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  return (
    <Container>
      <Header>
        <BackgroundButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackgroundButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  )
}

export default CreateAppointment
