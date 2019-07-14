<p align="center">
    <img src="https://i.postimg.cc/K82st84N/symfony-react.png" />
</p>

___

Description
------------

#### This is a web app built with ReactJS and Symfony 4, that allow users to :

* Sign up using their email and password
* Login using their email and password
* Display a list of shops sorted by distance
* Like a shop, and add it to preferred shops
* Dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours
* Remove a shop from the preferred shops


Libraries 
------------

#### Backend :

| Library | Description |
| ------ | ------ |
| `DoctrineMongoDBBundle` | Allows to persist and retrieve objects to and from MongoDB with only plain PHP objects |
| `FOSRestBundle` | Provides various tools to rapidly develop RESTful API's with Symfony |
| `LexikJWTAuthenticationBundle` | Provides JWT (Json Web Token) authentication for a Symfony API |
| `JMSSerializerBundle` | Allows to serialize data into a requested output format such as JSON, XML, or YAML |

#### Frontend :

| Library | Description |
| ------ | ------ |
| `Reach Router` |  An Accessible Router for React |
| `axios` | Promise based HTTP client for the browser and node.js |
| `prop-types` | Runtime type checking for React props and similar objects |


Requirements
------------

* php 7.2+
* MongoDB 4.0+
* MongoDB PHP Driver (mongodb 1.5.0+)
* Composer
* npm or yarn

Installation 
------------

* **Step 1 - clone this repo**
```bash
git clone https://github.com/PhyDevs/ur-cc.git
cd ur-cc
```

* **Step 2 - install the project dependencies**
##### backend:
```bash
composer install
```
##### frontend:
```bash
cd frontendApp
yarn install
```

* **Step 3 - Configure Database**

Before you start you have to configure your database, the database connection information is stored as an environment variable called `MONGODB_URL`. you can find and customize it inside .env file.

* **Step 4 - Configuration**

=> Create the Database
```bash
php bin/console doctrine:mongodb:schema:create
```

=> Load Dummy Data
<br>
You can download a mongoDB dump with 300 shops from [HERE][1]
 
=> This app uses [LexikJWTAuthenticationBundle][2] to provide a JWT authentication, to configure it :

1- Generate the SSH keys :
```bash
cd config && mkdir jwt && cd ..
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```
2- Add your passphrase to environment variables, it's called `JWT_PASSPHRASE`. you can find it inside .env file. 

* **Step 5 - Final Step**

```bash
cd frontendApp
yarn build
cd ..
php bin/console server:run
```
open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser


Screenshots 
------------
<p align="center">
    <img src="https://i.postimg.cc/BQc3R6L8/sf-react-ss.png" />
    <br><br>
    <img src="https://i.postimg.cc/4y7QX9bw/log.jpg" />
</p>

[1]: https://github.com/hiddenfounders/web-internship-cc/blob/master/dump-shops.zip
[2]: https://github.com/lexik/LexikJWTAuthenticationBundle
