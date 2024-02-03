<!-- PROJECT LOGO -->
<br />

<div align="center">
  <img id="readme-top" src="frontend/public/whiteRes.png" alt="Logo" width="80" height="80">

  <h3 style="font-family: Roboto;" align="center">Electronic Components Ecommerce</h3>
</div>
<br />

<div align="center">
  <img src="frontend/public/preview.png" alt="Logo">
</div>

</div>

<!-- Description -->

## Description

The project is a full-stack e-commerce designed for purchasing electronic components.

The website integrates PayPal Sandbox for payment processing, and employs JSON Web Tokens for authentication.

<hr />

### 🔧 Built With

- <img alt='Django' src='https://img.shields.io/badge/Django-100000?style=for-the-badge&logo=Django&logoColor=white&labelColor=092e20&color=D9E7E1'/>
- <img alt='Graphql' src='https://img.shields.io/badge/Graphql-100000?style=for-the-badge&logo=Graphql&logoColor=white&labelColor=e535ab&color=D9E7E1'/>
- <img alt='React' src='https://img.shields.io/badge/React-100000?style=for-the-badge&logo=React&logoColor=white&labelColor=51dbff&color=D9E7E1'/>
- <img alt='Postgresql' src='https://img.shields.io/badge/PostgresQL-100000?style=for-the-badge&logo=Postgresql&logoColor=white&labelColor=0064a5&color=D9E7E1'/>
- <img alt='Docker' src='https://img.shields.io/badge/Docker-100000?style=for-the-badge&logo=Docker&logoColor=white&labelColor=0db7ed&color=D9E7E1'/>
- <img alt='bootstrap' src='https://img.shields.io/badge/Boostrap-100000?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=563d7c&color=D9E7E1'/>

<hr />

### 💻Prerequisites

- [node](https://nodejs.org/en/)
- [docker-compose](https://docs.docker.com/get-docker/)

<hr />

### 🚀 Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MatiasDallavia/Electronic_Components_Ecomerce.git
   ```
2. Navigate to the project directory

   ```sh
   cd Electronic_Components_Ecomerce
   ```

3. Create the node_modules

   ```sh
   (cd frontend/ && npm install)
   ```

4. Create an .env.dev file in root and add the following
   ```env
      #paypal
      #Add your paypal sandbox credentials here. Not doing doing so will make
      #the app not able to proccess payments, but all other features of the page will work fine
      CLIENT_ID=YOUR_CLIENT_ID
      SECRET=YOUR_SECRET_KEY


      #DJANGO
      DEBUG=1
      SECRET_KEY=foo
      DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]

      #POSTGRES
      DB_USER=postgres
      DB_PASSWORD=postgres
      DB_PORT=5432
      DB_NAME=electronic_components_db
      DB_HOST=db
      DATABASE=postgres

   ```
5. Build the containers
   ```sh
   docker-compose up -d --build
   ```
6. Go to [http://localhost:3000](http://localhost:3000)`

<hr>

### Running tests

```sh
docker exec -it backend pytest .
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
