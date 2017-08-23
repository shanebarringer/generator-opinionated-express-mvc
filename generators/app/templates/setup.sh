#!/bin/bash

dropdb <%= dbName %>_dev
createdb <%= dbName %>_dev
yarn migrate
yarn seeds

dropdb <%= dbName %>_test
createdb <%= dbName %>_test
yarn migrate-test
yarn seeds-test
