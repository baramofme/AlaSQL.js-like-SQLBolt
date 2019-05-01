/** property composed of string typed key and any(string,bool...) typed value*/
interface DataSet{
  headers: {[key:string]:any}[];
  data: {[key:string]:any}[];
}

export default class InitScript{

  public name!:string;
  public tableName!:string;

  public queries!:string[];
  public dataSet!: DataSet;
  public qas!:any

  /** 생성자 */
  public constructor(script:any){
    this.name = script.name;
    this.tableName = script.tableName;
    this.queries = script.queries;
    this.dataSet = script.dataSet;
    this.qas = script.qaSet;
  }
}
