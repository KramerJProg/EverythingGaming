![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/57e6f666-025d-46d9-8f6f-dfdf0e264bed)

<h2>About My Work</h2>
Everything Gaming is personal project I created to showcase. Please feel free to look at the code and disect whatever you are able to. 
There are a ton of moving parts within this application. I have spent a very large chunk of time on this application. 
Many many commits along with tons of research to be able to get it working properly. This was my very first attempt at a .NET/React application on my own and I will say it has been exciting, fun, frustrating, and many more emotions.
I have done the implementation all by myself. Nobody else has contributed to this project. This was a HUGE learning curve, and I can say I learned a ton.
I have spent countless hours on this project from implementing multiple features to fixing and solving multiple bugs.

<h2>Technologies Used</h2>
Everything Gaming is a FullStack application that is built on .NET (~v.8.0) for server-side and the React framework for the client-side. I have used SQLite for the entirety of the application
up until the end where I made the switch to PostgreSQL for more robust persistence. A custom API was built/used for the backend using C# as the programming language. I also used
ASP.NET Core ~ Identity ~ Entity Framework ~ Ef Migrations ~ Stripe Services ~ JWT...etc. For the frontend, I chose to use TypeScript as the programming language to move with React because
I prefer strongly typed languages. I also implemented Redux for managing State within React. I took advantage of the Redux Dev Tools which are very useful. There is much more to the applicatoin, but
I can say that it works with full functionality.

<h2>Functionality (Screenshots)</h2>
When this application is running, you are brought to the Home Page

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/d796de7b-bc73-4df1-ad2e-60aeeace9efa)

You will notice along the navbar, there is the title of the application, light/dark mode, catalog (List of products), Contact (My information), a shopping cart, User Login, and User Regristration.

As an anonymous user you can browse the catalog and even add items to your cart. The catalog has full search and filtering capabilities, as well as viewing a single product with some additional functionality.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/cfaddb31-88ad-4af0-a1ee-b5dcd6082117)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/d07aa78a-00f3-4444-af35-97e8ff872dfa)


Once an item is added you will see a number next to your cart, indicating the amount of items in your cart.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/08670135-5e4c-4678-8aa1-4c9860647e61)

Once you click on your cart, you will be brought to the Cart Page where you can see the collection of items you've added.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/9c81c860-c934-459c-a5c6-608c2c3cdfde)

Here you can see your subtotal, delivery fee, and total before going to the checkout. You are also able to change the quantity of your item if you want as well, and it will adjust as you want.

Clicking the checkout button as an anonymous user will require you to Login if you have an account, if not, it will require you to register your account.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/c020c58e-d0f2-4562-9a47-dc3b484d3fe3)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/20ec050e-2db5-4dec-8749-3629ae43fa4b)

Authentication exists in both Login and Registration. The user will need a Username, Email, and Password to register. For Login, it is only Username and Password.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/f621974f-58bd-4877-b813-6f2f1bc6b5af)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/ac103201-8df1-4ab6-969a-b9503e8ddcc5)

Once successfully registered, you will be moved to the Login page where you can sign in with your newly created account. You will see the toast notification.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/a38475f2-1939-4e7a-9b68-7a2c1edbda79)

Once you login, you will be brought to the checkout page where you can start your 3 step process of checking out using Stripe.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/6c65d594-59d3-4fe4-8f63-abfd840454e3)

The checkout process is utilizing Stripe Form Validation. Specifically when you get to the card info, the card validation will provide which card brands are being used,
as well as expiry dates, and the CVC number.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/83bcfd71-389e-4530-a054-5e964fbdca7f)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/afd04da1-5884-467a-aa89-8b9e3f5a9b0c)

If all the information the user provided was valid, then the order will go through, the user will get a thank you message along with an order number they can check in their history with the status of their order

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/0bf41fe2-251c-4940-a598-da08d646131a)

When a user navigates to their orders through the drop down menu of their account, you will see the order you just placed. If you view the order, you can see the details of what you just ordered.

![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/63b9d4e0-052d-403f-bc88-c85174a425d8)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/b591140f-2cf6-4548-b517-372e0d6e37e6)
![image](https://github.com/KramerJProg/EverythingGaming/assets/72529822/14a5a247-851e-4b85-b387-3d9ed0d27db5)

Finally, you can logout as a user and if you have anything your cart when you logout, your items will be saved with help of the JWT.

<h1>Thank you!</h1>
