#!/usr/bin/env node

// Leveraged the following tutorials:
//  * https://www.digitalocean.com/community/tutorials/how-to-build-command-line-applications-with-node-js

// const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');

let lib = require('./aclib');
let config = require('./acconfig');

const args = process.argv;

const { version } = require('./package.json');

const tokenErrorMsg = 'Error retrieving access token for API access. Please make sure that your configuration is correct!';

// usage represents the help guide
const usage = function() {
  const usageText = `
USAGE: acutils <command>

The acutils CLI helps you manage your amplify central resources from the command line.

Make sure you set your clientId, clientSecret, ... in the acconfig.js file prior to running!!! Refer to https://bit.ly/3rnu3T4 for details.

COMMANDS:
  help                     get help
  getenv                   get a list of environments
  getci                    get a list of catalog items (APIs)
  getenvci                 get a list of catalog items (APIs) for a given environment
  getenvapiservices        get a list of API Services for a given environment
  delenvapiservices        delete all API Services for a given environment
  getsubs                  get a list of all subscriptions
  getenvwh                 get a list of webhooks for a given environment
  updatesubswhurl          update subscription webhook URL
`

  console.log(usageText)
}

// used to log errors to the console in red color
function errorLog(error) {
  const eLog = chalk.red(error)
  console.log(eLog)
}

function getUserInput(question, callback) {
  // console.log('getUserInput()');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(question, (answer) => {
    // console.log(`Your input: ${answer}`);

    rl.close();

    if(callback){callback(answer)}

  });

}

function getEnv(options) {
  // console.log('getEnv()');

  lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
    if(e.success) {
      lib.getEnvironments(function(environments) {
        if(environments.success) {
          const eLog = chalk.green('==============\nEnvironments\n==============')
          console.log(eLog)
          environments.data.forEach((item, i) => {
            console.log(item.name);
          });
          console.log('\n')
        } else {
          console.log('Error retrieving environments!')
        }
      })
    } else {
      console.log(tokenErrorMsg)
    }
  });
}

function getCatalogItems(options) {
  // console.log('getCatalogItems()');

  lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
    if(e.success) {
      lib.getCatalogItems(function(catalogItems) {
        if(catalogItems.success) {
          const eLog = chalk.green('==============\nCatalog Items\n==============')
          console.log(eLog)
          catalogItems.data.forEach((item, i) => {
            console.log(item.name);
          });
          console.log('\n')
        } else {
          console.log('Error retrieving Catalog Items!')
        }
      })
    } else {
      console.log(tokenErrorMsg)
    }
  });
}

function getEnvironmentCatalogItems(options) {
  // console.log('getEnvironmentCatalogItems()');

  getUserInput('Name of Environment to get Catalog Items for? ', function(answer) {

    lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
      if(e.success) {
        lib.getCatalogItemsForEnvironmentName(answer, function(catalogItems) {
          if(catalogItems.success) {
            const eLog = chalk.green('==============\nCatalog Items\n==============')
            console.log(eLog)
            catalogItems.data.forEach((item, i) => {
              console.log(item.name);
            });
            console.log('\n')
          } else {
            console.log('Error retrieving Catalog Items!')
          }
        })
      } else {
        console.log(tokenErrorMsg)
      }
    });

  });

}

function getEnvironmentApiServices(options) {
  // console.log('getEnvironmentApiServices()');

  getUserInput('Name of Environment to get API Services for? ', function(answer) {

    lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
      if(e.success) {
        lib.getApiServicesForEnvironmentName(answer, function(apiServices) {
          if(apiServices.success) {
            const eLog = chalk.green('==============\nAPI Services\n==============')
            console.log(eLog)
            apiServices.data.forEach((item, i) => {
              console.log(`${item.title} (${item.name})`);
            });
            console.log('\n')
          } else {
            console.log('Error retrieving API Services!')
          }
        })
      } else {
        console.log(tokenErrorMsg)
      }
    });

  });

}

function delEnvironmentApiServices(options) {
  // console.log('delEnvironmentApiServices()');

  getUserInput('Name of Environment to delete ALL API Services for? ', function(answer) {

    lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
      if(e.success) {
        lib.getApiServicesForEnvironmentName(answer, function(apiServices) {
          if(apiServices.success) {
            // const eLog = chalk.green('==============\nAPI Services\n==============')
            // console.log(eLog)
            apiServices.data.forEach((item, i) => {
              // console.log(`${item.title} (${item.name})`);
              lib.delApiServicesForEnvironmentName(answer, item.name, function(f){})
            });
            // console.log('\n')
          } else {
            console.log('Error retrieving API Services!')
          }
        })
      } else {
        console.log(tokenErrorMsg)
      }
    });

  });

}

function getEnvironmentWebhooks(options) {
  // console.log('getEnvironmentWebhooks()');

  getUserInput('Name of Environment to get Webhooks for? ', function(answer) {

    lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
      if(e.success) {
        lib.getWebhooksByEnvironment(answer, function(catalogItems) {
          if(catalogItems.success) {
            const eLog = chalk.green('==============\nWebhooks\n==============')
            console.log(eLog)
            catalogItems.data.forEach((item, i) => {
              console.log(`name: ${item.name}\nurl: ${item.spec.url}\nheaders:${JSON.stringify(item.spec.headers)}`);
            });
            console.log('\n')
          } else {
            console.log('Error retrieving Webhooks!')
          }
        })
      } else {
        console.log(tokenErrorMsg)
      }
    });

  });

}

function getSubscriptions(options) {
  // console.log('getSubscription()');

  lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
    if(e.success) {
      lib.getSubscriptions(function(subscriptions) {
        if(subscriptions.success) {
          const eLog = chalk.green('==============\nSubscriptions\n==============')
          console.log(eLog)
          subscriptions.data.forEach((item, i) => {
            console.log(`${item.name} - ${item.state}`);
          });
          console.log('\n')
        } else {
          console.log('Error retrieving Subscriptions!')
        }
      })
    } else {
      console.log(tokenErrorMsg)
    }
  });
}

function updateSubscriptionWebhookURL(options) {
  // console.log('updateSubscriptionWebhookURL()');

  getUserInput('Name of Environment to update Subscription Webhook for? ', function(answerEnv) {

    getUserInput('Enter new URL ', function(answerUrl) {

      lib.init(options.clientId, options.clientSecret, options.apiCentralBaseURL, options.orgId, function(e) {
        if(e.success) {
          lib.updateSubscriptionWebhookURL(answerEnv, answerUrl, function(updateResponse) {
            if(updateResponse.success) {
              console.log('Susbcription Webhook URL successfully updated!');
            } else {
              console.log('Error updating susbscription webhook url')
            }
          })
        } else {
          console.log(tokenErrorMsg)
        }
    });

    });

  });

}


////////////////////////////////////
// Start here
////////////////////////////////////

console.log(chalk.cyanBright(`\nAmplify Central Utilities CLI`) + `, version ${version}\nCopyright (c) 2018-2020, Axway, Inc. All Rights Reserved.\n`);

let options = {
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  apiCentralBaseURL: config.apiCentralBaseURL,
  orgId: config.orgId
}

switch(args[2]) {
  case 'help':
    usage()
    break
  case 'getenv':
    getEnv(options)
    break
  case 'getci':
    getCatalogItems(options)
    break
  case 'getenvci':
    getEnvironmentCatalogItems(options)
    break
  case 'getenvapiservices':
    getEnvironmentApiServices(options)
    break
  case 'delenvapiservices':
    delEnvironmentApiServices(options)
    break
  case 'getsubs':
    getSubscriptions(options)
    break
  case 'getenvwh':
    getEnvironmentWebhooks(options)
    break
  case 'updatesubswhurl':
    updateSubscriptionWebhookURL(options)
    break
  default:
    errorLog('Invalid command or no command passed')
    usage()
}
