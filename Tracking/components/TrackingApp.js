import React, { Component } from 'react';
import LineGraph from "./LineGraph";

export default class TrackingApp extends Component {
	constructor(){
		super();
	}

	componentDidMount() {
		const apiKey="AIzaSyBnOsVQzm27ZRMqj4VeXFkY9xQXkiMCj2k";
		const sheetId="1AoU80nFKZFuBzVLltEeh71Fv-nZ-VsD_U6uiVV8nEmA";

		fetch("https://sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/?key="+apiKey+"&includeGridData=true",{redirect:"follow"})
		  .then(response => response.json())
		  .then(data => console.log(data));
	}

	render() {
		// const fakeData=[[1,1],[2,5],[3,6],[4,2],[5,7],[6,7],[7,7.5],[8,5],[9,2],[10,4]];
		const fakeData=[[2,1],[3,5],[5,6],[5.5,2],[6.5,7],[9,7],[10,10]];
		return  <div>
			<h1> Test </h1>
			<LineGraph width={500} height={500} axisThickness={2} axisLblSize={12} data={fakeData}/>
		</div>;

	}
}