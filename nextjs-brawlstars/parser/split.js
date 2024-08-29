import clipboardy from 'clipboardy';

let data = `basketBrawl	Alley Oop
basketBrawl	Ball Hog
basketBrawl	Basket Fort
basketBrawl	Dancing Roof
basketBrawl	Green Meadows
basketBrawl	Iron Curtain
basketBrawl	Pick and Roll
basketBrawl	Pocket Pass
basketBrawl	Reversal
basketBrawl	Slam Dunk
basketBrawl	Triple-Double
basketBrawl	Turnover
bigGame	Lit Match
bigGame	Open Season
bigGame	Team Day
bossFight	Danger Zone
bossFight	Machine Zone
bossFight	Metal Scrap
bounty	Bull Pen
bounty	Canal Grande
bounty	Color me Intrigued
bounty	Crossroads
bounty	Crowd Strike
bounty	Cube Force
bounty	Deeper Danger
bounty	Don't turn around
bounty	Dry Season
bounty	Electric Zone
bounty	Excel
bounty	Flank Attack
bounty	Heat Wave
bounty	Hideout
bounty	Infinite Doom
bounty	Iris Intervention
bounty	Iron Standoff
bounty	Land Ahoy
bounty	Layer Bake
bounty	Layer Cake
bounty	Nowhere to Hide
bounty	Outlaw Camp
bounty	Overgrown Canyon
bounty	Purple Paradise
bounty	Quick Skip
bounty	Shooting Star
bounty	Side by Side
bounty	Slayer's Paradise
bounty	Snake Prairie
bounty	Stone Fort
bounty	Temple Ruins
bounty	The Great Open
brawlBall	Back Pocket
brawlBall	Backyard Bowl
brawlBall	Bank Shot
brawlBall	Beach Ball
brawlBall	Binary Coding
brawlBall	Center Field
brawlBall	Center Stage
brawlBall	Circular Motion
brawlBall	Coarse Course
brawlBall	Cool shapes
brawlBall	Curveball
brawlBall	Deadly Deflections
brawlBall	Double Jeopardy
brawlBall	Encirclement
brawlBall	Extra Bouncy
brawlBall	Fast Fork
brawlBall	Field Goal
brawlBall	Firm Grip
brawlBall	Freezing ripples
brawlBall	Galaxy Arena
brawlBall	Goalkeeper's Dream
brawlBall	Great waves
brawlBall	Hairdryer Treatment
brawlBall	High Score
brawlBall	Iron Bars
brawlBall	Iron Corridor
brawlBall	Make it Bounce
brawlBall	Off the Line
brawlBall	Offside Trap
brawlBall	Penalty Kick
brawlBall	Pinball Dreams
brawlBall	Ping Pong
brawlBall	Pinhole Punt
brawlBall	Playbox
brawlBall	Pool Party
brawlBall	Post Haste
brawlBall	Power Shot
brawlBall	Retina
brawlBall	Slalom Slam
brawlBall	Sneaky Fields
brawlBall	Spider Crawler
brawlBall	Square Off
brawlBall	Stepping Stones
brawlBall	Sticky Notes
brawlBall	Substitute
brawlBall	Sunny Soccer
brawlBall	Super Beach
brawlBall	Super Stadium
brawlBall	Suspenders
brawlBall	Triple Dribble
brawlBall	Warped Beach
brawlBall	Well Cut
brawlBall	Winter Party
brawlBall5V5	Cool shapes
brawlBall5V5	Freezing ripples
brawlBall5V5	Great waves
brawlBall5V5	Suspenders
duels	Battered Battlefield
duels	Black River
duels	BLOCK AND COUNTER
duels	Burning Flares
duels	Cheeky Chokepoint
duels	DANGER CHAMBER
duels	Death Loop
duels	Devil's Pass
duels	DUELIST'S DESTINY
duels	Eyes on the Ground
duels	Four Lakes
duels	Gladiators
duels	Grim Island
duels	Hamilton's End
duels	Hotheaded
duels	Iron Core
duels	MEADOW OF THE CRANE
duels	Mogura Tataki
duels	MONKEY MAZE
duels	NINJA CHECKMATE
duels	No excuses
duels	NO SURRENDER
duels	Petticoat Duel
duels	RIGID RAVINES
duels	SHROUDING SERPENT
duels	Swallow Cut
duels	TIGER TRAP
duels	WARRIOR'S WAY
duoShowdown	Acid Lakes
duoShowdown	Barren Badlands
duoShowdown	Boxed In
duoShowdown	Brawler Speedway
duoShowdown	Canyon Rivers
duoShowdown	Cavern Churn
duoShowdown	Critical Crossing
duoShowdown	Dark Fantasies
duoShowdown	Dark Passage
duoShowdown	Descending Dimensions
duoShowdown	Deserted Vertex
duoShowdown	Double Trouble
duoShowdown	Dried Up River
duoShowdown	Dune Drift
duoShowdown	Eggshell
duoShowdown	Erratic Blocks
duoShowdown	Eye of the Storm
duoShowdown	Feast or Famine
duoShowdown	FiftyFive
duoShowdown	Final Four
duoShowdown	Flying Fantasies
duoShowdown	Forsaken Falls
duoShowdown	Ghost Point
duoShowdown	Goldarm Gulch
duoShowdown	Grassy Gorge
duoShowdown	Hard Limits
duoShowdown	Hot Maze
duoShowdown	Island Invasion
duoShowdown	Jump Park
duoShowdown	Leaping Frogs
duoShowdown	Lush Poles
duoShowdown	Marksman's Paradise
duoShowdown	Mystic Touch
duoShowdown	Outrageous Outback
duoShowdown	Point of View
duoShowdown	Risky Cliffs
duoShowdown	River Rush
duoShowdown	Rockwall Brawl
duoShowdown	Royal Runway
duoShowdown	Ruins
duoShowdown	Safety Center
duoShowdown	Scorched Stone
duoShowdown	Skull Creek
duoShowdown	Stocky Stockades
duoShowdown	Stormy Plains
duoShowdown	Sunset Vista
duoShowdown	Superstar
duoShowdown	Teleport Tag
duoShowdown	The Galaxy
duoShowdown	The Mortuary
duoShowdown	Two Thousand Lakes
duoShowdown	Vicious Vortex
duoShowdown	Zoomed Out
gemGrab	Acute Angle
gemGrab	Ahead of the Curve
gemGrab	Arctic extraction
gemGrab	Arène en folie
gemGrab	Bear Trap
gemGrab	Bouncing Diner
gemGrab	Chill Space
gemGrab	Chromatic Cress
gemGrab	Close Call
gemGrab	Cold pond quarry
gemGrab	Cotton Candy Dreams
gemGrab	Cross Cut
gemGrab	Crystal Arcade
gemGrab	Deathcap Trap
gemGrab	Deep Diner
gemGrab	Diamond Dust
gemGrab	Double Swoosh
gemGrab	Duality
gemGrab	Dye Direct
gemGrab	Flooded Dam
gemGrab	Flooded Mine
gemGrab	Four Doors
gemGrab	Four Squared
gemGrab	Gem Exchange
gemGrab	Gem Fort
gemGrab	Gem Source
gemGrab	Glass Half Full
gemGrab	Greasepaint Grass
gemGrab	Hard Rock Mine
gemGrab	Last Stop
gemGrab	Minecart Madness
gemGrab	Open Space
gemGrab	Opposing Forts
gemGrab	Pierced
gemGrab	Royal Flush
gemGrab	Rustic Arcade
gemGrab	Rusty Rebound
gemGrab	Sapphire Plains
gemGrab	Sneaky Sneak
gemGrab	Snowflakes
gemGrab	Snowman forest
gemGrab	Solid Center
gemGrab	Spots of Yore
gemGrab	Spring Back Alley
gemGrab	Spring Trap
gemGrab	Stacking
gemGrab	Stay in your Lane
gemGrab	Tint Terrace
gemGrab	Touch Up Tavern
gemGrab	Undermine
gemGrab	Warehouse
gemGrab5V5	Arctic extraction
gemGrab5V5	Cold pond quarry
gemGrab5V5	Snowflakes
gemGrab5V5	Snowman forest
heist	Bandit Stash
heist	Bridge Too Far
heist	Can't touch this
heist	Center Control
heist	Cover Crowd
heist	Crossroads
heist	Diagonal Alley
heist	Diamond Dome
heist	Double Locking
heist	Fancy Fencing
heist	Forks Out
heist	G.G. Mortuary
heist	Hot Potato
heist	Hungry Hippos
heist	Kaboom Canyon
heist	Offset Heist
heist	Pit Stop
heist	Rattlesnake Ravine
heist	River Banks
heist	Riverbed
heist	Rolling Rumble
heist	Safe Zone
heist	Secret or Mystery
heist	Snaked Assault
heist	Split Second
heist	Sultans of Swing
heist	Tornado Ring
heist	Treefecta
heist	Twisted Gems
hotZone	Checkered
hotZone	Controller Chaos
hotZone	Danger Zone
hotZone	Double Sided
hotZone	Dueling Beetles
hotZone	Imbalance
hotZone	Iron Cover
hotZone	Local Businesses
hotZone	Misty Meadows
hotZone	Mosh Pit
hotZone	Night at the Museum
hotZone	On the Train
hotZone	Open Business
hotZone	Open Zone
hotZone	Over the Top
hotZone	Parallel Plays
hotZone	Quarter Pounder
hotZone	Reflections
hotZone	Ring of Fire
hotZone	Rush Hour
hotZone	Split
hotZone	Street Brawler 2
hotZone	Temple of Boom
hotZone	The Great Divide
hotZone	Trident
hotZone	Triumvirate
hunters	Deliverance
hunters	Hunting Season
hunters	Omega
hunters	Quick and Restless
hunters	The Prey
hunters	Trials and Tribulations
hunters	True Trail
invasion	A Loud Place
invasion	Bots Attack!
invasion	Brawl of the Worlds
invasion	Departure
invasion	Devolution
invasion	The Bot
invasion	Val Verde
knockout	Belle's Rock
knockout	Between the Rivers
knockout	Close Call
knockout	Close Quarters
knockout	Crimewater
knockout	Deep End
knockout	Dragon Jaws
knockout	Ends Meet
knockout	Flaring Phoenix
knockout	Flowing Springs
knockout	Four Levels
knockout	Goldarm Gulch
knockout	Hard Lane
knockout	Healthy Middle Ground
knockout	Hidden Enemy
knockout	Into Infinity
knockout	Island Hopping
knockout	Luis' Revenge
knockout	Middle Ground
knockout	New Horizons
knockout	New Perspective
knockout	Out in the Open
knockout	Riverside
knockout	Snake Out
knockout	Splash Out
knockout	Step by Step
knockout	Sunset Spar
knockout	Twilight Passage
knockout	Waters of Doom
knockout	X Marks the Spot
knockout5V5	Crispy Crypt
knockout5V5	Riverbank Crossing
knockout5V5	Shuffle City
knockout5V5	Sizzling Chambers
lastStand	Punishment Day
lastStand	Rise of the Robots
lastStand	The Eliminator
paintBrawl	Chromatic Cress
paintBrawl	Dye Direct
paintBrawl	Greasepaint Grass
paintBrawl	Rusty Rebound
paintBrawl	Spots of Yore
paintBrawl	Spring Back Alley
paintBrawl	Tint Terrace
paintBrawl	Touch Up Tavern
payload	Air Waybill
payload	Backhaul
payload	Blimey!
payload	Concealed Damage
payload	Cubic Capacity
payload	Davy Jones' Locker
payload	Drawback
payload	Force Majeure
payload	Shiver me Timbers
payload	Special Delivery
payload	Walk the Plank
roboRumble	Full On
roboRumble	Last Stand
siege	Assembly Attack
siege	Bot Drop
siege	Bric-a-Brac
siege	Factory Rush
siege	Junk Park
siege	Nuts & Bolts
siege	Robo Highway
siege	Robo Ring
siege	Some Assembly Required
snowtelThieves	Easy Money
snowtelThieves	Maze Creep
snowtelThieves	Ocean's Six
snowtelThieves	Roped In
snowtelThieves	Side Door
snowtelThieves	Sideswipe
snowtelThieves	Stolen Valor
snowtelThieves	Straight Up Racket
snowtelThieves	Twisted Plan
snowtelThieves	Walk In Walk Out
soloShowdown	Acid Lakes
soloShowdown	Bounce Bazaar
soloShowdown	Boxed In
soloShowdown	Breakwater Port
soloShowdown	Canyon Rivers
soloShowdown	Cavern Churn
soloShowdown	Circling Sands
soloShowdown	Critical Crossing
soloShowdown	Dark Fantasies
soloShowdown	Dark Passage
soloShowdown	Descending Dimensions
soloShowdown	Desert Tendrils
soloShowdown	Double Trouble
soloShowdown	Dried Up River
soloShowdown	Dune Drift
soloShowdown	Eggshell
soloShowdown	Erratic Blocks
soloShowdown	Eye of the Storm
soloShowdown	Feast or Famine
soloShowdown	FiftyFive
soloShowdown	Final Four
soloShowdown	Flying Fantasies
soloShowdown	Forsaken Falls
soloShowdown	Grassy Gorge
soloShowdown	Hard Limits
soloShowdown	Hot Maze
soloShowdown	Ignition
soloShowdown	Island Invasion
soloShowdown	Leaping Frogs
soloShowdown	Lush Poles
soloShowdown	Marksman's Paradise
soloShowdown	Mystic Touch
soloShowdown	nruhC nrevaC
soloShowdown	Outrageous Outback
soloShowdown	Risky Cliffs
soloShowdown	Riverside Ring
soloShowdown	Rockwall Brawl
soloShowdown	Ruins
soloShowdown	Safety Center
soloShowdown	Scorched Stone
soloShowdown	Skull Creek
soloShowdown	Stocky Stockades
soloShowdown	Stormy Plains
soloShowdown	Sunset Vista
soloShowdown	The Galaxy
soloShowdown	The Mortuary
soloShowdown	Thousand Lakes
soloShowdown	Two Thousand Lakes
soloShowdown	Vicious Vortex
soloShowdown	Zoomed Out
takedown	Fractions
takedown	Poison Fields
takedown	Ring of Death
takedown	Roundabout
trophyEscape	Bounce Bazaar
trophyEscape	Breakwater Port
trophyEscape	Circling Sands
trophyEscape	Hardihood Hideaway
trophyThieves	Daylight Robbery
trophyThieves	Easy Money
trophyThieves	Maze Creep
trophyThieves	Ocean's Six
trophyThieves	Side Door
trophyThieves	Sideswipe
trophyThieves	Stolen Valor
trophyThieves	Straight Up Racket
trophyThieves	Trophy Trespass
trophyThieves	Twisted Plan
trophyThieves	Walk In Walk Out
trophyThieves	Zip Line
volleyBrawl	Isolation Play
volleyBrawl	Power Alley
volleyBrawl	Smash Land
volleyBrawl	Victory Road
wipeout	Camping Grounds
wipeout	Canal Grande
wipeout	Coconut Cove
wipeout	Crispy Crypt
wipeout	Dry Season
wipeout	Friendly Fire: Off
wipeout	Frosty tracks
wipeout	Hideout
wipeout	Icy ice park
wipeout	Infinite Doom
wipeout	Layer Bake
wipeout	Layer Cake
wipeout	Quad Damage
wipeout	Riverbank Crossing
wipeout	Shooting Star
wipeout	Shuffle City
wipeout	Sizzling Chambers
wipeout	Slayer's Paradise
wipeout	Slippery road
wipeout	Snake Prairie
wipeout	Spice Production
wipeout	The Great Open
wipeout	Translocator Exchange
wipeout	Wicked Twig
wipeout5V5	Crispy Crypt
wipeout5V5	Frosty tracks
wipeout5V5	Icy ice park
wipeout5V5	Shuffle City
wipeout5V5	Sizzling Chambers
wipeout5V5	Slippery road
basketBrawl	Green Meadows
basketBrawl	Iron Curtain
bounty	Crossroads
bounty	Iron Standoff
bounty	Nowhere to Hide
brawlBall	Iron Corridor
duels	Four Lakes
duels	Grim Island
duels	Iron Core
duels	Mogura Tataki
duoShowdown	Lush Poles
gemGrab	Four Doors
heist	Center Control
hotZone	Iron Cover
knockout	Healthy Middle Ground
knockout	Step by Step
soloShowdown	Lush Poles
gemGrab	Solid Center
heist	Cover Crowd
brawlBall	Circular Motion
heist	Offset Heist
hotZone	Triumvirate
`;

const query = `
select distinct mode, name from game_map 
where mode != 'unknown'
order by mode, name;
`

let result = '';
data.split('\n').map(a => {
    let b = a.split('\t')
    return {
        mode: b[0],
        map: b[1]
    };
}).map(b => {
    return `/map/${encodeURIComponent(b.map)}/mode/${b.mode}`;
}).forEach(c => {
    result += `<url><loc>https://brawlmeta.com/ko${c}</loc><lastmod>2024-08-27T02:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/ja${c}</loc><lastmod>2024-08-27T02:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/en${c}</loc><lastmod>2024-08-27T02:30:00+09:00</lastmod></url>
    `
})

// Copy
clipboardy.writeSync(result);