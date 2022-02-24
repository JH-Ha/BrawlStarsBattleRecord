let data = `26006	0	bounty	Cube Force
26007	0	bounty	Dry Season
26008	0	bounty	Hideout
26009	0	bounty	Purple Paradise
26010	0	bounty	Shooting Star
26011	0	bounty	Electric Zone
26012	0	bounty	Layer Cake
26013	0	duoShowdown	Dark Passage
26014	0	duoShowdown	Scorched Stone
26015	0	duoShowdown	Cavern Churn
26016	0	duoShowdown	Safety Center
26017	0	duoShowdown	Dried Up River
26018	0	duoShowdown	Skull Creek
26019	0	duoShowdown	Ruins
26020	0	duoShowdown	Mystic Touch
26021	0	duoShowdown	Double Trouble
26022	0	duoShowdown	Rockwall Brawl
26023	0	heist	Pit Stop
26024	0	heist	Safe Zone
26025	0	heist	Kaboom Canyon
26026	0	heist	Diagonal Alley
26027	0	heist	Hot Potato
26028	0	heist	Bridge Too Far
26030	0	brawlBall	Field Goal
26031	0	brawlBall	Triple Dribble
26032	0	brawlBall	Center Stage
26033	0	brawlBall	Binary Coding
26034	0	brawlBall	Firm Grip
26035	0	brawlBall	Sunny Soccer
26036	0	brawlBall	Backyard Bowl
26037	0	brawlBall	Sticky Notes
26038	0	brawlBall	Super Stadium
26039	0	hotZone	Dueling Beetles
26040	0	hotZone	Ring of Fire
26041	0	hotZone	Danger Zone
26042	0	soloShowdown	Scorched Stone
26043	0	soloShowdown	Dark Passage
26044	0	soloShowdown	Skull Creek
26045	0	soloShowdown	Cavern Churn
26046	0	soloShowdown	Ruins
26047	0	knockout	Flaring Phoenix
26048	0	knockout	Belle's Rock
26049	0	knockout	Middle Ground
26050	0	knockout	Ends Meet
26051	0	knockout	Luis' Revenge
26052	0	gemGrab	Minecart Madness
26053	0	gemGrab	Crystal Arcade
26054	0	gemGrab	Deathcap Trap
26055	0	gemGrab	Double Swoosh
26056	0	gemGrab	Hard Rock Mine
26057	0	gemGrab	Gem Fort
26058	0	gemGrab	Flooded Mine
26059	0	gemGrab	Four Squared
26060	0	siege	Bric - a - Brac
26061	0	siege	Bot Drop
26062	0	siege	Factory Rush
26063	0	siege	Nuts & Bolts
26064	0	siege	Some Assembly Required
34694	0	brawlBall	Pinhole Punt
34695	0	hotZone	Split
34696	0	soloShowdown	Rockwall Brawl
36040	0	soloShowdown	Double Trouble
40604	0	brawlBall	Sneaky Fields
44318	0	gemGrab	Acute Angle
55617	0	gemGrab	Pierced
75822	0	bounty	Excel
75823	0	duoShowdown	Stocky Stockades
75824	0	brawlBall	Center Field
75825	0	hotZone	Controller Chaos
75826	0	knockout	Deep End
75827	0	soloShowdown	Safety Center
75828	0	siege	Junk Park
102259	0	heist	Rattlesnake Ravine
105138	0	brawlBall	Pinball Dreams
106938	0	hotZone	Night at the Museum
108244	0	knockout	Goldarm Gulch
340780	0	duoShowdown	Feast or Famine
340782	0	duoShowdown	Dark Fantasies
340827	0	brawlBall	Slalom Slam
340829	0	brawlBall	Power Shot
340863	0	soloShowdown	Dried Up River
340866	0	soloShowdown	Dark Fantasies
340868	0	soloShowdown	Mystic Touch
340870	0	soloShowdown	Stocky Stockades
340872	0	soloShowdown	Feast or Famine
340875	0	soloShowdown	Acid Lakes
340897	0	hotZone	Parallel Plays
340937	0	gemGrab	Cotton Candy Dreams
340939	0	gemGrab	Deep Diner
340941	0	gemGrab	Undermine
340952	0	siege	Robo Ring
608013	0	duoShowdown	Acid Lakes
608259	0	gemGrab	Gem Source`;
data.split('\n').map(a => {
    let b = a.split('\t')
    return {
        mode: b[2],
        map: b[3]
    };
}).map(b => {
    return `/map/${encodeURIComponent(b.map)}/mode/${b.mode}`;
}).forEach(c => {
    console.log(`<url>
        <loc>https://brawlmeta.com${c}</loc>
        <lastmod>2021-02-24T18:58:59+00:00</lastmod>
    </url>`);
})