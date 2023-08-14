using System;
using System.Threading.Tasks;
using CitizenFX.Core;

namespace MySQL
{
    public class MySQL : BaseScript
    {
        public async Task<object> FindAll(params object[] args)
        {
            return await Exports["ice_mysql"].FindAll(args[0], args[1], args[2], args[3], args[4], args[5]);
        }
        public async Task<object> FindOne(params object[] args)
        {
            return await Exports["ice_mysql"].FindOne(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> FindById(params object[] args)
        {
            return await Exports["ice_mysql"].FindById(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Modify(params object[] args)
        {
            return await Exports["ice_mysql"].Modify(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> FindAndCountAll(params object[] args)
        {
            return await Exports["ice_mysql"].FindAndCountAll(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Create(params object[] args)
        {
            return await Exports["ice_mysql"].Create(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Destroy(params object[] args)
        {
            return await Exports["ice_mysql"].Destroy(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Count(params object[] args)
        {
            return await Exports["ice_mysql"].Count(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Max(params object[] args)
        {
            return await Exports["ice_mysql"].Max(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Min(params object[] args)
        {
            return await Exports["ice_mysql"].Min(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Sum(params object[] args)
        {
            return await Exports["ice_mysql"].Sum(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Increment(params object[] args)
        {
            return await Exports["ice_mysql"].Increment(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Decrement(params object[] args)
        {
            return await Exports["ice_mysql"].Decrement(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> BulkCreate(params object[] args)
        {
            return await Exports["ice_mysql"].BulkCreate(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Query(params object[] args)
        {
            return await Exports["ice_mysql"].Query(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitQuery(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitQuery(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Select(params object[] args)
        {
            return await Exports["ice_mysql"].Select(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitSelect(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitSelect(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Insert(params object[] args)
        {
            return await Exports["ice_mysql"].Insert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitInsert(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitInsert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Update(params object[] args)
        {
            return await Exports["ice_mysql"].Update(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitUpdate(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitUpdate(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Delete(params object[] args)
        {
            return await Exports["ice_mysql"].Delete(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitDelete(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitDelete(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Transaction(params object[] args)
        {
            return await Exports["ice_mysql"].Transaction(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitTransaction(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitTransaction(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Unique(params object[] args)
        {
            return await Exports["ice_mysql"].Unique(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitUnique(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitUnique(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Single(params object[] args)
        {
            return await Exports["ice_mysql"].Single(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitSingle(params object[] args)
        {
            return await Exports["ice_mysql"].AwaitSingle(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoInsert(params object[] args)
        {
            return await Exports["ice_mysql"].MongoInsert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoFind(params object[] args)
        {
            return await Exports["ice_mysql"].MongoFind(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoUpdate(params object[] args)
        {
            return await Exports["ice_mysql"].MongoUpdate(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoCount(params object[] args)
        {
            return await Exports["ice_mysql"].MongoCount(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoDelete(params object[] args)
        {
            return await Exports["ice_mysql"].MongoDelete(args[0], args[1], args[2], args[3]);
        }
    }
}