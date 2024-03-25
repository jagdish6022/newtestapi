#!/bin/bash

# The directory to scan
TARGET_DIR=$1

# Check if a directory was provided
if [[ -z "$TARGET_DIR" ]]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Function to generate the tree
generate_tree() {
    local directory=$1
    local prefix=$2

    # Get the list of files and directories
    local items=$(find "$directory" -maxdepth 1 ! -path "$directory" | sort)

    local count=$(echo "$items" | wc -l)
    local counter=1

    echo "$items" | while read item; do
        # Determine if this is the last item in the directory
        local postfix="├──"
        if [[ $counter -eq $count ]]; then
            postfix="└──"
        fi

        local itemName=$(basename "$item")

        if [ -d "$item" ]; then
            # It's a directory
            echo "${prefix}${postfix}📂 $itemName"

            # Recursively generate the tree for the subdirectory
            if [[ $counter -eq $count ]]; then
                generate_tree "$item" "$prefix    "
            else
                generate_tree "$item" "$prefix│   "
            fi
        else
            # It's a file
            echo "${prefix}${postfix} $itemName"
        fi

        ((counter++))
    done
}

# Start generating the tree from the target directory
echo "📂 $TARGET_DIR"
generate_tree "$TARGET_DIR" ""
