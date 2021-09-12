namespace Mystwood.Landing.Data
{
    public class MystwoodDatabaseOptions
    {
        public const string SectionName = "Database";

        public string EndPointUri { get; set; }
        public string ApplicationName { get; set; }
        public string RequestTime { get; set; }
        public string PrimaryKey { get; set; }
        public string DatabaseName { get; set; }
        public string ConnectionString { get; set; }
    }
}
