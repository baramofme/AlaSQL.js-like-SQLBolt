/** 쿼리박스 초기화 스크립트 */
export default class InitScripts{
  /** 테이블 이름 */
  public tableName:string;
  /** 쿼리들 */
  public queries:string[];

  /** 쿼리 추가 */
  public addQueris(query:string){
    this.queries.push(query);
  }
  /** 생성자 */
  private constructor(tableName:string){
    this.tableName = tableName;
  }
}
