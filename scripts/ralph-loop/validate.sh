#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${RALPH_TEST_CMD:-}" ]]; then
  echo "[ralph] No RALPH_TEST_CMD set; skipping tests."
  exit 0
fi

echo "[ralph] Running tests: ${RALPH_TEST_CMD}"
test_cmd="${RALPH_TEST_CMD}"
if [[ "${test_cmd}" == cd\ *"&&"* ]]; then
  cd_segment="${test_cmd%%&&*}"
  cd_path="${cd_segment#cd }"
  cd_path="${cd_path%"${cd_path##*[![:space:]]}"}"
  if [[ "${cd_path}" == *" "* && "${cd_path}" != \"*\" ]]; then
    test_cmd="cd \"${cd_path}\" &&${test_cmd#*&&}"
  fi
fi

eval "${test_cmd}"
