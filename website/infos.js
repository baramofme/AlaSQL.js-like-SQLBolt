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
      link: 'https://github.com/baramofme/SQLBolt-As-AlaSQL.js/issues'
    },
  ]
}

export const sidebars = {
  main: [
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js 와 SQL 소개', link: '/sqlBolt/intro'},
        {title:'AlaSQL.js 에서 좋아할만한 기능과 한계', link: '/sqlBolt/features-and-limitation'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson : 테이블 생성', link: '/sqlBolt/create-table'},
        {title:'AlaSQL.js Lesson : 테이블 교체', link: '/sqlBolt/alter-table'},
        {title:'AlaSQL.js Lesson : 테이블 드롭하기', link: '/sqlBolt/drop-table'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson : SELECT 쿼리 101', link: '/sqlBolt/select'},
        {title:'AlaSQL.js Lesson : 쿼리와 제약 (Pt. 1)', link: '/sqlBolt/constraints-1'},
        {title:'AlaSQL.js Lesson : 쿼리와 제약 (Pt. 2)', link: '/sqlBolt/constraints-2'},
        {title:'AlaSQL.js Lesson : 쿼리 결과를 거르고 정렬하기', link: '/sqlBolt/filter-sort'},
        {title:'AlaSQL.js Review: 단순한 SELECT 쿼리', link: '/sqlBolt/simple-select'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson : JOIN 으로 다중 테이블 쿼리', link: '/sqlBolt/join'},
        {title:'AlaSQL.js Lesson : OUTER JOIN', link: '/sqlBolt/outer-join'},
        {title:'AlaSQL.js Lesson : NULL에 대한 짧은 노트', link: '/sqlBolt/null'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson : Queries with expressions', link: '/sqlBolt/expression'},
        {title:'AlaSQL.js Lesson : Queries with aggregates (Pt. 1)', link: '/sqlBolt/aggregates-1'},
        {title:'AlaSQL.js Lesson : Queries with aggregates (Pt. 2)', link: '/sqlBolt/aggregates-2'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson : 쿼리의 실행 순서', link: '/sqlBolt/execute-order'},
        {title:'AlaSQL.js Lesson : 행 삽입', link: '/sqlBolt/insert'},
        {title:'AlaSQL.js Lesson : 행 갱신', link: '/sqlBolt/update'},
        {title:'AlaSQL.js Lesson : 행 삭제', link: '/sqlBolt/delete'},
        {title:'AlaSQL.js Lesson : 무한의 세상으로!', link: '/sqlBolt/x'},
        {title:'AlaSQL.js Lesson 스펙: 초기화, 다중 접속, 업그레이드 등 ', link: '/sqlBolt/spec'},
      ]
    },
    {
      title: 'SQLBolt',
      links: [
        {title:'AlaSQL.js Lesson X: 무한의 세상으로!', link: '/sqlBolt/x'},
        {title:'AlaSQL.js Lesson 스펙: 초기화, 다중 접속, 업그레이드 등 ', link: '/sqlBolt/spec'},
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
