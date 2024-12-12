# Carbon Footprint Calculator

## Project Overview
- **App Name:**
- **Description:**
- **Features:**
- **Contributors:**

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