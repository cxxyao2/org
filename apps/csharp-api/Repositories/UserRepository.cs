using Dapper;
using CsharpApi.Entities;
using CsharpApi.Helpers;

namespace CsharpApi.Repositories;
public interface IUserRepository
{
    Task<IEnumerable<User>> GetAll();
    Task<User> GetById(int id);
    Task<User> GetByEmail(string email);
    Task<User> Create(User user);
    Task Update(User user);
    Task Delete(int id);
}


public class UserRepository : IUserRepository
{
    private DataContext _context;
    public UserRepository(DataContext context)
    {
        _context = context;
    }

    public Task<User> Create(User user)
    {
        using var connection = _context.CreateConnection();
        var sql = """
        INSERT INTO Users (Title, FirstName, LastName, Email, PasswordHash, Role)
        VALUES (@Title, @FirstName, @LastName, @Email, @PasswordHash, @Role)
        """;
        return connection.QueryFirstOrDefaultAsync<User>(sql, user);
    }

    public async Task Delete(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """DELETE FROM Users WHERE Id = @id""";
        await connection.ExecuteAsync(sql, new { id });

    }

    public async Task<IEnumerable<User>> GetAll()
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<User>("SELECT * FROM Users");
    }

    public Task<User> GetByEmail(string email)
    {
        using var connection = _context.CreateConnection();
        var sql = """SELECT * FROM Users WHERE Eamil = @email""";
        return connection.QueryFirstOrDefaultAsync<User>(sql, new { email });
    }

    public Task<User> GetById(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """SELECT * FROM Users WHERE Id = @id""";
        return connection.QueryFirstOrDefaultAsync<User>(sql, new { id });
    }

    public Task Update(User user)
    {
        using var connection = _context.CreateConnection();
        var sql = """
        UPDATE Users
        SET
            Title = @Title,
            FirstName = @FirstName,
            LastName = @LastName,
            Email = @Email,
            PasswordHash = @PasswordHash,
            Role = @Role
        WHERE Id = @Id
        """;
        return connection.QueryFirstOrDefaultAsync<User>(sql, user);
    }
}
