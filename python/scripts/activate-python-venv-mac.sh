#!/bin/bash
echo Installing requirements...
cd ..
source venv/bin/activate
python -m pip install -r requirements.txt
echo Mac setup completed!
