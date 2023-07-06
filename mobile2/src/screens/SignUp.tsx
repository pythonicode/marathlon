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
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Alert} from 'react-native';
import {supabase} from '../lib/supabase';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen({navigation}: {navigation: any}) {
  const {handleSubmit, register, setValue} = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Alert.alert(error.name, error.message);
    }
    setLoading(false);
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
        disabled={loading}
        {...register('password')}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        w="xs"
        onChangeText={(v: string) =>
          setValue('confirmPassword', v, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
        disabled={loading}
        {...register('confirmPassword')}
      />
      <Button
        bgColor="primary.500"
        w="xs"
        disabled={loading}
        onPress={handleSubmit(onSubmit)}>
        Sign up
      </Button>
      <HStack justifyContent="center" space={2}>
        <Text color="gray.500">Already have an account?</Text>
        <Link onPress={() => navigation.navigate('SignIn')}>Sign in</Link>
      </HStack>
    </VStack>
  );
}
