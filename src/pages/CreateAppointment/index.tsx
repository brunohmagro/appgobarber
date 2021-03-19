import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

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
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
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
interface AvailabilityItem {
  hour: number
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const route = useRoute()
  const { providerId } = route.params as RouteParams
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(providerId)
  const [showPicker, setShowPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/disponibilidade-dia`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data)
      })
  }, [selectedDate, selectedProvider])

  const { goBack } = useNavigation()

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerIdSelected: string) => {
    setSelectedProvider(providerIdSelected)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowPicker(!showPicker)
  }, [showPicker])

  const handleDateChanged = useCallback((event: unknown, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowPicker(false)
    }

    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

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

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>Selecione a data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showPicker && (
          <DateTimePicker
            {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
            onChange={handleDateChanged}
            value={selectedDate}
          />
        )}
      </Calendar>

      {morningAvailability.map(({ hourFormatted, available }) => (
        <Title key={hourFormatted}>{hourFormatted}</Title>
      ))}

      {afternoonAvailability.map(({ hourFormatted, available }) => (
        <Title key={hourFormatted}>{hourFormatted}</Title>
      ))}
    </Container>
  )
}

export default CreateAppointment
