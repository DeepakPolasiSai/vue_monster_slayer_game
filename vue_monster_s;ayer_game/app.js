let randomval = function (max, min) {
    return Math.floor(Math.random() * (max - min)) + min
}

let app = Vue.createApp({
    data() {
        return {
            monsterhealth: 100,
            attackerhealth: 100,
            specialattackenablecount: 0,
            result: null,
            logarray: []
        }
    },
    computed: {
        monsterbar: function () {
            if (this.monsterhealth <= 0) {
                return { width: '0%' }
            }
            return { width: this.monsterhealth + '%' }
        },
        attackerbar: function () {
            if (this.attackerhealth <= 0) {
                return { width: '0%' }
            }
            return { width: this.attackerhealth + '%' }
        },
        checkdisable: function () {
            return this.specialattackenablecount % 3 !== 0
        }
    },
    watch: {
        monsterhealth: function (value) {
            if (value <= 0 && this.attackerhealth <= 0) {
                //draw
                this.result = 'draw'

            }
            else if (value <= 0) {
                //player won
                this.result = 'player'
            }
        },
        attackerhealth: function (value) {
            if (value <= 0 && this.monsterhealth <= 0) {
                //draw
                this.result = 'draw'
            }
            else if (value <= 0) {
                //monster won
                this.result = 'monster'
            }

        }
    },
    methods: {
        startagain: function () {
            this.monsterhealth = 100
            this.attackerhealth = 100
            this.specialattackenablecount = 0
            this.result = null
            this.logarray = []
        },
        monsterattack: function () {
            this.specialattackenablecount++
            let attacked = randomval(12, 5)
            this.monsterhealth -= attacked
            this.addlog('player', 'attack', attacked)
            this.attackerattack()
        },
        attackerattack: function () {
            let attacked = randomval(15, 8)
            this.attackerhealth -= attacked
            this.addlog('monster', 'attack', attacked)
        },
        specialattack: function () {
            this.specialattackenablecount++
            let attacked = randomval(25, 10)
            this.monsterhealth -= attacked
            this.addlog('player', 'attack', attacked)
            this.attackerattack()
        },
        healing: function () {
            this.specialattackenablecount++
            let healvalue = randomval(20, 8)
            if (this.attackerhealth + healvalue > 100) {
                this.attackerhealth = 100
            }
            else {
                this.attackerhealth += healvalue
            }
            this.addlog('player', 'heal', healvalue)
            this.monsterattack()
        },
        surrender: function () {
            this.result = 'monster'
        },
        addlog: function (who, what, points) {
            this.logarray.unshift({
                actionby: who,
                actiontype: what,
                value: points
            })

        }
    }
})

app.mount('#game')