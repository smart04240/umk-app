import React from 'react';
import RoundedImage from '../general/RoundedImage';

const ProfileAvatar = props => {

	const { size } = props;
	const avatar = require("../../assets/images/avatar.jpg");

	return (
		<RoundedImage
			size={ size || 77 }
			img_source={ avatar }
		/>
	)
}

export default ProfileAvatar;