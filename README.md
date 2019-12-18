# Game Weapon Sales
A web application for selling game replica weapon.

## Technologies Used
- React.js
- Webpack 4
- MySQL
- PHP
- HTML5
- CSS3
- AWS EC2
- Bootstrap 4

## Features
- User can add items.
- User can see item details.
- User can check cart details.
- User can checkout.
- User can place order.

## Development
### System Requirements
- npm 6 or higher
- MySQL 7 or higher

### Getting Start
1. Clone the repository.

    ```bash
    $git clone https://github.com/Felixwhwang/game-weapon-sales.git
    $cd soulmate
    ```
2. Install all dependencies with NPM.

    ```bash
    $npm install
    ```

3. Create you own table in local phpMyAdmin named `gameWeaponSales` with `utf8mb4_unicode_ci`.

4. Import pre-set dummy data into your new created table `gameWeaponSales`.

    ```bash
    $npm run db:import
    ```

5. Build all necessary js files.

    ```bash
    $npm run build
    ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```bash
    $npm run dev
    ```
### Live Demo
The application live at https://gameweaponsales.wenhaowang.net/
