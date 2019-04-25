# AlaSQL.js Lesson : 설치(일부 번역)

원문 : https://github.com/agershun/alasql/wiki/Install

## Node.js

노드 (> = 0.10)의 경우 npm으로 설치하십시오.

```bash
npm install alasql --save
```

alasql을 require 하고 새 데이터베이스를 작성하여 SQL 실행을 시작하십시오.

```javascript
var alasql = require('alasql');

var db = new alasql.Database();

db.exec("CREATE TABLE example (a INT, b INT)");

// 자바스크립트 객체로부터 자료를 직접 넣을 수도 있습니다...
db.tables.example1.data = [ 
    {a:5,b:6},
    {a:3,b:4}
];

// ...혹은 일반 SQL 로 자료를 삽입할 수도 있습니다. 
db.exec("INSERT INTO example1 VALUES (1,3)");

var res = db.exec("SELECT * FROM example1 ORDER BY b DESC");

// res 행은 이 객체의 배열을 포함합니다.:
// [{a:1,b:3},{a:3,b:4},{a:3,b:4}]
```


## 명령 행

You can access AlaSQL from the comandline by installing from npm globally

npm을 전역에 설치하여 명령행에서 AlaSQL에 액세스 할 수 있습니다.

```bash
npm install alasql -g
```

이제 명령행을 통해 alasql에 액세스 할 수 있습니다.

```bash
> alasql "SELECT * INTO json('my.json') from xlsx('cities.xlsx',{headers:true}) WHERE population > 20000000"
```
JSON 대신 값을 얻으려면 VALUE를 SELECT에 추가 할 수 있습니다.

?는 해당 n 번째 인수로 바뀝니다.

```bash
alasql "VALUE SELECT 20-?+?" 5 100
```

더 많은 예제를 [위키](./ alasql-cli)에서 보세요.

