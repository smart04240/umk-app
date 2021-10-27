import {Dimensions, Platform} from "react-native";

export const unibrowIOSDevices = false;
const window = Dimensions.get('window');
const paddingHorizontal = window.width < 375 ? 15 : 23;
const calendarPickerPadding = window.width < 375 ? 6 : 23;

export default {
	...window,
	container_width: window.width - paddingHorizontal * 2,
	paddingHorizontal,
	calendarPickerPadding
}
