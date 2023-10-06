using System.Data;
using Dapper;
using Microsoft.Extensions.Options;
using Npgsql;

namespace CsharpApi.Helpers
{
    public class DataContext
    {
        private DbSettings _dbSettings;
        public DataContext(IOptions<DbSettings> dbSettings)
        {
            _dbSettings = dbSettings.Value;
        }
        public IDbConnection CreateConnection()
        {
            var connectString = $"Host={_dbSettings.Server};Database={_dbSettings.Database};Username={_dbSettings.UserId};Password={_dbSettings.Password};";
            return new NpgsqlConnection(connectString);
        }

        private async Task _initDatabase()
        {
            // create database if not exists
            var connectString = $"Host={_dbSettings.Server};Database=postgres;Username={_dbSettings.UserId};Password={_dbSettings.Password};";
            using var connection = new NpgsqlConnection(connectString);
            var sqlDbCount = $"SELECT COUNT(*) FROM pg_database WHERE datname = '{_dbSettings.Database}';";
            var dbCount = await connection.ExecuteScalarAsync<int>(sqlDbCount);
            if (dbCount == 0)
            {
                var sqlCreateDb = $"CREATE DATABASE \"{_dbSettings.Database}\"";
                await connection.ExecuteAsync(sqlCreateDb);
            }
        }

        private async Task _initTables()
        {
            // create tables if not exists
            using var connection = CreateConnection();
            await _initUsers();

            async Task _initUsers()
            {
                var sql = """
                CREATE TABLE IF NOT EXISTS Users (
                    Id SERIAL PRIMARY KEY,
                    Title VARCHAR,
                    FirstName VARCHAR,
                    LastName VARCHAR,
                    Email VARCHAR,
                    PasswordHash VARCHAR,
                    Role INTEGER
                );
                """;
                await connection.ExecuteAsync(sql);
            }

        }

        public async Task Init()
        {
            await _initDatabase();
            await _initTables();
        }

    }


}