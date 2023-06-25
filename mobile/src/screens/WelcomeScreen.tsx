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
} from 'native-base';
import {useForm} from 'react-hook-form';
import {supabase} from '../lib/supabase';

type FormData = {
  email: string;
  password: string;
};

export default function WelcomeScreen() {
  const {handleSubmit, register, setValue} = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const signInWithGoogle = async () => {
    console.log("YO");
    let {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    console.log(data, error);
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
      <Button variant="outline" w="xs" onPress={signInWithGoogle}>
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
      <Button bgColor="primary.500" w="xs" onPress={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <HStack justifyContent="center" space={2}>
        <Text color="gray.500">Don't have an account?</Text>
        <Link>Sign up</Link>
      </HStack>
    </VStack>
  );
}
