import html from 'html-template-tag'
import googleAnalytics from 'docute-google-analytics'
import Docute from 'docute'
import prismLanguages from 'docute/lib/utils/prismLanguages'
import ColorBox from './components/ColorBox.vue'
import QueryPane from './components/QueryPane.vue'
import {versions, navs, sidebars, overrides} from './infos.js'
import docuteMermaid from 'docute-mermaid'


// Apply Vue.js plugins
import Vue from 'vue';
import Console from 'vue-custom-console'
var { Conso } = require('vue-conso')
Vue.use(Console)
Vue.component('conso',Conso)
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css';
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, {
  theme: {
    primary: colors.purple,
      secondary: colors.grey.darken1,
      accent: colors.shades.black,
      error: colors.red.accent3
  }
})

// Css override


// Apply mermaid plugins dependency
// add mermaid before docute-mermaid plugins loaded
window.mermaid = require('mermaid');

new Docute({
  target: 'app',
  title: 'Personal AlaSQL.js Exercise',
  layout: 'wide',
  highlight: ['typescript', 'bash', 'markdown', "sql", "json", "javascript", 'html', 'css'],
  plugins: [
    // process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
    docuteMermaid() // add mermaid support plugin
  ].filter(Boolean),
  editLinkBase: 'https://github.com/baramofme/vue-exercise/tree/master/website/docs',
  editLinkText: 'GitHub 에서 수정하기',
  router: {
    mode: 'history'
  },
  darkThemeToggler: true,
  sourcePath: '/',
  // cssVariables: vuetifyCss,
  componentMixins: [
    {
      data() {
        return {
          builtinLanguages: prismLanguages.builtin,
          deps: __DEPS__
        }
      },
      methods: {
        insertCustomFontsCSS() {
          const ID = 'custom-fonts-css'
          const existing = document.getElementById(ID)
          if (existing) {
            existing.parentNode.removeChild(existing)
          } else {
            const style = document.createElement('style')
            style.id = ID
            style.textContent = `
            /* Import desired font from Google fonts */
            @import url('https://fonts.googleapis.com/css?family=Lato');

            /* Apply the font to body (to override the default one) */
            body {
              font-family: Lato, sans-serif;
            }
            `
            document.head.appendChild(style)
          }
        },
        insertVuetifyIcon(){
          const ID = 'vuetify-icon-css'
          const existing = document.getElementById(ID)
          if (existing) {
            existing.parentNode.removeChild(existing)
          } else {
            const link = document.createElement('link')
            link.href = "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
            link.rel = "stylesheet"
            document.head.appendChild(link)
          }
        },
        insertVuetifyCss(){
          const ID = 'vuetify-base-css'
          const existing = document.getElementById(ID)
          if (existing) {
            existing.parentNode.removeChild(existing)
          } else {
            const link = document.createElement('link')
            link.href = "https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css"
            link.rel = "stylesheet"
            document.head.appendChild(link)
          }
        }
      },
      components: {
        ColorBox,
        Console,
        QueryPane
      }
    }
  ],
  // no version use
  // versions: versions,

  nav: navs.main,
  sidebar: sidebars.main,

  overrides: {
    // this only needs override default root router's language variable.
    '/': {
      language: '한국어',
      // other props already defined upper sources
    },
    '/en/': {
      language: overrides.en.language,
      editLinkText: overrides.en.editLinkText,
      nav: navs.en,
      sidebar: sidebars.en,
    },
  },
  footer: ``,
  //   `
  // &copy; ${new Date().getFullYear()} Made by <a href="https://egoist.sh">EGOIST</a> While Watching Anime.
  // `,
  banner: ``,
// {
//     template: html`
//       <div class="docute-banner">
//         <note :label="false"
//           ><PatreonIcon width="16" height="16" style="position:relative;top:2px;margin-right:8px;" />Support Docute development by
//           <a href="https://patreon.com/egoist" target="_blank"
//             >becoming a patron or one-time donation <ExternalLinkIcon /></a
//           >.</note
//         >
//       </div>
//     `,
//     components: {
      // PatreonIcon
    // }
  // }
})

Vue.component('ReverseText', {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  template: html`
    <div class="reverse-text">
      {{ reversedText }}
      <v-style>
      .reverse-text {
        border: 1px solid var(--border-color);
        padding: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  }
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// const PatreonIcon = {
//   template: html`
//     <svg
//       width="569px"
//       height="546px"
//       viewBox="0 0 569 546"
//       version="1.1"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <title>Patreon logo</title>
//       <g>
//         <circle
//           fill="rgb(249, 104, 84)"
//           id="Oval"
//           cx="362.589996"
//           cy="204.589996"
//           r="204.589996"
//         ></circle>
//         <rect
//           fill="rgb(5, 45, 73)"
//           id="Rectangle"
//           x="0"
//           y="0"
//           width="100"
//           height="545.799988"
//         ></rect>
//       </g>
//     </svg>
//   `
// }
