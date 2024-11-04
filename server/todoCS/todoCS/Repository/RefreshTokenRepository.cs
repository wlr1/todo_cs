using Microsoft.EntityFrameworkCore;
using todoCS.Data;
using todoCS.Entities;
using todoCS.Interfaces;

namespace todoCS.Repository;

public class RefreshTokenRepository: IRefreshTokenRepository
{
    private readonly ApplicationDBContext _context;

    public RefreshTokenRepository(ApplicationDBContext context)
    {
        _context = context;
    }
    
   
    public async Task<RefreshTokenEntity?> GetRefreshTokenAsync(int userId, string token)
    {
        return await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.UserId == userId && rt.Token == token);
    }

    public async Task AddOrUpdateRefreshTokenAsync(int userId, string token, DateTime expiryDate)
    {
        var existingToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.UserId == userId);

        if (existingToken != null)
        {
            existingToken.Token = token;
            existingToken.ExpiryDate = expiryDate;
        }
        else
        {
            var newToken = new RefreshTokenEntity
            {
                UserId = userId,
                Token = token,
                ExpiryDate = expiryDate
            };
            await _context.RefreshTokens.AddAsync(newToken);
        }

        await _context.SaveChangesAsync();
    }

    public async Task DeleteRefreshTokenAsync(int userId)
    {
        var existingToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.UserId == userId);

        if (existingToken != null)
        {
            _context.RefreshTokens.Remove(existingToken);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<int> SaveChangeAsync()
    {
        return await _context.SaveChangesAsync();
    }
}