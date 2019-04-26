
# SQL Lesson 1: SELECT queries 101

SQL 데이터로부터 자료 수신하려면 보통 쿼리라고 불리는 `SELECT` 구문을 써야함.
쿼리는 우리가 찾는 자료가 뭔지 선언하는 구문이다. 자료를 찾기 전에 어떻게 변경해야 하는 지도 기술이 가능하다.

SQL 에서 테이블은 하나의 개체(entity) 로 생각하고 테이블의 각 행은 해탕 타입의 인스턴스라고 볼 수 있다.

예를 들면, 개라는 개체(entity) 테이블의 각 행은 빨간 개, 비글, 진돗개 등등의 인스턴스로 표현되어질 수 있다.

그 말은 테이블의 행은 모든 인스턴스가 공유하는 공통 속성이란 말이다.

예를 들면 개의 색깔, 개의 나이, 개의 꼬리 길이 등.

특정 열을 찾는 셀렉트 쿼리:

```sql
 SELECT 열, 다른 열 
 From 테이블; 
```

결과는 행과 열로 이뤄진 2차원의 테이블이고, 그 테이블에는 우리가 원하는 열, 다른 열 두 개만 포함되어 있다.

모든 열을 포함하려면 하나씩 다 치는 대신, 애스테릭(*) 단축어를 사용한다.

```sql
 SELECT * 
 From 테이블; 
```

러브필드에도 유사하다.

먼저 테이브 베이스 인스턴스에서 셀렉트 함수를 가져온다.

```js
ds.connect().then(function(db) {
  var selectQueryBuilder = db.select();
});
```

그 다음

```js
db.select().
    from(infoCard).
    from(infoCardDetails).  // exception will be thrown here
    orderBy(infoCard.lang, lf.Order.ASC).
    orderBy(infoCard.itag)  // ok, sort itag after sorting lang
```


## 연습

     
<query-pane :hideTask="true" scriptName="getting-started" ></query-pane>

 
