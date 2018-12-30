# Contributing 

## Code style

Code style is configured via eslint. Eslint configured over:
* Airbnb eslint config
* Prettier recommended eslint config
* Recommended vue eslint plugin rules

Also we document every function with JSDoc.
All your changes should be in projects code style.

## Tests

Every test case includes:
* Input data as vue component
* Output data as result of extracting meta info from input data

Every test case organized by following rules:
* Has directory with test case name. For example `EventsWithTypes`.
* There are two files in directory:
    * `component.vue` for input data
    * `expected.js` for expected result

Once you have met the requirments, your test will be included at test runs.

This structure is good because:
* All tests are written in same format.
* Expected result can be used as documentation to library.
* New tests are automatically added to test run.
* Deleted tests are automatically removed test run.

Also it has cons:
* You can't run the only one test or test only specific property of expected result.

## Commiting

We use [git commitizen](https://github.com/commitizen/cz-cli) for commiting. Your commits should be made with `git-cz`. We compile project's CHANGELOG by [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog).

## Contributing

1. Fork it.
2. Write feature and test for it.
3. Type `npx git-cz` in repository directory. Make a commit.
4. Open a PR.
5. Thanks for contributing!
