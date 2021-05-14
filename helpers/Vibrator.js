import * as Haptics from 'expo-haptics';
import {Platform, Vibration} from 'react-native';

export const Vibrator = () => {
    Platform.OS === 'android' ? (
        Vibration.vibrate(2 * 15)
    ) : (
        Haptics.selectionAsync()
    )
}
