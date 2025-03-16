<p align="left">
  <a href="https://form.gov.sg"><img src="https://file.go.gov.sg/form-logo-background-rmved.png"></a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Local Development](#local-development)
  - [Prerequisites](#prerequisites)
  - [First Setup](#first-setup)
  - [Running Locally](#running-locally)
- [Acknowledgements](#acknowledgements)

## Features

FormSG is a form builder application built, open sourced and maintained by the [Open Government Products](https://open.gov.sg) team of the Singapore [Government Technology Agency](https://tech.gov.sg) to digitise paper processes.

Notable features include:

- 19 different form field types, including attachments, tables, email and mobile
- Verified email and mobile phone fields via integrations with Twilio and AWS SES
- Automatic emailing of submissions for forms built with Email Mode
- Encryption for data collected on forms built with Storage Mode
- (Singapore government agencies only) Citizen authentication with [SingPass](https://www.singpass.gov.sg/singpass/common/aboutus)
- (Singapore government agencies only) Citizen authentication with [sgID](https://www.id.gov.sg/)
- (Singapore government agencies only) Corporate authentication with [CorpPass](https://www.corppass.gov.sg/corppass/common/aboutus)
- (Singapore government agencies only) Automatic prefill of verified data with [MyInfo](https://www.singpass.gov.sg/myinfo/common/aboutus)
- Webhooks functionality via the official [FormSG JavaScript SDK](https://github.com/opengovsg/formsg-sdk) and contributor-supported [FormSG Ruby SDK](https://github.com/opengovsg/formsg-ruby-sdk)
- Variable amount and Itemised payments on forms with [stripe](https://stripe.com) integration

## Local Development 

### Prerequisites

Install [docker and docker-compose](https://docs.docker.com/get-docker/) and the [node version manager](https://github.com/nvm-sh/nvm).

### First Setup

First, make sure to install and use the node version used by the project:

```bash
nvm install
nvm use
```

To install the relevant npm packages (frontend, backend and virus-scanner), run the following in the root direcory:

```bash
npm install && npm --prefix serverless/virus-scanner install
```

If you are on Mac OS X, you may want to allow Docker to use more RAM (minimum of 4GB) by clicking on the Docker icon on the toolbar, clicking on the "Preferences" menu item, then clicking on the "Resources" link on the left.

### Running Locally

First, build the frontend for local development:

```bash
npm run build:frontend
```

Run the following shell commands to build the Docker image. The first time will usually take 10 or so minutes. These commands runs the backend services specified under [docker-compose.yml](docker-compose.yml) and the React frontend on the native host.

```bash
npm run dev
```

After the Docker image has finished building, the following local applications can be accessed:

- React application can be accessed at [localhost:5173](localhost:5173)
- The backend API server can be accessed at [localhost:5001](localhost:5001)
- The development mail server can be accessed at [localhost:1080](localhost:1080)

## Acknowledgements

Mindful Meadows was built from scratch by [Tevel Sho](https://github.com/tevelsho) and [Jing Shun](https://github.com/fisherman-23) during the [MapleTree x NP 2025 Hackathon](https://sites.google.com/view/mapletreexnphack2025/).