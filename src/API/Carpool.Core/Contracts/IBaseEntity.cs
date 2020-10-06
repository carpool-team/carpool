using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Abstract
{
    public interface IBaseEntity<T>
    {
        T Id { get; set; }
    }
}
