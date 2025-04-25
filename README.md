# Interactive Dashboard Design

[Demo Project](https://dashboard-ruddy-six.vercel.app)

## Project Overview

This project focuses on building a modern and user-friendly interactive dashboard that allows users to visualize and interact with data. The dashboard includes a navigation menu, a filterable data table, a sidebar with configurable parameters, and dynamic charting functionality.

### Key Features:
- **Top or Side Navigation Menu**: Includes four main items: "Home", "Reports", "Charts", "Settings".
- **Data Table**: Displays data from a CSV file, with columns such as "Name", "Date", and "Value". The table is filterable to improve user experience.
- **Sidebar**: Contains a list of additional parameters (e.g., "New Value", "New Date", "Category"). These parameters can be dragged and dropped into the data table to dynamically add new columns.
- **Dynamic Chart**: Based on the updated table data, a dynamic chart (such as a bar chart or line chart) is generated for data visualization and better analysis.

## Installation

### Prerequisites:
- Node.js (v14.x or higher)
- npm or yarn

### Steps to Set Up the Project:
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install the dependencies:
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3. Start the development server:
    Using npm:
    ```bash
    npm start
    ```
    Or using yarn:
    ```bash
    yarn start
    ```

4. Open the dashboard in your browser by visiting `http://localhost:3000`.

## Project Structure

- **/src**: Main source directory containing all components, styles, and utilities.
    - **/components**: Reusable components like the sidebar, table, and chart.
    - **/assets**: Images or assets used throughout the project.
    - **/data**: CSV files or mock data.
    - **/utils**: Helper functions for data manipulation or formatting.

## Features

### 1. **Navigation Menu**:
- The dashboard features a responsive navigation bar that allows users to access different sections of the app (Home, Reports, Charts, and Settings).
- The menu can be positioned either at the top or on the side of the page, providing flexibility in design.

### 2. **Data Table**:
- The data table displays data from a CSV file with columns like "Name", "Date", and "Value".
- Users can filter data in the table to view specific records.
- The table is dynamic, with new columns being added based on the parameters dragged from the sidebar.

### 3. **Sidebar**:
- The sidebar contains configurable parameters that users can drag into the data table.
- Users can select parameters like "New Value", "New Date", "Category", etc., to update the table's content.

### 4. **Drag and Drop Functionality**:
- Users can drag one or more parameters from the sidebar and drop them into the table to dynamically add new columns.

### 5. **Dynamic Chart**:
- As users modify the data in the table, a chart (bar chart or line chart) will be generated and updated dynamically to visually represent the data for better analysis.
- The chart adapts based on the table's current data, providing an insightful view of the dataset.

## Technologies Used

- **React**: For building the user interface and components.
- **React DnD**: For implementing the drag-and-drop functionality between the sidebar and the table.
- **Chart.js** or **Recharts**: For generating dynamic charts based on the table data.
- **CSV Parsing**: To read and parse data from CSV files into the table.
- **CSS/SCSS**: For styling the dashboard and ensuring responsiveness.

## Usage

1. **Filter the Data**: Use the filter functionality in the data table to search for specific records.
2. **Add Columns**: Drag and drop parameters from the sidebar into the data table to add new columns dynamically.
3. **View the Chart**: As you modify the data in the table, the chart will update automatically to reflect the changes.
4. **Navigate through the Menu**: Use the navigation menu to explore different sections like Home, Reports, Charts, and Settings.

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request with a description of your changes.

