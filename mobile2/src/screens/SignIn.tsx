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
} from 'native-base';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Alert} from 'react-native';
import {supabase} from '../lib/supabase';
import * as Linking from 'expo-linking';
import {startAsync} from 'expo-auth-session';

type FormData = {
  email: string;
  password: string;
};

export default function SignInScreen({navigation}: {navigation: any}) {
  const {handleSubmit, register, setValue} = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    console.log(error);

    if (error) {
      Alert.alert(error.name, error.message);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    const returnUrl = Linking.createURL('/auth/callback');

    const payload = (await startAsync({
      authUrl: `https://iamkkwctfcaayfxjxyhu.supabase.co/auth/v1/authorize?provider=google&redirect_to=${returnUrl}`,
      returnUrl,
    })) as {
      type: string;
      params: {access_token: string; refresh_token: string};
    };

    const {access_token, refresh_token} = payload.params;

    const response = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    console.log(response);
  };

  return (
    <VStack
      padding={4}
      space={4}
      justifyContent="center"
      alignItems="center"
      height="full">
      <Center>
        <Image source={require('../assets/logo.png')} alt="Marathlon Logo" />
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
        disabled={loading}
        placeholder="Email"
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
      <Input
        disabled={loading}
        type="password"
        placeholder="Password"
        w="xs"
        onChangeText={(v: string) =>
          setValue('password', v, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        {...register('password')}
      />
      <Button
        disabled={loading}
        bgColor="primary.500"
        w="xs"
        onPress={handleSubmit(onSubmit)}>
        {loading ? <Spinner /> : 'Sign in'}
      </Button>
      <HStack justifyContent="center" space={2}>
        <Text color="gray.500">Don't have an account?</Text>
        <Link onPress={() => navigation.navigate('SignUp')}>Sign up</Link>
      </HStack>
    </VStack>
  );
}
