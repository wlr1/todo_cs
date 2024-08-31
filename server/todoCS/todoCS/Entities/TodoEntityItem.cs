using System.Runtime.InteropServices.JavaScript;

namespace todoCS.Entities;

public class TodoEntityItem
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateTime CreatedAt { get; set; }
    
}