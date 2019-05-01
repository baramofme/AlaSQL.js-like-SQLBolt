# AlaSQL.js Lesson : 테이블 생성

## 도식, 개체 그리고 관계

데이터베이스의 도식(schema)은 데이터 베이스가 정보를 인지하는 기본 구조다.

정보는 주로 개체(entities)로 표현된다. 개체의 사전적 정의는 `a thing with distinct and independent existence`다. 즉, 독립적으로 식별할 수 있는 것.

즉, 데이터베이스의 도식은 다른 것과 독립적으로 식별 가능한 어떤 것을 인식하는 구조이다.

그리고 이런 도식과 도식은 관계를 맺을 수 있고 이런 관계를 통해 새로운 도식을 만들어낼 수 도 있다.

결과적으로, 스키마는 관계형 테이타베이스의 구조다.

### 도식, 개체의 예

다른 것과 구별하려면 그 개체와 다른 것과의 차이점, 즉 특성(property)이 있어야 한다.

내가 개를 떠올릴 때 함께 떠올리는 개만의 특성은 꼬리 유무, 짖는 소리다.

이를 2차원의 인지 도식으로 표현하자면 다음과 같다.

|꼬리유무|짖는 소리|털 덮음 정도|생김새| 개 이름|
|---|---|---|---|---|
|있음|멍멍|몸 전체 다|개 모양|앙구앙구|

그리고 이 인지 도식은 개라는 추상화된 개념이므로 해당 개념이 적용되는 모든 인스턴스에 적용이 가능하다.  

|꼬리유무|짖는 소리|털 덮음 정도|생김새| 개 이름|
|---|---|---|---|---|
|있음|멍멍|몸 전체 다|개 모양|앙구앙구
|있음|멍멍|몸 전체 다|개 모양|앙구앙구
|있음|멍멍|몸 전체 다|개 모양|띵구
|있음|머웅|몸 전체 다|개 모양|뭉구
|있음|먕먕|털 밀었음|개 모양|먕먕이

그리고 개념은 실제의 손상된 반영이니 정확한 존재를 반영하지 못할 뿐더러 속성만으로는 같은 개체도 생긴다.

엔티티의 인스턴스들을 고유하게 구별하기 위한 속성을 추가해서 구별을 해보자.

|꼬리유무|짖는 소리|털 덮음 정도|생김새| 개 이름|소유권|
|---|---|---|---|---|---|
|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|있음|멍멍|몸 전체 다|개 모양|띵구|친구 개|
|있음|머웅|몸 전체 다|개 모양|뭉구|애인 개|
|있음|먕먕|털 밀었음|개 모양|먕먕이|옆집 개|

안 되겠다. 속성만으로는 어떤 임의의 고유 번호를 추가해보자.

|고유번호|꼬리유무|짖는 소리|털 덮음 정도|생김새| 개 이름|소유권|
|---|---|---|---|---|---|---|
|1|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|2|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|3|있음|멍멍|몸 전체 다|개 모양|띵구|친구 개|
|4|있음|머웅|몸 전체 다|개 모양|뭉구|애인 개|
|5|있음|먕먕|털 밀었음|개 모양|먕먕이|옆집 개|

이제, 꼬리유무, 짖는 소리 등의 속성을 가지고 다른 것과 구별할 수 있는 '개'라는 개체(엔티티)를 2차원의 인지도식(스키마)로 표현할 수 있다.

또한 해당 도식에 맞는 여러 가지 것 중 고유번호 혹은 특성들의 조합을 통해서 특정 '인스턴스'를 구별해 낼 수도 있다.

### 관계 예시

이젠 두 인지 도식의 관계를 가지고 무엇을 할 수 있나 보자.

|고유번호|꼬리유무|짖는 소리|털 덮음 정도|생김새| 개 이름|소유권|
|---|---|---|---|---|---|---|
|1|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|2|있음|멍멍|몸 전체 다|개 모양|앙구앙구|우리 개|
|3|있음|멍멍|몸 전체 다|개 모양|띵구|친구 개|
|4|있음|머웅|몸 전체 다|개 모양|뭉구|여 개|
|5|있음|먕먕|털 밀었음|개 모양|먕먕이|옆집 개|

|고유번호|개 소유권|소유자 주거형태|퇴근시간|주 평균 산책횟수|
|---|---|---|---|---|
|1|우리 개|아파트|오후 10시|0회|
|2|친구 개|주택|오후 5시|5회|
|3|애인 개|빌라|오후 7시|3회|

각종 통계 기법을 적용해서 두 자료의 관계(소유자)로 자료를 가공해 새로운 도식을 만든 다음, 아래와 같은 질문들에 대답할 수 있다.

* 소유자 주거형태에 따른 개 모양새(품종)의 분포
* 소유자 퇴근시간에 따른 개 행복도(산책횟수를 매개로 한)
* 소유자 산책회수에 영향을 미치는 주거형태

## AaSQL.js 테이블 생성

원문 : [AlaSQL Create Table](https://github.com/agershun/alasql/wiki/Sql), [SQLBolt Creating tables](https://sqlbolt.com/lesson/creating_tables)

새 개체와 관계, 즉 엔티티 스키마를 데이터베이스에 저장하려고 할 때, SQL 에서는 `CREATE TABLE` 구문을 통해 테이블로 생성할 수 있다.

```sql
// 테이블 생성 구문/ 추가적인 테이블 제약사항과 기본 값 포함
CREATE TABLE IF NOT EXISTS Asset (
    column 데이터종류 테이블_제약 DEFAULT 기본_값,
    another_column 데이터종류 테이블_제약 DEFAULT 기본_값,
    …
);
```

고유번호, 자산명, 시간을 속성으로 가지는 자산이라는 엔티티를 데이터 베이스 테이블로 생성해보자.

```sql
CREATE TABLE IF NOT EXIST Asset{
    id STRING PRIMARY KEY,
    asset STRING,
    timestamp INTEGER
}
```

AlaSQL.js 에서 그대로 쓸 수 있지만, 중괄호 대신 소괄호를 쓴다는 점이 다르다.

```js
alasql('CREATE TABLE star (  \
                one INT DEFAULT 100, \
                two STRING,\
                three BOOL PRIMARY KEY); \
    ');
    alasql('CREATE TABLE flight (flightNo INT, fromCity STRING, toCity STRING)');
```

## 데이터 타입

### 기본 자료 타입

|  정수 | 십진수 | 부동 소수점수 | Serial |
| :---: | :---: | :---: | :---: |
|  number with truncation | *(number)* | *(number)* | *(number with AUTO_INCREMENT)* |
|  *- smallint* | *- decimal* | *- real* | *- smallserial* |
|  *- integer* | *- numeric* | *- double precision* | *- serial* |
|  *- bigint* | ** | ** | *- bigserial* |

|  문자 | 날짜/시간 | Boolean  | Monetary |
| :---: | :---: | :---: | :---: |
|  *(string)* | *(string and Date)* | *(boolean)* | (number) |
|  *- character varying(n), varchar(n), nvarchar(n)* | *- date - string* | *- boolean* | *- money* |
|  *- character(n), char(n), nchar(n)* | *- time - string* | ** | ** |
|  *- text* | *- interval (number) - in milliseconds* | ** | ** |
|  ** | *- Date - JavaScript Date object class* | ** |  |

### 복잡한 자료 타입

|  Enumeration (array of strings or numbers) | JSON | UUID | 배열 |
| --- | --- | --- | --- |
|  ** | *(object)* | *(string)* | *(object)* |
|  *- enum* | *- json* | *- UUID* | *- multidimensional array[] - not yet realized, but can be imitated with JSON type* |
|  ** | *- jsonb - not yet realized* | ** | ** |

|  Text Search | XML  | Range  | OID |
| --- | --- | --- | --- |
|  ** | (object with special structure) | *(object)* | ** |
|  *- tsvector - not realized* | *- xml - partially realized for SEARCH* | *- numrange - not yet realized* | *- not realized yet* |
|  *- tsquery - not realized* | *- html - not realized* | *- tsrange - not yet realized* | ** |
|  ** | ** | *- daterange - not yet realized* | ** |

|  Composite  | Geometric Types | Network Address Types | Bit String |
| --- | --- | --- | --- |
|  *(object)* | ** | ** | ** |
|  *- composite - not yet realized, but can be imitated with JSON type. See also CLASS type* | *- Not realized* | *- Not realized* | *- Not realized* |

### 그래프 데이터 타입

|  Class | Object | Document  | Object reference |
| --- | --- | --- | --- |
|  (realized with tables) | (object) | (object) | (number or string) |
|  - class | - object, json - JavaScript object class | - TBD | - TBD |

|  Domain | Pseudo |  |  |
| --- | --- | --- | --- |
|  - TBD | - not yet realized |  |  |

AlaSQL supports a number of standard SQL and JavaScript data types.

## 제약 조건

|  **Constraint** | Description |
| --- | --- |
|  **PRIMARY KEY** | This means that the values in this column are unique, and each value can be used to identify a single row in this table. |
|  **AUTOINCREMENT** | For integer values, this means that the value is automatically filled in and incremented with each row insertion. Not supported in all databases. |
|  **UNIQUE** | This means that the values in this column have to be unique, so you can't insert another row with the same value in this column as another row in the table. Differs from the `PRIMARY KEY` in that it doesn't have to be a key for a row in the table. |
|  **NOT NULL** | This means that the inserted value can not be `NULL`. |
|  **CHECK (expression)** | This is allows you to run a more complex expression to test whether the values inserted are value. For example, you can check that values are positive, or greater than a specific size, or start with a certain prefix, etc. |
|  **FOREIGN KEY** | This is a consistency check which ensures that each value in this column corresponds to another value in a column in another table.<br/><br/>For example, if there are two tables, one listing all Employees by ID, and another listing their payroll information, the `FOREIGN KEY` can ensure that every row in the payroll table corresponds to a valid employee in the master Employee list. |




## 연습

<query-pane hideTask="false" scriptName="getting-started"/>

1. Create a new table named Database with the following columns:
– Name A string (text) describing the name of the database
– Version A number (floating point) of the latest version of this database
– Download_count An integer count of the number of times this database was downloaded
This table has no constraints.

```plsql
CREATE Table Database {
    Name TEXT,
    Version FLOAT,
    Download_count INTEGER
};
```
