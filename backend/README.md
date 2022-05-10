# Attractive City Back-end

This folder contains the code for the back-end artefact.

## Prerequisites

These pieces of software are required to run and develop the back-end.

- Node.js
- Python 3.6 or newer

## Contents

This document contains guides to perform a number of actions on the back-end.

- Deploy back-end
- Develop and debug locally
- Use Cloud SQL Auth proxy
- Testing

Each guide is separated into **Setup** and **Execution**; the former for instructions in the one-time setup of the task, and the latter for steps that is needed every time the action is performed.

## Deploy back-end

Deploy the back-end to be run in Cloud Run. Note that the front-end will also be deployed.

### Execution

1. Ensure the back-end is working by debugging and testing.
1. Push changes to the **prod** branch.

## Develop and debug locally

Debug the back-end locally. Note that this still includes connecting to a database running on the Google Cloud Platform.

### Setup

1. Ensure Cloud SQL Auth proxy is installed.
1. Ensure the python virtual environment is installed. Steps for this can be found in the [README.md in the python folder](../python/README.md).

### Execution

1. Ensure the Cloud SQL Auth proxy is running. Steps for this can be found in the **Use Cloud SQL Auth proxy** guide.
1. Ensure all packages are installed with command `npm install`.
1. Start the back-end locally with the command `npm run debug`.

## Use Cloud SQL Auth proxy

It is necessary to install and run this proxy to connect to the database instance running on the Google Cloud Platform. This access is used both in testing and debugging.

### Setup

1. Ensure that your Google account has access to the attractive city project at [console.cloud.google.com](https://console.cloud.google.com/home/dashboard?project=ac-testenv-328009).
1. Install Google Cloud SDK following the guide at [this page](https://cloud.google.com/sdk/docs/install). Log in with the account above, region `europe-west1` and zone `europe-west1-d` when using the command `gcloud init`.
1. Follow the steps described here to install the Cloud SQL Auth proxy: https://cloud.google.com/sql/docs/mysql/connect-admin-proxy#install

### Execution

1. Open a terminal at the location of your Cloud SQL Auth proxy and run command:
   - macOS / Linux: `./cloud_sql_proxy -instances=ac-testenv-328009:europe-west1:ac-db-test=tcp:19001`
   - Windows: `.\cloud_sql_proxy -instances=ac-testenv-328009:europe-west1:ac-db-test=tcp:19001`

## Testing

Run automatic tests to find errors in the back-end. This action should always be performed before pushing to main and deploying.

### Setup

1. Ensure Cloud SQL Auth proxy is installed.

### Execution

1. Ensure the Cloud SQL Auth proxy is running. Steps for this can be found in the **Use Cloud SQL Auth proxy** guide.
1. Ensure Jest and other packages are installed with command `npm install`.
1. Run the command `npm test` to open the tests.
