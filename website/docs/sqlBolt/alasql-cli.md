# AlaSQL.js Lesson : AlaSQL CLI

원문 : https://github.com/agershun/alasql/wiki/AlaSQL-CLI

AlaSQL은 전역으로 설치하여 콘솔에서 사용할 수 있습니다. npm install alasql -g

```bash
Usage:
  alasql "sql-statement" [ params ]        - Run SQL statement
  alasql --file file.sql [ params ]        - (or -f) Run SQL from file
  alasql --version                         - (or -v) Echo AlaSQL version
Samples:
  alasql 'select 2+2'
  alasql 'select count(*) from txt()' < city.txt
  alasql 'select * into xlsx("./data/city") from txt("city.txt")'
```

예:

텍스트 파일에서 20자 이상 되는 줄만 선택한다.

```bash
alasql 'select value count(*) from txt("README.md") where length([0]) > 20'
```
XLSX 파일을 JSON으로 변환한다.

```bash
> alasql "SELECT * INTO json('my.json') from xlsx('cities.xlsx',{headers:true}) WHERE population > 20000000"
```

간단한 계산기

```bash
> alasql 'VALUE OF SELECT 2*2'
4
```

? 는 대응되는 n 번째 매개변수와 대체된다. 그래서 `alasql "select? +?" 10 20`은 `alasql select 10 + 20`에 대응된다.

```bash
> alasql "VALUE OF SELECT 20-?+?" 5 100
115
```

더 많은 예제:

```bash
alasql "select [1] from tab('./mytext.txt') where [0] = 1"

# 명령 파일에서
alasql -f myprogram.sql 

# grep 같은
alasql "select * from csv(?) where [0] != 1 and [1] like 'A%'" mytext.csv

# 같은 계산기
alasql "select 2*2"

# Excel 파일 처리
alasql "select [2] from xls(?) where [0]>0 and [1] in ('Cuba','Swiss')" mysheet.xlsx

# TAB 및 xlsx 조인
alasql "select a.* from tab(?) as a left join xls(?) as b on a[0] = b[0] where b[0] != 2" sales.txt cities.xls
```

(JSON 대신 값을 얻으려면 SELECT 앞에 VALUE OF를 추가하면됩니다.)
