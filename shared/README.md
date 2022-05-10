# Attractive City Back-end

## Prerequisites

These pieces of software are

-
-

## Contents

This document contains guides to perform a number of actions on the _._

-

Each guide is separated into **Setup** and **Execution**; the former for instructions in the one-time setup of the task, and the latter for steps that is needed every time the action is performed.

## Develop and deploy

Debug the back-end locally. Note that this still includes connecting to a database running on the Google Cloud Platform.

### Setup

1. Ensure Cloud SQL Auth proxy is installed.
1. Ensure the python virtual environment is installed. Steps for this can be found in the [README.md in the python folder](../python/README.md).

### Execution

1. Ensure the Cloud SQL Auth proxy is running. Steps for this can be found in the **Use Cloud SQL Auth proxy** guide.
1. Ensure all packages are installed with command `npm install`.
1. Start the back-end locally with the command `npm run debug`.
