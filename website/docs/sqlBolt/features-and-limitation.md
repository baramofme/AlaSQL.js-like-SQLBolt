
# AlaSQL.js Lesson 0: 좋아할만한 기능과 한계


## 당신이 좋아할만한 기능


### 전통적인 SQL

여러 수준의 데이터로 "좋은 예전"SQL을 사용하십시오.: 
`JOIN`, `VIEW`, `GROUP BY`, `UNION`, `PRIMARY KEY`, `ANY`, `ALL`, `IN`, `ROLLUP()`, `CUBE()`, `GROUPING SETS()`, `CROSS APPLY`, `OUTER APPLY`, `WITH SELECT`, 그리고 서브쿼리도. 
[위키는 지원되는 SQL 문과 키워드를 나열합니다.].

[위키는 지원되는 SQL 문과 키워드를 나열합니다.]:https://github.com/agershun/alasql/wiki/SQL%20keywords

### SQL에서 사용자 정의 함수

사용자 정의 함수를 정의하여 SQL 및 JavaScript의 모든 이점을 함께 사용할 수 있습니다. alasql.fn 객체에 새 함수를 추가하기 만하면됩니다:


```js
alasql.fn.myfn = function(a,b) {
    return a*b+1;
};
var res = alasql('SELECT myfn(a,b) FROM one');
```

자신의 집계 함수를 정의 할 수도 있습니다 (자신의`SUM (...)`처럼). 
[위키](https://github.com/agershun/alasql/wiki/User-Defined-Functions) 를 보세요.

### 컴파일 된 구문 및 함수

```js
var ins = alasql.compile('INSERT INTO one VALUES (?,?)');
ins(1,10);
ins(2,20);
```

[위키](https://github.com/agershun/alasql/wiki/Compile)를 보세요.


### 자바 스크립트 데이터에 대한 SELECT

필드별로 자바 스크립트 배열을 그룹화하고 각 그룹의 레코드 수를 계산합니다.:

```js
var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a', [data] );
```

창조적인 데이터 조작을위한 더 많은 아이디어를 [위키 내](https://github.com/agershun/alasql/wiki/Getting-started)에서 보기

### 자바 스크립트 설탕구문

AlaSQL은 "오래되고 좋은"SQL을 JavaScript에 가깝게 확장합니다. "설탕"에는 다음이 포함됩니다.:

* Json 객체 작성하기 - `{a:'1',b:@['1','2','3']}`

* 객체 속성에 액세스합니다. - `obj->property->subproperty`
* 객체 및 배열 요소에 액세스 - `obj->(a*1)`
* JavaScript 함수에 액세스 - `obj->valueOf()`
* 다음 형식으로 쿼리 출력 형식 지정 `SELECT VALUE, ROW, COLUMN, MATRIX`
* ES5 다중 선 SQL `var SQL = function(){/*SELECT 'MY MULTILINE SQL'*/}` 작성하고 SQL 문자열 대신 전달 (코드를 압축하면 작동하지 않습니다.)

### Excel 및 원시 데이터 파일 읽기 및 쓰기

CSV, TAB, TXT 및 JSON 파일에서 가져오고 내보낼 수 있습니다. 파일 확장명을 생략 할 수 있습니다. 파일에 대한 호출은 항상 비동기이므로 다중 파일 쿼리는 연결되어야합니다:

```js
var tabFile = 'mydata.tab';

alasql.promise([
    "SELECT * FROM txt('MyFile.log') WHERE [0] LIKE 'M%'", // 매개변수 없는 쿼리
    [ "SELECT * FROM tab(?) ORDER BY [1]", [tabFile] ],    // [쿼리, 매개변수 배열]
    "SELECT [3] AS city,[4] AS population FROM csv('./data/cities')",
    "SELECT * FROM json('../config/myJsonfile')"
]).then(function(results){
    console.log(results);
}).catch(console.error);
```


### SQLite 데이터베이스 파일 읽기

AlaSQL은 [SQL.js] 라이브러리를 사용하여 SQLite 데이터 파일을 읽을 수는 있지만 쓸 수는 없습니다.:

[SQL.js]: https://github.com/kripken/sql.js 

```html
<script src="alasql.js"></script>
<script src="sql.js"></script>
<script>
    alasql([
        'ATTACH SQLITE DATABASE Chinook("Chinook_Sqlite.sqlite")',
        'USE Chinook',
        'SELECT * FROM Genre'
    ]).then(function(res){
        console.log("Genres:",res.pop());
    });
</script>
```

`sql.js` 호출은 항상 비동기입니다.

### AlaSQL은 콘솔에서 작동합니다. - CLI

노드 모듈은`alasql` 명령 행 도구와 함께 제공됩니다:

```bash
$ npm install -g alasql ## 모듈을 전 전역으로 설치

$ alasql -h ## 사용 정보를 보여줍니다.

$ alasql "SET @data = @[{a:'1',b:?},{a:'2',b:?}]; SELECT a, b FROM @data;" 10 20
[ 1, [ { a: 1, b: 10 }, { a: 2, b: 20 } ] ]

$ alasql "VALUE OF SELECT COUNT(*) AS abc FROM TXT('README.md') WHERE LENGTH([0]) > ?" 140
// README.md 에서 140 자 이상을 가진 줄 여러 개를 가져오기
```

[더 많은 예제가 wiki에 포함되어 있습니다.]

[더 많은 예제가 wiki에 포함되어 있습니다.]: https://github.com/agershun/alasql/wiki/AlaSQL-CLI


## 좋아할만한 기능

### AlaSQL ♥ D3.js

AlaSQL은 d3.js와 잘 어울리 며 데이터의 특정 하위 집합을 D3의 시각적 요소와 통합하는 편리한 방법을 제공합니다. 위키의 [D3.js와 AlaSQL]에 대해 자세히보기

[D3.js와 AlaSQL]: https://github.com/agershun/alasql/wiki/d3.js

### AlaSQL ♥ Excel

AlaSQL은 데이터를 [Excel 2003 (.xls)] 및 [Excel 2007 (.xlsx)] 형식으로 셀 색 지정 및 다른 Excel 서식 지정 기능으로 내보낼 수 있습니다.

[Excel 2003 (.xls)]: https://github.com/agershun/alasql/wiki/XLS 
[Excel 2007 (.xlsx)]: https://github.com/agershun/alasql/wiki/XLSX

### AlaSQL ♥ Meteor

Meteor is amazing. You can query directly on your Meteor collections with SQL - simple and easy. See more about [Meteor and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Meteor)

### AlaSQL ♥ Angular.js

Angular is great. In addition to normal data manipulation, AlaSQL works like a charm for exporting your present scope to Excel. See more about [Angular and AlaSQL in the wiki](https://github.com/agershun/alasql/wiki/Angular.js)

### AlaSQL ♥ Google Maps

지도에서 정확한 데이터를 찾는 게 쉽습니다. 
AlaSQL은 Excel 또는 CSV와 같은 Google Maps의 소스 데이터를 준비하여 연관된 항목을 가져와 식별하는 한 작업 단위 를 만듭니다.
[위키의 Google지도 및 AlaSQL]을 보세요.

[Google Maps and AlaSQL in the wiki]: https://github.com/agershun/alasql/wiki/Google-maps

### AlaSQL ♥ Google Spreadsheets

AlaSQL은 Google 스프레드 시트에서 직접 데이터를 쿼리 할 수 있습니다. 손쉬운 편집과 강력한 데이터 조작을 위한 훌륭한 "파트너십"입니다. 
[위키의 Google 스프레드 시트 및 AlaSQL]를 보세요.

[위키의 Google 스프레드 시트 및 AlaSQL]: https://github.com/agershun/alasql/wiki/Google-Spreadsheets

### Miss a feature?
Take charge and [add your idea](http://feathub.com/agershun/alasql/features/new) or [vote for your favorite feature](http://feathub.com/agershun/alasql) to be implemented:

[![Feature Requests](http://feathub.com/agershun/alasql?format=svg)](http://feathub.com/agershun/alasql)


## Limitations

AlaSQL에는 [버그]가 있습니다. 몇 가지 버그가있는 것 외에 몇 가지 제한 사항이 있습니다.:

[버그]: https://github.com/agershun/alasql/labels/Bug

0. AlaSQL은 열 이름에 사용될 경우 이스케이프해야하는 (긴) 키워드 목록을 가지고 있습니다. 
`key`라는 필드를 선택할 때 ```SELECT `key` FROM ...``` 을 쓰십시오. 
이것은 ``` `value` ```, ``` `read` ```, ``` `count` ```, ``` `by` ```, ``` `top` ```, ``` `path` ```, ``` `deleted` ```, ``` `work` ``` 그리고 ``` `offset` ``` 경우에도 마찬가지입니다. 
[전체 키워드 목록]을 참조하십시오.

[전체 키워드 목록]: https://github.com/agershun/alasql/wiki/AlaSQL-Keywords

0. 1000000 개의 레코드를 'SELECT'하거나 각 테이블에 10000 개의 레코드가있는 두 개의 테이블을 'JOIN' 해도 괜찮습니다. 
(스트리밍 기능을 사용하여 더 긴 데이터 소스로 작업 할 수 있습니다. - [test/test143.js](test/test143.js) 보세요) 
그러나 작업량이 곱해 지므로 각 행에 100 개의 행을 가진 8 개 이상의 테이블에서 SELECT를하면 나쁜 성능을 보일 것입니다. 
이것은 우리의 최우선 과제 중 하나입니다..

0. 트랜잭션 제한 기능 (localStorage 만 지원) - AlaSQL이 'PRIMARY KEY'/ 'FOREIGN KEY'를 처리하는보다 복잡한 접근 방식으로 전환 했으므로 트랜잭션이 제한적입니다. 트랜잭션은 미래 버전에서 완전히 다시 켜집니다.

0. 2 개 이상의 테이블의`(Full) OUTER JOIN`과`RIGHT JOIN`은 예상 결과를 생성하지 않습니다. `INNER JOIN`과`LEFT JOIN`은 괜찮습니다.

0. 다른 테이블의 이름이 같은 필드를 원하면 별칭을 사용하십시오. (`SELECT a.id AS a_id, b.id AS b_id FROM ?`).

0. 현재 AlaSQL은 JSZip 3.0.0에서 작동하지 않습니다.- 버전 2.x를 사용하십시오..

0. 'SELECT '하위의 JOIN이 작동하지 않습니다. `with` 구조체를 사용하거나 ([예시](https://github.com/agershun/alasql/issues/832#issuecomment-377574550)) 
변수에 서브-셀렉트를 가져 와서 인수로 넘겨 준다.([예시](https://github.com/agershun/alasql/issues/832#issuecomment-377559478)).

0. AlaSQL은 브라우저에서 로컬로 파일을 저장하는 라이브러리인 [FileSaver.js](https://github.com/eligrey/FileSaver.js/)를 사용합니다. 
Safari 8.0에서는 파일을 저장하지 않습니다.

아마도 다른 많은 것들이있을 것입니다. [문제 제기](https://github.com/agershun/alasql/issues)하여 해결하도록 도와주세요.. 고맙습니다!


## 어떻게

### AlaSQL을 사용하여 CSV에서 Excel로 데이터 변환

ETL 예제:

```js
alasql([
    'CREATE TABLE IF NOT EXISTS geo.country',
    'SELECT * INTO geo.country FROM CSV("country.csv",{headers:true})',
    'SELECT * INTO XLSX("asia") FROM geo.country WHERE continent_name = "Asia"'
]).then(function(res){
    // results from the file asia.xlsx
});
```

### AlaSQL을 웹 워커로 사용

AlaSQL은 웹 워커에서 실행할 수 있습니다. 실행 중 AlaSQL과의 모든 상호 작용은 비동기 이어야합니다.

브라우저 스레드에서, 브라우저 빌드`alasql-worker.min.js`는 자동으로 웹 작업자를 사용합니다:

```html
<script src="alasql-worker.min.js"></script>
<script>
var arr = [{a:1},{a:2},{a:1}];

alasql([['SELECT * FROM ?',[arr]]]).then(function(data){
    console.log(data);
});
</script>
```

[Live Demo](https://jsfiddle.net/3vnmu2fo).

표준 빌드`alasql.min.js`는`alasql.worker ()`가 호출되면 웹 워커를 사용합니다:

```html
<script src="alasql.min.js"></script>
<script>
alasql.worker();
alasql(['SELECT VALUE 10']).then(function(res){
    console.log(res);
}).catch(console.error);
</script>
```

[Live Demo](http://jsfiddle.net/osxvdp5k/).

웹 워커 (Web Worker)에서`importScripts`를 사용하여`alasql.min.js` 파일을 가져올 수 있습니다 :

```js
importScripts('alasql.min.js');
```

### Webpack, Browserify, Vue 그리고 React (네이티브)

브라우저를 타겟팅 할 때 Webpack 및 Browserify와 같은 여러 코드 묶음 기가 원치 않는 모듈을 선택합니다.

다음은 AlaSQL이 특정 환경이나 특정 기능에 필요할 수있는 모듈 목록입니다:

* Node.js
  * fs
  * net
  * tls
  * request
  * path
* React Native
  * react-native
  * react-native-fs
  * react-native-fetch-blob
* Vertx
  * vertx
* Agonostic
  * XLSX/XLS support
    * cptable
    * jszip
    * xlsx
    * cpexcel
  * es6-promise

#### 웹팩

Webpack으로 AlaSQL을 처리하는 몇 가지 방법이 있습니다.:

##### IgnorePlugin

가져올 모듈을 제어하려는 경우 이상적입니다..

```js
var IgnorePlugin =  require("webpack").IgnorePlugin;

module.exports = {
  ...
  // fs, path, xlsx, request, vertx, 그리고 react-native modules 을 무시하는데 유용합니다.
  plugins:[new IgnorePlugin(/(^fs$|cptable|jszip|xlsx|^es6-promise$|^net$|^tls$|^forever-agent$|^tough-cookie$|cpexcel|^path$|^request$|react-native|^vertx$)/)]
};
```

##### module.noParse

As of AlaSQL 0.3.5, you can simply tell Webpack not to parse AlaSQL, which avoids all the dynamic `require` warnings and avoids using `eval`/clashing with CSP with script-loader.
[Read the Webpack docs about noParse](https://webpack.github.io/docs/configuration.html#module-noparse)

AlaSQL 0.3.5부터는 Webpack에 AlaSQL을 구문 분석하지 말라고 할 수 있습니다. 이것은 모든 동적`require` 경고를 피하고 스크립트 로더와 함께 CSP와`eval` / clashing을 사용하는 것을 피합니다.

```js
...
//Don't parse alasql
{module:noParse:[/alasql/]}
```


##### script-loader

위의 두 솔루션 모두 요구 사항을 충족시키지 못하면 [스크립트 로더]를 사용하여 AlaSQL을 로드 할 수 있습니다.

[스크립트 로더]: https://github.com/webpack/script-loader

```js
//script-loader를 사용하여 전역 범위에 alasql로드
import "script!alasql"
```

이것은`eval`을 허용하지 않는 CSP를 가지고 있다면 문제를 일으킬 수 있습니다.

#### Browserify

[excluding](https://github.com/substack/browserify-handbook#excluding), [ignoring](https://github.com/substack/browserify-handbook#ignoring), 그리고 [shimming](https://github.com/substack/browserify-handbook#shimming)을 읽어보세요

예 (제외 사용)

```js
var browserify = require("browserify");
var b = browserify("./main.js").bundle();
//Will ignore the modules fs, path, xlsx
["fs","path","xlsx",  ... ].forEach(ignore => { b.ignore(ignore) });
```

#### Vue

일부 프레임 워크 (ligue Vue) alasql 은 XLSX 자체 액세스 할 수 있습니다. AlaSQL을 다음과 같이 포함 시키면 좋습니다.:

```import alasql from 'alasql';
import XLSX from 'xlsx';
alasql.utils.isBrowserify = false;
alasql.utils.global.XLSX = XLSX;
```

#### jQuery

요소에 대해 jQuery 이벤트가 아닌 원래 이벤트를 보내야합니다.(`myEvent` 대신`event.originalEvent`를 사용하십시오.)

### JSON-object

데이터베이스에서 JSON 객체를 사용할 수 있습니다.(객체의 심도있는 비교를 위해 == 및! == 연산자를 사용하는 것을 잊지 마십시오.):

```sql

alasql> SELECT VALUE {a:'1',b:'2'}

{a:1,b:2}

alasql> SELECT VALUE {a:'1',b:'2'} == {a:'1',b:'2'}

true

alasql> SELECT VALUE {a:'1',b:'2'}->b

2

alasql> SELECT VALUE {a:'1',b:(2*2)}->b

4

```

콘솔에서 AlaSQL JSON 객체 사용해보기 [sample](http://alasql.org/console?drop table if exists one;create table one;insert into one values {a:@[1,2,3],c:{e:23}}, {a:@[{b:@[1,2,3]}]};select * from one)


## 실험적인 기능

_유용한 물건이지만 용이 있을지 모릅니다._

### Graphs

AlaSQL은 검색하거나 조작 할 수있는 그래프를 지원하는 다중 패러다임 데이터베이스입니다.

```js
// Alice의 연인을 사랑하는 분?
var res = alasql('SEARCH / ANY(>> >> #Alice) name');
console.log(res) // ['Olga','Helen']
```

[위키](https://github.com/agershun/alasql/wiki/GRAPH)참조 하세요.

### localStorage 및 DOM 저장소

브라우저 localStorage와 [DOM-storage]를 데이터 저장소로 사용할 수 있습니다. 다음은 샘플입니다.

[DOM-storage]: https://github.com/node-browser-compat/dom-storage

```js
alasql('CREATE localStorage DATABASE IF NOT EXISTS Atlas');
alasql('ATTACH localStorage DATABASE Atlas AS MyAtlas');
alasql('CREATE TABLE IF NOT EXISTS MyAtlas.City (city string, population number)');
alasql('SELECT * INTO MyAtlas.City FROM ?',[ [
        {city:'Vienna', population:1731000},
        {city:'Budapest', population:1728000}
] ]);
var res = alasql('SELECT * FROM MyAtlas.City');
```

[jsFiddle](http://jsfiddle.net/agershun/x1gq3wf2/)에서 이 샘플을보십시오. 이 샘플을 
2~3 번 실행하시고  AlaSQL 은 localStorage에 점점 더 많은 자료를 저장할 겁니다. 
여기에, "Atlas" 는 로컬 스토리지 데이터베이스 이름이고 "MyAtlas" 눈 메모리 내의 AlaSQL 데이터베이스 입니다.

로컬스토리지를 두 모드로 사용할 수 있습니다: 각 구문 후에 즉시 자료를 로컬 스토리지에 저장하려면 `SET AUTOCOMMIT ON`  그게 아니면 `SET AUTOCOMMIT OFF`. 이 경우, 
메모리 내의 미러로부터 모든 자료를 로컬스토리지로 저장히기 위해서 `COMMIT`  구문을 사용할 필요가 있습니다.  

### 플러그인

AlaSQL은 플러그인을 지원합니다. 플러그인을 설치하려면`REQUIRE` 문을 사용해야합니다. 
[위키](https://github.com/agershun/alasql/wiki/Plugins)를 보세요

### Alaserver - 간단한 데이터베이스 서버

예, AlaSQL을 테스트 용으로 매우 간단한 서버로 사용할 수도 있습니다.

실행하려면 명령을 입력하십시오.:

```bash
$ alaserver
```

브라우저에서 <http://127.0.0.1:1337/?SELECT%20VALUE%20(2*2)>을 (를)여십시오.

경고 : Alaserver는 멀티 스레드가 아니며 병행하지 않으며 보안되지 않습니다.


## 테스트

### 회귀 테스트

AlaSQL에는 현재 1200 회 이상의 회귀 테스트가 있습니다, 
그러나 그들은 단지 코드베이스의 [![Coverage]( https://img.shields.io/codecov/c/github/agershun/alasql/develop.svg)](https://rawgit.com/agershun/alasql/develop/test/coverage/lcov-report/dist/alasql.fs.js.html)만 커버합니다.

AlaSQL은 회귀 테스트에`mocha`를 사용합니다. `mocha`를 설치하고 실행하십시오.

```bash
$ npm test
```

혹은 [test/index.html](test/index.html) 을 브라우저 내 테스트를 위해 열어보십시오 (Please serve via localhost with, for example, `http-server`).

#### SQL에서 AlaSQL ASSERT로 테스트

AlaSQL의 [ASSERT](wiki/Assert) 연산자를 사용하여 이전 작업의 결과를 테스트 할 수 있습니다.

```sql
CREATE TABLE one (a INT);             ASSERT 1;
INSERT INTO one VALUES (1),(2),(3);   ASSERT 3;
SELECT * FROM one ORDER BY a DESC;    ASSERT [{a:3},{a:2},{a:1}];
```


