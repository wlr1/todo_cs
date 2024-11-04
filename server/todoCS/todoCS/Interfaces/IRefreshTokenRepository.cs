using todoCS.Entities;

namespace todoCS.Interfaces;

public interface IRefreshTokenRepository
{
    Task<RefreshTokenEntity?> GetRefreshTokenAsync(int userId, string token);
    Task AddOrUpdateRefreshTokenAsync(int userId, string token, DateTime expiryDate);
    Task DeleteRefreshTokenAsync(int userId);
    Task<int> SaveChangeAsync();
}