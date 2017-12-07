# parse-server-bundle

### Pre-requisites
Install **Docker** from [here](https://docs.docker.com/engine/installation/).

##### Repository Information
- This bundle consists the parse-server, mongo-database and parse-dashboard for the visualization of data.

##### Clone Repo
Clone this repository

##### Set up env
For now just copy the `.env.sample` file.

##### Run the environment using the following command
```$ docker-compose up```

##### Test your environment
```$ curl -X POST -H "X-Parse-Application-Id: appid" -H "Content-Type: application/json" -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' http://localhost:1337/parse/classes/GameScore```

This should insert a row to the mongo database.

##### Visualise using dashboard
- You visualise using this url [http://localhost:4040/parse-dashboard](http://localhost:4040/parse-dashboard) with `username: admin` and `password: password`.


##### Things to Explore
- Read the full Parse Server guide [here](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide).
- Explore about Parse Docs [here](http://parseplatform.org/).

##### Enjoy parsing. :)