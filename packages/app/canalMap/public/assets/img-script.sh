#!/bin/bash

for i in {1..360}
do

# Set the input and output file paths
in_file="./bridge-0.svg"
out_file="./bridge-$i.svg"

# Use sed to search and replace the transform attribute
sed "s/<svg/<svg transform=\"rotate($i)\"/" "$in_file" > "$out_file"
done