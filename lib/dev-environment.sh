#!/bin/bash
mkdir -p logs
npm run webserver > logs/webserver.out 2>&1 &
npm run tsc > logs/tsc.out 2>&1 &
npm run webpack > logs/webpack.out 2>&1 &
wait