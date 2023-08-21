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
  Divider,
  Spinner,
  FormControl,
} from 'native-base';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import * as Linking from 'expo-linking';
import { startAsync } from 'expo-auth-session';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationStackParamList } from '../../App';

type FormData = {
  email: string;
};

export default function SignInScreen({ navigation }: NativeStackScreenProps<NavigationStackParamList, 'signin'>) {
  const { handleSubmit, register, setValue } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email
    });

    if (error) {
      Alert.alert(error.name, error.message);
    }
    setLoading(false);

    navigation.push('verify', { email: data.email });
  };

  const signInWithGoogle = async () => {
    const returnUrl = Linking.createURL('/auth/callback');

    const payload = (await startAsync({
      authUrl: `https://iamkkwctfcaayfxjxyhu.supabase.co/auth/v1/authorize?provider=google&redirect_to=${returnUrl}`,
      returnUrl,
    })) as {
      type: string;
      params: { access_token: string; refresh_token: string };
    };

    const { access_token, refresh_token } = payload.params;

    if (!access_token || !refresh_token) {
      Alert.alert('Authentication Error', 'Please try again');
      return;
    }

    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      Alert.alert(error.name, error.message);
      return;
    }

    navigation.replace('onboarding', { step: 0 });
  };

  return (
    <FormControl isRequired isDisabled={loading}>
      <VStack
        padding={4}
        space={4}
        justifyContent="center"
        alignItems="center"
        height="full">
        <Center marginBottom="4">
          <Image source={require('../assets/logo.png')} alt="Marathlon Logo" size={50} />
        </Center>
        <Button
          disabled={loading}
          variant="outline"
          w="xs"
          onPress={signInWithGoogle}>
          <HStack space={4} alignItems="center">
            <Image
              source={require('../assets/auth/google.png')}
              alt="Google Logo"
              size={6}
            />
            <Text fontSize="md">Sign in with Google</Text>
          </HStack>
        </Button>
        <Divider width="80%" />
        <Input
          isDisabled={loading}
          placeholder="Email Address"
          w="xs"
          onChangeText={(v: string) =>
            setValue('email', v, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          {...register('email')}
        />
        <Button
          bgColor="primary.500"
          w="xs"
          onPress={handleSubmit(onSubmit)}>
          {loading ? <Spinner /> : 'Sign In'}
        </Button>
      </VStack>
    </FormControl>
  );
}
