namespace ShopManager.Server.Authorization.Interfaces
{
    public interface ISignInService
    {
        Task<string> SignIn(string login, string password);
    }
}
