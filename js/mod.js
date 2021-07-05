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
    if (hasUpgrade("0", 13)) gain = new Decimal(69420 * 2)
    if (hasUpgrade("0", 11)) gain = gain.times(upgradeEffect("0", 11))
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
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
   
    color: "#4BDC13",
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
            cost: new Decimal(5),
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
            cost: new Decimal(15),
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
            cost: new Decimal(30),
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
            cost: new Decimal(150),
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
            cost: new Decimal(15),
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
            cost: new Decimal(150),
            effect() {
                let Ah = player["1.2"].points.pow(0.15)
                if (player["1.2"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },

        31: {
            title: "Alpha Boost",
            unlocked() {return hasUpgrade(this.layer, 23)},
            description: "Borgor Alpha increases borgor gain",
            cost: new Decimal(150),
            effect() {
                let Ah = player["1"].points.pow(0.15)
                if (player["1"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
        },

        32: {
            title: "Alpha Boost",
            unlocked() {return hasUpgrade(this.layer, 31)},
            description: "Borgor Alpha increases borgor gain",
            cost: new Decimal(150),
            effect() {
                let Ah = player["1"].points.pow(0.15)
                if (player["1"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
        },

        33: {
            title: "Alpha Boost",
            unlocked() {return hasUpgrade(this.layer, 32)},
            description: "Borgor Alpha increases borgor gain",
            cost: new Decimal(150),
            effect() {
                let Ah = player["1"].points.pow(0.15)
                if (player["1"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
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
    color: "#4BDC13",
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

    upgrades:{
        11: {
            title: "Booster Borgors",
            unlocked() {return true},
            description: "Borgors boosts essence generated",
            cost: new Decimal(5),
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
            cost: new Decimal(15),
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
            cost: new Decimal(30),
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
            cost: new Decimal(150),
            effect() {
                let Ah = player["1"].points.pow(0.15)
                if (player["1"].points <1) Ah = Ah + 1
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
        },

        22: {
            title: "The Core",
            unlocked() {return hasUpgrade(this.layer, 33)},
            description: "Doubles base essence generation",
            cost: new Decimal(15),
            effect() {
                let Ah = 2
                return Ah;
            },
            effectDisplay() { return format(this.effect())+"x Essence Gain" },
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
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["0"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Borgor Beta", // Name of prestige currency
    baseResource: "Borgor", // Name of resource prestige is based on
    baseAmount() {return player["0"].points},
	requires: new Decimal(1), // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
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
    branches: ["1","1.1","1.2"],
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
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
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for borgors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return layer["1"].unlocked}
})



