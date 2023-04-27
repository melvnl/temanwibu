# Temanwibu - LINE Bot

## Overview

Temanwibu is a Line Bot that fetches information from the https://manganato.com homepage every 3 hours. It is a node.js application that is deployed on an Amazon Elastic Compute Cloud (EC2) instance. The application utilizes Puppeteer, a Node library that provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol, to scrape the desired data from the website.

The purpose of the bot is to provide users with the latest and trending manga updates from Manganato, which can be accessed via Line messaging through a user-friendly interface. The bot extracts relevant data, such as new chapter releases, and updates the information to a certain LINE friend group through push message API.

![Example](/example.jpg)

## Features

- Scraps data from https://manganato.com homepage every 3 hours using Puppeteer.
- Provides the latest and trending manga information to the users.
- User-friendly interface on Line messaging platform.

## Prerequisites

- Node.js (required nodejs version =< v16)
- Line Developer Account
- Amazon EC2

## Installation

- Clone the repository.
- Install the dependencies using the "npm install" command.
- Create a Line bot account and configure it with the appropriate callback URL and webhook URL.
- Copy the channel access token and channel secret for configuring the application.
- Launch the application with "node index.js".

## Usage

Use your Line account to search for the Temanwibu bot and add it to your friend group. All the information regarding the latest and trending manga updates will be provided by the bot automatically.

## ENV

- LINE_API_PUSH_URL: https://api.line.me/v2/bot/message/push
- LINE_ACCESS_TOKEN: this is your line developer access token
- LINE_GROUP_ID: this is your line friend group that you want to push message to
- MANGA_LIST: this is list of manga that I want to get notify about separated by comma string
- CRON: this is cron expression

## License

This project is licensed under the MIT License.

## Author

- [Melvin Liu](https://www.melvinliu.com/)

## Note

**Amazon EC2**: I personally use Ubuntu instead of Amazon Linux AMI 2023, Puppeteer somehow keeps failing in Amazon Linux AMI 2023

**Manga List**: Array of manga currently saved inside .ENV instead of a separated database for efficiency
