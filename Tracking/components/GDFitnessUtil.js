export default class GDfitnessUtil {
	constructor(sheetId, apiKey){
		this.sheetId=sheetId;
		this.apiKey=apiKey;
	}

	determineMultiplier(input_str){
		const possibleNums=input_str.split(" ");
		if (possibleNums.length>1){
			const numStr=possibleNums[0];
			if (numStr.includes("/")){
				const fractionStrs=numStr.split("/");
				return parseFloat(fractionStrs[0])/parseFloat(fractionStrs[1]);
			}else if (numStr==="x" || numStr==="X"){
				//match 'x dash' or 'x check'
				return 0;
			}else{
				return parseFloat(numStr)
			}
		}else if (possibleNums==="x" || possibleNums==="X"){
			//match straight 'x'
			return 0;
		}else{
			//match a 'dash' or 'check'
			return 1;
		}
	}

	readRow(row){
		const OTHER_AMOUNT=400;
		const runningAmount = (date)=>{
			if (date<367-51){
				return 3;
			}else{
				return 6.1
			}
		}

		const values= row.values;
		const date= values[0].effectiveValue.numberValue-43918;
		const runningAmnt=runningAmount(date);
		const firstColumn=values[1].formattedValue.trim();
		//TODO: Forgot to deal with single dash
		if (firstColumn.includes("check")){
			//unicolumnal
			const multiplier = this.determineMultiplier(firstColumn);
			return [date,multiplier*runningAmnt];// {running:multiplier, other:multiplier};
		}else if (firstColumn.includes("dash") && values[2].formattedValue==undefined){
			const multiplier = this.determineMultiplier(firstColumn);
			return [date,multiplier*runningAmnt];
		}else if ((firstColumn==="x" || firstColumn==="X") && values[2].formattedValue==undefined){
			return [date,0];
		}else{
			const secondColumn=values[2].formattedValue.trim();
			//bicolumnal
			const runMult = this.determineMultiplier(firstColumn);
			const otherMult= this.determineMultiplier(secondColumn);
			return [date,runMult*runningAmnt];//{running:runMult, other:otherMult};
		}
	}

	getData(){
			return fetch("https://sheets.googleapis.com/v4/spreadsheets/"+this.sheetId+"/?key="+this.apiKey+"&includeGridData=true",{redirect:"follow"})
		  .then(response => response.json())
		  .then(data => {
		  	const transRows={};
		  	const rowObjs=data.sheets[0].data[0].rowData;
		  	let minDate=10000000;
		  	let maxDate=0;
		  	rowObjs.forEach((row,i) => {
		  		const point=this.readRow(row);
		  		transRows[point[0]]=point;
		  		if (point[0]>maxDate){
		  			maxDate=point[0]
		  		}
		  		if (point[0]<minDate){
		  			minDate=point[0];
		  		}
		  	});

		  	const avgRows=[];
		  	const avgWindow=7;
		  	for(let j=minDate+avgWindow; j<maxDate; j+=1){
		  		const avg=[];
		  		for(let k=avgWindow-1; k>=0; k-=1){
		  			let val=transRows[j-k];
		  			if (val==undefined){
		  				val=[j-k,0];
		  			}
		  			avg.push(val[1]);
		  		}
		  		const sum=avg.reduce((a, b) => a + b, 0);
		  		const avgVal=sum/avg.length;
		  		avgRows.push([j,avgVal]);
		  	}

		  	console.log(Object.values(transRows).map(pt=>pt[1]).reduce((a, b) => a + b, 0));

		  	return avgRows;
		  });
	}
}