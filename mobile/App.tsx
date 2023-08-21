import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuthNoContext } from './src/providers/Auth';
import { View, Image } from 'react-native';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E2E7FE',
      100: '#D3DBFE',
      200: '#B5C4FD',
      300: '#97ACFC',
      400: '#7A94FB',
      500: '#5C7CFA',
      600: '#2B54F8',
      700: '#0735E9',
      800: '#062AB7',
      900: '#041E86',
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: 'lg',
      },
    },
    Input: {
      defaultProps: {
        size: 'lg',
      },
    },
  },
  fontConfig: {
    InterTight: {
      100: {
        normal: 'InterTight-Thin',
        italic: 'InterTight-ThinItalic',
      },
      200: {
        normal: 'InterTight-ExtraLight',
        italic: 'InterTight-ExtraLightItalic',
      },
      300: {
        normal: 'InterTight-Light',
        italic: 'InterTight-LightItalic',
      },
      400: {
        normal: 'InterTight-Regular',
        italic: 'InterTight-Italic',
      },
      500: {
        normal: 'InterTight-Medium',
        italic: 'InterTight-MediumItalic',
      },
      600: {
        normal: 'InterTight-SemiBold',
        italic: 'InterTight-SemiBoldItalic',
      },
      700: {
        normal: 'InterTight-Bold',
        italic: 'InterTight-BoldItalic',
      },
      800: {
        normal: 'InterTight-ExtraBold',
        italic: 'InterTight-ExtraBoldItalic',
      },
      900: {
        normal: 'InterTight-Black',
        italic: 'InterTight-BlackItalic',
      },
    },
    fonts: {
      heading: 'InterTight',
      body: 'InterTight',
    },
  },
});

import SignInScreen from './src/screens/SignIn';
import OnboardingScreen from './src/screens/Onboarding';
import VerifyScreen from './src/screens/Verify';

export type NavigationStackParamList = {
  signin: undefined;
  verify: { email: string };
  onboarding: { step: number };
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export default function App(): JSX.Element {
  const { session } = useAuthNoContext();

  if (session === undefined) {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./src/assets/logo.png")} alt="Marathlon Logo" style={{ width: 64, height: 64 }} />
    </View>;
  }

  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={session ? 'onboarding' : 'signin'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" component={SignInScreen} />
            <Stack.Screen name="verify" component={VerifyScreen} />
            <Stack.Screen name="onboarding" component={OnboardingScreen} initialParams={{ step: 0 }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
