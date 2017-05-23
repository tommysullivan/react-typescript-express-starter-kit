Resume Website
==============

Goal: Have a deployable web server that serves up some static content.

# Development Environment Setup

IDE: https://code.visualstudio.com
Repo: https://github.com/bob-bins/resume

Windows users may use Cygwin to emulate a linux shell
NPM / NodeJS needs to be installed

# To Install

After cloning this repo locally, we have to install all the dependencies listed in the package.json
file. This can be done with a single command:

    npm install

# Compiling with Typescript & TSC

We are using tsc (typescript compiler) to watch our typescript files and recompile them
to javascript files located in the "dist" folder whenever they change. The details of
how the compiler is configured are located in the "tsconfig.json" file.

    npm run tsc

# How to run webpack (bundle up your front end javascript code)

    npm run webpack

# How to run the webserver

    npm run webserver

# NPM tips

To add a new dependency, find it (usually on npmjs.org).

Then, for runtime dependencies:

    npm install [dependencyName] --save

For development time dependencies (not needed at runtime):

    npm install [dependencyName] --save-dev

If you forget the scripts you can run with npm, just use:

    npm run

### JSON Hints

primitive data types in JS:
string
number
boolean
array
object (key value pairs, where value is also some primitive type)

primitive types not allowed in JSON:
function

examples:

Numeric value:

    5

Array:

    [
        "5",
        7,
        [
            "tommy",
            "is",
            "fun"
        ]
    ]

Object:

    {
        "propertyA": "valueA",
        "propertyB": 7,
        "propertyC": {
            "name": "Tommy",
            "age": 29
        }
    }

