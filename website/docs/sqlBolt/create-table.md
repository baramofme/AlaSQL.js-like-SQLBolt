# LoveField Lesson 2: 테이블 생성

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

## 러브필드 스키마 정의

스키마는 관계형 테이터베이스의 구조로, **러브 필드**에서는 이름과 버전 숫자를 가진다. 러브 필드는 영구적인 저장 스토어 위에서 따로 스키마 구조를 생성해서 구동하므로, 이름과 버전 숫자를 조합한 유니크한 정보로 생성된 데이터베이스 인스턴스를 확인한다. 자세한 건 [초기화](./spec.md#초기화) 참조.

데이터 베이스 이름은 반드시 러브필드 [이름 규칙](#이름-규칙)을 따라야 한다. 버전은 반드시 0보다 커야한다. 이 버전은 데이터 베이스가 업그레이드가 필요한지 판단하는데 쓰인다. 개발자는 [데이터베이스 업그레이](./spec.md#데이터베이스-업그레이드)드 메커니즘을 사용해서 데이터 마이그레이션을 지원할 수 있다.

### 이름 규칙

```javascript
/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)
```

위 정규식을 위반하는 이름은 예외를 낼 것이다.

### 데이터 베이스 스키마 빌더

정적 함수로 제공되는 `lf.schema.create()` 를 사용해 스키마를 생성하는 스키마 빌더를 생성할 수 있다. 러브 필드는 소스코드에 자세히 서술해 놓았고 소스 코드는 대응되어 제공되는 소스 코드에 스펙이 기술되어있다. 이것은 날짜가 지난 문서가 생성되는 것을 막기도 한다.

러브필드 API 는 `lf` 네임스페이스 내부에 묶이며 이것은 글로벌 네임스페이스를 오염시키지 않기 위함이다. 모든 스키마 생성은 스키마 빌더를 초기화 함으로써 시작한다.  

`lf.schema.create()`는 두 가지 기능을 제공하는 [`lf.schema.Builder`](https://github.com/google/lovefield/blob/31f14db4995bb89fa053c99261a4b7501f87eb8d/lib/schema/builder.js#L32-L48)의 인스턴스를 생성합니다 ,
: [`createTable()`](https://github.com/google/lovefield/blob/31f14db4995bb89fa053c99261a4b7501f87eb8d/lib/schema/builder.js#L134-L147) 및
[`connect()`](https://github.com/google/lovefield/blob/31f14db4995bb89fa053c99261a4b7501f87eb8d/lib/schema/builder.js#L91-L109).
`createTable()`은 스키마 빌더 안에 테이블 빌더를 인스턴스화합니다.
빌더가 완료되면 효과적으로 테이블을 구성합니다.
`connect()`는 스키마 빌드를 마무리 짓고 데이터 저장소에있는 데이터베이스 인스턴스에 연결합니다.

`lf.schema.Builder` 클래스 객체는 stateful 입니다. : building 상태와
최종완료 상태를 가집니다. 스키마는 building 상태에서만 수정할 수 있습니다. 일단
완료되면 어떤 호출도 받지 않습니다.

> stateful 서버측(여기서는 러브필드)가 상태를 가진다. 클라는 서버(러브필드 인스턴스)와 계속 접속되고 해당 인스턴스를 가지고 연속적으로 작업할 수 있다. 서버에서 가지고 있는 정보에 따라 클라이언트 요청에 다르게 응답하게 된다.
> stateless 서버측(여기서는 러브필드)가 상태를 가지지 않는다. 클라는 매번 동일한 요청하면 매번 동일한 요청을 받고, 다시 작업하려면 다시 접속을 해야한다. 

### 테이블 스키마 빌더 

`lf.schema.Builder`의`createTable()`호출은
[`lf.schema.TableBuilder`](
https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L38-L77)
테이블 스키마를 작성하는 데 사용되는 오브젝트를 반환합니다. Lovefield의 테이블은
SQL 테이블과 유사합니다. 사용자는 테이블 수준에서 인덱스와 제약 조건을 지정할 수 있습니다.
`lf.schema.TableBuilder`의 모든 멤버 함수는 체인 패턴을 지원하기 위해 테이블 빌더 객체를 반환합니다.

#### 열(컬럼, 속성)

표에는 적어도 하나의 열이 포함되어 있으며이 열은 표에 [`addColumn()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L178-L191)에 의해 추가됩니다.
열은 열 이름으로 식별되며 열 이름은 테이블 내에서 고유해야 합니다. 각 열은 연관된 데이터 유형을 가져야합니다.

지원되는 데이터 유형은 [`lf.Type`](https://github.com/google/lovefield/blob/fafe224c75083698f1702c35c7908c25a8ea5951/lib/enums.js#L60-L93)에 나열됩니다  :

| 타입                 | 기본 값       | 기본으로 Nullable   |  설명                                |
|:---------------------|:--------------|:--------------------|:-------------------------------------|
|`lf.Type.ARRAY_BUFFER`|`null`         |가능                 |자바스크립트 `ArrayBuffer` 객체        |
|`lf.Type.BOOLEAN`     |`false`        |불가능               |JavaScript `boolean` 객체           |
|`lf.Type.DATE_TIME`   |`Date(0)`      |불가능               |JavaScript Date, 내부에서 timestamp 정수로 변환 |
|`lf.Type.INTEGER`     |`0`            |불가능               |32-bit integer                        |
|`lf.Type.NUMBER`      |`0`            |불가능               |JavaScript `number` 타입              |
|`lf.Type.STRING`      |`''`           |불가능               |JavaScript `string` 타입              |
|`lf.Type.OBJECT`      |`null`         |불가능               |JavaScript `Object`,                  |

유형에 관계없이 모든 열은 [`TableBuilder#addNullable()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L285-L297) 호출을 통해 nullable로 표시 될 수 있습니다.
null 허용 열에 대한 기본값은 항상 `null`입니다. 위 표에서 보여지는 기본값은
열이 nullable로 표시되지 않은 경우를 나타냅니다.

*`lf.Type.ARRAY_BUFFER`과`lf.Type.OBJECT` 타입의 열은 기본으로 (`addNullable()`이 명시 적으로 호출되지 않아도) nullable 입니다.
* 명시 적 호출이 아닌 다른 유형의 열은 `addNullable ()` 호출로 만들기 전에는 nullable이 아닌 것으로 간주됩니다. 이것은 일반적인 SQL 엔진과 매우 다른 행동입니다.

Lovefield는 내부적으로 문자열 또는 숫자 만 인덱스 키로 사용합니다. 
`lf.Type.ARRAY_BUFFER`와`lf.Type.OBJECT` 유형의 열은 인덱싱 할 수 없습니다 (즉,
인덱스 또는 제약 조건의 일부일 수 없음). `lf.Type.ARRAY_BUFFER` 열은
검색 가능하지 않습니다 (즉, WHERE 절의 일부가 될 수 없음). 여기서 where as
`lf.Type.OBJECT` 컬럼은`isNull`이나 `isNotNull` 를 가진 술어에서만 사용될 수 있습니다. (그렇지 않으면`lf.Exception`이 던져 질 것입니다). 
암시적 전환은 다음의 유형들이 색인 / 주키로 사용되거나 유니크 제한으로 놓여질 때 내부적으로 수행됩니다. 

*`lf.Type.BOOLEAN` :`lf.Type.STRING`로 변환합니다.
*`lf.Type.DATE_TIME` :`lf.Type.NUMBER`로 변환합니다.
*`lf.Type.INTEGER` :`lf.Type.NUMBER`로 변환합니다.

#### 1.3.2 Constraints

Lovefield 는 다음의 제한을 지원합니다.:

* Primary key 주 키
* Foreign key 외래 키
* Unique 유니크
* Nullable / Not-nullable Null가능, Numm 불가

각 테이블에는 기본 키가 하나만있을 수 있습니다. 기본 키는 [`addPrimaryKey()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L194-L225) 함수를 통해 추가됩니다.
SQL 세계에서와 같이 기본 키는 고유하고 null이 아니라는 것을 의미합니다. 러브 필드
자동 증가 기본 키를 지원합니다.이 기본 키는 다음과 같은 정수 열이어야합니다.
기본 오름차순이며 그 값은 Lovefield에 의해 할당되고 시되며 1부터 시작합니다.

외래 키는 [`addForeignKey()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L228-L264)를 통해 추가됩니다..

기본 키 및 외래 키 제약 조건 위반으로 인해 마치 SQL에서 일어나는 일과 같이 트랜잭션이 거절이 발생합니다.
`opt_cascade`가 참일 때 외래 키, Lovefield 쿼리 엔진은 필요하다면 계단식 삭제 및 업데이트를 수행합니다.

유일한 제약 조건은 [`addUnique ()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L267-L282)를 통해 추가됩니다 .
고유 제한 조건은 암시적 색인을 의미합니다. 교차-열 고유제한은(cross-column unique constraint) 열의 값 조합이 고유해야 함을 의미합니다.

이전 섹션에서 언급했듯이 모든 테이블 열은 기본적으로 NOT NULL입니다.
사용자는 [`addNullable()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L285-L297)를 호출하여 null 허용 열을 명시 적으로 호출해야합니다.

#### 1.3.3 Indices

Lovefield는 제공 한 지수를 사용하지 않고 자체 지수를 구현합니다.
백업 데이터 저장소. 기본 인덱스 구조는 B + Tree입니다. 오직 null이 아니고
인덱서 블 (indexable) 컬럼은 인덱싱 될 수 있습니   다. 자세한 내용은 [Columns] (# 131-columns)을 참조하십시오.
어떤 열 데이터 유형이 인덱싱 가능한지와 관련하여

인덱스는 [`addIndex ()`](https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L327-L357)를 통해 추가됩니다. .
색인은 단일 열 또는 교차 열일 수 있습니다. 대부분의 SQL 엔진과 달리 Lovefield
인덱싱 된 열의 모든 값이 null이 아니어야한다는 제한이 있습니다. 모두 고유 한
제약 조건은 암시 적 인덱스를 작성하므로 같은 스콥에서 인덱스 생성하면 예외적가 산출됩니다.

Lovefield는 맞춤 색인을 지원하지 않습니다. 사용자 정의 색인이란 색인을 만드는 것을 의미합니다.
변환을 기반으로합니다. 예를 들어 전자 메일 주소 필드의 역 텍스트
JavaScript 함수를 유지할 수 없기 때문에 포함되지 않았습니다.
Chrome 앱 v2 제약 조건으로 인해 평가되었습니다. 사용자는
자체 JavaScript로 변환하고 변환 된 데이터를 저장합니다.

기본적으로 Lovefield는로드 중에 테이블 인덱스를 메모리에 생성합니다.
데이터 저장소에 색인을 유지합니다. 주어진 테이블의 인덱스는
[`persistentIndex ()`] (https://github.com/google/lovefield/blob/8e47538d5f32986596a9e97ec97350cc6ed9ec1a/lib/schema/table_builder.js#L383-L386)에서만 유지됩니다.

### Static Schema Construction

Lovefield는 원래 정적 스키마 생성을 사용하도록 설계되었습니다. 아이디어는
YAML 파일의 데이터베이스 스키마를 나타내려면 Lovefield SPAC (Schema Parser
그리고 코드 생성기)를 사용하여 YAML 파일에서 JavaScript 소스 코드를 생성 한 다음
생성 된 코드와 함께 Lovefield 핵심 라이브러리를 사용하십시오. 이 접근법은
JavaScript 파일과 관련된 모든 것이 컴파일되고 폐쇄를 통해 번들로 묶일 때 감각
컴파일러. 결과적으로이 접근법은 고급 주제로 간주되며
[자체 섹션] (07_spac.md)에 자세히 설명되어 있습니다.

### 정의(생성) 예시

새 개체와 관계, 즉 엔티티 스키마를 데이터베이스에 저장하려고 할 때, SQL 에서는 `CREATE TABLE` 구문을 통해 테이블로 생성할 수 있다.

```plsql
테이블 생성 구문/ 추가적인 테이블 제약사항과 기본 값 포함
CREATE TABLE IF NOT EXISTS Asset (
    column 데이터종류 테이블_제약 DEFAULT 기본_값,
    another_column 데이터종류 테이블_제약 DEFAULT 기본_값,
    …
);
```

고유번호, 자산명, 시간을 속성으로 가지는 자산이라는 엔티티를 데이터 베이스 테이블로 생성해보자.

```plsql
CREATE TABLE IF NOT EXIST Asset{
    id STRING PRIMARY KEY,
    asset STRING,
    timestamp INTEGER
}
```

러브필드에서는 다음과 같이 표현할 수 있다.

```javascript
// Begin schema creation.
var schemaBuilder = lf.schema.create('crdb', 1);

schemaBuilder.createTable('Asset').
    addColumn('id', lf.Type.STRING).
    addColumn('asset', lf.Type.STRING).
    addColumn('timestamp', lf.Type.INTEGER).
    addPrimaryKey(['id']);
```



## 연습

<query-pane></query-pane>
 
