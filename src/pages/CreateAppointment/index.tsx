import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import {
  Container,
  Header,
  BackgroundButton,
  HeaderTitle,
  UserAvatar,
  ProviderListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles'
import colors from '../../utils/styles/colors'
import api from '../../services/api'
import AvatarDedault from '../../components/Avatar/Default'

interface RouteParams {
  providerId: string
}

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const route = useRoute()
  const { providerId } = route.params as RouteParams
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(providerId)

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const { goBack } = useNavigation()

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerIdSelected: string) => {
    setSelectedProvider(providerIdSelected)
  }, [])

  return (
    <Container>
      <Header>
        <BackgroundButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color={colors.GRAY_QUATERNARY} />
        </BackgroundButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProviderListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              {provider.avatar_url ? (
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
              ) : (
                <AvatarDedault
                  size={15}
                  name="user"
                  width={32}
                  height={32}
                  avatarColor={provider.id === selectedProvider ? colors.GRAY_QUATERNARY : colors.GRAY_PRIMARY}
                  background={provider.id === selectedProvider ? colors.GRAY_PRIMARY : colors.GRAY_TERTIARY}
                />
              )}
              <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>
    </Container>
  )
}

export default CreateAppointment
