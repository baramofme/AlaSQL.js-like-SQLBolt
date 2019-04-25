
# AlaSQL.js 와 SQL 소개

## SQL 이란?

구조적 쿼리 언어, 구조들은 관계를 가진다.

구조 내부에 정보를 담을 수 있고, 구조들 간의 관계를 가지고 정보를 마음껏 분해 조립할 수 있다.

## 관계형 데이터베이스

관계형 데이터 베이스가 실제로 무엇인지에 관한 모델을 알 필요가 있다.

아래는 하나의 구조(행-열의 2차원)를 보여준다.

<table class="table table-striped table-condensed">
        <tbody><tr>
            <td class="column_name">Id</td>
            <td class="column_name">Make/Model</td>
            <td class="column_name"># Wheels</td>
            <td class="column_name"># Doors</td>
            <td class="column_name">Type</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Ford Focus</td>
            <td>4</td>
            <td>4</td>
            <td>Sedan</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Tesla Roadster</td>
            <td>4</td>
            <td>2</td>
            <td>Sports</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Kawakasi Ninja</td>
            <td>2</td>
            <td>0</td>
            <td>Motorcycle</td>
        </tr>
        <tr>
            <td>4</td>
            <td>McLaren Formula 1</td>
            <td>4</td>
            <td>0</td>
            <td>Race</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Tesla S</td>
            <td>4</td>
            <td>4</td>
            <td>Sedan</td>
        </tr>
    </tbody></table>

SQL 배움의 목적은, 이 데이터에 관해 던져진 구체적인 질문에 대답하는 것이다.

"길에 있는 자동차 종류 중 바퀴가 네 개 이하인 것은?" 이나 "테슬라는 얼마나 많은 자동차 모델을 만드나?"

관계까지 더한다면, 구체적 질문에 대답하기 위해 자료들을 관계지어 보는 것까지.

## AlaSQL.js 란?

AlaSQL - _( [à la](http://en.wiktionary.org/wiki/%C3%A0_la) [SQL]) [ælæ ɛskju:ɛl]_ - 은 관계형 데이터와 스키마없는 데이터 모두에 대해 쿼리 속도와 데이터 소스 유연성에 중점을 둔 JavaScript 용 오픈 소스 SQL 데이터베이스입니다. 웹 브라우저, Node.js 및 모바일 앱에서 작동합니다.

이 라이브러리는 다음을 위해 디자인되었습니다:

* 뚱뚱한 클라이언트 BI 및 ERP 애플리케이션을위한 빠른 메모리 내 SQL 데이터 처리
* 데이터 가져 오기 / 조작 / 여러 형식의 내보내기로 지속성을 위한 쉬운 ETL(extract, transfer, and loading) 및 옵션
* 모든 주요 브라우저, Node.js 및 모바일 애플리케이션

쿼리를 작성할 때 JavaScript의 동적 특성을 이용하여 [속도]에 중점을 둡니다.
실제 솔루션은 데이터의 출처와 저장 위치에 대한 유연성이 필요합니다. 
우리는 당신이 [가져 오기/내보내기] 및 Excel(`.xls`와`.xlsx`), CSV, JSON, TAB, IndexedDB, LocalStorage, SQLite 파일에 저장된 데이터에 직접 쿼리 할 수 있게 함으로써 유연성에 중점을 둡니다.

라이브러리는 전체 데이터베이스 엔진의 편안함을 자바 스크립트 앱에 추가합니다.
진짜 아닙니다. NoSQL (스키마가없는) 데이터 및 그래프 네트워크에 대한 추가 구문을 양념으로 친 [대부분의 SQL-99 언어]를 준수하는 전체 데이터베이스 엔진을 사용하고 있습니다.

[SQL]: http://en.wikipedia.org/wiki/SQL
[import/export]: https://github.com/agershun/alasql/wiki/Import-export 
[most of the SQL-99 language]: https://github.com/agershun/alasql/wiki/Supported-SQL-statements
[speed]: https://github.com/agershun/alasql/wiki/Speed

#### 전통적 SQL 테이블

```js
/* create SQL 테이블 생성 및 자료 추가 */
alasql("CREATE TABLE cities (city string, pop number)");

alasql("INSERT INTO cities VALUES ('Paris',2249975),('Berlin',3517424),('Madrid',3041579)");

/* 쿼리를 실행 */
var res = alasql("SELECT * FROM cities WHERE pop < 3500000 ORDER BY pop DESC");

// res = [ { "city": "Madrid", "pop": 3041579 }, { "city": "Paris", "pop": 2249975 } ]
```

[Live Demo](http://jsfiddle.net/2aorhk1d/)

#### 객체의 배열

```js
var data = [ {a: 1, b: 10}, {a: 2, b: 20}, {a: 1, b: 30} ];

var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);

// res = [ { "a": 1, "b": 40},{ "a": 2, "b": 20 } ]
```

[Live Demo](http://jsfiddle.net/ztfhdrsv/)

#### 스프레드시트

```js
// 파일이 비동기 적으로 읽혀진다.( SQL 에 배열이 주어질 때 프로미스가 반환됨)
alasql(['SELECT * FROM XLS("./data/mydata") WHERE lastname LIKE "A%" and city = "London" GROUP BY name '])
    .then(function(res){
        console.log(res); // output depends on mydata.xls
    }).catch(function(err){
        console.log('Does the file exist? There was an error:', err);
    });
```


#### 벌크 자료 불러오기

```js
alasql("CREATE TABLE example1 (a INT, b INT)");

// 테이블을 위한 alasql의 자료 저장소는 직접 할당이 가능하다
alasql.tables.example1.data = [
    {a:2,b:6},
    {a:3,b:4}
];

// ... 혹은 일반 SQL 로 자료를 조작할 수도 있다
alasql("INSERT INTO example1 VALUES (1,5)");

var res = alasql("SELECT * FROM example1 ORDER BY b DESC");

console.log(res); // [{a:2,b:6},{a:1,b:5},{a:3,b:4}]
```


__당신이 만약 SQL에 익숙하다면, 좋은 성능을 얻으려면 테이블에서 인덱스를 적절하게 사용해야 한다는 것은 놀라운 일이 아니다.__

## 퍼포먼스

AlaSQL 속도를 고려하여 설계되었습니다., 일반적인 SQL 엔진 최적화를 적용했습니다.:

* 쿼리는 컴파일 된 함수로 캐시됩니다.
* 조인된 테이블은 사전 인덱싱됩니다.
* 조인을 위한 `WHERE` 표현식이 미리 필터링됩니다.

[위키의 성능 관련 정보] 보세요

[위키의 성능 관련 정보]: https://github.com/agershun/alasql/wiki/Speed
