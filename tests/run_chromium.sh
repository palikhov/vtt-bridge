#!/bin/bash

# Run automation tests in Chromium.
#
# Arguments will be passed through to `dmv.py`.

set -euo pipefail

if [[ ! -x "$(command -v chromedriver)" ]]; then
    echo 'Error: chromedriver not found' && exit 1
fi

if [[ ! -d 'venv' ]]; then
    echo 'Creating virtual environment ...' && python3 -m venv venv
fi

echo 'Activating virtual environment ...' && source venv/bin/activate
echo 'Installing dependencies ...' && pip install --quiet -r tests/requirements.txt

if [[ ! -d 'logs' ]]; then
    echo 'Creating logs directory ...' && mkdir -p logs
fi

echo "Running automation tests in Chromium ..."
python tests/dmv.py chromium "$@"
echo 'Tests passed!'