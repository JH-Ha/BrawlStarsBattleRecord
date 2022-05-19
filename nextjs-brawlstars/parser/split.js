import clipboardy from 'clipboardy';

let data = `basketBrawl	Alley Oop
basketBrawl	Ball Hog
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
bounty	Cube Force
bounty	Deeper Danger
bounty	Dry Season
bounty	Electric Zone
bounty	Excel
bounty	Heat Wave
bounty	Hideout
bounty	Land Ahoy
bounty	Layer Cake
bounty	Overgrown Canyon
bounty	Purple Paradise
bounty	Shooting Star
bounty	Snake Prairie
brawlBall	Backyard Bowl
brawlBall	Beach Ball
brawlBall	Binary Coding
brawlBall	Center Field
brawlBall	Center Stage
brawlBall	Coarse Course
brawlBall	Extra Bouncy
brawlBall	Field Goal
brawlBall	Firm Grip
brawlBall	Hairdryer Treatment
brawlBall	High Score
brawlBall	Off the Line
brawlBall	Penalty Kick
brawlBall	Pinball Dreams
brawlBall	Ping Pong
brawlBall	Pinhole Punt
brawlBall	Post Haste
brawlBall	Power Shot
brawlBall	Slalom Slam
brawlBall	Sneaky Fields
brawlBall	Sticky Notes
brawlBall	Sunny Soccer
brawlBall	Super Beach
brawlBall	Super Stadium
brawlBall	Triple Dribble
brawlBall	Warped Beach
brawlBall	Well Cut
duels	DANGER CHAMBER
duels	DUELIST'S DESTINY
duels	MONKEY MAZE
duels	NO SURRENDER
duels	SHROUDING SERPENT
duels	TIGER TRAP
duels	WARRIOR'S WAY
duoShowdown	Acid Lakes
duoShowdown	Canyon Rivers
duoShowdown	Cavern Churn
duoShowdown	Dark Fantasies
duoShowdown	Dark Passage
duoShowdown	Double Trouble
duoShowdown	Dried Up River
duoShowdown	Eggshell
duoShowdown	Erratic Blocks
duoShowdown	Eye of the Storm
duoShowdown	Feast or Famine
duoShowdown	Flying Fantasies
duoShowdown	Grassy Gorge
duoShowdown	Hot Maze
duoShowdown	Island Invasion
duoShowdown	Mystic Touch
duoShowdown	Outrageous Outback
duoShowdown	Rockwall Brawl
duoShowdown	Ruins
duoShowdown	Safety Center
duoShowdown	Scorched Stone
duoShowdown	Skull Creek
duoShowdown	Stocky Stockades
duoShowdown	The Mortuary
gemGrab	Acute Angle
gemGrab	Bouncing Diner
gemGrab	Chill Space
gemGrab	Cotton Candy Dreams
gemGrab	Cross Cut
gemGrab	Crystal Arcade
gemGrab	Deathcap Trap
gemGrab	Deep Diner
gemGrab	Double Swoosh
gemGrab	Flooded Dam
gemGrab	Flooded Mine
gemGrab	Four Squared
gemGrab	Gem Exchange
gemGrab	Gem Fort
gemGrab	Gem Source
gemGrab	Hard Rock Mine
gemGrab	Minecart Madness
gemGrab	Open Space
gemGrab	Opposing Forts
gemGrab	Pierced
gemGrab	Sapphire Plains
gemGrab	Spring Trap
gemGrab	Undermine
heist	Bridge Too Far
heist	Can't touch this
heist	Diagonal Alley
heist	Forks Out
heist	G.G. Mortuary
heist	Hot Potato
heist	Kaboom Canyon
heist	Pit Stop
heist	Rattlesnake Ravine
heist	Rolling Rumble
heist	Safe Zone
heist	Tornado Ring
heist	Twisted Gems
hotZone	Controller Chaos
hotZone	Danger Zone
hotZone	Double Sided
hotZone	Dueling Beetles
hotZone	Mosh Pit
hotZone	Night at the Museum
hotZone	Open Business
hotZone	Open Zone
hotZone	Parallel Plays
hotZone	Ring of Fire
hotZone	Split
hotZone	Temple of Boom
invasion	A Loud Place
invasion	Bots Attack!
invasion	Brawl of the Worlds
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
knockout	Luis' Revenge
knockout	Middle Ground
knockout	New Perspective
knockout	Riverside
knockout	Splash Out
knockout	X Marks the Spot
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
soloShowdown	Acid Lakes
soloShowdown	Canyon Rivers
soloShowdown	Cavern Churn
soloShowdown	Dark Fantasies
soloShowdown	Dark Passage
soloShowdown	Double Trouble
soloShowdown	Dried Up River
soloShowdown	Eggshell
soloShowdown	Erratic Blocks
soloShowdown	Eye of the Storm
soloShowdown	Feast or Famine
soloShowdown	Flying Fantasies
soloShowdown	Grassy Gorge
soloShowdown	Hot Maze
soloShowdown	Island Invasion
soloShowdown	Mystic Touch
soloShowdown	Outrageous Outback
soloShowdown	Rockwall Brawl
soloShowdown	Ruins
soloShowdown	Safety Center
soloShowdown	Scorched Stone
soloShowdown	Skull Creek
soloShowdown	Stocky Stockades
soloShowdown	The Mortuary
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
    result += `<url><loc>https://brawlmeta.com/ko${c}</loc><lastmod>2022-05-19T09:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/ja${c}</loc><lastmod>2022-05-19T09:30:00+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/en${c}</loc><lastmod>2022-05-19T09:30:00+09:00</lastmod></url>
    `
})

// Copy
clipboardy.writeSync(result);