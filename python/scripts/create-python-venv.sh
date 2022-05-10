#!/bin/bash
echo Creating virtual environmment
cd ../
rm -rf  venv
python -m pip install virtualenv
python -m virtualenv venv
echo Environment created!
