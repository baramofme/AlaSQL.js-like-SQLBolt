/** 쿼리박스 초기화 스크립트 */
import {Data} from "unist";

/** property composed of string typed key and any(string,bool...) typed value*/
interface DataSet{
  headers: {[key:string]:any}[];
  data: {[key:string]:any}[];
}

export default class InitScript{
  /** 테이블 이름 */
  public tableName!:string;
  /** 쿼리들 */
  public queries!:string[];

  public name!:string;

  public dataSet!: DataSet;

  /** 생성자 */
  public constructor(script:any){
    this.name = script.name;
    this.tableName = script.tableName;
    this.queries = script.queries;
    this.dataSet = script.dataSet;
  }
}
