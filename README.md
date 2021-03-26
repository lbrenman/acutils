# Axway Amplify Central Utilities CLI

A cli for viewing and modifying Amplify Central resources for your organization.

Refer to this [blog post](https://devblog.axway.com/apis/amplify-central-connected-gateway-custom-api-subscription-flow-basics/) for instructions to create an Amplify Central service account and retrieve the clientId and clientSecret required for the cli. You enter this info in an acconfig.js file that you should create in your project folder:

```javascript
module.exports = {
  clientId: '<Enter your client id>',
  clientSecret: '<Enter your client secret>',
  apiCentralBaseURL: 'https://apicentral.axway.com',
  orgId: '<Enter your org id>'
}

```

> Note that the BaseURL above is the default but there are other BaseURLs, depending on region. If you are not sure, then leave it as above

After downloading the repo, do the following:

* Install dependencies:

  `npm install`

* Run as follows:

  `./acutils.js`

  > Note: You may need to make acutils.js executable using `chmod +x acutils.js`
