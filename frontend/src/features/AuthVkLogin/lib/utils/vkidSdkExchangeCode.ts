import * as VKIDSDK from '@vkid/sdk'

export const vkidSdkExchangeCode = async (code: string, deviceId: string) => {
  const res = await VKIDSDK.Auth.exchangeCode(code, deviceId)
  return res
}
