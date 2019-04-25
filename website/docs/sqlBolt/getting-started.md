# AlaSQL.js Lesson : 시작해보기

https://github.com/agershun/alasql/wiki/Getting-started

AlaSQL을 [포함/요구/설치](./install) 한 후에 객체 alasql이 모듈의 주 변수입니다. 즉시 기본 데이터베이스로 사용할 수 있습니다.

브라우저에서  :

    <script src="alasql.js"></script>
    <script>
        alasql('CREATE TABLE one (two INT)');
    </script>

[AlaSQL console](http://alasql.org/console?CREATE TABLE one (two INT))에서 시도해보세요

Node.js 에서:

    var alasql = require('alasql');
    alasql('CREATE TABLE one (two INT)');

다른 방법은 새 데이터 베이스를 만드는 것:

    var mybase = new alasql.Database();
    mybase.exec('CREATE TABLE one (two INT)');
    
데이터 베이스에 이름을 주고 alasql 에서 접근할 수 있습니다:

    var mybase = new alasql.Database('mybase');
    console.log(alasql.databases.mybase);
    
> 테스트 오류 : TypeError: Cannot read property 'myTable' of undefined
    
각 데이터베이스는 다음의 메소드와 함께 사용될 수 있습니다:    

    var db = new alasql.Database() - 새 alasql-database 생성
    var res = db.exec("SELECT * FROM one") -  SELECT 쿼리 실행 후 객체의 배열을 반환받음
     
<query-pane :hideTask="true"></query-pane>     
     
일반적으로 alasql.js는 동기식으로 작동하지만 콜백을 사용할 수 있습니다.

    db.exec('SELECT * FROM test', [], function(res){
        console.log(res);
    });
    
혹은 promise() 를 사용할 수도 있죠

    alasql.promise('SELECT * FROM test')
    .then(function(res){
        // 자료 처리
    }).catch(function(err){
        // 오류 처리
    });
    
컴파일 구문을 사용할 수 도 있습니다:

    var insert = db.compile('INSERT INTO one (1,2)');
    insert();
    
컴파일되고 번역된 구문에 매개변수를 사용할 수 있습니다:

    var insert1 = db.compile('INSERT INTO one (?,?)');
    var insert2 = db.compile('INSERT INTO one ($a,$b)');
    var insert3 = db.compile('INSERT INTO one (:a,:b)');

    insert1([1,2]);
    insert2({a:1,b:2});
    insert3({a:3,b:4});

    db.exec('INSERT INTO one (?,?)',[5,6]);
    
심지어 FROM 구절에서도 매개변수를 쓸 수 있습니다.:

        var years = [
            {yearid: 2012}, {yearid: 2013},
            {yearid: 2014}, {yearid: 2015},
            {yearid: 2016},
        ];

        var res = alasql.queryArray('SELECT * FROM ? AS years ' +
            'WHERE yearid > ?', [years,2014]);

        // res == [2015,2016]

## JSON 데이터에서 직접 작업
필드별로 JSON 데이터 및 JavaScript 배열을 직접 작업하고 각 그룹의 레코드 수를 계산합니다.:

    var data = [{a:1,b:1,c:1},{a:1,b:2,c:1},{a:1,b:3,c:1}, {a:2,b:1,c:1}];
   
    var res = alasql('SELECT a, COUNT(*) AS b FROM ? GROUP BY a',[data]);
    console.log(res);

## 배열들의 배열
배열 배열을 사용하여 쿼리 만들 수 있습니다. 
이 경우 열 이름에  like[1] 이나 table[2] 처럼 대괄호를 사용할 수 있습니다. 
(기억하세요, JavaScript 의 모든 배열은 0부터 시작합니다.):

        var data = [
            [2014, 1, 1], [2015, 2, 1],
            [2016, 3, 1], [2017, 4, 2],
            [2018, 5, 3], [2019, 6, 3]
        ];
        var res = alasql('SELECT SUM([1]) FROM ? d WHERE [0]>2016', [data]);
        
배열 배열을 반환하려면 alasql.queryArrayOfArrays () 함수를 사용하십시오.. 
이 경우 괄호 안에 숫자나 숫자를 사용하여 선택한 열의 배열 위치를 지정할 수 있습니다:

        var res = alasql.queryArrayOfArrays(
            'SELECT [1] AS 0,[1]+[2] AS [1] FROM ? d WHERE [0]>2016', [data]);
            
이 기능은 배열 필터로 사용할 수 있습니다.:

        // 같은 필터 
        var res1 = alasql.queryArrayOfArrays('SELECT * FROM ? a WHERE [0]>2016', [data]);
        var res2 = data.filter(function(a){return a[0]>2016});

        // 집계가있는 복잡한 필터, 묶기와 정렬
        var res = alasql.queryArrayOfArrays(
            'SELECT [2] AS 0, SUM([1]) AS 1 FROM ? a WHERE a[0]>? GROUP BY [0] ORDER BY [1]', 
            [data, 2016]);
            
## SQL 을 IndexedDB 로 작업하기:
IndexedDB 데이터베이스를 연결 한 다음 두 개의 조인 된 테이블에서 복잡한 쿼리를 필터링하고 필터링합니다.:

    alasql(’ATTACH INDEXEDDB DATABASE MyBase; \ 
            USE MyBase; \
            SELECT City.* \
                   FROM City \
                   JOIN Country USING CountryCode \
                   WHERE Country.Continent = ”Asia”’, [], function (res) {
              console.log(res.pop());
    }); 

브라우저 다중 행 SQL 문에서:

    <script src="http://alasql.org/console/alasql.min.js"></script>
    <div id="res"></div>
    <script type="text/sql" id="sql">
    CREATE TABLE people (
        Id INT PRIMARY KEY,
        FirstName STRING,
        LastName STRING
    );
    
    INSERT INTO people VALUES 
        (1,"Peter","Peterson"),
        (2,"Eric","Ericson"),
        (3,"John","Johnson");

    IF EXISTS (SELECT * FROM people WHERE Id=2)
        UPDATE people SET FirstName = "Roll", LastName = "Rolson" WHERE Id=2
    ELSE
        INSERT INTO people VALUES (2,"Eric","Rollson");

    IF EXISTS (SELECT * FROM people WHERE Id=4)
        UPDATE people SET FirstName = "Roll", LastName = "Rolson" WHERE Id=4
    ELSE
        INSERT INTO people VALUES (4,"Smith","Smithson");

    SELECT * INTO HTML("#res",{headers:true}) FROM people;
    </script>
    <script>
        alasql('SOURCE "#res"');
    </script>
    
[jsFiddle](http://jsfiddle.net/agershun/n4de6433/4/)에서 이 예제를 사용해보십시오.
