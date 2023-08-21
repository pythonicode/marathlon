import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, VStack, Button, Image, HStack } from "native-base";
import { NavigationStackParamList } from "../../App";

export default function OnboardingScreen({ navigation, route }: NativeStackScreenProps<NavigationStackParamList, 'onboarding'>) {
    const { step } = route.params;

    if (step == 0) {
        return (
            <VStack
                padding={4}
                space={4}
                justifyContent="center"
                alignItems="center"
                height="full">
                <VStack justifyContent="center" alignItems="center">
                    <Text fontSize="2xl" fontWeight="bold">Integrations</Text>
                    <Text color="gray.500" fontSize="sm" textAlign="center">Connect to a service for quickstart</Text>
                </VStack>
                <Button width="xs" height="16" backgroundColor="orange.500">
                    <HStack space={2} alignItems="center">
                        <Image source={require('../assets/auth/strava.png')} alt="Strava Logo" size="8" />
                        <Image source={require('../assets/auth/strava_text.png')} alt="Strava Text" style={{ height: 24, width: 100 }} />
                    </HStack>
                </Button>
                <Button width="xs" height="16" backgroundColor="black">
                    <HStack space={4} alignItems="center">
                        <Image source={require('../assets/auth/apple.png')} alt="Apple Logo" style={{ height: 24, width: 20 }} />
                        <Text color="white" fontSize="2xl" fontWeight="black">HEALTH</Text>
                    </HStack>
                </Button>
                <Button width="xs" height="12" variant="ghost" onPress={() => navigation.push("onboarding", { step: 1 })}>
                    Continue without connecting
                </Button>
            </VStack>
        )
    }

    return null;
}

function Onboarding({ step, setStep }: { step: number, setStep: (step: number) => void }) {

}