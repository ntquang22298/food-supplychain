'use strict';

const { Contract } = require('fabric-contract-api');

class SypplyChain extends Contract {

  // thêm mới 1 đối tượng vào chaincode
  async addAsset(ctx, asset) {
    console.info('============= START : Add asset ===========');
    await ctx.stub.putState(JSON.parse(asset).id.toString(), Buffer.from(asset));
    console.info('============= END : Add asset ===========');
    return ctx.stub.getTxID()
  }

  // lấy 1 đối tượng từ chaincode
  async queryAsset(ctx, assetId) {
    console.info('============= START : Query asset ===========');
    const assetAsBytes = await ctx.stub.getState(assetId);
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${assetId} does not exist`);
    }
    console.log(assetAsBytes.toString());
    console.info('============= END : Query asset ===========');
    return assetAsBytes.toString();
  }

  //lấy 1 list các đối tượng từ chaincode
  async queryAllAsset(ctx, entity) {
    const startKey = '';
    const endKey = 'zzzzzzzz';

    const iterator = await ctx.stub.getStateByRange(entity + startKey, entity + endKey);

    const allResults = [];
    while (true) {
      const res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        console.log(res.value.value.toString('utf8'));

        const Key = res.value.key;
        let Record;
        try {
          Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          Record = res.value.value.toString('utf8');
        }
        allResults.push({ Key, Record });
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return JSON.stringify(allResults);
      }
    }
  }

  async setPosition(ctx, id, latitude, longitude) {
    console.info('============= START : Set position ===========');
    const keyAsBytes = await ctx.stub.getState(id);
    if (!keyAsBytes || keyAsBytes.length === 0) {
      throw new Error(`${id} does not exist`);
    }
    let key = JSON.parse(keyAsBytes.toString());
    key.latitude = latitude;
    key.longitude = longitude;
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
    console.info('============= END : Set position ===========');
    return ctx.stub.getTxID();
  }

  async getHistory(ctx, id) {
    console.info('============= START : Query History ===========');
    let iterator = await ctx.stub.getHistoryForKey(id);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    console.info('============= END : Query History ===========');
    return result;
  }


}

module.exports = SypplyChain;