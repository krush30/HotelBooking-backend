# Hotel Booking Backend

This is the backend for the **Hotel Booking App**, built using **NestJS**. It handles user authentication, hotel listings, and image uploads.

---

## **Tech Stack**

- **NestJS** (Backend Framework)
- **PostgreSQL** (Database)
- **Drizzle ORM** (Database ORM)
- **Docker** (Containerization)
- **Firebase Auth** / **Clerk Auth** (Authentication)
- **Render** (Backend Deployment)
- **Netlify** (Frontend Deployment)

---

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/krush30/HotelBooking-backend.git
cd hotel-booking-backend
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Create \*\***\*\***\*\***`.env`\***\*\*\*\*\*\*\*** File\*\*

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgres://postgres:123123@localhost:5432/hotel_booking
JWT_SECRET=my_jwt_secret
UPLOAD_PATH=public/uploads
JWT_EXPIRES_IN=36000s

```

> **Note:** Never expose your `.env` file to GitHub. Add `.env` to `.gitignore`.

### **4. Run Database Migrations**

```sh
npx drizzle-kit generate
```

```sh
npx drizzle-kit push
```

### **5. Start the Server**

```sh
npm run start:dev
```

The server will run at `http://localhost:3000`.

---

## **API Endpoints**

### **Authentication**

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register a new user      |
| POST   | `/auth/login`    | Log in and get JWT token |

### **Hotel Listings**

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/listings`     | Get all listings     |
| POST   | `/listings`     | Create a new listing |
| GET    | `/listings/:id` | Get listing by ID    |
| PUT    | `/listings/:id` | Update listing       |
| DELETE | `/listings/:id` | Delete listing       |

### **Image Uploads**

| Method | Endpoint  | Description     |
| ------ | --------- | --------------- |
| POST   | `/upload` | Upload an image |

---

## **Uploading & Serving Images**

- Images are uploaded to `backend/public/uploads/`.
- Serve images via:
  ```sh
  http://localhost:3000/uploads/your-image.jpg
  ```

Ensure your **main.ts** includes:

```ts
app.useStaticAssets(join(__dirname, '..', 'public'), {
  prefix: '/uploads',
});
```

---

##
