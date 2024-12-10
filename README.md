# Shopping Webiste BAANHEM (temporary name)

Implemented with NodeJS for back-end handling and restAPI, MongoDB for database storing. On frontend, we using React with Tailwind CSS for implement the UI. Finally, project is deploys and running by Docker.

## Description

This E-commerce website allow users to view the products, add to cart and tracking orders. Login is required to access the fully functions of the website.
For administrator, there's only an account that can access the fully functionality. 
- Admin can manages orders to change the order status.
- Manage products - can add, update and delete product.
- Manage product's category, not as same as the product. Admin can only add and delete.
- Create coupons on special dates.

## Requirements

* Node.js version v20.17.0 or higher (optional)
* Docker version 27.2.0 or higher
* Nginx stable version 1.26.2 for Windows

## Usage

To run the system, please clone the repository first. On the ` <> Code ` of this repository, select SSH for MacOS or HTTPS:  ` https://github.com/giahao1411/shopping-website.git `

Next, move to the directory you want to place at. Open Command Prompt or Windows PowerShell and clone the project by

<pre>
    <code id="code">git clone https://github.com/giahao1411/shopping-website.git</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

At this, you can see the whole project is cloned by the folder name ` shopping-website `. Move into the folder by ` cd shopping-website `

After clone the project, we run these programs

- Run the code in root, front-end and back-end folders:
<pre>
    <code id="code">npm install</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

- After that, create ` .env ` file in both front-end and back-end. Then, on the same folder (front-end or back-end), there's ` .env.run.example `. Copy them into ` .env `.

Next is to run the project, on your Command Prompt or PowerShell. Run

<pre>
    <code id="code">docker-compose up --build</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

The Docker is now executing the docker-compose.yml in your root folder.

It takes time to build if you haven't had the node, nginx, redis or mongodb images. Chilling and waiting for the result~~!

After all the services running properly, you can experience the application by open a browser and running ` localhost:5173 `. 

## Author

This program was created by 

* [giahao1411](https://github.com/giahao1411)
* [huyblue17](https://github.com/huyblue17)
* [nhathao512](https://github.com/nhathao512)


### Thanks for visting our project! Wish you a good day and best sleeping experience from struggling deadline day by day. We're going to sleep now.
