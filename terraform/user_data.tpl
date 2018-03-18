#!/bin/bash
cd /home/ubuntu/example-webapp && \
  sed -i "s/localhost/${db_host}/g" db.js && \
  make run
