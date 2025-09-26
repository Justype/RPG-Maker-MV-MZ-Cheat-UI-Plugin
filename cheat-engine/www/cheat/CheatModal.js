import GeneralPanel from './panels/GeneralPanel.js'
import HealthSettingPanel from './panels/HealthSettingPanel.js'
import StatsSettingPanel from './panels/StatsSettingPanel.js'
import ItemSettingPanel from './panels/ItemSettingPanel.js'
import WeaponSettingPanel from './panels/WeaponSettingPanel.js'
import ArmorSettingPanel from './panels/ArmorSettingPanel.js'
import VariableSettingPanel from './panels/VariableSettingPanel.js'
import SwitchSettingPanel from './panels/SwitchSettingPanel.js'
import SaveRecallPanel from './panels/SaveRecallPanel.js'
import TeleportPanel from './panels/TeleportPanel.js'
import ShortcutPanel from './panels/ShortcutPanel.js'
import TranslateSettingsPanel from './panels/TranslateSettingsPanel.js'

export default {
    name: 'CheatModal',

    components: {
        GeneralPanel,
        HealthSettingPanel,
        StatsSettingPanel,
        ItemSettingPanel,
        WeaponSettingPanel,
        ArmorSettingPanel,
        VariableSettingPanel,
        SwitchSettingPanel,
        SaveRecallPanel,
        TeleportPanel,
        ShortcutPanel,
        TranslateSettingsPanel
    },

    // default  width="700" height="400"
    // 为了适配手机屏幕，改为百分比宽高，但限制最大宽高
    template: `
<v-card 
    dark
    class="z-index-cheat-0"
    width="90vw"
    height="90vh"
    style="max-width: 700px; max-height: 450px;">
    <v-row 
        class="fill-height ma-0 pa-0">
        <div
            :style="'width: ' + navWidth + 'px;'"
            class="fill-height d-inline pa-2 overflow-y-auto hide-scrollbar">
            <v-treeview
                :active.sync="navTreeModel"
                transition
                return-object
                open-all
                dense
                :items="navTreeItems"
                activatable
                item-key="name"
                open-on-click
                @update:active="onNavTreeUpdate">
                <template v-slot:label="{item}">
                    <v-icon v-text="item.icon" small class="mx-0 px-0 align-self-center"></v-icon>
                    <span class="subtitle-2">{{item.name}}</span>
                </template>
            </v-treeview>
        </div>
        <v-divider vertical></v-divider>
        <div
            :style="'width: calc(100% - ' + navWidth + 'px - 1px);'"
            class="fill-height d-inline pa-2 overflow-y-auto hide-scrollbar">
            <component :is="currentComponentName"></component>
        </div>
    </v-row>
</v-card>
    `,

    model: {
        prop: 'currentComponentName',
        event: 'change'
    },

    props: {
        currentComponentName: {
            type: String
        }
    },

    data () {
      return {
          navWidth: 200,

          navTreeModel: undefined,

          navTreeItems: [
              {
                  name: '常用',
                  icon: 'mdi-hammer-screwdriver',
                  component: 'general-panel'
              },
              {
                  name: '战斗',
                  icon: 'mdi-battery-70',
                  component: 'health-setting-panel'
              },
              {
                  name: '等级/属性',
                  icon: 'mdi-sword-cross',
                  component: 'stats-setting-panel'
              },
              {
                  name: '物品',
                  icon: 'mdi-bag-personal-outline',
                  children: [
                      {
                          name: '道具',
                          icon: 'mdi-flask-empty-plus',
                          component: 'item-setting-panel'
                      },
                      {
                          name: '武器',
                          icon: 'mdi-sword',
                          component: 'weapon-setting-panel'
                      },
                      {
                          name: '防具',
                          icon: 'mdi-shield-plus',
                          component: 'armor-setting-panel'
                      }
                  ]
              },
              {
                  name: '变量',
                  icon: 'mdi-variable',
                  component: 'variable-setting-panel'
              },
              {
                  name: '开关',
                  icon: 'mdi-toggle-switch',
                  component: 'switch-setting-panel'
              },
              {
                  name: '保存/读取位置',
                  icon: 'mdi-map-marker-plus',
                  component: 'save-recall-panel'
              },
              {
                  name: '传送',
                  icon: 'mdi-run-fast',
                  component: 'teleport-panel'
              },
                            {
                  name: '快捷键',
                  icon: 'mdi-keyboard-outline',
                  component: 'shortcut-panel'
              },
            //   {
            //       name: '清除状态',
            //       icon: 'mdi-water-off',
            //       component: ''
            //   },
            //   {
            //       name: 'Settings',
            //       icon: 'mdi-cog',
            //       children: [
            //           {
            //               name: 'Translate',
            //               icon: 'mdi-google-translate',
            //               component: 'translate-settings-panel'
            //           }
            //       ]
            //   }
          ]
      }
    },

    computed: {
        componentNameToNavItem () {
            const ret = {}
            this.iterateLeaf(this.navTreeItems, item => {
                ret[item.component] = item
            })
            return ret
        }
    },

    mounted () {
        let navItem = this.componentNameToNavItem[this.currentComponentName]

        if (!navItem) {
            navItem = Object.values(this.componentNameToNavItem)[0]
            this.$emit('change', navItem.component)
        }
        this.navTreeModel = [navItem]
    },

    methods: {
        onNavTreeUpdate (data) {
            if (data && data.length === 1) {
                this.$emit('change', data[0].component)
            }
        },

        iterateLeaf (node, leafFunc) {
            if (Array.isArray(node)) {
                for (const item of node) {
                    this.iterateLeaf(item, leafFunc)
                }
            } else if (Object.hasOwnProperty.call(node, 'children')) {
                this.iterateLeaf(node.children, leafFunc)
            } else {
                leafFunc(node)
            }
        }
    }
}
