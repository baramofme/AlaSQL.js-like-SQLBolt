export const versions = {
  // 'v0.1': {
  //   link: '/'
  // },
  // 'v0.2': {
  //   link: '/'
  // },
}

export const navs = {
  main: [
    {
      title: '대문',
      link: '/'
    },
    {
      title: '요청하기',
      link: 'https://github.com/baramofme/vue-exercise/issues'
    },
  ],
  en: [
    {
      title: 'Home',
      link: '/en/'
    },
    {
      title: 'Request',
      link: 'https://github.com/baramofme/SQLBolt-As-LoveField/issues'
    },
  ]
}

export const sidebars = {
  main: [
    {
      title: 'SQLBolt',
      links: [
        {title:'LoveField 와 SQL 소개', link: '/sqlBolt/intro'},

        {title:'LoveField Lesson 1: 작업 흐름', link: '/sqlBolt/work-flow'},
        {title:'LoveField Lesson 2: 테이블 생성', link: '/sqlBolt/create-table'},
        {title:'LoveField Lesson 3: 테이블 교체', link: '/sqlBolt/alter-table'},
        {title:'LoveField Lesson 4: 테이블 드롭하기', link: '/sqlBolt/drop-table'},
        {title:'LoveField Lesson 5: SELECT 쿼리 101', link: '/sqlBolt/select'},
        {title:'LoveField Lesson 6: 쿼리와 제약 (Pt. 1)', link: '/sqlBolt/constraints-1'},
        {title:'LoveField Lesson 7: 쿼리와 제약 (Pt. 2)', link: '/sqlBolt/constraints-2'},
        {title:'LoveField Lesson 8: 쿼리 결과를 거르고 정렬하기', link: '/sqlBolt/filter-sort'},
        {title:'LoveField Review: 단순한 SELECT 쿼리', link: '/sqlBolt/simple-select'},
        {title:'LoveField Lesson 9: JOIN 으로 다중 테이블 쿼리', link: '/sqlBolt/join'},
        {title:'LoveField Lesson 10: OUTER JOIN', link: '/sqlBolt/outer-join'},
        {title:'LoveField Lesson 11: NULL에 대한 짧은 노트', link: '/sqlBolt/null'},
        {title:'LoveField Lesson 12: Queries with expressions', link: '/sqlBolt/expression'},
        {title:'LoveField Lesson 13: Queries with aggregates (Pt. 1)', link: '/sqlBolt/aggregates-1'},
        {title:'LoveField Lesson 14: Queries with aggregates (Pt. 2)', link: '/sqlBolt/aggregates-2'},
        {title:'LoveField Lesson 15: 쿼리의 실행 순서', link: '/sqlBolt/execute-order'},
        {title:'LoveField Lesson 16: 행 삽입', link: '/sqlBolt/insert'},
        {title:'LoveField Lesson 17: 행 갱신', link: '/sqlBolt/update'},
        {title:'LoveField Lesson 18: 행 삭제', link: '/sqlBolt/delete'},
        {title:'LoveField Lesson X: 무한의 세상으로!', link: '/sqlBolt/x'},
        {title:'LoveField Lesson 스펙: 초기화, 다중 접속, 업그레이드 등 ', link: '/sqlBolt/spec'},
      ]
    },
  ],
  en: [
  //   {
  //   title: 'somthinggg',
  //   links: [{
  //     title: 'title',
  //     link: '/link'
  //   },]
  // },
  ]
}

export const overrides = {
  en: {
    route: '/en/',
    language: 'English',
    editLinkText: 'Edit on GitHub',
  },
}
