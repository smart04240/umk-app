import {Dimensions, Platform} from "react-native";
import * as Device from "expo-device";

export const unibrowIOSDevices = (Platform.OS === 'ios' && Device?.modelName?.match(/\d/g).join("") >= 10);
const window = Dimensions.get('window');
const paddingHorizontal = window.width < 375 ? 15 : 23;
const calendarPickerPadding = window.width < 375 ? 6 : 23;

export default {
	...window,
	container_width: window.width - paddingHorizontal * 2,
	paddingHorizontal,
	calendarPickerPadding
}
