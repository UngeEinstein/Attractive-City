#!/bin/bash
echo Installing requirements...
cd ..
source venv/Scripts/activate
python -m pip install -r requirements.txt
echo Windows setup completed!
