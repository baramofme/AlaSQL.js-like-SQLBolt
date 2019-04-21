
# Lovefield 와 SQL 소개

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

## LoveField 란?

웹 앱을 위한 관계형 쿼리 엔진을 제공.

### 기본 가정

* 2기가 이하지만 구조적 쿼리 엔진이 필요할만큼 큰 데이터 묶음을 가진 데이터베이스를 다루기 위해 디자인됨.
* \*SQL-03 기능들의 하위 묶음을 제한적으로 제공.
* 필요하다면 기존 저장소 기술(예, IndexedDB)를 사용해서 자료를 영구적으로 저장한다. 
개발자는 서버로 데이터를 돌려 보내기 전에 러브필드로 쿼리 엔진으로 접근된 자료를 안전하지 않은 것으로 취급하고 위생처리(santinize) 해야 할 책임이 있음을 알아야 한다.
  
> \*  SQL 2003 언어에서 제공하는 기능을 말한다.  
참조 : [https://ronsavage.github.io/SQL/sql-2003-2.bnf.html](https://ronsavage.github.io/SQL/sql-2003-2.bnf.html)

### Lovefield 로 SQL 을 배우기

SQL 을 배우는 목적과 같다. 주어진 데이터에 관해 던져진 구체적인 질문에 대답하기 위해 LoveField 를 통해 데이터간 관계를 짓는 등의 사용하는 방법을 배우는 것.



