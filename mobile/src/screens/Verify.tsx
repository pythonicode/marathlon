import React from 'react';
import {
  Image,
  Center,
  Input,
  Button,
  VStack,
  Link,
  HStack,
  Text,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationStackParamList } from '../../App';

type FormData = {
  token: string;
};

export default function VerifyScreen({ navigation, route }: NativeStackScreenProps<NavigationStackParamList, 'verify'>) {
  const { handleSubmit, register, setValue } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.verifyOtp({ email, token: data.token, type: 'email' });
    if (error) {
      Alert.alert(error.name, error.message);
      return;
    }
    navigation.replace('onboarding', { step: 0 });
  };

  return (
    <VStack
      padding={4}
      space={4}
      justifyContent="center"
      alignItems="center"
      height="full">
      <Center>
        <Image source={require('../assets/logo.png')} alt="Marathlon Logo" size={50} />
      </Center>
      <Text fontSize="sm" color="gray.500">
        We sent a 6-digit code to {email}
      </Text>
      <Input
        placeholder="******"
        w="xs"
        onChangeText={(v: string) =>
          setValue('token', v, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        {...register('token')}
      />
      <Button
        bgColor="primary.500"
        w="xs"
        disabled={loading}
        onPress={handleSubmit(onSubmit)}>
        Verify Email
      </Button>
    </VStack>
  );
}
