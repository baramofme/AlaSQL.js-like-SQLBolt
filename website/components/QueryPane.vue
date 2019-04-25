<template>
  <v-app>
  <v-container class="exercise" exerciseid="ex1">
    <v-layout class="body row wrap">
      <v-layout>
        <v-flex xs-12 sm-12 md-12 class="datatable_title">Table: movies</v-flex>
      </v-layout>
      <v-layout wrap>
      <v-flex class="table_and_input xs-8 sm-8 md-8">
        <v-layout>
          <div class="message" style=""></div>
        </v-layout>
        <v-layout datatableid="movies">
          <v-flex>
            <div>{{res}}</div>
            <v-data-table
              :headers="headers"
              :items="movies"
              :rows-per-page-items=[6]
              class="datatable"
            >
              <!--class="elevation-1"-->
              <!--<template v-slot:items="props">-->
                <!--<td v-for="">{{ props.item.id }}</td>-->
                <!--<td class="text-xs-left">{{ props.item.title }}</td>-->
                <!--<td class="text-xs-left">{{ props.item.director }}</td>-->
                <!--<td class="text-xs-center">{{ props.item.year }}</td>-->
                <!--<td class="text-xs-left">{{ props.item.length_minutes }}</td>-->
              <!--</template>-->
            </v-data-table>

          </v-flex>
        </v-layout>
        <v-layout class="sqlinput_container">
          <v-flex>
            <v-layout>
              <v-flex class="sqlinput ace_editor ace-tm" targetdatatableid="movies" style="font-size: 1em;">
                <v-textarea
                  solo
                  flat
                  name="input-7-4"
                  label="Write query"
                  :no-resize="true"
                  v-model="query"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex text-xs-right>
                <v-btn @click="runQuery" class="clear">RUN</v-btn> <v-btn class="clear">RESET</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex><!-- /table_and_input -->
      <v-flex v-if="hideTask" class="tasks_and_continue xs-4 sm-4 md-4">
        <div class="tasks_title">
          Exercise 1 — <span class="title">Tasks</span>
        </div>
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">Find the `title` of each film</v-stepper-step>
          <v-stepper-step :complete="step > 2" step="2"> Find the `director` of each film</v-stepper-step>
          <v-stepper-step :complete="step > 3" step="3">Find the `title` and `director` of each film</v-stepper-step>
          <v-stepper-step :complete="step > 4" step="4">Find the `title` and `year` of each film</v-stepper-step>
          <v-stepper-step step="5">Find `all` the information about each film</v-stepper-step>
        </v-stepper>
        <div class="solve_hint">
          Stuck? Read this task's <a href="#" class="solution_trigger">Solution</a>.<br>
          Solve all tasks to continue to the next lesson.
        </div>
        <a href="/lesson/select_queries_with_constraints" class="continue disabled">
          Finish above Tasks
        </a>
      </v-flex><!-- /tasks_and_continue -->
      </v-layout>
    </v-layout><!-- /body -->
  </v-container>
  </v-app>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator'

  import movies from '../dataset/movies'

  /** 초기화하면서 실행되는 스크립트 */
  interface InitScripts{
    tableName:string;
    queries:string[];
  }

  @Component({
    name: 'QueryPane'
  })
  export default class QueryPane extends Vue {

    @Prop({default: true}) hideTask!:boolean;
    @Prop(String) init!:boolean;

    private alasql = require('alasql');
    private db!:any;
    private loading:boolean = false;
    private query:string = '';
    private res:any= '';

    private runQuery(){
      this.loading = true;
      this.db.exec(this.query);
      this.res = this.db.exec("SELECT * FROM one", [], (res:any)=>{
        this.loading = false;
      });
    }

    private x: string = '';
    private step: number = 1;
    private headers: any = movies.headers;
    private movies: any = movies.data;

    private created(){
      this.db = new this.alasql.Database(); // - 새 alasql-database 생성
      this.db.exec('CREATE TABLE one (two INT)'); // 테이블 생성
      this.db.exec('INSERT INTO one (1)'); // 값 인서트
      this.res = this.db.exec("SELECT * FROM one", [], (res:any)=>{
        console.log(res)
      }); // -  SELECT 쿼리 실행 후 객체의 배열을 반환받음
    }

    private mounted(){

    }
  }
</script>


<style scoped>

  /* ========= 최상단 루트 와 바로 아래 본문 ==========*/
  .exercise {
    margin: .5em auto 0 auto;
    padding: 19.5px 26px 26px 26px;
    background: #f0ede5;
    -webkit-border-radius: .25em .25em .25em .25em;
    -moz-border-radius: .25em .25em .25em .25em;
    border-radius: .25em .25em .25em .25em;
  }

  .exercise .body {
    margin: 0;
  }

  .exercise .body {
    margin: 0;
    font-size: 1.125em;
  }

  /* ========= 데이터 테이블 제목 ==========*/
  .datatable_title {
    /*padding-left: 0;*/
    /*padding-right: 0;*/
    /*overflow-x: hidden;*/
    /*white-space: nowrap;*/
  }

  .datatable_title {
    /*padding: .5em 0;*/
    /*font-size: .9375em;*/
    /*text-transform: capitalize;*/
    /*color: #757575;*/
  }

  /* ========= 테이블과 입력영역 ==========*/

  .table_and_input {
    /* 겹쳐서 보이게 되어서 주석처리함*/
    /*height: 25.1875em;*/
  }

  .exercise .body .table_and_input {
    padding: 0;
    background: #ebeae2;
    border: 1px solid #stepe5dc;
  }

  /* ========= 오류 메시지 영역 ==========*/
  .exercise .body .table_and_input .message {
    position: absolute;
    bottom: 10.3em;
    margin: .5em;
    display: none;
    padding: .25em .6em;
    font-size: .875em;
    background: #186bdd;
    color: #fff;
  }

  /* ========= 데이터테이블 영역 ==========*/
  .exercise .body .table_and_input .datatable {
    height: 24em;
  }

  .exercise .body .datatable {
    padding: 0;
    overflow-y: scroll;
  }

  /* ========= SQL 입력 영역 ==========*/
  .exercise .body .table_and_input .sqlinput_container {
    position: relative;
    padding: .5em 0;
    border: 0;
    border-top: 1px solid #stepe5dc;
    background: #fff;
  }

  {
    margin-top: 0px
  ;
    width: 641px
  ;
    height: 175px
  ;
    margin-left: 0px
  ;
  }

  /* ========= 할일과 계속 영역 ==========*/
  .exercise .body .tasks_and_continue {
    height: 24.6875em;
  }

  .content .exercise .body .tasks_and_continue {
    /*position: relative;*/
    /*padding: 0;*/
    background: #e2e0d5;
    border: 1px solid #stepe5dc;
    border-width: 2px 1px 1px 0;
  }
</style>
