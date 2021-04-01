import React from 'react';
import { View, StyleSheet, ImageBackground } from "react-native";

const ProfileAvatar = props => {

	const width = props.size || 77;
	const height = props.size || 77;

	const sizes = { width, height };
	const avatar = require("../../assets/images/avatar.jpg");

	return (
		<View style={[ styles.avatar_box, sizes ]}>
			<ImageBackground style={[ styles.avatar, sizes ]} source={ avatar } />
		</View>
	)
}


const styles = StyleSheet.create({
	avatar: {
		resizeMode: "cover",
	},

	avatar_box: {
		borderRadius: 77,
		marginRight: 11,
		overflow: "hidden"
	}
})

export default ProfileAvatar;