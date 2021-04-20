import React from "react";
import RoundedIconButton from "./RoundedIconButton";
import Links from "../../helpers/Links";

export default function RoundedLocationButton({address, latitude, longitude}) {
    return <RoundedIconButton icon={'map-marker-outline'} text={address} onPress={() => Links.openMap(address, latitude, longitude)}/>
}
