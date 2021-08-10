import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Text, View } from "react-native";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

export default function SimulationsScreen() {
	

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}