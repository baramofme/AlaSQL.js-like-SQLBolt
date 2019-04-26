<template>
  <v-app>
    <v-container class="exercise" exerciseid="ex1">
      <v-layout class="body row wrap">
        <v-layout>
          <v-flex xs-12 sm-12 md-12 class="datatable_title">Table: {{tableName}}</v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex class="table_and_input xs-8 sm-8 md-8">
            <v-layout>
              <div class="message" style=""></div>
            </v-layout>
            <v-layout datatableid="data">
              <v-flex>
                <v-data-table
                  :headers="headers"
                  :items="res"
                  :rows-per-page-items=[6]
                  class="datatable"
                >
                  <template v-slot:items="props">
                    <td v-for="(val) in props.item">{{ val }}</td>
                  </template>
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
                      @keydown.enter.prevent="runUserInputQuery"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex text-xs-right>
                    <v-btn @click="runUserInputQuery" class="clear">RUN</v-btn>
                    <v-btn class="clear">RESET</v-btn>
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
              <v-stepper-step :complete="step > 3" step="3">Find the `title` and `director` of each film
              </v-stepper-step>
              <v-stepper-step :complete="step > 4" step="4">Find the `title` and `year` of each film</v-stepper-step>
              <v-stepper-step step="5">Find `all` the information about each film</v-stepper-step>
            </v-stepper>
          </v-flex><!-- /tasks_and_continue -->
        </v-layout>
      </v-layout><!-- /body -->
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator'

  import InitScript from "./InitScript";

  @Component({
    name: 'QueryPane'
  })
  export default class QueryPane extends Vue {

    @Prop({default: true}) hideTask!: boolean;
    @Prop(String) scriptName!: string;

    private scripts: any = [
      require('../dataset/getting-started.ts')
    ];

    private script!: InitScript;
    private tableName: string = '';
    private initQueries!: string[];
    private headers!: any;
    private data!: any;

    private alasql = require('alasql');
    private db!: any;
    private loading: boolean = false;
    private query: string = '';
    private res: any = '';

    private x: string = '';
    private step: number = 1;

    /* =============================================
    *   Prepare component Context for interacting
    * ============================================== */

    private created() {
      this.setData();
      this.db = new this.alasql.Database(); // - 새 alasql-database 생성
      this.runInitScript(this.tableName, this.initQueries);
    }

    /** Set Data with given dataset name */
    private setData() {
      const script = this.scripts.filter((script) => {
        return script.default.name === this.scriptName;
      });

      // console.log(script)
      this.script = new InitScript(script[0].default);
      this.headers = this.script.dataSet.headers;
      this.data = this.script.dataSet.data;
      // console.log(this.data)
      this.tableName = this.script.tableName;
      this.initQueries = this.script.queries;
    }

    /** Run Scripts for preparing component */
    private runInitScript(tableName, queries): void {
      this.runQueries(tableName, queries);
    }

    /* =============================================
    *   Prepare component context for interacting
    * ============================================== */

    /** Execute user's query */
    private runUserInputQuery() {
      this.runQueries(this.tableName, this.query);
    }

    /** Execute one or more query on target table */
    private runQueries(tableName: string, queries: string[] | string) {

      this.toggleLoading();

      const isArray: boolean = typeof queries === "object" && queries.constructor.name === "Array";
      const lastQuery = isArray ? queries[queries.length - 1] : queries;

      // typescript can't recognize type guard inside isArray variable.
      if (typeof queries === "object" && queries.constructor.name === "Array") {
        let res: any;
        queries.forEach((q, index, array) => {
          this.hasInsert(q) && this.data
            ? this.db.exec(q, [this.data])
            : this.hasSelect(q)
              ? res = this.db.exec(q)
              : this.db.exec(q);

        });
        const hasSelect: boolean = this.hasSelect(lastQuery);
        hasSelect ? this.res = res : this.printTable(tableName, this.toggleLoading);
      } else if (typeof queries === "string") {
        const res = this.db.exec(queries);
        const hasSelect: boolean = this.hasSelect(queries);
        hasSelect ? this.res = res : this.printTable(tableName, this.toggleLoading);
      }

    }

    /* =============================================
    *   Check for guarding exceptions
    * ============================================== */

    /** Check input script is SELECT query */
    private hasSelect(scr: String): boolean {
      const arr = scr.split(' ');
      return arr[0].toLowerCase() === 'select';
    }

    /** Check input script is INSERT query */
    private hasInsert(scr: String): boolean {
      const arr = scr.split(' ');
      // console.log(arr)
      return arr[0].toLowerCase() === 'insert';
    }

    private setRes(res: any) {
      this.res = res
    }

    /* =============================================
    *
    * ============================================== */

    /** Print table content and run finishing function */
    private printTable(tableName: string, finishing: Function) {
      this.res = this.db.exec(`SELECT * FROM ${tableName}`);
      finishing ? finishing() : '';
    }

    /** toggle progress bar */
    private toggleLoading() {
      this.loading = !this.loading;
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
