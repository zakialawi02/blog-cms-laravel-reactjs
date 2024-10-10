CMS Blog with laravel 10+inertia+reactjs

## Technologies Used

-   **Laravel 10**: A powerful PHP framework for web application development.
-   **Inertia.js**: A framework that allows you to build modern single-page applications using classic server-side routing and controllers.
-   **React.js**: A popular JavaScript library for building user interfaces.
-   **TailwindCSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
-   **Remixcon**: A icon library.

## **Feature:**

**DASHBOARD:**

-   CRUD Article post
-   Show Statistic post article by article/by location
-   Manage Comments
-   CRUD page
-   CRUD Category
-   CRUD Tag
-   CRUD User (management user)
-   Newsletter (email listed user)
-   Nav Item Menu Setting
-   Web Setting

**BLOG PAGE:**

-   Main blog page (show all article posts)
-   Category Page (show all article posts by category)
-   Archive Page (show all article posts by tag/user/date)
-   Single post page (show article, with comment section)
-   SEO

## Installation

To get started with the Starterpack Laravel + React project, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

-   [PHP](https://www.php.net/downloads) (version 8.1 or higher)
-   [Composer](https://getcomposer.org/download/)
-   [Node.js](https://nodejs.org/) (version 14 or higher)
-   [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone <url repo>
cd <repo folder>
```

### Step 2: Install PHP Dependencies

Run the following command to install the PHP dependencies:

```bash
composer install
```

### Step 3: Set Up Environment Variables

Copy the .env.example file to create your .env file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database settings in the .env file.

Setting smtp email credentials in .env file, for workin email verification

### Step 4: Run Database Migrations & Seeder

Update your .env file if you want with this before with your database credentials:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cms-laravel-reactjs
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Set up your database tables by running the migrations:

```bash
php artisan migrate --seed
```

### Step 5: Install JavaScript Dependencies

Navigate to the frontend directory and install the JavaScript dependencies:

```bash
npm install
```

### Step 6: Build Assets

Build the frontend assets using:

```bash
npm run build
```

or You can run the development server using the following command:

```bash
npm run dev
```

### Step 7: Serve the Application

Open new terminal and go to the root directory this project and serve the Laravel application:

```bash
cd ..
php artisan serve
```

Your application will be accessible at http://localhost:8000.

### Usage

Access the Application: Open your browser and go to http://localhost:8000.

-   Login: If you have already registered, you can use the login form to access the application.
-   Login with dummy account: You can use the following credentials to login without registration:
    **role: user**

    -   Email: `user@mail.com`
    -   Password: `user`

    **role: admin**

    -   Email: `admin@mail.com`
    -   Password: `admin`

### License

This project is licensed under the GNU Affero General Public License version 3 (AGPL-3.0). For more information, see the [LICENSE](LICENSE) file.
