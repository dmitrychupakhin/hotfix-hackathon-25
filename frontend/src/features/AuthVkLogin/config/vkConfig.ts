import * as VKIDSDK from '@vkid/sdk'

export const initVKAuth = () => {
  VKIDSDK.Config.init({
    app: 53363269,
    redirectUrl: window.location.origin,
    responseMode: VKIDSDK.ConfigResponseMode.Callback,
    source: VKIDSDK.ConfigSource.LOWCODE,
    scope: 'email',
  })
}
