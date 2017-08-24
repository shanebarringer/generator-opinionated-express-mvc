#!/bin/bash

dropdb <%= db %>_dev
createdb <%= db %>_dev
yarn migrate-dev
yarn seeds-dev

dropdb <%= db %>_test
createdb <%= db %>_test
yarn migrate-test
yarn seeds-test
