#!/bin/bash

RED="\e[31m"
ENDCOLOR="\e[0m"

echo "⏳ Checking for type errors..."

# Run tsc and capture the output
TYPE_ERRORS=$(tsc --project ./tsconfig.json 2>&1)

# Clean node_modules related errors because we use skipLibCheck:false
CLEAN_ERRORS=$(echo "$TYPE_ERRORS" | sed -e '/node_modules/,/node_modules/ d')

# Print the cleaned output
if [[ -n $CLEAN_ERRORS ]]; then
	printf "${RED}❌ Type errors were found${ENDCOLOR}\n"
  	echo "$CLEAN_ERRORS"
  	exit 1
fi

echo "✅ No type errors found"
exit 0

