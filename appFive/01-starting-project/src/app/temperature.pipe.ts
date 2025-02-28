import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'temp',
    standalone:true
})


export class TemperaturePipe implements PipeTransform
{

    transform(value: string | number | null,inputType:'cel'|'fah',outputType?:'cel'|'fah') //the value must be accepted string and number only
    {     
        let val:number;

        if(!value){
            return value;
        }

        if(typeof value === 'string'){     //logic for converting the string value in float
            val =parseFloat(value);

        }else{
            val = value;
        }

        let outputTemp: number;

        if(inputType === 'cel' && outputType ==='fah'){
            outputTemp = val * (9 / 5) + 32;
        }else if(inputType === 'fah' && outputType ==='cel'){     //the main logic for the custom pipe
            outputTemp = (val-32) * (5/9);
        }else{
            outputTemp = val;
        }

        let symbol:':C'|':F'
        if(!outputType){                                         //the requirement basis symbol which used to custom pipe       
            symbol = inputType ==='cel' ? ':C':':F';
        }else{
            symbol = outputType ==='cel'? ':C':':F';
        }


          



        return `${outputTemp.toFixed(2)} ${symbol}`;         //Emit the perticular result or output
    }

}
    