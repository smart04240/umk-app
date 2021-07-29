import React from 'react';
import {View} from 'react-native';
import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';
import MOSConstants from '../../constants/MOSConstants';
import { detectBranchesNodeEndType } from '../../helpers/map-of-studies';

import Branch from './Branch';
import Line from "./Line";


const CentralNode = () => (
	<View style={ GeneralStyles.row_centered }>
		<Line position="relative" height={ 20 } />
	</View>
)


const BranchesNode = props => {

	const { branches, inner, end } = props;

	const one_column_width = Layout.width / branches.length;
	const start_line_width = ( one_column_width * ( branches.length - 1 )) + MOSConstants.Line.Size;

	let end_line_left = 0;
	let end_line_width;

	const end_type = end || ( !inner ? detectBranchesNodeEndType( branches ) : null );

	switch ( end_type ) {

		case "full": end_line_width = start_line_width;
			break;

		case "half":
			end_line_width = start_line_width / 2 + MOSConstants.Line.Size / 2
			end_line_left = one_column_width / 2 - MOSConstants.Line.Size / 2
			break;

		case "half-right":
			end_line_width = start_line_width / 2 + MOSConstants.Line.Size / 2
			end_line_left = Layout.width / 2 - MOSConstants.Line.Size / 2
			break;
	}


	return (
		<View style={{ width: "100%" }}>

			{ !inner && <CentralNode/> }

			{ !inner &&
				<>
					<View style={ GeneralStyles.row_centered }>
						<Line position="relative" width={ start_line_width }/>
					</View>

					<View style={ GeneralStyles.row_center_around }>
						{ branches && !!branches.length &&
							branches.map(( branch, i ) => (
								<Line
									key={ i }
									position="relative"
								/>
							))
						}
					</View>
				</>
			}

			{ inner &&
				<Line
					width={ MOSConstants.Column.Default }
					left={ MOSConstants.Column.Default / 2 }
				/>
			}

			{ branches && !!branches.length &&
				<View style={{ flexDirection: "row" }}>
					{ branches.map(( props, i ) => (
						<Branch
							key={ i }
							{...props }
						/>
					)) }
				</View>
			}

			{ end_type &&
				<>
					{ end_type !== "middle" &&
						<View style={ end_type === "full" ? GeneralStyles.row_center_around : GeneralStyles.row_ac }>
							<Line
								position="relative"
								width={ end_line_width }
								left={ end_line_left }
							/>
						</View>
					}

					<CentralNode/>
				</>
			}

		</View>
	)
}


export default BranchesNode;
