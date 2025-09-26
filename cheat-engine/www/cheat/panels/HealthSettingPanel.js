import HealthSettingTab from './HealthSettingTab.js'
import {BattleCheat} from '../js/CheatHelper.js'

export default {
    name: 'HealthSettingPanel',

    components: {
        HealthSettingTab
    },

    template: `
<v-card 
    class="ma-0 pa-0"
    flat>
    <v-card-subtitle class="caption pb-0">战斗</v-card-subtitle>
    <v-card-text class="pt-0 pb-0">
        <v-checkbox
            v-model="disableRandomEncounter"
            hide-details
            dense
            x-small
            class="my-0 py-0"
            @change="onDisableRandomEncounterChange">
            <template v-slot:label>
                <span class="caption">禁用随机遇敌</span>
            </template>
        </v-checkbox>
        <v-btn small @click.prevent="encounterBattle">遇敌</v-btn>
        <v-btn small @click.prevent="victory">胜利</v-btn>
        <v-btn small @click.prevent="defeat">失败</v-btn>
        <v-btn small @click.prevent="escape">逃跑</v-btn>
        <v-btn small @click.prevent="abort">中止</v-btn>
    </v-card-text>
    
    <v-card-subtitle class="caption pb-1">敌人</v-card-subtitle>
    <v-card-text class="pt-0 pb-0">
        <v-btn small @click.prevent="changeAllEnemyHealth(0)">HP 0</v-btn>
        <v-btn small @click.prevent="changeAllEnemyHealth(1)">HP 1</v-btn>
        <v-btn small @click.prevent="recoverAllEnemy">恢复</v-btn>
        <v-btn small @click.prevent="fillTpAllEnemy">补满 TP</v-btn>
    </v-card-text>
    
    <v-card-subtitle class="caption pb-1">队伍</v-card-subtitle>
    <v-card-text class="pt-0 pb-0">
        <v-btn small @click.prevent="changeAllPartyHealth(0)">HP 0</v-btn>
        <v-btn small @click.prevent="changeAllPartyHealth(1)">HP 1</v-btn>
        <v-btn small @click.prevent="recoverAllParty">恢复</v-btn>
        <v-btn small @click.prevent="fillTpAllParty">补满 TP</v-btn>
    </v-card-text>
    
    <template v-if="enemy && enemy.length > 0">
        <v-card-subtitle class="caption pb-1">敌人详情</v-card-subtitle>
        <v-card-text class="pt-0 pb-0">
            <health-setting-tab
                :items="enemy"
                @change="onDetailChange">
            </health-setting-tab>
        </v-card-text>
    </template>
    
    <template v-if="party && party.length > 0">
        <v-card-subtitle class="caption pb-1">队伍详情</v-card-subtitle>
        <v-card-text class="pt-0 pb-0">
            <health-setting-tab
                :items="party"
                @change="onDetailChange">
            </health-setting-tab>
        </v-card-text>
    </template>
    
    <v-tooltip
        bottom>
        <span>重新加载游戏数据</span>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                style="top: 0px; right: 0px;"
                color="pink"
                dark
                small
                absolute
                top
                right
                fab
                v-bind="attrs"
                v-on="on"
                @click="initializeVariables">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </template>
    </v-tooltip>
</v-card>
    `,

    data () {
        return {
            disableRandomEncounter: false,
            enemy: [],
            party: []
        }
    },

    created () {
        this.initializeVariables()
    },

    methods: {
        initializeVariables () {
            this.enemy = $gameTroop.members().map(member => member)
            this.party = $gameParty.members().map(member => member)
            this.disableRandomEncounter = BattleCheat.isDisableRandomEncounter()
        },

        recoverAllEnemy () {
            BattleCheat.recoverAllEnemy()
            this.initializeVariables()
        },

        recoverAllParty () {
            BattleCheat.recoverAllParty()
            this.initializeVariables()
        },

        fillTpAllEnemy () {
            BattleCheat.fillTpAllEnemy()
            this.initializeVariables()
        },

        fillTpAllParty () {
            BattleCheat.fillTpAllParty()
            this.initializeVariables()
        },

        changeAllEnemyHealth (newHp) {
            BattleCheat.changeAllEnemyHealth(newHp)
            this.initializeVariables()
        },

        changeAllPartyHealth (newHp) {
            BattleCheat.changeAllPartyHealth(newHp)
            this.initializeVariables()
        },

        encounterBattle () {
            BattleCheat.encounterBattle()
        },

        victory () {
            BattleCheat.victory()
        },

        defeat () {
            BattleCheat.defeat()
        },

        escape () {
            BattleCheat.escape()
        },

        abort () {
            BattleCheat.abort()
        },

        onDisableRandomEncounterChange () {
            BattleCheat.toggleDisableRandomEncounter()
            this.initializeVariables()
        },

        onDetailChange (items) {
            for (const item of items) {
                const member = item._member
                member.setHp(Number(item.hp.hp))
                member.setMp(Number(item.mp.mp))
            }
            this.initializeVariables()
        }
    }
}
