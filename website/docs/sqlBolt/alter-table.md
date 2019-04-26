# LoveField Lesson 3: 테이블 바꾸기(Alter)

## 테이블 변경

SQL 에서는 `ALTER TABLE` 구문으로 테이블과 데이터베이스 스키마를 변경할 수 있다. 
할 수 있는 것은 추가,제거,컬럼과 테이블 제약 수정이다.

러브필드에서는 테이블 변경이 아닌 'Upgrade'라는 개념이 있으며, 
이 개념을 통해 새로운 스키마를 만들고 이전 자료를 옮기게 된다. 자세한 것은 [데이터 베이스 업그레이드] 참조.

[데이터 베이스 업그레이드]: spec#데이터베이스-업그레이드

업그레이드 시, lf.raw.BackStore 인터페이스에 접근할 수 있고, 여기에 정의된 함수들을 통해 테이블을 변경할 수 있다.  

```javascript
// 데이터 베이스 열기, 필요하면 데이터 베이스 생성이나 업그레이드 수행.
schemaBuilder.connect({onUpgrade: onUpgrade}).then(
  // 모든 새/업그레이드 관련 행위가 완료됐을 때.
  /** @param {lf.Database} db */
  function(db) {
    // 새로운 db 접속이 여기서부터 시작
  });

/**
 * loveField 가 새 테이블을 생성한 이후에 호출되는 사용자 제공 업그레이드 함수
 *
 * NOTE: 함수가 데이터베이스 작업 이외 비동기 연산을받는 경우, 
 * 업그레이드 트랜잭션이 즉시 커밋되고 업그레이드 프로세스가 실패 할 가능성이 매우 높습니다.
 * IndexedDB auto-commit 함정에 고맙다(반어).
 * @param {lf.raw.BackStore} rawDb
 */
function onUpgrade(rawDb) {
  // 현재 저장된(persisted) 버전 보여주기.
  console.log(rawDb.getVersion());
  
}
```

## 컬럼 추가하기

SQL 에서는 `CREATE TABLE` 구문과 유사한 구문을 써서 새 컬럼을 추가할 수 있다.
새 혹은 이전 행에 적용하기 위한 기본 값과 잠재적인 테이블 제약과에 맞춰 열의 데이터 타입을 구체적으로 적을 필요가 있다.
MySQL 에서는 FIRST 나 AFTER 를 사용해서 컬럼이 어디에 추가될 지도 정할 수 있지만 표준 기능은 아니다.

```sql
ALTER TABLE mytable
ADD column DataType OptionalTableConstraint 
    DEFAULT default_value;
```

```javascript
schemaBuilder.connect({onUpgrade: onUpgrade}).then(
  function(db) {});

function onUpgrade(rawDb) {
  console.log(rawDb.getVersion());
  
}
```

## 컬럼 삭제하기

열 삭제는 열 삭제와 마찬가지로 간단하지만 일부 데이터베이스 (SQLite 포함)는이 기능을 지원하지 않습니다. 
대신 새 테이블을 만들고 데이터를 마이그레이션해야 할 수 있습니다.

```plsql
Altering table to remove column(s)
ALTER TABLE mytable
DROP column_to_be_deleted;
```

## 컬럼 이름 변경하기

테이블 자체의 이름을 바꾸려면 명령문의 RENAME TO 절을 사용하십시오.

```plsql
ALTER TABLE mytable
RENAME TO new_table_name;
```

## 다른 변경

각 데이터베이스 구현은 테이블을 변경하는 여러 가지 방법을 지원하므로 
계속 진행하기 전에 데이터베이스 문서를 참조하는 것이 가장 좋습니다. 
[MySQL], [Postgres], [SQLite], [Microsoft SQL Server].

[MySQL]: https://dev.mysql.com/doc/refman/5.6/en/alter-table.html
[Postgres]: http://www.postgresql.org/docs/9.4/static/sql-altertable.html
[SQLite]: https://www.sqlite.org/lang_altertable.html
[Microsoft SQL Server]: https://msdn.microsoft.com/en-us/library/ms190273.aspx

```javascript
// 데이터 베이스 열기, 필요하면 데이터 베이스 생성이나 업그레이드 수행.
schemaBuilder.connect({onUpgrade: onUpgrade}).then(
  // 모든 새/업그레이드 관련 행위가 완료됐을 때.
  /** @param {lf.Database} db */
  function(db) {
    // 새로운 db 접속이 여기서부터 시작
  });

/**
 * loveField 가 새 테이블을 생성한 이후에 호출되는 사용자 제공 업그레이드 함수
 *
 * NOTE: 함수가 데이터베이스 작업 이외 비동기 연산을받는 경우, 
 * 업그레이드 트랜잭션이 즉시 커밋되고 업그레이드 프로세스가 실패 할 가능성이 매우 높습니다.
 * IndexedDB auto-commit 함정에 고맙다(반어).
 * @param {lf.raw.BackStore} rawDb
 */
function onUpgrade(rawDb) {
  // 현재 저장된(persisted) 버전 보여주기.
  console.log(rawDb.getVersion());

  // Progress 테이블 드롭.
  // 동기 호출.
  rawDb.dropTable('Progress');

  // 모든 비동기 업그레이드 도우미 함수는 하나에서 다음 것으로 연쇄 해야만 한다.

  // Purchase 에서 agent 열 (type string) 추가. 기본값 'Smith'.
  return rawDb.addTableColumn('Purchase', 'agent', 'Smith').then(function() {
    // Photo 에서 metadata 열 삭제.
    return rawDb.dropTableColumn('Photo', 'metadata');
  }).then(function() {
    // Photo 테이블의 isLocal 열 이름을 local 로 변경.
    return rawDb.renameTableColumn('Photo', 'isLocal', 'local');
  }).then(function() {
    // IndexedDB 자동 커밋으로 인해 변환이 지원되지 않습니다.:
    // 러브 필드 (Lovefield)가 기존의 객체 저장소 스캐닝으로부터 프로미스를 되찾으려 할 때 파이어 폭스가 즉시 트랜잭션을 위탁한다. 
    // 사용자가 덤프를 수행하고 onUpgrade 루틴 외부에서 변환을 수행해야합니다.

    // 전체 DB 를 JS 객체로 쏟아붇기(DUMP)
    return rawDb.dump();
  });
}
```
  


## 연습

 
