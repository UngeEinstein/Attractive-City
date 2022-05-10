# Python virtualenv

## Automatic setup

Follow these steps to create a Python Virtualenv automatically:

- Ensure that Python 3.6 or higher is installed.
- Ensure that pip is installed.
- Use a **Bash** terminal like **Git Bash**.

1. Open a terminal in the **backend** folder.
1. Run the command `npm run python-venv` in the terminal.

## Manual setup

If that does not work try to install python dependencies in a virtualenv manually by following the steps below:

- Open a terminal in the **python** folder.
- Ensure that your version of Python is 3.6 or higher with the command `python --version`. If this is not the case, retry with `python3 --version`. If the latter does reveal a version of Python higher than 3.6, use `python3` instead of `python` for the rest of the guide. If neither worked, install Python and retry.
- Check that you have pip installed by calling `python -m pip --version`.
- Install virtualenv package to create a venv: `python -m pip install virtualenv`.
- Create a virtual environment: `python -m virtualenv venv`
- Activate the venv:
  - macOS / Linux: `source venv/bin/activate`
  - Windows: `.\venv\scripts\activate`
- Install the dependencies by calling `pyhton -m pip install -r requirements.txt `

## Update requirements.txt

If you have added further dependencies to the code, update the requirements.txt file by doing the following
NB! Remember to activate the virtual environment before doing this

```console
pip freeze > requirements.txt
```
