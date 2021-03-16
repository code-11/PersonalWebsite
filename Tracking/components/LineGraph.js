import React, { Component } from 'react';
import {Stage, Layer, Line, Circle, Text} from 'react-konva';

export default class LineGraph extends Component { 
	constructor(props){
		super(props);
		const {data}=this.props;
	}

	transX(xMin,xMax,width,xVal){
		const {axisThickness,axisLblSize} = this.props;
		const bufferX = axisThickness + axisLblSize*3;
		return (((width-bufferX) / xMax) * xVal) + bufferX;
	}

	transY(yMin,yMax,height,yVal){
		const {axisThickness,axisLblSize} = this.props;
		const bufferY = axisThickness + axisLblSize
		return height - bufferY - ((height-bufferY) / yMax) * yVal
	}

	trans(xMin,xMax,yMin,yMax,pt){
		const {data, width, height,axisThickness,axisLblSize} = this.props;

		const xPos=this.transX(xMin,xMax,width,pt[0]);
		const yPos=this.transY(xMin,xMax,height,pt[1]);
		return [xPos,yPos];
	}

	dataExtents(){
		const {data} = this.props;

		const xMax=data.map(pt=>pt[0]).reduce((mx,el)=>Math.max(el,mx));
		const xMin=data.map(pt=>pt[0]).reduce((mx,el)=>Math.min(el,mx));
		const yMax=data.map(pt=>pt[1]).reduce((mx,el)=>Math.max(el,mx));
		const yMin=data.map(pt=>pt[1]).reduce((mx,el)=>Math.min(el,mx));

		return {xMin,xMax,yMin,yMax};
	}

	getBaseLog(x, y) {
	  return Math.log(y) / Math.log(x);
	}

	greatestDivision(min,max){
		const width=max-min;
		const exp=getBaseLog(10,width);
		const normedExp= Math.max(0,Math.round(exp)-1);
		return Math.pow(10,normedExp);
	}

	renderSeries(dataExtents){
		const {data} = this.props;
		const {xMin,xMax,yMin,yMax} = dataExtents;

		const transformedPts=data.map((pt)=>{
			return this.trans(xMin,xMax,yMin,yMax,pt);
		});

		const combinedPoints= transformedPts.flat();
		return <Line
			points={combinedPoints}
			stroke={'black'}
		/>;
	}

	renderAxisLbls(dataExtents){
		const{width, height, axisThickness, axisLblSize} = this.props;
		const {xMin,xMax,yMin,yMax} = dataExtents;
		const lbls=[];
		const bufferY = axisThickness + axisLblSize-3;
		const bufferX = axisThickness + axisLblSize*3;

		//These numbers are in data domain
		for(let i=0; i<=10; i+=1){
			const xLblVal= ((xMax-0)/10)*i;
			const pixelVal= this.transX(xMin,xMax,width,xLblVal);
			lbls.push(
				<Text 
					x={pixelVal}
					y={height-bufferY}
					key={"x"+xLblVal}
					fontSize={axisLblSize}
					text={""+Number.parseFloat(xLblVal).toFixed(2)}
				/>
			);
		}

		//These numbers are in data domain
		for(let j=0; j<=10; j+=1){
			const yLblVal= ((yMax-0)/10)*j;
			const pixelVal= this.transY(yMin,yMax,height,yLblVal);
			lbls.push(
				<Text 
					x={0}
					y={pixelVal-bufferY}
					key={"y"+yLblVal}
					fontSize={axisLblSize}
					text={""+Number.parseFloat(yLblVal).toFixed(2)}
				/>
			);
		}

		return <React.Fragment>
			{lbls}
		</React.Fragment>
	}

	renderAxis(){
		const{width, height, axisThickness, axisLblSize} = this.props;
		const bufferX = axisThickness + axisLblSize*3;
		const bufferY = axisThickness + axisLblSize;
		return <React.Fragment>
			<Line 
				points={[bufferX,height-bufferY,width,height-bufferY]}
				stroke={"black"}
				strokeWidth={axisThickness}
			/>
			<Line 
				points={[bufferX,height-bufferY,bufferX,0]}
				stroke={"black"}
				strokeWidth={axisThickness}
			/>
		</React.Fragment>
	}

	render(){
		const {width,height,points} = this.props;
		const dataExtents= this.dataExtents();
	    return <Stage width={width} height={height}>
	      <Layer>
			{this.renderAxis()}
			{this.renderAxisLbls(dataExtents)}
			{this.renderSeries(dataExtents)}
	      </Layer>
	    </Stage>
	}

}