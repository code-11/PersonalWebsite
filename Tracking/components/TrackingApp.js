import React, { Component } from 'react';
import LineGraph from "./LineGraph";
import GDriveUtil from "./GDriveUtil";
import GDFitnessUtil from "./GDFitnessUtil";
import { NUMBER, DATE, STRING } from "./GDriveUtil";

export default class TrackingApp extends Component {
	constructor(){
		super();
		this.state={
			weightData:null,
			runningData:null,
		}
	}

	componentDidMount() {

		const apiKey="AIzaSyBnOsVQzm27ZRMqj4VeXFkY9xQXkiMCj2k";
		const sheetId="1AoU80nFKZFuBzVLltEeh71Fv-nZ-VsD_U6uiVV8nEmA";
		const weightSheet="1izcwWB3PNCLeLKGlU_zNjbRDB3imwRY6QambMXhfRlk";
		const fitnessSheet="1pdltxuNmGmryZHViMgkq98u0TYhbuo2jlAiCsCSYlpo";

		const weightImporter=new GDriveUtil(weightSheet,apiKey);
		const columnTypes=[
			DATE,
			NUMBER,
		]
		weightImporter.getData(columnTypes).then(rowData=>{
			this.setState({weightData:rowData});
		});

		const fitnessImporter=new GDFitnessUtil(fitnessSheet, apiKey);
		fitnessImporter.getData().then(rowData=>{
			this.setState({runningData:rowData});
		})
	}

	renderDataGraph(graphProps){
		if (graphProps.data==undefined){
			return null;
		}
		const extents = LineGraph.dataExtents(graphProps.data);
		const combinedGraphProps={
			label:"Unlabeled",
			width:500,
			height:500,
			top:(extents)=>extents.yMax,
			bottom:(extents)=>extents.yMin,
			left:(extents)=>extents.xMin,
			right:(extents)=>extents.xMax,
			axisThickness:2,
			axisLblSize:12,
			...graphProps,
		};
		const resolvedGraphProps = {
			...combinedGraphProps,
			top:combinedGraphProps.top(extents),
			bottom:combinedGraphProps.bottom(extents),
			left:combinedGraphProps.left(extents),
			right:combinedGraphProps.right(extents),
		};
		return (<div>
			<h2> {resolvedGraphProps.label} </h2>
			<LineGraph {...resolvedGraphProps}/>
		</div>);
	}

	// renderWeight(){
	// 	const {weightData}= this.state;
	// 	if (weightData==undefined){
	// 		return null;
	// 	}
	// 	const {xMin,xMax,yMin,yMax} = LineGraph.dataExtents(weightData);
	// 	return  <div>
	// 		<h2> Weight </h2>
	// 		<LineGraph width={500} height={500} top={yMax+1} bottom={yMin-1} left={xMin} right={xMax} axisThickness={2} axisLblSize={12} data={weightData}/>
	// 	</div>;
	// }

	// renderRunning(){
	// 	const {runningData}= this.state;
	// 	if (runningData==undefined){
	// 		return null;
	// 	}
	// 	const {xMin,xMax,yMin,yMax} = LineGraph.dataExtents(runningData);
	// 	return  <div>
	// 		<h2> Running </h2>
	// 		<LineGraph width={500} height={500} top={6} bottom={0} left={xMin} right={xMax} axisThickness={2} axisLblSize={12} data={runningData}/>
	// 	</div>;
	// }

	render() {
		const {weightData, runningData}= this.state;
		// const fakeData=[[1,100],[2,50],[3,60],[4,20],[5,70],[6,70],[7,75],[8,50],[9,20],[10,40]];
		// const fakeData=[[2,1],[3,5],[5,6],[5.5,2],[6.5,7],[9,7],[10,10]];

		const weightGraph=this.renderDataGraph({
			label:"Weight",
			data:weightData,
			width:250,
			height:250,
		});
		const runningGraph=this.renderDataGraph({
			label:"Running",
			data:runningData,
			top:(extents)=>6,
			bottom:(extents)=>0,
			width:250,
			height:250,
		});

		return  <div>
			{weightGraph}
			{runningGraph}
		</div>;

	}
}