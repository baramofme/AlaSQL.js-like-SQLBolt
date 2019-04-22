
# LoveField Lesson 1: 작업 흐름

## 작업 흐름 개관

### 기본 작업 흐름

1. 스키마 생성하면 스키마 빌더가 반환.
2. 이 스키마 빌더로 테이블 생성.
3. 테이블까지 생성된 데이터 베이스에 접속해서 데이터베이스 인스턴스와 테이블 가져오기.
4. 앞에서 가져온 데이터 베이스 인스턴스와 테이블을 사용해서 빌더패턴으로 쿼리를 작성한다.
5. 쿼리르 실행한다.
6. *모든 쿼리 작성 및 실행 전에 매번 스키마 빌더로 테이블을 생성하고 인스턴스를 가져와야 한다.
7. 이미 생성되어 있으면 인스턴스만 가져온다. 하지만 무조건 생성하는 절차를 강제로 거쳐야함.

> \* IndexedDB 의 경우 NOSQL 데이터 베이스, 러브필드가 관계형 질의를 수행하기 위한 스키마 정보가 없다. 따라서 매번 스키마를 매번 만들어 준 후 그 스키마 정보에 따라 관계형 질의를 수행.
  공식 깃헙 저장소 가면 매번 생성하지 않게 해달라고 이슈 있다. 모든 쿼리를 날리기 전 스키마 생성 절차를 강제하는 게 괴랄하지만 러브필드는 그래.
  
### 고급 작업 흐름

1. YAML 파일로 테이블 스키마 생성
2. YAML 스키라를 해석해서 자바스크립트 코드 생성
3. 다른 코드에서 생성된 클래스/함수 사용하기
4. 클로저 컴파일러로 컴파일하고 모든 것을 결합하기

### API 스타일

1. [구글 자바스크립트 스타일 가이드](https://google.github.io/styleguide/jsguide.html) 준수.   
   .  
  기본 크로스 브라우저 `Promise `지원 위해 `goog.Promise` 사용하고 IE 10 같이 미지원하는 브라우저 폴리필로 `IThenable` 사용.
  
2. 모든 비동기 API 는 Promise 기반.
3. 모든 DDL(데이터 정의 언어) API 는 동기. 모든 DML(데이터 조작 언어) API 는 비동기. 
 
## 작업 흐름 실제 예시

### 스키마 생성하면서 스키마 빌더 인스턴스 가져오기

```javascript

import lf from "lovefield";

const schemaBuilder = lf.schema.create("todo", 1);
``` 
 
### 이 스키마 빌더로 테이블 생성.

```javascrip
schemaBuilder
  .createTable("Item") // Item 이란 이름을 가진 테이블 생성하고
  .addColumn("id", lf.Type.INTEGER) // 컬럼 추가
  .addColumn("description", lf.Type.STRING)
  .addColumn("deadline", lf.Type.DATE_TIME)
  .addColumn("done", lf.Type.BOOLEAN)
  // 주키 추가
  // use auto-increment set true
  .addPrimaryKey([
    {
      autoIncrement: true,
      name: "id",
      order: lf.Order.DESC
    }
  ])
  // 인덱스 추가
  .addIndex("idxDeadline", ["deadline"], false, lf.Order.DESC);
```

> 모든 DDL 은 동기다. 즉 스키마 정의(생성) 끝나길 기다렸다가 다음 코드가 실행됨. 

> 스키마는 도식이라고도 한다. 사람에게서 사용될 때는 외부의 정보를 인지하는 구조를 말하며 데이터 베이스에서 관점에서는 외부 정보를 어떤 구조로 내부에 저장하느냐를 말한다.  

위에서 생성한 스키마(테이블과 그 내부 컬럼)는 아래와 같은 2차원 구조를 만들어낸다.

|Id|description|deadline|done|
|---|---|---|---|

<!--|   |   |   |   |-->
<!--|   |   |   |   |-->
<!--|   |   |   |   |-->

### 테이블까지 생성된 데이터 베이스에 접속해서 데이터베이스 인스턴스와 테이블 가져오기.

앞서 정의한 `schemaBuilder` 에 접속해서 데이터베이스와 테이블 인스턴스를 가져온다.

인스턴스는 실제 메모리 세상에서 접근하고 작동시킬 수 있는 개체를 의미한다.

DB 인스턴스는 DB 에 관련된 행위를 할 수 있는 개체다.

```javascript
let db;
let table;

schemaBuilder.connect().then(function(db) {
        db = db;
        table = db.getSchema().table("Item")
      });
```

변수에 하나씩 저장하는 게 귀찮다면 JSON 객체로 받아버리자.

```typescript
const dbInfo: any = schemaBuilder.connect().then(function(db: lf.Database) {
      return { db, table: db.getSchema().table("Item") };
      });
```

> *뜬금없는 타입스트립트 무엇?*   
타입스크립트로도 쓸 수 있다는 예시. 이하 동일.


### 앞에서 가져온 데이터 베이스 인스턴스와 테이블을 사용해서 빌더패턴으로 쿼리를 작성 후 실행한다.

모든 DML(데이터조작)은 비동기다. 쿼리 결과가 제대로 나오기 전에 자바스크립트는 다음 코드를 멋대로 실행한다.
 
일단, DML 은 Promise 를 리턴하므로 비동기 결과가 나온 뒤에 그결과를 가지고 처리하게 해주는 `then(결과 => {처리구문})`을 사용해서 조회된 데이터를 처리할 수 있다.

자바스크립트에서 동기와 비동기 차이는 인터넷 검색. 문맥까지 잘 설명된 글이 많다.

```javascript
db.select()
  .from(table)
  .where(table.done.eq(false))
  .exec()
  .then(result=>{
    console.log(result);
  });
```


### *모든 쿼리 작성 및 실행 전에 매번 스키마 빌더로 테이블을 생성하고 인스턴스를 가져와야 한다.

앞서 `connect()` 로 가져온 DB 와 테이블 인스턴스는 1회용이다. 러브 필드는 스키마 생성 절차를 매번 거쳐야 인스턴스를 다시 준다.

그래서 귀찮으면 다음처럼 함수화 시켜 놓고 호출하면 편하다.

```javascript
import lf from "lovefield";

const getDB = () => {
    const schemaBuilder = lf.schema.create("todo", 1);

    schemaBuilder
      .createTable("Item")
      .addColumn("id", lf.Type.INTEGER)
      .addColumn("description", lf.Type.STRING)
      .addColumn("deadline", lf.Type.DATE_TIME)
      .addColumn("done", lf.Type.BOOLEAN)
      // use auto-increment set true
      .addPrimaryKey([
        {
          autoIncrement: true,
          name: "id",
          order: lf.Order.DESC
        }
      ])
      .addIndex("idxDeadline", ["deadline"], false, lf.Order.DESC);

    return schemaBuilder.connect().then(function(db) {
      return { db, table: db.getSchema().table("Item") };
    });
  }

  
const getAll = () => { // 매 쿼리 호출시마다
    return this.getDB() // 스키마 생성 절차를 거쳐야
      .then(function(res) { // 데이터베이스 인스턴스에 접근 가능
        return res.db
          .select()
          .from(res.table)
          .where(res.table.done.eq(false))
          .exec();
      })
      .then(result => {
        console.log(result);
        return result;
      });
  }  
```

> 함수 내부에서 this 를 참조하지 않기 때문에 화살표 함수를 사용함. this 쓸 거면 `function(){}` 사용.

타입스크립트 예시는 아래 :

https://github.com/baramofme/Typescript-Vuetify-SPA-Base-CodeSandBox/blob/master/src/services/loveFieldService.ts
