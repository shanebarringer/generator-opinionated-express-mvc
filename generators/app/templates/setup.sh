#!/bin/bash

dropdb <%= db %>_dev
createdb <%= db %>_dev
yarn migrate
yarn seeds

dropdb <%= db %>_test
createdb <%= db %>_test
yarn migrate-test
yarn seeds-test
