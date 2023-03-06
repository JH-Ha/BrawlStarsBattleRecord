import clipboardy from 'clipboardy';

let data = `basketBrawl	Alley Oop
basketBrawl	Ball Hog
basketBrawl	Basket Fort
basketBrawl	Dancing Roof
basketBrawl	Green Meadows
basketBrawl	Iron Curtain
basketBrawl	Pocket Pass
basketBrawl	Reversal
basketBrawl	Slam Dunk
basketBrawl	Triple-Double
basketBrawl	Turnover
bigGame	Lit Match
bigGame	Open Season
bossFight	Danger Zone
bossFight	Metal Scrap
bounty	Bull Pen
bounty	Canal Grande
bounty	Crossroads
bounty	Cube Force
bounty	Deeper Danger
bounty	Don't turn around
bounty	Dry Season
bounty	Electric Zone
bounty	Excel
bounty	Heat Wave
bounty	Hideout
bounty	Iron Standoff
bounty	Land Ahoy
bounty	Layer Cake
bounty	Nowhere to Hide
bounty	Outlaw Camp
bounty	Overgrown Canyon
bounty	Purple Paradise
bounty	Quick Skip
bounty	Shooting Star
bounty	Side by Side
bounty	Snake Prairie
bounty	Temple Ruins
brawlBall	Backyard Bowl
brawlBall	Bank Shot
brawlBall	Beach Ball
brawlBall	Binary Coding
brawlBall	Center Field
brawlBall	Center Stage
brawlBall	Circular Motion
brawlBall	Coarse Course
brawlBall	Curveball
brawlBall	Double Jeopardy
brawlBall	Extra Bouncy
brawlBall	Fast Fork
brawlBall	Field Goal
brawlBall	Firm Grip
brawlBall	Hairdryer Treatment
brawlBall	High Score
brawlBall	Iron Corridor
brawlBall	Make it Bounce
brawlBall	Off the Line
brawlBall	Penalty Kick
brawlBall	Pinball Dreams
brawlBall	Ping Pong
brawlBall	Pinhole Punt
brawlBall	Playbox
brawlBall	Post Haste
brawlBall	Power Shot
brawlBall	Slalom Slam
brawlBall	Sneaky Fields
brawlBall	Square Off
brawlBall	Sticky Notes
brawlBall	Substitute
brawlBall	Sunny Soccer
brawlBall	Super Beach
brawlBall	Super Stadium
brawlBall	Triple Dribble
brawlBall	Warped Beach
brawlBall	Well Cut
duels	Black River
duels	BLOCK AND COUNTER
duels	DANGER CHAMBER
duels	DUELIST'S DESTINY
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
duoShowdown	Deserted Vertex
duoShowdown	Double Trouble
duoShowdown	Dried Up River
duoShowdown	Dune Drift
duoShowdown	Eggshell
duoShowdown	Erratic Blocks
duoShowdown	Eye of the Storm
duoShowdown	Feast or Famine
duoShowdown	Flying Fantasies
duoShowdown	Ghost Point
duoShowdown	Grassy Gorge
duoShowdown	Hard Limits
duoShowdown	Hot Maze
duoShowdown	Island Invasion
duoShowdown	Jump Park
duoShowdown	Lush Poles
duoShowdown	Mystic Touch
duoShowdown	Outrageous Outback
duoShowdown	Point of View
duoShowdown	River Rush
duoShowdown	Rockwall Brawl
duoShowdown	Royal Runway
duoShowdown	Ruins
duoShowdown	Safety Center
duoShowdown	Scorched Stone
duoShowdown	Skull Creek
duoShowdown	Stocky Stockades
duoShowdown	Stormy Plains
duoShowdown	Superstar
duoShowdown	Teleport Tag
duoShowdown	The Mortuary
duoShowdown	Zoomed Out
gemGrab	Acute Angle
gemGrab	Bouncing Diner
gemGrab	Chill Space
gemGrab	Cotton Candy Dreams
gemGrab	Cross Cut
gemGrab	Crystal Arcade
gemGrab	Deathcap Trap
gemGrab	Deep Diner
gemGrab	Double Swoosh
gemGrab	Duality
gemGrab	Flooded Dam
gemGrab	Flooded Mine
gemGrab	Four Doors
gemGrab	Four Squared
gemGrab	Gem Exchange
gemGrab	Gem Fort
gemGrab	Gem Source
gemGrab	Glass Half Full
gemGrab	Hard Rock Mine
gemGrab	Minecart Madness
gemGrab	Open Space
gemGrab	Opposing Forts
gemGrab	Pierced
gemGrab	Royal Flush
gemGrab	Sapphire Plains
gemGrab	Solid Center
gemGrab	Spring Trap
gemGrab	Undermine
heist	Bridge Too Far
heist	Can't touch this
heist	Center Control
heist	Cover Crowd
heist	Crossroads
heist	Diagonal Alley
heist	Fancy Fencing
heist	Forks Out
heist	G.G. Mortuary
heist	Hot Potato
heist	Kaboom Canyon
heist	Offset Heist
heist	Pit Stop
heist	Rattlesnake Ravine
heist	River Banks
heist	Rolling Rumble
heist	Safe Zone
heist	Snaked Assault
heist	Tornado Ring
heist	Treefecta
heist	Twisted Gems
hotZone	Controller Chaos
hotZone	Danger Zone
hotZone	Double Sided
hotZone	Dueling Beetles
hotZone	Imbalance
hotZone	Iron Cover
hotZone	Mosh Pit
hotZone	Night at the Museum
hotZone	Open Business
hotZone	Open Zone
hotZone	Parallel Plays
hotZone	Quarter Pounder
hotZone	Ring of Fire
hotZone	Rush Hour
hotZone	Split
hotZone	Street Brawler 2
hotZone	Temple of Boom
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
knockout	Crimewater
knockout	Deep End
knockout	Ends Meet
knockout	Flaring Phoenix
knockout	Flowing Springs
knockout	Goldarm Gulch
knockout	Healthy Middle Ground
knockout	Hidden Enemy
knockout	Luis' Revenge
knockout	Middle Ground
knockout	New Perspective
knockout	Out in the Open
knockout	Riverside
knockout	Snake Out
knockout	Splash Out
knockout	Step by Step
knockout	X Marks the Spot
lastStand	Punishment Day
lastStand	Rise of the Robots
lastStand	The Eliminator
payload	Air Waybill
payload	Backhaul
payload	Concealed Damage
payload	Cubic Capacity
payload	Drawback
payload	Force Majeure
payload	Special Delivery
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
soloShowdown	Boxed In
soloShowdown	Canyon Rivers
soloShowdown	Cavern Churn
soloShowdown	Dark Fantasies
soloShowdown	Dark Passage
soloShowdown	Double Trouble
soloShowdown	Dried Up River
soloShowdown	Dune Drift
soloShowdown	Eggshell
soloShowdown	Erratic Blocks
soloShowdown	Eye of the Storm
soloShowdown	Feast or Famine
soloShowdown	Flying Fantasies
soloShowdown	Grassy Gorge
soloShowdown	Hard Limits
soloShowdown	Hot Maze
soloShowdown	Ignition
soloShowdown	Island Invasion
soloShowdown	Lush Poles
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
soloShowdown	The Mortuary
soloShowdown	Thousand Lakes
soloShowdown	Two Thousand Lakes
soloShowdown	Zoomed Out
trophyThieves	Easy Money
trophyThieves	Maze Creep
trophyThieves	Ocean's Six
trophyThieves	Side Door
trophyThieves	Sideswipe
trophyThieves	Stolen Valor
trophyThieves	Straight Up Racket
trophyThieves	Twisted Plan
trophyThieves	Walk In Walk Out
unknown	Easy Money
unknown	Ocean's Six
unknown	Side Door
unknown	Sideswipe
unknown	Stolen Valor
unknown	Straight Up Racket
unknown	Twisted Plan
wipeout	Camping Grounds
wipeout	Friendly Fire: Off
wipeout	Infinite Doom
wipeout	Quad Damage
wipeout	Slayer's Paradise
wipeout	Translocator Exchange
wipeout	Wicked Twig`;

const query = `
select distinct mode, name from game_map 
where mode != 'unknown'
order by mode;
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
    result += `<url><loc>https://brawlmeta.com/ko${c}</loc><lastmod>2023-03-07T02:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/ja${c}</loc><lastmod>2023-03-07T02:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/en${c}</loc><lastmod>2023-03-07T02:30:00+09:00</lastmod></url>
    `
})

// Copy
clipboardy.writeSync(result);