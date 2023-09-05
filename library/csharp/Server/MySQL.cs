using System;
using System.Threading.Tasks;
using CitizenFX.Core;

namespace MySQL
{
    public class MySQL : BaseScript
    {
        public async Task<object> FindAll(params object[] args)
        {
            return await Exports["icmysql"].FindAll(args[0], args[1], args[2], args[3], args[4], args[5]);
        }
        public async Task<object> FindOne(params object[] args)
        {
            return await Exports["icmysql"].FindOne(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> FindById(params object[] args)
        {
            return await Exports["icmysql"].FindById(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Modify(params object[] args)
        {
            return await Exports["icmysql"].Modify(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> FindAndCountAll(params object[] args)
        {
            return await Exports["icmysql"].FindAndCountAll(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Create(params object[] args)
        {
            return await Exports["icmysql"].Create(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Destroy(params object[] args)
        {
            return await Exports["icmysql"].Destroy(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Count(params object[] args)
        {
            return await Exports["icmysql"].Count(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Max(params object[] args)
        {
            return await Exports["icmysql"].Max(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Min(params object[] args)
        {
            return await Exports["icmysql"].Min(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Sum(params object[] args)
        {
            return await Exports["icmysql"].Sum(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Increment(params object[] args)
        {
            return await Exports["icmysql"].Increment(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Decrement(params object[] args)
        {
            return await Exports["icmysql"].Decrement(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> BulkCreate(params object[] args)
        {
            return await Exports["icmysql"].BulkCreate(args[0], args[1], args[2], args[3], args[4], args[5]);
        }

        public async Task<object> Query(params object[] args)
        {
            return await Exports["icmysql"].Query(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitQuery(params object[] args)
        {
            return await Exports["icmysql"].AwaitQuery(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Select(params object[] args)
        {
            return await Exports["icmysql"].Select(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitSelect(params object[] args)
        {
            return await Exports["icmysql"].AwaitSelect(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Insert(params object[] args)
        {
            return await Exports["icmysql"].Insert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitInsert(params object[] args)
        {
            return await Exports["icmysql"].AwaitInsert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Update(params object[] args)
        {
            return await Exports["icmysql"].Update(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitUpdate(params object[] args)
        {
            return await Exports["icmysql"].AwaitUpdate(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Delete(params object[] args)
        {
            return await Exports["icmysql"].Delete(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitDelete(params object[] args)
        {
            return await Exports["icmysql"].AwaitDelete(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Transaction(params object[] args)
        {
            return await Exports["icmysql"].Transaction(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitTransaction(params object[] args)
        {
            return await Exports["icmysql"].AwaitTransaction(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Unique(params object[] args)
        {
            return await Exports["icmysql"].Unique(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitUnique(params object[] args)
        {
            return await Exports["icmysql"].AwaitUnique(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> Single(params object[] args)
        {
            return await Exports["icmysql"].Single(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> AwaitSingle(params object[] args)
        {
            return await Exports["icmysql"].AwaitSingle(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoInsert(params object[] args)
        {
            return await Exports["icmysql"].MongoInsert(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoFind(params object[] args)
        {
            return await Exports["icmysql"].MongoFind(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoUpdate(params object[] args)
        {
            return await Exports["icmysql"].MongoUpdate(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoCount(params object[] args)
        {
            return await Exports["icmysql"].MongoCount(args[0], args[1], args[2], args[3]);
        }

        public async Task<object> MongoDelete(params object[] args)
        {
            return await Exports["icmysql"].MongoDelete(args[0], args[1], args[2], args[3]);
        }
    }
}