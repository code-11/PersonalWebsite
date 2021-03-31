import React, { Component } from 'react';
import LineGraph from "./LineGraph";
import GDriveUtil from "./GDriveUtil";
import GDFitnessUtil from "./GDFitnessUtil";
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
		const fitnessSheet="1pdltxuNmGmryZHViMgkq98u0TYhbuo2jlAiCsCSYlpo";

		// const gd=new GDriveUtil(sheetId2,apiKey);
		// const columnTypes=[
		// 	DATE,
		// 	NUMBER,
		// ]
		// gd.getData(columnTypes).then(rowData=>{
		// 	this.setState({rowData});
		// });

		const gd=new GDFitnessUtil(fitnessSheet, apiKey);
		gd.getData().then(rowData=>{
			this.setState({rowData});
		})
	}

	render() {
		const {rowData}= this.state;
		// const fakeData=[[1,100],[2,50],[3,60],[4,20],[5,70],[6,70],[7,75],[8,50],[9,20],[10,40]];
		// const fakeData=[[2,1],[3,5],[5,6],[5.5,2],[6.5,7],[9,7],[10,10]];
		if (rowData==undefined){
			return null;
		}
		const {xMin,xMax,yMin,yMax} = LineGraph.dataExtents(rowData);
		return  <div>
			<h1> Test </h1>
			<LineGraph width={500} height={500} top={6} bottom={0} left={xMin} right={xMax} axisThickness={2} axisLblSize={12} data={rowData}/>
		</div>;

	}
}