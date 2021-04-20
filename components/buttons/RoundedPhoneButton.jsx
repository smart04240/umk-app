import React from "react";
import RoundedIconButton from "./RoundedIconButton";
import Links from "../../helpers/Links";

export default function RoundedPhoneButton({phone}) {
    return <RoundedIconButton icon={'phone-outline'} text={phone} onPress={() => Links.openPhone(phone)}/>
}
