namespace Mystwood.Landing.Models
{
    public static class ReferenceData
    {
        public static Gift[] Gifts =
        {
            new Gift("Courage", new[] {"Hit Point Bonus", "Battle Endurance per Renew", "Resist Will per Day"},
                new[]
                {
                    new GiftRank(1, new[] {"+0", "1", "-"}, new[] {"Use of Arms", "Battle Endurance (Disengage)"}),
                    new GiftRank(2, new[] {"+1", "2", "-"}, new[] {"Toughness I"}),
                    new GiftRank(3, new[] {"+1", "3", "-"}, new[] {"Battle Endurance (Heal 2)"}),
                    new GiftRank(4, new[] {"+1", "3", "1"}, new[] {"Resist Will"}),
                    new GiftRank(5, new[] {"+2", "4", "1"}, new[] {"Toughness II"}),
                    new GiftRank(6, new[] {"+2", "4", "2"}, null),
                    new GiftRank(7, new[] {"+2", "5", "2"}, new[] {"Battle Endurance (Purge Maim)"}),
                    new GiftRank(8, new[] {"+3", "5", "3"}, new[] {"Toughness III"}),
                    new GiftRank(9, new[] {"+3", "6", "3"}, null),
                    new GiftRank(10, new[] {"+4", "6", "4"}, new[] {"Battle Endurance (Lethal to Harm)", "Toughness IV"}),
                }),
            new Gift("Dexterity", new[] {"Special Attacks per Renew", "Assassinate per Day"},
                new[]
                {
                    new GiftRank(1, new[] {"-", "-"}, new[] {"Disarm Traps/Pick Locks", "Thrown Weapon", "Use Hand Crossbow"}),
                    new GiftRank(2, new[] {"1", "-"}, new[] {"Special Attacks", "Use Bows"}),
                    new GiftRank(3, new[] {"1", "-"}, new[] {"Florentine", "Pick Pockets I", "Tarot Mortis"}),
                    new GiftRank(4, new[] {"2", "1"}, new[] {"Assassinate"}),
                    new GiftRank(5, new[] {"2", "1"}, new[] {"Two Weapons"}),
                    new GiftRank(6, new[] {"3", "2"}, null),
                    new GiftRank(7, new[] {"4", "2"}, new[] {"Swashbuckling"}),
                    new GiftRank(8, new[] {"4", "2"}, new[] {"Evade Trap"}),
                    new GiftRank(9, new[] {"5", "2"}, new[] {"Pick Pockets II"}),
                    new GiftRank(10, new[] {"5", "3"}, null),
                }),
            new Gift("Empathy", new[] {"Special Attacks per Renew"},
                new[]
                {
                    new GiftRank(1, new[] {"-"}, new[] {"First Aid", "Diagnose"}),
                    new GiftRank(2, new[] {"-"}, new[] {"Cure Maim"}),
                    new GiftRank(3, new[] {"3"}, new[] {"Healing Hand (Heal 2)"}),
                    new GiftRank(4, new[] {"3"}, new[] {"Improved First Aid"}),
                    new GiftRank(5, new[] {"4"}, new[] {"With Malice Toward None (Heal 3)"}),
                    new GiftRank(6, new[] {"4"}, new[] {"Detect Unconscious"}),
                    new GiftRank(7, new[] {"5"}, new[] {"Master First Aid"}),
                    new GiftRank(8, new[] {"5"}, new[] {"With Malice Toward None (Heal 5)"}),
                    new GiftRank(9, new[] {"6"}, new[] {"Empath’s Cry"}),
                    new GiftRank(10, new[] {"6"}, new[] {"Heroic Surgery"}),
                }),
            new Gift("Passion", new[] {"Max Damage per Bolt/Burst", "Bursts per Renew", "Storms per Renew"},
                new[]
                {
                    new GiftRank(1, new[] {"2", "1", "-"}, new[] {"Summon Element", "Elemental Burst"}),
                    new GiftRank(2, new[] {"2", "1", "-"}, new[] {"Hedge Magic"}),
                    new GiftRank(3, new[] {"3", "2", "-"}, null),
                    new GiftRank(4, new[] {"3", "2", "1"}, new[] {"Elemental Storm", "Purge Element"}),
                    new GiftRank(5, new[] {"3", "3", "1"}, new[] {"Mage Lore"}),
                    new GiftRank(6, new[] {"4", "3", "1"}, null),
                    new GiftRank(7, new[] {"4", "3", "2"}, new[] {"Elemental Kinship"}),
                    new GiftRank(8, new[] {"4", "4", "2"}, null),
                    new GiftRank(9, new[] {"5", "5", "2"}, null),
                    new GiftRank(10, new[] {"5", "5", "2"}, new[] {"Summoner’s Stride"}),
                }),
            new Gift("Prowess", new[] {"Special Attacks per Renew", "Deathstrikes per Day"},
                new[]
                {
                    new GiftRank(1, new[] {"1", "-"}, new[] {"Use of Arms"}),
                    new GiftRank(2, new[] {"1", "-"}, new[] {"Detect Health", "Extra Hit Point"}),
                    new GiftRank(3, new[] {"2", "-"}, null),
                    new GiftRank(4, new[] {"2", "1"}, new[] {"Deathstrike"}),
                    new GiftRank(5, new[] {"3", "1"}, null),
                    new GiftRank(6, new[] {"4", "1"}, new[] {"Thrown Weapon"}),
                    new GiftRank(7, new[] {"4", "2"}, null),
                    new GiftRank(8, new[] {"5", "2"}, new[] {"Wrist Twist (Resist Crushing)"}),
                    new GiftRank(9, new[] {"6", "2"}, null),
                    new GiftRank(10, new[] {"6", "3"}, null),
                }),
            new Gift("Wisdom", new[] {"Mana", "Resist Magic per Renew"},
                new[]
                {
                    new GiftRank(1, new[] {"1", "-"}, new[] {"Lore", "Sorcery"}),
                    new GiftRank(2, new[] {"2", "-"}, new[] {"Hedge Magic", "Mage Lore"}),
                    new GiftRank(3, new[] {"3", "1"}, null),
                    new GiftRank(4, new[] {"4", "1"}, new[] {"Purge Magic I"}),
                    new GiftRank(5, new[] {"5", "1"}, null),
                    new GiftRank(6, new[] {"6", "2"}, null),
                    new GiftRank(7, new[] {"7", "2"}, new[] {"Purge Magic II"}),
                    new GiftRank(8, new[] {"8", "2"}, null),
                    new GiftRank(9, new[] {"9", "3"}, null),
                    new GiftRank(10, new[] {"10", "3"}, null),
                })
        };
    }
}
