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
                  :headers="datatableHeaders"
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
              <v-stepper-step v-for="qa in qas" :complete="step > qa.ord" :step="qa.ord">{{qa.question}}
              </v-stepper-step>
            </v-stepper>
          </v-flex><!-- /tasks_and_continue -->
        </v-layout>
      </v-layout><!-- /body -->
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  import InitScript from './InitScript'

  @Component({
    name: 'QueryPane'
  })
  export default class QueryPane extends Vue {

    @Prop({ default: true }) hideTask!: boolean

    private step: number = 1

    /* =============================================
    *   Prepare component Context for interacting
    * ============================================== */

    private alasql = require('alasql')
    private dbInstance!: any

    @Prop(String) scriptName!: string
    private tableName: string = ''
    private initScript!: InitScript
    private initQueries!: string[]
    private datatableHeaders!: any
    private dataForInsert!: any
    private qas!: string[]

    private scriptPack: any[] = [
      require('../dataset/getting-started.ts')
    ]

    private created() {
      this.setDataWithScriptName(this.scriptName)
      this.dbInstance = new this.alasql.Database()
      this.prepareContext(this.tableName, this.initQueries)
    }

    private setDataWithScriptName(scriptName: string) {

      const matched: any = this.scriptPack.filter((initScript: any) => {
        // console.log(initScript)
        return initScript.default.name === scriptName
      })

      this.initScript = new InitScript(matched[0].default)
      this.datatableHeaders = this.initScript.dataSet.headers
      this.dataForInsert = this.initScript.dataSet.data
      this.tableName = this.initScript.tableName
      this.initQueries = this.initScript.queries
      this.qas = this.initScript.qas
    }

    private prepareContext(tableName: string, queries: string[]): void {
      this.runQueries(tableName, queries)
    }

    /* =============================================
    *   Run Queries
    * ============================================== */

    private query: string = ''
    private res: any = ''

    private runUserInputQuery() {
      // @TODO need some function to check input query make sense
      if(!this.query){
        return
      }
      this.CheckAndNext()
      this.runQueries(this.tableName, [this.query])
    }

    /** Execute one or more query on target table */
    private runQueries(tableName: string, queries: string[]) {

      this.toggleLoading()

      const lastQuery = queries[queries.length - 1]
      console.log(lastQuery)
      let res: any

      /** If Init queries given, Do insert.*/
      if (queries.length > 1) {
        queries.forEach((q: string) => {
          this.hasInsert(q) && this.dataForInsert
            ? this.dbInstance.exec(q, [this.dataForInsert])
            : this.hasSelect(q)
            ? res = this.dbInstance.exec(q)
            : this.dbInstance.exec(q)
        })
      } else {

        res = this.dbInstance.exec("SELECT title FROM movies")
        console.log('쿼리',res)
      }

      const needSelectStatement: boolean = !this.hasSelect(lastQuery)
      // @TODO
      console.log('필요',needSelectStatement)
      needSelectStatement ? this.printTable(tableName, this.toggleLoading) : this.assignRes(res, this.toggleLoading)
    }

    /* =============================================
    * Check Question
    * ============================================== */

    /** Check input script is SELECT query */
    private CheckAndNext(): void {
      const currentQa: any = this.qas.find((qa: any) => qa.ord === this.step)
      this.query === currentQa.answer ? this.step = this.step+1: ''
    }

    /* =============================================
    *   Check for Controlling state
    * ============================================== */

    /** Check input script is SELECT query */
    private hasSelect(scr: String): boolean {
      const arr = scr.split(' ')
      return arr[0].toLowerCase() === 'select'
    }

    /** Check input script is INSERT query */
    private hasInsert(scr: String): boolean {
      const arr = scr.split(' ')
      // console.log(arr)
      return arr[0].toLowerCase() === 'insert'
    }

    /* =============================================
    * Change Screens
    * ============================================== */

    private loading: boolean = false

    /** Print table content and run finishing function */
    private printTable(tableName: string, finishing: Function) {
      this.res = this.dbInstance.exec(`SELECT * FROM ${tableName}`)
      finishing ? finishing() : ''
    }

    /** Assign result and run finishing function */
    private assignRes(res: any, finishing: Function) {
      this.res = res
      finishing ? finishing() : ''
    }

    /** toggle progress bar */
    private toggleLoading() {
      this.loading = !this.loading
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
