using System;
using Microsoft.Extensions.Internal;

namespace Mystwood.Landing.Tests.Common
{
    public class TimeTravelClock : ISystemClock
    {
        public static readonly DateTimeOffset DefaultUtcNow = new DateTimeOffset(2020, 1, 1, 12, 0, 0, 0, TimeSpan.Zero);

        public TimeTravelClock() { }

        public TimeTravelClock(string utcDateTime) => Set(utcDateTime);

        public TimeTravelClock(DateTimeOffset dateTimeOffset) => UtcNow = dateTimeOffset;

        public DateTimeOffset UtcNow { get; set; } = DefaultUtcNow;

        public void Set(string utcDateTime) =>
            UtcNow = DateTime.SpecifyKind(DateTime.Parse(utcDateTime), DateTimeKind.Utc);

        public DateTimeOffset AddYears(int years) =>
            UtcNow = UtcNow.AddYears(years);

        public DateTimeOffset AddMonths(int months) =>
            UtcNow = UtcNow.AddMonths(months);

        public DateTimeOffset AddDays(int days) =>
            UtcNow = UtcNow.AddDays(days);

        public DateTimeOffset AddHours(int hours) =>
            UtcNow = UtcNow.AddHours(hours);

        public DateTimeOffset AddMinutes(int minutes) =>
            UtcNow = UtcNow.AddMinutes(minutes);

        public DateTimeOffset AddSeconds(int seconds) =>
            UtcNow = UtcNow.AddSeconds(seconds);
    }
}
