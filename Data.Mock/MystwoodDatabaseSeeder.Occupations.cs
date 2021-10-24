namespace Mystwood.Landing.Data.Mock
{
    public partial class MystwoodDatabaseSeeder
    {
        private static void LoadOccupations(TraitsBuilder traits) => traits
            .WithOccupation(OccupationType.Basic, "Adventurer",
                "Agility, Scavenging, Serene Contemplation, Wear Armor 2",
                description:
                "Many travelers, especially children, who find their way to the Mystwood Keep have no real training, only seeking a new start where they can make money and set up social ties. New players of any age may have this Occupation until their third Event, after which they must settle into a conventional role. Players under 18 may keep this Occupation until they turn 18.")
            .WithOccupation(OccupationType.Basic, "Apprentice",
                "Agility, Apprenticeship, Duty 1 (assist master), Production X (any 1 Material or Component), Serene Contemplation",
                description:
                "For as long as any can remember, apprenticeship has been the normal way to learn a craft. The skills of an apprentice are very helpful to a master, and therefore this Occupation is in high demand. The pay is not always great, but the perks are useful. Relationships formed as an apprentice can last the rest of your life. In some cases, it might be worth offering your services for free until a wealthier patron comes along to employ you.")
            .WithOccupation(OccupationType.Basic, "Baker", "Cooking 4, Income 10, News & Rumors, Weapon Use (Flail)",
                description:
                "Bread is the most important food for the vast majority of people in Europa, being the basis of nearly every meal. Thus, bakers are common and valued. Since many people come to the baker to get their bread, they are an excellent source of rumors.")
            .WithOccupation(OccupationType.Basic, "Barber Surgeon", "Apothecary 2, Cure Affliction, Medicine",
                description:
                "The practice of Medicine in the Mystwood is not for the faint of heart. Maladies are many and terrible, and the nature of the Mystwood means they progress at terrifying speed. Patients transform into monsters on the operating table, and the Barber Surgeon must take precautions to avoid the most horrid of afflictions.")
            .WithOccupation(OccupationType.Basic, "Bard/Minstrel/Thespian",
                "Bardic Voice 4, Entertainer, News & Rumors",
                description:
                "Jugglers, dancers, minstrels, thespians, even puppeteers, these are the superstars of the Known world. Their performances are often the high points of folk’s existence, especially in times of trouble.")
            .WithOccupation(OccupationType.Basic, "Beggar",
                "Agility, Begging, Livery (rags and patches), Scavenging, 1:[Information Gathering or Weapon Use (Staff)]",
                description:
                "War, famine, plague, and a host of other ills best Europa, and many who lose their homes and livelihoods become beggars, forced to seek bread and coin from generous folk. Such downtrodden often find themselves in rural villages, searching for new lives. Of course, some beggars are false- little better than brigand- and so beggars often have bad reputations.")
            .WithOccupation(OccupationType.Basic, "Blacksmith",
                "Livery (leather apron), Metalworking 4, Weapon Specialization (One Handed Blunt, Two Handed Blunt)",
                description:
                "Blacksmiths form the backbone of the kingdom. They service the many knights who need a great deal of upkeep on their armor. A blacksmith’s use of metalworking is also helpful to the commoners, who need sturdy arrows for their bows.")
            .WithOccupation(OccupationType.Basic, "Boatman",
                "Buy/Sell 10, Income 5, Production (1 Water), News & Rumors, Work Rhythm, 1:[Cosmopolitan Connections or Scavenging]",
                description:
                "In a Europa where roads are uncommon and often plagued by brigands, river travel is common, cheap, and reliable. Most settlements are no more than a day or two's travel from the sea, or from a river, major routes of trade and vital lifelines. Boatmen are those sturdy folk who ensure that small, distant settlements continue to receive finished goods from the outside world, and that the raw materials gained from the wilds are easily obtained by the rest of the Known World.")
            .WithOccupation(OccupationType.Basic, "Butcher",
                "Butcher, Cooking 2, Livery (bloodstained apron), Toughness",
                description:
                "Even peasants in Europa eat a great deal of meat, but few know the ins and outs of cleaning and preparing it for consumption. Thus, the butcher’s trade is invaluable. Butchers require good strength and health in order to move heavy carcasses, and so they are often surprisingly tough.")
            .WithOccupation(OccupationType.Basic, "Clerk/Forger",
                "Copyist, Production (2 Parchment), Scribe 4, Serene Contemplation",
                description:
                "Clerks are employed by many wealthier individuals, though some offer freelance services. They are skilled in the art of writing and record keeping. Clerks are never without a few sheets of quality parchment.")
            .WithOccupation(OccupationType.Basic, "Courier", "Agility, Income 5, News & Rumors, Pathfinding, Scribe 2",
                description:
                "For most, alas, mobility from their villages and farms is difficult at best, and deadly at worst. The threat of raiders and beastmen keeps many behind shuttered window and palisade. What, then, of missives which must be sent from lord to vassal, or merchant to factor? Such is the role of the courier, whose quick feet and cunning eye allows them to move about quickly, and spread information on the strange places and half-heard news they encounter in their travels.")
            .WithOccupation(OccupationType.Basic, "Dancer/Juggler/Acrobat",
                "Agility, Entertainer, Livery (performance costume), News & Rumors, Weapon Specialization (Thrown Weapon)",
                description:
                "Often dressed in colorful and unique attire, dancers, jugglers, and acrobats are popular among commoners. They perform a service desired by all- quality entertainment. They are often agile, and at times their performance skills will benefit them in a fight.")
            .WithOccupation(OccupationType.Basic, "Folk Healer",
                "Apothecary 2, Cure Affliction, Detect Health, News & Rumors",
                description:
                "Folk healers include such cunning men, midwives, witchdoctors and field medics that assist with minor home remedies, childbirth, and wound care to villages and households too small to maintain a professionally trained person. While most would go to a barber-surgeon for a bleeding, or to an herbalist for a poultice, the folk healer is sometimes sought after for advice as much as medicinal wisdom.")
            .WithOccupation(OccupationType.Basic, "Fortune Teller",
                "Fortune Telling, Income 10, Mage Lore, News & Rumors, Serene Contemplation, 1:[Bardic Voice 2 or Scribe 2]",
                description:
                "The future is a riddle many seek to answer, and they are willing to pay handsomely for any clues to what lies ahead. A successful court astrologer can earn tremendous wealth, and even village fortune tellers are quite well off. Alas, seers are also viewed with great suspicion, which can make this career quite risky. The notion that they are all charlatans is sometimes bandied about, and more dire, some believe they make their predictions come true with dark sorcery.")
            .WithOccupation(OccupationType.Basic, "Gentlefolk",
                "Bestow Favor, Income 10, 2:[Bardic Voice 2, Cooking 2, Divine Lore, Information Gathering, Research, Scribe 2, Serene Contemplation, Sewing 2]",
                description:
                "Gentlefolk (ladies in waiting, gentlemen of leisure and so on), are those who are well off enough to not have to work for a living, and so choose not to. Usually they are the children of knights, but not knights themselves, having chosen not to pursue the path of battle. Sometimes, they are those who have made a small fortune in the past, and are now taking advantage of that wealth. Some are pure charlatans, who use their bearing, glib conversation and clothing to make themselves welcome in the castles and feast halls of others.")
            .WithOccupation(OccupationType.Basic, "Gravedigger",
                "Engineering, Income 5, Occupational Spells (page 126), Production (1 Death Component), Slayer (Undead), Weapon Specialization (Tool), Woodworking 2",
                description:
                "In a time where death can come at any moment, due to plague, famine, or violence, gravediggers have the solemn duty of burying the deceased. Due to their proximity to the dead, each gravedigger has their own unique methods of avoiding sickness or curse. Traditionally, a gravedigger wears dark colors, black in most cases, out of respect for the dead. Grave digging is a very lucrative profession ever since the plagues came to Europa. Few dare to handle the bodies of the dead for fear of affliction, so those brave enough to dispose of them are well compensated.")
            .WithOccupation(OccupationType.Basic, "Herbalist", "Apothecary 4, Cure Affliction, Mage Lore, Woodwise",
                description:
                "Herbalists are the chemists of these blighted ages and play an important role in healing those who are afflicted by ailments. Their ability to brew and identify many powerful potions and poisons makes them a source of knowledge.")
            .WithOccupation(OccupationType.Basic, "Herder",
                "Pathfinding, Production (2 Cloth, 6 Food), Wear Armor 1, Woodwise",
                description:
                "The staple of all communities are the herdsmen and women. They provide fresh meat and cloth for their fellows by nurturing a hearty flock. The creatures herded by these individuals vary considerably- while most herd sheep, goats or pigs, others herd more unique animals.")
            .WithOccupation(OccupationType.Basic, "Hermit", "Apothecary 2, Cure Affliction, Divine Lore, Scribe 2",
                description:
                "There are many strange people who live in the woods, and little is known of why they seek solitude. Perhaps, within nature, they are able to hone their fine skills in brewing, or perhaps they seek the rarest elements, herbs and plants. In any case, a hermit can be a very valuable companion when coerced out of their solitude. They tend to have communion with the gods, and can cure diseases that barber surgeons seldom are aware of.")
            .WithOccupation(OccupationType.Basic, "Hunter",
                "Butcher, Pathfinding, Production (2 Food), Weapon Specialization (Bow, Normal Crossbow), Wear Armor 1, Woodwise",
                description:
                "In the thick woods it is hard to find a suitable place for farmland, and so, hunting is a primary form of food gathering. Hunters are hearty individuals who know how to take care of themselves. One never knows whether the hunt will lead to a more or less harmless deer, or a ferocious wild cat.")
            .WithOccupation(OccupationType.Basic, "Laborer",
                "Duty 2 (Manual Labor), Engineering, Income 5, Toughness, Weapon Use (Two Handed Axe or Two Handed Blunt), Weapon Use (Tool), Work Rhythm",
                description:
                "For many people, daily life is one of toil and back breaking tedium. Nevertheless, fields must have drainage, roads must be leveled, walls built and repaired, and so on. These tasks can only be solved by application of manual labor, and it is the Laborer who performs such duties.")
            .WithOccupation(OccupationType.Basic, "Lackey",
                "Buy/Sell 10, Commerce, Livery (your master's colors), Quick Learner, News & Rumors, 1:[Serene Contemplation or Unarmed Combat]",
                description:
                "A lackey is a servant, indispensable when skilled and knowledgeable, bumbling and in the way when not. Many lackeys eventually become sergeants-at-arms, stewards, or valets for their superiors.")
            .WithOccupation(OccupationType.Basic, "Lay Cleric",
                "Divine Lore, Divine Spells, Income 5, Religious Ceremony, Serene Contemplation, Wear Armor 3, 1:[Warcaster, Weapon Specialization (One Handed Blunt), Weapon Specialization (One Handed Sword), Weapon Specialization (Two Handed Blunt), Weapon Specialization (Two Handed Sword)]",
                description:
                "Messengers of the gods, these individuals are often leading members of communities. They are battle ready to serve their god, and are capable of harnessing powers that allow them to cast spells while wearing armor. They give fiery and thoughtful sermons, while reminding everyone of the true enemies: Chaos and Undeath.")
            .WithOccupation(OccupationType.Basic, "Locksmith",
                "Engineering, Income 5, Set Trap, Weapon Use (Staff), Woodworking 4",
                description:
                "With civilization comes profit, and with profit comes thieves. Locksmiths are usually tasked to open locks other people have set, but the slowly growing populace of middle class folk in Europa calls on knowledgeable folk able to help safeguard wealth.")
            .WithOccupation(OccupationType.Basic, "Novice Monk",
                "Divine Lore, Livery (robe or habit), Research, Scribe 2, Serene Contemplation",
                description:
                "Monks are among the wisest and most learned of people in Europa. Somber and determined, they serve the Church and their neighbors. They tend to dress in dull tones and have an aptitude for book learning, a very rare thing in a society with few who can read well.")
            .WithOccupation(OccupationType.Basic, "Peddler",
                "Buy/Sell (50), Commerce, Income 10, News & Rumors, Pathfinding",
                description:
                "Most merchants don’t begin with a store of their own, they need to build up connections and develop a reputation. To do this, they travel near and far, buying and selling what merchandise they can easily transport.")
            .WithOccupation(OccupationType.Basic, "Penitent",
                "Battle Rage, Blessed, Divine Lore, Livery (icons of faith), Weapon Specialization (Flail), Weapon Use (Flail)",
                description:
                "Penitents are the fanatics of the Church, usually former sinners, but sometimes merely those who are willing to accept great pain on behalf of those who sin and do not recant. They are often travelers, spreading their faith. Some turn to self-flagellation, whereas others try to embrace higher degrees of reason in order to spread their faith. Others still are rather quiet and keep to themselves, completing their spiritual journey alone.")
            .WithOccupation(OccupationType.Basic, "Ragpicker",
                "Duty 2 (Clean up trash), Production (any one Material), Scavenging, Weapon Specialization (Tool), 1:[Toughness or Weapon Use (Polearm)]",
                description:
                "Somewhat higher than beggars in the hierarchy of civilization’s castoffs, ragpickers exist in every town of any real size. They carry trash from houses to the midden, peddle what things can be repaired, muck stables, and help the ratcatchers and guardsmen fight against such goblins and rats who frequent dumps.")
            .WithOccupation(OccupationType.Basic, "Ratcatcher",
                "Engineering, Livery (rats or rat symbols), Occupational Spells (page 126), Poisoner 2, Set Trap, Slayer (Vermin)",
                description:
                "In the realms of Mystwood, rat catching is serious business. Not only do rats and similar vermin spread disease and devour vital food supplies, but when touched by Chaos they can grow to enormous size and devour livestock, pets and children. At times, great hordes of rats sweep across the land, overwhelming villages, leaving only well gnawed bones behind. The common folk hate and fear rats, and the ratcatcher is thus a figure of both admiration and dread.")
            .WithOccupation(OccupationType.Basic, "Squire",
                "Income 10, Wear Armor 4, 1:[Armstraining 4 or Metalworking 2]",
                description:
                "In Europa, becoming a knight is often the best way for a free commoner to escape the lower classes and become important and famous. Choosing the path of the squire is one of the best ways to begin the journey to knighthood.")
            .WithOccupation(OccupationType.Basic, "Street Vendor",
                "Buy/Sell 10, Cooking 2, News & Rumors, Scavenging, 1:[Metalworking 2, Sewing 2, Woodworking 2]",
                description:
                "Every village market has vendors selling food and trinkets. Street vendors are often considered a lesser sort of merchant than even a tinker or peddler, but their unique mix of wares can be valuable.")
            .WithOccupation(OccupationType.Basic, "Tailor/Leatherworker",
                "Duty 1 (mending and patching), Medicine, Sewing 4",
                description:
                "Fine cloth is often in short supply in the darker parts of the kingdom, but many there are in need of leather working and animal hides are easy to find. Talents in stitching can sometimes aid in tending battle wounds as well.")
            .WithOccupation(OccupationType.Basic, "Tavern Keeper",
                "Cooking 2, Drinks on the House, Duty 1 (minding the tavern), Income 10, Information Gathering, News & Rumors, Sell Drinks",
                description:
                "In the year 930, some 40 years ago, a vile Chaos cult nearly brought down the barony of Wickshire in Navarre by distributing tainted wine at a series of festivals. Many died as the vile spirits took effect. Since that time, brewing of any sort has been a closely guarded noble monopoly, carried out by licensed brewers. Taverns, however, need staff to sell such wares, and many a village exists only because it is in a convenient location to stop, spend the night, and have a drink.")
            .WithOccupation(OccupationType.Basic, "Tinker",
                "Armor Repair, Buy/Sell (30), Commerce, News & Rumors, Scavenging, Tinkering",
                description:
                "The tinker is a wanderer, repairing pots and sharpening knives, trading old clothes and scrap, and generally keeping poor villages which never see a true merchant alive. Much lore and myth has evolved about the tinker, and in many lands to harm one is extremely bad luck.")
            .WithOccupation(OccupationType.Basic, "Town Crier",
                "Bardic Voice 2, Duty 1 (shout proclamations you have been hired to, or seditious blather), Income 10, Information Gathering, News & Rumors, Unarmed Combat",
                description:
                "Sometimes a loud mouth is just another loud mouth, getting into brawls at the tavern, spreading nasty rumors, and inciting riots… Other times a person with a good, booming voice is an upstanding member of the community, shouting news, gathering people for meetings, and helping to sell a merchant's stock. It’s up to you which one you’ll be.")
            .WithOccupation(OccupationType.Basic, "Town Guard",
                "Duty 1 (inspection by a Corporal or Captain of the Guard), Income 5, Livery (based on local Chapter), Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 3",
                description:
                "Most towns and villages boast a small contingent of paid guards who patrol trails, guard gates, make sure that laws are observed, and generally assist the local magistrate or lord with ready weapons.")
            .WithOccupation(OccupationType.Basic, "Woodsfolk",
                "Duty 1 (gathering firewood), Weapon Specialization (One Handed Axe, Two Handed Axe), Wear Armor 1, Woodworking 4, Woodwise",
                description:
                "Trees all around, yet wood is still scarce. All living trees are property of nobility, and cannot be cut without a special writ. This makes the job of a woodswoman challenging at times. Nevertheless, good carpentry skills are essential to the survival of any outpost- the walls of buildings and keeps are always in need of repair.")
            .WithOccupation(OccupationType.Youth, "Adventurer (Youth)",
                "Agility, Scavenging, Serene Contemplation, Wear Armor 2",
                description:
                "Many travelers, especially children, have no real training, only seeking a new start where they can make money and set up social ties.")
            .WithOccupation(OccupationType.Youth, "Apprentice (Youth)",
                "Agility, Apprenticeship, Duty 1 (assist master), Production X (any 1 Material or Component), Serene Contemplation",
                description:
                "For as long as any can remember, apprenticeship has been the normal way to learn a craft. The skills of an apprentice are very helpful to a master, and therefore this Occupation is in high demand. The pay is not always great, but the perks are useful. Relationships formed as an apprentice can last the rest of your life. In some cases, it might be worth offering your services for free until a wealthier patron comes along to employ you.")
            .WithOccupation(OccupationType.Youth, "Bard/Minstrel/Thespian (Youth)",
                "Bardic Voice 4, Entertainer, News & Rumors",
                description:
                "Jugglers, dancers, minstrels, thespians, even puppeteers, these are the superstars of the Known world. Their performances are often the high points of folk’s existence, especially in times of trouble.")
            .WithOccupation(OccupationType.Youth, "Beggar (Youth)",
                "Agility, Begging, Livery (rags and patches), Scavenging, 1:[Information Gathering or Weapon Use (Staff)]",
                description:
                "War, famine, plague, and a host of other ills best Europa, and many who lose their homes and livelihoods become beggars, forced to seek bread and coin from generous folk. Such downtrodden often find themselves in rural villages, searching for new lives. Of course, some beggars are false- little better than brigand- and so beggars often have bad reputations.")
            .WithOccupation(OccupationType.Youth, "Dancer/Juggler/Acrobat (Youth)",
                "Agility, Entertainer, Livery (performance costume), News & Rumors, Weapon Specialization (Thrown Weapon)",
                description:
                "Often dressed in colorful and unique attire, dancers, jugglers, and acrobats are popular among commoners. They perform a service desired by all- quality entertainment. They are often agile, and at times their performance skills will benefit them in a fight.")
            .WithOccupation(OccupationType.Youth, "Guttersnipe (Youth)",
                "Agility, Duty 1 (assist master), Evade Trap, Production (1 Death), Scavenging",
                description:
                "There are many people whose jobs are somewhat less than pleasant. Gravediggers, Ragpickers, Ratcatchers and more take apprentices just as any others do, but what is expected of them is entirely different.")
            .WithOccupation(OccupationType.Youth, "Initiate (Youth)",
                "Divine Lore, Livery (robes or other religious symbols), Quick Learner, Serene Contemplation",
                description:
                "Those who join the church as youths, intending to become monks or priests, begin as initiates. Many are orphans, or the younger children of peasants who may not be able to afford to educate or even feed these additional mouths.")
            .WithOccupation(OccupationType.Youth, "Lackey (Youth)",
                "Buy/Sell 10, Commerce, Livery (your master's colors), Quick Learner, News & Rumors, 1:[Serene Contemplation or Unarmed Combat]",
                description:
                "A lackey is a servant, indispensable when skilled and knowledgeable, bumbling and in the way when not. Many lackeys eventually become sergeants-at-arms, stewards, or valets for their superiors.")
            .WithOccupation(OccupationType.Youth, "Page (Youth)",
                "Agility, Income 5, Livery (your patron’s colors), Quick Learner, Wear Armor 2",
                description:
                "Amongst gentlefolk and the children of knights, youths are often sent to learn the arts of war. foster with other families. Often these pages, as they are called, are training to one day become squires.")
            .WithOccupation(OccupationType.Youth, "Student (Youth)",
                "Copyist, Production (1 Parchment), Quick Learner, Serene Contemplation",
                description:
                "Many young people seek an education from the learned people of Europa, and become “full time” students. Such youths often become monks, litigants, scribes and philosophers in later life.")
            .WithOccupation(OccupationType.Youth, "Town Guard Recruit (Youth)",
                "Duty 1 (inspection by Corporal or Captain of the Guard), Income 5, Livery (green and black Town Guard tabard), Wear Armor 2",
                description:
                "Most towns and villages boast a small contingent of paid guards who patrol trails, guard gates, make sure that laws are observed, and generally assist the local magistrate or lord with ready weapons. In dangerous places, young people are often recruited by the Guard, and nearly brought up by them.")
            .WithOccupation(OccupationType.Youth, "Ward (Youth)", "Bestow Favor, Income 10, Quick Learner, Scavenging",
                description:
                "The children of knights, nobles, and priests are often entrusted to others for protection, especially during times of war when children might be exchanged as hostages. Often these children come to respect their tutors and guardians even more than their true parents after long years away from home.")
            .WithOccupation(OccupationType.Advanced, "Absolver/Flagellant",
                "Absolution, Battle Rage, Blessed, Divine Lore, Improved Battle Rage, Iron Will, Livery (icons of faith), Toughness, Weapon Specialization (Flail), Weapon Use (Flail)",
                requirements:
                "Must have previously been a Friar, Knight Penitent, Lay Cleric, or Penitent for at least a year, and be accepted to a cult of flagellants. Must renounce all worldly possessions, save for clothing and a hand weapon.",
                description:
                "The sins of the world are immense. Amongst the penitent, there are a few who seek to atone for all of humanity through their extreme devotion. These folk are the Absolvers. Often, priests and other holy folk come to them for advice on proper penance- though absolvers tend to err on the side of harsh stringency.")
            .WithOccupation(OccupationType.Advanced, "Almoner",
                "Begging, Blessed, Buy/Sell 20, Cooking 2, Divine Lore, Duty 1 (distribute money to the needy), Income 10",
                requirements:
                "Must be either a Beggar or Lay Cleric for one year and accepted into the household/church of an Ordained Priest.",
                description:
                "It is true that many in Europa do not have the means to support themselves. In larger towns and cities, begging is rampant, and the downtrodden poor go hungry and unclothed. The Church, taking pity on these poor souls, hires almoners to both collect and distribute funds, food, and materials to the less fortunate. Often former beggars themselves, almoners take their role very seriously.")
            .WithOccupation(OccupationType.Advanced, "Artist (Author/Gilder/Painter/Sculptor)",
                "Artistry, Income 10, Serene Contemplation, 1:[Metalworking 4, Scribe 4, Sewing 4, Woodworking 4], 1:[Commerce, Divine Lore, Engineering, Mage Lore, Woodwise]",
                requirements:
                "Patronage. Must be approved by the Staff, based on art created in game prior to taking the Artist occupation.",
                description:
                "Artists- true artists- are able to move people to emotions with merely a brush stroke, carved line, or well-placed word. The artists of Mystwood create jewelry, tapestries, paintings, fine carvings, engravings, songs, books and the like in order to enrich the lives and coffers of the folk around them. Where guild crafters and master thespians do these things for their living, and to make a wage, Artists do things for the sheer joy of creation, to bring praise to the gods, or to celebrate the world.")
            .WithOccupation(OccupationType.Advanced, "Astrologer",
                "Fortune Telling, Divine Lore, Information Gathering, Mage Lore, Production (1 Time), Research, Scribe 2, Serene Contemplation",
                requirements:
                "You must possess Fortune Telling, either purchased or from an Occupation. Further, you must spend 200 crown for suitable books and strange tools.",
                description:
                "The practice of stargazing for purposes of fortune telling is ancient, said to have passed to man from drowned Atlantis. While more humble means of fortune tellingcards, runes, and the like- rule divinatory tradition, there are still soothsayers who gaze upon the constellations to seek meaning.")
            .WithOccupation(OccupationType.Advanced, "Beekeeper",
                "Apothecary 2, Income 10, Livery (beekeeping garb with mask), Occupational Spells (page 125), Production (4 Food, 4 Life), Serene Contemplation, Swarm Magic, Wear Armor 1, Woodwise",
                requirements: "200 Crown, or 150 crown and possession of a Queen Bee.",
                description:
                "Honey, wax, comb, and even bee poison all have their uses, and so the occupation of Beekeeper is not an uncommon one where climate allows. Often, beekeepers are monks, whose dwelling cells are a mirror of the hives themselves. Others are hermits, content to dwell in the wilds quietly with their hives, protected from harm by the stinging swarms who are their neighbors and children.")
            .WithOccupation(OccupationType.Advanced, "Corporal of the Guard",
                "Armstraining 2, Duty 2 (inspecting the Guard), Income 10, Leadership (Town Guard), Livery (based on local Chapter), Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 4",
                requirements:
                "Must be appointed to the post by the Captain of the Guard or a similar person after one year or more of service to the Guard as a Town Guard, Town Guard Recruit, or Gaoler.",
                description:
                "Any village of size requires hierarchy in their guardsmen, as a Captain of the Guard can’t be everywhere. Corporals lead groups of the regular guard, instruct recruits, make decisions based on questions of the Code Civitas, and otherwise ensure that the work of the Guard continues smoothly.")
            .WithOccupation(OccupationType.Advanced, "Crofter",
                "News & Rumors, Production (2 Cloth, 4 Food, 4 Wood), Weapon Specialization (Tool), Work Rhythm, Woodworking 2",
                requirements:
                "You must obtain a grant of a forested tract, either by purchase, rent, or reward for deeds, and clear a portion. Alternately, you may be a Laborer and spend 100 crown to build a small cottage and clear fields.",
                description:
                "As the borders of the Mystwood become settled, and small villages spring up between the trees, the crofters lead the settling effort. It is hard and unpleasant work, with little reward- cutting tracks, building mean houses, and eking food and profit from the forest soil. Nevertheless, folk do it, and it is far cheaper than establishing a true freehold.")
            .WithOccupation(OccupationType.Advanced, "Demagogue",
                "Armstraining 4, Bardic Voice 4, Income 10, Information Gathering, Leadership (those who have joined your cause), News & Rumors, Unarmed Combat",
                requirements:
                "Have a cause approved by the Game Masters and gain at least six followers who have sworn themselves to this cause.",
                description:
                "Not all nobles are worthy of the service of commoners. Not all Knights are chivalrous, all churchmen holy, all magistrates fair. Against these rise the demagogues, charismatic folk heroes whose goal is to oppose authority. Usually this is the selfsame corrupt authorities, but not always- many demagogues have opposed legitimate rule, with usually bloody outcomes.")
            .WithOccupation(OccupationType.Advanced, "Dragon Slayer",
                "Battle Rage, Livery (Fantastical costume, hair and tattoos), Scavenging, Slayer (Beastman, Draconian, Goblin, Minotaur, and Troll), Wear Armor 3",
                requirements: "Must slay at least 3 Draconians, Minotaurs, or Trolls.",
                description:
                "While there is but one Dragon, there are countless monsters who run rampant throughout Europa. Those who have made a habit of slaying the most powerful of these beings become Dragon Slayers, and find themselves in high demand by small villages and those who want exotic bodyguards. Market yourself well and you should be able to find employment with wealthier members of society. You may also be well suited for high paying pit fights or dangerous quests.")
            .WithOccupation(OccupationType.Advanced, "Executioner",
                "Entertainer, Execution, Income 10, Livery (black hood), Occupational Spells (page 125), Poisoner 4, Weapon Specialization (One Handed Axe, One Handed Sword, Two Handed Axe, Two Handed Sword)",
                requirements: "Training (100 crown) A writ of appointment from a landed noble.",
                description:
                "The majority of high crimes in Europa end in death- it is costly to house a criminal in a prison for too long, and the spectacle of a public execution is both entertainment and object lesson for the unwashed masses. An executioner, then, is as much a public servant as an entertainer.")
            .WithOccupation(OccupationType.Advanced, "Famulus",
                "Armstraining 2, Iron Will, Livery (your master's symbol), Mage Lore, Slayer (Daemons), Weapon Specialization (any one Weapon Type), Warcaster",
                requirements:
                "Must be linked in a protracted ceremony to a character of great magical power, such as a character with Passion 7+, Wisdom 7+, or as approved by the Staff.",
                description:
                "In Roman times, every sorcerer or summoner of repute had a famulus, a person bound to them as bodyguard and servant. As time passed, the role of the famulus has progressed, and now they are expected both to protect their magus, and correct their magical mistakes, if need be.")
            .WithOccupation(OccupationType.Advanced, "Fence/Pawnbroker",
                "Buy/Sell (50), Commerce, Fence, Income 10, News & Rumors, Retainers 1, 1:[Information Gathering or Research]",
                requirements:
                "Must be active in the Shadow Guild for at least a year, and spend 100 crown establishing a network of contacts and traders.",
                description:
                "The tradition of the pawnbroker is alive and well, especially in the larger cities. Many people, though, find that sometimes there is a need for goods to quietly disappear. The fence also discretely finds information for their patrons- the right rumor can make a fence's career very lucrative- or end it abruptly.")
            .WithOccupation(OccupationType.Advanced, "Forester/Ranger/Gamekeeper",
                "Pathfinding, Production (8 Wood), Weapon Specialization (One Handed Axe, Two Handed Axe), Wear Armor 2, Woodwise, Woodworking 4",
                requirements:
                "Must be given a writ by a noble to protect an area of a forest and oversee tree felling.",
                description:
                "The Forests of Europa are lucrative resources, most owned by nobles for their pleasure. The beasts of the wood, the trees, the water, and the minerals are all owned by the nobility, who are often far away and unable or unwilling to defend their rights. Thus, most localities have a forester, someone who patrols the wood and ensures that the trees and game are free from poaching and theft.")
            .WithOccupation(OccupationType.Advanced, "Freeholder",
                "Butcher, Patronage 1, Production (4 Cloth, 12 Food, 2 Wood), Weapon Use (Flail), Woodwise, Woodworking 2",
                requirements:
                "You must obtain a grant of land either by purchase, rent, or reward for deeds. Alternately, you may be a Herder and spend 200 crown to expand your herd.",
                description:
                "The wealthiest and most successful farmers and herdsfolk are able to set up their own freehold, an independent farm in the form of the latifundia of long ago. Such freeholders have great political power, as they are a major source of food and job opportunities for their friends and neighbors.")
            .WithOccupation(OccupationType.Advanced, "Gaoler",
                "Duty 1 (inspecting prisoners and upkeeping cells), Income 10, Livery (Town Guard), Occupational Spells (page 125), Set Trap, Weapon Specialization (One Handed Blunt, Two Handed Blunt), Warcaster, Wear Armor 3",
                requirements: "Must be appointed to the post by Captain of the Guard.",
                description:
                "The jail keeper is not the most respected member of the Town Guard, but their role can be critical. Most crimes do not require extensive jail time, so the gaoler might be called on to administer certain other punishments.")
            .WithOccupation(OccupationType.Advanced, "Herald",
                "Armstraining 2, Bardic Voice 4, Income 10, Information Gathering, Livery (Herald’s garb), Occupational Spells (page 126), Scribe 2",
                requirements: "Training (100 crown) and you must pass the examination of the College of Heralds.",
                description:
                "It is the College of Heralds that ratifies all new knights, and helps them work out a unique heraldic device- the symbolic colors and imagery which show all the world the Knight’s honor and virtue. The College of Heralds is also often called upon to mediate disputes between knights and lords, or to advise the gentry and nobility in matters of etiquette and protocol.")
            .WithOccupation(OccupationType.Advanced, "Juror",
                "Bardic Voice 2, Research, Scribe 2, Serene Contemplation and any two of Commerce, Detect Health, Divine Lore, Engineering, Iron Will, Mage Lore, News & Rumors, or Woodwise",
                requirements:
                "Must have been selected as a juror in a trial, successfully spoken on behalf of the accused and written a treatise on local law, or Patronage.",
                description:
                "Magistrates and nobles are often busy people. In many major cities, the selection of jurors has devolved to an educated elite of folk, somewhat knowledgeable in the laws, or at least valued for their wisdom. These semiprofessional Jurors combine legal experience with detective work, sticking their noses in where they are not always wanted.")
            .WithOccupation(OccupationType.Advanced, "Knight Errant",
                "Armstraining 4, Income 10, Leadership (any non-Knight sworn to aid you), Livery (Your heraldry), Retainers 1, Wear Armor 6",
                requirements: "Requirement: You must be Knighted.",
                description:
                "Those who have comported themselves with honor and impressed the right people are knighted by an existing knight or a noble. Landless wanderers, knights errant may carry their own heraldry, create their own retinues, and work toward further impressing the right people and being granted a manor or joining an order of knighthood.")
            .WithOccupation(OccupationType.Advanced, "Librarian",
                "Copyist, Research x2, Scribe 4, Serene Contemplation",
                requirements:
                "Patronage, must be appointed to be caretaker of a collection of at least ten books and/or scrolls.",
                description:
                "Books are rare and valuable, and wherever there is a collection of them, there should be a librarian to protect, repair, and make copies of them. Some libraries are associated with the Church, while others are the private property of the wealthy.")
            .WithOccupation(OccupationType.Advanced, "Litigant",
                "Bardic Voice 2, Battle Rage, Duelist, Livery (red surcoat) Toughness, Unarmed Combat",
                requirements:
                "You must accuse a person of a crime on behalf of another, and then win an ensuing Judicial Combat.",
                description:
                "Once this has occurred three times, you may invest 50 crown on training and equipment and take this profession. There are many occasions where a person has been wronged, but due to fear, inability to fight, or social standing, they are unable to make an accusation on their own. In some nations (notably, Navarre) there exists a profession of litigants, who, for pay, take up the role of accuser. Traditionally, litigants wear a red surcoat called the sendal, and are famed for being rough characters, their accusations and arguments more loud than learned.")
            .WithOccupation(OccupationType.Advanced, "Master Thespian",
                "Bardic Voice 6, Master Entertainer, Income 10, News & Rumors, Scribe 2 and Information Gathering or Research",
                requirements: "Patronage, must have had the Entertainer skill in previous Occupation.",
                description:
                "Successful bards, minsters, dancers and other entertainers seek out a patron, a noble or other wealthy or connected individual who can finance their careers and help them find venues for their trade. Such master thespians are welcome guests in any noble retinue or village celebration.")
            .WithOccupation(OccupationType.Advanced, "Merchant",
                "Buy/Sell (100), Commerce, Income 20, News & Rumors, Patronage 1, Retainers 2 and choice of any one Craft 2 skill",
                requirements:
                "You must spend 300 crown to set yourself up in business. If you maintain an in game “shop” or stall this is reduced by 50 crown, and if you are member of the Shadow Guild by another 50 crown.",
                description:
                "Nowhere in Europa is truly self-sufficient. Crafters must obtain raw materials and then sell their completed wares elsewhere. Where materials are commonplace, the market sells, and where they are scarce, the market buys. The merchant is the blood of this system, buying and selling goods with a shrewd eye, while making themselves wealthy and expanding their households.")
            .WithOccupation(OccupationType.Advanced, "Miller",
                "Income 20, News & Rumors, Production (8 Food), 1[Production (4 Air), Production (4 Water), Production (3 Life)], Woodworking 4",
                requirements:
                "A grant of land and the necessary supplies to build a mill, or 300 crown to purchase land on which to build a mill.",
                description:
                "In nearly every village, there is a mill, whether it be a windmill, watermill, or turned by animals. Within this mill is the millstone. This nearly-magical device grinds the grain that makes the bread that feeds lord and peasant alike. The miller gets a share of this grain, which often suffices to keep their lives comfortable, and magical power, from the ever-turning ritual of the grinding gears.")
            .WithOccupation(OccupationType.Advanced, "Miner",
                "Commerce, Engineering, Metalworking 2, Patronage 1, Production (8 Metal), Weapon Specialization (Tool), Wear Armor 3, Woodworking 2",
                requirements: "You must find a mine and spend 100 crown to develop it and obtain writs.",
                description:
                "Most mines in Europa are ancient works, pulling copper, gold, salt and many other materials from the earth. It is a dangerous trade, though lucrative.")
            .WithOccupation(OccupationType.Advanced, "Philosopher",
                "Loremaster, Production (2 Parchment), Research x2, Scribe 6, Serene Contemplation",
                requirements: "Patronage and 100 crown for books and education.",
                description:
                "The richest and most successful households are able to sponsor a philosopher, able to read and research the ancient texts and make new, educative observations of the natural world. Many philosophers have attended one of the great universities of Europa, such as Hectoria or Milan, and bring new ideas to their homelands upon their return.")
            .WithOccupation(OccupationType.Advanced, "Physician",
                "Apothecary 6, Cure Affliction, Livery (doctor’s robes), Medicine, Occupational Spells (page 126), Research, Serene Contemplation",
                requirements: "Patronage and 500 crown in training.",
                description:
                "The great universities of Europa have learned much of anatomy and physiology from the ancients, from experiment, and from necessity. At these vaunted houses of learning, the gentlefolk, herbalist, and barber surgeon are elevated to true masters of the craft of healing, capable of great feats of surgery and of furthering the understanding of the humors.")
            .WithOccupation(OccupationType.Advanced, "Pit Fighter/Judicial Champion",
                "Armstraining 4, Battle Rage, Duelist, Entertainer, Unarmed Combat, Wear Armor 3",
                requirements:
                "You must win at least 5 pit-fights (which are illegal) or 3 Judicial Combats and invest 50 crown in training and equipment.",
                description:
                "Pit fighting is illegal in many lands, but nevertheless it is a popular entertainment. On the flip side, trial by combat is common, but many people cannot fight to literally save their lives. Enter the pit fighter, or judicial champion, two sides of the sport-fighting coin. Market yourself well, and you should be able to earn a decent bit of coin through your duels and pit-fights.")
            .WithOccupation(OccupationType.Advanced, "Poacher",
                "Butcher, Pathfinding, Production (3 Cloth, 6 Food), Weapon Specialization (Bow, Normal Crossbow), Wear Armor 2, Woodwise",
                requirements: "You must be accepted into the Shadow Guild.",
                description:
                "Meat is an important source of food in often hungry Europa. However, the nobility own all the deer, all the bear, all the boar- the best meat. Regardless, there is a lucrative trade in less than legally acquired meat. This is where the poacher comes in. Quietly, they stalk illegal or merely dangerous prey to share with her fellows- or to make a profit.")
            .WithOccupation(OccupationType.Advanced, "Quarrier",
                "Duty 1 (Manual Labor), Engineering, Production (4 Earth), Toughness, Weapon Use (Two Handed Blunt), Wear Armor 1, Work Rhythm",
                requirements: "You must find a quarry and spend 100 crown to develop it and obtain writs.",
                description:
                "Mines produce the metal so critical to weapons and armor. The humble quarry, on the other hand, produces the stone which paves roads, builds houses, and fortifies castles. Productive quarry sites are rare, so what stone can be found is highly prized. Along the way, they often find magical components which can easily be traded for a fine income.")
            .WithOccupation(OccupationType.Advanced, "Ruffian",
                "Brawler, Scavenging, Toughness, Unarmed Combat, Weapon Specialization (One Handed Blunt), Wear Armor 2",
                requirements: "You must possess a Branding, and be a member of the Shadow Guild.",
                description:
                "Thugs, toughs, bravos, and brigands, ruffians are the strong spine of organized crime. Obviously intimidating and ready to fight at a moment’s notice, ruffians often have little of true value to offer society other than their fists and cudgels.")
            .WithOccupation(OccupationType.Advanced, "Sacristan",
                "Blessed, Divine Lore, Research, Scribe 2, Set Trap, Weapon Specialization (any one), Wear Armor 2, Woodworking 2",
                requirements:
                "Village must possess at least 5 relics, which are keep within a single area or safe container, and the sacristan must be elected or appointed to protect them.",
                description:
                "Villages that hold many holy relics may find that they require a dedicated guardian and researcher of those items. A sacristan also knows how to protect their charges.")
            .WithOccupation(OccupationType.Advanced, "Sawbones",
                "Apothecary 4, Cure Affliction, Livery (Apron and gloves), Medicine, Sewing 2, Weapon Specialization (Dagger)",
                requirements:
                "You must be a member of the Shadow Guild and provide 200 crown for training. If you are branded, this is reduced to 100 crown. If you previously possessed the Physician Occupation, you may waive the crown fee entirely.",
                description:
                "There are many professional barbers and doctors in the cities and towns of Europa, who heal and perform surgery on the honest population. Criminals, however, need to be fixed up quietly with few questions asked. Sawbones perform this service, and know bits of knifework that are, strictly speaking, not medicinal.")
            .WithOccupation(OccupationType.Advanced, "Sergeant at Arms/Bodyguard",
                "Armstraining 6, Income 10, Leadership (retainers and followers of your patron), Livery (patron’s colors), Wear Armor 4",
                requirements: "Patronage",
                description:
                "Nobles, magistrates, merchants, and the wealthy often find themselves the targets of violence. These folk must hire themselves guards, who can protect them when danger abounds. Whether such a person is called a bodyguard or a sergeant really depends on the style of the person being protected.")
            .WithOccupation(OccupationType.Advanced, "Sharp",
                "Bardic Voice 2, Commerce, Cosmopolitan Connections, Fortune Telling, Information Gathering, Iron Will, News & Rumors, Room for More, Unarmed Combat.",
                requirements:
                "Must win 100 crown in a single game of gambling, or 500 over a career. Subtract 100 from career winnings if a member of the Shadow Guild.",
                description:
                "Professional gamblers are a scourge in the major cities. While most gamble for entertainment, or small coin, in the higher social circles magic items, writs, and even landhold can be in the ante.")
            .WithOccupation(OccupationType.Advanced, "Steward",
                "Buy/Sell (50), Cooking 6, Commerce, Leadership (retainers and followers of your patron), Scribe 2",
                requirements: "Patronage",
                description:
                "A household is only as good as it’s steward- part cook, part secretary, the steward manages the household and purchases for their noble and the retinue.")
            .WithOccupation(OccupationType.Advanced, "Theologian",
                "Bardic Voice 2, Divine Lore, Divine Spells, Research x2, Scribe 4, Serene Contemplation",
                requirements:
                "Must be ordained by the Church, and create a scholarly or philosophical tract on the nature of each of the three gods.",
                description:
                "Theologians are those members of the Church who study the lives of the Saints and the natural world in order to find answers regarding the plans of the gods.")
            .WithOccupation(OccupationType.Advanced, "Varlet",
                "Duty 2 (fulfilling the requests of your master), Income 5, Information Gathering, Leadership (your master), Unarmed Combat and any one Craft skill 2",
                requirements:
                "50 crown for the purchases of necessary uniform and training. Must be actively employed by another character, PC or NPC, and willing to serve them in various in-game tasks.",
                description:
                "A varlet is a type of manservant whose primary task is to attend to their master's every whim, however foolish. Of course, varlet has come to be slang for a dishonest man, and many varlets have found their master's tongue getting them into the fistfights they are famous for.")
            .WithOccupation(OccupationType.Plot, "Cantor",
                "Absolution, Bardic Voice 4, Divine Lore, Divine Spells, Entertainer, Grant Karma, News & Rumors, Religious Ceremony, Serene Contemplation",
                requirements: "Must have been a bard, friar, lay cleric, or ordained priest in a previous Occupation.",
                description:
                "In larger, better organized churches, there are often songs and chants of prayer. The cantor is the priest who leads such prayers. In times of battle, they double as signallers and messengers.")
            .WithOccupation(OccupationType.Plot, "Captain of the Guard",
                "Duty 1 (reviewing the guard), Income 15, Improved Leadership (Town Guard), Livery (based on local Chapter), Patronage 1, Scribe 2, Warcaster, Weapon Specialization (any one Weapon Type), Weapon Use (Large Shield), Wear Armor 5",
                requirements: "Must be appointed to the post.",
                description:
                "All guards, corporals, and gaolers in a town ultimately report to a Captain, appointed by a magistrate, mayor, or other worthy. The captain may be a guard himself, with high morals and ability, or may equally likely be a political appointee with little skill but the right connections.")
            .WithOccupation(OccupationType.Plot, "Friar",
                "Absolution, Divine Lore, Divine Spells, Grant Karma, News & Rumors, Pathfinding, Religious Ceremony",
                requirements:
                "Must have been a Lay Cleric in a previous Occupation. Must renounce wealth and live frugally.",
                description:
                "A traveling, mendicant priest, often the only priest small villages ever see, friars wander from place to place ensuring that even the meanest serf sees a member of the Church who can hear their sins and grant them Karma.")
            .WithOccupation(OccupationType.Plot, "Inquisitor",
                "Battlemage, Divine Lore, Divine Spells, Leadership (anyone under your command in battle), Livery (icons of faith), Mage Lore, Slayer (Undead), Wear Armor 3 and Information Gathering or Research",
                requirements: "Writ from the Church to practice this Occupation, 300 crown of training and equipment.",
                description:
                "The Church has different priorities than secular lords, but still has need for warriors who are less rigid than Paladins and more able to root out and eradicate the devious foes of life and light who skulk among the populace, hiding amongst the goodly people.")
            .WithOccupation(OccupationType.Plot, "Knight Paladin",
                "Absolution, Battlemage, Blessed, Divine Lore, Divine Spells, Grant Karma, Income 10, Livery (your heraldry), Religious Ceremony, Retainers 1, Wear Armor 10",
                requirements:
                "You must be a Knight Errant, Knight Penitent, or Knight Templar, or have previously possessed one of those Occupations. Further, you must have completed a Paladin’s quest for each of the three gods or be an Ordained Priest who is Knighted.",
                description:
                "Long ago, Navarre, Burgundy, the League, and great swathes of other lands were united in the throne of Charles the Great, known also as Carolus Magnus or Charlemagne. In Charlemagne's will, he left great chapter houses, fortresses, rich mills and tracts of lands to the stewardship of his favored knights. With this wealth came the understanding that they would forever work to bring humanity together. The Knights Paladin refused to swear themselves to Charlemagne's heirs, instead swearing themselves to the ideal of the Empire- that all mankind might come together beneath the rule of Law and Justice. The Knights Paladin protect those who sit on the thrones of nations as closely as they protect those who hold the holy offices of the Church. The mystical training of the Knights Paladin, as proven most clearly in their Quests of the Three Gods, gives them the education and connection to the gods necessary for absolution, and so the Church in most lands accounts the Knights Paladin as priests, even if they do not serve the Church officially.")
            .WithOccupation(OccupationType.Plot, "Knight Penitent",
                "Battlemage, Blessed, Divine Lore, Divine Spells, Income 10, Livery (your heraldry), Retainers 1, Wear Armor 8",
                requirements:
                "You must be currently or formerly a Knight Errant, who has been accepted into the service of one branch of the Church, and renounced worldly things.",
                description:
                "After several wars with the Tripartites, many knights were disillusioned by waste and lack of honor. These knights formed a new order, the Knights Penitent, giving up the wealth and splendor associated with knighthood in exchange for the nobility of sacrifice and toil. Such knights often wander, some seeking heroic ends against great odds, others simply seeking a place in the world.")
            .WithOccupation(OccupationType.Plot, "Knight of the Realm",
                "Armstraining 4, Income (50), Improved Leadership (anyone wearing your colors), Livery (Your heraldry), Patronage 3, Retainers 6, Wear Armor 8",
                requirements:
                "You must be invited to the Knights of the Realm and be a Knight Errant, Knight Paladin, Knight Penitent, or Knight Templar, or have previously possessed one of those Occupations. Further, you must be granted a fief of land by a noble or the Church.",
                description:
                "Most of the nations of Europa have a strong body of Knights of the Realm who hold the manors, organize and lead the armies, dispense justice, and otherwise comprise a lower nobility. The vast majority of the Knights of the Realm come from the ranks of the Knights Errant, having proved themselves twice- once as prospective Knights, and once as Errants.")
            .WithOccupation(OccupationType.Plot, "Knight Templar",
                "Battlemage, Leadership (any non-Knight sworn to aid you), Income 10, Livery (your heraldry), Mage Lore, Research, Retainers 1, Scribe 4, Wear Armor 6",
                requirements:
                "You must be invited to the Knights Templar. Further, you must spend 500 crown for training and outfitting.",
                description:
                "The secretive order of the Knights Templaer are scholars, warriors, and magicians dedicated to fighting the supernatural foes of civilization wherever they can be found. Many of the Knights Templar come from nontraditional sources- not all were famous warriors or honorable squires before their knighting.")
            .WithOccupation(OccupationType.Plot, "Magistrate",
                "Bardic Voice 2, Commerce, Duty 1 (holding court), Income 20, News & Rumors, Research, Retainers 3, Scribe 4",
                requirements: "Must be appointed by a noble, or elected to the post by the populace.",
                description:
                "Most manors and villages rely on their local knight or lord for justice. When a lord is distant, or too busy with other matters, they may allow a village to elect a magistrate from amongst themselves. Magistrates are largely free to enact their own edicts and enforce law as they see fit, subject to the Codes Civitas and Justinian. Magistrates who abuse their power, though, seldom last long.")
            .WithOccupation(OccupationType.Plot, "Ordained Priest",
                "Absolution, Battlemage, Divine Lore, Divine Spells, Grant Karma, Income 10, Religious Ceremony, Serene Contemplation, Weapon Specialization (your choice of One Handed Blunt, One Handed Sword, Two Handed Blunt, or Two Handed Sword) Wear Armor 4",
                requirements: "Must be ordained by the Church.",
                description:
                "The churches, shrines, monasteries and other places of holy sanctity in Europa are overseen by priests who have been appointed to them by the Church. Often former lay clerics who have found a true calling, such priests swear to uphold the tenets of the faith and serve the followers of their god.")
            .WithOccupation(OccupationType.Plot, "Tavern Master",
                "Buy/Sell 20, Cooking 2, Drinks on the House, Duty 2 (minding the tavern), Income 10, News & Rumors, Patronage, Retainers 1, Sell Drinks, Tavern Share",
                requirements:
                "You must possess the Deed to a building suitable for the housing of a Tavern. In addition, you must have kept a tavern as the Tavern Keeper profession for at least 1 year,and possess a Writ of Hospitality.",
                description:
                "A few lucky few tavern keepers find themselves successful enough, and thereby wealthy enough, to purchase their establishment from the former landlord. Such tavern masters are often among the most wealthy members of society, and are incredibly well connected to the comings and goings of their town.")
            .WithOccupation(OccupationType.Plot, "Witch Hunter",
                "Armstraining 2, Battlemage, Leadership (anyone under your command in battle), Mage Lore, Occupational Spells (page 126), Set Trap, Slayer (Daemons), Wear Armor 4 and Information Gathering or Research",
                requirements: "Writ from a Lord to practice this occupation, 300 crown of training and equipment.",
                description:
                "In a land of sorcerers, necromancers and vampires, Witch Hunters are well respected individuals indeed, and greatly sought after. A Witch Hunter’s writ is their only shield- the more powerful the lord (or Baron or Duke, etc.) who issued it, the more valuable it is, and of course the wording of the writ itself is important.")
            .WithOccupation(OccupationType.Enhancement, "Alchemist",
                "Retain your Basic Occupation, plus add Production (one Chaos or Time)",
                requirements:
                "Must have created at least ten different potions using the rules in Special Appendix Three. 50 crown for training and equipment.",
                description:
                "Masters of the subtle arts of potion making, Alchemists assist their communities through quietly making the love philtres, healing potions, and curatives that so many others need in their day to day professions. In some towns and villages, of course, the alchemist is looked on with suspicion, especially if they work with dangerous ingredients such as cinnabar or aqua regia.")
            .WithOccupation(OccupationType.Enhancement, "Barback",
                "Retain your Basic Occupation, plus add Income 5 and Sell Drinks",
                requirements:
                "Must possess or have previously possessed Brewer, Tavern Keeper, or a similar Occupation that worked in or around a tavern.",
                description:
                "There are always times when the local tavernkeep is too busy for the demand- perhaps a party is going on, or the official tavern master is bleeding in a ditch somewhere, or there are simply too many thirsty souls. Barbacks can pick up the slack while these professionals are too busy.")
            .WithOccupation(OccupationType.Enhancement, "Guild Crafter",
                "Guild Wages, Livery (guild patch and visible tools of the trade). Retain your Basic Occupation, plus add +2 Craft Points to any one Craft Skill you possess.",
                requirements:
                "You must submit an example of your skill, or present a tract or presentation on it, which must be approved by the guild. This Occupational Enhancement can only be appended to a basic Occupation, though a person with an advanced Occupation may still be a Guild Member.",
                description:
                "The cities and towns of Europa expect the craftspeople who dwell there to join a guild, to control prices and ensure that all are able to prosper by gaining business. Guilds also provide a sense of fellowship amongst crafters, and often the Guild is a powerful force amongst the populace.")
            .WithOccupation(OccupationType.Enhancement, "Master Crafter",
                "Guild Wages, Instruction, Livery (guild patch and visible tools of the trade), Masterwork, Retainer 1 Retain Basic Occupations skills, plus add +4 Craft Points to any one Craft Skill you possess.",
                requirements:
                "You must have been a Guild Crafter and must complete a masterwork acclaimed by your peers. This Advanced Occupation can only be appended to a Basic Occupation, though any character may be considered a Master Crafter of the Guild if they have proven themselves.",
                description:
                "The most successful crafters prove their skill by ascending to the rank of Guildmaster, capable of creating impressive new items and educating new guild members alike.")
            .WithOccupation(OccupationType.Enhancement, "Master Healer",
                "Retain your Basic Occupation, plus add Medicine.",
                requirements:
                "Basic Occupation must possess Cure Affliction Skill, must have access to an Apothecary Craft Kit, 100 crown to set up other necessary tools and reagents.",
                description:
                "Not everyone has the ability, opportunity or perseverance to become a doctor. These same folk, however, might be experts at applying herbs, brewing minor potions, and the like. Such people master the talents of the herbalist, hermit, folk healer, and the like, becoming skilled and famous in their small area of expertise.")
            .WithOccupation(OccupationType.Enhancement, "Town Guard Auxiliary",
                "Retain your Basic Occupation’s skills, plus Income (+5) and Livery (based on local Chapter)",
                requirements:
                "Must be accepted into the Town Guard. This Advanced Occupation can only be appended to a Basic Occupation, though a person with an Advanced Occupation can still assist the Town Guard.",
                description:
                "There are many who would see to the defense of town and village, but who possess demanding jobs or community roles that preclude them from dedicating themselves to the Guard. These civic-minded individuals can become Auxiliaries, paid by the Guard and drawn up into service as needed.")
            .Done();
        
    }
}
