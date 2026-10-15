#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
exec .runtime/bin/node scripts/launch-studio.mjs --measure-camera
