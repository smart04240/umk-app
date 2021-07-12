import React from 'react';
import {useSelector} from 'react-redux';
import RoundedImage from '../general/RoundedImage';

const ProfileAvatar = props => {
    const user = useSelector(state => state.user);
    const {size, rest} = props;
    const avatar = {uri: props.imageSrc || user?.avatar_url} || require("../../assets/images/avatar.jpg");

    return (
        <RoundedImage
            size={size || 77}
            img_source={avatar}
            {...rest}
        />
    )
}

export default ProfileAvatar;
