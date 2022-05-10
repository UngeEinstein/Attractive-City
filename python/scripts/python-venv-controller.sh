cd ../python
REQ=(`cat "requirements.txt"`)

setup(){
if [[ $1 == "win" ]]
then
    source venv/Scripts/activate
    cd venv/Lib/site-packages
else
    source venv/bin/activate
    cd venv/lib/python3.8/site-packages
fi

declare -a missing_packages=()
for i in "${REQ[@]}"; do
    IFS="=="
    read -ra pkg <<< "$i"
    if ! (pip freeze | grep -q $pkg=);
    then
        missing_packages[${#missing_packages[@]}]=$pkg
    fi
done
if [[ ${#missing_packages[@]} != 0 ]]
then
    echo "missing packages: " 
    echo ${missing_packages[@]}
    
    if [[ $1 == "win" ]]
    then
        cd ../../../scripts
        source ./activate-python-venv-win.sh
    else
        cd ../../../../scripts
        source ./activate-python-venv-mac.sh
    fi
else 
    echo "Setup completed!"
fi

}

control_setup() {
    if [[ -d ./venv/Scripts ]]
    then
        setup "win"
    elif [[ -d ./venv/bin ]]
    then
        setup "mac"
    else
        echo "no venv"
        cd scripts
        source ./create-python-venv.sh
        if [[ -d ./venv/Scripts ]]
        then
            setup "win"
        elif [[ -d ./venv/bin ]]
        then
            setup "mac"
        else
            echo "Setup failed"
        fi
    fi
}

echo Setting up python virtual environmment...
control_setup
