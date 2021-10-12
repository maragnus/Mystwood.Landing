using System;

namespace Mystwood.Landing.Data
{
    public static class Constants
    {
        public const int StartinLevelWithBackstory = 6;
        public const int StartinLevelWithoutBackstory = 5;

        public static int LevelCost(int startingLevel, int currentLevel) =>
            Math.Max(0, triangle(currentLevel) - triangle(startingLevel));

        // https://en.wikipedia.org/wiki/Triangular_number
        private static int triangle(int level) => level * (level + 1) / 2;
    }
}
