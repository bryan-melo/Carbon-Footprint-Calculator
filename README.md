# Carbon Footprint Calculator
 
## Project Overview
- **App Name:** Carbon Footprint Calculator
- **Description:** A web app that allows users to track their carbon emissions and post on an in-app social media system to discuss about carbon emissions.
- **Features:** Login/authentication system, user profiles to save data, carbon emissions calculator, social media threads
- **Contributors:** Bryan Melo, Lance Le, Joey Lau, Benny Le

## Steps to Run Flask App

**1. Create a Virtual Environment**
```bash
python -m venv my_env
```
<br>

**2. Activate the Environment**
- macOS/Linux
```bash
source my_env/bin/activate
```
- Windows
```bash
my_env\Scripts\activate
```
<br>

**3. Install Dependencies**
```bash
pip install -r requirements.txt
```
<br>
 
**4. Run the Web Application**
```bash
cd app
```

- For Development (see real-time changes without having to restart app)
```bash
export FLASK_ENV=development
export FLASK_APP=app.py     
flask run
```

- For Production
```bash
export FLASK_APP=app.py
flask run
```
 <br>

**5. Access the Application**
- Open web browser to http://127.0.0.1:5000
<br> <br>

**6. Stopping the Flask App**
- Stop the Flask Server
```bash
Ctrl+C
```

- Deactive the Virtual Environment
```bash
deactivate
```
<br>
