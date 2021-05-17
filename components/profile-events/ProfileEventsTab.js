import React from 'react';

import Translations from '../../constants/Translations';
import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import useTranslator from "../../hooks/useTranslator";
import Container from "../general/Container";

const ProfileEventsTab = props => {
	const translate = useTranslator();

	const events1 = [
		{
			label: "Urlop okolicznościowy długoterminowy",
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias animi quasi beatae quam incidunt eaque, quo dolor quod ab temporibus, quia cupiditate, odit quibusdam voluptate est asperiores perferendis ea?"
		},
		{
			label: "Urlop zdrowotny",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum minima assumenda ut nihil consectetur. Laborum minus labore illo dignissimos reprehenderit ducimus deserunt porro, quibusdam inventore dolorum, amet sint similique sapiente?"
		},
		{
			label: "Urlop rodzicielski",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat numquam quidem fugiat unde error iure voluptatem quod aperiam fugit libero! Natus in vel eius ratione! Reprehenderit, temporibus. Consequuntur, assumenda odio."
		},
		{
			label: "Urlop sportowy",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, laborum non. Totam, adipisci voluptatibus facilis voluptates expedita deleniti quod consequuntur. Ipsam ab, voluptatem ipsa ipsum deleniti corporis vero voluptates dicta?"
		},
		{
			label: "Powtarzanie roku",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facere tempora architecto, in ad ipsa reiciendis alias dolor animi minus eos. Illo voluptate maiores consectetur iste labore nihil tempore minus."
		},
		{
			label: "Skreślenie z listy studentów",
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, omnis nisi quam, dolores fuga magnam dolore exercitationem enim, inventore quo debitis at necessitatibus ut eaque quasi ullam alias aut voluptas."
		},
		{
			label: "Wznowienie studiów",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, magnam. Est in ratione nesciunt voluptate quo, quibusdam laboriosam mollitia dolores iusto totam ipsa corporis repellendus. Magnam possimus id ducimus hic?"
		}
	];

	const events2 = [
		{
			label: "Wpis warunkowy",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat numquam quidem fugiat unde error iure voluptatem quod aperiam fugit libero! Natus in vel eius ratione! Reprehenderit, temporibus. Consequuntur, assumenda odio."
		},
		{
			label: "Urlop okolicznościowy krótkoterminowy",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, laborum non. Totam, adipisci voluptatibus facilis voluptates expedita deleniti quod consequuntur. Ipsam ab, voluptatem ipsa ipsum deleniti corporis vero voluptates dicta?"
		},
		{
			label: "Indywidualna Organizacja Studiów – IOS",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facere tempora architecto, in ad ipsa reiciendis alias dolor animi minus eos. Illo voluptate maiores consectetur iste labore nihil tempore minus."
		},
		{
			label: "Indywidualny Plan Studiów - IPS",
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, omnis nisi quam, dolores fuga magnam dolore exercitationem enim, inventore quo debitis at necessitatibus ut eaque quasi ullam alias aut voluptas."
		},
		{
			label: "Studia na innej uczelni",
			text: "Możesz za zgodą dziekana i po przyznaniu IPS („specjalny” IPS bez warunku średniej), realizować część studiów w innej uczelni, w tym zagranicznej – sprawdź zasady w dziekanacie."
		}
	];

	return (
		<Container>
			<DropDownTextGroup
				label={ translate( Translations.ListOfEventsAffectLengthStudy ) + ":" }
				items={ events1 }
			/>

			<DropDownTextGroup
				label={ translate( Translations.ListOfEventsNotAffectLengthStudy ) + ":" }
				items={ events2 }
			/>
		</Container>
	)
}


export default ProfileEventsTab;
