---

## **Backend README.md**

```markdown
# My Portfolio Website – Backend

## 📝 Project Overview
This is the **backend API** for the Portfolio Website, built using **Node.js**, **Express**, and **Prisma** with **PostgreSQL**.  

It provides secure endpoints for managing blogs, projects, and authentication while supporting a dynamic frontend.

### **Main Features**
- JWT Authentication & Authorization (Owner Only)  
- CRUD APIs for Blogs and Projects  
- Admin user seeded during setup  
- Password hashing using bcrypt  
- Proper error handling and validation

---

## ⚙️ Tech Stack

- **Backend Framework:** Node.js + Express
- **Database:** PostgreSQL (via Prisma ORM) / MongoDB optional
- **Authentication:** JWT + bcrypt
- **Environment Variables:** dotenv

---

## 🗂 Folder Structure

/backend
├─ /controllers # Blog, Project, Auth controllers
├─ /routes # API Routes
├─ /middlewares # Auth & Error handling middlewares
├─ /prisma # Prisma schema & client
├─ /utils # Helper functions
├─ server.ts # Main server entry
└─ package.json

---

## 🚀 Installation & Setup

1. Clone the repository:

```bash
git clone <https://github.com/SHARIFA-AKHTER/my-portfolio-server>


Install dependencies:

cd backend
npm install


Create .env file and add:
DATABASE_URL="postgresql://postgres:123456@localhost:5432/my_portfolio_server?schema=public"
//backend JWT verify
JWT_SECRET="mySuperSecretKey"


Run Prisma migrations (if using Prisma):

npx prisma migrate dev --name init


Seed admin user:

npm run seed


Start backend server:

npm run dev


Visit http://localhost:5000

🔗 API Endpoints (Examples)

POST/api/user/ – Create User

GET/api/user/ – Get All User

GET/api/user/ – Get User By Id

PUT/api/user/ – Update User

DELETE/api/user/ – Delete User

POST /api/auth/login – Owner Login

GET /api/blog – Get all blogs

GET /api/blog/:id – Get single blog

POST /api/blog – Create blog (Owner Only)

PUT /api/blog/:id – Update blog (Owner Only)

DELETE /api/blog/:id – Delete blog (Owner Only)

GET /api/projects – Get all projects

POST /api/projects – Create project (Owner Only)

PUT /api/projects/:id – Update project (Owner Only)

DELETE /api/projects/:id – Delete project (Owner Only)

POST/api/contacts/ – Create Contacts

get/api/contacts/ – Get all  Contacts (Owner Only)

🔗 Live Deployment

Backend Live URL: https://your-backend-link.com

🧑‍💻 Admin Credentials (for testing)

Email: sr0589071@gmail.com

Password: 123456


