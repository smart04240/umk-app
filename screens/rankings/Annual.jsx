import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import API from '../../helpers/API';
import Translations from "../../constants/Translations";
import Dropdown from "../../components/form/Dropdown";
import Layout from "../../constants/Layout";
import RankingBox from "../../components/ranking/RankingBox";
import useTranslator from "../../hooks/useTranslator";
import Container from "../../components/general/Container";

const Annual = (allRankings) => {
	const translate = useTranslator();
	const user = useSelector(state => state.user);
	const locale = useSelector(state => state.app.locale);
	const [studies, setStudies] = useState([]);
	const [data, setData] = useState({
		all: allRankings
	});
	const [rankings, setRankings] = useState(allRankings);

	useEffect(() => {
		user?.studies?.forEach((study) => {
			setStudies(oldVal => [...oldVal, {
				label: study?.study?.name,
				value: study?.study?.usos_id
			}]);
		});
	}, [locale]);

	const handleChange = selectedItem => {
		let studyUsosId = selectedItem.value;
		if (studyUsosId === 0) {
			setRankings(data.all);
			return;
		}

		if(data[studyUsosId]) {
			setRankings(data[studyUsosId]);
			return;
		}
		API.ranking.ByFilter({ study_usos_id: studyUsosId }).then((response) => {
			setData(prev => {
				prev[studyUsosId] = response.data.data;
				return {...prev};
			});
		});
	}

	return (
		<Container>
			<Dropdown
				label={translate(Translations.FilterSelectDirection)}
				options_box_style={{ maxHeight: Layout.height * 0.5 }}
				options={[
					{ value: 0, label: translate(Translations.ChooseOneOption) },
					...studies
				]}
				onChange={handleChange}
			/>

			{rankings && !!rankings.length && rankings.map((item, i) => {
				let number = rankings[i - 1]?.points === item.points ? i : i + 1;
				return <RankingBox key={i} {...{ ...item, number }} />
			})}
		</Container>
	)
}
export default Annual;
