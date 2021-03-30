# Axway Amplify Central Utilities CLI

A cli for viewing and modifying Amplify Central resources for your organization.

Besides provide a command line interface to view your environments, api services, catalog items, etc..., it enables you to do the following which cannot currently be done from the UI:

* Remove all API Services from an Environment. This is a common task during POCs and, in the UI, can only be achieved, one API Service at a time.
* Modify a subscription webhook URL. This is also a common task during POCs and when developing Subscription Flows and can only be achieved by editing the discovery agent YML/ENV files and relaunching the agent

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

* You can run `npm link` and run from anywhere using acutils
