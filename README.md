


<!-- PROJECT LOGO -->
<br />

<div align="center">
  <img src="frontend/public/whiteRes.png" alt="Logo" width="80" height="80">

  <h3 style="font-family: Roboto;" align="center">Electronic Components Ecommerce</h3>
</div>
<br />

<div align="center">
  <img src="frontend/public/preview.png" alt="Logo">
</div>

</div>




<!-- ABOUT THE PROJECT -->
## About The Project

Electronic Components is a full-stack e-commerce designed for purchasing electronic components.

The website integrates PayPal Sandbox for payment processing, and employs JSON Web Tokens  for authentication.

<hr />

### 🔧 Built With

* <img alt='Django' src='https://img.shields.io/badge/Django-100000?style=for-the-badge&logo=Django&logoColor=white&labelColor=092e20&color=D9E7E1'/>
* <img alt='Graphql' src='https://img.shields.io/badge/Graphql-100000?style=for-the-badge&logo=Graphql&logoColor=white&labelColor=e535ab&color=D9E7E1'/>
* <img alt='React' src='https://img.shields.io/badge/React-100000?style=for-the-badge&logo=React&logoColor=white&labelColor=51dbff&color=D9E7E1'/>
* <img alt='Postgresql' src='https://img.shields.io/badge/PostgresQL-100000?style=for-the-badge&logo=Postgresql&logoColor=white&labelColor=0064a5&color=D9E7E1'/>
* <img alt='Docker' src='https://img.shields.io/badge/Docker-100000?style=for-the-badge&logo=Docker&logoColor=white&labelColor=0db7ed&color=D9E7E1'/>
* <img alt='bootstrap' src='https://img.shields.io/badge/Boostrap-100000?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=563d7c&color=D9E7E1'/>



<hr />


### 💻Prerequisites

* docker
* docker-compose

  [http://localhost:3000](http://localhost:3000)
  [http://localhost:3000](http://localhost:3000)
  [http://localhost:3000](http://localhost:3000)

<hr />


### 🚀 Installation 


2. Clone the repo
   ```sh
   git clone https://github.com/MatiasDallavia/electronic_components_Ecomerce.git
   ```
3. Navigate to the project directory
   ```sh
   cd electronic_components_Ecomerce
   ```

3. Create an .env.dev file in root and add the following
   ```env
    #paypal
    #Add your paypal sandbox credentials here. Not doing doing so will make 
    #the app not able to proccess payments, but all other features will be just fine
    CLIENT_ID=YOUR_CLIENT_ID
    SECRET=YOUR_SECRET_KEY
    
    
    #DJANGO
    DJANGO_PORT=8000
    REACT_PORT=3000
    DEBUG=1
    SECRET_KEY=foo
    DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
    HOST=http://localhost
    
    #POSTGRES
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_PORT=5432
    DB_NAME=electronic_components_db
    DB_HOST=db
    DATABASE=postgres
    
    #REACT
    VITE_PORT=3000
    VITE_API_PORT=8000
    VITE_HOST=http://localhost
    
    ```
3. Build the containers
   ```sh
   docker-compose up -d --build
   ```
4. Load the db with the product rows in `products.tar`
   ```sh
   cat backend/products.tar | sudo docker exec -i db pg_restore -U postgres -d electronic_components_db -F t 2>/dev/null
   ```
5. Go to [http://localhost:3000](http://localhost:3000)`

<p align="right">(<a href="#readme-top">back to top</a>)</p>
