import { Dimensions  } from "react-native";

const window = Dimensions.get('window');
const paddingHorizontal = window.width < 420 ? 15 : 23 

export default {
	...window,
	paddingHorizontal
}