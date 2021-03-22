export const NUMBER =1;
export const DATE =2;
export const STRING =3;

export default class GDriveUtil {
	constructor(sheetId, apiKey){
		this.sheetId=sheetId;
		this.apiKey=apiKey;
	}

	transformData(elObj, type){
		if(type===NUMBER){
			return elObj.effectiveValue.numberValue;
		}else if (type===STRING){
			return elObj.formattedvalue;
		}else if (type===DATE){
			return elObj.effectiveValue.numberValue-43918;
		}
	}

	getData(columnTypes){
			return fetch("https://sheets.googleapis.com/v4/spreadsheets/"+this.sheetId+"/?key="+this.apiKey+"&includeGridData=true",{redirect:"follow"})
		  .then(response => response.json())
		  .then(data => {
		  	const transRows=[];
		  	const rowObjs=data.sheets[0].data[0].rowData;
		  	rowObjs.forEach((row,i) => {
		  		transRows[i]=[];
		  		row.values.forEach((el,j)=>{
		  			const transData=this.transformData(el,columnTypes[j]);
		  			transRows[i].push(transData);
		  		});
		  	});
		  	return transRows;
		  });
	}
}