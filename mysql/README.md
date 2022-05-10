# Experiences

Experiences are a key part of the attractive city prototype. To make it easier for non-technical people to add, remove and edit information about experiences they are written into a Google Sheet. For the experiences to be used in the prototype they need to be in the Cloud SQL database. For updating the Cloud SQL database with the latest information in the spreadsheet see section _Experiences Sheet Script_

## Experiences Google Sheet

Experiences are written into [this](https://docs.google.com/spreadsheets/d/1xUT_dSUNqSzgCcV1rPVsXz6W1VvG-kINsEBeBs1jtwg/edit#gid=0) Google Sheet. There is also a seperate sheet for tags in the same spreadsheet. To view and edit this spreadsheet you need to be logged into a Google account that has permission to view and edit. Permissions can be given by the owner of the spreadsheet, Harald Stendal (harald.stendal@gmail.com).

## Experiences Sheet Script

The Experiences Sheet Script is an Apps Script connected to the Experiences Google Sheet. The script takes information from the experiences sheet (not the tags sheet) and adds it to the Cloud SQL database that is specified.

### How to open Experiences Sheet Script

To open the script follow these steps:

- Open the Experiences Google Sheet (see section _Experiences Google Sheet_)
- Click on **Tools**
- Click on **Script Editor** (**NOTE:** If you are signed into multiple Google Accounts, the script editor might not open. Make sure that you are only signed into one Google Account)

### Transfering experiences to Cloud SQL

To transfer experiences to a Cloud SQL database, simply set the **db** string to the database you want to transfer the information to, and run the script.

**_Example - Updating the development database:_**

- Write "**var db = 'experiences_devdb';**"
- Run the script

**NOTE:** The following functionality has yet to be implemented
- Removing experiences from the database, that have been removed from the spreadsheet.
- Inserting new tags, that have been created in the tag sheet.

