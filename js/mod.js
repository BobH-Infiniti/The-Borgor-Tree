let modInfo = {
	name: "The Borgor Tree",
	id: "Borgor",
	author: "BobH",
	pointsName: "Borgor Essence",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "The Big Borg",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Base game`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(69420)
    if (hasUpgrade("0", 13)) gain = gain.times(2)
    if (hasUpgrade("0", 11)) gain = gain.times(upgradeEffect("0", 11))
    if (hasUpgrade("0", 21)) gain = gain.times(upgradeEffect("0", 21))
    if (hasUpgrade("0", 22)) gain = gain.times(upgradeEffect("0", 22))
    if (hasUpgrade("0", 23)) gain = gain.times(upgradeEffect("0", 23))
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["Reach 1e69 essences to beat the game!"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e69"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}





addLayer("0", {
    name: "Borgor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍔", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    passiveGeneration(){if (hasUpgrade("0", 32)) return 0.5},
    resetsNothing(){if (hasUpgrade("0", 32)) return upgradeEffect("0", 32)},
    color: "#bf5e0a",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Borgor", // Name of prestige currency
    baseResource: "Borgor Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("0", 12)) mult = mult.times(upgradeEffect("0",12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    upgrades:{
        11: {
            title: "Booster Borgors",
            description: "Borgors boosts essence generated",
            cost: new Decimal(10),
            effect() {
                let Ah = player[this.layer].points.pow(0.5) 
                if (player[this.layer].points < 1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        12: {
            title: "Borgor Brothers",
            unlocked() {return hasUpgrade(this.layer, 11)},    
            description: "Borgors increases borgor gain",
            cost: new Decimal(25),
            effect() {
                let Ah = player[this.layer].points.pow(0.25)
                if (player[this.layer].points < 1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        13: {
            title: "Essence Condenser",
            unlocked() {return hasUpgrade(this.layer, 12)},
            description: "Doubles base essence generation",
            cost: new Decimal(50),
            effect() {
                let Ah = 2
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
        },

        21: {
            title: "Alpha Boost",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "Borgor Alpha increases borgor gain",
            cost: new Decimal(500),
            effect() {
                let Ah = player["1"].points.pow(0.15)
                if (player["1"].points <= 1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        22: {
            title: "Beta Boost",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "Borgor Beta increases borgor gain.",
            cost: new Decimal(500),
            effect() {
                Ah = player["1.1"].points.pow(0.15)
                if (player["1.1"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        23: {
            title: "Gamma Boost",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "Borgor Gamma increases borgor gain",
            cost: new Decimal(500),
            effect() {
                let Ah = player["1.2"].points.pow(0.15)
                if (player["1.2"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        31: {
            title: "Borgor Union",
            unlocked() {return hasUpgrade(this.layer, 23)},
            description: "Borgor multiplies alpha, beta, and gamma production",
            cost: new Decimal(10000),
            effect() {
                let Ah = player["0"].points.pow(0.02)
                if (player["0"].points <= 1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Multi" },
        },

        33: {
            title: "Borgor Gate",
            unlocked() {return hasUpgrade(this.layer, 32)},
            description: "Unlocks the next borgor gate",
            cost: new Decimal(250000),
            effect() {
                let Ah = "Borgor gate unlocked"
                return Ah;
            },
            effectDisplay() { return "Borgor gate unlocked" },
        },

        32: {
            title: "The Core",
            unlocked() {return hasUpgrade(this.layer, 31)},
            description: "Generates 50% of your borgor gain every second and borgor upgrades doesn't reset when you prestige",
            cost: new Decimal(100000),
            effect() {
                let Ah = true
                return Ah;
            },
        },

       
    },

    


    row: 0, // Row the layer is in on the tree (0 is the first row

    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    layerShown(){return true}

   
})



addLayer("1", {
    name: "Borgor Alpha", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍔α", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    resetsNothing(){if (hasMilestone("1", 1)) return true},
    canBuyMax(){if (hasMilestone("1", 2)) return true},
    color: "#d17321",
    branches: ["0"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Borgor Alpha", // Name of prestige currency
    baseResource: "Borgor", // Name of resource prestige is based on
    baseAmount() {return player["0"].points},
	requires: new Decimal(100), // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    

    milestones: {
        1: {
            requirementDescription: "10 Borgor Alpha",
            effectDescription: "Borgor alpha doesn't resets borgor and borgor upgrades",
            done() { return player[this.layer].points.gte(10) },
        },

        2: {
            requirementDescription: "25 Borgor Alpha",
            effectDescription: "Buys maximum amount of borgor alpha possible",
            done() { return player[this.layer].points.gte(25) },
        },

        3: {
            requirementDescription: "50 Borgor Alpha",
            effectDescription: "Obtain the alpha key",
            done() { return player[this.layer].points.gte(50) },
        },
        
    },

    upgrades:{
        11: {
            title: "Alpha Boosters",
            unlocked() {return true},
            description: "TBD",
            cost: new Decimal(5),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        12: {
            title: "Alpha Energy",
            unlocked() {return hasUpgrade(this.layer, 11)},    
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        13: {
            title: "Borgor Condenser",
            unlocked() {return hasUpgrade(this.layer, 12)},
            description: "TBD",
            cost: new Decimal(30),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        21: {
            title: "Alpha Wave",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "TBD",
            cost: new Decimal(150),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"--" },
        },

        22: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 21)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        23: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 22)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        31: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 23)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        32: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 31)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        33: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 32)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

   
})



addLayer("1.1", {
    name: "Borgor Beta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍔β", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    resetsNothing(){if (hasMilestone(this.layer, 1)) return true},
    canBuyMax(){if (hasMilestone(this.layer, 2)) return true},
    color: "#d17321",
    branches: ["0"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Borgor Beta", // Name of prestige currency
    baseResource: "Borgor", // Name of resource prestige is based on
    baseAmount() {return player["0"].points},
	requires: new Decimal(100), // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    milestones: {
        1: {
            requirementDescription: "10 Borgor Beta",
            effectDescription: "Borgor beta doesn't resets borgor and borgor upgrades",
            done() { return player[this.layer].points.gte(10) },
        },

        2: {
            requirementDescription: "25 Borgor Beta",
            effectDescription: "Buys maximum amount of borgor beta possible",
            done() { return player[this.layer].points.gte(25) },
        },

        3: {
            requirementDescription: "50 Borgor Beta",
            effectDescription: "Obtain the beta key",
            done() { return player[this.layer].points.gte(50) },
        },
        
    },

    upgrades:{
        11: {
            title: "Alpha Boosters",
            unlocked() {return true},
            description: "TBD",
            cost: new Decimal(5),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        12: {
            title: "Alpha Energy",
            unlocked() {return hasUpgrade(this.layer, 11)},    
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        13: {
            title: "Borgor Condenser",
            unlocked() {return hasUpgrade(this.layer, 12)},
            description: "TBD",
            cost: new Decimal(30),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        21: {
            title: "Alpha Wave",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "TBD",
            cost: new Decimal(150),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"--" },
        },

        22: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 21)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        23: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 22)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        31: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 23)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        32: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 31)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        33: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 32)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}

})

addLayer("1.2", {
    name: "Borgor Gamma", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍔γ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    resetsNothing(){if (hasMilestone(this.layer, 1)) return true},
    canBuyMax(){if (hasMilestone(this.layer, 2)) return true},
    color: "#d17321",
    branches: ["0"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Borgor Gamma", // Name of prestige currency
    baseResource: "Borgor", // Name of resource prestige is based on
    baseAmount() {return player["0"].points},
	requires: new Decimal(100), // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    milestones: {
        1: {
            requirementDescription: "10 Borgor Gamma",
            effectDescription: "Borgor gamma doesn't resets borgor and borgor upgrades",
            done() { return player[this.layer].points.gte(10) },
        },

        2: {
            requirementDescription: "25 Borgor Gamma",
            effectDescription: "Buys maximum amount of borgor gamma possible",
            done() { return player[this.layer].points.gte(25) },
        },

        3: {
            requirementDescription: "50 Borgor Gamma",
            effectDescription: "Obtain the gamma key",
            done() { return player[this.layer].points.gte(50) },
        },
        
    },

    upgrades:{
        11: {
            title: "Alpha Boosters",
            unlocked() {return true},
            description: "TBD",
            cost: new Decimal(5),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        12: {
            title: "Alpha Energy",
            unlocked() {return hasUpgrade(this.layer, 11)},    
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        13: {
            title: "Borgor Condenser",
            unlocked() {return hasUpgrade(this.layer, 12)},
            description: "TBD",
            cost: new Decimal(30),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        21: {
            title: "Alpha Wave",
            unlocked() {return hasUpgrade(this.layer, 13)},
            description: "TBD",
            cost: new Decimal(150),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"--" },
        },

        22: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 21)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        23: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 22)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        31: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 23)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        32: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 31)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },

        33: {
            title: "T",
            unlocked() {return hasUpgrade(this.layer, 32)},
            description: "TBD",
            cost: new Decimal(15),
            effect() {
                let Ah = 0
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"-" },
        },
    },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

addLayer("2", {
    name: "Borgor Delta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍔δ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["2.0"],
    requires: new Decimal (1e308), // Can be a function that takes requirement increases into account
    resource: "Borgor Delta", // Name of prestige currency
    baseResource: "Borgor", // Name of resource prestige is based on
    baseAmount() {return player["0"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {if (hasMilestone("2.0", 1)) if (hasMilestone("2.0", 2)) if (hasMilestone("2.0", 3)) return true
else if (player[this.layer].points >= 1) return true},
})



addLayer("2.0", {
    name: "Borgor Gate",
    symbol: "🍔Gate",
    row: 3,
    position: 1,
    branches: ["1","1.1","1.2"],
    color: "#ffaa61",
    resource: "",
    tooltip() {return "The sacred borgor gate"},
    milestones: {
        1: {
            requirementDescription: "Alpha Lock",
            effectDescription: "Requires the alpha key",
            done() { return hasMilestone("1", 3)},
        },

        2: {
            requirementDescription: "Beta Lock",
            effectDescription: "Requires the beta key",
            done() { return hasMilestone("1.1", 3)},
        },

        3: {
            requirementDescription: "Gamma Lock",
            effectDescription: "Requires the gamma key",
            done() { return hasMilestone("1.2", 3)},
        },
        
    },

    layerShown() {if (hasUpgrade("0", 33)) return true 
    else if (hasMilestone("1", 3)) if (hasMilestone("1.1", 3)) if (hasMilestone("1.2", 3)) return true
    else if (player["2"].points >= 1) return true},
        
    
})