#!/bin/bash
cp Dockerfile.production Dockerfile
docker build -t backend_production . 
