# Optimizer Databases practice

Welcome to the educational repository focusing on Elasticsearch and Redis. This project provides a streamlined guide for understanding and working with Elasticsearch and Redis using Docker Compose.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the project.

Use it in all project folders

```bash
npm install
```

## Folder overview

📂 api -> Node.js Rest api

📂 frontend -> Angular application to test Elasticsearch

📂 elastic-data-generator -> A Node.js Script to create Elasticsearch index and a fake data to test

## Running the project

1. Run the database using docker compose
```bash
docker compose up
```

2. Go to elastic-data-generator, and run the following commands to populate Elasticsearch data
```bash
npm install
node index.js
```

3. Create a terminal do run the API
```bash
npm install
npm start
```

3. Create a new terminal do run the frontend
```bash
npm install
npm start
```

## Usage
Feel free to edit the redis and elastic files in `api` folder

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)