import { Dimensions  } from "react-native";

const window = Dimensions.get('window');
const paddingHorizontal = window.width < 375 ? 15 : 23

export default {
	...window,
	container_width: window.width - paddingHorizontal * 2,
	paddingHorizontal
}