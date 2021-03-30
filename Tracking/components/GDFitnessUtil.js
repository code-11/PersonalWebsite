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
			}else{
				return parseFloat(numStr)
			}
		}else{
			return 1;
		}
	}

	readRow(row){
		const RUNNING_AMOUNT=3;
		const OTHER_AMOUNT=400;

		const values= row.values;
		const date= values[0].effectiveValue.numberValue-43918;
		const firstColumn=values[1].formattedValue.trim();
		//TODO: Forgot to deal with single dash
		if (firstColumn.includes("check")){
			//unicolumnal
			const multiplier = this.determineMultiplier(firstColumn);
			return [date,multiplier*RUNNING_AMOUNT];// {running:multiplier, other:multiplier};
		}else{
			const secondColumn=values[2].formattedValue.trim();
			//bicolumnal
			const runMult = this.determineMultiplier(firstColumn);
			const otherMult= this.determineMultiplier(secondColumn);
			return [date,runMult*RUNNING_AMOUNT];//{running:runMult, other:otherMult};
		}
	}

	getData(){
			return fetch("https://sheets.googleapis.com/v4/spreadsheets/"+this.sheetId+"/?key="+this.apiKey+"&includeGridData=true",{redirect:"follow"})
		  .then(response => response.json())
		  .then(data => {
		  	const transRows=[];
		  	const rowObjs=data.sheets[0].data[0].rowData;
		  	rowObjs.forEach((row,i) => {
		  		transRows[i]=this.readRow(row);
		  	});
		  	return transRows;
		  });
	}
}