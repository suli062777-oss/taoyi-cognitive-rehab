#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
bash scripts/project.sh test
bash scripts/project.sh build
bash scripts/project.sh test:e2e
