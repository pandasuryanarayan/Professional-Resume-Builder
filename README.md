# Professional Resume Builder

A modern, client-side, single-page application (SPA) designed to help users create professional resumes effortlessly. Built with vanilla JavaScript, HTML5, and Tailwind CSS, this tool offers a seamless experience with no backend requirements, no signups, and instant PDF generation.

## 🚀 Key Features

-   **Privacy Focused**: No data is sent to any server. All inputs are stored locally in your browser's Session Storage.
-   **No Signup Required**: Start building your resume immediately without creating an account.
-   **Responsive Design**: A glassmorphism-inspired UI that works beautifully on desktops, tablets, and mobile devices.
-   **Dynamic Forms**: Add as many educational qualifications as you need with a flexible interface.
-   **Instant PDF Export**: Generate and download your resume as a high-quality PDF file instantly using `jsPDF`.
-   **Live State Persistence**: Your progress is saved automatically, so you won't lose your data if you refresh the page.
-   **Multi-Step Wizard**: A guided 5-step process ensures you don't miss any critical information.

## 🛠️ Technologies Used

-   **HTML5**: Semantic structure.
-   **Tailwind CSS**: For utility-first styling and responsive design.
-   **JavaScript (ES6+)**:
    -   Modular Architecture (`StorageService`, `PDFService`, `UIManager`, `App`).
    -   SessionStorage for local data persistence.
-   **Font Awesome**: For iconography.
-   **jsPDF**: For client-side PDF generation.

## 📖 Usage

Since this is a client-side application, you can run it directly in your browser.

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd Resume-Builder
    ```

2.  **Open the Application**
    -   Simply double-click `index.html` to open it in your web browser.
    -   *Optional*: You can also serve it using a local server like Live Server (VS Code extension) or Python:
        ```bash
        # Python 3
        python -m http.server 8000
        ```

3.  **Build Your Resume**
    -   **Step 1: Personal Info** - Enter your contact details and professional summary.
    -   **Step 2: Education** - Add your academic history (Class X, XII, and higher degrees).
    -   **Step 3: Work Experience** - Detail your professional background.
    -   **Step 4: Projects** - Showcase your academic or personal projects.
    -   **Step 5: Skills & Extra** - List your technical skills, certifications, and hobbies.
    -   **Preview & Download** - Review your resume and click "Download PDF".

## 📂 Project Structure

```
.
├── index.html      # Main application entry point (HTML + JS + CSS)
├── favicon.ico     # Browser tab icon
├── LICENSE         # Apache 2.0 License
└── README.md       # Project documentation
```

### Code Overview (`index.html`)

The JavaScript logic is organized into four main modules:

1.  **`StorageService`**: Handles saving and retrieving user data from `sessionStorage`.
2.  **`PDFService`**: Contains logic to format and generate the PDF layout.
3.  **`UIManager`**: Manages DOM updates, view navigation (wizard steps), dynamic form fields, and toast notifications.
4.  **`App`**: The main controller that initializes the app and coordinates between services and the UI.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

-   Designed and Developed by **Suryanarayan Panda**.
-   Icons by [Font Awesome](https://fontawesome.com/).
-   PDF Generation by [jsPDF](https://github.com/parallax/jsPDF).
