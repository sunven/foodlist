export async function callWxCloudFunction(name, data) {
  const result = await wx.cloud.callFunction({ name, data });
  return result.result;
}

// module.exports = {
//   callWxCloudFunction,
// }
