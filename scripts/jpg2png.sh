#!/bin/sh
sips -s format png "$1" --out "${1%.jpg}.png"
