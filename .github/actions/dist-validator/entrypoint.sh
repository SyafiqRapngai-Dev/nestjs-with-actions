#!/bin/sh
# EXAMPLE structure — the logic is yours to write

set -e

# Read the input (GitHub converts the input name to INPUT_DIST_PATH)
DIST_PATH="${INPUT_DIST_PATH:-dist/}"

echo "Validating build output at: $DIST_PATH"

# Check 1: Does the directory exist?
# If missing, echo an error message and exit 1
if [ ! -d "$DIST_PATH" ]; then
  echo "Error: Directory $DIST_PATH does not exist."
  exit 1
fi

# Check 2: Does dist/main.js exist?
# If missing, echo an error message and exit 1
if [ ! -f "$DIST_PATH/main.js" ]; then
  echo "Error: File $DIST_PATH/main.js does not exist."
  exit 1
fi

# Count .js files
# Store the result in a variable called FILE_COUNT

FILE_COUNT=$(find "$DIST_PATH" -name "*.js" | wc -l)

echo "Found $FILE_COUNT .js files in $DIST_PATH"

# Write the output
echo "file-count=$FILE_COUNT" >> "$GITHUB_OUTPUT"

echo "Validation passed!"