import React, { Component } from 'react';
import LineGraph from "./LineGraph";
import GDriveUtil from "./GDriveUtil";
import { NUMBER, DATE, STRING } from "./GDriveUtil";

export default class TrackingApp extends Component {
	constructor(){
		super();
		this.state={
			rowData:null
		}
	}

	componentDidMount() {

		const apiKey="AIzaSyBnOsVQzm27ZRMqj4VeXFkY9xQXkiMCj2k";
		const sheetId="1AoU80nFKZFuBzVLltEeh71Fv-nZ-VsD_U6uiVV8nEmA";
		const sheetId2="1izcwWB3PNCLeLKGlU_zNjbRDB3imwRY6QambMXhfRlk";

		// fetch("https://sheets.googleapis.com/v4/spreadsheets/"+sheetId2+"/?key="+apiKey+"&includeGridData=true",{redirect:"follow"})
		//   .then(response => response.json())
		//   .then(data => console.log(data));
		const gd=new GDriveUtil(sheetId2,apiKey);
		const columnTypes=[
			DATE,
			NUMBER,
		]
		gd.getData(columnTypes).then(rowData=>{
			this.setState({rowData});
		});
	}

	render() {
		// const fakeData=[[1,1],[2,5],[3,6],[4,2],[5,7],[6,7],[7,7.5],[8,5],[9,2],[10,4]];
		// const fakeData=[[2,1],[3,5],[5,6],[5.5,2],[6.5,7],[9,7],[10,10]];
		if (this.state.rowData==undefined){
			return null;
		}
		const {xMin,xMax,yMin,yMax} = LineGraph.dataExtents(this.state.rowData);
		return  <div>
			<h1> Test </h1>
			<LineGraph width={500} height={500} top={yMax*2} bottom={0} left={0} right={xMax} axisThickness={2} axisLblSize={12} data={this.state.rowData}/>
		</div>;

	}
}