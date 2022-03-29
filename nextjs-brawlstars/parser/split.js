import clipboardy from 'clipboardy';

let data = `bounty	Cube Force
bounty	Dry Season
bounty	Hideout
bounty	Purple Paradise
bounty	Shooting Star
bounty	Electric Zone
bounty	Layer Cake
duoShowdown	Dark Passage
duoShowdown	Scorched Stone
duoShowdown	Cavern Churn
duoShowdown	Safety Center
duoShowdown	Dried Up River
duoShowdown	Skull Creek
duoShowdown	Ruins
duoShowdown	Mystic Touch
duoShowdown	Double Trouble
duoShowdown	Rockwall Brawl
heist	Pit Stop
heist	Safe Zone
heist	Kaboom Canyon
heist	Diagonal Alley
heist	Hot Potato
heist	Bridge Too Far
brawlBall	Field Goal
brawlBall	Triple Dribble
brawlBall	Center Stage
brawlBall	Binary Coding
brawlBall	Firm Grip
brawlBall	Sunny Soccer
brawlBall	Backyard Bowl
brawlBall	Sticky Notes
brawlBall	Super Stadium
hotZone	Dueling Beetles
hotZone	Ring of Fire
hotZone	Danger Zone
soloShowdown	Scorched Stone
soloShowdown	Dark Passage
soloShowdown	Skull Creek
soloShowdown	Cavern Churn
soloShowdown	Ruins
knockout	Flaring Phoenix
knockout	Belle's Rock
knockout	Middle Ground
knockout	Ends Meet
knockout	Luis' Revenge
gemGrab	Minecart Madness
gemGrab	Crystal Arcade
gemGrab	Double Swoosh
gemGrab	Hard Rock Mine
gemGrab	Gem Fort
gemGrab	Flooded Mine
gemGrab	Four Squared
siege	Bric-a-Brac
siege	Bot Drop
siege	Factory Rush
siege	Nuts & Bolts
brawlBall	Pinhole Punt
hotZone	Split
soloShowdown	Rockwall Brawl
soloShowdown	Double Trouble
brawlBall	Sneaky Fields
gemGrab	Acute Angle
gemGrab	Pierced
bounty	Excel
duoShowdown	Stocky Stockades
brawlBall	Center Field
hotZone	Controller Chaos
knockout	Deep End
soloShowdown	Safety Center
siege	Junk Park
heist	Rattlesnake Ravine
brawlBall	Pinball Dreams
hotZone	Night at the Museum
knockout	Goldarm Gulch
duoShowdown	Feast or Famine
duoShowdown	Dark Fantasies
brawlBall	Slalom Slam
brawlBall	Power Shot
soloShowdown	Dried Up River
soloShowdown	Dark Fantasies
soloShowdown	Mystic Touch
soloShowdown	Stocky Stockades
soloShowdown	Feast or Famine
soloShowdown	Acid Lakes
hotZone	Parallel Plays
gemGrab	Cotton Candy Dreams
gemGrab	Deep Diner
gemGrab	Undermine
siege	Robo Ring
duoShowdown	Acid Lakes
gemGrab	Gem Source
brawlBall	Super Beach
heist	Tornado Ring
gemGrab	Gem Exchange
knockout	Crimewater
bounty	Heat Wave
soloShowdown	Erratic Blocks
soloShowdown	Hot Maze
soloShowdown	Island Invasion
brawlBall	Coarse Course
brawlBall	Hairdryer Treatment
brawlBall	Penalty Kick
duoShowdown	Eye of the Storm
hotZone	Temple of Boom
knockout	Riverside
brawlBall	Beach Ball
brawlBall	Well Cut
heist	Twisted Gems
bounty	Deeper Danger
bounty	Overgrown Canyon
heist	Forks Out
hotZone	Double Sided
knockout	Flowing Springs
soloShowdown	Eye of the Storm
soloShowdown	The Mortuary
brawlBall	Post Haste
brawlBall	Warped Beach
knockout	Splash Out
soloShowdown	Eggshell
duoShowdown	Eggshell
duoShowdown	Hot Maze
duoShowdown	Island Invasion
duoShowdown	The Mortuary
gemGrab	Bouncing Diner
gemGrab	Cross Cut
gemGrab	Sapphire Plains
hotZone	Open Business
gemGrab	Flooded Dam
hotZone	Mosh Pit
soloShowdown	Outrageous Outback
duoShowdown	Erratic Blocks
duoShowdown	Outrageous Outback
gemGrab	Chill Space
siege	Robo Highway
heist	G.G. Mortuary
duoShowdown	Canyon Rivers
bounty	Bull Pen
bigGame	Lit Match
siege	Some Assembly Required
wipeout	Camping Grounds
brawlBall	Off the Line
gemGrab	Deathcap Trap
soloShowdown	Canyon Rivers
gemGrab	Opposing Forts
wipeout	Infinite Doom
gemGrab	Open Space
duels	MONKEY MAZE
wipeout	Friendly Fire: Off
wipeout	Translocator Exchange
siege	Assembly Attack
duels	NO SURRENDER
wipeout	Slayer's Paradise
duels	DANGER CHAMBER
duels	DUELIST'S DESTINY
duels	SHROUDING SERPENT
duels	TIGER TRAP
duels	WARRIOR'S WAY
wipeout	Wicked Twig
roboRumble	Last Stand
wipeout	Quad Damage
payload	Backhaul
payload	Force Majeure
payload	Air Waybill
payload	Cubic Capacity
basketBrawl	Ball Hog
basketBrawl	Turnover
payload	Concealed Damage
basketBrawl	Slam Dunk
payload	Special Delivery
bossFight	Danger Zone
basketBrawl	Pocket Pass
payload	Drawback
unknown	Infinite Doom
basketBrawl	Alley Oop
basketBrawl	Reversal
basketBrawl	Triple-Double
bigGame	Open Season
roboRumble	Full On`;

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
    result += `<url><loc>https://brawlmeta.com/ko${c}</loc><lastmod>2021-02-29T18:58:59+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/ja${c}</loc><lastmod>2021-03-29T18:58:59+09:00</lastmod></url>
    `
    result += `<url><loc>https://brawlmeta.com/en${c}</loc><lastmod>2021-02-29T18:58:59+09:00</lastmod></url>
    `
})

// Copy
clipboardy.writeSync(result);