import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
@Injectable()
export class ParseDatePipe implements PipeTransform {
    transform(value : string| number, metadata : ArgumentMetadata){
        console.log(metadata,"metadata")

       const {metatype}= metadata;
       console.log(metatype,"metadafddf")

       const date = this.convertTimestamp(value);
       if(!date || isNaN(+date)){
        throw new BadRequestException("Invalid date")
       }

       switch  (metatype){
        case String:
            return date.toUTCString;
        case Date : 
        return date;
        case Number:
            return date.getTime();
        default:
            return date.toISOString()    

       }
    }
    private convertTimestamp (timestamp : string | number){
        timestamp= +timestamp
       const isSecond = !(timestamp > (Date.now()+ 24 *60 *60 *1000)/1000);
        return isSecond ? new Date(timestamp*1000) : new Date(timestamp)
    }
}