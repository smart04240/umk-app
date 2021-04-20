import React from "react";
import RoundedIconButton from "./RoundedIconButton";
import Links from "../../helpers/Links";

export default function RoundedMailButton({email}) {
    return <RoundedIconButton icon={'email-open-outline'} text={email} onPress={() => Links.openEmail(email)}/>
}
