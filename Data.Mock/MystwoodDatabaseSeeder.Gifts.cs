namespace Mystwood.Landing.Data.Mock
{
    public partial class MystwoodDatabaseSeeder
    {
        private static void LoadGifts(TraitsBuilder traits) => traits
            .WithGift("Courage", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Hit Point Bonus", "+0")
                    .WithProperty("Battle Endurance per Renew", "1")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Use of Arms",
                        description:
                        "Allows you to use any single non-Restricted melee weapon, even two handed ones, or any shield up to 36” in any dimension.Use of Arms does not allow you to use two weapons at once.")
                    .WithAbility("Battle Endurance (Disengage)"))
                .WithRank(2, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "2")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Toughness I"))
                .WithRank(3, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "3")
                    .WithProperty("Resist Will per Day", null)
                    .WithAbility("Battle Endurance (Heal 2)"))
                .WithRank(4, rank => rank
                    .WithProperty("Hit Point Bonus", "+1")
                    .WithProperty("Battle Endurance per Renew", "3")
                    .WithProperty("Resist Will per Day", "1")
                    .WithAbility("Resist Will"))
                .WithRank(5, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "4")
                    .WithProperty("Resist Will per Day", "1")
                    .WithAbility("Toughness II"))
                .WithRank(6, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "4")
                    .WithProperty("Resist Will per Day", "2"))
                .WithRank(7, rank => rank
                    .WithProperty("Hit Point Bonus", "+2")
                    .WithProperty("Battle Endurance per Renew", "5")
                    .WithProperty("Resist Will per Day", "2")
                    .WithAbility("Battle Endurance (Purge Maim)"))
                .WithRank(8, rank => rank
                    .WithProperty("Hit Point Bonus", "+3")
                    .WithProperty("Battle Endurance per Renew", "5")
                    .WithProperty("Resist Will per Day", "3")
                    .WithAbility("Toughness III"))
                .WithRank(9, rank => rank
                    .WithProperty("Hit Point Bonus", "+3")
                    .WithProperty("Battle Endurance per Renew", "6")
                    .WithProperty("Resist Will per Day", "3"))
                .WithRank(10, rank => rank
                    .WithProperty("Hit Point Bonus", "+4")
                    .WithProperty("Battle Endurance per Renew", "6")
                    .WithProperty("Resist Will per Day", "4")
                    .WithAbility("Battle Endurance (Lethal to Harm)")
                    .WithAbility("Toughness IV"))
            )
            .WithGift("Dexterity", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Disarm Traps/Pick Locks")
                    .WithAbility("Thrown Weapon")
                    .WithAbility("Use Hand Crossbow"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Special Attacks")
                    .WithAbility("Use Bows"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Assassinate per Day", "-")
                    .WithAbility("Florentine")
                    .WithAbility("Pick Pockets I")
                    .WithAbility("Tarot Mortis"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Assassinate per Day", "1")
                    .WithAbility("Assassinate"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Assassinate per Day", "1")
                    .WithAbility("Two Weapons"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithProperty("Assassinate per Day", "2"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Swashbuckling"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Evade Trap"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Assassinate per Day", "2")
                    .WithAbility("Pick Pockets II"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Assassinate per Day", "3"))
            )
            .WithGift("Empathy", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithAbility("First Aid")
                    .WithAbility("Diagnose"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "-")
                    .WithAbility("Cure Maim"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithAbility("Healing Hand (Heal 2)"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithAbility("Improved First Aid"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithAbility("With Malice Toward None (Heal 3)"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithAbility("Detect Unconscious"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithAbility("Master First Aid"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithAbility("With Malice Toward None (Heal 5)"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithAbility("Empath’s Cry"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithAbility("Heroic Surgery"))
            )
            .WithGift("Passion", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "2")
                    .WithProperty("Bursts per Renew", "1")
                    .WithProperty("Storms per Renew", "-")
                    .WithAbility("Summon Element")
                    .WithAbility("Elemental Burst"))
                .WithRank(2, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "2")
                    .WithProperty("Bursts per Renew", "1")
                    .WithProperty("Storms per Renew", "-")
                    .WithAbility("Hedge Magic"))
                .WithRank(3, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "2")
                    .WithProperty("Storms per Renew", "-"))
                .WithRank(4, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "2")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility("Elemental Storm")
                    .WithAbility("Purge Element"))
                .WithRank(5, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "3")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility("Mage Lore"))
                .WithRank(6, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "1")
                    .WithAbility(""))
                .WithRank(7, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "3")
                    .WithProperty("Storms per Renew", "2")
                    .WithAbility("Elemental Kinship"))
                .WithRank(8, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "4")
                    .WithProperty("Bursts per Renew", "4")
                    .WithProperty("Storms per Renew", "2"))
                .WithRank(9, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "5")
                    .WithProperty("Bursts per Renew", "5")
                    .WithProperty("Storms per Renew", "2"))
                .WithRank(10, rank => rank
                    .WithProperty("Max Damage per Bolt/Burst", "5")
                    .WithProperty("Bursts per Renew", "5")
                    .WithProperty("Storms per Renew", "2")
                    .WithAbility("Summoner’s Stride"))
            )
            .WithGift("Prowess", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Deathstrikes per Day", "-")
                    .WithAbility("Use of Arms"))
                .WithRank(2, rank => rank
                    .WithProperty("Special Attacks per Renew", "1")
                    .WithProperty("Deathstrikes per Day", "-")
                    .WithAbility("Detect Health")
                    .WithAbility("Extra Hit Point"))
                .WithRank(3, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Deathstrikes per Day", "-"))
                .WithRank(4, rank => rank
                    .WithProperty("Special Attacks per Renew", "2")
                    .WithProperty("Deathstrikes per Day", "1")
                    .WithAbility("Deathstrike"))
                .WithRank(5, rank => rank
                    .WithProperty("Special Attacks per Renew", "3")
                    .WithProperty("Deathstrikes per Day", "1"))
                .WithRank(6, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Deathstrikes per Day", "1")
                    .WithAbility("Thrown Weapon"))
                .WithRank(7, rank => rank
                    .WithProperty("Special Attacks per Renew", "4")
                    .WithProperty("Deathstrikes per Day", "2"))
                .WithRank(8, rank => rank
                    .WithProperty("Special Attacks per Renew", "5")
                    .WithProperty("Deathstrikes per Day", "2")
                    .WithAbility("Wrist Twist (Resist Crushing)"))
                .WithRank(9, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithProperty("Deathstrikes per Day", "2"))
                .WithRank(10, rank => rank
                    .WithProperty("Special Attacks per Renew", "6")
                    .WithProperty("Deathstrikes per Day", "3"))
            )
            .WithGift("Wisdom", gift => gift
                .WithRank(1, rank => rank
                    .WithProperty("Mana", "1")
                    .WithProperty("Resist Magic per Renew", "-")
                    .WithAbility("Lore")
                    .WithAbility("Sorcery"))
                .WithRank(2, rank => rank
                    .WithProperty("Mana", "2")
                    .WithProperty("Resist Magic per Renew", "-")
                    .WithAbility("Hedge Magic")
                    .WithAbility("Mage Lore"))
                .WithRank(3, rank => rank
                    .WithProperty("Mana", "3")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility(""))
                .WithRank(4, rank => rank
                    .WithProperty("Mana", "4")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility("Purge Magic I"))
                .WithRank(5, rank => rank
                    .WithProperty("Mana", "5")
                    .WithProperty("Resist Magic per Renew", "1")
                    .WithAbility(""))
                .WithRank(6, rank => rank
                    .WithProperty("Mana", "6")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility(""))
                .WithRank(7, rank => rank
                    .WithProperty("Mana", "7")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility("Purge Magic II"))
                .WithRank(8, rank => rank
                    .WithProperty("Mana", "8")
                    .WithProperty("Resist Magic per Renew", "2")
                    .WithAbility(""))
                .WithRank(9, rank => rank
                    .WithProperty("Mana", "9")
                    .WithProperty("Resist Magic per Renew", "3")
                    .WithAbility(""))
                .WithRank(10, rank => rank
                    .WithProperty("Mana", "10")
                    .WithProperty("Resist Magic per Renew", "3")
                    .WithAbility(""))
            )
            .Done();
    }
}
